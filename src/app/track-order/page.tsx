import type { Metadata } from 'next'
import OrderSuccessView from '../../views/OrderSuccess'

export const metadata: Metadata = {
  title: 'Track Your Order | Hestiia Restaurant',
  description: 'Live food order preparation and delivery tracking at Hestiia Restaurant Kanpur.',
}

export default function TrackOrderPage() {
  return <OrderSuccessView />
}
