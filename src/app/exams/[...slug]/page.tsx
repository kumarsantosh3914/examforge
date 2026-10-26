import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ExamGuide } from '@/components/exam-guide';
import { Library } from '@/components/library';
import { RelatedExams } from '@/components/related-exams';
import { SubjectGuide } from '@/components/subject-guide';
import { getCatalogOrNull } from '@/lib/catalog';
import { examHref, examShortTitle, examTitle, liveExamMeta, subjectHref } from '@/lib/exam-directory';
import { examGuides } from '@/lib/exam-guides';
import { absolute, clip } from '@/lib/site';

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ slug: string[] }> };
// The path is an exam id, or a subject id (`<exam id>/<subject slug>`) for that subject's sets.
const resolve = async (params: Props['params']) => {
  const id = (await params).slug.map(decodeURIComponent).join('/'); const catalog = await getCatalogOrNull();
  const exam = catalog?.exams.find(e => e._id === id);
  const subject = exam ? undefined : catalog?.subjects.find(s => s._id === id);
  return { id, catalog, exam: exam ?? catalog?.exams.find(e => e._id === subject?.examId), subject };
};
// Per-page share image from /og (a catch-all route cannot hold an opengraph-image file).
const social = (title: string, rawDescription: string, url: string, id: string): Metadata => { const description = clip(rawDescription); const images = [{ url: `/og?id=${encodeURIComponent(id)}`, width: 1200, height: 630 }]; return { title, description, alternates: { canonical: url }, openGraph: { type: 'website', title, description, url, images }, twitter: { card: 'summary_large_image', title, description, images } }; };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, catalog, exam, subject } = await resolve(params);
  // A database blip must not tell Google the page is gone: fall back to the static exam metadata.
  if (!catalog) {
    const fallback = liveExamMeta[id];
    return fallback ? social(fallback.metaTitle ?? `${fallback.shortTitle ?? fallback.title} Mock Test ${new Date().getFullYear()}: Free Test Series`, fallback.description ?? fallback.blurb, examHref(id), id) : {};
  }
  if (!exam) return { title: 'Exam not found', robots: { index: false } };
  if (subject) {
    const short = examShortTitle(exam); const name = /mock test/i.test(subject.name) ? subject.name : `${subject.name} Mock Test`;
    return social(`${short} ${name}: ${subject.setCount} Free Sets`, `${subject.setCount} free timed ${subject.name} mock tests with ${subject.questionCount} questions for ${examTitle(exam)}. Answers save as you go; every question is explained in English and Hindi.`, subjectHref(id), id);
  }
  const subjects = catalog.subjects.filter(s => s.examId === id);
  const sets = catalog.sets.filter(s => s.examId === id).length;
  const questions = subjects.reduce((n, s) => n + s.questionCount, 0);
  // Matches how people search: "<exam> mock test", "free", "test series", and the current year.
  const pageTitle = liveExamMeta[id]?.metaTitle ?? `${examShortTitle(exam)} Mock Test ${new Date().getFullYear()}: Free Test Series`;
  const description = liveExamMeta[id]?.description ?? `${examTitle(exam)} mock tests: ${sets} timed practice sets and ${questions.toLocaleString('en-IN')} questions across ${subjects.length} subjects, with explanations in English and Hindi.`;
  return social(pageTitle, description, examHref(id), id);
}

export default async function ExamPage({ params }: Props) {
  const { id, catalog, exam, subject } = await resolve(params);
  if (catalog && !exam) notFound();
  const crumbs = exam ? [
    { '@type': 'ListItem', position: 1, name: 'ExamForge', item: absolute('/') },
    { '@type': 'ListItem', position: 2, name: examTitle(exam), item: absolute(examHref(exam._id)) },
    ...(subject ? [{ '@type': 'ListItem', position: 3, name: subject.name, item: absolute(subjectHref(subject._id)) }] : []),
  ] : [];
  const jsonLd = exam && catalog ? [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs },
    ...(!subject && examGuides[id]?.faq?.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: examGuides[id].faq.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }] : []),
    ...(subject ? [] : [{ '@context': 'https://schema.org', '@type': 'ItemList', name: `${examTitle(exam)} practice sets`, itemListElement: catalog.subjects.filter(s => s.examId === id).map((s, i) => (
      { '@type': 'ListItem', position: i + 1, name: s.name, url: absolute(subjectHref(s._id)) }
    )) }]),
  ] : null;
  return <>
    {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />}
    <Suspense><Library id={id} initialCatalog={catalog}>{subject && catalog ? <SubjectGuide subject={subject} catalog={catalog} /> : <><ExamGuide examId={id} />{exam && catalog && <RelatedExams examId={id} catalog={catalog} />}</>}</Library></Suspense>
  </>;
}
