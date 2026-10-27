import { useEffect, useRef, useState } from 'react'
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
  const [isMobile, setIsMobile] = useState<boolean>(false)

  // Track viewport width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
            aria-label="Explore all four culinary disciplines at Hestiia"
          >
            <span>Explore All Cuisines</span>
            <ArrowRight size={14} className="cuisines-header-arrow" aria-hidden="true" />
          </Link>
        </div>

        {/* 4 Cards Grid: 4-col desktop, 2-col tablet, 1-col mobile */}
        <div className="cuisines-teaser__grid">
          {CUISINES.map((item) => {
            const cardContent = (
              <Link
                to="/cuisines"
                className="cuisines-teaser-card"
                aria-label={`${item.title} cuisine: ${item.subtitle}`}
              >
                {/* 1. Image area on top with 4/3 fixed aspect ratio */}
                <div className="cuisines-teaser-card__img-wrap">
                  <img
                    src={item.image}
                    alt={`${item.title} dish at Hestiia Pure Vegetarian Restaurant Kanpur`}
                    loading="lazy"
                    decoding="async"
                    className="cuisines-teaser-card__img"
                  />
                  {/* Subtle glare overlay */}
                  <div className="cuisines-teaser-card__glare" aria-hidden="true" />
                </div>

                {/* 2. Content area BELOW image */}
                <div className="cuisines-teaser-card__content">
                  <div>
                    <span className="cuisines-teaser-card__subtitle">
                      {item.subtitle}
                    </span>
                    <h3 className="cuisines-teaser-card__title">
                      {item.title}
                    </h3>
                    <p className="cuisines-teaser-card__desc">
                      {item.description}
                    </p>
                  </div>

                  <div className="cuisines-teaser-card__action">
                    <span>Explore</span>
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
                {!isMobile ? (
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
        </div>
      </div>
    </section>
  )
}
