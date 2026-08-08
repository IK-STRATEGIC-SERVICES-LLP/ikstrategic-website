import { ORG, SERVICE_LINES, SITE_URL } from '@/lib/site';

/**
 * JSON-LD for the organisation, the website, and the service catalogue.
 *
 * Rendered as a plain <script> from a server component, so it lands in the
 * initial HTML where crawlers read it — no client JS involved.
 *
 * The values come from ORG in lib/site.ts, which is still placeholder data.
 * See the warning there before shipping.
 */
export function StructuredData() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#organization`,
        name: ORG.name,
        legalName: ORG.legalName,
        url: SITE_URL,
        description: ORG.description,
        email: ORG.email,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/brand/ik-mark.svg`,
          caption: ORG.name,
        },
        image: `${SITE_URL}/opengraph-image`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: ORG.addressLocality,
          addressCountry: ORG.addressCountry,
        },
        sameAs: ORG.sameAs,
        knowsAbout: [
          'Digital transformation',
          'Intelligent automation',
          'Generative AI',
          'Retrieval-Augmented Generation',
          'LLMOps',
          'Staff augmentation',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'IT and AI services',
          itemListElement: SERVICE_LINES.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.name,
              description: service.description,
              provider: { '@id': `${SITE_URL}/#organization` },
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: ORG.name,
        description: ORG.description,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Content is a compile-time constant, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
