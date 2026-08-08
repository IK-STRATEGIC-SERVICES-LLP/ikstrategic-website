import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, Building2, Compass, Gauge, Handshake, Layers, TrendingUp } from 'lucide-react';

import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { ContactCta } from '@/components/site/contact-cta';
import { PageHero } from '@/components/site/page-hero';
import { ButtonLink } from '@/components/ui/button';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export const metadata: Metadata = {
  title: 'About — Enterprise scale, agile at the core',
  description:
    'IK Strategic Services LLP is an AI-native engineering partner based in Pune, India, serving clients globally — and scaling from LLP toward private limited incorporation.',
  alternates: { canonical: '/about' },
  openGraph: {
    url: '/about',
    title: 'About IK Strategic Services LLP',
    description:
      'An AI-native engineering partner combining the rigour of a large integrator with the speed of a focused senior team.',
  },
};

const PRINCIPLES = [
  {
    icon: Layers,
    title: 'Build for the load you will have',
    body: 'Architecture decisions are made for where the business is heading, not only where it is today. Systems that absorb an order of magnitude more traffic without a rewrite.',
  },
  {
    icon: Gauge,
    title: 'Seniority over headcount',
    body: 'No junior bench, no rotating faces, no layer of account management between you and the engineers building your platform. Small teams of experienced people move faster than large ones.',
  },
  {
    icon: Compass,
    title: 'Opinions, held loosely',
    body: 'We will tell you when we think an approach is wrong, and why. We will also change our position when the evidence says so. Agreement is not the same as usefulness.',
  },
  {
    icon: Handshake,
    title: 'Capability stays with you',
    body: 'Engagements end with your team able to run and extend what we built. Knowledge transfer is part of delivery, not an upsell — dependency is a failure mode, not a business model.',
  },
];

const NUMBERS = [
  { value: '40%', label: 'Faster delivery cycles using AI-driven engineering' },
  { value: '24/7', label: 'Automated adversarial testing on every build' },
  { value: '100%', label: 'Senior engineers on client-facing delivery' },
  { value: 'Global', label: 'Clients served from our Pune engineering base' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Enterprise scale. Agile at the core."
        description="IK Strategic Services LLP exists to give enterprises something they rarely get at once: the rigour and accountability of a large integrator, delivered at the speed of a focused, senior team."
      >
        <ButtonLink
          href="/contact"
          variant="accent"
          size="lg"
          icon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
        >
          Work with us
        </ButtonLink>
      </PageHero>

      <Breadcrumbs trail={[{ name: 'About', href: '/about' }]} />

      {/* ---------- Story ---------- */}
      <section className="bg-canvas py-section">
        <div className="container">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal variant="block" className="relative lg:col-span-5">
              <div className="relative overflow-hidden rounded-4xl shadow-card-hover">
                <Image
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
                  alt="The IK Strategic engineering floor during a planning session"
                  width={1200}
                  height={1000}
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="h-[26rem] w-full object-cover lg:h-[32rem]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent"
                />
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Why we exist"
                title="The gap we were built to close"
                description="Large integrators bring process, governance and a name your board recognises — and a delivery pace measured in quarters. Small studios move quickly, then stall the moment the work needs security review, compliance evidence or a migration plan. Enterprises have been asked to pick one for years."
              />
              <RevealGroup className="mt-8 space-y-5" stagger={0.08}>
                <RevealItem>
                  <p className="text-body-lg text-navy-600 text-pretty">
                    We built IK Strategic to refuse that trade. Senior engineers only, working in
                    small accountable teams, with AI embedded in the toolchain rather than bolted on
                    as a talking point — so the work that used to consume sprints takes days, and the
                    time saved goes into the parts that genuinely need human judgement.
                  </p>
                </RevealItem>
                <RevealItem>
                  <p className="text-body-lg text-navy-600 text-pretty">
                    The result is a partner that can sit in front of your risk committee and still
                    ship in the same fortnight. That is the whole proposition, and every structural
                    decision we make is tested against it.
                  </p>
                </RevealItem>
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Numbers ---------- */}
      <section className="bg-navy-950 on-dark relative isolate overflow-hidden py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-dark bg-grid mask-fade-y" />
          <div className="absolute left-1/3 top-0 h-[22rem] w-[34rem] rounded-full bg-electric-500/15 blur-[130px] animate-aurora-slow" />
        </div>
        <div className="container">
          <RevealGroup
            className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.07}
          >
            {NUMBERS.map((stat) => (
              <RevealItem key={stat.label} className="bg-navy-950/85 p-7 backdrop-blur-sm">
                <p className="font-display text-3xl font-semibold text-electric-300">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-snug text-navy-300">{stat.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------- Principles ---------- */}
      <section id="principles" className="bg-canvas py-section">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="How we work"
            title="Four principles we actually enforce"
            description="Values are only real when they cost something. These are the four we are willing to lose work over."
          />

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2" stagger={0.08}>
            {PRINCIPLES.map((principle) => (
              <RevealItem key={principle.title} variant="block" className="h-full">
                <div className="group h-full rounded-3xl border border-canvas-line bg-white p-8 shadow-card transition-shadow duration-500 ease-out-expo hover:shadow-card-hover">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-canvas-muted text-navy-800 transition-colors duration-500 group-hover:bg-electric-50 group-hover:text-electric-700">
                    <principle.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-6 font-display text-display-sm text-navy-950">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-body-lg text-navy-600 text-pretty">{principle.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------- Structure / LLP -> Pvt Ltd ---------- */}
      <section className="bg-canvas-soft py-section">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Our structure"
                title="An LLP built to outgrow itself"
                description="Operating as a limited liability partnership keeps us lean and lets us decide fast — no committee between a problem and the person who can fix it. That structure is a deliberate advantage while we are this size."
              />
              <RevealGroup className="mt-8 space-y-5" stagger={0.08}>
                <RevealItem>
                  <p className="text-body-lg text-navy-600 text-pretty">
                    It is also a stage, not a destination. As enterprise commitments deepen, we are
                    scaling toward private limited incorporation — expanding governance, delivery
                    capacity and the long-horizon contractual footing that larger clients
                    reasonably require.
                  </p>
                </RevealItem>
                <RevealItem>
                  <p className="text-body-lg text-navy-600 text-pretty">
                    We are telling you this before you ask because it affects how you plan around us.
                    Nothing about that transition changes who does your work or how quickly it moves.
                  </p>
                </RevealItem>
              </RevealGroup>
            </div>

            <Reveal variant="block" className="lg:col-span-5">
              <div className="rounded-4xl border border-canvas-line bg-white p-9 shadow-card">
                <Building2 className="h-6 w-6 text-electric-600" strokeWidth={1.75} />
                <p className="mt-5 font-display text-display-md text-navy-950">LLP → Pvt Ltd</p>
                <p className="mt-3 text-body-lg text-navy-600 text-pretty">
                  Expanding our structure to match the scale of the engagements we now run.
                </p>
                <dl className="mt-8 space-y-5 border-t border-canvas-line pt-7">
                  <div>
                    <dt className="text-eyebrow uppercase text-navy-400">Registered</dt>
                    <dd className="mt-1.5 text-sm text-navy-800">
                      IK Strategic Services LLP — Pune, Maharashtra, India
                    </dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow uppercase text-navy-400">Delivery reach</dt>
                    <dd className="mt-1.5 text-sm text-navy-800">
                      Serving clients globally, across regulated and high-growth sectors
                    </dd>
                  </div>
                </dl>
                <div className="mt-8">
                  <ButtonLink
                    href="/contact"
                    size="lg"
                    fullWidth
                    icon={<TrendingUp className="h-4 w-4" strokeWidth={2} />}
                  >
                    Talk to us
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
