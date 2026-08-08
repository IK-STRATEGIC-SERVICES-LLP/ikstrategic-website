import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/site';

/**
 * Replaces the old static /sitemap.xml.
 *
 * Only canonical 200s belong here — the legacy .html paths are 308-redirected
 * in next.config.mjs and are deliberately absent.
 */
const ROUTES = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
