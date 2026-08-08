'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { fadeUpItem, heroContainer, lineReveal } from '@/lib/motion';

/**
 * Compact navy header band for inner pages.
 *
 * Deliberately shorter than the homepage hero — on a sub-page the user has
 * already committed, so the job is orientation, not persuasion.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-950 pb-20 pt-36 sm:pt-44">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-dark bg-grid mask-fade-radial" />
        <div className="absolute -left-24 -top-32 h-[28rem] w-[28rem] rounded-full bg-electric-500/20 blur-[120px] animate-aurora" />
        <div className="absolute -right-20 top-10 h-[26rem] w-[26rem] rounded-full bg-violetine-600/22 blur-[130px] animate-aurora-slow" />
      </div>

      <div className="container">
        <motion.div variants={heroContainer} initial="hidden" animate="show" className="max-w-3xl">
          <motion.span variants={fadeUpItem} className="eyebrow text-electric-300">
            <span aria-hidden className="h-px w-6 bg-electric-400/70" />
            {eyebrow}
          </motion.span>

          <h1 className="mt-6 font-display text-display-lg text-white text-balance">
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span variants={lineReveal} className="block">
                {title}
              </motion.span>
            </span>
          </h1>

          <motion.div variants={fadeUpItem} className="mt-6 text-body-lg text-navy-200 text-pretty">
            {description}
          </motion.div>

          {children && (
            <motion.div variants={fadeUpItem} className="mt-10">
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
