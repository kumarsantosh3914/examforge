import type { Metadata } from 'next';
import { SessionProvider } from '@/components/session';
import './globals.css';
export const metadata: Metadata = { title: { default: 'ExamForge — BPSC TRE Practice', template: '%s | ExamForge' }, description: 'Focused Computer Science practice for BPSC TRE 4.0. Timed tests, detailed answer reviews, and your first three sets without signup.', robots: { index: false, follow: false } };
// Browser extensions (Grammarly, dark-mode tools, password managers) inject attributes on <html>/<body>;
// suppressHydrationWarning ignores attribute-only mismatches on these two elements, not their children.
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en" suppressHydrationWarning><body suppressHydrationWarning><SessionProvider>{children}</SessionProvider></body></html>; }
