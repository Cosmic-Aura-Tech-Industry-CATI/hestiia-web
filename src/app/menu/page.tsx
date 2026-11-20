import type { Metadata } from 'next'
import MenuView from '../../views/Menu'

export const metadata: Metadata = {
  title: 'Pure Vegetarian Menu (193 Dishes)',
  description:
    'Browse 193 pure vegetarian dishes at Hestiia Restaurant Kanpur across 21 categories: North Indian curries, Indo-Chinese wok, snacks, breads, and desserts.',
}

export default function MenuPage() {
  return <MenuView />
}
