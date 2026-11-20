import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import '../styles/global.css'
import '../styles/typography.css'
import '../styles/home.css'
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

export const metadata: Metadata = {
  title: {
    default: 'Hestiia Restaurant — Pure Vegetarian Dining, Kanpur',
    template: '%s | Hestiia Restaurant Kanpur',
  },
  description:
    'Hestiia Restaurant — A pure vegetarian dining destination in Shyam Nagar, Kanpur. Savour North Indian classics, Indo-Chinese favourites, and comfort bites in a warm, welcoming atmosphere.',
  keywords: [
    'vegetarian restaurant Kanpur',
    'pure veg restaurant Shyam Nagar',
    'North Indian food Kanpur',
    'Chinese veg Kanpur',
    'Hestiia restaurant',
  ],
  authors: [{ name: 'Hestiia Restaurant' }],
  openGraph: {
    title: 'Hestiia Restaurant — Pure Vegetarian Dining, Kanpur',
    description:
      'Good food. Beautiful moments. A pure vegetarian restaurant bringing North Indian favourites, Chinese flavours, and comfort food together in Shyam Nagar, Kanpur.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hestiia Restaurant — Pure Vegetarian Dining, Kanpur',
    description:
      'Pure vegetarian dining in Shyam Nagar, Kanpur. North Indian, Chinese, fast food, and desserts.',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}

const restaurantJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Hestiia Restaurant',
  servesCuisine: ['North Indian', 'Chinese', 'Fast Food', 'Desserts'],
  telephone: '+917880840622',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1-B, Ram Puram',
    addressLocality: 'Shyam Nagar',
    addressRegion: 'Uttar Pradesh',
    postalCode: '208013',
    addressCountry: 'IN',
  },
  hasMap: 'https://www.google.com/maps/search/?api=1&query=Hestiia+Restaurant+Shyam+Nagar+Kanpur',
  sameAs: [
    'https://www.instagram.com/hestiiarestaurant/',
    'https://www.zomato.com/kanpur/hestiia-restaurant-shyam-nagar',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
