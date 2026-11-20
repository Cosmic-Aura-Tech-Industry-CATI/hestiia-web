import type { Metadata } from 'next'
import DeliveryPolicyView from '../../views/DeliveryPolicy'
import BreadcrumbJsonLd from '../../components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Delivery & Takeaway Policy | Hestiia Restaurant Kanpur',
  description: 'Pure vegetarian home delivery radius, packing guidelines, and direct pickup parameters for Hestiia Restaurant Kanpur.',
  alternates: {
    canonical: '/delivery-policy',
  },
}

export default function DeliveryPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Delivery Policy', url: '/delivery-policy' },
        ]}
      />
      <DeliveryPolicyView />
    </>
  )
}
