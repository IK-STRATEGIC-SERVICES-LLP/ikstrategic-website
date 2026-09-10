import type { Metadata } from 'next';

import { LegalPage } from '@/components/site/legal-page';
import { ORG, SITE_URL } from '@/lib/site';

const HOST = SITE_URL.replace(/^https?:\/\//, '');

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms that apply to your use of the IK Strategic Services LLP website.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="The terms that apply when you use this website. They do not govern any paid engagement — that is covered by a separate signed agreement."
      updated="September 2026"
      breadcrumb="Terms of Service"
      path="/terms"
    >
      <h2>Acceptance</h2>
      <p>
        This website ({HOST}) is provided by <strong>{ORG.legalName}</strong>. By using it, you
        agree to these terms. If you do not agree, please do not use the site.
      </p>

      <h2>What this website is for</h2>
      <p>
        The site exists to describe who we are and what we do. Nothing on it is an offer, a quote, or
        professional advice, and nothing on it — including sending us a message — creates a client
        relationship or any obligation on us to provide services. An engagement begins only when both
        parties sign a written agreement.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The content, design, branding, and code of this website are owned by {ORG.legalName} or its
        licensors and are protected by intellectual-property law. You may view and share links to the
        pages. You may not copy, republish, adapt, or use our content or brand for your own purposes
        without our written permission.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>use the site in any way that breaks the law or infringes someone else&rsquo;s rights;</li>
        <li>
          attempt to gain unauthorised access to the site, its server, or any connected system;
        </li>
        <li>
          interfere with the site&rsquo;s operation, or place an unreasonable load on it through
          automated means;
        </li>
        <li>
          scrape or harvest content or contact details for bulk messaging.
        </li>
      </ul>
      <p>
        For how to report a security issue, see our <a href="/security">Security</a> page.
      </p>

      <h2>Third-party links</h2>
      <p>
        The site may link to services we do not control. We are not responsible for their content or
        their practices, and a link is not an endorsement.
      </p>

      <h2>No warranty</h2>
      <p>
        The site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. We work to keep the
        information accurate and the site running, but we do not warrant that it will be
        uninterrupted, error-free, or current, and we may change or withdraw any part of it at any
        time.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {ORG.legalName} is not liable for any indirect or
        consequential loss, or for any loss of profit, revenue, data, or goodwill, arising from your
        use of — or inability to use — this website. Nothing in these terms limits any liability that
        cannot be limited under applicable law.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India, and the courts of {ORG.addressLocality},{' '}
        {ORG.addressRegion} have exclusive jurisdiction over any dispute relating to the website.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. The version on this page, with the
        &ldquo;last updated&rdquo; date above, is the one that applies.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${ORG.email}`}>{ORG.email}</a>.
      </p>
    </LegalPage>
  );
}
