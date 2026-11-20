import type { Metadata } from 'next'
import PrivacyView from '../../views/Privacy'
import BreadcrumbJsonLd from '../../components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Privacy Policy | Hestiia Restaurant Kanpur',
  description: 'Guest privacy policy and data security standards for Hestiia Restaurant Kanpur.',
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Privacy Policy', url: '/privacy' },
        ]}
      />
      <PrivacyView />
    </>
  )
}
