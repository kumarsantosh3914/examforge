import type { Metadata } from 'next';
import { Shell } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'What ExamForge stores, which cookies it sets, and how Google Analytics and Microsoft Clarity are used.',
  alternates: { canonical: '/privacy' },
};

// Set NEXT_PUBLIC_CONTACT_EMAIL before building to show a contact address for privacy requests.
const contact = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

export default function PrivacyPage() {
  return <Shell>
    <article className="legal-page">
      <h1>Privacy</h1>
      <p className="legal-updated">Last updated: October 2026</p>
      <p>ExamForge is a free mock-test site. This page explains what information it uses and why.</p>

      <h2>What we store</h2>
      <ul>
        <li><strong>Practice data.</strong> The sets you start, your answers, timings and scores, so you can resume a test and review it later.</li>
        <li><strong>Account details, if you sign up.</strong> Your email address and a salted hash of your password. We never store the password itself.</li>
        <li><strong>Guest identifier.</strong> You can practise without an account. A random token identifies you as a guest so your first sets stay with you.</li>
      </ul>

      <h2>Cookies</h2>
      <ul>
        <li><strong>Needed to run the site.</strong> A guest cookie (kept for up to a year) and, if you sign in, a login cookie (kept for up to 30 days). Both are HttpOnly, so scripts on the page cannot read them.</li>
        <li><strong>Analytics.</strong> Google Analytics and Microsoft Clarity also set cookies, described below.</li>
      </ul>

      <h2>Analytics we use</h2>
      <p><strong>Google Analytics</strong> counts visits and shows us which pages are viewed. Google may receive technical details such as your IP address and device information, as described in <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">Google’s privacy policy</a>.</p>
      <p><strong>Microsoft Clarity</strong> records how pages are used, such as clicks, scrolling and mouse movement, as session recordings and heatmaps. We use it to find parts of the site that are confusing on phones and computers. Clarity masks sensitive content by default, and we mask the email and password fields on the sign-in page. See <a href="https://privacy.microsoft.com/privacystatement" rel="noopener noreferrer" target="_blank">Microsoft’s privacy statement</a> for how Clarity handles data.</p>

      <h2>What we don’t do</h2>
      <p>We do not show ads and we do not sell your personal data.</p>

      <h2>Your choices</h2>
      <ul>
        <li>You can clear cookies in your browser at any time. Clearing them signs you out and starts a new guest identity, so earlier guest attempts will no longer be linked to you.</li>
        <li>You can block analytics cookies and scripts with your browser settings or a content blocker. The site works without them.</li>
        <li>To ask for your account and practice data to be deleted{contact ? <>, email <a href={`mailto:${contact}`}>{contact}</a></> : ', contact the site owner'}.</li>
      </ul>

      <h2>Changes</h2>
      <p>If we change what we collect, we will update this page and its date.</p>
    </article>
  </Shell>;
}
