/**
 * Canonical origin — single source of truth for metadata, sitemap and robots.
 *
 * Note the host: the old sitemap.xml used the apex (ikstrategic.com) while the
 * live site was served from www via the GitHub Pages CNAME. Pick one and make
 * the other redirect to it, or search engines index both and split the ranking.
 * We standardise on www to match the existing live host.
 */
export const SITE_URL = 'https://www.ikstrategic.com';

/**
 * ⚠️ PLACEHOLDER BUSINESS DATA — REPLACE BEFORE LAUNCH.
 *
 * These values feed the JSON-LD in `components/seo/structured-data.tsx`, which
 * search engines ingest as factual business information (and may surface in a
 * knowledge panel). Unlike marketing copy, wrong values here are actively
 * harmful: a bad email or address is worse than none at all.
 *
 * Every field below was invented as placeholder copy. Verify each one, and
 * delete any you cannot confirm rather than shipping a guess.
 */
export const ORG = {
  name: 'IK Strategic Services LLP',
  legalName: 'IK Strategic Services LLP',
  description:
    'IK Strategic Services LLP delivers digital transformation and intelligent automation for the enterprise — AI systems, web and mobile platforms, and expert engineering talent.',
  email: 'hello@ikstrategic.com', // ⚠️ still unverified
  addressLocality: 'Pune', // confirmed
  addressRegion: 'Maharashtra', // confirmed (state containing Pune)
  addressCountry: 'IN', // confirmed
  /** Public profiles. Remove any that do not exist — do not ship dead links. */
  sameAs: [
    'https://www.linkedin.com/', // ⚠️ replace with the real company page
  ],
} as const;

/** Service lines, mirrored into JSON-LD as an offer catalogue. */
export const SERVICE_LINES = [
  {
    name: 'AI & Automation',
    description:
      'Generative AI, intelligent chatbots and end-to-end workflow automation, designed to augment teams rather than replace them.',
  },
  {
    name: 'Web Development',
    description:
      'Static and dynamic web architectures in Next.js and Angular, engineered for edge performance, accessibility and scale.',
  },
  {
    name: 'Mobile App Development',
    description:
      'High-performance cross-platform and fully native mobile applications, including offline-first and store release management.',
  },
  {
    name: 'Strategic Consulting & Resourcing',
    description:
      'IT consulting, staff augmentation and dedicated engineering pods embedded in your teams with full delivery accountability.',
  },
] as const;
