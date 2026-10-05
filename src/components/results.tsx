'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BookOpen, Check, CheckCircle2, CircleMinus, Globe2, X, ChevronRight } from 'lucide-react';
import type { ResultView } from '@/lib/types';
import { api, ApiError } from '@/lib/client';
import { useSession } from './session';
import { Shell, Loading, ErrorMessage } from './ui';
export function Results({ id }: { id: string }) {
  const [result, setResult] = useState<ResultView | null>(null); const [error, setError] = useState(''); const [code, setCode] = useState('');
  const [filter, setFilter] = useState('all'); const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const { session, refresh } = useSession();
  const ready = !!session;
  useEffect(() => {
    if (!ready) return;
    api<ResultView>(`/attempts/${id}/result`).then(setResult).catch((e: ApiError) => { setError(e.message); setCode(e.code); });
  }, [id, ready]);
  useEffect(() => { if (result) void refresh(); }, [result, refresh]);
  const score = result?.result;
  return <Shell>{error ? <><ErrorMessage message={error} />{code === 'IN_PROGRESS' && <Link className="button primary" href={`/test/${id}`}>Resume test</Link>}<Link className="button secondary" href="/">Back to practice</Link></> : !result || !score ? <Loading label="Preparing your result sheet…" /> : <>
    <div className="breadcrumbs"><Link href="/attempts">My attempts</Link><ChevronRight size={14} /><span>Result sheet</span></div>
    <div className="page-heading"><div><div className="eyebrow">PRACTICE COMPLETE</div><h1>Every attempt is progress.</h1><p>{result.title}</p></div><Link className="button secondary" href={`/practice?subject=${encodeURIComponent(result.setId.split('/').slice(0, -1).join('/'))}`}>Practice another set</Link></div>
    <section className="result-summary"><div className="score-ring" style={{ '--score': `${score.percentage}%` } as React.CSSProperties}><div><strong>{score.percentage}<small>%</small></strong><span>YOUR SCORE</span></div></div><div className="result-summary-copy"><span className="badge green"><CheckCircle2 size={14} />{result.status === 'EXPIRED' ? 'Time completed · Auto-submitted' : 'Successfully submitted'}</span><h2>{score.percentage >= 80 ? 'Strong work. Keep it going.' : score.percentage >= 50 ? 'A solid step forward.' : 'A starting point to build on.'}</h2><p>You answered {score.correct} of {score.total} questions correctly.<br />Review the explanations below to make your next attempt stronger.</p><span className="score-fraction">{score.score}<span> / {score.total} marks</span><small>No negative marking</small></span></div></section>
    <div className="result-stats">{[['Total questions', score.total, ''], ['Attempted', score.attempted, ''], ['Correct', score.correct, 'positive'], ['Wrong', score.wrong, 'negative'], ['Unanswered', score.unanswered, 'muted']].map(([label, n, cls]) => <div key={label}><span>{label}</span><strong className={String(cls)}>{n}</strong></div>)}</div>
    <div className="section-heading review-heading"><div><h2>Turn answers into understanding</h2><p>Your question-by-question review.</p></div><button className="button secondary small" onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}><Globe2 size={16} />{language === 'en' ? 'हिन्दी' : 'English'}</button></div><div className="review-filters" aria-label="Filter question reviews">{[['all', 'All questions', score.total], ['correct', 'Correct', score.correct], ['wrong', 'Wrong', score.wrong], ['unanswered', 'Unanswered', score.unanswered]].map(([key, label, count]) => <button key={key} className={filter === key ? 'selected' : ''} onClick={() => setFilter(String(key))} aria-pressed={filter === key}>{label}<span>{count}</span></button>)}</div>
    <div className="review-list">{result.questions.map((q, i) => {
      const answer = result.answers[i]; const status = !answer ? 'unanswered' : answer === q.answer ? 'correct' : 'wrong';
      if (filter !== 'all' && filter !== status) return null;
      const content = language === 'hi' && q.translations?.hi ? q.translations.hi : q;
      return <article className={`review-card ${status}`} key={q.id} lang={language}><div className="review-card-top"><span className="eyebrow">QUESTION {i + 1}</span><span className={`status-tag ${status}`}>{status === 'correct' ? <Check size={14} /> : status === 'wrong' ? <X size={14} /> : <CircleMinus size={14} />}{status === 'correct' ? 'Correct' : status === 'wrong' ? 'Incorrect' : 'Unanswered'}</span></div><h3>{content.question}</h3><div className="review-options">{Object.entries(content.options).map(([key, value]) => <div key={key} className={`${key === q.answer ? 'right-answer' : key === answer ? 'wrong-answer' : ''}`}><span className="option-letter">{key}</span><span>{value}</span>{key === q.answer && <Check size={17} />}{key === answer && key !== q.answer && <X size={17} />}</div>)}</div><div className="answer-comparison"><span>Your answer: <strong>{answer ? `${answer}. ${content.options[answer]}` : 'Not attempted'}</strong></span><span>Correct answer: <strong>{q.answer}. {content.options[q.answer]}</strong></span></div>{(content.explanation || q.explanation) && <div className="explanation"><BookOpen size={18} /><div><strong>Why this answer?</strong><p>{content.explanation || q.explanation}</p></div></div>}</article>;
    })}</div>
    {filter !== 'all' && (filter === 'correct' ? score.correct : filter === 'wrong' ? score.wrong : score.unanswered) === 0 && <div className="empty-state"><CheckCircle2 /><h3>No questions in this category</h3><button className="text-button" onClick={() => setFilter('all')}>View all questions</button></div>}
  </>}</Shell>;
}
