import type { Metadata } from 'next'
import OffersView from '../../views/Offers'

export const metadata: Metadata = {
  title: 'Exclusive Offers & Dining Privileges',
  description:
    'Explore current seasonal dining offers, discounts, and privileges at Hestiia Restaurant in Shyam Nagar, Kanpur.',
}

export default function OffersPage() {
  return <OffersView />
}
