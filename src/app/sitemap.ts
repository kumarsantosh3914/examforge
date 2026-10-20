import type { MetadataRoute } from 'next';
import { getCatalogOrNull } from '@/lib/catalog';
import { examHref, subjectHref } from '@/lib/exam-directory';
import { absolute } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const catalog = await getCatalogOrNull();
  return [
    { url: absolute('/'), changeFrequency: 'weekly', priority: 1 },
    ...(catalog?.exams ?? []).map(e => ({ url: absolute(examHref(e._id)), changeFrequency: 'weekly' as const, priority: 0.9 })),
    ...(catalog?.subjects ?? []).map(s => ({ url: absolute(subjectHref(s._id)), changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
