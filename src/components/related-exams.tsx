import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Catalog } from '@/lib/types';
import { examHref, examShortTitle, families, liveExamMeta } from '@/lib/exam-directory';

// Server-rendered links to other exams in the same family, so crawlers (and readers) can move between exam pages.
export function RelatedExams({ examId, catalog }: { examId: string; catalog: Catalog }) {
  const family = liveExamMeta[examId]?.family;
  if (!family) return null;
  const related = catalog.exams.filter(e => e._id !== examId && liveExamMeta[e._id]?.family === family).slice(0, 6);
  if (!related.length) return null;
  const label = families.find(f => f.id === family)?.label ?? 'exam';

  return <section className="exam-guide" aria-labelledby="related-exams-title">
    <h2 id="related-exams-title">More {label} mock tests</h2>
    <div className="guide-body">
      <ul className="syllabus-links related-links">
        {related.map(e => <li key={e._id}><Link href={examHref(e._id)}>{examShortTitle(e)} mock tests<ArrowRight size={15} aria-hidden="true" /></Link></li>)}
      </ul>
    </div>
  </section>;
}
