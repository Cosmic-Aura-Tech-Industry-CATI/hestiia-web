import type { Metadata } from 'next'
import OffersView from '../../views/Offers'
import BreadcrumbJsonLd from '../../components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Exclusive Offers & Dining Privileges | Hestiia Restaurant Kanpur',
  description:
    'Explore current seasonal dining offers, party packages, and privileges at Hestiia Restaurant in Shyam Nagar, Kanpur.',
  alternates: {
    canonical: '/offers',
  },
  openGraph: {
    title: 'Exclusive Offers & Dining Privileges | Hestiia Restaurant Kanpur',
    description: 'Special dining celebrations and discounts at Hestiia in Shyam Nagar, Kanpur.',
    url: 'https://hestiiarestaurant.com/offers',
  },
}

export default function OffersPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Offers', url: '/offers' },
        ]}
      />
      <OffersView />
    </>
  )
}
