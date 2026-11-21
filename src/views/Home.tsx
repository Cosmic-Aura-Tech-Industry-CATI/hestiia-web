'use client'

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
import FaqSection from '../components/home/FaqSection'
import SectionDivider from '../components/ui/SectionDivider'
import { useSiteReady } from '../context/SiteReadyContext'

export default function Home() {
  const { isReady } = useSiteReady()

  return (
    <>
      {/* 1. Hero */}
      <Hero isReady={isReady} />

      {/* 2. Marquee Strip */}
      <MarqueeStrip />

      {/* 3. Ratings Strip */}
      <RatingsStrip />

      {/* 4. Story Teaser */}
      <StoryTeaser />
      <SectionDivider />

      {/* 5. Cuisines Teaser */}
      <CuisinesTeaser />
      <SectionDivider />

      {/* 6. Signature Dishes */}
      <SignatureDishes />
      <SectionDivider />

      {/* Reels Section */}
      <ReelsSection />
      <SectionDivider />

      {/* 7. Gallery Teaser */}
      <GalleryTeaser />
      <SectionDivider />

      {/* 8. Experience Teaser */}
      <ExperienceTeaser />
      <SectionDivider />

      {/* 9. Offers Band */}
      <OffersBand />

      {/* 10. Reviews Teaser */}
      <ReviewsTeaser />
      <SectionDivider />

      {/* 11. Visit Teaser */}
      <VisitTeaser />
      <SectionDivider />

      {/* 12. FAQ & AEO Structured Answer Section */}
      <FaqSection />
    </>
  )
}
