import type { Metadata } from 'next'
import RefundPolicyView from '../../views/RefundPolicy'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Hestiia Restaurant',
  description:
    'Cancellation and refund guidelines for table reservations and orders at Hestiia Restaurant Kanpur.',
}

export default function RefundPolicyPage() {
  return <RefundPolicyView />
}
