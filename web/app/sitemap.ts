import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/site';

/**
 * Replaces the old static /sitemap.xml.
 *
 * Only the landing page exists today. The old sitemap also listed
 * /services.html, /about.html, /products.html and /contact.html — those are
 * 308-redirected in next.config.mjs and are deliberately NOT listed here,
 * because a sitemap should only ever contain canonical 200s. Add real entries
 * as those pages get built.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
