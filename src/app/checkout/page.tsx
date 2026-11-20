import type { Metadata } from 'next'
import CheckoutView from '../../views/Checkout'

export const metadata: Metadata = {
  title: 'Dining & Takeaway Checkout | Hestiia Restaurant',
  description:
    'Complete your order or table reservation at Hestiia Restaurant in Shyam Nagar, Kanpur.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CheckoutPage() {
  return <CheckoutView />
}
