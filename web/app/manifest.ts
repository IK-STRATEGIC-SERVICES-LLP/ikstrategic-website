import type { MetadataRoute } from 'next';

import { ORG } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: ORG.name,
    short_name: 'IK Strategic',
    description: ORG.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#08122A',
    theme_color: '#08122A',
    icons: [
      {
        src: '/brand/ik-tile.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
