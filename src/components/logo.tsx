import Link from 'next/link';

// The mark: an answer tick that strikes a chip off its tip, like metal on an anvil.
export function LogoMark({ size = 34 }: { size?: number }) {
  return <svg className="logo-mark" width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    <rect width="40" height="40" rx="11" fill="#132a34" />
    <path d="M10.5 21.5 17 28l11.5-14" fill="none" stroke="#7fd6ae" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="29.6" y="6.1" width="5.2" height="5.2" rx="1.2" transform="rotate(45 32.2 8.7)" fill="#c8f0dc" />
  </svg>;
}

export function Brand({ tone = 'light', size = 34 }: { tone?: 'light' | 'dark'; size?: number }) {
  return <Link href="/" className={`brand brand-${tone}`} aria-label="ExamForge home"><LogoMark size={size} /><span className="wordmark">Exam<span>Forge</span></span></Link>;
}
