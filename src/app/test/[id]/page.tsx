import { TestWorkspace } from '@/components/test-workspace';
export default async function TestPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <TestWorkspace id={id} />; }
