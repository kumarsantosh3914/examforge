import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { z } from 'zod';
import type { Exam, Subject, PracticeSet, StoredQuestion } from './types';

const text = z.string().trim().min(1);
const slug = z.string().regex(/^[a-z0-9][a-z0-9.-]*$/);
const options = z.object({ A: text, B: text, C: text.optional(), D: text.optional(), E: text.optional() }).strict();
export const questionSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/), number: z.number().int().positive(),
  question: text, options, answer: z.enum(['A', 'B', 'C', 'D', 'E']),
  explanation: z.string().optional(), hash: z.string().optional(),
  translations: z.object({ hi: z.object({ question: text, options, explanation: z.string().optional() }).optional() }).optional(),
}).refine(q => Boolean(q.options[q.answer]), 'Answer must reference a nonempty option')
  .refine(q => Object.entries(q.options).every(([key, value]) => key === q.answer || value?.trim() !== q.options[q.answer]?.trim()), 'Another option repeats the answer text');
// `negativeMarking`: marks deducted per wrong answer for every set of the exam (omit for none).
const rootSchema = z.object({ exam: text, category: text.nullable(), negativeMarking: z.number().positive().max(1).optional(), subjects: z.array(z.object({ name: text, slug, setCount: z.number().int().nonnegative() })) });
const indexSchema = z.object({ subject: text, slug, sets: z.array(z.object({ set: z.number().int().positive(), title: text, questionCount: z.number().int().nonnegative(), durationMinutes: z.number().int().positive().optional(), file: z.string().regex(/^set-\d+\.json$/) })) });
const setSchema = z.object({ subject: text, set: z.number().int().positive(), title: text, questions: z.array(z.unknown()) });
// Explicit quarantine: source is preserved; new invalid records fail validation.
// Keyed by `<exam id>/<question id>` so question IDs reused across exams cannot collide.
const quarantined = new Set(['bpsc-tre-4.0/computer/programming-languages-05-027', 'ssc-gd-constable/reasoning-02-002', 'ssc-gd-constable/hindi-05-003', 'ctet-paper-2/mathematics-06-014', 'ctet-paper-2/mock-test-mathematics-science-full-test-05-073', 'ctet-paper-1/mathematics-05-014', 'ctet-paper-1/mock-test-full-test-05-105', 'ssc-cpo/english-10-007', 'ssc-cpo/mock-test-full-test-01-057', 'rrb-alp/mathematics-10-027', 'rrb-alp/mathematics-10-035', 'rrb-alp/mathematics-10-041', 'bseb-10th/science-19-004', 'bseb-10th/social-science-15-017', 'bseb-10th/social-science-36-015']);
export const digest = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
export interface Bank { exams: Exam[]; subjects: Subject[]; sets: PracticeSet[]; questions: StoredQuestion[]; excluded: { id: string; file: string; reason: string }[]; sourceQuestions: number }
async function json(file: string) { return JSON.parse(await readFile(file, 'utf8')) as unknown; }
export async function readBank(directory = process.env.QUESTION_BANK_DIR || 'cleaned'): Promise<Bank> {
  const bank: Bank = { exams: [], subjects: [], sets: [], questions: [], excluded: [], sourceQuestions: 0 };
  const seen = new Set<string>();
  for (const examDir of await readdir(directory, { withFileTypes: true })) {
    if (!examDir.isDirectory()) continue;
    slug.parse(examDir.name);
    const examRoot = path.join(directory, examDir.name);
    // An exam is either split into categories (`<exam>/<category>/index.json`) or holds its subjects directly (`<exam>/index.json`).
    const flat = (await readdir(examRoot)).includes('index.json');
    const categories = flat ? [null] : (await readdir(examRoot, { withFileTypes: true })).filter(d => d.isDirectory()).map(d => d.name);
    for (const categorySlug of categories) {
      if (categorySlug) slug.parse(categorySlug);
      const root = categorySlug ? path.join(examRoot, categorySlug) : examRoot;
      const index = rootSchema.parse(await json(path.join(root, 'index.json')));
      if (Boolean(index.category) !== Boolean(categorySlug)) throw new Error(`Category does not match folder layout: ${root}`);
      const examId = categorySlug ? `${examDir.name}/${categorySlug}` : examDir.name;
      bank.exams.push({ _id: examId, name: index.exam, category: index.category, slug: examDir.name, categorySlug, active: true });
      const dirs = (await readdir(root, { withFileTypes: true })).filter(d => d.isDirectory()).map(d => d.name).sort();
      if (JSON.stringify(dirs) !== JSON.stringify(index.subjects.map(s => s.slug).sort())) throw new Error(`Subject index mismatch: ${root}`);
      for (const [order, subject] of index.subjects.entries()) {
        const subjectId = `${examId}/${subject.slug}`;
        const folder = path.join(root, subject.slug);
        const subjectIndex = indexSchema.parse(await json(path.join(folder, 'index.json')));
        if (subjectIndex.slug !== subject.slug || subjectIndex.subject !== subject.name || subject.setCount !== subjectIndex.sets.length) throw new Error(`Subject metadata mismatch: ${folder}`);
        const actual = (await readdir(folder)).filter(f => /^set-.*\.json$/.test(f)).sort();
        if (JSON.stringify(actual) !== JSON.stringify(subjectIndex.sets.map(s => s.file).sort())) throw new Error(`Set index mismatch: ${folder}`);
        let subjectCount = 0; let hindi = true;
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
              if (!quarantined.has(`${examId}/${id}`)) throw new Error(`Invalid question ${id}: ${parsed.error.message}`);
              bank.excluded.push({ id, file, reason: parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ') });
              continue;
            }
            const q = parsed.data;
            if (!q.translations?.hi) hindi = false;
            const id = `${examId}/${q.id}`;
            if (seen.has(id)) throw new Error(`Duplicate question ID: ${q.id}`);
            seen.add(id);
            bank.questions.push({ ...q, _id: id, setId, order: count++, active: true });
          }
          if (!count) throw new Error(`Empty usable set: ${file}`);
          subjectCount += count;
          // Sets allow one minute per question unless the subject index fixes a time limit.
          bank.sets.push({ _id: setId, examId, subjectId, subject: subject.name, number: set.set, title: set.title, questionCount: count, durationSeconds: (set.durationMinutes ?? count) * 60, ...(index.negativeMarking ? { negativeMarking: index.negativeMarking } : {}), active: true });
        }
        bank.subjects.push({ _id: subjectId, examId, name: subject.name, slug: subject.slug, setCount: subjectIndex.sets.length, questionCount: subjectCount, order, hindi, active: true });
      }
    }
  }
  if (!bank.questions.length) throw new Error('No usable question banks found');
  return bank;
}
