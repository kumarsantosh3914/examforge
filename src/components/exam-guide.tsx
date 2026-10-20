import Link from 'next/link';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { getCatalogOrNull } from '@/lib/catalog';
import { examGuides } from '@/lib/exam-guides';
import { subjectHref } from '@/lib/exam-directory';

// Server-rendered so the guide is in the page HTML for search engines.
export async function ExamGuide({ examId }: { examId: string }) {
  const guide = examGuides[examId];
  if (!guide) return null;
  // Link a syllabus area to practice only for subjects that are live.
  const live = new Map((await getCatalogOrNull())?.subjects.filter(s => s.examId === examId).map(s => [s.slug, s]));
  const { facts, pattern, syllabus, eligibility, stages, merit, tips, faq } = guide;
  const toc = [
    pattern && { id: 'exam-pattern', label: 'Exam pattern' },
    syllabus && { id: 'syllabus', label: 'Syllabus' },
    eligibility && { id: 'eligibility', label: 'Eligibility' },
    (stages || merit) && { id: 'selection', label: 'Selection process' },
    tips && { id: 'tips', label: 'Preparation tips' },
    faq && { id: 'faq', label: 'Questions' },
  ].filter(t => !!t);

  return <section className="exam-guide" aria-labelledby="guide-title">
    <h2 id="guide-title">{guide.heading}</h2>
    <div className="guide-layout">
      <nav className="guide-toc" aria-label="On this page">
        <ul>{toc.map(t => <li key={t.id}><a href={`#${t.id}`}>{t.label}</a></li>)}</ul>
      </nav>
      <div className="guide-body">
        <div className="guide-intro">{guide.intro.map(p => <p key={p}>{p}</p>)}</div>

        {facts && <section aria-labelledby="facts-title">
          <h3 id="facts-title">{facts.title}</h3>
          <dl className="guide-facts">{facts.items.map(f => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}</dl>
          <p className="guide-source">{facts.source}</p>
        </section>}

        {pattern && <section id="exam-pattern" aria-labelledby="exam-pattern-title">
          <h3 id="exam-pattern-title">Exam pattern</h3>
          <p>{pattern.summary}</p>
          <div className="guide-table-wrap">
            <table className="guide-table">
              <caption className="sr-only">{pattern.caption}</caption>
              <thead><tr><th scope="col">Section</th><th scope="col">Subject</th><th scope="col" className="num">Questions</th><th scope="col" className="num">Marks</th></tr></thead>
              <tbody>{pattern.sections.map(s => <tr key={s.subject}><th scope="row">{s.part}</th><td>{s.subject}</td><td className="num">{s.questions}</td><td className="num">{s.marks}</td></tr>)}</tbody>
              <tfoot><tr><th scope="row">Total</th><td>{pattern.duration} for the whole paper</td><td className="num">{pattern.sections.reduce((n, s) => n + s.questions, 0)}</td><td className="num">{pattern.sections.reduce((n, s) => n + s.marks, 0)}</td></tr></tfoot>
            </table>
          </div>
          <h4>Marking scheme</h4>
          <div className="guide-table-wrap narrow">
            <table className="guide-table">
              <caption className="sr-only">Marks per response</caption>
              <thead><tr><th scope="col">Response</th><th scope="col" className="num">Marks</th></tr></thead>
              <tbody>{pattern.marking.map(m => <tr key={m.response}><th scope="row">{m.response}</th><td className={m.marks.startsWith('−') ? 'num negative' : 'num'}>{m.marks}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="guide-note">{pattern.note}</p>
        </section>}

        {syllabus && <section id="syllabus" aria-labelledby="syllabus-title">
          <h3 id="syllabus-title">Syllabus</h3>
          {syllabus.intro && <p>{syllabus.intro}</p>}
          <div className="syllabus-grid">{syllabus.areas.map(area => {
            const linked = (area.subjects ?? []).flatMap(slug => live.get(slug) ?? []);
            return <article key={area.title} className="syllabus-card">
              <h4>{area.title}</h4>
              <p>{area.summary}</p>
              <ul>{area.topics.map(t => <li key={t}>{t}</li>)}</ul>
              {linked.length > 0 && <ul className="syllabus-links" aria-label={`Practise ${area.title}`}>{linked.map(s => <li key={s._id}><Link href={subjectHref(s._id)}>Practise {s.name}<ArrowRight size={15} aria-hidden="true" /></Link></li>)}</ul>}
            </article>;
          })}</div>
        </section>}

        {eligibility && <section id="eligibility" aria-labelledby="eligibility-title">
          <h3 id="eligibility-title">Eligibility</h3>
          <p>{eligibility.intro}</p>
          <dl className="merit-list">{eligibility.items.map(e => <div key={e.title}><dt>{e.title}</dt><dd>{e.detail}</dd></div>)}</dl>
        </section>}

        {(stages || merit) && <section id="selection" aria-labelledby="selection-title">
          <h3 id="selection-title">Selection process</h3>
          {stages && <><p>{stages.intro}</p>
            <ol className="stage-list">{stages.items.map(s => <li key={s.title}><strong>{s.title}</strong><p>{s.detail}</p></li>)}</ol></>}
          {merit && <><h4>How the final merit is decided</h4>
            <dl className="merit-list">{merit.map(m => <div key={m.title}><dt>{m.title}</dt><dd>{m.detail}</dd></div>)}</dl></>}
        </section>}

        {tips && <section id="tips" aria-labelledby="tips-title">
          <h3 id="tips-title">Preparation tips</h3>
          <ul className="tip-list">{tips.map(t => <li key={t.title}><Check size={18} aria-hidden="true" /><div><strong>{t.title}</strong><p>{t.detail}</p></div></li>)}</ul>
        </section>}

        {faq && <section id="faq" aria-labelledby="faq-title">
          <h3 id="faq-title">Common questions</h3>
          <div className="faq-list">{faq.map(f => <details key={f.question}><summary>{f.question}<ChevronDown size={18} aria-hidden="true" /></summary><p>{f.answer}</p></details>)}</div>
        </section>}
      </div>
    </div>
  </section>;
}
