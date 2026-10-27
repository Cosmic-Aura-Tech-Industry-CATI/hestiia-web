import Hero from '../components/Hero'
import MarqueeStrip from '../components/MarqueeStrip'
import RatingsStrip from '../components/home/RatingsStrip'
import StoryTeaser from '../components/home/StoryTeaser'
import CuisinesTeaser from '../components/home/CuisinesTeaser'
import SignatureDishes from '../components/home/SignatureDishes'
import ReelsSection from '../components/home/ReelsSection'
import GalleryTeaser from '../components/home/GalleryTeaser'
import ExperienceTeaser from '../components/home/ExperienceTeaser'
import OffersBand from '../components/home/OffersBand'
import ReviewsTeaser from '../components/home/ReviewsTeaser'
import VisitTeaser from '../components/home/VisitTeaser'
import SectionDivider from '../components/ui/SectionDivider'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

interface HomeProps {
  isReady: boolean
}

export default function Home({ isReady }: HomeProps) {
  useDocumentMeta(
    'Hestiia Restaurant — Pure Vegetarian Dining, Kanpur',
    'A pure vegetarian culinary sanctuary in Shyam Nagar, Kanpur. Savor authentic North Indian heritage curries, sizzling Indo-Chinese wok dishes, and warm hospitality.'
  )

  return (
    <>
      {/* 1. Hero (unchanged video, playback logic, and copy) */}
      <Hero isReady={isReady} />

      {/* 2. Marquee Strip (unchanged) */}
      <MarqueeStrip />

      {/* 3. Ratings Strip (new highlights bar) */}
      <RatingsStrip />

      {/* 4. Story Teaser (1 photo + 60 words + link to /about) */}
      <StoryTeaser />
      <SectionDivider />

      {/* 5. Cuisines Teaser (4 cards + link to /cuisines) */}
      <CuisinesTeaser />
      <SectionDivider />

      {/* 6. Signature Dishes (6 popular dishes + link to /menu) */}
      <SignatureDishes />
      <SectionDivider />

      {/* Reels Section */}
      <ReelsSection />
      <SectionDivider />

      {/* 7. Gallery Teaser (6 image horizontal strip + link to /gallery) */}
      <GalleryTeaser />
      <SectionDivider />

      {/* 8. Experience Teaser (3 cards from services + link to /experience) */}
      <ExperienceTeaser />
      <SectionDivider />

      {/* 9. Offers Band (conditionally hidden when no active offers) */}
      <OffersBand />

      {/* 10. Reviews Teaser (platform ratings + 3 cards + link to /reviews) */}
      <ReviewsTeaser />
      <SectionDivider />

      {/* 11. Visit Teaser (address, hours, actions, small static card + link to /contact) */}
      <VisitTeaser />
    </>
  )
}
