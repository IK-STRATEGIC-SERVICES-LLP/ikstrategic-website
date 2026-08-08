import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/site';

/**
 * Replaces the old static /robots.txt, which lived at the repo root and is no
 * longer served now that Vercel's root directory is `web/`.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // Commercial SEO crawlers — heavy, and of no benefit to us.
      { userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot'], disallow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
