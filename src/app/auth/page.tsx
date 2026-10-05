import { Suspense } from 'react';
import { AuthForm } from '@/components/auth-form';
// Personal, session-bound page: keep it out of search results.
export const metadata = { title: 'Sign in', robots: { index: false, follow: true } };
export default function AuthPage() { return <Suspense><AuthForm /></Suspense>; }
