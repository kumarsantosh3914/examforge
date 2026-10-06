// Presentation metadata for the exam catalogue. Live exams come from the database;
// this only adds family, body and blurb. Planned exams are listed but never actionable.
export const families = [
  { id: 'teaching', label: 'Teaching' },
  { id: 'ssc', label: 'SSC' },
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
  'ssc-gd-constable': {
    family: 'ssc',
    title: 'SSC GD Constable Free Mock Tests & Previous Year Papers - General Duty Exam',
    shortTitle: 'SSC GD Constable',
    body: 'Staff Selection Commission',
    blurb: 'Prepare for SSC GD Constable (General Duty) exam with free online mock tests, previous year question papers, and practice sets. Join BSF, CRPF, CISF, ITBP, SSB & Assam Rifles with our complete test series. Master General Intelligence, Reasoning, General Knowledge, Elementary Mathematics, English & Hindi - Start your SSC GD 2026 preparation FREE!',
    description: 'Prepare for SSC GD Constable (General Duty) exam with free online mock tests, previous year question papers, and practice sets. Join BSF, CRPF, CISF, ITBP, SSB & Assam Rifles with our complete test series.',
  },
};

export interface PlannedExam { id: string; family: FamilyId; title: string; body: string; blurb: string }
export const plannedExams: PlannedExam[] = [
  { id: 'ssc-mts', family: 'ssc', title: 'SSC MTS', body: 'Staff Selection Commission', blurb: 'Multi-Tasking (Non-Technical) Staff recruitment.' },
  { id: 'rrb-ntpc', family: 'railway', title: 'RRB NTPC', body: 'Railway Recruitment Boards', blurb: 'Non-Technical Popular Categories recruitment for Indian Railways.' },
  { id: 'ctet', family: 'teaching', title: 'CTET', body: 'Central Board of Secondary Education', blurb: 'Central Teacher Eligibility Test for Classes I–VIII.' },
];

export const examHref = (examId: string) => `/exams/${examId}`;
export const examTitle = (exam: Exam) => liveExamMeta[exam._id]?.title ?? [exam.name, exam.category].filter(Boolean).join(' ');
export const examShortTitle = (exam: Exam) => liveExamMeta[exam._id]?.shortTitle ?? examTitle(exam);
