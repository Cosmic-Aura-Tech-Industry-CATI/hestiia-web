import type { Metadata } from 'next'
import MenuView from '../../views/Menu'
import BreadcrumbJsonLd from '../../components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Pure Vegetarian Menu (193 Dishes) | Hestiia Restaurant Kanpur',
  description:
    'Explore our 193 pure vegetarian dishes in Shyam Nagar, Kanpur across 21 disciplines: slow-cooked North Indian curries, tandoori rotis, sizzling Indo-Chinese wok, artisanal sandwiches, and rich desserts.',
  alternates: {
    canonical: '/menu',
  },
  keywords: [
    'Hestiia menu',
    'vegetarian restaurant menu Kanpur',
    'North Indian thali menu',
    'Chinese veg menu Kanpur',
    'food delivery Shyam Nagar',
    'paneer dishes menu',
  ],
  openGraph: {
    title: 'Pure Vegetarian Menu (193 Dishes) | Hestiia Restaurant Kanpur',
    description: '193 authentic dishes arranged across 21 disciplines. Prepared fresh daily in Shyam Nagar, Kanpur.',
    url: 'https://hestiiarestaurant.com/menu',
  },
}

export default function MenuPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Full Menu', url: '/menu' },
        ]}
      />
      <MenuView />
    </>
  )
}
