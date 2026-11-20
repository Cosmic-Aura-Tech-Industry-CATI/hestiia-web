import type { Metadata } from 'next'
import ReviewsView from '../../views/Reviews'
import BreadcrumbJsonLd from '../../components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Guest Reviews & Verified Ratings | Hestiia Restaurant Kanpur',
  description:
    'Read verified guest reviews and authentic ratings for Hestiia Restaurant in Shyam Nagar, Kanpur across Google Maps, Zomato, EazyDiner, and JustDial.',
  alternates: {
    canonical: '/reviews',
  },
  keywords: [
    'Hestiia reviews',
    'customer feedback Kanpur restaurant',
    'Zomato ratings Hestiia',
    'Google reviews Hestiia Shyam Nagar',
  ],
  openGraph: {
    title: 'Guest Reviews & Verified Ratings | Hestiia Restaurant Kanpur',
    description: 'Read verified dining experiences from guests who visited Hestiia in Shyam Nagar, Kanpur.',
    url: 'https://hestiiarestaurant.com/reviews',
  },
}

export default function ReviewsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Reviews', url: '/reviews' },
        ]}
      />
      <ReviewsView />
    </>
  )
}
