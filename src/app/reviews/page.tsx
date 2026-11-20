import type { Metadata } from 'next'
import ReviewsView from '../../views/Reviews'

export const metadata: Metadata = {
  title: 'Guest Reviews & Verified Ratings | Hestiia',
  description:
    'Read verified dining reviews and ratings for Hestiia Restaurant in Shyam Nagar, Kanpur across Google, Zomato, EazyDiner, and Justdial.',
}

export default function ReviewsPage() {
  return <ReviewsView />
}
