export const siteName = 'ExamForge';
export const siteDescription = 'Timed mock tests for government exams with answers saved as you go and explanations in English and Hindi. Practise BPSC TRE 4.0 Computer Science, DSSSB TGT Computer Science and SSC GD Constable; your first three sets need no signup.';
// Canonical origin for metadata, sitemap and structured data.
export const siteUrl = new URL(process.env.APP_ORIGIN || 'http://localhost:3000');
export const absolute = (path: string) => new URL(path, siteUrl).toString();
