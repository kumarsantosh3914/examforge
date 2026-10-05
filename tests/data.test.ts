import assert from 'node:assert/strict';
import test from 'node:test';
import { access } from 'node:fs/promises';
import { readBank } from '../src/lib/data';

test('cleaned question bank is discovered and validated dynamically', async () => {
  const bank = await readBank();
  assert.equal(bank.exams.length, 1);
  assert.equal(bank.subjects.length, 14);
  assert.equal(bank.sets.length, 70);
  assert.equal(bank.sourceQuestions, 2099);
  assert.equal(bank.questions.length, 2098);
  assert.deepEqual(bank.excluded.map(q => q.id), ['programming-languages-05-027']);
  assert.equal(new Set(bank.questions.map(q => q.id)).size, bank.questions.length);
  for (const set of bank.sets) {
    assert.equal(bank.questions.filter(q => q.setId === set._id).length, set.questionCount);
  }
});

test('raw data remains separate from the cleaned seed source', async () => {
  await access('data/bpsc-tre-4.0/computer/index.json');
  await access('cleaned/bpsc-tre-4.0/computer/index.json');
  assert.notEqual(process.env.QUESTION_BANK_DIR || 'cleaned', 'data');
});
