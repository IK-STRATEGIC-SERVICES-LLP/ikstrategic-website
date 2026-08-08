'use client';

import { useId } from 'react';

import { cn } from '@/lib/utils';

/**
 * IK Strategic — "The Vector K".
 *
 * Construction (64×64 grid, ink optically centred with 12u side bearings):
 *   • Two navy stems  — the I, and the K's spine.
 *   • Two accent arms — the K's arms, which double as a `>` command prompt
 *     and as an ascending trajectory. The upper arm overshoots the cap height
 *     on purpose: growth breaking its own ceiling.
 *
 * Do not re-space the stems or restyle the arms per surface — swap `tone`.
 */

type Tone = 'light' | 'dark' | 'mono';

// 7u gap between the I and the K's spine — equal to the stem width, so the two
// bars read as two letters rather than a single paused-media glyph.
const STEM_A = { x: 11.5, y: 14.75, width: 7, height: 36, rx: 3.5 };
const STEM_B = { x: 25.5, y: 14.75, width: 7, height: 36, rx: 3.5 };
const ARM_UP = 'M32.5 32.75L50 16.25';
const ARM_DOWN = 'M32.5 32.75L48 47.75';

export function LogoMark({
  className,
  tone = 'light',
  title,
}: {
  className?: string;
  tone?: Tone;
  /** Only set on a standalone mark; the lockup labels itself. */
  title?: string;
}) {
  // Unique per instance — the header and footer both render this on one page.
  const gradientId = useId();

  const stemFill = tone === 'light' ? '#08122A' : tone === 'dark' ? '#FFFFFF' : 'currentColor';
  const armStroke = tone === 'mono' ? 'currentColor' : `url(#${gradientId})`;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {tone !== 'mono' && (
        <defs>
          <linearGradient
            id={gradientId}
            x1="30"
            y1="48"
            x2="50"
            y2="14"
            gradientUnits="userSpaceOnUse"
          >
            {/* Indigo at the base, cyan at the ascending tip. */}
            <stop stopColor={tone === 'dark' ? '#818CF8' : '#6366F1'} />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
      )}

      {/* Tailwind's transition-colors covers `fill`, so a tone swap (e.g. the
          header crossing from the hero onto white) eases instead of snapping. */}
      <rect {...STEM_A} fill={stemFill} className="transition-colors duration-500" />
      <rect {...STEM_B} fill={stemFill} className="transition-colors duration-500" />
      <path d={ARM_UP} stroke={armStroke} strokeWidth="7" strokeLinecap="round" />
      <path d={ARM_DOWN} stroke={armStroke} strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

/** Mark + wordmark. The wordmark is live text so it inherits the Sora webfont. */
export function Logo({
  className,
  tone = 'light',
  showWordmark = true,
}: {
  className?: string;
  tone?: Tone;
  showWordmark?: boolean;
}) {
  const dark = tone === 'dark';

  return (
    <span className={cn('flex items-center gap-3', className)}>
      <LogoMark tone={tone} className="h-10 w-10 shrink-0" />
      {showWordmark && (
        <span className="leading-[1.08]">
          <span
            className={cn(
              'block font-display text-[0.9375rem] font-semibold tracking-tight transition-colors duration-500',
              dark ? 'text-white' : 'text-navy-950',
            )}
          >
            IK Strategic
          </span>
          <span
            className={cn(
              'block text-[0.6875rem] uppercase tracking-[0.2em] transition-colors duration-500',
              dark ? 'text-navy-400' : 'text-navy-500',
            )}
          >
            Services LLP
          </span>
        </span>
      )}
    </span>
  );
}
