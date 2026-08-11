'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { arrowSlide, buttonTap, springSnappy } from '@/lib/motion';
import { cn, isExternalHref } from '@/lib/utils';

/**
 * `primary` is the navy CTA for light sections. On navy surfaces it would be
 * invisible — use `accent` there instead. `onDark` is the secondary pairing.
 */
type Variant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'onDark';

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium ' +
  'transition-colors duration-300 ease-out-expo whitespace-nowrap';

const sizes = {
  md: 'h-11 px-6',
  lg: 'h-14 px-8 text-[0.9375rem]',
} as const;

const variants: Record<Variant, string> = {
  // Primary CTA on light sections — used sparingly, one per viewport.
  primary:
    'bg-navy-950 text-white shadow-card hover:bg-navy-900 ' +
    'hover:shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_20px_45px_-18px_rgba(34,211,238,0.55)]',
  // Primary CTA on navy sections — the accent gradient carries the contrast.
  accent:
    'bg-accent-sweep text-navy-950 font-semibold shadow-glow ' +
    'hover:shadow-[0_0_0_1px_rgba(34,211,238,0.5),0_24px_55px_-16px_rgba(34,211,238,0.75)]',
  secondary:
    'border border-canvas-line bg-white text-navy-900 hover:border-navy-300 hover:bg-canvas-soft',
  ghost: 'text-navy-700 hover:text-navy-950',
  onDark: 'border border-white/20 text-white hover:border-electric-400/60 hover:bg-white/5',
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  icon?: ReactNode;
  className?: string;
  /** Stretch to fill the parent — used in the mobile menu and narrow cards. */
  fullWidth?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className,
  fullWidth = false,
}: ButtonLinkProps) {
  const classes = cn(base, sizes[size], variants[variant], fullWidth && 'w-full', className);

  const inner = (
    <>
      {/* Cyan wash that sweeps in behind the label on hover. */}
      {variant === 'primary' && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full bg-accent-sweep opacity-0
                     transition-opacity duration-500 ease-out-expo group-hover:opacity-100"
        />
      )}
      <span className="relative">{children}</span>
      {icon && (
        <motion.span variants={arrowSlide} className="relative flex">
          {icon}
        </motion.span>
      )}
    </>
  );

  return (
    <motion.div
      className={fullWidth ? 'flex w-full' : 'inline-flex'}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      whileTap={buttonTap}
      transition={springSnappy}
    >
      {/* mailto:, tel: and cross-origin links must be plain anchors — see
          isExternalHref. Routing them through <Link> makes them dead. */}
      {isExternalHref(href) ? (
        <a href={href} className={classes}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={classes}>
          {inner}
        </Link>
      )}
    </motion.div>
  );
}
