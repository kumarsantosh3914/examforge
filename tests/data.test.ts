import assert from 'node:assert/strict';
import test from 'node:test';
import { access } from 'node:fs/promises';
import { readBank } from '../src/lib/data';

test('cleaned question bank is discovered and validated dynamically', async () => {
  const bank = await readBank();
  assert.deepEqual(bank.exams.map(e => e._id).sort(), ['bpsc-tre-4.0/computer', 'dsssb-tgt/computer-science', 'ssc-gd-constable']);
  assert.equal(bank.subjects.length, 20);
  assert.equal(bank.sets.length, 105);
  assert.equal(bank.sourceQuestions, 3449);
  assert.equal(bank.questions.length, 3446);
  assert.deepEqual(bank.excluded.map(q => q.id).sort(), ['hindi-05-003', 'programming-languages-05-027', 'reasoning-02-002']);
  assert.equal(bank.subjects.filter(s => s.examId === 'ssc-gd-constable').length, 5);
  // Source IDs are unique within an exam; exams may reuse them (both SSC GD and DSSSB have `mock-test-01-001`).
  assert.equal(new Set(bank.questions.map(q => q._id)).size, bank.questions.length);
  for (const exam of bank.exams) {
    const ids = bank.questions.filter(q => q.setId.startsWith(`${exam._id}/`)).map(q => q.id);
    assert.equal(new Set(ids).size, ids.length);
  }
  for (const set of bank.sets) {
    assert.equal(bank.questions.filter(q => q.setId === set._id).length, set.questionCount);
  }
});

test('exam index sets negative marking and a subject index can fix a set time limit', async () => {
  const bank = await readBank();
  const dsssb = bank.sets.filter(s => s.examId === 'dsssb-tgt/computer-science');
  assert.equal(dsssb.length, 5);
  for (const set of dsssb) assert.deepEqual([set.questionCount, set.durationSeconds, set.negativeMarking], [30, 600, 0.25]);
  // Other exams keep one minute per question and no deduction.
  for (const set of bank.sets.filter(s => s.examId !== 'dsssb-tgt/computer-science')) {
    assert.equal(set.durationSeconds, set.questionCount * 60);
    assert.equal('negativeMarking' in set, false);
  }
});

test('raw data remains separate from the cleaned seed source', async () => {
  await access('data/bpsc-tre-4.0/computer/index.json');
  await access('cleaned/bpsc-tre-4.0/computer/index.json');
  await access('data/ssc-gd-constable/index.json');
  await access('cleaned/ssc-gd-constable/index.json');
  assert.notEqual(process.env.QUESTION_BANK_DIR || 'cleaned', 'data');
});
