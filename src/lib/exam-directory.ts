// Presentation metadata for the exam catalogue. Live exams come from the database;
// this only adds family, body and blurb. Planned exams are listed but never actionable.
export const families = [
  { id: 'teaching', label: 'Teaching' },
  { id: 'ssc', label: 'SSC' },
  { id: 'railway', label: 'Railway' },
] as const;
export type FamilyId = (typeof families)[number]['id'] | 'other';

export interface ExamMeta { family: FamilyId; title: string; body: string; blurb: string }

// Keyed by exam document _id (`<exam slug>/<category slug>`).
export const liveExamMeta: Record<string, ExamMeta> = {
  'bpsc-tre-4.0/computer': {
    family: 'teaching',
    title: 'BPSC TRE 4.0 Computer Science',
    body: 'Bihar Public Service Commission',
    blurb: 'Teacher recruitment, Computer Science paper. Timed sets across DBMS, networks, programming, AI and more.',
  },
};

export interface PlannedExam { id: string; family: FamilyId; title: string; body: string; blurb: string }
export const plannedExams: PlannedExam[] = [
  { id: 'ssc-gd', family: 'ssc', title: 'SSC GD Constable', body: 'Staff Selection Commission', blurb: 'Constable (General Duty) recruitment for the central armed police forces.' },
  { id: 'ssc-mts', family: 'ssc', title: 'SSC MTS', body: 'Staff Selection Commission', blurb: 'Multi-Tasking (Non-Technical) Staff recruitment.' },
  { id: 'rrb-ntpc', family: 'railway', title: 'RRB NTPC', body: 'Railway Recruitment Boards', blurb: 'Non-Technical Popular Categories recruitment for Indian Railways.' },
  { id: 'ctet', family: 'teaching', title: 'CTET', body: 'Central Board of Secondary Education', blurb: 'Central Teacher Eligibility Test for Classes I–VIII.' },
];

export const examHref = (examId: string) => `/exams/${examId}`;
