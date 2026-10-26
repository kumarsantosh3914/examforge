export const siteName = 'ExamForge';
export const siteDescription = 'Free timed mock tests for government exams, with answers saved as you go and explanations, in English and Hindi for many exams. Practise CTET, BPSC TRE 4.0, DSSSB TGT, SSC GD and MTS, Bihar Police, RRB Group D, NTPC and JE, and RPF Constable; your first three sets need no signup.';
// Canonical origin for metadata, sitemap and structured data.
export const siteUrl = new URL(process.env.APP_ORIGIN || 'http://localhost:3000');
export const absolute = (path: string) => new URL(path, siteUrl).toString();
// Google shows about 155 characters of a description; cut at a word boundary so snippets end cleanly.
export const clip = (text: string, max = 155) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1); const space = cut.lastIndexOf(' ');
  return `${cut.slice(0, space > max * 0.6 ? space : cut.length).replace(/[\s,;:.-]+$/, '')}…`;
};
// Short description for search snippets (about 155 characters); `siteDescription` stays for structured data and the manifest.
export const siteSummary = 'Free timed mock tests for CTET, BPSC TRE, SSC, Railway, Police, Banking and Defence exams, with explanations and Hindi on many. First three sets need no signup.';
// Google shows about 60 characters of a title. Take the first candidate that fits with the site suffix, else the first that fits without it.
const titleSuffix = ` | ${siteName}`;
export const fitTitle = (...candidates: string[]) => {
  for (const c of candidates) {
    if (c.length + titleSuffix.length <= 60) return { template: c as string | { absolute: string }, shown: c + titleSuffix };
    if (c.length <= 60) return { template: { absolute: c } as string | { absolute: string }, shown: c };
  }
  const last = candidates[candidates.length - 1];
  return { template: { absolute: last } as string | { absolute: string }, shown: last };
};
