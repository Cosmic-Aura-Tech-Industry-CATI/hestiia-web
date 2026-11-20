import type { Metadata } from 'next'
import DeliveryPolicyView from '../../views/DeliveryPolicy'

export const metadata: Metadata = {
  title: 'Delivery & Takeaway Policy | Hestiia Restaurant',
  description: 'Certified home delivery and direct pickup parameters for Hestiia Restaurant Kanpur.',
}

export default function DeliveryPolicyPage() {
  return <DeliveryPolicyView />
}
