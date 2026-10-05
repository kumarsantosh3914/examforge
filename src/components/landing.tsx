'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock3, Languages, Search, ShieldCheck, X } from 'lucide-react';
import type { Catalog } from '@/lib/types';
import { api } from '@/lib/client';
import { examHref, families, liveExamMeta, plannedExams, type FamilyId } from '@/lib/exam-directory';
import { useSession } from './session';
import { ErrorMessage, Shell } from './ui';

interface LiveCard { kind: 'live'; id: string; family: FamilyId; title: string; body: string; blurb: string; subjects: { id: string; name: string }[]; sets: number; questions: number }
interface SoonCard { kind: 'soon'; id: string; family: FamilyId; title: string; body: string; blurb: string }
type Card = LiveCard | SoonCard;

const familyLabel = (id: FamilyId) => families.find(f => f.id === id)?.label ?? 'Other';
const matches = (card: Card, q: string) => !q || `${card.title} ${card.body} ${card.blurb} ${familyLabel(card.family)}`.toLowerCase().includes(q);

export function Landing({ initialCatalog = null }: { initialCatalog?: Catalog | null }) {
  const [catalog, setCatalog] = useState<Catalog | null>(initialCatalog); const [error, setError] = useState('');
  const [family, setFamily] = useState<'all' | FamilyId>('all'); const [query, setQuery] = useState('');
  const search = useRef<HTMLInputElement>(null); const { session } = useSession();
  const load = () => { setError(''); api<Catalog>('/catalog').then(setCatalog).catch(e => setError((e as Error).message)); };
  useEffect(() => { if (!initialCatalog) api<Catalog>('/catalog').then(setCatalog).catch(e => setError((e as Error).message)); }, [initialCatalog]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName));
      if (e.key === '/' && !typing) { e.preventDefault(); search.current?.focus(); }
    };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, []);

  const cards = useMemo<Card[]>(() => {
    const live: LiveCard[] = (catalog?.exams ?? []).map(exam => {
      const meta = liveExamMeta[exam._id];
      const subjects = catalog!.subjects.filter(s => s.examId === exam._id);
      return { kind: 'live', id: exam._id, family: meta?.family ?? 'other', title: meta?.title ?? `${exam.name} ${exam.category}`, body: meta?.body ?? exam.name, blurb: meta?.blurb ?? '',
        subjects: subjects.map(s => ({ id: s._id, name: s.name })), sets: catalog!.sets.filter(s => s.examId === exam._id).length, questions: subjects.reduce((n, s) => n + s.questionCount, 0) };
    });
    return [...live, ...plannedExams.map(p => ({ kind: 'soon' as const, ...p }))];
  }, [catalog]);
  const q = query.trim().toLowerCase();
  const searched = cards.filter(c => matches(c, q));
  const visible = searched.filter(c => family === 'all' || c.family === family);
  const count = (id: 'all' | FamilyId) => searched.filter(c => id === 'all' || c.family === id).length;
  const liveCount = visible.filter(c => c.kind === 'live').length;

  return <Shell wide>
    <section className="hero-band" aria-labelledby="hero-title">
      <div className="hero-inner">
        <h1 id="hero-title">Which exam are you preparing&nbsp;for?</h1>
        <p className="hero-lede">Timed mock tests that save every answer as you go, with explanations in English and <span lang="hi">हिन्दी</span>. Your first three sets need no signup.</p>
        <form className="hero-search" role="search" onSubmit={e => { e.preventDefault(); document.getElementById('exams')?.scrollIntoView({ behavior: 'smooth' }); }}>
          <label htmlFor="exam-search" className="sr-only">Search exams</label>
          <Search size={20} aria-hidden="true" />
          <input id="exam-search" ref={search} type="search" autoComplete="off" placeholder="Search exams, e.g. BPSC, SSC, CTET" value={query} onChange={e => setQuery(e.target.value)} />
          {query ? <button type="button" className="search-clear" aria-label="Clear search" onClick={() => { setQuery(''); search.current?.focus(); }}><X size={18} /></button> : <kbd aria-hidden="true">/</kbd>}
        </form>
        <div className="family-tabs" role="group" aria-label="Filter by exam family">
          {[{ id: 'all' as const, label: 'All exams' }, ...families].map(f => <button key={f.id} type="button" aria-pressed={family === f.id} onClick={() => setFamily(f.id)}>{f.label}<span>{count(f.id)}</span></button>)}
        </div>
      </div>
    </section>

    <section className="exam-shelf" id="exams" aria-labelledby="shelf-title">
      <div className="shelf-head">
        <h2 id="shelf-title">{family === 'all' ? 'All exams' : `${familyLabel(family)} exams`}</h2>
        <p aria-live="polite">{catalog ? [liveCount && `${liveCount} ready to practise`, visible.length - liveCount && `${visible.length - liveCount} coming soon`].filter(Boolean).join(' · ') : 'Loading exams…'}</p>
      </div>
      {error && <ErrorMessage message={error} retry={load} />}
      {!catalog && !error ? <div className="exam-shelf-body" aria-hidden="true"><div className="exam-card skeleton featured-skeleton" /></div>
        : visible.length ? <div className="exam-shelf-body" key={`${family}:${q}`}>
          {visible.some(c => c.kind === 'live') && <div className="exam-featured">{visible.map(card => card.kind === 'live' && <LiveExam key={card.id} card={card} />)}</div>}
          {visible.some(c => c.kind === 'soon') && <div className="exam-grid">{visible.map(card => card.kind === 'soon' && <SoonExam key={card.id} card={card} />)}</div>}
        </div>
        : catalog && <div className="shelf-empty"><h3>No exams match “{query}”</h3><p>Try the exam’s short name, like BPSC or SSC, or <button type="button" className="text-button" onClick={() => { setQuery(''); setFamily('all'); }}>show all exams</button>.</p></div>}
    </section>

    <section className="practice-flow" aria-labelledby="flow-title">
      <h2 id="flow-title">How a practice set works</h2>
      <ol>
        <li><Clock3 size={22} aria-hidden="true" /><div><strong>On the clock</strong><p>One minute per question, timed by the server so a refresh never resets it.</p></div></li>
        <li><ShieldCheck size={22} aria-hidden="true" /><div><strong>Saved as you answer</strong><p>Refresh or close the tab and your test resumes where you left it. Sign in to pick it up on another device.</p></div></li>
        <li><Languages size={22} aria-hidden="true" /><div><strong>Reviewed in two languages</strong><p>Every question comes back with its correct answer and an explanation in English and <span lang="hi">हिन्दी</span>.</p></div></li>
      </ol>
      {!session?.email && <p className="flow-note">{session ? `${session.remaining} of 3 free sets left on this device.` : 'Three free sets on this device.'} <Link href="/auth?mode=register">Create a free account</Link> to keep practising and keep your history.</p>}
    </section>
  </Shell>;
}

function LiveExam({ card }: { card: LiveCard }) {
  const shown = card.subjects.slice(0, 6); const more = card.subjects.length - shown.length;
  return <article className="exam-card live" aria-labelledby={`exam-${card.id}`}>
    <div className="live-main">
    <div className="exam-card-top"><h3 id={`exam-${card.id}`}><Link href={examHref(card.id)}>{card.title}</Link></h3><span className="status live">Ready to practise</span></div>
    <p className="exam-body">{familyLabel(card.family)} · {card.body}</p>
    {card.blurb && <p className="exam-blurb">{card.blurb}</p>}
    <Link className="button primary exam-cta" href={examHref(card.id)}>Explore all {card.subjects.length} subjects<ArrowRight size={17} aria-hidden="true" /></Link>
    </div>
    <div className="live-detail">
    <dl className="exam-facts"><div><dt>Subjects</dt><dd>{card.subjects.length}</dd></div><div><dt>Practice sets</dt><dd>{card.sets}</dd></div><div><dt>Questions</dt><dd>{card.questions.toLocaleString('en-IN')}</dd></div><div><dt>Language</dt><dd>EN · <span lang="hi">हिं</span></dd></div></dl>
    <ul className="subject-chips" aria-label="Subjects">{shown.map(s => <li key={s.id}><Link href={`/practice?subject=${encodeURIComponent(s.id)}`}>{s.name}</Link></li>)}{more > 0 && <li><Link href={examHref(card.id)} className="more">+{more} more</Link></li>}</ul>
    </div>
  </article>;
}

function SoonExam({ card }: { card: SoonCard }) {
  return <article className="exam-card soon" aria-labelledby={`exam-${card.id}`}>
    <div className="exam-card-top"><h3 id={`exam-${card.id}`}>{card.title}</h3><span className="status soon">Coming soon</span></div>
    <p className="exam-body">{familyLabel(card.family)} · {card.body}</p>
    <p className="exam-blurb">{card.blurb}</p>
    <p className="soon-note">Question bank in preparation</p>
  </article>;
}
