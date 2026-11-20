import type { Metadata } from 'next'
import HomeView from '../views/Home'

export const metadata: Metadata = {
  title: {
    absolute: 'Hestiia Restaurant — Pure Vegetarian Dining, Kanpur',
  },
  description:
    'A pure vegetarian culinary sanctuary in Shyam Nagar, Kanpur. Savor authentic North Indian heritage curries, sizzling Indo-Chinese wok dishes, and warm hospitality.',
}

export default function HomePage() {
  return <HomeView />
}
