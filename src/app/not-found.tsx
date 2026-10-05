import Link from 'next/link';
export default function NotFound() { return <main className="empty-state"><h1>This page isn’t in the syllabus.</h1><p>Let’s get you back to your practice library.</p><Link className="button primary" href="/">Back to practice</Link></main>; }
