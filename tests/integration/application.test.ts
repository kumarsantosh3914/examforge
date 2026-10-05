import assert from 'node:assert/strict';
import { randomBytes, randomUUID } from 'node:crypto';
import test from 'node:test';
import { MongoClient } from 'mongodb';
import { AppError } from '../../src/lib/errors';
import { authenticate, createGuest, resolveIdentity } from '../../src/lib/auth';
import { ensureIndexes } from '../../src/lib/db';
import { getAttempt, getResult, saveAnswer, startAttempt, submitAttempt } from '../../src/lib/attempts';
import { seedBank } from '../../src/lib/seed';
import type { Bank } from '../../src/lib/data';
import type { Actor, Attempt, Exam, PracticeSet, StoredQuestion, Subject } from '../../src/lib/types';

const uri = process.env.TEST_MONGODB_URI || process.env.MONGODB_URI;
let client: MongoClient | undefined;
let unavailable = '';
if (!uri) unavailable = 'TEST_MONGODB_URI is not configured';
else {
  try { client = await new MongoClient(uri, { serverSelectionTimeoutMS: 2500 }).connect(); }
  catch { unavailable = 'MongoDB is not reachable from this environment'; }
}

if (!client) {
  test('MongoDB application integration suite', { skip: unavailable }, () => {});
} else {
  // Atlas limits database names to 38 bytes.
  const databaseName = `examforge_test_${randomBytes(8).toString('hex')}`;
  const db = client.db(databaseName);
  const exam: Exam = { _id: 'exam/computer', name: 'Exam', category: 'Computer', slug: 'exam', categorySlug: 'computer', active: true };
  const subject: Subject = { _id: 'exam/computer/core', examId: exam._id, name: 'Core', slug: 'core', setCount: 4, questionCount: 4, order: 0, active: true };
  const sets: PracticeSet[] = Array.from({ length: 4 }, (_, i) => ({ _id: `${subject._id}/set-0${i + 1}`, examId: exam._id, subjectId: subject._id, subject: subject.name, number: i + 1, title: `Core Set ${i + 1}`, questionCount: 1, durationSeconds: 60, active: true }));
  const questions: StoredQuestion[] = sets.map((set, i) => ({ _id: `${exam._id}/core-0${i + 1}-001`, id: `core-0${i + 1}-001`, setId: set._id, order: 0, number: 1, question: `Question ${i + 1}?`, options: { A: 'Correct', B: 'Wrong', C: 'Other', D: 'None' }, answer: 'A', explanation: 'A is correct.', active: true }));
  const bank: Bank = { exams: [exam], subjects: [subject], sets, questions, excluded: [], sourceQuestions: 4 };

  test.before(async () => { await ensureIndexes(db); await seedBank(db, bank); });
  test.after(async () => { try { await db.dropDatabase(); } finally { await client!.close(); } });

  test('seed is repeatable against MongoDB', async () => {
    const second = await seedBank(db, bank);
    assert.equal(second.inserted, 0);
    assert.equal(await db.collection('questions').countDocuments(), 4);
  });

  test('guest can answer, submit, and retrieve a server-calculated result', async () => {
    const guest = await createGuest(db); const identity = { actorId: guest.actorId, guestId: guest.actorId };
    const attempt = await startAttempt(client!, db, identity, sets[0]._id);
    const saved = await saveAnswer(client!, db, identity, attempt.id, { index: 0, option: 'A', revision: attempt.revision });
    await submitAttempt(client!, db, identity, attempt.id);
    await submitAttempt(client!, db, identity, attempt.id);
    const result = await getResult(client!, db, identity, attempt.id);
    assert.deepEqual(result.result, { total: 1, attempted: 1, correct: 1, wrong: 0, unanswered: 0, score: 1, percentage: 100 });
    assert.equal(saved.questions.some(q => 'answer' in q), false);
    assert.equal((await db.collection<Actor>('actors').findOne({ _id: guest.actorId }))!.completed, 1, 'duplicate submission must not increment allowance twice');
  });

  test('anonymous allowance survives token resolution and blocks a fourth completion', async () => {
    const guest = await createGuest(db);
    const identity = (await resolveIdentity(db, guest.raw))!;
    for (const set of sets.slice(0, 3)) {
      const attempt = await startAttempt(client!, db, identity, set._id);
      await submitAttempt(client!, db, identity, attempt.id);
    }
    const refreshed = (await resolveIdentity(db, guest.raw))!;
    await assert.rejects(() => startAttempt(client!, db, refreshed, sets[3]._id), (error: AppError) => error.code === 'FREE_LIMIT');
  });

  test('expired answered attempt submits and untouched expiration preserves allowance', async () => {
    const guest = await createGuest(db); const identity = { actorId: guest.actorId, guestId: guest.actorId };
    let attempt = await startAttempt(client!, db, identity, sets[0]._id);
    await saveAnswer(client!, db, identity, attempt.id, { index: 0, option: 'B', revision: attempt.revision });
    await db.collection<Attempt>('attempts').updateOne({ _id: attempt.id }, { $set: { endsAt: new Date(0) } });
    const expired = await getAttempt(client!, db, identity, attempt.id);
    assert.equal(expired.status, 'EXPIRED');
    assert.equal((await getResult(client!, db, identity, attempt.id)).result.wrong, 1);
    attempt = await startAttempt(client!, db, identity, sets[1]._id);
    await db.collection<Attempt>('attempts').updateOne({ _id: attempt.id }, { $set: { endsAt: new Date(0) } });
    const abandoned = await getAttempt(client!, db, identity, attempt.id);
    assert.equal(abandoned.status, 'ABANDONED');
    assert.equal((await db.collection<Actor>('actors').findOne({ _id: guest.actorId }))!.completed, 1);
  });

  test('another actor cannot read, answer, submit, or review an attempt', async () => {
    const first = await createGuest(db); const second = await createGuest(db);
    const owner = { actorId: first.actorId, guestId: first.actorId }; const stranger = { actorId: second.actorId, guestId: second.actorId };
    const attempt = await startAttempt(client!, db, owner, sets[0]._id);
    for (const operation of [
      () => getAttempt(client!, db, stranger, attempt.id),
      () => saveAnswer(client!, db, stranger, attempt.id, { index: 0, option: 'A', revision: 0 }),
      () => submitAttempt(client!, db, stranger, attempt.id),
      () => getResult(client!, db, stranger, attempt.id),
    ]) await assert.rejects(operation, (error: AppError) => error.code === 'ATTEMPT_NOT_FOUND');
  });

  test('registration, login, invalid credentials, and guest-history claim work', async () => {
    const guest = await createGuest(db); const guestIdentity = { actorId: guest.actorId, guestId: guest.actorId };
    const attempt = await startAttempt(client!, db, guestIdentity, sets[0]._id);
    await submitAttempt(client!, db, guestIdentity, attempt.id);
    const email = `student-${randomUUID()}@example.com`; const password = 'a secure test passphrase';
    const registered = await authenticate(client!, db, guestIdentity, { email, password }, 'register');
    const account = (await resolveIdentity(db, guest.raw, registered.sessionToken))!;
    assert.equal(account.email, email);
    assert.equal((await getResult(client!, db, account, attempt.id)).result.total, 1);
    await assert.rejects(() => authenticate(client!, db, account, { email, password: 'incorrect passphrase' }, 'login'), (error: AppError) => error.code === 'INVALID_CREDENTIALS');
    const loggedIn = await authenticate(client!, db, account, { email, password }, 'login');
    assert.ok(loggedIn.sessionToken);
  });

  test('concurrent starts from two tabs reserve a single attempt', async () => {
    const guest = await createGuest(db); const identity = { actorId: guest.actorId, guestId: guest.actorId };
    const started = await Promise.all([startAttempt(client!, db, identity, sets[0]._id), startAttempt(client!, db, identity, sets[1]._id)]);
    assert.equal(started[0].id, started[1].id);
    assert.equal(await db.collection<Attempt>('attempts').countDocuments({ ownerId: guest.actorId }), 1);
  });

  test('racing answer saves and submission produce a score that matches the stored answers', async () => {
    const guest = await createGuest(db); const identity = { actorId: guest.actorId, guestId: guest.actorId };
    for (let round = 0; round < 5; round++) {
      const attempt = await startAttempt(client!, db, identity, sets[round % 3]._id);
      const outcomes = await Promise.allSettled([
        saveAnswer(client!, db, identity, attempt.id, { index: 0, option: 'A', revision: attempt.revision }),
        submitAttempt(client!, db, identity, attempt.id),
        submitAttempt(client!, db, identity, attempt.id),
      ]);
      for (const o of outcomes) if (o.status === 'rejected') assert.ok(['STALE_ATTEMPT', 'ATTEMPT_ENDED'].includes((o.reason as AppError).code), String(o.reason));
      const stored = (await db.collection<Attempt>('attempts').findOne({ _id: attempt.id }))!;
      assert.equal(stored.status, 'SUBMITTED');
      assert.equal(stored.result!.attempted, stored.answers.filter(Boolean).length);
      await db.collection<Actor>('actors').updateOne({ _id: guest.actorId }, { $set: { completed: 0 } });
    }
  });

  test('signing in mid-test moves the active attempt to the account', async () => {
    const guest = await createGuest(db); const guestIdentity = { actorId: guest.actorId, guestId: guest.actorId };
    const attempt = await startAttempt(client!, db, guestIdentity, sets[0]._id);
    const registered = await authenticate(client!, db, guestIdentity, { email: `student-${randomUUID()}@example.com`, password: 'a secure test passphrase' }, 'register');
    const account = (await resolveIdentity(db, guest.raw, registered.sessionToken))!;
    const resumed = await startAttempt(client!, db, account, sets[1]._id);
    assert.equal(resumed.id, attempt.id, 'starting another set must resume the claimed attempt');
    await submitAttempt(client!, db, account, attempt.id);
    assert.equal((await db.collection<Actor>('actors').findOne({ _id: account.actorId }))!.activeAttempt, null);
    assert.notEqual((await startAttempt(client!, db, account, sets[1]._id)).id, attempt.id);
  });
}
