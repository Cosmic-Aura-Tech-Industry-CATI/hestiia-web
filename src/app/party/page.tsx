import type { Metadata } from 'next'
import PartyView from '../../views/Party'
import BreadcrumbJsonLd from '../../components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Parties, Private Dining & Banquets | Hestiia Restaurant Kanpur',
  description:
    'Host birthday celebrations, family anniversaries, kitty parties, and corporate lunches at Hestiia in Shyam Nagar, Kanpur. Personalized pure vegetarian menus, ambient seating, and hospitality.',
  alternates: {
    canonical: '/party',
  },
  keywords: [
    'party hall Kanpur',
    'birthday celebration restaurant Kanpur',
    'kitty party venue Shyam Nagar',
    'pure veg banquet Kanpur',
    'private dining Kanpur',
  ],
  openGraph: {
    title: 'Parties & Private Dining | Hestiia Restaurant Kanpur',
    description: 'Celebrate your special milestones in our pure vegetarian dining sanctuary in Shyam Nagar, Kanpur.',
    url: 'https://hestiiarestaurant.com/party',
  },
}

export default function PartyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Parties & Private Dining', url: '/party' },
        ]}
      />
      <PartyView />
    </>
  )
}
