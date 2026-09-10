import type { Metadata } from 'next';

import { LegalPage } from '@/components/site/legal-page';
import { ORG, SITE_URL } from '@/lib/site';

const HOST = SITE_URL.replace(/^https?:\/\//, '');

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How IK Strategic Services LLP handles personal data on this website — what is collected, why, and the choices you have.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="What we collect through this website, why we collect it, and the choices you have."
      updated="September 2026"
      breadcrumb="Privacy Policy"
      path="/privacy"
    >
      <h2>Who we are</h2>
      <p>
        This website is operated by <strong>{ORG.legalName}</strong> (&ldquo;IK Strategic
        Services&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), a limited liability partnership
        registered in India at {ORG.streetAddress}, {ORG.addressLocality}, {ORG.addressRegion}{' '}
        {ORG.postalCode}. For any question about this policy or your personal data, contact us at{' '}
        <a href={`mailto:${ORG.email}`}>{ORG.email}</a>.
      </p>
      <p>
        This policy covers this website ({HOST}) only. It does not cover any separate application or
        service we may operate under a distinct agreement, or third-party sites we link to.
      </p>

      <h2>What we collect</h2>
      <h3>Information you give us</h3>
      <p>
        When you email us — directly or through the pre-filled link on our contact page — we receive
        your name, your email address, and whatever else you choose to include in the message. If we
        go on to work together, we hold the contact and project details needed to run that
        engagement.
      </p>
      <h3>Information collected automatically</h3>
      <p>
        We do not run analytics, advertising, or tracking of any kind on this site, and we set no
        tracking cookies (see our <a href="/cookies">Cookies</a> page). Our hosting provider keeps
        standard server logs — IP address, browser type, pages requested, and timestamps — for a
        short period, to keep the site available and secure. We do not use those logs to build a
        profile of you.
      </p>

      <h2>Why we use it, and our legal basis</h2>
      <ul>
        <li>
          <strong>To respond to you</strong> and take steps you have asked for before entering a
          contract — on the basis of our legitimate interest in answering enquiries, and of taking
          pre-contractual steps at your request.
        </li>
        <li>
          <strong>To deliver and administer an engagement</strong> once one begins — on the basis of
          performing that contract.
        </li>
        <li>
          <strong>To keep the site secure and operational</strong> — on the basis of our legitimate
          interest in protecting our systems.
        </li>
      </ul>

      <h2>Who we share it with</h2>
      <p>
        We do not sell or rent personal data, and we do not share it for anyone else&rsquo;s
        marketing. We rely on a small number of service providers who process data only on our
        instructions:
      </p>
      <ul>
        <li>
          <strong>Email</strong> — Google Workspace, for receiving and replying to your messages.
        </li>
        <li>
          <strong>Hosting</strong> — Vercel, which serves this website and keeps the server logs
          described above.
        </li>
      </ul>
      <p>
        We may also disclose information where the law requires it, or to establish, exercise, or
        defend a legal claim.
      </p>

      <h2>International transfers</h2>
      <p>
        We are based in India. Our email and hosting providers may process data on servers in other
        countries, including the United States and the European Union. Where that involves a transfer
        of personal data, we rely on the providers&rsquo; own safeguards, such as standard
        contractual clauses.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry correspondence for as long as there is a realistic prospect of working
        together, and then delete it. Records tied to an actual engagement are kept for the life of
        that engagement and for as long afterwards as we need them for tax, accounting, and legal
        purposes. Server logs are rotated on a short cycle by our hosting provider.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to ask us for a copy of the personal
        data we hold about you, to correct it, to delete it, to restrict or object to how we use it,
        or to receive it in a portable form. To make a request, email{' '}
        <a href={`mailto:${ORG.email}`}>{ORG.email}</a>. We will respond within the time the
        applicable law allows. If you are in a jurisdiction with a data protection regulator, you
        also have the right to complain to it.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change how we handle personal data, we will update this page and the &ldquo;last
        updated&rdquo; date above. Material changes will be made clear on this page.
      </p>
    </LegalPage>
  );
}
