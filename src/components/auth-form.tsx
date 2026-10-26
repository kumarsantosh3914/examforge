'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, CheckCircle2, Eye, EyeOff, LockKeyhole } from 'lucide-react';
import { Brand, ErrorMessage } from './ui';
import { useSession } from './session';
import { api, post } from '@/lib/client';
import { clarityEvent } from '@/lib/clarity';
import type { AttemptView } from '@/lib/types';
export function AuthForm() {
  const query = useSearchParams(); const router = useRouter(); const { session, refresh, error: sessionError } = useSession();
  const [mode, setMode] = useState(query.get('mode') === 'register' || query.get('reason') === 'limit' ? 'register' : 'login');
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [visible, setVisible] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError('');
    try {
      await api(`/auth/${mode}`, post({ email: email.trim(), password })); clarityEvent(mode === 'register' ? 'signup' : 'login'); await refresh();
      const setId = query.get('set');
      if (setId) { const a = await api<AttemptView>('/attempts', post({ setId })); router.push(`/test/${a.id}`); } else router.push('/');
    } catch (e) { setError((e as Error).message); } finally { setBusy(false); }
  }
  return <main className="auth-page"><section className="auth-story"><Brand tone="dark" /><div><h1>Good preparation<br />starts with<br /><em>showing up.</em></h1><p>Keep building your confidence, one practice set at a time.</p><ul><li><CheckCircle2 size={19} />Access every subject and practice set</li><li><CheckCircle2 size={19} />Keep your results in one place</li><li><CheckCircle2 size={19} />Learn with detailed answer reviews</li></ul></div><span className="auth-story-footer"><BookOpen size={17} />Focused preparation. Always free.</span></section><section className="auth-form-side"><Link href="/" className="back-link">← Back to practice</Link><div className="auth-form-wrap"><span className="auth-lock"><LockKeyhole size={24} /></span><h2>{mode === 'register' ? 'Keep your momentum.' : 'Welcome back.'}</h2><p>{query.get('reason') === 'limit' ? 'You’ve completed your 3 free sets. Create a free account to continue practicing.' : mode === 'register' ? 'Just your email and a password. You’re ready to go.' : 'Sign in to continue your preparation.'}</p>
    <div className="auth-tabs"><button className={mode === 'login' ? 'selected' : ''} onClick={() => { setMode('login'); setError(''); }}>Sign in</button><button className={mode === 'register' ? 'selected' : ''} onClick={() => { setMode('register'); setError(''); }}>Create account</button></div>
    {(error || sessionError) && <ErrorMessage message={error || sessionError} retry={sessionError ? () => void refresh() : undefined} />}
    <form onSubmit={submit}><label htmlFor="email">Email address</label><input id="email" data-clarity-mask="True" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} value={email} onChange={e => setEmail(e.target.value)} /><label htmlFor="password">Password</label><div className="password-field"><input id="password" data-clarity-mask="True" type={visible ? 'text' : 'password'} autoComplete={mode === 'register' ? 'new-password' : 'current-password'} required minLength={10} maxLength={128} value={password} onChange={e => setPassword(e.target.value)} aria-describedby="password-help" /><button type="button" aria-label={visible ? 'Hide password' : 'Show password'} onClick={() => setVisible(!visible)}>{visible ? <EyeOff size={19} /> : <Eye size={19} />}</button></div><small id="password-help">Use at least 10 characters. A passphrase works well.</small><button className="button primary full" disabled={busy || !session}>{busy ? 'Please wait…' : mode === 'register' ? 'Create free account' : 'Sign in'}</button></form><p className="auth-footnote"><Shield />Your password is securely hashed. No extra profile details required.</p>
  </div></section></main>;
}
function Shield() { return <LockKeyhole size={14} />; }
