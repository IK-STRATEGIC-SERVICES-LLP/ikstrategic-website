import Link from 'next/link';

import { SITE_URL } from '@/lib/site';

type Crumb = { name: string; href: string };

/**
 * Visible breadcrumb trail plus matching BreadcrumbList JSON-LD.
 *
 * Google uses this to replace the raw URL in the search result with a readable
 * hierarchy, so the visible markup and the structured data must agree — hence
 * both being generated from one array.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const items = [{ name: 'Home', href: '/' }, ...trail];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.href === '/' ? '/' : crumb.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="border-b border-canvas-line bg-canvas-soft">
        <ol className="container flex flex-wrap items-center gap-x-2 gap-y-1 py-4 text-xs text-navy-500">
          {items.map((crumb, i) => {
            const last = i === items.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="font-medium text-navy-800">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.href}
                      className="transition-colors duration-300 hover:text-electric-700"
                    >
                      {crumb.name}
                    </Link>
                    <span aria-hidden className="text-navy-300">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
