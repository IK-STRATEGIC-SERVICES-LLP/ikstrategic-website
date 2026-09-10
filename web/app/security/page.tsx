import type { Metadata } from 'next';

import { LegalPage } from '@/components/site/legal-page';
import { ORG, SITE_URL } from '@/lib/site';

const HOST = SITE_URL.replace(/^https?:\/\//, '');

export const metadata: Metadata = {
  title: 'Security',
  description:
    'How to report a security vulnerability to IK Strategic Services LLP, and what to expect when you do.',
  alternates: { canonical: '/security' },
};

export default function SecurityPage() {
  return (
    <LegalPage
      title="Security"
      description="If you have found a vulnerability in this website or our systems, we want to hear from you."
      updated="September 2026"
      breadcrumb="Security"
      path="/security"
    >
      <h2>Reporting a vulnerability</h2>
      <p>
        Email <a href={`mailto:${ORG.email}?subject=Security`}>{ORG.email}</a> with the subject line
        &ldquo;Security&rdquo;. Please include:
      </p>
      <ul>
        <li>the URL or system affected, and the type of issue;</li>
        <li>the steps to reproduce it, with any request/response detail or screenshots;</li>
        <li>an assessment of the impact, if you have one.</li>
      </ul>
      <p>
        We will acknowledge your report within five business days and keep you updated as we
        investigate and fix it. We are a small team and do not currently run a paid bug-bounty
        programme, but we are grateful for reports and will credit you if you would like us to.
      </p>

      <h2>Testing guidelines</h2>
      <p>When investigating, please:</p>
      <ul>
        <li>
          stay within <strong>{HOST}</strong> and systems clearly operated by IK Strategic Services;
        </li>
        <li>
          avoid automated scanning that degrades service, and stop at the point you have proven an
          issue;
        </li>
        <li>
          never access, modify, or delete data that is not yours, and never run denial-of-service,
          spam, or social-engineering attacks;
        </li>
        <li>
          give us a reasonable window to remediate before disclosing the issue publicly.
        </li>
      </ul>

      <h2>Safe harbour</h2>
      <p>
        If you make a good-faith effort to follow this policy, we will treat your research as
        authorised, we will not pursue or support legal action against you for it, and we will work
        with you to understand and resolve the issue quickly.
      </p>

      <h2>How we build</h2>
      <p>
        Security is part of delivery for us, not a phase at the end — human review of every
        AI-assisted change, continuous automated testing against each build, and least-privilege
        access to client data. More on that on our{' '}
        <a href="/#methodology">How we build</a> section.
      </p>
    </LegalPage>
  );
}
