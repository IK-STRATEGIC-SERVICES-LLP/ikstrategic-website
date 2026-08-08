/**
 * Legacy GitHub Pages URLs -> their equivalent on the new site.
 *
 * The first four were declared in the old sitemap.xml and are indexed, so these
 * must stay. 308s preserve link equity.
 *
 * These now resolve to real pages rather than homepage anchors, so Google keeps
 * four distinct indexable destinations instead of collapsing them all into "/".
 */
const legacyRedirects = [
  ['/index.html', '/'],
  ['/modern-index.html', '/'],
  ['/services.html', '/services'],
  ['/about.html', '/about'],
  ['/products.html', '/services'],
  ['/contact.html', '/contact'],
  // Never in the sitemap, but reachable and possibly linked externally.
  ['/services.premium.html', '/services'],
  ['/about.premium.html', '/about'],
  ['/contact.premium.html', '/contact'],
  ['/pricing.premium.html', '/services'],
  ['/case-studies.premium.html', '/about'],
  ['/team.premium.html', '/about'],
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
