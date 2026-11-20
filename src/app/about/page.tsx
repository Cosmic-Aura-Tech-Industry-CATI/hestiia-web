import type { Metadata } from 'next'
import AboutView from '../../views/About'
import BreadcrumbJsonLd from '../../components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Our Story & Pure Vegetarian Sanctuary | Hestiia Restaurant Kanpur',
  description:
    'Discover Hestiia Restaurant in Shyam Nagar, Kanpur. 100% certified pure vegetarian dining, warm family hospitality, artisanal ingredients, and an acoustic dining sanctuary.',
  alternates: {
    canonical: '/about',
  },
  keywords: [
    'about Hestiia restaurant',
    'vegetarian heritage Kanpur',
    'pure veg dining Shyam Nagar',
    'family restaurant story Kanpur',
  ],
  openGraph: {
    title: 'Our Story & Pure Vegetarian Sanctuary | Hestiia Restaurant Kanpur',
    description: 'Good food, authentic ingredients, and real family moments in Shyam Nagar, Kanpur.',
    url: 'https://hestiiarestaurant.com/about',
  },
}

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Our Story', url: '/about' },
        ]}
      />
      <AboutView />
    </>
  )
}
