import type { MetadataRoute } from 'next';
import { siteDescription } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return { name: 'ExamForge', short_name: 'ExamForge', description: siteDescription, start_url: '/', display: 'standalone', background_color: '#f6f8fa', theme_color: '#132a34',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }, { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' }] };
}
