import type { MetadataRoute } from 'next';
import { getCatalogOrNull } from '@/lib/catalog';
import { duplicatesExamPage, examHref, liveExamMeta, subjectHref } from '@/lib/exam-directory';
import { absolute } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const catalog = await getCatalogOrNull();
  // If the database is unreachable, still list every exam page so crawlers never see a near-empty sitemap.
  const examIds = catalog ? catalog.exams.map(e => e._id) : Object.keys(liveExamMeta);
  return [
    { url: absolute('/'), changeFrequency: 'weekly', priority: 1 },
    { url: absolute('/privacy'), changeFrequency: 'yearly', priority: 0.2 },
    ...examIds.map(id => ({ url: absolute(examHref(id)), changeFrequency: 'weekly' as const, priority: 0.9 })),
    ...(catalog?.subjects ?? []).filter(s => !duplicatesExamPage(s, catalog!.subjects)).map(s => ({ url: absolute(subjectHref(s._id)), changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
