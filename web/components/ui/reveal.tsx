'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode, Ref } from 'react';

import { fadeUpBlock, fadeUpItem, staggerContainer } from '@/lib/motion';
import { useReveal } from '@/lib/use-reveal';

/**
 * Static tag map. Never call `motion(Component)` during render — it returns a
 * new component identity on every pass, which remounts the subtree.
 */
const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
  li: motion.li,
  p: motion.p,
  span: motion.span,
  h2: motion.h2,
  h3: motion.h3,
} as const;

type Tag = keyof typeof TAGS;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** `item` for text, `block` for cards/media. */
  variant?: 'item' | 'block';
  delay?: number;
  as?: Tag;
};

/** Scroll reveal for a single element. Fires once, on the way in. */
export function Reveal({
  children,
  className,
  variant = 'item',
  delay = 0,
  as = 'div',
}: RevealProps) {
  const Tag = TAGS[as];
  const { ref, inView } = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref as Ref<never>}
      className={className}
      variants={variant === 'block' ? fadeUpBlock : fadeUpItem}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  as?: Tag;
  variants?: Variants;
};

/**
 * Wrap a list/grid so its children reveal in sequence. Children must be
 * `<RevealItem>` (or any motion element with `hidden` / `show` variants).
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  as = 'div',
  variants,
}: RevealGroupProps) {
  const Tag = TAGS[as];
  const { ref, inView } = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref as Ref<never>}
      className={className}
      variants={variants ?? staggerContainer(stagger, delayChildren)}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
    >
      {children}
    </Tag>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  variant?: 'item' | 'block';
  as?: Tag;
};

/** A child of `<RevealGroup>`. Inherits the parent's stagger timing. */
export function RevealItem({
  children,
  className,
  variant = 'item',
  as = 'div',
}: RevealItemProps) {
  const Tag = TAGS[as];

  return (
    <Tag className={className} variants={variant === 'block' ? fadeUpBlock : fadeUpItem}>
      {children}
    </Tag>
  );
}
