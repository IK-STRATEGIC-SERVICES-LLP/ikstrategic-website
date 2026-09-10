import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

import { ButtonLink } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

const ELSEWHERE = [
  { label: 'Services', href: '/services' },
  { label: 'How we build', href: '/#methodology' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function NotFound() {
  return (
    <section className="on-dark relative isolate flex min-h-[72vh] items-center overflow-hidden bg-navy-950 py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-dark bg-grid mask-fade-radial" />
        <div className="absolute -left-24 -top-32 h-[26rem] w-[26rem] rounded-full bg-electric-500/20 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 h-[24rem] w-[24rem] rounded-full bg-violetine-600/20 blur-[130px]" />
      </div>

      <div className="container">
        <span className="eyebrow text-electric-300">
          <span aria-hidden className="h-px w-6 bg-electric-400/70" />
          Error 404
        </span>

        <h1 className="mt-6 max-w-2xl font-display text-display-lg text-white text-balance">
          That page has moved on, or never existed.
        </h1>
        <p className="mt-5 max-w-xl text-body-lg text-navy-200 text-pretty">
          The link may be out of date. Pick back up from one of these.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <ButtonLink
            href="/"
            variant="accent"
            size="lg"
            icon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
          >
            Back to home
          </ButtonLink>
          <ButtonLink href="/services" variant="onDark" size="lg">
            Explore services
          </ButtonLink>
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-8">
          {ELSEWHERE.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-display text-sm font-medium text-navy-300 transition-colors duration-300 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
