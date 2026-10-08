import type { Metadata } from 'next';
import { CalendarCheck, Mail, MapPin, Users } from 'lucide-react';

import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { PageHero } from '@/components/site/page-hero';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal';
import { ORG } from '@/lib/site';

/**
 * Pre-filled email link, used instead of an on-site form.
 *
 * There is a working form component (`components/site/contact-form.tsx`) and
 * handler (`app/api/contact/route.ts`) ready to switch back on — they just need
 * `RESEND_API_KEY` and `CONTACT_TO_EMAIL` set in the environment. Until then a
 * real mail draft beats a form that returns 503 on submit.
 */
const SUBJECT = 'Website enquiry';
const BODY = [
  'A bit about your organisation:',
  '',
  '',
  'What you are trying to do:',
  '',
  '',
  'Timeline and any hard constraints:',
  '',
  '',
  'What success looks like:',
  '',
].join('\n');

const subject = encodeURIComponent(SUBJECT);
const body = encodeURIComponent(BODY);

/** Default mail app on the visitor's device. */
const CONTACT_MAILTO = `mailto:${ORG.email}?subject=${subject}&body=${body}`;

/**
 * Webmail compose links with the same pre-filled draft. A page cannot detect
 * which mail apps or accounts a visitor has, so rather than guess we offer the
 * default app first and Outlook / Gmail on the web as explicit alternatives.
 */
const OUTLOOK_COMPOSE =
  `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(ORG.email)}` +
  `&subject=${subject}&body=${body}`;
const GMAIL_COMPOSE =
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(ORG.email)}` +
  `&su=${subject}&body=${body}`;

export const metadata: Metadata = {
  title: 'Contact — Start a conversation',
  description:
    'Talk to an engineer at IK Strategic Services LLP about AI and automation, web and mobile platforms, or engineering resourcing. No pitch decks, no discovery invoice.',
  alternates: { canonical: '/contact' },
  openGraph: {
    url: '/contact',
    title: 'Contact IK Strategic Services LLP',
    description: 'Tell us the outcome. We will engineer the path to it.',
  },
};

const STEPS = [
  {
    step: 'Step 01',
    title: 'Discovery call',
    body: 'Thirty minutes with an engineer, not a salesperson. We will tell you if we are the wrong fit.',
  },
  {
    step: 'Step 02',
    title: 'Solution outline',
    body: 'Architecture, timeline and cost — within a week, and without a discovery invoice.',
  },
  {
    step: 'Step 03',
    title: 'Delivery starts',
    body: 'A dedicated engineering pod in your tools and your repo, shipping from the first sprint.',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us the outcome. We'll engineer the path to it."
        description="Whether you are automating a workflow that has quietly cost you years, replatforming a product, or standing up an AI capability from zero — start with a conversation."
      />

      <Breadcrumbs trail={[{ name: 'Contact', href: '/contact' }]} />

      <section className="bg-canvas-soft py-section">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* ---------- Message us ---------- */}
            <Reveal variant="block" className="min-w-0 lg:col-span-7">
              <h2 className="font-display text-display-md text-navy-950">Send us a message</h2>
              <p className="mt-3 max-w-xl text-body-lg text-navy-600 text-pretty">
                The more you can tell us about the system and the constraints, the more useful our
                first reply will be.
              </p>

              <div className="mt-8 rounded-3xl border border-canvas-line bg-white p-7 shadow-card sm:p-9">
                <p className="text-sm font-medium text-navy-900">Email us at</p>
                <a
                  href={CONTACT_MAILTO}
                  className="mt-1 inline-block break-all font-display text-display-sm text-navy-950 underline decoration-electric-400 decoration-2 underline-offset-4 transition-colors hover:text-electric-700"
                >
                  {ORG.email}
                </a>

                <p className="mt-7 text-sm font-medium text-navy-900">
                  A few things that help us give you a useful first reply:
                </p>
                <ul className="mt-3 space-y-2.5 text-sm text-navy-600">
                  {[
                    'The system as it stands today, and what it connects to',
                    'Your timeline, and any hard constraints (compliance, budget, team)',
                    'What a successful outcome looks like',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden
                        className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-electric-500"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={CONTACT_MAILTO}
                  className="mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full
                             bg-navy-950 px-8 text-[0.9375rem] font-medium text-white shadow-card
                             transition-colors duration-300 hover:bg-navy-900 sm:w-auto"
                >
                  Open a pre-filled email
                  <Mail className="h-4 w-4" strokeWidth={2} />
                </a>

                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="text-xs text-navy-500">Or compose in your browser:</span>
                  {[
                    { label: 'Outlook', href: OUTLOOK_COMPOSE },
                    { label: 'Gmail', href: GMAIL_COMPOSE },
                  ].map((option) => (
                    <a
                      key={option.label}
                      href={option.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center rounded-full border border-canvas-line
                                 px-5 text-sm font-medium text-navy-900 transition-colors
                                 duration-300 hover:border-electric-400 hover:text-electric-700"
                    >
                      {option.label}
                    </a>
                  ))}
                </div>

                <p className="mt-4 text-xs text-navy-500">
                  We reply within one business day. No sales sequence, no newsletter.
                </p>
              </div>
            </Reveal>

            {/* ---------- Details ---------- */}
            <div className="lg:col-span-5">
              <RevealGroup className="space-y-5" stagger={0.08}>
                <RevealItem variant="block">
                  <div className="rounded-3xl border border-canvas-line bg-white p-7 shadow-card">
                    <h2 className="font-display text-display-sm text-navy-950">Reach us directly</h2>
                    <ul className="mt-6 space-y-5">
                      <li className="flex items-start gap-3.5">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-canvas-muted text-electric-700">
                          <Mail className="h-4 w-4" strokeWidth={1.75} />
                        </span>
                        <div>
                          <p className="text-eyebrow uppercase text-navy-400">Email</p>
                          <a
                            href={`mailto:${ORG.email}`}
                            className="mt-1 block text-sm font-medium text-navy-900 transition-colors hover:text-electric-700"
                          >
                            {ORG.email}
                          </a>
                        </div>
                      </li>
                      <li className="flex items-start gap-3.5">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-canvas-muted text-electric-700">
                          <MapPin className="h-4 w-4" strokeWidth={1.75} />
                        </span>
                        <div>
                          <p className="text-eyebrow uppercase text-navy-400">Office</p>
                          {/* Matches the PostalAddress in the JSON-LD exactly —
                              Google cross-checks the two, and a mismatch is
                              what stops a business profile from verifying. */}
                          <address className="mt-1 text-sm not-italic leading-relaxed text-navy-800">
                            {ORG.streetAddress}
                            <span className="block">
                              {ORG.addressLocality}, {ORG.addressRegion} {ORG.postalCode}, India
                            </span>
                            <span className="block text-navy-500">Serving clients globally</span>
                          </address>
                        </div>
                      </li>
                      <li className="flex items-start gap-3.5">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-canvas-muted text-electric-700">
                          <Users className="h-4 w-4" strokeWidth={1.75} />
                        </span>
                        <div>
                          <p className="text-eyebrow uppercase text-navy-400">Careers</p>
                          <p className="mt-1 text-sm text-navy-800">
                            Engineers, email us and mention the role.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </RevealItem>

                <RevealItem variant="block">
                  <div className="on-dark overflow-hidden rounded-3xl bg-navy-950 p-7">
                    <h2 className="font-display text-display-sm text-white">What happens next</h2>
                    <ol className="mt-6 space-y-5">
                      {STEPS.map((item) => (
                        <li key={item.step}>
                          <div className="flex items-center gap-2.5">
                            <CalendarCheck
                              className="h-4 w-4 text-electric-400"
                              strokeWidth={1.75}
                            />
                            <span className="text-[0.6875rem] uppercase tracking-[0.18em] text-navy-400">
                              {item.step}
                            </span>
                          </div>
                          <p className="mt-2 font-display text-base font-semibold text-white">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-navy-300">{item.body}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </RevealItem>
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
