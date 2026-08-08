import type { Metadata } from 'next';
import { CalendarCheck, Mail, MapPin, Users } from 'lucide-react';

import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { ContactForm } from '@/components/site/contact-form';
import { PageHero } from '@/components/site/page-hero';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal';
import { ORG } from '@/lib/site';

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
    body: 'A senior pod in your tools and your repo, shipping from the first sprint.',
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
            {/* ---------- Form ---------- */}
            <Reveal variant="block" className="lg:col-span-7">
              <h2 className="font-display text-display-md text-navy-950">Send us a message</h2>
              <p className="mt-3 max-w-xl text-body-lg text-navy-600 text-pretty">
                The more you can tell us about the system and the constraints, the more useful our
                first reply will be.
              </p>
              <div className="mt-8">
                <ContactForm fallbackEmail={ORG.email} />
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
                          <p className="text-eyebrow uppercase text-navy-400">Based in</p>
                          <p className="mt-1 text-sm text-navy-800">
                            {ORG.addressLocality}, {ORG.addressRegion}, India
                            <span className="block text-navy-500">Serving clients globally</span>
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3.5">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-canvas-muted text-electric-700">
                          <Users className="h-4 w-4" strokeWidth={1.75} />
                        </span>
                        <div>
                          <p className="text-eyebrow uppercase text-navy-400">Careers</p>
                          <p className="mt-1 text-sm text-navy-800">
                            Engineers, use the form and mention the role.
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
