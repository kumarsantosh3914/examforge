import assert from 'node:assert/strict';
import test from 'node:test';
import { canGuestStart, completionState, ownerFilter, publicAttempt, scoreAttempt } from '../src/lib/attempts';
import type { Attempt, Question } from '../src/lib/types';

const questions: Question[] = [
  { id: 'q1', number: 1, question: 'One?', options: { A: 'Yes', B: 'No', C: 'Maybe', D: 'Never' }, answer: 'A', explanation: 'Because.' },
  { id: 'q2', number: 2, question: 'Two?', options: { A: 'No', B: 'Yes', C: 'Maybe', D: 'Never' }, answer: 'B', explanation: 'Because.' },
  { id: 'q3', number: 3, question: 'Three?', options: { A: 'No', B: 'Maybe', C: 'Yes', D: 'Never' }, answer: 'C', explanation: 'Because.' },
];

test('server score accounts for correct, wrong, and unanswered questions', () => {
  assert.deepEqual(scoreAttempt(questions, ['A', 'A', null]), { total: 3, attempted: 2, correct: 1, wrong: 1, unanswered: 1, score: 1, percentage: 33.33 });
});

test('negative marking deducts for wrong answers only and can take the score below zero', () => {
  assert.deepEqual(scoreAttempt(questions, ['A', 'A', null], 0.25), { total: 3, attempted: 2, correct: 1, wrong: 1, unanswered: 1, score: 0.75, percentage: 25, negativeMarking: 0.25 });
  assert.deepEqual(scoreAttempt(questions, [null, null, null], 0.25), { total: 3, attempted: 0, correct: 0, wrong: 0, unanswered: 3, score: 0, percentage: 0, negativeMarking: 0.25 });
  const allWrong = scoreAttempt(questions, ['B', 'A', 'A'], 0.25);
  assert.deepEqual([allWrong.score, allWrong.percentage], [-0.75, -25]);
});

test('an attempt view carries the set negative marking so the test page can show it', () => {
  const base: Attempt = { _id: '00000000-0000-4000-8000-000000000002', ownerId: 'guest', setId: 'set', subject: 'Subject', title: 'Set', status: 'IN_PROGRESS', questions, answers: [null, null, null], revision: 0, startedAt: new Date(), endsAt: new Date(Date.now() + 60_000) };
  assert.equal(publicAttempt({ ...base, negativeMarking: 0.25 }).negativeMarking, 0.25);
  assert.equal('negativeMarking' in publicAttempt(base), false);
});

test('three guest completions are allowed and the fourth start is denied', () => {
  assert.equal(canGuestStart(0), true);
  assert.equal(canGuestStart(2), true);
  assert.equal(canGuestStart(3), false);
  assert.equal(canGuestStart(4), false);
});

test('an untouched expiration preserves allowance while answered expiration counts', () => {
  assert.deepEqual(completionState(true, 0), { eligible: false, status: 'ABANDONED' });
  assert.deepEqual(completionState(true, 1), { eligible: true, status: 'EXPIRED' });
  assert.deepEqual(completionState(false, 0), { eligible: true, status: 'SUBMITTED' });
});

test('active attempt DTO never exposes answers or explanations', () => {
  const attempt: Attempt = { _id: '00000000-0000-4000-8000-000000000001', ownerId: 'guest', setId: 'set', subject: 'Subject', title: 'Set', status: 'IN_PROGRESS', questions, answers: [null, null, null], revision: 0, startedAt: new Date(), endsAt: new Date(Date.now() + 60_000) };
  const view = publicAttempt(attempt);
  for (const question of view.questions) {
    assert.equal('answer' in question, false);
    assert.equal('explanation' in question, false);
  }
});

test('attempt ownership scopes guest history and claimed account history', () => {
  assert.deepEqual(ownerFilter({ actorId: 'guest', guestId: 'guest' }), { ownerId: 'guest', userId: { $exists: false } });
  assert.deepEqual(ownerFilter({ actorId: 'user', userId: 'user', email: 'user@example.com' }), { userId: 'user' });
});
