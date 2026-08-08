'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, PlayCircle, ShieldCheck, Sparkles } from 'lucide-react';
import Image from 'next/image';

import { ButtonLink } from '@/components/ui/button';
import { EASE_OUT_EXPO, fadeUpItem, heroContainer, lineReveal, scaleIn } from '@/lib/motion';

const HEADLINE = ['Digital transformation,', 'engineered with', 'intelligence.'];

const PROOF = [
  { value: '40%', label: 'Faster delivery cycles with AI-driven engineering' },
  { value: '24/7', label: 'Continuous automated testing across every build' },
  { value: '100%', label: 'Senior engineers — no junior bench, no hand-offs' },
];

export function Hero() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-950 pb-section pt-36 sm:pt-44">
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

              <h1 className="mt-8 font-display text-display-xl text-white">
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
                className="mt-7 max-w-xl text-body-lg text-navy-200 text-pretty"
              >
                IK Strategic Services LLP builds the systems that move enterprises forward — generative
                AI and intelligent automation, high-performance web and mobile platforms, and the senior
                engineering talent to run them. Strategy you can deploy, not slideware.
              </motion.p>

              <motion.div variants={fadeUpItem} className="mt-10 flex flex-wrap items-center gap-4">
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
                className="mt-14 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl
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
            <motion.div variants={scaleIn} className="relative lg:col-span-5">
              <div className="relative overflow-hidden rounded-4xl border border-white/12 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                  alt="An IK Strategic delivery team reviewing an automation architecture together"
                  width={1200}
                  height={1400}
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="h-[30rem] w-full object-cover lg:h-[34rem]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/25 to-transparent" />
              </div>

              {/* Floating bento chip — top */}
              <motion.div
                initial={{ opacity: 0, y: 24, x: -12 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.85, duration: 0.9, ease: EASE_OUT_EXPO }}
                className="absolute -left-4 top-8 w-52 rounded-2xl border border-white/15 bg-navy-900/85
                           p-4 shadow-glow backdrop-blur-xl sm:-left-8"
              >
                <div className="flex items-center gap-2.5">
                  <BrainCircuit className="h-4 w-4 text-electric-400" strokeWidth={1.75} />
                  <span className="text-xs font-semibold text-white">RAG pipeline</span>
                </div>
                <p className="mt-2 text-[0.6875rem] leading-relaxed text-navy-300">
                  Grounded on your private data. Answers with citations, never guesses.
                </p>
              </motion.div>

              {/* Floating bento chip — bottom */}
              <motion.div
                initial={{ opacity: 0, y: 24, x: 12 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 1.0, duration: 0.9, ease: EASE_OUT_EXPO }}
                className="absolute -right-3 bottom-10 w-56 rounded-2xl border border-white/15
                           bg-navy-900/85 p-4 shadow-glow backdrop-blur-xl sm:-right-6"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-electric-400" strokeWidth={1.75} />
                  <span className="text-xs font-semibold text-white">Build health</span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    transition={{ delay: 1.25, duration: 1.4, ease: EASE_OUT_EXPO }}
                    className="h-full rounded-full bg-accent-sweep"
                  />
                </div>
                <p className="mt-2 text-[0.6875rem] text-navy-300">
                  1,284 automated checks passing
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* ---------- Trust rail ---------- */}
          <motion.div
            variants={fadeUpItem}
            className="mt-20 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between"
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
