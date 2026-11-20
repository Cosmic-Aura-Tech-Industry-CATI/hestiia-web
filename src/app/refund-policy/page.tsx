import type { Metadata } from 'next'
import RefundPolicyView from '../../views/RefundPolicy'
import BreadcrumbJsonLd from '../../components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Hestiia Restaurant Kanpur',
  description: 'Verified refund and cancellation terms for dining reservations and food orders at Hestiia Restaurant Kanpur.',
  alternates: {
    canonical: '/refund-policy',
  },
}

export default function RefundPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Refund Policy', url: '/refund-policy' },
        ]}
      />
      <RefundPolicyView />
    </>
  )
}
