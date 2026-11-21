import type { Metadata } from 'next'
import ExperienceView from '../../views/Experience'
import BreadcrumbJsonLd from '../../components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Dining Experience & Hospitality Amenities | Hestiia Restaurant Kanpur',
  description:
    'Discover the hospitality experience at Hestiia in Shyam Nagar, Kanpur. Designed with acoustic ceilings, comfortable velvet booth seating, ambient lighting, and dedicated family tables.',
  alternates: {
    canonical: '/experience',
  },
  keywords: [
    'dining experience Kanpur',
    'family restaurant ambience Shyam Nagar',
    'acoustic restaurant interior Kanpur',
    'comfortable dining Kanpur',
  ],
  openGraph: {
    title: 'Dining Experience & Hospitality Amenities | Hestiia Restaurant Kanpur',
    description: 'Designed for comfort, acoustic calm, and memorable family dining in Shyam Nagar, Kanpur.',
    url: 'https://hestiiarestaurant.com/experience',
  },
}

export default function ExperiencePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Dining Experience', url: '/experience' },
        ]}
      />
      <ExperienceView />
    </>
  )
}
