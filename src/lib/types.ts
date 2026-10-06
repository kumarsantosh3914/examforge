export type OptionKey = 'A' | 'B' | 'C' | 'D';
export type Options = Partial<Record<OptionKey, string>>;
export interface Question {
  id: string; number: number; question: string; options: Options;
  answer: OptionKey; explanation?: string; hash?: string;
  translations?: { hi?: { question: string; options: Options; explanation?: string } };
}
export interface Stored { _id: string; active: boolean; digest?: string }
export interface Exam extends Stored { name: string; category: string | null; slug: string; categorySlug: string | null }
export interface Subject extends Stored { examId: string; name: string; slug: string; setCount: number; questionCount: number; order: number }
export interface PracticeSet extends Stored { examId: string; subjectId: string; subject: string; number: number; title: string; questionCount: number; durationSeconds: number }
export interface StoredQuestion extends Question, Stored { setId: string; order: number }
export interface Actor { _id: string; kind: 'guest' | 'user'; completed: number; activeAttempt: string | null; revision: number; claimedBy?: string; createdAt: Date }
export interface User { _id: string; email: string; passwordHash: string; createdAt: Date }
export interface Session { _id: string; actorId: string; kind: 'guest' | 'user'; expiresAt: Date }
export interface Identity { actorId: string; guestId?: string; userId?: string; email?: string; sessionId?: string }
export interface Score { total: number; attempted: number; correct: number; wrong: number; unanswered: number; score: number; percentage: number }
export interface Attempt {
  _id: string; ownerId: string; userId?: string; setId: string; subject: string; title: string;
  status: 'IN_PROGRESS' | 'SUBMITTED' | 'EXPIRED' | 'ABANDONED';
  questions: Question[]; answers: (OptionKey | null)[]; revision: number;
  startedAt: Date; endsAt: Date; submittedAt?: Date; result?: Score;
}
export type PublicQuestion = Omit<Question, 'answer' | 'explanation' | 'hash' | 'translations'> & {
  translations?: { hi?: { question: string; options: Options } };
};
export interface AttemptView {
  id: string; setId: string; subject: string; title: string; status: Attempt['status'];
  questions: PublicQuestion[]; answers: (OptionKey | null)[]; revision: number;
  startedAt: string; endsAt: string; serverNow: string;
}
export interface ResultView extends Omit<AttemptView, 'questions'> { questions: Question[]; result: Score; submittedAt: string }
export interface Catalog {
  exams: Exam[]; subjects: Subject[]; sets: PracticeSet[];
}
export interface SessionView {
  email: string | null; remaining: number; completed: number;
  activeAttempt: { id: string; title: string } | null;
}
