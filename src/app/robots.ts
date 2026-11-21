import type { MetadataRoute } from 'next'

const BASE_URL = 'https://hestiiarestaurant.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/checkout', '/order-success', '/track-order', '/_next/'],
      },
      {
        userAgent: ['Googlebot', 'Bingbot'],
        allow: '/',
        disallow: ['/api/', '/checkout', '/order-success', '/track-order'],
      },
      // Explicitly allow AI Answer Engines & Search Overviews (AEO)
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Google-Extended'],
        allow: '/',
        disallow: ['/api/', '/checkout', '/order-success', '/track-order'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
