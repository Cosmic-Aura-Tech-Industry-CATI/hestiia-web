import type { Metadata } from 'next'
import { Suspense } from 'react'
import ContactView from '../../views/Contact'
import BreadcrumbJsonLd from '../../components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Visit & Reserve a Table | Contact Details | Hestiia Restaurant Kanpur',
  description:
    'Reserve a table at Hestiia Restaurant in Shyam Nagar, Kanpur. Direct online table booking, directions (Above Jawed Habib, Ram Puram), operating hours 11:00 AM to 11:00 PM, and party coordination.',
  alternates: {
    canonical: '/contact',
  },
  keywords: [
    'Hestiia restaurant contact',
    'book table Kanpur',
    'restaurant phone Shyam Nagar',
    'directions to Hestiia',
    'reserve pure veg table Kanpur',
    'Hestiia address Kanpur',
  ],
  openGraph: {
    title: 'Visit & Reserve a Table | Hestiia Restaurant Kanpur',
    description: '1-B, Ram Puram, Above Jawed Habib, Shyam Nagar, Kanpur. Call +91 78808 40622.',
    url: 'https://hestiiarestaurant.com/contact',
  },
}

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Visit & Contact', url: '/contact' },
        ]}
      />
      <Suspense fallback={null}>
        <ContactView />
      </Suspense>
    </>
  )
}
