'use client';

import { motion } from 'framer-motion';
import {
  Blocks,
  Cpu,
  Database,
  GitBranch,
  Radar,
  ShieldCheck,
  Terminal,
  type LucideIcon,
} from 'lucide-react';

import { RevealGroup, RevealItem } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { cardHover, iconNudge } from '@/lib/motion';

type Method = {
  id: string;
  icon: LucideIcon;
  title: string;
  abbr?: string;
  body: string;
  proof: string;
};

const METHODS: Method[] = [
  {
    id: '01',
    icon: Cpu,
    title: 'AI-Driven Development',
    abbr: 'AIDD',
    body: 'We compress the software lifecycle by putting AI to work inside it — generating production code, isolating and fixing bugs, and writing the migration and deployment scripts that traditionally eat entire sprints.',
    proof: 'Weeks removed from every release cycle',
  },
  {
    id: '02',
    icon: Terminal,
    title: 'Prompt Engineering',
    body: 'Precision instructions are an engineering discipline, not a party trick. We design, version, and regression-test the prompts that steer your models, so outputs stay accurate and reproducible as you scale.',
    proof: 'Versioned, tested, and reviewable like code',
  },
  {
    id: '03',
    icon: GitBranch,
    title: 'LLMOps',
    body: 'Getting a model to production is the easy half. We manage the rest — training, evaluation, versioned rollouts, drift monitoring, and safe rollback for large language models running live under real load.',
    proof: 'Governed model releases, zero-drama rollbacks',
  },
  {
    id: '04',
    icon: Database,
    title: 'Retrieval-Augmented Generation',
    abbr: 'RAG',
    body: 'We connect AI directly to your secure enterprise data, so answers are grounded in your policies, your contracts, and your systems of record — context-aware, source-cited, and never invented.',
    proof: 'Answers grounded in your data, with citations',
  },
  {
    id: '05',
    icon: Radar,
    title: 'Continuous AI Testing',
    body: 'Autonomous test agents run around the clock against every build, probing aggressively for security flaws, edge-case crashes, and regressions — so defects surface in your pipeline rather than in your production incident channel.',
    proof: '24/7 adversarial coverage on every commit',
  },
  {
    id: '06',
    icon: Blocks,
    title: 'AI-Enhanced Agile',
    body: 'We supercharge the agile loop end to end: AI predicts delivery risk during planning, writes boilerplate the moment a ticket opens, and auto-generates test cases before review — so the ceremony shrinks and the throughput climbs.',
    proof: 'Risk predicted in planning, not discovered in QA',
  },
];

export function Methodology() {
  return (
    <section
      id="methodology"
      className="on-dark relative isolate overflow-hidden bg-navy-950 py-section"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-dark bg-grid mask-fade-y" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[42rem] -translate-x-1/2 rounded-full bg-violetine-600/18 blur-[140px] animate-aurora-slow" />
        <div className="absolute -right-20 bottom-0 h-[26rem] w-[26rem] rounded-full bg-electric-500/15 blur-[120px] animate-aurora" />
      </div>

      <div className="container">
        <SectionHeading
          tone="dark"
          align="center"
          eyebrow="How we build"
          title={
            <>
              A modern delivery engine —{' '}
              <span className="text-gradient-accent">faster and smarter</span> than the traditional
              firm.
            </>
          }
          description="Legacy consultancies bill you for the time a build takes. We invest in the methods that make it take less. Six practices sit underneath every engagement we run."
        />

        <RevealGroup
          className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
        >
          {METHODS.map((method) => (
            <RevealItem key={method.id} variant="block" className="h-full">
              <MethodCard method={method} />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Closing assurance bar */}
        <RevealGroup className="mt-14" stagger={0.1}>
          <RevealItem
            variant="block"
            className="flex flex-col items-start gap-6 rounded-3xl border border-white/10
                       bg-white/[0.04] p-8 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-electric-400/15">
                <ShieldCheck className="h-5 w-5 text-electric-300" strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-white">
                  Speed never comes at the cost of governance.
                </p>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-navy-300">
                  Every AI-assisted line is human-reviewed, every model release is versioned and
                  auditable, and your data stays inside your boundary. Faster, and still defensible
                  to your risk committee.
                </p>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}

function MethodCard({ method }: { method: Method }) {
  const { icon: Icon } = method;

  return (
    <motion.article
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      tabIndex={0}
      className="group relative flex h-full cursor-default flex-col overflow-hidden rounded-3xl
                 border border-white/10 bg-white/[0.035] p-8 backdrop-blur-sm
                 transition-colors duration-500 ease-out-expo hover:border-electric-400/40"
    >
      {/* Accent wash on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-electric-400/10
                   via-transparent to-violetine-500/10 opacity-0 transition-opacity
                   duration-500 ease-out-expo group-hover:opacity-100"
      />

      <div className="relative flex items-center justify-between">
        <motion.span
          variants={iconNudge}
          className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10
                     bg-navy-900 text-electric-300 transition-colors duration-500
                     group-hover:border-electric-400/50 group-hover:bg-electric-400/10"
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </motion.span>
        <span className="font-mono text-xs tracking-widest text-navy-500 transition-colors duration-500 group-hover:text-electric-400">
          {method.id}
        </span>
      </div>

      <h3 className="relative mt-6 font-display text-xl font-semibold text-white">
        {method.title}
        {method.abbr && (
          <span className="ml-2 align-middle text-xs font-medium tracking-widest text-electric-400">
            {method.abbr}
          </span>
        )}
      </h3>

      <p className="relative mb-6 mt-3 text-sm leading-relaxed text-navy-300 text-pretty">
        {method.body}
      </p>

      {/* mt-auto keeps the proof line on the card floor so rows align. */}
      <p className="relative mt-auto flex items-start gap-2 border-t border-white/10 pt-5 text-xs font-medium leading-relaxed text-navy-200">
        <span aria-hidden className="mt-[0.3rem] h-1.5 w-1.5 shrink-0 rounded-full bg-electric-400" />
        {method.proof}
      </p>
    </motion.article>
  );
}
