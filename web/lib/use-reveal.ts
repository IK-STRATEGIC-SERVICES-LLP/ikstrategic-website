'use client';

import { useEffect, useRef, useState } from 'react';

type RevealOptions = {
  /** Fraction of the element that must be visible before it counts as in view. */
  amount?: number;
  /** IntersectionObserver `rootMargin`. */
  margin?: string;
};

/**
 * In-view detection for scroll reveals. Fires once, then stops observing.
 *
 * Why not framer-motion's `whileInView`: its IntersectionObserver does not
 * reliably deliver the *initial* callback for elements that are already on
 * screen at first paint (App Router hydration races, bfcache restores, a
 * layout that is still settling as fonts and images load). The symptom is a
 * section stuck at `opacity: 0` on load that only appears once you scroll —
 * the exact bug this replaces.
 *
 * The observer still handles the normal scroll-into-view case. The extra
 * `check()` calls — across a few frames, a couple of timeouts, and window
 * `load` — are the backstop for the missed initial callback: each one asks
 * "is this box in the viewport now?" and reveals it if so.
 */
export function useReveal<T extends HTMLElement = HTMLElement>({
  amount = 0.2,
  margin = '0px 0px -10% 0px',
}: RevealOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    let done = false;
    const timers: number[] = [];

    const reveal = () => {
      if (done) return;
      done = true;
      setInView(true);
    };

    // Is the element within the viewport right now? Deliberately lenient:
    // any overlap counts. Used only as the initial-load backstop; the
    // observer owns the precise scroll-in threshold.
    const onscreenNow = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.bottom > 0 && r.top < vh;
    };
    const check = () => {
      if (!done && onscreenNow()) reveal();
    };

    if (typeof IntersectionObserver === 'undefined') {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) reveal();
      },
      { threshold: amount, rootMargin: margin },
    );
    io.observe(el);

    // Re-check as layout settles. Two rAFs clear the first paint; the
    // timeouts cover late reflows from fonts and above-the-fold images.
    requestAnimationFrame(() => requestAnimationFrame(check));
    timers.push(window.setTimeout(check, 120));
    timers.push(window.setTimeout(check, 400));
    timers.push(window.setTimeout(check, 1000));

    const onLoad = () => check();
    if (document.readyState !== 'complete') {
      window.addEventListener('load', onLoad, { once: true });
    }

    return () => {
      io.disconnect();
      timers.forEach(window.clearTimeout);
      window.removeEventListener('load', onLoad);
    };
  }, [inView, amount, margin]);

  return { ref, inView };
}
