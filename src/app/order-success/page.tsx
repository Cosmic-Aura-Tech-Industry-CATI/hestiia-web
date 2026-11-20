import type { Metadata } from 'next'
import OrderSuccessView from '../../views/OrderSuccess'

export const metadata: Metadata = {
  title: 'Order Confirmation | Hestiia Restaurant',
  description: 'Your pure vegetarian dining order confirmation and receipt at Hestiia Restaurant Kanpur.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function OrderSuccessPage() {
  return <OrderSuccessView />
}
