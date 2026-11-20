import type { Metadata } from 'next'
import OrderSuccessView from '../../../views/OrderSuccess'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ orderNumber: string }>
}): Promise<Metadata> {
  const { orderNumber } = await params
  return {
    title: `Order #${orderNumber} Confirmation | Hestiia Restaurant`,
    description: 'Live food order preparation and delivery tracking at Hestiia Restaurant Kanpur.',
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default function OrderSuccessDetailPage() {
  return <OrderSuccessView />
}
