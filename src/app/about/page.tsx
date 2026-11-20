import type { Metadata } from 'next'
import AboutView from '../../views/About'

export const metadata: Metadata = {
  title: 'Our Story & Dining Experience — Hestiia Restaurant',
  description:
    'Discover Hestiia in Shyam Nagar, Kanpur. 100% pure vegetarian dining, warm family hospitality, comfortable seating booths, and private gathering spaces.',
}

export default function AboutPage() {
  return <AboutView />
}
