'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BookOpen, Check, ChevronLeft, ChevronRight, Clock3, CloudCheck, Globe2, Send, ShieldCheck, X } from 'lucide-react';
import { api, ApiError, post } from '@/lib/client';
import type { AttemptView, OptionKey } from '@/lib/types';
import { Brand, ErrorMessage, Loading } from './ui';
import { useSession } from './session';

export function TestWorkspace({ id }: { id: string }) {
  const router = useRouter(); const { session, refresh, error: sessionError } = useSession();
  const [attempt, setAttempt] = useState<AttemptView | null>(null); const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(0); const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [error, setError] = useState(''); const [saving, setSaving] = useState(false); const [submitting, setSubmitting] = useState(false); const [confirm, setConfirm] = useState(false);
  const busy = useRef(false); const submittingRef = useRef(false); const clock = useRef({ remaining: 0, calibrated: 0 }); const version = useRef(-1); const dialog = useRef<HTMLDialogElement>(null);
  const accept = useCallback((value: AttemptView) => {
    if (value.status !== 'IN_PROGRESS') { router.replace(`/results/${id}`); return; }
    if (value.revision < version.current) return;
    version.current = value.revision;
    clock.current = { remaining: Math.max(0, new Date(value.endsAt).getTime() - new Date(value.serverNow).getTime()), calibrated: performance.now() };
    setSeconds(Math.ceil(clock.current.remaining / 1000)); setAttempt(value);
  }, [id, router]);
  const sync = useCallback(async () => {
    if (busy.current || submittingRef.current) return;
    try { accept(await api<AttemptView>(`/attempts/${id}`)); setError(''); } catch (e) { setError((e as Error).message); }
  }, [id, accept]);
  useEffect(() => {
    if (!session) return;
    api<AttemptView>(`/attempts/${id}`).then(accept).catch(e => setError(e.message));
    const timer = setInterval(() => void sync(), 15000);
    const visible = () => { if (document.visibilityState === 'visible') void sync(); };
    window.addEventListener('online', sync); window.addEventListener('focus', sync); document.addEventListener('visibilitychange', visible);
    return () => { clearInterval(timer); window.removeEventListener('online', sync); window.removeEventListener('focus', sync); document.removeEventListener('visibilitychange', visible); };
  }, [session, sync, id, accept]);
  const submit = useCallback(async () => {
    if (submittingRef.current || busy.current) return;
    submittingRef.current = true; setSubmitting(true); setError('');
    try { await api(`/attempts/${id}/submit`, post()); await refresh(); router.replace(`/results/${id}`); }
    catch (e) { setError((e as Error).message); } finally { submittingRef.current = false; setSubmitting(false); }
  }, [id, refresh, router]);
  useEffect(() => {
    if (!attempt) return;
    let lastRetry = 0;
    const timer = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((clock.current.remaining - (performance.now() - clock.current.calibrated)) / 1000));
      setSeconds(remaining);
      if (!remaining && performance.now() - lastRetry > 5000) { lastRetry = performance.now(); void submit(); }
    }, 250);
    return () => clearInterval(timer);
  }, [attempt, submit]);
  useEffect(() => { if (confirm) dialog.current?.showModal(); else dialog.current?.close(); }, [confirm]);
  async function answer(option: OptionKey | null) {
    if (!attempt || busy.current || !seconds) return;
    busy.current = true; setSaving(true); setError('');
    try { accept(await api<AttemptView>(`/attempts/${id}/answer`, { method: 'PATCH', body: JSON.stringify({ index, option, revision: attempt.revision }) })); }
    catch (e) {
      setError((e as Error).message);
      if (e instanceof ApiError && e.status === 409) { try { accept(await api<AttemptView>(`/attempts/${id}`)); } catch { /* Keep actionable error and retry controls. */ } }
    } finally { busy.current = false; setSaving(false); }
  }
  const q = attempt?.questions[index]; const translated = language === 'hi' ? q?.translations?.hi : undefined;
  const answered = attempt?.answers.filter(Boolean).length || 0;
  return <div className="test-page"><a className="skip-link" href="#question">Skip to question</a><header className="test-header"><Brand /><span className="focus-label"><ShieldCheck size={16} />Focus mode</span><Link href="/" className="text-button">Back to library</Link></header>
    {!attempt || !q ? <div className="test-loading">{error || sessionError ? <><ErrorMessage message={error || sessionError} retry={() => { void refresh(); void sync(); }} /><Link href="/" className="button secondary">Back to library</Link></> : <Loading label="Preparing your practice session…" />}</div> : <main className="test-main">
      <div className="test-title-row"><div><h1>{attempt.title}</h1><p>+1 correct <span>·</span> {attempt.negativeMarking ? `−${attempt.negativeMarking} wrong` : 'No negative marking'}</p></div><div className={`timer ${seconds < 60 ? 'urgent' : ''}`} role="timer" aria-label={`${Math.floor(seconds / 60)} minutes ${seconds % 60} seconds remaining`}><Clock3 size={24} /><div><span>TIME REMAINING</span><strong>{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</strong></div></div></div>
      {error && <ErrorMessage message={error} retry={() => void sync()} />}{seconds === 0 && <div className="info-box" role="status">Time is up. Submitting your saved answers… {error && <button onClick={() => void submit()}>Retry submission</button>}</div>}
      <div className="test-layout"><section className="question-panel" id="question"><div className="question-toolbar"><span>QUESTION <strong>{index + 1}</strong><span className="muted"> / {attempt.questions.length}</span></span><button className="language-button" onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}><Globe2 size={16} />{language === 'en' ? 'हिन्दी' : 'English'}</button></div>
        <div className="question-body" lang={language}><h2>{translated?.question || q.question}</h2><fieldset disabled={submitting || seconds === 0} aria-busy={saving}><legend className="sr-only">Choose one answer</legend>{Object.entries(translated?.options || q.options).map(([key, label]) => <label className={`answer-option ${attempt.answers[index] === key ? 'chosen' : ''}`} key={`${q.id}-${key}`}><input type="radio" name={q.id} value={key} checked={attempt.answers[index] === key} onChange={() => void answer(key as OptionKey)} /><span className="option-letter">{key}</span><span className="option-copy">{label}</span><span className="option-check">{attempt.answers[index] === key && <Check size={16} />}</span></label>)}</fieldset><button className="text-button clear-answer" disabled={!attempt.answers[index] || saving || !seconds} onClick={() => void answer(null)}>Clear answer</button></div>
        <div className="question-navigation"><button className="button secondary" disabled={index === 0} onClick={() => setIndex(index - 1)}><ChevronLeft size={17} />Previous</button><span className="save-state" role="status"><CloudCheck size={16} />{saving ? 'Saving…' : 'Saved to your session'}</span><button className="button primary" disabled={index === attempt.questions.length - 1} onClick={() => setIndex(index + 1)}>Next<ChevronRight size={17} /></button></div>
      </section><aside className="palette-panel"><div className="palette-title"><h2>Your progress</h2><span>{answered}/{attempt.questions.length}</span></div><div className="progress-track"><span style={{ transform: `scaleX(${answered / attempt.questions.length})` }} /></div><p className="palette-summary"><strong>{answered}</strong> answered <span>·</span> {attempt.questions.length - answered} remaining</p><div className="palette" aria-label="Question navigation">{attempt.questions.map((question, i) => <button key={question.id} aria-label={`Question ${i + 1}, ${attempt.answers[i] ? 'answered' : 'unanswered'}`} aria-current={index === i ? 'step' : undefined} className={`${attempt.answers[i] ? 'answered' : ''} ${index === i ? 'current' : ''}`} onClick={() => setIndex(i)}>{i + 1}</button>)}</div><div className="palette-legend"><span><i className="legend-answered" />Answered</span><span><i />Unanswered</span><span><i className="legend-current" />Current</span></div><button className="button primary full" onClick={() => setConfirm(true)} disabled={saving || submitting || !seconds}><Send size={16} />{submitting ? 'Submitting…' : 'Submit test'}</button><p className="palette-hint"><Clock3 size={15} />Your test submits automatically when time runs out.</p></aside></div>
      <div className="test-bottom-note"><BookOpen size={16} />{attempt.negativeMarking ? `A wrong answer costs ${attempt.negativeMarking} marks and a blank costs nothing, so clear any answer you are unsure of before you submit.` : 'Take your time. You can change any answer before you submit.'}</div>
    </main>}
    <dialog ref={dialog} className="submit-dialog" onCancel={() => setConfirm(false)}><div className="dialog-top"><span className="subject-icon color-0"><Send size={22} /></span><button className="icon-button" aria-label="Close confirmation" onClick={() => setConfirm(false)}><X size={20} /></button></div><h2>Ready to finish?</h2><p>You’ve answered <strong>{answered} of {attempt?.questions.length || 0}</strong> questions. Unanswered questions receive zero marks.</p><p>Once submitted, your answers cannot be changed. Your full review will be ready next.</p><div className="dialog-actions"><button className="button secondary" onClick={() => setConfirm(false)}>Keep practicing</button><button className="button primary" onClick={() => { setConfirm(false); void submit(); }}>Submit answers</button></div></dialog>
  </div>;
}
