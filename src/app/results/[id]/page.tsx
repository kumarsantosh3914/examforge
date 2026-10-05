import { Results } from '@/components/results';
// Personal, session-bound page: keep it out of search results.
export const metadata = { title: 'Result', robots: { index: false, follow: true } };
export default async function ResultPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <Results id={id} />; }
