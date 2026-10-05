import { TestWorkspace } from '@/components/test-workspace';
// Personal, session-bound page: keep it out of search results.
export const metadata = { title: 'Practice test', robots: { index: false, follow: true } };
export default async function TestPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <TestWorkspace id={id} />; }
