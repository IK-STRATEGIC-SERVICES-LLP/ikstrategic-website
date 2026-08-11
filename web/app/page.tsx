import type { Metadata } from 'next';

import { ContactCta } from '@/components/site/contact-cta';
import { EnterpriseValue } from '@/components/site/enterprise-value';
import { Hero } from '@/components/site/hero';
import { Methodology } from '@/components/site/methodology';
import { Services } from '@/components/site/services';

export const metadata: Metadata = {
  // Written out in full, suffix included. The root layout's `title.template`
  // applies to child segments only, and this page shares the root segment —
  // so a bare title here produced a homepage <title> with no company name in
  // it at all, on the one page that most needs to rank for the firm's name.
  title: 'IK Strategic Services LLP — Digital Transformation & Intelligent Automation',
  description:
    'IK Strategic Services LLP delivers AI and automation, web and mobile engineering, and expert consulting talent — built on an AI-native delivery method that ships faster than traditional firms.',
  alternates: { canonical: '/' },
};

/**
 * Landing page.
 *
 * Section rhythm alternates canvas tones so each block reads as its own idea:
 *   Hero (navy) → Services (white) → Methodology (navy) → Why IK (off-white)
 *   → CTA (navy card on off-white) → Footer (navy).
 *
 * Every section is a client component because each owns its scroll-reveal
 * choreography; the page itself stays a server component so metadata, data
 * fetching, and any future Node backend calls can live here.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Methodology />
      <EnterpriseValue />
      <ContactCta />
    </>
  );
}
