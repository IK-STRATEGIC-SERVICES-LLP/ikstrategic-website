'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Building2, Gauge, Handshake, Layers, TrendingUp } from 'lucide-react';
import Image from 'next/image';

import { ButtonLink } from '@/components/ui/button';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { cardHover, EASE_OUT_EXPO, iconNudge } from '@/lib/motion';

const PILLARS = [
  {
    icon: Layers,
    title: 'Built to scale with you',
    body: 'Architecture decisions made for where your business is heading, not just where it is today. Systems that absorb ten times the load without a rewrite.',
  },
  {
    icon: Gauge,
    title: 'Agile by structure, not slogan',
    body: 'As an LLP we stay lean and decide fast — no layers of account management between you and the engineers actually building your platform.',
  },
  {
    icon: TrendingUp,
    title: 'Growing into our next chapter',
    body: 'We are scaling toward private limited incorporation, expanding governance, delivery capacity, and long-horizon enterprise commitments as we go.',
  },
  {
    icon: Handshake,
    title: 'Partners, not vendors',
    body: 'We measure ourselves on the outcome you shipped and the capability your team keeps — not on hours logged against a statement of work.',
  },
];

export function EnterpriseValue() {
  return (
    <section id="enterprise" className="relative bg-canvas-soft py-section">
      <div className="container">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ---------- Media ---------- */}
          <Reveal variant="block" className="relative lg:col-span-5">
            <div className="relative overflow-hidden rounded-4xl shadow-card-hover">
              <Image
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
                alt="The IK Strategic delivery floor during a planning session"
                width={1200}
                height={1000}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="h-[26rem] w-full object-cover lg:h-[32rem]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.2 }}
              className="absolute -bottom-6 -right-2 w-60 rounded-3xl border border-canvas-line
                         bg-white p-6 shadow-card-hover sm:-right-8"
            >
              <Building2 className="h-5 w-5 text-electric-600" strokeWidth={1.75} />
              <p className="mt-3 font-display text-2xl font-semibold text-navy-950">LLP → Pvt Ltd</p>
              <p className="mt-1.5 text-xs leading-relaxed text-navy-500">
                Expanding our structure to match the scale of the engagements we now run.
              </p>
            </motion.div>
          </Reveal>

          {/* ---------- Copy ---------- */}
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Why IK Strategic"
              title="Enterprise scale. Agile at the core."
              description="IK Strategic Services LLP was built to give enterprises something they rarely get at once: the rigour and accountability of a large integrator, delivered at the speed of a focused, senior team. We are committed to scalable IT solutions for the long term — and we are growing the structure to match, moving from LLP toward private limited incorporation as our enterprise commitments deepen."
            />

            <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2" stagger={0.08}>
              {PILLARS.map((pillar) => (
                <RevealItem key={pillar.title} variant="block" className="h-full">
                  <motion.div
                    variants={cardHover}
                    initial="rest"
                    whileHover="hover"
                    className="group h-full rounded-3xl border border-canvas-line bg-white p-6
                               shadow-card transition-shadow duration-500 ease-out-expo hover:shadow-card-hover"
                  >
                    <motion.span
                      variants={iconNudge}
                      className="grid h-10 w-10 place-items-center rounded-xl bg-canvas-muted
                                 text-navy-800 transition-colors duration-500
                                 group-hover:bg-electric-50 group-hover:text-electric-700"
                    >
                      <pillar.icon className="h-5 w-5" strokeWidth={1.75} />
                    </motion.span>
                    <h3 className="mt-5 font-display text-base font-semibold text-navy-950">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-600 text-pretty">
                      {pillar.body}
                    </p>
                  </motion.div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        {/* ---------- Careers ---------- */}
        <Reveal variant="block" className="mt-20 lg:mt-28">
          <div
            id="careers"
            className="grid items-center gap-8 rounded-4xl border border-canvas-line bg-white
                       p-8 shadow-card sm:p-12 lg:grid-cols-12"
          >
            <div className="lg:col-span-8">
              <span className="eyebrow text-electric-600">
                <span aria-hidden className="h-px w-6 bg-electric-500/70" />
                Careers
              </span>
              {/* h2, not h3 — careers is a peer topic to the section above it,
                  not a child of it. Jumping to h3 would skip a level. */}
              <h2 className="mt-5 font-display text-display-md text-navy-950 text-balance">
                Engineers who would rather build the method than follow one.
              </h2>
              <p className="mt-4 max-w-2xl text-body-lg text-navy-600 text-pretty">
                We hire senior, we stay small per team, and we give people direct ownership of
                systems that matter. If you want to work where AI is part of the toolchain rather
                than a talking point, we should talk.
              </p>
            </div>
            <div className="flex lg:col-span-4 lg:justify-end">
              <ButtonLink
                href="/contact"
                size="lg"
                icon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
              >
                See open roles
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
