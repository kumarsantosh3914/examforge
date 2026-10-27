'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AlertCircle, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useSession } from './session';
import { Brand, LogoMark } from './logo';
import { api, post } from '@/lib/client';
import { examHref, liveExamMeta } from '@/lib/exam-directory';

export { Brand } from './logo';
export function ErrorMessage({ message, retry }: { message: string; retry?: () => void }) { return <div className="error-box" role="alert"><AlertCircle size={20} /><div>{message}{retry && <button className="text-button" onClick={retry}>Try again</button>}</div></div>; }
export function Loading({ label = 'Loading your practice space…' }: { label?: string }) { return <div className="loading" role="status"><span className="spinner" />{label}</div>; }

const links = [
  { href: '/', label: 'Exams', active: (p: string) => p === '/' || p.startsWith('/exams') },
  { href: '/attempts', label: 'My attempts', active: (p: string) => p === '/attempts' || p.startsWith('/results') },
];

export function SiteHeader() {
  const { session, refresh } = useSession(); const pathname = usePathname(); const router = useRouter();
  const [open, setOpen] = useState(false); const [error, setError] = useState('');
  async function logout() { try { await api('/auth/logout', post()); await refresh(); router.push('/'); } catch (e) { setError((e as Error).message); } }
  const account = session?.email
    ? <><span className="account-email" title={session.email}>{session.email}</span><button className="button secondary small" onClick={logout}><LogOut size={16} />Sign out</button></>
    : <><span className="guest-label" style={session ? undefined : { visibility: 'hidden' }}>{session ? `${session.remaining} of 3 free sets left` : '3 of 3 free sets left'}</span><Link className="button primary small" href="/auth">Sign in</Link></>;
  return <header className={`site-header ${open ? 'is-open' : ''}`}>
    <div className="site-header-inner">
      <Brand />
      <nav aria-label="Main navigation" className="site-nav">{links.map(l => <Link key={l.href} href={l.href} aria-current={l.active(pathname) ? 'page' : undefined}>{l.label}</Link>)}</nav>
      <div className="account-nav">{account}</div>
      <button className="icon-button menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
    </div>
    {open && <div className="mobile-menu" id="mobile-menu"><nav aria-label="Mobile navigation">{links.map(l => <Link key={l.href} href={l.href} onClick={() => setOpen(false)} aria-current={l.active(pathname) ? 'page' : undefined}>{l.label}</Link>)}</nav><div className="mobile-account">{account}</div></div>}
    {error && <div className="site-header-error"><ErrorMessage message={error} /></div>}
  </header>;
}

// `hideFooter` keeps the footer out of the page while its content loads. A short loader leaves the footer in view, and the long content that replaces it would then push it off screen as a large layout shift.
export function Shell({ children, wide = false, hideFooter = false }: { children: React.ReactNode; wide?: boolean; hideFooter?: boolean }) {
  return <div className="app-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <SiteHeader />
    <main id="main" className={wide ? 'page-wide' : 'page-content'}>{children}</main>
    {!hideFooter && <footer className="footer">
      <nav className="footer-exams" aria-label="Mock tests by exam"><span>Mock tests</span>{Object.entries(liveExamMeta).map(([id, m]) => <Link key={id} href={examHref(id)}>{m.shortTitle ?? m.title}</Link>)}</nav>
      <div className="footer-inner"><span className="footer-brand"><LogoMark size={20} />ExamForge</span><span>Practice deliberately. Progress confidently.</span><Link href="/privacy">Privacy</Link></div>
    </footer>}
  </div>;
}
