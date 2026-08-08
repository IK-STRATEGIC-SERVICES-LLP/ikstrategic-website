'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Linkedin, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

import { LogoMark } from '@/components/ui/logo';
import { RevealGroup, RevealItem } from '@/components/ui/reveal';

const COLUMNS = [
  {
    heading: 'Services',
    links: [
      { label: 'AI & Automation', href: '#services' },
      { label: 'Web Development', href: '#services' },
      { label: 'Mobile App Development', href: '#services' },
      { label: 'Consulting & Resourcing', href: '#services' },
      { label: 'How We Build', href: '#methodology' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About IK Strategic', href: '#enterprise' },
      { label: 'Our Methodology', href: '#methodology' },
      { label: 'Case Studies', href: '#enterprise' },
      { label: 'Insights', href: '#enterprise' },
    ],
  },
  {
    heading: 'Careers',
    links: [
      { label: 'Open Roles', href: '#careers' },
      { label: 'Life at IK', href: '#careers' },
      { label: 'Engineering Culture', href: '#careers' },
      { label: 'Graduate Programme', href: '#careers' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'Book a Consultation', href: '#contact' },
      { label: 'hello@ikstrategic.com', href: 'mailto:hello@ikstrategic.com' },
      { label: 'Partner Enquiries', href: '#contact' },
      { label: 'Support', href: '#contact' },
    ],
  },
];

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Preferences', href: '/cookies' },
  { label: 'Security', href: '/security' },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative isolate overflow-hidden bg-navy-950 pt-section">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-dark bg-grid mask-fade-y opacity-60" />
        <div className="absolute -bottom-40 left-1/4 h-[26rem] w-[26rem] rounded-full bg-electric-600/12 blur-[130px]" />
      </div>

      <div className="container">
        <RevealGroup className="grid gap-12 lg:grid-cols-12" stagger={0.07}>
          {/* Brand block */}
          <RevealItem className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3" aria-label="IK Strategic Services home">
              <LogoMark tone="dark" className="h-11 w-11 shrink-0" />
              <span className="leading-[1.08]">
                <span className="block font-display text-base font-semibold text-white">
                  IK Strategic
                </span>
                <span className="block text-[0.6875rem] uppercase tracking-[0.2em] text-navy-400">
                  Services LLP
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-navy-300 text-pretty">
              Digital transformation and intelligent automation for the enterprise. We design, build,
              and run the systems that carry your business into its next decade.
            </p>

            <ul className="mt-7 space-y-3 text-sm text-navy-300">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-electric-400" strokeWidth={1.75} />
                <a
                  href="mailto:hello@ikstrategic.com"
                  className="transition-colors duration-300 hover:text-white"
                >
                  hello@ikstrategic.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-electric-400" strokeWidth={1.75} />
                Mumbai, India — serving clients globally
              </li>
            </ul>

            <div className="mt-7 flex items-center gap-3">
              <motion.a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IK Strategic on LinkedIn"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15
                           text-navy-200 transition-colors duration-300
                           hover:border-electric-400/60 hover:text-white"
              >
                <Linkedin className="h-4 w-4" strokeWidth={1.75} />
              </motion.a>
            </div>
          </RevealItem>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {COLUMNS.map((column) => (
              <RevealItem key={column.heading}>
                <h2 className="text-eyebrow uppercase text-navy-400">{column.heading}</h2>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-sm text-navy-200
                                   transition-colors duration-300 hover:text-white"
                      >
                        {link.label}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all
                                     duration-300 ease-out-expo group-hover:translate-x-0
                                     group-hover:opacity-100"
                          strokeWidth={2}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </div>
        </RevealGroup>

        {/* Legal bar */}
        <div className="mt-16 flex flex-col gap-5 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-navy-400">
            © {year} IK Strategic Services LLP. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {LEGAL.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-xs text-navy-400 transition-colors duration-300 hover:text-electric-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
