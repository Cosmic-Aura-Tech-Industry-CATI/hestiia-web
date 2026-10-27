import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CUISINES } from '../../content/cuisines'
import TiltedCard from '../reactbits/TiltedCard'
import TapScale from '../reactbits/TapScale'
import Button from '../ui/Button'
import SnapCarousel from './SnapCarousel'
import { useDeviceMotion } from '../../hooks/useDeviceMotion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './cuisines-teaser.css'

gsap.registerPlugin(ScrollTrigger)

export default function CuisinesTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const { isTouch, isMobile } = useDeviceMotion()

  // Entrance animation: stagger + rotateX 8 -> 0 from below
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const header = section.querySelector('.cuisines-teaser__header')
    const cards = section.querySelectorAll('.cuisine-teaser-card-wrap, .cuisines-teaser-card')

    if (isReduced) {
      gsap.set([header, cards], { opacity: 1, y: 0, rotateX: 0 })
      return
    }

    const mm = gsap.matchMedia()

    const safetyTimer = setTimeout(() => {
      gsap.set([header, cards], { opacity: 1, y: 0, rotateX: 0, clearProps: 'transform,opacity' })
    }, 1500)

    mm.add(
      {
        isDesktop: '(min-width: 1024px) and (hover: hover)',
        isMobile: '(max-width: 1023px), (hover: none)',
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean; isMobile: boolean }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true,
          },
        })

        tl.from(header, {
          opacity: 0,
          y: isDesktop ? 20 : 12,
          duration: isDesktop ? 0.8 : 0.6,
          ease: 'power3.out',
        }).from(
          cards,
          {
            opacity: 0,
            y: isDesktop ? 36 : 20,
            rotateX: isDesktop ? 8 : 0,
            transformOrigin: '50% 100%',
            stagger: isDesktop ? 0.1 : 0.06,
            duration: isDesktop ? 0.9 : 0.6,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          },
          '-=0.4'
        )
      }
    )

    return () => {
      clearTimeout(safetyTimer)
      mm.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="cuisines-teaser home-section section-dark section-ambient-glow"
      aria-labelledby="cuisines-teaser-title"
    >
      <div className="home-container">
        {/* Header */}
        <div className="cuisines-teaser__header">
          <div>
            <span className="eyebrow cuisines-teaser__eyebrow">
              Culinary Spectrum
            </span>
            <h2 id="cuisines-teaser-title" className="h-section cuisines-teaser__title">
              Four Dedicated Culinary <em className="accent">Disciplines</em>.
            </h2>
          </div>

          <Button
            to="/cuisines"
            variant="secondary"
            size="md"
            icon={<ArrowRight size={14} />}
            iconPosition="right"
            aria-label="Explore all four culinary disciplines at Hestiia"
          >
            Explore All Cuisines
          </Button>
        </div>

        {/* 4 Cards: Desktop 4-col grid, SnapCarousel below 1024px */}
        <SnapCarousel
          itemCount={CUISINES.length}
          ariaLabel="Culinary Disciplines Carousel"
          desktopWrapperClassName="cuisines-teaser__grid grid-cuisines"
        >
          {CUISINES.map((item) => {
            const description = item.shortDescription || item.description

            const cardContent = (
              <Link
                to="/cuisines"
                className="cuisines-teaser-card card"
                aria-label={`${item.title} cuisine: ${item.subtitle}`}
              >
                {/* 1. Image area on top with 4/3 fixed aspect ratio */}
                <div className="cuisines-teaser-card__img-wrap card__img-wrap">
                  <img
                    src={item.image}
                    alt={`${item.title} dish at Hestiia Pure Vegetarian Restaurant Kanpur`}
                    loading="lazy"
                    decoding="async"
                    className="cuisines-teaser-card__img card__img"
                  />
                  {/* Subtle glare overlay */}
                  <div className="cuisines-teaser-card__glare" aria-hidden="true" />
                </div>

                {/* 2. Content area BELOW image on solid card surface */}
                <div className="cuisines-teaser-card__content card__body">
                  <div>
                    <span className="eyebrow cuisines-teaser-card__subtitle">
                      {item.subtitle}
                    </span>
                    <h3 className="h-card cuisines-teaser-card__title">
                      {item.title}
                    </h3>
                    <p className="cuisines-teaser-card__desc">
                      {description}
                    </p>
                  </div>

                  <div className="cuisines-teaser-card__action">
                    <span>Learn more</span>
                    <ArrowRight size={13} className="cuisines-card__action-arrow" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            )

            return (
              <div
                key={item.id}
                className="cuisine-teaser-card-wrap"
                style={{ height: '100%' }}
              >
                {!isMobile && !isTouch ? (
                  <TiltedCard maxTilt={6} scale={1.02} className="h-full">
                    {cardContent}
                  </TiltedCard>
                ) : (
                  <TapScale scale={0.98} style={{ width: '100%', height: '100%' }}>
                    {cardContent}
                  </TapScale>
                )}
              </div>
            )
          })}
        </SnapCarousel>
      </div>
    </section>
  )
}
