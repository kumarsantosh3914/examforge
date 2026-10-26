import { ImageResponse } from 'next/og';
import { getCatalogOrNull } from '@/lib/catalog';
import { examShortTitle, families, liveExamMeta } from '@/lib/exam-directory';
import { siteUrl } from '@/lib/site';

const size = { width: 1200, height: 630 };

// Share image for an exam or subject page: /og?id=<exam id or subject id>. A catch-all route cannot carry an
// opengraph-image file, so the exam page metadata points here. Unknown ids get the generic card.
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get('id') ?? '';
  const catalog = await getCatalogOrNull();
  const exam = catalog?.exams.find(e => e._id === id);
  const subject = exam ? undefined : catalog?.subjects.find(s => s._id === id);
  const parent = exam ?? catalog?.exams.find(e => e._id === subject?.examId);
  const meta = parent ? liveExamMeta[parent._id] : undefined;
  const examName = parent ? examShortTitle(parent) : 'Government exams';
  const family = families.find(f => f.id === meta?.family)?.label;
  const headline = subject ? subject.name : parent ? `${examName} mock tests` : 'Free mock tests';
  const eyebrow = subject ? examName : family ? `${family} exams` : 'ExamForge';
  const subjects = catalog?.subjects.filter(s => s.examId === parent?._id) ?? [];
  const hindi = subject ? subject.hindi !== false : subjects.some(s => s.hindi !== false);
  const stats = subject ? `${subject.setCount} free sets · ${subject.questionCount.toLocaleString('en-IN')} questions`
    : parent && subjects.length ? `${catalog?.sets.filter(s => s.examId === parent._id).length} free sets · ${subjects.reduce((n, s) => n + s.questionCount, 0).toLocaleString('en-IN')} questions` : 'Free timed practice sets';

  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#132a34', padding: '72px 80px', color: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <svg width="84" height="84" viewBox="0 0 40 40"><rect width="40" height="40" rx="11" fill="#21434e" /><path d="M10.5 21.5 17 28l11.5-14" fill="none" stroke="#7fd6ae" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" /><rect x="29.6" y="6.1" width="5.2" height="5.2" rx="1.2" transform="rotate(45 32.2 8.7)" fill="#c8f0dc" /></svg>
        <div style={{ display: 'flex', fontSize: 46, fontWeight: 700, letterSpacing: -1 }}><span>Exam</span><span style={{ color: '#7fd6ae', marginLeft: -2 }}>Forge</span></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', fontSize: 32, color: '#7fd6ae', fontWeight: 700 }}>{eyebrow}</div>
        <div style={{ display: 'flex', fontSize: headline.length > 28 ? 62 : 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{headline}</div>
        <div style={{ display: 'flex', fontSize: 32, color: '#c4d4d9' }}>{stats} · {hindi ? 'English and Hindi explanations' : 'Explained answers'}</div>
      </div>
      <div style={{ display: 'flex', fontSize: 26, color: '#a9c1c7' }}>{siteUrl.host}</div>
    </div>,
    { ...size, headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=86400' } },
  );
}
