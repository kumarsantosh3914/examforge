'use client';
import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, BookOpen, Check, CheckCircle2, Clock3, Code2, Database, Layers3, Search, ShieldCheck, Terminal, Cpu, Network, Play, ChevronRight, Monitor } from 'lucide-react';
import type { Catalog, AttemptView } from '@/lib/types';
import { api, ApiError, post } from '@/lib/client';
import { clarityEvent } from '@/lib/clarity';
import { useSession } from './session';
import { examHref, examTitle, liveExamMeta, subjectHref } from '@/lib/exam-directory';
import { Shell, ErrorMessage, Loading } from './ui';

const icons = [Database, Cpu, Layers3, Code2, Monitor, Network, Terminal, BookOpen];
// `id` is an exam id (subject list) or a subject id (its sets). `children` renders below either, e.g. the server-rendered guide.
export function Library({ id, initialCatalog = null, children }: { id: string; initialCatalog?: Catalog | null; children?: ReactNode }) {
  return <Shell><LibraryContent id={id} initialCatalog={initialCatalog}>{children}</LibraryContent></Shell>;
}
function LibraryContent({ id, initialCatalog, children }: { id: string; initialCatalog: Catalog | null; children?: ReactNode }) {
  const [catalog, setCatalog] = useState<Catalog | null>(initialCatalog); const [error, setError] = useState('');
  const [search, setSearch] = useState(''); const [busy, setBusy] = useState('');
  const { session, error: sessionError, refresh } = useSession(); const router = useRouter();
  async function load() { setError(''); try { setCatalog(await api<Catalog>('/catalog')); } catch (e) { setError((e as Error).message); } }
  useEffect(() => { if (!initialCatalog) api<Catalog>('/catalog').then(setCatalog).catch(e => setError(e.message)); }, [initialCatalog]);
  async function start(id: string) {
    setBusy(id); setError('');
    try { const a = await api<AttemptView>('/attempts', post({ setId: id })); clarityEvent('start_practice'); await refresh(); router.push(`/test/${a.id}`); }
    catch (e) { if (e instanceof ApiError && (e.code === 'FREE_LIMIT' || e.code === 'AUTH_REQUIRED')) { clarityEvent('free_limit_reached'); router.push(`/auth?reason=limit&set=${encodeURIComponent(id)}`); } else setError((e as Error).message); }
    finally { setBusy(''); }
  }
  if (!catalog) return error ? <ErrorMessage message={error} retry={load} /> : <Loading />;
  // Subject pages derive the exam from the subject.
  const selectedSubject = catalog.exams.some(e => e._id === id) ? undefined : catalog.subjects.find(s => s._id === id);
  const selectedExam = catalog.exams.find(e => e._id === (selectedSubject ? selectedSubject.examId : id));
  if (!selectedExam) return <div className="empty-state"><BookOpen size={34} /><h2>This exam isn’t available yet</h2><p>It may still be in preparation. Browse the exams that are ready to practise.</p><Link className="button primary" href="/">See all exams</Link></div>;
  const subjects = catalog.subjects.filter(s => s.examId === selectedExam?._id);
  const sets = catalog.sets.filter(s => s.examId === selectedExam?._id);
  const count = subjects.reduce((n, s) => n + s.questionCount, 0);
  return <>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Exams</Link><ChevronRight size={14} aria-hidden="true" />{selectedSubject ? <Link href={examHref(selectedExam._id)}>{selectedExam.name}</Link> : <span aria-current="page">{selectedExam.name}</span>}</nav>
    {error && <ErrorMessage message={error} />}{sessionError && <ErrorMessage message={sessionError} retry={() => void refresh()} />}
    {selectedSubject ? <><SubjectSets catalog={catalog} subject={selectedSubject} start={start} busy={busy} ready={!!session} />{children}</> : <>
      <div className="page-heading"><div><h1>{mockTests(examTitle(selectedExam))}</h1><p>{liveExamMeta[selectedExam._id]?.body ? `${liveExamMeta[selectedExam._id].body}. ` : ''}Build your understanding, one focused test at a time.</p></div><span className="heading-icon"><GraduationIcon /></span></div>
      <div className="practice-banner"><div className="banner-main"><h2>{session?.activeAttempt ? 'Pick up where you left off.' : 'Ready when you are.'}</h2><p>{session?.activeAttempt ? session.activeAttempt.title : session?.email ? 'Choose a subject and give your preparation a focused boost.' : 'Your first 3 practice sets are on us. No signup needed.'}</p>
        {session?.activeAttempt ? <Link className="button primary" href={`/test/${session.activeAttempt.id}`}><Play size={16} />Resume practice</Link> : <button className="button primary" disabled={!sets.length || !session || !!busy} onClick={() => start(sets[0]._id)}><Play size={16} />{busy ? 'Preparing your test…' : session && !session.email && session.remaining === 0 ? 'Sign in to continue' : 'Start practicing'}</button>}
      </div><div className="banner-aside"><div className="mini-stack"><span><Clock3 size={18} /></span><div><strong>At your pace, on the clock</strong><small>Timed sets that build exam confidence</small></div></div><div className="mini-stack"><span><CheckCircle2 size={18} /></span><div><strong>Learn from every answer</strong><small>Detailed results and explanations</small></div></div><div className="mini-stack"><span><ShieldCheck size={18} /></span><div><strong>Your progress stays with you</strong><small>Answers save as you practice</small></div></div></div></div>
      <div className="stats-strip"><div><span className="stat-icon"><BookOpen size={20} /></span><strong>{subjects.length}</strong><span>Subjects to explore</span></div><div><span className="stat-icon"><Layers3 size={20} /></span><strong>{sets.length}</strong><span>Practice sets</span></div><div><span className="stat-icon"><CheckCircle2 size={20} /></span><strong>{count.toLocaleString()}</strong><span>Practice questions</span></div></div>
      <div className="section-heading"><div><h2>Find your focus</h2><p>Choose a subject to explore its practice sets.</p></div><label className="search-box"><Search size={18} /><input aria-label="Search subjects" placeholder="Search subjects…" value={search} onChange={e => setSearch(e.target.value)} /></label></div>
      <div className="subject-grid">{subjects.filter(s => s.name.toLowerCase().includes(search.toLowerCase())).map((subject, i) => { const Icon = icons[i % icons.length]; return <Link href={subjectHref(subject._id)} className="subject-card" key={subject._id}><div className="card-top"><span className={`subject-icon color-${i % 5}`}><Icon size={23} strokeWidth={1.7} /></span><ArrowUpRight className="card-arrow" size={19} /></div><h3>{subject.name}</h3><p>{subject.questionCount} questions <span>·</span> English & Hindi</p><div className="card-bottom"><span><Layers3 size={15} />{subject.setCount} practice sets</span><span>Explore sets</span></div></Link>; })}</div>
      {!subjects.filter(s => s.name.toLowerCase().includes(search.toLowerCase())).length && <div className="empty-state"><Search /><h2>{subjects.length ? 'No matching subjects' : 'Practice sets are on their way'}</h2><p>{subjects.length ? 'Try a different subject name.' : 'Check back soon for new practice material.'}</p></div>}
      {!session?.email && <div className="allowance-note"><span><ShieldCheck size={19} /><strong>{session?.remaining ?? 3} of 3 free attempts available</strong></span><span>Continue with a free account when you’re ready. <Link href="/auth?mode=register">Create account</Link></span></div>}
      {children}
    </>}
  </>;
}
function GraduationIcon() { return <BookOpen size={30} strokeWidth={1.4} />; }
// Searchers ask for "<exam> mock test", so headings say it unless the name already does.
const mockTests = (name: string) => /mock test/i.test(name) ? name : `${name} Mock Tests`;
function SubjectSets({ catalog, subject, start, busy, ready }: { catalog: Catalog; subject: Catalog['subjects'][number]; start: (id: string) => void; busy: string; ready: boolean }) {
  const { session } = useSession();
  const sets = catalog.sets.filter(s => s.subjectId === subject._id); const penalty = sets[0]?.negativeMarking;
  return <><Link className="back-link" href={examHref(subject.examId)}>← All subjects</Link><div className="page-heading"><div><h1>{mockTests(subject.name)}</h1><p>{sets.length} focused sets. {subject.questionCount} opportunities to learn.</p></div><span className="subject-icon color-0 large"><BookOpen size={30} /></span></div>
    {session?.activeAttempt && <div className="info-box">You have a test in progress. <Link href={`/test/${session.activeAttempt.id}`}>Resume your current test</Link> before starting another.</div>}
    <div className="set-layout"><div className="set-list">{sets.map(set => <article className="set-card" key={set._id}><div className="set-number">{String(set.number).padStart(2, '0')}</div><div className="set-copy"><h2>{set.title}</h2><p><span><BookOpen size={15} />{set.questionCount} questions</span><span><Clock3 size={15} />{Math.ceil(set.durationSeconds / 60)} minutes</span></p></div><button className="button secondary" disabled={!!busy || !ready} onClick={() => start(set._id)}>{busy === set._id ? 'Starting…' : 'Start test'}<Play size={14} /></button></article>)}</div><aside className="how-card"><span className="subject-icon color-0"><ShieldCheck size={24} /></span><h2>A focused practice session</h2><ul><li><Check size={17} />One mark for each correct answer</li><li><Check size={17} />{penalty ? `${penalty} marks deducted for each wrong answer` : 'No negative marking'}</li>{penalty && <li><Check size={17} />Unanswered questions cost nothing</li>}<li><Check size={17} />Answers save automatically</li><li><Check size={17} />Full explanations after submission</li></ul><div className="divider" /><p>The timer starts when you open the test. You can move between questions and change answers until you submit or time runs out.</p><small>{session?.email ? 'Signed in. All practice sets are available.' : `${session?.remaining ?? 3} free attempts remaining. A blank test that expires does not use an attempt.`}</small></aside></div>
  </>;
}
