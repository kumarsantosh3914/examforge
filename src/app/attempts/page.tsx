import { History } from '@/components/history';
// Personal, session-bound page: keep it out of search results.
export const metadata = { title: 'My attempts', robots: { index: false, follow: true } };
export default function AttemptsPage() { return <History />; }
