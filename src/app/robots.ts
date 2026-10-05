import type { MetadataRoute } from 'next';
import { absolute } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  // /api/ is JSON for the app itself; personal pages carry their own noindex tag.
  return { rules: { userAgent: '*', allow: '/', disallow: '/api/' }, sitemap: absolute('/sitemap.xml') };
}
