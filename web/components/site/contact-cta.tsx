'use client';

import { ArrowRight, CalendarCheck, Mail } from 'lucide-react';

import { ButtonLink } from '@/components/ui/button';
import { RevealGroup, RevealItem } from '@/components/ui/reveal';
import { ORG } from '@/lib/site';

const STEPS = [
  { step: 'Step 01', title: 'Discovery call', body: 'Thirty minutes with an engineer, not a salesperson.' },
  { step: 'Step 02', title: 'Solution outline', body: 'Architecture, timeline, and cost — within a week.' },
  { step: 'Step 03', title: 'Delivery starts', body: 'A dedicated engineering pod in your tools, shipping from sprint one.' },
];

export function ContactCta() {
  return (
    <section id="contact" className="bg-canvas-soft pb-section">
      <div className="container">
        <RevealGroup stagger={0.1}>
          <RevealItem
            variant="block"
            className="on-dark relative isolate overflow-hidden rounded-5xl bg-navy-950 px-8 py-16 sm:px-14 sm:py-20"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-grid-dark bg-grid mask-fade-radial" />
              <div className="absolute -left-24 -top-24 h-[24rem] w-[24rem] rounded-full bg-electric-500/25 blur-[110px] animate-aurora" />
              <div className="absolute -bottom-28 right-0 h-[26rem] w-[26rem] rounded-full bg-violetine-600/25 blur-[120px] animate-aurora-slow" />
            </div>

            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <span className="eyebrow text-electric-300">
                  <span aria-hidden className="h-px w-6 bg-electric-400/70" />
                  Let&rsquo;s build
                </span>
                <h2 className="mt-6 font-display text-display-lg text-white text-balance">
                  Tell us the outcome. We&rsquo;ll engineer the path to it.
                </h2>
                <p className="mt-5 max-w-xl text-body-lg text-navy-200 text-pretty">
                  Whether you are automating a workflow that has quietly cost you years, replatforming
                  a product, or standing up an AI capability from zero — start with a conversation.
                  No pitch decks, no discovery invoice.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ButtonLink
                    href={`mailto:${ORG.email}`}
                    variant="accent"
                    size="lg"
                    icon={<Mail className="h-4 w-4" strokeWidth={1.75} />}
                  >
                    Contact us
                  </ButtonLink>
                  {/* Second route in case a mailto: does nothing — a device
                      with no mail client configured — where the contact page
                      also shows the address as copyable text. */}
                  <ButtonLink
                    href="/contact"
                    variant="onDark"
                    size="lg"
                    icon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
                  >
                    Contact details
                  </ButtonLink>
                </div>
              </div>

              <div className="lg:col-span-5">
                <ol className="space-y-px overflow-hidden rounded-3xl border border-white/10 bg-white/10">
                  {STEPS.map((item) => (
                    <li key={item.step} className="bg-navy-950/85 p-6 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <CalendarCheck className="h-4 w-4 text-electric-400" strokeWidth={1.75} />
                        <span className="text-[0.6875rem] uppercase tracking-[0.18em] text-navy-400">
                          {item.step}
                        </span>
                      </div>
                      <p className="mt-2.5 font-display text-base font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-navy-300">{item.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
