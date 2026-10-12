// Presentation metadata for the exam catalogue. Live exams come from the database;
// this only adds family, body and blurb. Planned exams are listed but never actionable.
export const families = [
  { id: 'teaching', label: 'Teaching' },
  { id: 'ssc', label: 'SSC' },
  { id: 'police', label: 'Police' },
  { id: 'railway', label: 'Railway' },
] as const;
import type { Exam } from './types';

export type FamilyId = (typeof families)[number]['id'] | 'other';

// `description` overrides the generated meta description on the exam page; `shortTitle` names the exam inside subject page titles.
export interface ExamMeta { family: FamilyId; title: string; shortTitle?: string; body: string; blurb: string; description?: string }

// Keyed by exam document _id (`<exam slug>/<category slug>`, or `<exam slug>` for exams without categories).
export const liveExamMeta: Record<string, ExamMeta> = {
  'bpsc-tre-4.0/computer': {
    family: 'teaching',
    title: 'BPSC TRE 4.0 Computer Science',
    body: 'Bihar Public Service Commission',
    blurb: 'Teacher recruitment, Computer Science paper. Timed sets across DBMS, networks, programming, AI and more.',
  },
  'bpsc-tre-4.0/physics-11-12': {
    family: 'teaching',
    title: 'BPSC TRE 4.0 Physics (Classes 11–12)',
    shortTitle: 'BPSC TRE 4.0 Physics',
    body: 'Bihar Public Service Commission',
    blurb: 'Teacher recruitment, Physics paper for higher secondary. Timed sets across all 20 Class 11–12 units, from kinematics to semiconductors.',
    description: 'Free BPSC TRE 4.0 Physics mock tests for Class 11–12 teachers: 100 timed sets across 20 units, from measurement and mechanics to optics, modern physics and electronic devices, with explanations in English and Hindi.',
  },
  'ssc-gd-constable': {
    family: 'ssc',
    title: 'SSC GD Constable Free Mock Tests & Previous Year Papers - General Duty Exam',
    shortTitle: 'SSC GD Constable',
    body: 'Staff Selection Commission',
    blurb: 'Prepare for SSC GD Constable (General Duty) exam with free online mock tests, previous year question papers, and practice sets. Join BSF, CRPF, CISF, ITBP, SSB & Assam Rifles with our complete test series. Master General Intelligence, Reasoning, General Knowledge, Elementary Mathematics, English & Hindi - Start your SSC GD 2026 preparation FREE!',
    description: 'Prepare for SSC GD Constable (General Duty) exam with free online mock tests, previous year question papers, and practice sets. Join BSF, CRPF, CISF, ITBP, SSB & Assam Rifles with our complete test series.',
  },
  'ssc-mts': {
    family: 'ssc',
    title: 'SSC MTS',
    body: 'Staff Selection Commission',
    blurb: 'Multi-Tasking (Non-Technical) Staff and Havaldar recruitment. Full Session I and Session II mock tests on the real 45-minute timer, plus sets for every section.',
    description: 'Free SSC MTS and Havaldar mock tests: full Session I (Mathematics and Reasoning) and Session II (General Awareness and English) papers on the real 45-minute timer, plus sectional sets, with explanations in English and Hindi.',
  },
  'bihar-police-constable': {
    family: 'police',
    title: 'Bihar Police Constable',
    body: 'Central Selection Board of Constables, Bihar',
    blurb: 'CSBC constable (sipahi) written exam. Full 100-question, 2-hour mock tests, plus sets for Bihar GK and General Science.',
    description: 'Free Bihar Police Constable mock tests for the CSBC written exam: full 100-question, 2-hour papers covering Hindi, English, Mathematics, Science, Social Science and Bihar GK, plus General Knowledge and General Science sets, with explanations in English and Hindi.',
  },
  'rrb-group-d': {
    family: 'railway',
    title: 'RRB Group D',
    body: 'Railway Recruitment Boards',
    blurb: 'Level 1 posts in Indian Railways, such as track maintainer and assistant. Timed sets for all four CBT sections: Science, Mathematics, Reasoning and General Awareness.',
    description: 'Free RRB Group D mock tests for the Level 1 CBT: timed sets for General Science, Mathematics, Reasoning and General Awareness & Current Affairs, with explanations in English and Hindi.',
  },
  'dsssb-tgt/computer-science': {
    family: 'teaching',
    title: 'DSSSB TGT Computer Science',
    body: 'Delhi Subordinate Services Selection Board',
    blurb: 'Delhi teacher recruitment, TGT Computer Science. 30-question, 10-minute mock tests built from previous papers, with the real −0.25 negative marking.',
    description: 'Free DSSSB TGT Computer Science mock tests from previous year papers: 30 questions in 10 minutes, with 0.25 marks deducted for each wrong answer like the real exam, and explanations in English and Hindi.',
  },
  'ctet-paper-2': {
    family: 'teaching',
    title: 'CTET Paper 2 (Classes 6–8)',
    shortTitle: 'CTET Paper 2',
    body: 'Central Board of Secondary Education',
    blurb: 'Central Teacher Eligibility Test for upper primary teachers. Full 150-question mock tests for the Mathematics & Science and Social Studies streams, plus sets for Child Development and Pedagogy, both languages and every subject.',
    description: 'Free CTET Paper 2 mock tests for Classes 6–8: full 150-question, 150-minute papers for Mathematics & Science and Social Studies, and practice sets for Child Development and Pedagogy, Hindi, English and each subject, with explanations in English and Hindi.',
  },
  'ctet-paper-1': {
    family: 'teaching',
    title: 'CTET Paper 1 (Classes 1–5)',
    shortTitle: 'CTET Paper 1',
    body: 'Central Board of Secondary Education',
    blurb: 'Central Teacher Eligibility Test for primary teachers. Full 150-question mock tests, plus sets for Child Development and Pedagogy, both languages, Mathematics and EVS.',
    description: 'Free CTET Paper 1 mock tests for Classes 1–5: full 150-question, 150-minute papers, and practice sets for Child Development and Pedagogy, Hindi, English, Mathematics and Environmental Studies, with explanations in English and Hindi.',
  },
};

export interface PlannedExam { id: string; family: FamilyId; title: string; body: string; blurb: string }
export const plannedExams: PlannedExam[] = [
  { id: 'rrb-ntpc', family: 'railway', title: 'RRB NTPC', body: 'Railway Recruitment Boards', blurb: 'Non-Technical Popular Categories recruitment for Indian Railways.' },
];

export const examHref = (examId: string) => `/exams/${examId}`;
export const examTitle = (exam: Exam) => liveExamMeta[exam._id]?.title ?? [exam.name, exam.category].filter(Boolean).join(' ');
export const examShortTitle = (exam: Exam) => liveExamMeta[exam._id]?.shortTitle ?? examTitle(exam);
