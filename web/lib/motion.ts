import type { Transition, Variants } from 'framer-motion';

/**
 * IK Strategic — motion language.
 *
 * Three rules keep the whole site feeling like one product:
 *  1. Everything enters from below, never from the side (except deliberate rails).
 *  2. Distance scales with element size — big blocks travel further than labels.
 *  3. One easing curve for entrances (expo-out), one for interactions (soft spring).
 */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 30,
  mass: 0.9,
};

export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 26,
};

/* ------------------------------------------------------------------ */
/* Orchestration                                                       */
/* ------------------------------------------------------------------ */

/** Parent wrapper. Children animate in sequence, not all at once. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Hero-grade orchestration: slower cadence, more deliberate. */
export const heroContainer: Variants = staggerContainer(0.11, 0.12);

/* ------------------------------------------------------------------ */
/* Entrances                                                           */
/* ------------------------------------------------------------------ */

export const fadeUp = (distance = 24, duration = 0.75): Variants => ({
  hidden: { opacity: 0, y: distance },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: EASE_OUT_EXPO },
  },
});

/** Default for headings and copy inside a staggered parent. */
export const fadeUpItem: Variants = fadeUp(22);

/** Larger blocks — cards, media, panels — travel further and settle slower. */
export const fadeUpBlock: Variants = fadeUp(40, 0.9);

export const fadeIn = (duration = 0.8): Variants => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration, ease: EASE_OUT_EXPO } },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 18 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

/** Horizontal rail — used only for the marquee/side-entering accents. */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

/** Masked line reveal for display headlines. Pair with `overflow-hidden`. */
export const lineReveal: Variants = {
  hidden: { y: '110%' },
  show: {
    y: '0%',
    transition: { duration: 0.95, ease: EASE_OUT_EXPO },
  },
};

/** Draws a rule/underline from left to right. */
export const drawLine: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: EASE_OUT_EXPO },
  },
};

/* ------------------------------------------------------------------ */
/* Micro-interactions                                                  */
/* ------------------------------------------------------------------ */

/** Card hover: lift + settle. Deliberately small — this is enterprise, not arcade. */
export const cardHover = {
  rest: { y: 0, transition: springSoft },
  hover: { y: -6, transition: springSoft },
} satisfies Variants;

/** Icon nudge inside a hovered card. */
export const iconNudge = {
  rest: { x: 0, y: 0, rotate: 0 },
  hover: { x: 2, y: -2, transition: springSnappy },
} satisfies Variants;

/** Arrow that slides on hover (buttons, "learn more" links). */
export const arrowSlide = {
  rest: { x: 0 },
  hover: { x: 5, transition: springSnappy },
} satisfies Variants;

export const buttonTap = { scale: 0.975 };

/* ------------------------------------------------------------------ */
/* Page transitions (App Router `template.tsx`)                        */
/* ------------------------------------------------------------------ */

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: 'blur(6px)',
    transition: { duration: 0.3, ease: EASE_IN_OUT },
  },
};

/* ------------------------------------------------------------------ */
/* Viewport defaults                                                   */
/* ------------------------------------------------------------------ */

/** Fire once, slightly before the element is fully on screen. */
export const viewportOnce = { once: true, amount: 0.25, margin: '0px 0px -12% 0px' } as const;
