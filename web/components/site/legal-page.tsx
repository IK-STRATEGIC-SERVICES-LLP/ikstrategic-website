import type { ReactNode } from 'react';

import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { PageHero } from '@/components/site/page-hero';

/**
 * Shared shell for the legal documents (Privacy, Terms, Cookies, Security).
 *
 * Keeps them visually identical to the rest of the site — same navy PageHero,
 * same breadcrumb rail — and holds the long-form prose styles in one place so
 * the four pages only carry their own copy.
 */

const PROSE = [
  'mx-auto max-w-3xl',
  '[&_h2]:mt-14 [&_h2]:font-display [&_h2]:text-display-sm [&_h2]:font-semibold [&_h2]:text-navy-950',
  '[&_h2:first-child]:mt-0',
  '[&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-navy-900',
  '[&_p]:mt-4 [&_p]:text-body-lg [&_p]:text-navy-600 [&_p]:text-pretty',
  '[&_ul]:mt-4 [&_ul]:space-y-2.5 [&_ul]:pl-5',
  '[&_li]:list-disc [&_li]:text-[1.0625rem] [&_li]:leading-relaxed [&_li]:text-navy-600 [&_li]:marker:text-electric-500',
  '[&_a]:font-medium [&_a]:text-electric-700 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-electric-800',
  '[&_strong]:font-semibold [&_strong]:text-navy-900',
].join(' ');

export function LegalPage({
  title,
  description,
  updated,
  breadcrumb,
  path,
  children,
}: {
  title: string;
  description: string;
  /** Human-readable effective date, e.g. "September 2026". */
  updated: string;
  breadcrumb: string;
  /** The page's own route, e.g. "/privacy" — used for the breadcrumb trail. */
  path: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} description={description} />

      <Breadcrumbs trail={[{ name: breadcrumb, href: path }]} />

      <section className="bg-canvas py-section">
        <div className="container">
          <div className={PROSE}>
            <p className="!mt-0 text-sm font-medium uppercase tracking-[0.14em] text-navy-400">
              Last updated {updated}
            </p>
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
