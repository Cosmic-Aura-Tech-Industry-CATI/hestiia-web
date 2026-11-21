import type { Metadata } from 'next'
import CuisinesView from '../../views/Cuisines'
import BreadcrumbJsonLd from '../../components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Cuisines & Regional Specialties | Hestiia Restaurant Kanpur',
  description:
    'Explore North Indian heritage curries, sizzling Indo-Chinese wok specialties, crisp evening snacks, and artisanal desserts at Hestiia pure vegetarian restaurant in Shyam Nagar, Kanpur.',
  alternates: {
    canonical: '/cuisines',
  },
  keywords: [
    'North Indian food Kanpur',
    'Indo-Chinese vegetarian Kanpur',
    'pure veg cuisine Shyam Nagar',
    'vegetarian restaurant specialties Kanpur',
  ],
  openGraph: {
    title: 'Cuisines & Regional Specialties | Hestiia Restaurant Kanpur',
    description: 'Authentic pure vegetarian culinary traditions across 4 distinct disciplines.',
    url: 'https://hestiiarestaurant.com/cuisines',
  },
}

export default function CuisinesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Cuisines', url: '/cuisines' },
        ]}
      />
      <CuisinesView />
    </>
  )
}
