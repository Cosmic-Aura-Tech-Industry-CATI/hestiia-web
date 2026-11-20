import type { Metadata } from 'next'
import HomeView from '../views/Home'

export const metadata: Metadata = {
  title: {
    absolute: 'Best Pure Veg Restaurant in Shyam Nagar, Kanpur | Hestiia Restaurant',
  },
  description:
    'Looking for the best restaurant in Shyam Nagar, Kanpur? Hestiia Restaurant offers 100% pure vegetarian North Indian curries, Indo-Chinese, tandoori breads, family dining, birthday celebrations & fast food delivery.',
  keywords: [
    'Best restaurant in Shyam Nagar Kanpur',
    'Restaurants in Shyam Nagar Kanpur',
    'Best family restaurant in Shyam Nagar',
    'Best veg restaurant in Kanpur',
    'Pure veg restaurant in Shyam Nagar Kanpur',
    'Birthday party restaurant in Shyam Nagar',
    'Family dinner restaurant in Kanpur',
    'Food delivery near Shyam Nagar',
    'North Indian restaurant in Kanpur',
    'Chinese restaurant in Shyam Nagar',
    'Hestiia Restaurant Shyam Nagar',
  ],
}

export default function HomePage() {
  return <HomeView />
}
