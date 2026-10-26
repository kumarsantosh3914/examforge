export const siteName = 'ExamForge';
export const siteDescription = 'Free timed mock tests for government exams, with answers saved as you go and explanations in English and Hindi. Practise CTET, BPSC TRE 4.0, DSSSB TGT, SSC GD and MTS, Bihar Police, RRB Group D, NTPC and JE, and RPF Constable; your first three sets need no signup.';
// Canonical origin for metadata, sitemap and structured data.
export const siteUrl = new URL(process.env.APP_ORIGIN || 'http://localhost:3000');
export const absolute = (path: string) => new URL(path, siteUrl).toString();
// Google shows about 155 characters of a description; cut at a word boundary so snippets end cleanly.
export const clip = (text: string, max = 155) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1); const space = cut.lastIndexOf(' ');
  return `${cut.slice(0, space > max * 0.6 ? space : cut.length).replace(/[\s,;:.-]+$/, '')}…`;
};
