import { ImageResponse } from 'next/og';
import { siteUrl } from '@/lib/site';

export const alt = 'ExamForge — Which exam are you preparing for?';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#132a34', padding: '72px 80px', color: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <svg width="84" height="84" viewBox="0 0 40 40"><rect width="40" height="40" rx="11" fill="#21434e" /><path d="M10.5 21.5 17 28l11.5-14" fill="none" stroke="#7fd6ae" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" /><rect x="29.6" y="6.1" width="5.2" height="5.2" rx="1.2" transform="rotate(45 32.2 8.7)" fill="#c8f0dc" /></svg>
        <div style={{ display: 'flex', fontSize: 46, fontWeight: 700, letterSpacing: -1 }}><span>Exam</span><span style={{ color: '#7fd6ae', marginLeft: -2 }}>Forge</span></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>Which exam are you preparing for?</div>
        <div style={{ fontSize: 32, color: '#c4d4d9' }}>Timed mock tests with explanations, in English and Hindi for many exams.</div>
      </div>
      <div style={{ display: 'flex', fontSize: 26, color: '#a9c1c7' }}>{siteUrl.host}</div>
    </div>,
    size,
  );
}
