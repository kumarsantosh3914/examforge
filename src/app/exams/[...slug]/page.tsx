import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Library } from '@/components/library';
import { getCatalogOrNull } from '@/lib/catalog';
import { examHref, liveExamMeta } from '@/lib/exam-directory';

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ slug: string[] }> };
const examIdOf = async (params: Props['params']) => (await params).slug.map(decodeURIComponent).join('/');

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const examId = await examIdOf(params); const catalog = await getCatalogOrNull();
  const exam = catalog?.exams.find(e => e._id === examId);
  if (!exam) return { title: 'Exam not found', robots: { index: false } };
  const subjects = catalog!.subjects.filter(s => s.examId === examId);
  const sets = catalog!.sets.filter(s => s.examId === examId).length;
  const questions = subjects.reduce((n, s) => n + s.questionCount, 0);
  const title = liveExamMeta[examId]?.title ?? `${exam.name} ${exam.category}`;
  const description = `${title} mock tests: ${sets} timed practice sets and ${questions.toLocaleString('en-IN')} questions across ${subjects.length} subjects, with explanations in English and Hindi.`;
  return { title: `${title} mock tests`, description, alternates: { canonical: examHref(examId) }, openGraph: { title: `${title} mock tests`, description, url: examHref(examId), images: ['/opengraph-image'] }, twitter: { card: 'summary_large_image', images: ['/twitter-image'] } };
}

export default async function ExamPage({ params }: Props) {
  const examId = await examIdOf(params); const catalog = await getCatalogOrNull();
  if (catalog && !catalog.exams.some(e => e._id === examId)) notFound();
  return <Suspense><Library examId={examId} initialCatalog={catalog} /></Suspense>;
}
