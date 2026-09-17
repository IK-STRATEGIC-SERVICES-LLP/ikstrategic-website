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
  /**
   * Three names, three jobs — do not collapse them:
   *
   *   `name` / `legalName`  the registered entity. Everything a search engine
   *                         or social card reads — titles, JSON-LD, OG — uses
   *                         this, so the firm indexes under its full name.
   *   `shortName`           how page copy refers to the firm in prose.
   *   footer lockup         states the registered entity in full.
   */
  name: 'IK Strategic Services LLP',
  legalName: 'IK Strategic Services LLP',
  /** Used in body copy, where the full legal suffix reads as boilerplate. */
  shortName: 'IK Strategic Services',
  description:
    'IK Strategic Services LLP delivers digital transformation and intelligent automation for the enterprise — AI systems, web and mobile platforms, and expert engineering talent.',
  email: 'contactikstrategic@gmail.com', // confirmed
  streetAddress: 'Flat No. 201, Leena Manik Apartment, near Shantai Hotel, Rasta Peth', // confirmed
  addressLocality: 'Pune', // confirmed
  addressRegion: 'Maharashtra', // confirmed (state containing Pune)
  postalCode: '411011', // confirmed
  addressCountry: 'IN', // confirmed
  /**
   * Public profiles, emitted as schema.org `sameAs`.
   *
   * Deliberately empty. `https://www.linkedin.com/` was sitting here as a
   * placeholder: as a sameAs claim it tells Google the company's official
   * profile is LinkedIn's own homepage, which is false and is the kind of
   * assertion that gets an entity's structured data distrusted. Add the real
   * company page URL when it exists — omitting the property is safe, wrong
   * values are not.
   */
  sameAs: [] as string[],
} as const;

/**
 * Google Search Console HTML-tag verification.
 *
 * Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in Vercel to the `content` value of
 * the meta tag Search Console offers (the token only, not the whole tag), and
 * Next emits <meta name="google-site-verification">. Left unset, no tag is
 * emitted — an empty one does not verify and looks broken to auditors.
 *
 * Prefer the DNS TXT method where you can: it verifies a *domain* property,
 * which covers www, the apex, http and https in one go, and it survives a
 * hosting change. This tag only ever verifies the exact URL prefix it sits on.
 */
export const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? '';

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
  {
    name: 'MEP Engineering',
    description:
      'AI-powered mechanical, electrical and plumbing engineering with BIM-style coordination and automated clash detection, resolving conflicts before work begins on-site.',
  },
] as const;
