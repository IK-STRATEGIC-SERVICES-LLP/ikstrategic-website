'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { drawLine, fadeUpItem, staggerContainer, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  className,
}: SectionHeadingProps) {
  const dark = tone === 'dark';

  return (
    <motion.div
      variants={staggerContainer(0.09)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn(
        'flex max-w-3xl flex-col gap-5',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      <motion.span
        variants={fadeUpItem}
        className={cn('eyebrow', dark ? 'text-electric-300' : 'text-electric-600')}
      >
        <span
          aria-hidden
          className={cn('h-px w-6', dark ? 'bg-electric-400/70' : 'bg-electric-500/70')}
        />
        {eyebrow}
      </motion.span>

      <motion.h2
        variants={fadeUpItem}
        className={cn(
          'font-display text-display-lg text-balance',
          dark ? 'text-white' : 'text-navy-950',
        )}
      >
        {title}
      </motion.h2>

      <motion.span
        variants={drawLine}
        className={cn(
          'h-px w-24 origin-left bg-gradient-to-r',
          dark ? 'from-electric-400 to-transparent' : 'from-electric-500 to-transparent',
          align === 'center' && 'origin-center',
        )}
      />

      {description && (
        <motion.p
          variants={fadeUpItem}
          className={cn(
            'text-body-lg text-pretty',
            dark ? 'text-navy-200' : 'text-navy-600',
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
