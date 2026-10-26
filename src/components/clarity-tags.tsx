'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { clarityTag } from '@/lib/clarity';
import { useSession } from './session';

// Tags every Clarity session with the kind of page and exam being viewed and whether the visitor has an account.
export function ClarityTags() {
  const pathname = usePathname(); const { session } = useSession();
  const user = session ? (session.email ? 'signed_in' : 'guest') : null;
  useEffect(() => {
    const [section, exam] = pathname.split('/').filter(Boolean);
    clarityTag('page_type', !section ? 'landing' : section === 'exams' ? 'exam' : section);
    if (section === 'exams' && exam) clarityTag('exam', exam);
  }, [pathname]);
  useEffect(() => { if (user) clarityTag('user_type', user); }, [user]);
  return null;
}
