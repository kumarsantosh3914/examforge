import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ExamGuide } from '@/components/exam-guide';
import { Library } from '@/components/library';
import { getCatalogOrNull } from '@/lib/catalog';
import { examHref, examTitle, liveExamMeta } from '@/lib/exam-directory';
import { absolute } from '@/lib/site';

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
  const title = examTitle(exam);
  // Titles that already say "mock tests" are used as is.
  const pageTitle = liveExamMeta[examId]?.metaTitle ?? (/mock tests/i.test(title) ? title : `${title} mock tests`);
  const description = liveExamMeta[examId]?.description ?? `${title} mock tests: ${sets} timed practice sets and ${questions.toLocaleString('en-IN')} questions across ${subjects.length} subjects, with explanations in English and Hindi.`;
  return { title: pageTitle, description, alternates: { canonical: examHref(examId) }, openGraph: { title: pageTitle, description, url: examHref(examId), images: ['/opengraph-image'] }, twitter: { card: 'summary_large_image', images: ['/twitter-image'] } };
}

export default async function ExamPage({ params }: Props) {
  const examId = await examIdOf(params); const catalog = await getCatalogOrNull();
  if (catalog && !catalog.exams.some(e => e._id === examId)) notFound();
  const exam = catalog?.exams.find(e => e._id === examId);
  const jsonLd = exam && catalog ? [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ExamForge', item: absolute('/') },
      { '@type': 'ListItem', position: 2, name: examTitle(exam), item: absolute(examHref(examId)) },
    ] },
    { '@context': 'https://schema.org', '@type': 'ItemList', name: `${examTitle(exam)} practice sets`, itemListElement: catalog.subjects.filter(s => s.examId === examId).map((s, i) => (
      { '@type': 'ListItem', position: i + 1, name: s.name, url: absolute(`/practice?subject=${encodeURIComponent(s._id)}`) }
    )) },
  ] : null;
  return <>
    {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />}
    <Suspense><Library examId={examId} initialCatalog={catalog}><ExamGuide examId={examId} /></Library></Suspense>
  </>;
}
