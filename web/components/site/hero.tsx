'use client';

import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, Sparkles } from 'lucide-react';

import { DigitalEcosystem } from '@/components/site/digital-ecosystem';
import { ButtonLink } from '@/components/ui/button';
import { fadeUpItem, heroContainer, lineReveal } from '@/lib/motion';

const HEADLINE = ['Digital transformation,', 'engineered with', 'intelligence.'];

const PROOF = [
  { value: '40%', label: 'Faster delivery cycles with AI-driven engineering' },
  { value: '24/7', label: 'Continuous automated testing across every build' },
  { value: '100%', label: 'Senior engineers — no junior bench, no hand-offs' },
];

export function Hero() {
  return (
    // Padding kept tight so the headline, copy and CTAs clear the fold on a
    // ~700px-tall viewport; the proof strip and trust rail scroll into view.
    <section className="on-dark relative isolate overflow-hidden bg-navy-950 pb-20 pt-28 sm:pb-24 sm:pt-32">
      {/* ---------- Atmosphere ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-dark bg-grid mask-fade-radial" />
        <div className="absolute -left-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-electric-500/20 blur-[120px] animate-aurora" />
        <div className="absolute -right-24 top-24 h-[30rem] w-[30rem] rounded-full bg-violetine-600/25 blur-[130px] animate-aurora-slow" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy-950 to-transparent" />
      </div>

      <div className="container">
        <motion.div variants={heroContainer} initial="hidden" animate="show">
          <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
            {/* ---------- Copy ---------- */}
            <div className="lg:col-span-7">
              <motion.div variants={fadeUpItem}>
                <span
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5
                             px-4 py-2 text-xs font-medium text-navy-100 backdrop-blur-sm"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-electric-400 animate-pulse-ring" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-electric-400" />
                  </span>
                  AI-native delivery for the modern enterprise
                </span>
              </motion.div>

              <h1 className="mt-6 font-display text-display-xl text-white">
                {HEADLINE.map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.08em]">
                    <motion.span
                      variants={lineReveal}
                      className={i === 2 ? 'block text-gradient-accent' : 'block'}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                variants={fadeUpItem}
                className="mt-6 max-w-xl text-body-lg text-navy-200 text-pretty"
              >
                IK Strategic Services LLP builds the systems that move enterprises forward — generative
                AI and intelligent automation, high-performance web and mobile platforms, and the senior
                engineering talent to run them. Strategy you can deploy, not slideware.
              </motion.p>

              <motion.div variants={fadeUpItem} className="mt-7 flex flex-wrap items-center gap-4">
                <ButtonLink
                  href="/contact"
                  variant="accent"
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
                >
                  Start your transformation
                </ButtonLink>
                <ButtonLink
                  href="/services"
                  variant="onDark"
                  size="lg"
                  icon={<PlayCircle className="h-4 w-4" strokeWidth={1.75} />}
                >
                  Explore capabilities
                </ButtonLink>
              </motion.div>

              {/* ---------- Proof strip ---------- */}
              <motion.dl
                variants={fadeUpItem}
                className="mt-10 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl
                           border border-white/10 bg-white/10 sm:grid-cols-3"
              >
                {PROOF.map((stat) => (
                  <div key={stat.value} className="bg-navy-950/80 p-5 backdrop-blur-sm">
                    <dt className="font-display text-2xl font-semibold text-electric-300">
                      {stat.value}
                    </dt>
                    <dd className="mt-1.5 text-[0.8125rem] leading-snug text-navy-300">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </motion.dl>
            </div>

            {/* ---------- Media ---------- */}
            <motion.div variants={fadeUpItem} className="relative lg:col-span-5">
              <DigitalEcosystem className="h-[22rem] w-full sm:h-[26rem] lg:h-[31rem]" />
            </motion.div>
          </div>

          {/* ---------- Trust rail ---------- */}
          <motion.div
            variants={fadeUpItem}
            className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-navy-400">
              <Sparkles className="h-3.5 w-3.5 text-electric-400" strokeWidth={2} />
              Trusted across regulated and high-growth sectors
            </p>
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {['Financial Services', 'Healthcare', 'Logistics', 'Retail', 'Manufacturing'].map(
                (sector) => (
                  <li
                    key={sector}
                    className="font-display text-sm font-medium text-navy-300/80 transition-colors duration-300 hover:text-white"
                  >
                    {sector}
                  </li>
                ),
              )}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
