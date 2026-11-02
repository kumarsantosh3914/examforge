import 'server-only';
import { cache } from 'react';
import type { Db } from 'mongodb';
import { collections, getDb } from './db';
import type { Catalog, Question } from './types';

export async function readCatalog(db: Db): Promise<Catalog> {
  const c = collections(db);
  const [exams, subjects, sets] = await Promise.all([
    c.exams.find({ active: true }, { projection: { digest: 0 } }).toArray(),
    c.subjects.find({ active: true }, { projection: { digest: 0 } }).sort({ order: 1 }).toArray(),
    c.sets.find({ active: true }, { projection: { digest: 0 } }).sort({ number: 1 }).toArray(),
  ]);
  return { exams, subjects, sets };
}

// One read per request, shared by metadata and the page. Pages fall back to the
// client-side fetch when this fails, so a database hiccup never blanks a page.
export const getCatalog = cache(async () => readCatalog(await getDb()));
export const getCatalogOrNull = cache(async () => getCatalog().catch(() => null));

export type SampleQuestion = Pick<Question, 'number' | 'question' | 'options' | 'answer' | 'explanation' | 'translations'>;

// A few real questions from a subject's first set, so its page carries content no other page has. Null on a database error.
export const getSampleQuestions = cache(async (subjectId: string, limit = 3): Promise<SampleQuestion[] | null> => {
  try {
    const c = collections(await getDb());
    const first = await c.sets.find({ subjectId, active: true }, { projection: { _id: 1 } }).sort({ number: 1 }).limit(1).next();
    if (!first) return [];
    const rows = await c.questions.find({ setId: first._id, active: true }, { projection: { number: 1, question: 1, options: 1, answer: 1, explanation: 1, translations: 1 } }).sort({ order: 1 }).limit(limit).toArray();
    return rows.map(({ number, question, options, answer, explanation, translations }) => ({ number, question, options, answer, explanation, translations }));
  } catch { return null; }
});
