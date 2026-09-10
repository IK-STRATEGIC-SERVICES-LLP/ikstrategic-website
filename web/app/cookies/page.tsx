import type { Metadata } from 'next';

import { LegalPage } from '@/components/site/legal-page';
import { ORG } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Cookies',
  description:
    'This website sets no tracking cookies and runs no analytics. What that means in practice.',
  alternates: { canonical: '/cookies' },
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookies"
      description="The short version: this website does not track you, and there is nothing here to opt out of."
      updated="September 2026"
      breadcrumb="Cookies"
      path="/cookies"
    >
      <h2>What this site sets</h2>
      <p>
        Nothing that identifies you. This website runs no analytics, no advertising pixels, and no
        social or marketing trackers, and it does not set cookies to profile you or follow you
        between sites. That is why you will not see a cookie-consent banner — there is nothing
        non-essential to consent to.
      </p>

      <h2>Strictly necessary items</h2>
      <p>
        Our hosting provider, Vercel, may set a strictly necessary cookie to route requests and
        protect the site from abuse. It carries no personal information and is not used for
        analytics or advertising. Your browser also keeps its own local storage and cache to display
        the site; we do not read it.
      </p>

      <h2>If this changes</h2>
      <p>
        If we ever add analytics or any other non-essential technology, we will update this page,
        list exactly what is set and why, and add a proper consent control before it runs.
      </p>

      <h2>Contact</h2>
      <p>
        Questions: <a href={`mailto:${ORG.email}`}>{ORG.email}</a>. See also our{' '}
        <a href="/privacy">Privacy Policy</a>.
      </p>
    </LegalPage>
  );
}
