import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/site';

/**
 * Replaces the old static /sitemap.xml.
 *
 * Only canonical 200s belong here — the legacy .html paths are 308-redirected
 * in next.config.mjs and are deliberately absent.
 */
/**
 * `lastModified` per route, as an ISO date.
 *
 * These are hand-maintained on purpose. The previous `new Date()` stamped
 * every URL with the build time, so a deploy that changed one CSS file told
 * Google all four pages had changed. Google notices that the claim never
 * matches the content and stops trusting lastmod for the site — losing the one
 * signal that gets a genuinely updated page recrawled quickly.
 *
 * Bump the date for a page when its *content* changes. Ignore it otherwise.
 */
const ROUTES = [
  { path: '/', priority: 1, changeFrequency: 'weekly', lastModified: '2026-08-11' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-08-11' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-08-11' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-08-11' },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
