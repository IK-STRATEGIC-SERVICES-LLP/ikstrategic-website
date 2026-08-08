/**
 * Legacy GitHub Pages URLs -> their nearest home on the new single-page site.
 *
 * The first four were declared in the old sitemap.xml and are indexed, so these
 * must stay until the real pages exist. 308s preserve link equity.
 *
 * STOPGAP: anchors on the landing page are not a substitute for real pages.
 * Replace each destination as /services, /about, /contact etc. get built.
 */
const legacyRedirects = [
  ['/index.html', '/'],
  ['/modern-index.html', '/'],
  ['/services.html', '/#services'],
  ['/about.html', '/#enterprise'],
  ['/products.html', '/#services'],
  ['/contact.html', '/#contact'],
  // Never in the sitemap, but reachable and possibly linked externally.
  ['/services.premium.html', '/#services'],
  ['/about.premium.html', '/#enterprise'],
  ['/contact.premium.html', '/#contact'],
  ['/pricing.premium.html', '/#contact'],
  ['/case-studies.premium.html', '/#enterprise'],
  ['/team.premium.html', '/#careers'],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
  images: {
    // Unsplash placeholders. Swap for your own CDN/bucket before launch.
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
