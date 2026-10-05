import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { z } from 'zod';
import type { Exam, Subject, PracticeSet, StoredQuestion } from './types';

const text = z.string().trim().min(1);
const slug = z.string().regex(/^[a-z0-9][a-z0-9.-]*$/);
const options = z.object({ A: text, B: text, C: text.optional(), D: text.optional() }).strict();
export const questionSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/), number: z.number().int().positive(),
  question: text, options, answer: z.enum(['A', 'B', 'C', 'D']),
  explanation: z.string().optional(), hash: z.string().optional(),
  translations: z.object({ hi: z.object({ question: text, options, explanation: z.string().optional() }).optional() }).optional(),
}).refine(q => Boolean(q.options[q.answer]), 'Answer must reference a nonempty option');
const rootSchema = z.object({ exam: text, category: text, subjects: z.array(z.object({ name: text, slug, setCount: z.number().int().nonnegative() })) });
const indexSchema = z.object({ subject: text, slug, sets: z.array(z.object({ set: z.number().int().positive(), title: text, questionCount: z.number().int().nonnegative(), file: z.string().regex(/^set-\d+\.json$/) })) });
const setSchema = z.object({ subject: text, set: z.number().int().positive(), title: text, questions: z.array(z.unknown()) });
// Explicit quarantine: source is preserved; new invalid records fail validation.
const quarantined = new Set(['programming-languages-05-027']);
export const digest = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
export interface Bank { exams: Exam[]; subjects: Subject[]; sets: PracticeSet[]; questions: StoredQuestion[]; excluded: { id: string; file: string; reason: string }[]; sourceQuestions: number }
async function json(file: string) { return JSON.parse(await readFile(file, 'utf8')) as unknown; }
export async function readBank(directory = process.env.QUESTION_BANK_DIR || 'cleaned'): Promise<Bank> {
  const bank: Bank = { exams: [], subjects: [], sets: [], questions: [], excluded: [], sourceQuestions: 0 };
  const seen = new Set<string>();
  for (const examDir of await readdir(directory, { withFileTypes: true })) {
    if (!examDir.isDirectory()) continue;
    slug.parse(examDir.name);
    for (const categoryDir of await readdir(path.join(directory, examDir.name), { withFileTypes: true })) {
      if (!categoryDir.isDirectory()) continue;
      slug.parse(categoryDir.name);
      const root = path.join(directory, examDir.name, categoryDir.name);
      const index = rootSchema.parse(await json(path.join(root, 'index.json')));
      const examId = `${examDir.name}/${categoryDir.name}`;
      bank.exams.push({ _id: examId, name: index.exam, category: index.category, slug: examDir.name, categorySlug: categoryDir.name, active: true });
      const dirs = (await readdir(root, { withFileTypes: true })).filter(d => d.isDirectory()).map(d => d.name).sort();
      if (JSON.stringify(dirs) !== JSON.stringify(index.subjects.map(s => s.slug).sort())) throw new Error(`Subject index mismatch: ${root}`);
      for (const [order, subject] of index.subjects.entries()) {
        const subjectId = `${examId}/${subject.slug}`;
        const folder = path.join(root, subject.slug);
        const subjectIndex = indexSchema.parse(await json(path.join(folder, 'index.json')));
        if (subjectIndex.slug !== subject.slug || subjectIndex.subject !== subject.name || subject.setCount !== subjectIndex.sets.length) throw new Error(`Subject metadata mismatch: ${folder}`);
        const actual = (await readdir(folder)).filter(f => /^set-.*\.json$/.test(f)).sort();
        if (JSON.stringify(actual) !== JSON.stringify(subjectIndex.sets.map(s => s.file).sort())) throw new Error(`Set index mismatch: ${folder}`);
        let subjectCount = 0;
        for (const set of subjectIndex.sets) {
          const file = path.join(folder, set.file);
          const source = setSchema.parse(await json(file));
          if (source.set !== set.set || source.subject !== subject.name || source.title !== set.title || source.questions.length !== set.questionCount) throw new Error(`Set metadata mismatch: ${file}`);
          const setId = `${subjectId}/${set.file.replace('.json', '')}`;
          if (seen.has(setId)) throw new Error(`Duplicate set: ${setId}`);
          seen.add(setId);
          let count = 0;
          for (const raw of source.questions) {
            bank.sourceQuestions++;
            const parsed = questionSchema.safeParse(raw);
            if (!parsed.success) {
              const id = z.object({ id: z.string() }).parse(raw).id;
              if (!quarantined.has(id)) throw new Error(`Invalid question ${id}: ${parsed.error.message}`);
              bank.excluded.push({ id, file, reason: parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ') });
              continue;
            }
            const q = parsed.data;
            const id = `${examId}/${q.id}`;
            if (seen.has(id)) throw new Error(`Duplicate question ID: ${q.id}`);
            seen.add(id);
            bank.questions.push({ ...q, _id: id, setId, order: count++, active: true });
          }
          if (!count) throw new Error(`Empty usable set: ${file}`);
          subjectCount += count;
          bank.sets.push({ _id: setId, examId, subjectId, subject: subject.name, number: set.set, title: set.title, questionCount: count, durationSeconds: count * 60, active: true });
        }
        bank.subjects.push({ _id: subjectId, examId, name: subject.name, slug: subject.slug, setCount: subjectIndex.sets.length, questionCount: subjectCount, order, active: true });
      }
    }
  }
  if (!bank.questions.length) throw new Error('No usable question banks found');
  return bank;
}
