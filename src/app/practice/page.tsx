import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Library } from '@/components/library';
import { getCatalogOrNull } from '@/lib/catalog';
import { examHref, examShortTitle, examTitle } from '@/lib/exam-directory';
import { absolute } from '@/lib/site';

export const dynamic = 'force-dynamic';
type Props = { searchParams: Promise<{ subject?: string | string[] }> };
const subjectIdOf = async (searchParams: Props['searchParams']) => { const s = (await searchParams).subject; return Array.isArray(s) ? s[0] : s; };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const subjectId = await subjectIdOf(searchParams); const catalog = await getCatalogOrNull();
  const subject = catalog?.subjects.find(s => s._id === subjectId);
  if (!subject) return { title: 'Subject not found', robots: { index: false } };
  const exam = catalog!.exams.find(e => e._id === subject.examId);
  const examTitle = exam ? examShortTitle(exam) : '';
  const title = `${subject.name} practice sets${examTitle ? ` · ${examTitle}` : ''}`;
  const description = `${subject.setCount} timed ${subject.name} mock tests with ${subject.questionCount} questions${examTitle ? ` for ${examTitle}` : ''}. Answers save as you go; every question is explained in English and Hindi.`;
  const url = `/practice?subject=${encodeURIComponent(subject._id)}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, images: ['/opengraph-image'] }, twitter: { card: 'summary_large_image', images: ['/twitter-image'] } };
}

export default async function Practice({ searchParams }: Props) {
  const subjectId = await subjectIdOf(searchParams);
  if (!subjectId) redirect('/');
  const catalog = await getCatalogOrNull();
  if (catalog && !catalog.subjects.some(s => s._id === subjectId)) notFound();
  const subject = catalog?.subjects.find(s => s._id === subjectId);
  const exam = subject && catalog?.exams.find(e => e._id === subject.examId);
  const jsonLd = subject && exam ? {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ExamForge', item: absolute('/') },
      { '@type': 'ListItem', position: 2, name: examTitle(exam), item: absolute(examHref(exam._id)) },
      { '@type': 'ListItem', position: 3, name: subject.name, item: absolute(`/practice?subject=${encodeURIComponent(subject._id)}`) },
    ],
  } : null;
  return <>
    {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />}
    <Suspense><Library detail initialCatalog={catalog} /></Suspense>
  </>;
}
