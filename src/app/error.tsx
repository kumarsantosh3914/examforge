'use client';
export default function ErrorPage({ reset }: { reset: () => void }) { return <main className="empty-state"><h1>We hit a temporary problem.</h1><p>Your saved answers are safe. Try loading the page again.</p><button className="button primary" onClick={reset}>Try again</button></main>; }
