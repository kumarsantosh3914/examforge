import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Catalog, Subject } from '@/lib/types';
import { examGuides } from '@/lib/exam-guides';
import { examHref, examShortTitle, examTitle, subjectHref } from '@/lib/exam-directory';

const practiceName = (name: string) => /mock test/i.test(name) ? name : `${name} mock tests`;

// Server-rendered "what these sets cover" content for a subject page, so it is in the page HTML for search engines.
export function SubjectGuide({ subject, catalog }: { subject: Subject; catalog: Catalog }) {
  const exam = catalog.exams.find(e => e._id === subject.examId);
  if (!exam) return null;
  const title = examTitle(exam); const short = examShortTitle(exam);
  const sets = catalog.sets.filter(s => s.subjectId === subject._id);
  // Only state a per-set size when every set shares it; full mock tests vary.
  const uniform = sets.length > 0 && sets.every(s => s.questionCount === sets[0].questionCount && s.durationSeconds === sets[0].durationSeconds);
  const perSet = uniform ? `${sets[0].questionCount} questions in ${Math.ceil(sets[0].durationSeconds / 60)} minutes` : '';
  const penalty = sets[0]?.negativeMarking;
  const areas = examGuides[exam._id]?.syllabus?.areas.filter(a => a.subjects?.includes(subject.slug)) ?? [];
  const siblings = catalog.subjects.filter(s => s.examId === exam._id && s._id !== subject._id);

  return <section className="exam-guide" aria-labelledby="subject-guide-title">
    <h2 id="subject-guide-title">About these {short} {subject.name} sets</h2>
    <div className="guide-body">
      <div className="guide-intro">
        <p>{subject.setCount} free {subject.name} mock tests for {title}, with {subject.questionCount.toLocaleString('en-IN')} questions in all{perSet ? `. Each set has ${perSet}` : ''}. Every question is in English and Hindi, and each one is explained after you submit.</p>
        <p>{penalty ? `Like the real exam, ${penalty} marks are deducted for each wrong answer and unanswered questions cost nothing.` : 'Wrong answers cost nothing here, so check the exam pattern and apply the real negative marking to your score yourself.'} Your first three sets need no signup.</p>
      </div>

      {areas.length > 0 && <section aria-labelledby="subject-covers-title">
        <h3 id="subject-covers-title">What these sets cover</h3>
        <div className="syllabus-grid">{areas.map(area => <article key={area.title} className="syllabus-card">
          <h4>{area.title}</h4>
          <p>{area.summary}</p>
          <ul>{area.topics.map(t => <li key={t}>{t}</li>)}</ul>
        </article>)}</div>
      </section>}

      {siblings.length > 0 && <section aria-labelledby="subject-more-title">
        <h3 id="subject-more-title">More {short} practice</h3>
        <ul className="syllabus-links related-links">
          {siblings.map(s => <li key={s._id}><Link href={subjectHref(s._id)}>{practiceName(s.name)}<ArrowRight size={15} aria-hidden="true" /></Link></li>)}
          <li><Link href={examHref(exam._id)}>{short} exam pattern and syllabus<ArrowRight size={15} aria-hidden="true" /></Link></li>
        </ul>
      </section>}
    </div>
  </section>;
}
