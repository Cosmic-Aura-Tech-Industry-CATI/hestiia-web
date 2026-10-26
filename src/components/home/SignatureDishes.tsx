import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { POPULAR_DISHES, MENU_CATEGORIES } from '../../content/menu'
import ShinyText from '../reactbits/ShinyText'
import Magnet from '../reactbits/Magnet'
import ClickSpark from '../reactbits/ClickSpark'
import TapScale from '../reactbits/TapScale'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './signature-dishes.css'

gsap.registerPlugin(ScrollTrigger)

export default function SignatureDishes() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackContainerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0)

  const featuredDishes = POPULAR_DISHES.slice(0, 6)

  // Track viewport size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Mobile scroll-snap centered card detection
  const handleMobileScroll = useCallback(() => {
    if (!isMobile || !trackContainerRef.current) return

    const container = trackContainerRef.current
    const containerCenter = container.scrollLeft + container.clientWidth / 2
    const cards = container.querySelectorAll<HTMLElement>('.signature-dish-card-wrap')

    let closestIdx = 0
    let minDistance = Infinity

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const dist = Math.abs(containerCenter - cardCenter)
      if (dist < minDistance) {
        minDistance = dist
        closestIdx = idx
      }
    })

    setActiveMobileIndex(closestIdx)
  }, [isMobile])

  // GSAP: Pinning on desktop ONLY (ONE pinned section on Home)
  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const trackContainer = trackContainerRef.current
    const progressBar = progressBarRef.current
    if (!section || !track || !trackContainer) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isReduced) {
      gsap.set(section, { height: 'auto', minHeight: 'unset' })
      return
    }

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const getScrollDist = () => track.scrollWidth - trackContainer.clientWidth

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(400, getScrollDist())}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Horizontal track slide
      tl.to(track, {
        x: () => -getScrollDist(),
        ease: 'none',
      })

      // Progress bar fill
      if (progressBar) {
        tl.to(
          progressBar,
          {
            scaleX: 1,
            ease: 'none',
          },
          0
        )
      }

      // Parallax effect on card images inside
      tl.to(
        '.signature-card__img-parallax',
        {
          x: -36,
          ease: 'none',
        },
        0
      )
    })

    // Refresh ScrollTrigger after initial mount and font/image loading
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    return () => {
      clearTimeout(timer)
      mm.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="signature-dishes-section section-dark"
      aria-labelledby="signature-dishes-title"
    >
      <div className="signature-dishes__pinned-layout">
        {/* Left Column: Heading, Copy, Button & Progress Bar */}
        <div className="signature-dishes__left-col">
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-brass, #B89A64)',
              display: 'block',
              marginBottom: '10px',
            }}
          >
            Signatures of Hestiia
          </span>

          <h2
            id="signature-dishes-title"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 300,
              color: 'var(--color-text-inverse, #F6EFE4)',
              margin: '0 0 16px 0',
              lineHeight: 1.2,
            }}
          >
            Crafted with Heritage Spices.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'rgba(246, 239, 228, 0.72)',
              margin: 0,
              maxWidth: '320px',
            }}
          >
            Slow-simmered in cold-pressed oils, churned fresh dairy, and hand-ground aromatics for an authentic pure vegetarian feast.
          </p>

          <Link
            to="/menu"
            className="signature-menu-btn"
            aria-label="See full menu with 193 dishes"
          >
            <span>See Full Menu (193 Dishes)</span>
            <ArrowRight size={14} className="menu-btn-arrow" />
          </Link>

          {/* Desktop Scroll Progress Indicator */}
          <div className="signature-progress" aria-hidden="true">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '10px',
                fontFamily: 'var(--font-sans)',
                color: 'rgba(184, 154, 100, 0.7)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              <span>Scroll to explore</span>
              <span>01 / 06</span>
            </div>
            <div className="signature-progress__track">
              <div ref={progressBarRef} className="signature-progress__bar" />
            </div>
          </div>
        </div>

        {/* Right Track: Horizontal Slide on Desktop / Native Swipe on Mobile */}
        <div
          ref={trackContainerRef}
          className="signature-dishes__track-container"
          onScroll={handleMobileScroll}
        >
          <div ref={trackRef} className="signature-dishes__track">
            {featuredDishes.map((dish, idx) => {
              const category = MENU_CATEGORIES.find(c => c.id === dish.categoryId)
              const imgSrc = dish.image?.srcSmall || category?.fallbackImage.srcSmall || ''
              const imgAlt = dish.image?.alt || `${dish.name} — Pure Vegetarian Dining at Hestiia`

              const isCentered = isMobile && activeMobileIndex === idx
              const scaleClass = isMobile
                ? isCentered
                  ? 'signature-dish-card-wrap--center'
                  : 'signature-dish-card-wrap--neighbor'
                : ''

              return (
                <div
                  key={dish.id}
                  className={`signature-dish-card-wrap ${scaleClass}`}
                >
                  <div className="dish-teaser-card">
                    {/* Dish Image + Badges */}
                    <div className="dish-card__img-wrap">
                      {imgSrc && (
                        <img
                          src={imgSrc}
                          alt={imgAlt}
                          loading="lazy"
                          decoding="async"
                          className="dish-card__img signature-card__img-parallax"
                        />
                      )}

                      {/* Top Badges */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          zIndex: 2,
                        }}
                      >
                        {/* Pure Veg Mark with soft pulsing dot */}
                        <div className="veg-mark" title="100% Pure Vegetarian">
                          <div className="veg-mark__dot" />
                        </div>

                        {/* Popular Ribbon with ShinyText */}
                        <div className="popular-ribbon">
                          <Sparkles size={11} color="var(--color-brass)" />
                          <ShinyText text="Popular" speed={3.5} />
                        </div>
                      </div>

                      {/* Price Badge with drawing underline on hover */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          zIndex: 2,
                        }}
                      >
                        <div className="dish-card__price-badge">
                          <span>₹{dish.price}</span>
                          <span className="dish-card__price-underline" />
                        </div>
                      </div>
                    </div>

                    {/* Dish Details */}
                    <div className="dish-card__content">
                      <div>
                        <h3 className="dish-card__name">
                          {dish.name}
                        </h3>
                        <p className="dish-card__desc">
                          {dish.description}
                        </p>
                      </div>

                      {/* View Dish Button with Magnet + ClickSpark + TapScale */}
                      <div style={{ marginTop: '18px' }}>
                        <Magnet disabled={isMobile} strength={0.2} padding={20}>
                          <ClickSpark sparkColor="var(--color-brass, #B89A64)" sparkCount={8}>
                            <TapScale scale={0.95}>
                              <Link
                                to={`/menu/${dish.slug}`}
                                className="dish-card__btn"
                                aria-label={`View ${dish.name} details`}
                              >
                                <span>View dish</span>
                                <ArrowRight size={12} className="dish-btn-arrow" />
                              </Link>
                            </TapScale>
                          </ClickSpark>
                        </Magnet>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
