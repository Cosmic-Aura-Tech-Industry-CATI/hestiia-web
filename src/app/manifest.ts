import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hestiia Restaurant — Pure Vegetarian Dining Kanpur',
    short_name: 'Hestiia',
    description:
      'Premier certified 100% pure vegetarian restaurant in Shyam Nagar, Kanpur. North Indian curries, tandoor specials, Indo-Chinese, family dining & fast food delivery.',
    start_url: '/',
    display: 'standalone',
    background_color: '#140F0C',
    theme_color: '#1F1A16',
    icons: [
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
