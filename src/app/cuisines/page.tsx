import type { Metadata } from 'next'
import CuisinesView from '../../views/Cuisines'

export const metadata: Metadata = {
  title: 'Cuisines & Regional Specialties',
  description:
    'Explore North Indian heritage curries, sizzling Indo-Chinese wok dishes, evening snacks, and artisanal desserts at Hestiia Restaurant Kanpur.',
}

export default function CuisinesPage() {
  return <CuisinesView />
}
