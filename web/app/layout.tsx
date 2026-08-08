import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';

import { StructuredData } from '@/components/seo/structured-data';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { ORG, SITE_URL } from '@/lib/site';

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
  applicationName: ORG.name,
  authors: [{ name: ORG.name, url: SITE_URL }],
  creator: ORG.name,
  publisher: ORG.name,
  // Stop iOS/Android auto-linking stray numbers and addresses in body copy.
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: ORG.name,
    locale: 'en_US',
    title: 'Digital transformation, engineered with intelligence.',
    description:
      'AI and automation, web and mobile platforms, and senior engineering talent — delivered by an agile enterprise partner.',
    // og:image comes from app/opengraph-image.tsx via the file convention.
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IK Strategic Services LLP',
    description: 'Digital transformation and intelligent automation for the enterprise.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#08122A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <StructuredData />
      </head>
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
