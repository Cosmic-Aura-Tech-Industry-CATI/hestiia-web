import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CUISINES } from '../../content/cuisines'
import TiltedCard from '../reactbits/TiltedCard'
import TapScale from '../reactbits/TapScale'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './cuisines-teaser.css'

gsap.registerPlugin(ScrollTrigger)

export default function CuisinesTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  // Track viewport width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Mobile scroll-snap centered card detection
  const handleScroll = useCallback(() => {
    if (!isMobile || !carouselRef.current) return

    const container = carouselRef.current
    const containerCenter = container.scrollLeft + container.clientWidth / 2
    const items = container.querySelectorAll<HTMLElement>('.cuisine-teaser-card-wrap')

    let closestIdx = 0
    let minDistance = Infinity

    items.forEach((item, idx) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2
      const dist = Math.abs(containerCenter - itemCenter)
      if (dist < minDistance) {
        minDistance = dist
        closestIdx = idx
      }
    })

    setActiveIndex(closestIdx)
  }, [isMobile])

  // Scroll to card from dot indicator
  const scrollToCard = (index: number) => {
    if (!carouselRef.current) return
    const items = carouselRef.current.querySelectorAll<HTMLElement>('.cuisine-teaser-card-wrap')
    if (items[index]) {
      items[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      setActiveIndex(index)
    }
  }

  // Entrance animation: stagger + rotateX 8 -> 0 from below
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const header = section.querySelector('.cuisines-teaser__header')
    const cards = section.querySelectorAll('.cuisine-teaser-card-wrap, .cuisine-teaser-card')

    if (isReduced) {
      gsap.set([header, cards], { opacity: 1, y: 0, rotateX: 0 })
      return
    }

    const mm = gsap.matchMedia()

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)',
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
            y: isDesktop ? 36 : 22,
            rotateX: isDesktop ? 8 : 4,
            transformOrigin: '50% 100%',
            stagger: isDesktop ? 0.1 : 0.06,
            duration: isDesktop ? 0.9 : 0.6,
            ease: 'power3.out',
          },
          '-=0.4'
        )
      }
    )

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="cuisines-teaser section section-dark section-ambient-glow"
      aria-labelledby="cuisines-teaser-title"
    >
      <div className="container">
        {/* Header */}
        <div className="cuisines-teaser__header">
          <div>
            <span className="cuisines-teaser__eyebrow">
              Culinary Spectrum
            </span>
            <h2 id="cuisines-teaser-title" className="cuisines-teaser__title">
              Four Dedicated Culinary Disciplines.
            </h2>
          </div>

          <Link
            to="/cuisines"
            className="cuisines-teaser__header-link"
            aria-label="Explore all four culinary disciplines"
          >
            <span>Explore All Cuisines</span>
            <ArrowRight size={14} className="cuisines-header-arrow" />
          </Link>
        </div>

        {/* 4 Cards: Desktop TiltedCard vs Mobile Swipe Carousel */}
        <div
          ref={carouselRef}
          className="cuisines-teaser__grid"
          onScroll={handleScroll}
        >
          {CUISINES.map((item, idx) => {
            const isCentered = isMobile && activeIndex === idx
            const scaleClass = isMobile
              ? isCentered
                ? 'cuisine-teaser-card-wrap--center'
                : 'cuisine-teaser-card-wrap--neighbor'
              : ''

            const cardContent = (
              <Link
                to="/cuisines"
                className="cuisine-teaser-card"
                aria-label={`${item.title} cuisine: ${item.subtitle}`}
              >
                <div className="cuisine-card__img-wrap">
                  <img
                    src={item.image}
                    alt={`${item.title} at Hestiia Restaurant`}
                    loading="lazy"
                    decoding="async"
                    className="cuisine-card__img"
                  />
                  {/* Subtle glare overlay */}
                  <div className="cuisine-card__glare" />
                </div>

                <div className="cuisine-card__content">
                  <div>
                    <span className="cuisine-card__subtitle">
                      {item.subtitle}
                    </span>
                    <h3 className="cuisine-card__title">
                      {item.title}
                    </h3>
                    <p className="cuisine-card__desc">
                      {item.description}
                    </p>
                  </div>

                  <div className="cuisine-card__action">
                    <span>Explore</span>
                    <ArrowRight size={12} className="cuisine-card__action-arrow" />
                  </div>
                </div>
              </Link>
            )

            // Desktop uses TiltedCard, Mobile uses TapScale wrapper with scroll-snap
            return (
              <div
                key={item.id}
                className={`cuisine-teaser-card-wrap ${scaleClass}`}
                style={{ height: '100%' }}
              >
                {!isMobile ? (
                  <TiltedCard maxTilt={7} scale={1.02} className="h-full">
                    {cardContent}
                  </TiltedCard>
                ) : (
                  <TapScale scale={0.97} style={{ width: '100%', height: '100%' }}>
                    {cardContent}
                  </TapScale>
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile Dot Indicators */}
        {isMobile && (
          <div className="cuisines-teaser__dots" aria-hidden="true">
            {CUISINES.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className={`cuisines-dot ${idx === activeIndex ? 'cuisines-dot--active' : ''}`}
                onClick={() => scrollToCard(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
