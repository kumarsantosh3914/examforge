import { Landing } from '@/components/landing';
import { getCatalogOrNull } from '@/lib/catalog';
import { absolute, siteDescription, siteName, siteSummary } from '@/lib/site';

export const dynamic = 'force-dynamic';
export const metadata = { description: siteSummary, alternates: { canonical: '/' }, openGraph: { url: '/', description: siteSummary, images: ['/opengraph-image'] } };

export default async function Home() {
  const catalog = await getCatalogOrNull();
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'WebSite', name: siteName, url: absolute('/'), description: siteDescription, inLanguage: ['en', 'hi'] },
    { '@context': 'https://schema.org', '@type': 'Organization', name: siteName, url: absolute('/'), logo: absolute('/apple-icon.png') },
  ];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <Landing initialCatalog={catalog} />
  </>;
}
