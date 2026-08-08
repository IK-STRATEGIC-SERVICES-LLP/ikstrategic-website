'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BrainCircuit, Database, Rocket, Search, ShieldCheck, type LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { EASE_OUT_EXPO, scaleIn } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Animated hero visual — a live "delivery engine" console.
 *
 * Replaces the stock photo: an AI-native firm should show its own machinery,
 * not a team at laptops. Illustrates the RAG path the copy actually claims —
 * ingest → retrieve → reason → ship.
 *
 * Performance: every loop animates transform or opacity only, so it stays on
 * the compositor. Fully disabled under prefers-reduced-motion.
 */

const STAGES: { icon: LucideIcon; label: string }[] = [
  { icon: Database, label: 'Ingest' },
  { icon: Search, label: 'Retrieve' },
  { icon: BrainCircuit, label: 'Reason' },
  { icon: Rocket, label: 'Ship' },
];

const METRICS = [
  { label: 'Retrieval accuracy', value: 96, display: '96%' },
  { label: 'Test coverage', value: 88, display: '88%' },
  { label: 'Pipeline health', value: 99, display: '99%' },
];

const LOG_LINES = [
  { tag: 'rag', text: 'indexed 12,480 chunks · 3 sources' },
  { tag: 'eval', text: 'groundedness 0.94 — above threshold' },
  { tag: 'test', text: '1,284 checks passed · 0 regressions' },
  { tag: 'ship', text: 'deployed to edge · 14 regions' },
  { tag: 'ops', text: 'model v2.4 promoted — rollback armed' },
];

export function HeroVisual() {
  const reduce = useReducedMotion();
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setLogIndex((i) => (i + 1) % LOG_LINES.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <motion.div variants={scaleIn} className="relative">
      {/* Ambient glow behind the panel */}
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10">
        <motion.div
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-electric-500/25 blur-[90px]"
          animate={reduce ? undefined : { x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-violetine-600/25 blur-[90px]"
          animate={reduce ? undefined : { x: [0, -30, 0], y: [0, 25, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ---------------- Console panel ---------------- */}
      <div className="relative overflow-hidden rounded-4xl border border-white/12 bg-navy-900/70 shadow-2xl backdrop-blur-xl">
        <div aria-hidden className="absolute inset-0 bg-grid-dark bg-grid-sm opacity-40" />

        {/* Scanning sweep */}
        {!reduce && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-electric-400/8 to-transparent"
            animate={{ y: ['-20%', '520%'] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
          />
        )}

        {/* Title bar */}
        <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="ml-2.5 font-mono text-[0.6875rem] text-navy-400">
              delivery-engine
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-electric-400/30 bg-electric-400/10 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-widest text-electric-300">
            <span className="relative flex h-1.5 w-1.5">
              {!reduce && (
                <span className="absolute inline-flex h-full w-full rounded-full bg-electric-400 animate-pulse-ring" />
              )}
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-electric-400" />
            </span>
            live
          </span>
        </div>

        {/* ---------------- Pipeline ---------------- */}
        <div className="relative px-5 py-8 sm:px-7">
          <div className="flex items-center">
            {STAGES.map((stage, i) => (
              <div key={stage.label} className="contents">
                <Stage stage={stage} index={i} reduce={Boolean(reduce)} />
                {i < STAGES.length - 1 && <Connector index={i} reduce={Boolean(reduce)} />}
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- Metrics ---------------- */}
        <div className="relative grid gap-4 border-t border-white/10 px-5 py-6 sm:grid-cols-3 sm:px-7">
          {METRICS.map((metric, i) => (
            <div key={metric.label}>
              <div className="flex items-baseline justify-between">
                <span className="text-[0.6875rem] text-navy-400">{metric.label}</span>
                <span className="font-mono text-xs font-semibold text-electric-300">
                  {metric.display}
                </span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-accent-sweep"
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{
                    duration: reduce ? 0 : 1.4,
                    delay: reduce ? 0 : 0.9 + i * 0.15,
                    ease: EASE_OUT_EXPO,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ---------------- Log stream ---------------- */}
        <div className="relative flex h-14 items-center gap-3 border-t border-white/10 bg-navy-950/50 px-5 sm:px-7">
          <ShieldCheck className="h-4 w-4 shrink-0 text-electric-400" strokeWidth={1.75} />
          <div className="relative h-5 flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={logIndex}
                initial={reduce ? false : { y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduce ? undefined : { y: -14, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                className="absolute inset-0 flex items-center gap-2 font-mono text-[0.6875rem] text-navy-300"
              >
                <span className="text-electric-400">[{LOG_LINES[logIndex].tag}]</span>
                <span className="truncate">{LOG_LINES[logIndex].text}</span>
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** A pipeline stage: icon tile with a pulse ring timed to the passing packet. */
function Stage({
  stage,
  index,
  reduce,
}: {
  stage: { icon: LucideIcon; label: string };
  index: number;
  reduce: boolean;
}) {
  const { icon: Icon } = stage;
  const delay = index * 0.8;

  return (
    <div className="flex shrink-0 flex-col items-center gap-2.5">
      <div className="relative">
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-2xl border border-electric-400/60"
            animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, delay, ease: 'easeOut' }}
          />
        )}
        <motion.span
          className="relative grid h-11 w-11 place-items-center rounded-2xl border border-white/12 bg-navy-950/80"
          animate={
            reduce
              ? undefined
              : { borderColor: ['rgba(255,255,255,0.12)', 'rgba(34,211,238,0.55)', 'rgba(255,255,255,0.12)'] }
          }
          transition={{ duration: 3.2, repeat: Infinity, delay, ease: 'easeInOut' }}
        >
          <Icon className="h-[18px] w-[18px] text-electric-300" strokeWidth={1.75} />
        </motion.span>
      </div>
      <span className="font-mono text-[0.625rem] uppercase tracking-wider text-navy-400">
        {stage.label}
      </span>
    </div>
  );
}

/** Rail between stages, carrying a light packet from one node to the next. */
function Connector({ index, reduce }: { index: number; reduce: boolean }) {
  return (
    <div className="relative mx-1.5 h-px flex-1 bg-white/12 sm:mx-2.5">
      {!reduce && (
        <motion.span
          aria-hidden
          className={cn(
            'absolute -top-px h-[3px] w-1/3 rounded-full',
            'bg-gradient-to-r from-transparent via-electric-400 to-transparent',
          )}
          // 300% of a one-third-width element clears the full rail.
          animate={{ x: ['-100%', '300%'] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.8,
            repeatDelay: 1.6,
          }}
        />
      )}
    </div>
  );
}
