import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { SessionProvider } from '@/components/session';
import { Anek_Devanagari } from 'next/font/google';
import { siteName, siteSummary, siteUrl } from '@/lib/site';
import './globals.css';
// One variable family for Latin and Devanagari display text, self-hosted by next/font.
const display = Anek_Devanagari({ subsets: ['latin', 'devanagari'], variable: '--font-display', display: 'swap', axes: ['wdth'] });
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: 'ExamForge — Timed mock tests for government exams', template: '%s | ExamForge' },
  description: siteSummary,
  applicationName: siteName,
  openGraph: { type: 'website', siteName, locale: 'en_IN', title: 'ExamForge — Timed mock tests for government exams', description: siteSummary },
  twitter: { card: 'summary_large_image' },
  // Search Console HTML-tag verification; leave unset when verifying through DNS.
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
};
export const viewport: Viewport = { themeColor: '#132a34' };
const analyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-5TZXTHSSV0';
const validAnalyticsId = analyticsId && /^G-[A-Z0-9]+$/.test(analyticsId);
// Microsoft Clarity project ID (session recordings and heatmaps); override with NEXT_PUBLIC_CLARITY_PROJECT_ID before building.
const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'z3r1sneyop';
const validClarityId = /^[a-z0-9]{8,12}$/.test(clarityId);
// Browser extensions (Grammarly, dark-mode tools, password managers) inject attributes on <html>/<body>;
// suppressHydrationWarning ignores attribute-only mismatches on these two elements, not their children.
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en" className={display.variable} suppressHydrationWarning><body suppressHydrationWarning><SessionProvider>{children}</SessionProvider></body>{validAnalyticsId && <><Script src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} strategy="afterInteractive" /><Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${analyticsId}');`}</Script></>}{validClarityId && <Script id="microsoft-clarity" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}</Script>}</html>; }
