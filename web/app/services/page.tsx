import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, Bot, Check, Code2, Smartphone, Users, type LucideIcon } from 'lucide-react';

import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { ContactCta } from '@/components/site/contact-cta';
import { PageHero } from '@/components/site/page-hero';
import { ButtonLink } from '@/components/ui/button';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export const metadata: Metadata = {
  title: 'Services — AI, Web, Mobile & IT Consulting',
  description:
    'AI and automation, Next.js and Angular web platforms, cross-platform and native mobile apps, and senior engineering talent — delivered by IK Strategic Services LLP.',
  alternates: { canonical: '/services' },
  openGraph: {
    url: '/services',
    title: 'Services — AI, Web, Mobile & IT Consulting',
    description:
      'Four capabilities, one accountable partner: AI & automation, web, mobile, and strategic consulting & resourcing.',
  },
};

type Capability = {
  id: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  lede: string;
  body: string;
  deliverables: string[];
  stack: string[];
  image: string;
  imageAlt: string;
};

const CAPABILITIES: Capability[] = [
  {
    id: 'ai-automation',
    icon: Bot,
    eyebrow: 'Human-centric AI',
    title: 'AI & Automation',
    lede: 'Automate the repetitive so your people can spend their hours on judgement.',
    body: 'We build generative AI systems that sit inside your existing processes rather than beside them — copilots trained on your domain, service-desk and HR assistants that know when to escalate to a human, and workflow automation that removes the approval chains quietly costing you weeks every quarter. Every system ships with a human in the loop, an audit trail, and a defined boundary for what it is allowed to decide on its own.',
    deliverables: [
      'Generative AI copilots grounded in your documentation and systems of record',
      'HR and service-desk assistants with defined human escalation paths',
      'Document, approval and back-office workflow automation',
      'Evaluation harnesses so model quality is measured, not assumed',
      'Governance: audit logging, access boundaries, human review gates',
    ],
    stack: ['RAG', 'LLMOps', 'Prompt engineering', 'Vector search', 'Workflow orchestration'],
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'A connected global network representing AI systems integrated across an enterprise',
  },
  {
    id: 'web',
    icon: Code2,
    eyebrow: 'Platforms that hold',
    title: 'Web Development',
    lede: 'Static and dynamic architectures engineered for speed, accessibility and scale.',
    body: 'We build on Next.js and Angular because both earn their place: Next.js for edge-rendered marketing and product surfaces where time-to-first-byte decides whether the visitor stays, Angular for the long-lived internal platforms where structure and type safety matter more than novelty. Accessibility and Core Web Vitals are acceptance criteria from the first sprint, not a remediation project after launch.',
    deliverables: [
      'Next.js App Router platforms — SSR, ISR and edge rendering',
      'Angular enterprise SPAs with shared design systems',
      'Headless CMS and composable commerce integration',
      'WCAG-conformant components and keyboard-complete flows',
      'Core Web Vitals budgets enforced in CI',
    ],
    stack: ['Next.js', 'Angular', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Vercel'],
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Application source code on a developer workstation',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    eyebrow: 'Fast in the hand',
    title: 'Mobile App Development',
    lede: 'Cross-platform reach where it pays, native performance where it counts.',
    body: 'Most products do not need two native codebases, and some cannot survive without them. We make that call on the evidence — frame budgets, hardware access, offline behaviour, team shape — instead of defaulting to whichever framework is fashionable. Then we build for the conditions your users are actually in: poor connectivity, older devices, and the field rather than the demo room.',
    deliverables: [
      'React Native and Flutter cross-platform applications',
      'Native Swift and Kotlin where performance or hardware demands it',
      'Offline-first data sync and conflict resolution',
      'Crash, performance and adoption telemetry from day one',
      'App Store and Play Store release management',
    ],
    stack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Fastlane'],
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'A person using a mobile application while working',
  },
  {
    id: 'consulting',
    icon: Users,
    eyebrow: 'Embedded expertise',
    title: 'Strategic Consulting & Resourcing',
    lede: 'Senior engineers inside your teams, accountable to your outcomes.',
    body: 'Sometimes the gap is a decision — which architecture, which platform, whether to build or buy. Sometimes it is simply capacity. We do both: short, sharp consulting engagements that end in a decision you can act on, and embedded engineers who join your standups, your repo and your on-call rotation. No junior bench, no rotating faces, no layer of account management between you and the people writing the code.',
    deliverables: [
      'Technology strategy, architecture review and roadmaps',
      'Build-versus-buy and platform selection assessments',
      'Vetted senior engineers embedded in your existing squads',
      'Dedicated delivery pods with end-to-end accountability',
      'Knowledge transfer so capability stays with your team',
    ],
    stack: ['Architecture review', 'Staff augmentation', 'Delivery pods', 'Technical due diligence'],
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Two colleagues reviewing delivery plans together',
  },
];

const ENGAGEMENTS = [
  {
    name: 'Project delivery',
    body: 'A defined outcome, a fixed scope and a date. We own the delivery end to end and hand over a system your team can run.',
    best: 'Best when the problem is well understood',
  },
  {
    name: 'Dedicated pod',
    body: 'A standing cross-functional team — engineering, QA and delivery — working continuously against your roadmap.',
    best: 'Best for sustained product development',
  },
  {
    name: 'Staff augmentation',
    body: 'Senior engineers embedded directly in your existing squads, working in your tools and your process.',
    best: 'Best when you have the plan and need capacity',
  },
  {
    name: 'Advisory',
    body: 'Short, focused engagements that end in a decision — architecture reviews, platform selection, technical due diligence.',
    best: 'Best when the next decision is the blocker',
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Four capabilities. One accountable partner."
        description="Most firms sell you a function and hand back a deliverable. We take responsibility for the outcome — from the first architecture decision through to the system running in production, under load, in front of your customers."
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink
            href="/contact"
            variant="accent"
            size="lg"
            icon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
          >
            Discuss your project
          </ButtonLink>
          <ButtonLink href="/#methodology" variant="onDark" size="lg">
            How we build
          </ButtonLink>
        </div>
      </PageHero>

      <Breadcrumbs trail={[{ name: 'Services', href: '/services' }]} />

      {CAPABILITIES.map((capability, index) => (
        <CapabilitySection key={capability.id} capability={capability} index={index} />
      ))}

      {/* ---------- Engagement models ---------- */}
      <section className="bg-canvas-soft py-section">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="How we engage"
            title="Four ways to work with us"
            description="The commercial shape should follow the problem, not the other way round. If you are not sure which of these fits, that is a good first conversation."
          />

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {ENGAGEMENTS.map((model) => (
              <RevealItem key={model.name} variant="block" className="h-full">
                <div className="flex h-full flex-col rounded-3xl border border-canvas-line bg-white p-7 shadow-card transition-shadow duration-500 ease-out-expo hover:shadow-card-hover">
                  <h3 className="font-display text-lg font-semibold text-navy-950">{model.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600 text-pretty">
                    {model.body}
                  </p>
                  <p className="mt-auto flex items-start gap-2 border-t border-canvas-line pt-5 text-xs font-medium text-navy-700">
                    <span
                      aria-hidden
                      className="mt-[0.3rem] h-1.5 w-1.5 shrink-0 rounded-full bg-electric-500"
                    />
                    {model.best}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <ContactCta />
    </>
  );
}

function CapabilitySection({ capability, index }: { capability: Capability; index: number }) {
  const { icon: Icon } = capability;
  const flipped = index % 2 === 1;

  return (
    <section
      id={capability.id}
      className={index % 2 === 0 ? 'bg-canvas py-section' : 'bg-canvas-soft py-section'}
    >
      <div className="container">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Media */}
          <Reveal
            variant="block"
            className={`relative lg:col-span-5 ${flipped ? 'lg:order-2' : ''}`}
          >
            <div className="relative overflow-hidden rounded-4xl shadow-card-hover">
              <Image
                src={capability.image}
                alt={capability.imageAlt}
                width={1400}
                height={1100}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="h-[24rem] w-full object-cover lg:h-[30rem]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent"
              />
            </div>
          </Reveal>

          {/* Copy */}
          <div className={`lg:col-span-7 ${flipped ? 'lg:order-1' : ''}`}>
            <RevealGroup stagger={0.07}>
              <RevealItem>
                <span className="eyebrow text-electric-600">
                  <span aria-hidden className="h-px w-6 bg-electric-500/70" />
                  {capability.eyebrow}
                </span>
              </RevealItem>

              <RevealItem>
                <div className="mt-6 flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-sweep">
                    <Icon className="h-6 w-6 text-navy-950" strokeWidth={1.9} />
                  </span>
                  <h2 className="font-display text-display-md text-navy-950">{capability.title}</h2>
                </div>
              </RevealItem>

              <RevealItem>
                <p className="mt-6 font-display text-display-sm text-navy-800 text-balance">
                  {capability.lede}
                </p>
              </RevealItem>

              <RevealItem>
                <p className="mt-4 text-body-lg text-navy-600 text-pretty">{capability.body}</p>
              </RevealItem>

              <RevealItem>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {capability.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-navy-700">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-electric-600"
                        strokeWidth={2.4}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </RevealItem>

              <RevealItem>
                <ul className="mt-8 flex flex-wrap gap-2 border-t border-canvas-line pt-7">
                  {capability.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-canvas-line bg-white px-3.5 py-1.5 text-xs font-medium text-navy-700"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
