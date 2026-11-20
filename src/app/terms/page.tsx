import type { Metadata } from 'next'
import TermsView from '../../views/Terms'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Hestiia Restaurant',
  description:
    'Terms and conditions governing dining reservations, takeaways, and services at Hestiia Restaurant Kanpur.',
}

export default function TermsPage() {
  return <TermsView />
}
