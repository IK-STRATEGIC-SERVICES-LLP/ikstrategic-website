'use client';

import { motion } from 'framer-motion';

import { pageTransition } from '@/lib/motion';

/**
 * App Router `template.tsx` remounts on every navigation, which is exactly what
 * a page transition needs. Keep it cheap: a short blur-and-lift, nothing that
 * delays the user's read of the new page.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageTransition} initial="hidden" animate="show">
      {children}
    </motion.div>
  );
}
