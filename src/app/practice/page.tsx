import { notFound, permanentRedirect, redirect } from 'next/navigation';
import { getCatalogOrNull } from '@/lib/catalog';
import { subjectHref } from '@/lib/exam-directory';

export const dynamic = 'force-dynamic';
type Props = { searchParams: Promise<{ subject?: string | string[] }> };

// Subject pages moved from /practice?subject=<id> to /exams/<id>; keep old links and search results working.
export default async function Practice({ searchParams }: Props) {
  const s = (await searchParams).subject; const subjectId = Array.isArray(s) ? s[0] : s;
  if (!subjectId) redirect('/');
  const catalog = await getCatalogOrNull();
  if (catalog && !catalog.subjects.some(x => x._id === subjectId)) notFound();
  permanentRedirect(subjectHref(subjectId));
}
