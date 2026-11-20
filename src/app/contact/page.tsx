import type { Metadata } from 'next'
import { Suspense } from 'react'
import ContactView from '../../views/Contact'

export const metadata: Metadata = {
  title: 'Visit & Reserve a Table | Contact Details',
  description:
    'Reserve a table at Hestiia Restaurant in Shyam Nagar, Kanpur. Direct online table booking, directions, operating hours 11 AM to 11 PM, and party dining assistance.',
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactView />
    </Suspense>
  )
}
