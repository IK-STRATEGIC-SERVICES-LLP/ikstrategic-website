'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { ButtonLink } from '@/components/ui/button';
import { LogoMark } from '@/components/ui/logo';
import { EASE_OUT_EXPO, springSoft } from '@/lib/motion';
import { cn } from '@/lib/utils';

const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'How We Build', href: '#methodology' },
  { label: 'Why IK', href: '#enterprise' },
  { label: 'Careers', href: '#careers' },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  // Transparent over the dark hero, solid once the user starts reading.
  const onDark = !scrolled && !open;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-out-expo',
        onDark
          ? 'on-dark bg-transparent'
          : 'border-b border-canvas-line bg-white/85 backdrop-blur-xl',
      )}
    >
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3" aria-label="IK Strategic Services home">
          <LogoMark
            tone={onDark ? 'dark' : 'light'}
            className="h-9 w-9 shrink-0 transition-transform duration-500 ease-out-expo group-hover:scale-[1.06]"
          />
          <span className="hidden leading-[1.08] sm:block">
            <span
              className={cn(
                'block font-display text-[0.9375rem] font-semibold tracking-tight transition-colors duration-500',
                onDark ? 'text-white' : 'text-navy-950',
              )}
            >
              IK Strategic
            </span>
            <span
              className={cn(
                'block text-[0.6875rem] uppercase tracking-[0.2em] transition-colors duration-500',
                onDark ? 'text-navy-300' : 'text-navy-500',
              )}
            >
              Services LLP
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                onDark
                  ? 'text-navy-200 hover:text-white'
                  : 'text-navy-600 hover:text-navy-950',
              )}
            >
              <span className="relative">
                {item.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-electric-400
                             transition-transform duration-300 ease-out-expo group-hover:scale-x-100"
                />
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ButtonLink
              href="#contact"
              variant={onDark ? 'onDark' : 'primary'}
              icon={<ArrowUpRight className="h-4 w-4" strokeWidth={2} />}
            >
              Book a consultation
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={cn(
              'grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300 lg:hidden',
              onDark
                ? 'border-white/20 text-white hover:border-electric-400/60'
                : 'border-canvas-line text-navy-900 hover:border-navy-300',
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springSoft}
            className="overflow-hidden border-t border-canvas-line bg-white lg:hidden"
          >
            <div className="container flex flex-col gap-1 py-6">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, ease: EASE_OUT_EXPO }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display
                               text-lg font-medium text-navy-900 transition-colors hover:bg-canvas-soft"
                  >
                    {item.label}
                    <ArrowUpRight className="h-4 w-4 text-navy-400" />
                  </Link>
                </motion.div>
              ))}
              <div className="mt-3 px-1">
                <ButtonLink
                  href="#contact"
                  size="lg"
                  fullWidth
                  icon={<ArrowUpRight className="h-4 w-4" />}
                >
                  Book a consultation
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
