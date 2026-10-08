import type { Metadata } from 'next';

import { LegalPage } from '@/components/site/legal-page';
import { ORG } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Cookies',
  description:
    'We use Google Analytics only if you accept. What is set, why, and how to change your choice.',
  alternates: { canonical: '/cookies' },
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookies"
      description="The short version: analytics cookies stay off unless you accept them, and you can change your mind at any time."
      updated="September 2026"
      breadcrumb="Cookies"
      path="/cookies"
    >
      <h2>Analytics cookies — only if you accept</h2>
      <p>
        With your consent, we use Google Analytics (a service of Google LLC) to understand how the
        site is used — which pages are visited and how visitors arrive — so we can improve it. It
        sets the cookies <code>_ga</code> and <code>_ga_*</code>, which last up to two years and
        carry a random identifier, not your name or email. We have enabled IP anonymisation, and we
        do not use Google Analytics for advertising or share the data for ad purposes.
      </p>
      <p>
        Google Analytics does not load, and sets nothing, until you press <strong>Accept</strong>{' '}
        on the banner. If you press <strong>Decline</strong>, or ignore the banner, nothing from
        Google is requested.
      </p>

      <h2>Changing your mind</h2>
      <p>
        Choose <strong>Cookie settings</strong> in the footer at any time to accept or decline
        again. Declining removes the Google Analytics cookies from your browser. Your choice is
        remembered in your browser&apos;s local storage on this device.
      </p>

      <h2>Strictly necessary items</h2>
      <p>
        Our hosting provider, Vercel, may set a strictly necessary cookie to route requests and
        protect the site from abuse. It carries no personal information, is not used for analytics
        or advertising, and does not need consent. The site sets no advertising or social-media
        cookies.
      </p>

      <h2>Contact</h2>
      <p>
        Questions: <a href={`mailto:${ORG.email}`}>{ORG.email}</a>. See also our{' '}
        <a href="/privacy">Privacy Policy</a>.
      </p>
    </LegalPage>
  );
}
