import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Catalog, Subject } from '@/lib/types';
import type { SampleQuestion } from '@/lib/catalog';
import { examGuides } from '@/lib/exam-guides';
import { examHref, examShortTitle, examTitle, subjectHref } from '@/lib/exam-directory';

const practiceName = (name: string) => /mock test/i.test(name) ? name : `${name} mock tests`;

// Server-rendered "what these sets cover" content for a subject page, so it is in the page HTML for search engines.
export function SubjectGuide({ subject, catalog, samples = [] }: { subject: Subject; catalog: Catalog; samples?: SampleQuestion[] }) {
  const exam = catalog.exams.find(e => e._id === subject.examId);
  if (!exam) return null;
  const title = examTitle(exam); const short = examShortTitle(exam);
  const sets = catalog.sets.filter(s => s.subjectId === subject._id);
  // Only state a per-set size when every set shares it; full mock tests vary.
  const uniform = sets.length > 0 && sets.every(s => s.questionCount === sets[0].questionCount && s.durationSeconds === sets[0].durationSeconds);
  const counts = sets.map(s => s.questionCount);
  // Full mock tests can vary in length, so give the range rather than leaving the size out.
  const perSet = uniform ? `${sets[0].questionCount} questions in ${Math.ceil(sets[0].durationSeconds / 60)} minutes` : Math.min(...counts) < Math.max(...counts) ? `between ${Math.min(...counts)} and ${Math.max(...counts)} questions` : '';
  const isMock = /mock test/i.test(subject.name);
  const penalty = sets[0]?.negativeMarking;
  const pattern = isMock ? examGuides[exam._id]?.pattern : undefined;
  const areas = examGuides[exam._id]?.syllabus?.areas.filter(a => a.subjects?.includes(subject.slug)) ?? [];
  const siblings = catalog.subjects.filter(s => s.examId === exam._id && s._id !== subject._id);

  return <section className="exam-guide" aria-labelledby="subject-guide-title">
    <h2 id="subject-guide-title">{isMock ? `About these ${short} full-length mock tests` : `About these ${short} ${subject.name} sets`}</h2>
    <div className="guide-body">
      <div className="guide-intro">
        <p>{subject.setCount} free {isMock ? `full-length ${short} mock tests` : `${subject.name} mock tests for ${title}`}, with {subject.questionCount.toLocaleString('en-IN')} questions in all{perSet ? `. Each set has ${perSet}` : ''}. {subject.hindi === false ? 'Every question is explained after you submit; this question bank is in English only.' : 'Every question is in English and Hindi, and each one is explained after you submit.'}</p>
        <p>{penalty ? `Like the real exam, ${penalty} marks are deducted for each wrong answer and unanswered questions cost nothing.` : 'Wrong answers cost nothing here, so check the exam pattern and apply the real negative marking to your score yourself.'} Your first three sets need no signup.</p>
      </div>

      {pattern && <section aria-labelledby="subject-pattern-title">
        <h3 id="subject-pattern-title">The real {short} paper</h3>
        <p>{pattern.summary}</p>
        <div className="guide-table-wrap">
          <table className="guide-table">
            <caption className="sr-only">{pattern.caption}</caption>
            <thead><tr><th scope="col">Section</th><th scope="col">Subject</th><th scope="col" className="num">Questions</th><th scope="col" className="num">Marks</th></tr></thead>
            <tbody>{pattern.sections.map(s => <tr key={s.subject}><th scope="row">{s.part}</th><td>{s.subject}</td><td className="num">{s.questions}</td><td className="num">{s.marks}</td></tr>)}</tbody>
            <tfoot><tr><th scope="row">Total</th><td>{pattern.duration} for the whole paper</td><td className="num">{pattern.sections.reduce((n, s) => n + s.questions, 0)}</td><td className="num">{pattern.sections.reduce((n, s) => n + s.marks, 0)}</td></tr></tfoot>
          </table>
        </div>
      </section>}

      {areas.length > 0 && <section aria-labelledby="subject-covers-title">
        <h3 id="subject-covers-title">What these sets cover</h3>
        <div className="syllabus-grid">{areas.map(area => <article key={area.title} className="syllabus-card">
          <h4>{area.title}</h4>
          <p>{area.summary}</p>
          <ul>{area.topics.map(t => <li key={t}>{t}</li>)}</ul>
        </article>)}</div>
      </section>}

      {samples.length > 0 && <section aria-labelledby="subject-samples-title">
        <h3 id="subject-samples-title">Sample {isMock ? short : subject.name} questions with answers</h3>
        <p>A few questions from the first set. Open each one for the answer and explanation, then try the full set against the clock.</p>
        <ol className="sample-list">{samples.map(q => { const hi = q.translations?.hi; return <li key={q.number} className="sample-q">
          <p className="sample-text">{q.question}</p>
          <ul className="sample-options">{Object.entries(q.options).map(([k, v]) => <li key={k}><strong>{k}.</strong> {v}</li>)}</ul>
          <details>
            <summary>Show answer and explanation</summary>
            <p><strong>Answer: {q.answer}.</strong> {q.explanation}</p>
            {hi && <div lang="hi">
              <p className="sample-text">{hi.question}</p>
              <ul className="sample-options">{Object.entries(hi.options).map(([k, v]) => <li key={k}><strong>{k}.</strong> {v}</li>)}</ul>
              {hi.explanation && <p>{hi.explanation}</p>}
            </div>}
          </details>
        </li>; })}</ol>
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
