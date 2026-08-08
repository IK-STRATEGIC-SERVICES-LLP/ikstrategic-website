/**
 * Canonical origin — single source of truth for metadata, sitemap and robots.
 *
 * Note the host: the old sitemap.xml used the apex (ikstrategic.com) while the
 * live site was served from www via the GitHub Pages CNAME. Pick one and make
 * the other redirect to it, or search engines index both and split the ranking.
 * We standardise on www to match the existing live host.
 */
export const SITE_URL = 'https://www.ikstrategic.com';
