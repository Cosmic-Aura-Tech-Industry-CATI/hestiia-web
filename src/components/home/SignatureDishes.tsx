import { useEffect, useRef } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { POPULAR_DISHES, MENU_CATEGORIES } from '../../content/menu'
import ShinyText from '../reactbits/ShinyText'
import Button from '../ui/Button'
import SnapCarousel from './SnapCarousel'
import { useCart } from '../../context/CartContext'
import { useDeviceMotion } from '../../hooks/useDeviceMotion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './signature-dishes.css'

gsap.registerPlugin(ScrollTrigger)

export default function SignatureDishes() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const trackContainerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const { addToCart } = useCart()
  const { isDesktop, isTouch } = useDeviceMotion()

  const featuredDishes = POPULAR_DISHES.slice(0, 6)

  // GSAP: Pinning on desktop ONLY when min-width: 1024px AND min-height: 640px
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

    mm.add('(min-width: 1024px) and (min-height: 640px) and (hover: hover)', () => {
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
          x: -32,
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

  const renderDishCards = () =>
    featuredDishes.map((dish) => {
      const category = MENU_CATEGORIES.find(c => c.id === dish.categoryId)
      const imgSrc = dish.image?.srcSmall || category?.fallbackImage.srcSmall || ''
      const imgAlt = dish.image?.alt || `${dish.name} — Pure Vegetarian Dining at Hestiia`

      return (
        <div key={dish.id} className="signature-dish-card-wrap">
          <div className="dish-teaser-card card">
            {/* 1. Dish Image on top (clean: only Popular ribbon & veg mark) */}
            <div className="dish-card__img-wrap card__img-wrap card__img-wrap--wide">
              {imgSrc && (
                <img
                  src={imgSrc}
                  alt={imgAlt}
                  loading="lazy"
                  decoding="async"
                  className="dish-card__img signature-card__img-parallax card__img"
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
            </div>

            {/* 2. Dish Details on solid card surface */}
            <div className="dish-card__content card__body">
              <div className="dish-card__header-row">
                <h3 className="h-card dish-card__name">
                  {dish.name}
                </h3>
                <span className="dish-card__price">
                  ₹{dish.price}
                </span>
              </div>

              <p className="dish-card__desc">
                {dish.description}
              </p>

              {/* Actions row pinned to bottom (View + Add to cart) */}
              <div className="dish-card__actions card__actions">
                <Button
                  to={`/menu/${dish.slug}`}
                  variant="ghost"
                  size="md"
                  icon={<ArrowRight size={13} />}
                  iconPosition="right"
                  aria-label={`View details for ${dish.name}`}
                >
                  View
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={() =>
                    addToCart({
                      id: dish.id,
                      name: dish.name,
                      price: dish.price,
                      image: imgSrc,
                      isVeg: true,
                    })
                  }
                  aria-label={`Add ${dish.name} to cart`}
                >
                  Add +
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    })

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="signature-dishes-section section-dark"
      aria-labelledby="signature-dishes-title"
    >
      <div className="signature-dishes__pinned-layout">
        {/* Left Column: Heading, Copy, Button & Progress Bar */}
        <div className="signature-dishes__left-col">
          <span className="eyebrow" style={{ marginBottom: '16px' }}>
            Signatures of Hestiia
          </span>

          <h2
            id="signature-dishes-title"
            className="h-section"
            style={{ margin: '0 0 16px 0' }}
          >
            Crafted with Heritage <em className="accent">Spices</em>.
          </h2>

          <p
            className="lead"
            style={{ margin: '0 0 24px 0', maxWidth: '360px' }}
          >
            Slow-simmered in cold-pressed oils, churned fresh dairy, and hand-ground aromatics for an authentic pure vegetarian feast.
          </p>

          <Button
            to="/menu"
            variant="primary"
            size="lg"
            icon={<ArrowRight size={14} />}
            iconPosition="right"
            aria-label="See full menu with 193 dishes"
          >
            See Full Menu (193 Dishes)
          </Button>

          {/* Desktop Scroll Progress Indicator */}
          <div className="signature-progress" aria-hidden="true">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                fontFamily: 'var(--font-sans)',
                color: 'rgba(184, 154, 100, 0.8)',
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

        {/* Right Track: Horizontal Slide on Desktop Pinned / SnapCarousel on Mobile/Tablet */}
        <div
          ref={trackContainerRef}
          className="signature-dishes__track-container"
        >
          {isDesktop && !isTouch ? (
            <div ref={trackRef} className="signature-dishes__track">
              {renderDishCards()}
            </div>
          ) : (
            <SnapCarousel
              itemCount={featuredDishes.length}
              ariaLabel="Featured Signature Dishes"
              desktopWrapperClassName="signature-dishes__track"
            >
              {renderDishCards()}
            </SnapCarousel>
          )}
        </div>
      </div>
    </section>
  )
}
