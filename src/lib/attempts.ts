import { randomUUID } from 'node:crypto';
import type { Db, MongoClient, ClientSession, Filter } from 'mongodb';
import { collections } from './db';
import { AppError } from './errors';
import type { Attempt, AttemptView, Identity, OptionKey, Question, ResultView, Score } from './types';

const round2 = (n: number) => Math.round(n * 100) / 100;
// One mark per correct answer, minus `negativeMarking` per wrong one. Unanswered questions cost nothing,
// so the score (and percentage) can fall below zero, as on the real paper.
export function scoreAttempt(questions: Question[], answers: (OptionKey | null)[], negativeMarking = 0): Score {
  let correct = 0, attempted = 0;
  questions.forEach((q, i) => { if (answers[i]) { attempted++; if (answers[i] === q.answer) correct++; } });
  const total = questions.length, wrong = attempted - correct, score = round2(correct - wrong * negativeMarking);
  return { total, attempted, correct, wrong, unanswered: total - attempted, score, percentage: total ? round2(score / total * 100) : 0, ...(negativeMarking ? { negativeMarking } : {}) };
}
export function canGuestStart(completed: number) { return completed < 3; }
export function completionState(expired: boolean, attempted: number) {
  const eligible = !expired || attempted > 0;
  return { eligible, status: eligible ? expired ? 'EXPIRED' as const : 'SUBMITTED' as const : 'ABANDONED' as const };
}
export function publicAttempt(a: Attempt): AttemptView {
  return { id: a._id, setId: a.setId, subject: a.subject, title: a.title, status: a.status, answers: a.answers, revision: a.revision, ...(a.negativeMarking ? { negativeMarking: a.negativeMarking } : {}), startedAt: a.startedAt.toISOString(), endsAt: a.endsAt.toISOString(), serverNow: new Date().toISOString(),
    questions: a.questions.map(q => ({ id: q.id, number: q.number, question: q.question, options: q.options, ...(q.translations?.hi ? { translations: { hi: { question: q.translations.hi.question, options: q.translations.hi.options } } } : {}) })) };
}
export function ownerFilter(identity: Identity): Filter<Attempt> {
  // Claimed guest attempts belong to the account and cannot be read after logout.
  return identity.userId ? { userId: identity.userId } : { ownerId: identity.actorId, userId: { $exists: false } };
}
export async function ownedAttempt(db: Db, identity: Identity, id: string) {
  const a = await collections(db).attempts.findOne({ _id: id, ...ownerFilter(identity) });
  if (!a) throw new AppError(404, 'ATTEMPT_NOT_FOUND', 'This practice attempt is unavailable. Sign in to the account that started it, or choose a new set.');
  return a;
}

async function finalizeWithin(db: Db, id: string, session: ClientSession, manual: boolean) {
  const c = collections(db); const a = await c.attempts.findOne({ _id: id }, { session });
  if (!a) throw new AppError(404, 'ATTEMPT_NOT_FOUND', 'Practice attempt not found.');
  if (a.status !== 'IN_PROGRESS') return a;
  const now = new Date(); const expired = a.endsAt <= now;
  if (!manual && !expired) return a;
  const result = scoreAttempt(a.questions, a.answers, a.negativeMarking);
  // A manual submission consumes a slot, including blank submissions. A timed-out
  // attempt with no saved answers is abandoned and never reveals its answer key.
  const { eligible, status } = completionState(expired, result.attempted);
  await c.actors.updateOne({ _id: a.ownerId }, { $inc: { completed: eligible ? 1 : 0, revision: 1 } }, { session });
  await c.actors.updateOne({ _id: a.ownerId, activeAttempt: a._id }, { $set: { activeAttempt: null } }, { session });
  await c.attempts.updateOne({ _id: a._id, status: 'IN_PROGRESS' }, { $set: { status, submittedAt: now, ...(eligible ? { result } : {}) }, $inc: { revision: 1 } }, { session });
  return { ...a, status, submittedAt: now, ...(eligible ? { result } : {}), revision: a.revision + 1 } as Attempt;
}
export async function finalizeAttempt(client: MongoClient, db: Db, id: string, manual = false) {
  return client.withSession(session => session.withTransaction(() => finalizeWithin(db, id, session, manual)));
}
export async function startAttempt(client: MongoClient, db: Db, identity: Identity, setId: string) {
  const c = collections(db);
  return client.withSession(session => session.withTransaction(async () => {
    // Updating this actor serializes concurrent starts and finalizations; transactions
    // retry write conflicts. A browser counter is never consulted.
    let actor = await c.actors.findOneAndUpdate({ _id: identity.actorId }, { $inc: { revision: 1 } }, { session, returnDocument: 'after' });
    if (!actor) throw new AppError(401, 'SESSION_REQUIRED', 'Please refresh to start a practice session.');
    if (actor.kind === 'guest' && actor.claimedBy) throw new AppError(401, 'AUTH_REQUIRED', 'Sign in to continue with your saved practice account.');
    if (actor.activeAttempt) {
      const active = await finalizeWithin(db, actor.activeAttempt, session, false);
      if (active.status === 'IN_PROGRESS') return publicAttempt(active);
      actor = (await c.actors.findOne({ _id: actor._id }, { session }))!;
    }
    if (!identity.userId && !canGuestStart(actor.completed)) throw new AppError(401, 'FREE_LIMIT', 'You have completed your 3 free practice sets. Create a free account or sign in to keep practicing.');
    const set = await c.sets.findOne({ _id: setId, active: true }, { session });
    if (!set) throw new AppError(404, 'SET_NOT_FOUND', 'This practice set is no longer available.');
    const stored = await c.questions.find({ setId: set._id, active: true }, { session }).sort({ order: 1 }).toArray();
    if (!stored.length || stored.length !== set.questionCount) throw new AppError(503, 'SET_UNAVAILABLE', 'This set is being updated. Please try another set.');
    const questions: Question[] = stored.map(q => ({ id: q.id, number: q.number, question: q.question, options: q.options, answer: q.answer, explanation: q.explanation, translations: q.translations }));
    const startedAt = new Date();
    const attempt: Attempt = { _id: randomUUID(), ownerId: actor._id, ...(identity.userId ? { userId: identity.userId } : {}), setId: set._id, subject: set.subject, title: set.title, status: 'IN_PROGRESS', questions, answers: questions.map(() => null), revision: 0, ...(set.negativeMarking ? { negativeMarking: set.negativeMarking } : {}), startedAt, endsAt: new Date(startedAt.getTime() + set.durationSeconds * 1000) };
    await c.attempts.insertOne(attempt, { session });
    await c.actors.updateOne({ _id: actor._id }, { $set: { activeAttempt: attempt._id } }, { session });
    return publicAttempt(attempt);
  }));
}
export async function getAttempt(client: MongoClient, db: Db, identity: Identity, id: string) {
  const a = await ownedAttempt(db, identity, id);
  return publicAttempt(a.status === 'IN_PROGRESS' && a.endsAt <= new Date() ? await finalizeAttempt(client, db, id) : a);
}
export async function saveAnswer(client: MongoClient, db: Db, identity: Identity, id: string, input: { index: number; option: OptionKey | null; revision: number }) {
  const a = await ownedAttempt(db, identity, id);
  if (!a.questions[input.index] || (input.option !== null && !a.questions[input.index].options[input.option])) throw new AppError(400, 'INVALID_ANSWER', 'Choose an available answer option.');
  if (a.status !== 'IN_PROGRESS' || a.endsAt <= new Date()) {
    if (a.status === 'IN_PROGRESS') await finalizeAttempt(client, db, id);
    throw new AppError(409, 'ATTEMPT_ENDED', 'This test has ended. Your saved answers are ready to review.');
  }
  const saved = await collections(db).attempts.findOneAndUpdate({ _id: id, ...ownerFilter(identity), status: 'IN_PROGRESS', revision: input.revision, $expr: { $gt: ['$endsAt', '$$NOW'] } }, { $set: { [`answers.${input.index}`]: input.option }, $inc: { revision: 1 } }, { returnDocument: 'after' });
  if (!saved) throw new AppError(409, 'STALE_ATTEMPT', 'Your test changed in another tab or the timer ended. Refreshing your saved answers.');
  return publicAttempt(saved);
}
export async function submitAttempt(client: MongoClient, db: Db, identity: Identity, id: string) {
  await ownedAttempt(db, identity, id);
  const a = await finalizeAttempt(client, db, id, true);
  return { id: a._id, status: a.status };
}
export async function getResult(client: MongoClient, db: Db, identity: Identity, id: string): Promise<ResultView> {
  let a = await ownedAttempt(db, identity, id);
  if (a.status === 'IN_PROGRESS' && a.endsAt <= new Date()) a = await finalizeAttempt(client, db, id);
  if (a.status === 'IN_PROGRESS') throw new AppError(409, 'IN_PROGRESS', 'Finish your test before viewing the answer review.');
  if (a.status === 'ABANDONED' || !a.result) throw new AppError(410, 'ABANDONED', 'This untouched test expired. Your free allowance was not used. Start a new practice set.');
  return { ...publicAttempt(a), questions: a.questions, result: a.result, submittedAt: a.submittedAt!.toISOString() };
}
export async function expireAttempts(client: MongoClient, db: Db) {
  const cursor = collections(db).attempts.find({ status: 'IN_PROGRESS', endsAt: { $lte: new Date() } }, { projection: { _id: 1 } }).limit(500);
  let count = 0;
  for await (const a of cursor) { await finalizeAttempt(client, db, a._id); count++; }
  return count;
}
