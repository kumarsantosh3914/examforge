import assert from 'node:assert/strict';
import test from 'node:test';
import { access } from 'node:fs/promises';
import { readBank } from '../src/lib/data';

test('cleaned question bank is discovered and validated dynamically', async () => {
  const bank = await readBank();
  assert.deepEqual(bank.exams.map(e => e._id).sort(), ['afcat', 'agniveer', 'bihar-police', 'bihar-police-constable', 'bpsc-tre-4.0/computer', 'bpsc-tre-4.0/physics-11-12', 'ctet-paper-1', 'ctet-paper-2', 'delhi-police', 'dsssb-tgt/computer-science', 'ibps-po', 'rajasthan-police', 'rpf-constable', 'rrb-group-d', 'rrb-je', 'rrb-ntpc-cbt-1', 'rrb-technician', 'sbi-clerk', 'sbi-po', 'ssc-gd-constable', 'ssc-mts', 'tet', 'up-police', 'rpf-si', 'rrb-alp', 'rrb-ntpc-cbt-2', 'ssc-cpo', 'bseb-10th', 'bpsc-tre-4.0/math-high-school', 'ssc-cgl', 'ssc-je', 'ssc-selection-post', 'ssc-stenographer', 'uppsc'].sort());
  assert.equal(bank.subjects.length, 126);
  assert.equal(bank.sets.length, 983);
  assert.equal(bank.sourceQuestions, 46456);
  assert.equal(bank.questions.length, 46441);
  assert.deepEqual(bank.excluded.map(q => q.id).sort(), ['english-10-007', 'hindi-05-003', 'mathematics-05-014', 'mathematics-06-014', 'mathematics-10-027', 'mathematics-10-035', 'mathematics-10-041', 'mock-test-full-test-01-057', 'mock-test-full-test-05-105', 'mock-test-mathematics-science-full-test-05-073', 'programming-languages-05-027', 'reasoning-02-002', 'science-19-004', 'social-science-15-017', 'social-science-36-015']);
  assert.equal(bank.subjects.filter(s => s.examId === 'ssc-gd-constable').length, 5);
  assert.equal(bank.subjects.filter(s => s.examId === 'bpsc-tre-4.0/physics-11-12').length, 20);
  assert.equal(bank.subjects.filter(s => s.examId === 'bihar-police-constable').length, 3);
  assert.equal(bank.subjects.filter(s => s.examId === 'ssc-mts').length, 6);
  assert.equal(bank.subjects.filter(s => s.examId === 'rrb-group-d').length, 4);
  assert.equal(bank.subjects.filter(s => s.examId === 'rpf-constable').length, 4);
  assert.equal(bank.subjects.filter(s => s.examId === 'rrb-je').length, 5);
  assert.equal(bank.subjects.filter(s => s.examId === 'rrb-ntpc-cbt-1').length, 3);
  assert.equal(bank.subjects.filter(s => s.examId === 'ctet-paper-1').length, 6);
  assert.equal(bank.subjects.filter(s => s.examId === 'ctet-paper-2').length, 9);
  assert.equal(bank.subjects.filter(s => s.examId === 'ssc-cpo').length, 5);
  assert.equal(bank.subjects.filter(s => s.examId === 'rrb-ntpc-cbt-2').length, 3);
  assert.equal(bank.subjects.filter(s => s.examId === 'rpf-si').length, 4);
  assert.equal(bank.subjects.filter(s => s.examId === 'rrb-alp').length, 4);
  assert.equal(bank.subjects.filter(s => s.examId === 'bseb-10th').length, 6);
  assert.equal(bank.subjects.filter(s => s.examId === 'bpsc-tre-4.0/math-high-school').length, 8);
  for (const examId of ['afcat', 'agniveer', 'bihar-police', 'delhi-police', 'ibps-po', 'rajasthan-police', 'rrb-technician', 'sbi-clerk', 'sbi-po', 'tet', 'up-police', 'ssc-cgl', 'ssc-je', 'ssc-selection-post', 'ssc-stenographer', 'uppsc']) {
    assert.equal(bank.subjects.filter(s => s.examId === examId).length, 1);
  }
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
  // Full Bihar Police mock tests keep the real paper's 2 hours for 100 questions.
  const biharMocks = bank.sets.filter(s => s.subjectId === 'bihar-police-constable/mock-test');
  assert.equal(biharMocks.length, 5);
  for (const set of biharMocks) assert.deepEqual([set.questionCount, set.durationSeconds, 'negativeMarking' in set], [100, 7200, false]);
  // SSC MTS session mock tests keep the real 45 minutes per session, whatever their question count.
  const mtsMocks = bank.sets.filter(s => s.subjectId === 'ssc-mts/mock-test-session-i' || s.subjectId === 'ssc-mts/mock-test-session-ii');
  assert.equal(mtsMocks.length, 19);
  for (const set of mtsMocks) assert.deepEqual([set.durationSeconds, 'negativeMarking' in set], [2700, false]);
  // Full RPF Constable (120 questions) and RRB JE CBT-1 (100 questions) mock tests keep the real 90 minutes, scaled to the set's size.
  const railMocks: [string, number][] = [['rpf-constable/mock-test-full-test', 120], ['rrb-je/mock-test-cbt-1-full-test', 100]];
  for (const [subjectId, full] of railMocks) {
    const sets = bank.sets.filter(s => s.subjectId === subjectId);
    assert.equal(sets.length, 10);
    for (const set of sets) assert.deepEqual([set.durationSeconds, 'negativeMarking' in set], [Math.round(set.questionCount * 90 / full) * 60, false]);
  }
  // Other sets keep one minute per question and no deduction.
  const fixed = new Set(['bihar-police-constable/mock-test', 'ssc-mts/mock-test-session-i', 'ssc-mts/mock-test-session-ii', ...railMocks.map(([id]) => id)]);
  for (const set of bank.sets.filter(s => s.examId !== 'dsssb-tgt/computer-science' && !fixed.has(s.subjectId))) {
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
