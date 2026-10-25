import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { SessionProvider } from '@/components/session';
import { Anek_Devanagari } from 'next/font/google';
import { siteDescription, siteName, siteUrl } from '@/lib/site';
import './globals.css';
// One variable family for Latin and Devanagari display text, self-hosted by next/font.
const display = Anek_Devanagari({ subsets: ['latin', 'devanagari'], variable: '--font-display', display: 'swap', axes: ['wdth'] });
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: 'ExamForge — Timed mock tests for government exams', template: '%s | ExamForge' },
  description: siteDescription,
  applicationName: siteName,
  openGraph: { type: 'website', siteName, locale: 'en_IN', title: 'ExamForge — Timed mock tests for government exams', description: siteDescription },
  twitter: { card: 'summary_large_image' },
  // Search Console HTML-tag verification; leave unset when verifying through DNS.
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
};
export const viewport: Viewport = { themeColor: '#132a34' };
const analyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-5TZXTHSSV0';
const validAnalyticsId = analyticsId && /^G-[A-Z0-9]+$/.test(analyticsId);
// Browser extensions (Grammarly, dark-mode tools, password managers) inject attributes on <html>/<body>;
// suppressHydrationWarning ignores attribute-only mismatches on these two elements, not their children.
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en" className={display.variable} suppressHydrationWarning><body suppressHydrationWarning><SessionProvider>{children}</SessionProvider></body>{validAnalyticsId && <><Script src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} strategy="afterInteractive" /><Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${analyticsId}');`}</Script></>}</html>; }
