import type { Metadata } from 'next'
import CartView from '../../views/Cart'

export const metadata: Metadata = {
  title: 'Your Dining Cart',
  description:
    'Review your curated pure vegetarian dishes before ordering or dining at Hestiia Restaurant Kanpur.',
}

export default function CartPage() {
  return <CartView />
}
