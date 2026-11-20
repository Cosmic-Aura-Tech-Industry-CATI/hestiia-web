import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import '../styles/global.css'
import AppShell from '../components/AppShell'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1F1A16',
}

const BASE_URL = 'https://hestiiarestaurant.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: './',
  },
  title: {
    default: 'Hestiia Restaurant — Certified 100% Pure Vegetarian Dining, Kanpur',
    template: '%s | Hestiia Restaurant Kanpur',
  },
  description:
    'Hestiia Restaurant — Premier certified pure vegetarian dining destination in Shyam Nagar, Kanpur. Savor 193 authentic North Indian curries, tandoori breads, sizzling Indo-Chinese, comfort food, and desserts in an acoustic luxury sanctuary.',
  keywords: [
    'vegetarian restaurant Kanpur',
    'pure veg restaurant Shyam Nagar',
    'best family restaurant Kanpur',
    'North Indian food Kanpur',
    'Chinese veg Kanpur',
    'Hestiia restaurant Kanpur',
    'restaurants in Shyam Nagar Kanpur',
    'thali in Kanpur',
    'paneer butter masala Kanpur',
    'table reservation Kanpur',
    'pure veg party hall Kanpur',
  ],
  authors: [{ name: 'Hestiia Restaurant', url: BASE_URL }],
  creator: 'Hestiia Restaurant',
  publisher: 'Hestiia Restaurant',
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  openGraph: {
    title: 'Hestiia Restaurant — Certified 100% Pure Vegetarian Dining, Kanpur',
    description:
      'Pure vegetarian culinary sanctuary in Shyam Nagar, Kanpur. 193 authentic dishes, handcrafted North Indian curries, wok-tossed Indo-Chinese, and peaceful family hospitality.',
    url: BASE_URL,
    siteName: 'Hestiia Restaurant Kanpur',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/gallery/dining-hall-perspective.webp',
        width: 1080,
        height: 800,
        alt: 'Hestiia Restaurant Sanctuary Dining Hall in Shyam Nagar Kanpur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hestiia Restaurant — Pure Vegetarian Dining, Kanpur',
    description:
      'Certified pure vegetarian dining in Shyam Nagar, Kanpur. 193 dishes across North Indian, Indo-Chinese, Fast Food & Desserts.',
    images: ['/gallery/dining-hall-perspective.webp'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  other: {
    'geo.region': 'IN-UP',
    'geo.placename': 'Kanpur, Uttar Pradesh',
    'geo.position': '26.4317;80.3541',
    'ICBM': '26.4317, 80.3541',
  },
}

const structuredDataGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Restaurant', 'FoodEstablishment'],
      '@id': `${BASE_URL}/#restaurant`,
      name: 'Hestiia Restaurant',
      alternateName: ['Hestiia', 'Hestiia Pure Veg Restaurant Kanpur'],
      description:
        'Certified 100% pure vegetarian restaurant in Shyam Nagar, Kanpur. Serving authentic North Indian curries, tandoor specials, Indo-Chinese favorites, and desserts.',
      url: BASE_URL,
      logo: `${BASE_URL}/brand/logo.webp`,
      image: `${BASE_URL}/gallery/dining-hall-perspective.webp`,
      telephone: '+917880840622',
      email: 'info@hestiia.com',
      priceRange: '₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, UPI, Credit Card, Debit Card',
      servesCuisine: [
        'North Indian',
        'Chinese',
        'Indo-Chinese',
        'Pure Vegetarian',
        'Fast Food',
        'Desserts',
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1-B, Ram Puram, Above Jawed Habib',
        addressLocality: 'Shyam Nagar',
        addressRegion: 'Uttar Pradesh',
        postalCode: '208013',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 26.4317,
        longitude: 80.3541,
      },
      hasMap: 'https://www.google.com/maps?cid=1346206616332675805',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '11:00',
          closes: '23:00',
        },
      ],
      acceptsReservations: true,
      hasMenu: `${BASE_URL}/menu`,
      areaServed: [
        { '@type': 'Place', name: 'Shyam Nagar, Kanpur' },
        { '@type': 'Place', name: 'Ram Puram, Kanpur' },
        { '@type': 'Place', name: 'Harjinder Nagar, Kanpur' },
        { '@type': 'Place', name: 'Chakeri, Kanpur' },
        { '@type': 'Place', name: 'Koramangala, Kanpur' },
        { '@type': 'AdministrativeArea', name: 'Kanpur, Uttar Pradesh' },
      ],
      sameAs: [
        'https://www.instagram.com/hestiiarestaurant/',
        'https://www.google.com/maps?cid=1346206616332675805',
        'https://www.zomato.com/kanpur/hestiia-restaurant-shyam-nagar',
        'https://www.swiggy.com/restaurants/hestiia-restaurant-shyam-nagar-koramangala-kanpur-1240905/dineout',
        'https://www.eazydiner.com/kanpur/hestiia-restaurant-shyam-nagar-kanpur-706424',
        'https://www.district.in/dining/kanpur/hestiia-restaurant-shyam-nagar/book',
        'https://www.justdial.com/Kanpur/Hestiia-Restaurant-Above-Jawed-Habib-Shyam-Nagar/0512PX512-X512-230224201050-J6L4_BZDET',
      ],
      potentialAction: [
        {
          '@type': 'ReserveAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${BASE_URL}/contact`,
            inLanguage: 'en-IN',
            actionPlatform: [
              'http://schema.org/DesktopWebPlatform',
              'http://schema.org/MobileWebPlatform',
            ],
          },
          result: {
            '@type': 'FoodEstablishmentReservation',
            name: 'Table Reservation at Hestiia Restaurant',
          },
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Hestiia Restaurant Kanpur',
      description: 'Official website of Hestiia Restaurant — 100% Pure Vegetarian Dining in Shyam Nagar, Kanpur.',
      publisher: {
        '@id': `${BASE_URL}/#restaurant`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE_URL}/menu?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
        />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
