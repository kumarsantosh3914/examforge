import assert from 'node:assert/strict';
import test from 'node:test';
import { access } from 'node:fs/promises';
import { readBank } from '../src/lib/data';

test('cleaned question bank is discovered and validated dynamically', async () => {
  const bank = await readBank();
  assert.deepEqual(bank.exams.map(e => e._id).sort(), ['bpsc-tre-4.0/computer', 'ssc-gd-constable']);
  assert.equal(bank.subjects.length, 19);
  assert.equal(bank.sets.length, 100);
  assert.equal(bank.sourceQuestions, 3299);
  assert.equal(bank.questions.length, 3296);
  assert.deepEqual(bank.excluded.map(q => q.id).sort(), ['hindi-05-003', 'programming-languages-05-027', 'reasoning-02-002']);
  assert.equal(bank.subjects.filter(s => s.examId === 'ssc-gd-constable').length, 5);
  assert.equal(new Set(bank.questions.map(q => q.id)).size, bank.questions.length);
  for (const set of bank.sets) {
    assert.equal(bank.questions.filter(q => q.setId === set._id).length, set.questionCount);
  }
});

test('raw data remains separate from the cleaned seed source', async () => {
  await access('data/bpsc-tre-4.0/computer/index.json');
  await access('cleaned/bpsc-tre-4.0/computer/index.json');
  await access('data/ssc-gd-constable/index.json');
  await access('cleaned/ssc-gd-constable/index.json');
  assert.notEqual(process.env.QUESTION_BANK_DIR || 'cleaned', 'data');
});
