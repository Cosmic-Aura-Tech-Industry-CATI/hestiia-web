import type { Metadata } from 'next'
import TermsView from '../../views/Terms'
import BreadcrumbJsonLd from '../../components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Terms of Service | Hestiia Restaurant Kanpur',
  description: 'Official dining, online reservation, and website terms of service for Hestiia Restaurant Kanpur.',
  alternates: {
    canonical: '/terms',
  },
}

export default function TermsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Terms of Service', url: '/terms' },
        ]}
      />
      <TermsView />
    </>
  )
}
