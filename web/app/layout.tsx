import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';

import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const SITE_URL = 'https://www.ikstrategic.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'IK Strategic Services LLP — Digital Transformation & Intelligent Automation',
    template: '%s | IK Strategic Services LLP',
  },
  description:
    'IK Strategic Services LLP engineers digital transformation and intelligent automation for the enterprise — AI systems, web and mobile platforms, and the expert talent to run them.',
  keywords: [
    'digital transformation',
    'intelligent automation',
    'generative AI consulting',
    'Next.js development',
    'staff augmentation',
    'LLMOps',
    'RAG',
  ],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'IK Strategic Services LLP',
    title: 'Digital transformation, engineered with intelligence.',
    description:
      'AI and automation, web and mobile platforms, and senior engineering talent — delivered by an agile enterprise partner.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IK Strategic Services LLP',
    description: 'Digital transformation and intelligent automation for the enterprise.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#08122A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-screen bg-canvas">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]
                     focus:rounded-full focus:bg-navy-950 focus:px-5 focus:py-3 focus:text-sm
                     focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
