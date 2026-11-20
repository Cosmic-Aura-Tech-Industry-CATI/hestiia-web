import type { Metadata } from 'next'
import OrderSuccessView from '../../../views/OrderSuccess'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ orderNumber: string }>
}): Promise<Metadata> {
  const { orderNumber } = await params
  return {
    title: `Track Order #${orderNumber} | Hestiia`,
    description: 'Live food order preparation and delivery tracking at Hestiia Restaurant Kanpur.',
  }
}

export default function TrackOrderDetailPage() {
  return <OrderSuccessView />
}
