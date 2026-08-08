'use client';

import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Bot,
  Code2,
  Smartphone,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';
import Image from 'next/image';

import { RevealGroup, RevealItem } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { cardHover, iconNudge, springSoft } from '@/lib/motion';
import { cn } from '@/lib/utils';

type Service = {
  icon: LucideIcon;
  title: string;
  summary: string;
  bullets: string[];
  featured?: boolean;
  image?: string;
};

const SERVICES: Service[] = [
  {
    icon: Bot,
    title: 'AI & Automation',
    summary:
      'Generative AI, intelligent HR chatbots, and end-to-end workflow automation — built to augment your people, never to replace them. We automate the repetitive so your teams can spend their hours on judgement, relationships, and growth.',
    bullets: [
      'Generative AI copilots trained on your domain',
      'HR & service-desk chatbots with human escalation paths',
      'Document, approval, and back-office workflow automation',
      'Governed, auditable, human-in-the-loop by design',
    ],
    featured: true,
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
  },
  {
    icon: Code2,
    title: 'Web Development',
    summary:
      'Static and dynamic web architectures in Next.js and Angular — engineered for speed at the edge, accessibility by default, and scale that holds under real traffic.',
    bullets: [
      'Next.js App Router, SSR, ISR & edge rendering',
      'Angular enterprise SPAs and design systems',
      'Headless CMS and composable commerce',
    ],
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    summary:
      'High-performance cross-platform and fully native applications that feel fast in the hand and hold up in the field — offline, at scale, on real devices.',
    bullets: [
      'React Native & Flutter cross-platform builds',
      'Native Swift and Kotlin where performance demands it',
      'Offline-first sync, deep telemetry, store release management',
    ],
  },
  {
    icon: Users,
    title: 'Strategic Consulting & Resourcing',
    summary:
      'IT consulting, staff augmentation, and expert engineering talent — embedded in your teams, aligned to your roadmap, accountable to your outcomes.',
    bullets: [
      'Technology strategy, architecture reviews & roadmaps',
      'Vetted senior engineers embedded in your squads',
      'Dedicated pods with full delivery accountability',
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-canvas py-section">
      <div className="container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Four capabilities.
                <br className="hidden sm:block" /> One accountable partner.
              </>
            }
            description="Most firms sell you a function. We take responsibility for the outcome — from the first architecture decision through to the system running in production."
            className="lg:max-w-2xl"
          />
        </div>

        {/* Bento grid: the AI cell spans wide, the rest fill in around it. */}
        <RevealGroup
          className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6"
          stagger={0.1}
        >
          {SERVICES.map((service) => (
            <RevealItem
              key={service.title}
              variant="block"
              className={cn(
                // The AI cell owns a full row; the other three split it three ways.
                service.featured ? 'md:col-span-2 lg:col-span-6' : 'md:col-span-1 lg:col-span-2',
              )}
            >
              <ServiceCard service={service} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const { icon: Icon, featured } = service;

  return (
    <motion.article
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      tabIndex={0}
      className={cn(
        'group h-full cursor-default rounded-3xl border transition-shadow duration-500 ease-out-expo',
        featured
          ? 'on-dark overflow-hidden border-navy-800 bg-navy-950 shadow-card-hover'
          : 'border-canvas-line bg-white shadow-card hover:shadow-card-hover',
      )}
    >
      {featured ? (
        <div className="grid gap-0 lg:grid-cols-12">
          <div className="relative z-10 p-8 sm:p-10 lg:col-span-7 lg:p-12">
            <span className="eyebrow text-electric-300">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              Human-centric AI
            </span>

            <div className="mt-6 flex items-center gap-4">
              <motion.span
                variants={iconNudge}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-sweep"
              >
                <Icon className="h-6 w-6 text-navy-950" strokeWidth={1.9} />
              </motion.span>
              <h3 className="font-display text-display-md text-white">{service.title}</h3>
            </div>

            <p className="mt-5 max-w-xl text-body-lg text-navy-200 text-pretty">
              {service.summary}
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5 text-sm text-navy-200">
                  <span
                    aria-hidden
                    className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-electric-400"
                  />
                  {bullet}
                </li>
              ))}
            </ul>

            <CardLink tone="dark" label="Explore AI & Automation" />
          </div>

          <div className="relative min-h-[16rem] lg:col-span-5">
            {service.image && (
              <Image
                src={service.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover opacity-70 transition-transform duration-700 ease-out-expo group-hover:scale-105"
              />
            )}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/70 to-navy-950/30 lg:via-navy-950/50"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-grid-dark bg-grid-sm opacity-50 mask-fade-y"
            />
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col p-8">
          <motion.span
            variants={iconNudge}
            className="grid h-12 w-12 place-items-center rounded-2xl border border-canvas-line
                       bg-canvas-soft text-navy-800 transition-colors duration-500
                       group-hover:border-electric-300 group-hover:bg-electric-50 group-hover:text-electric-700"
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </motion.span>

          <h3 className="mt-6 font-display text-display-sm text-navy-950">{service.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-navy-600 text-pretty">
            {service.summary}
          </p>

          <ul className="mt-6 space-y-2.5 border-t border-canvas-line pt-6">
            {service.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5 text-sm text-navy-700">
                <span
                  aria-hidden
                  className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-electric-500"
                />
                {bullet}
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <CardLink tone="light" label={`Explore ${service.title}`} />
          </div>
        </div>
      )}
    </motion.article>
  );
}

function CardLink({ tone, label }: { tone: 'light' | 'dark'; label: string }) {
  return (
    <motion.span
      transition={springSoft}
      className={cn(
        'mt-8 inline-flex items-center gap-2 text-sm font-medium',
        tone === 'dark' ? 'text-electric-300' : 'text-navy-900 group-hover:text-electric-700',
      )}
    >
      {label}
      <motion.span
        variants={{ rest: { x: 0, y: 0 }, hover: { x: 3, y: -3 } }}
        className="flex"
      >
        <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
      </motion.span>
    </motion.span>
  );
}
