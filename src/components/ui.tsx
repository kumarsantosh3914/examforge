'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BookOpen, LayoutGrid, History, LogOut, GraduationCap, ShieldCheck, Menu, X, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useSession } from './session';
import { api, post } from '@/lib/client';

export function Brand() { return <Link href="/" className="brand" aria-label="ExamForge home"><span className="brand-icon"><GraduationCap size={24} strokeWidth={1.8} /></span><span>Exam<span className="brand-light">Forge</span><small>PREPARE WITH PURPOSE</small></span></Link>; }
export function ErrorMessage({ message, retry }: { message: string; retry?: () => void }) { return <div className="error-box" role="alert"><AlertCircle size={20} /><div>{message}{retry && <button className="text-button" onClick={retry}>Try again</button>}</div></div>; }
export function Loading({ label = 'Loading your practice space…' }: { label?: string }) { return <div className="loading" role="status"><span className="spinner" />{label}</div>; }
export function Shell({ children }: { children: React.ReactNode }) {
  const { session, refresh } = useSession(); const pathname = usePathname(); const router = useRouter();
  const [open, setOpen] = useState(false); const [error, setError] = useState('');
  async function logout() { try { await api('/auth/logout', post()); await refresh(); router.push('/'); } catch (e) { setError((e as Error).message); } }
  return <div className="app-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
    <aside className={`sidebar ${open ? 'is-open' : ''}`}><Brand /><div className="sidebar-label">YOUR STUDY SPACE</div>
      <nav aria-label="Main navigation"><Link onClick={() => setOpen(false)} className={pathname === '/' || pathname === '/practice' ? 'active' : ''} href="/"><LayoutGrid size={19} />Practice library</Link><Link onClick={() => setOpen(false)} className={pathname === '/attempts' ? 'active' : ''} href="/attempts"><History size={19} />My attempts</Link></nav>
      <div className="sidebar-note"><BookOpen size={22} /><h3>A little practice.<br />A stronger tomorrow.</h3><p>Pick a topic, test yourself, and learn from every answer.</p></div>
      <div className="sidebar-bottom"><ShieldCheck size={17} /><span>Built for focused preparation</span></div>
    </aside>
    {open && <button className="nav-backdrop" onClick={() => setOpen(false)} aria-label="Close navigation" />}
    <div className="main-column"><header className="topbar"><span className="topbar-title">Computer Science <span className="badge neutral">Practice</span></span><div className="account-nav">{session?.email ? <><span className="account-email" title={session.email}>{session.email}</span><button className="icon-button" onClick={logout} aria-label="Sign out"><LogOut size={18} /></button></> : <><span className="guest-label">Guest workspace</span><Link className="button small secondary" href="/auth">Sign in</Link></>}</div></header>
      <main id="main" className="page-content">{error && <ErrorMessage message={error} />}{children}</main>
      <footer className="footer"><span>ExamForge</span><span>Practice deliberately. Progress confidently.</span></footer>
    </div>
  </div>;
}
