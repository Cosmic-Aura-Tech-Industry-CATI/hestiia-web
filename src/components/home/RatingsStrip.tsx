import { useEffect, useRef, useState, useCallback } from 'react'
import { RATINGS } from '../../content/ratings'
import { Star, ShieldCheck, MapPin, ArrowRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CountUp from '../reactbits/CountUp'
import ShinyText from '../reactbits/ShinyText'
import DrawLine from '../reactbits/DrawLine'
import './ratings-strip.css'

gsap.registerPlugin(ScrollTrigger)

export default function RatingsStrip() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsWrapRef = useRef<HTMLDivElement>(null)
  const [centeredIndex, setCenteredIndex] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  // Detect mobile width for scroll-snap scale logic
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Calculate centered card on mobile scroll-snap
  const handleScroll = useCallback(() => {
    if (!isMobile || !cardsWrapRef.current) return

    const container = cardsWrapRef.current
    const containerCenter = container.scrollLeft + container.clientWidth / 2
    const cards = container.querySelectorAll<HTMLElement>('.ratings-card')

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

    setCenteredIndex(closestIdx)
  }, [isMobile])

  // Scroll entrance with GSAP matchMedia
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cards = section.querySelectorAll('.ratings-card')
    const meta = section.querySelector('.ratings-strip__meta')
    const allLink = section.querySelector('.ratings-strip__all-link')

    if (isReduced) {
      gsap.set([cards, meta, allLink], { opacity: 1, y: 0 })
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
            start: 'top 90%',
            once: true,
          },
        })

        tl.from(meta, {
          opacity: 0,
          y: isDesktop ? 12 : 8,
          duration: isDesktop ? 0.7 : 0.5,
          ease: 'power3.out',
        })
          .from(
            cards,
            {
              opacity: 0,
              y: isDesktop ? 16 : 10,
              stagger: isDesktop ? 0.06 : 0.04,
              duration: isDesktop ? 0.7 : 0.5,
              ease: 'power3.out',
            },
            '-=0.4'
          )
          .from(
            allLink,
            {
              opacity: 0,
              x: 8,
              duration: 0.5,
              ease: 'power3.out',
            },
            '-=0.3'
          )
      }
    )

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="ratings-strip"
      aria-label="Guest Ratings & Certifications"
    >
      {/* Top gold line draws across */}
      <DrawLine color="rgba(184, 154, 100, 0.4)" height="1px" origin="left" duration={1.2} />

      <div className="container" style={{ paddingTop: '8px', paddingBottom: '4px' }}>
        <div className="ratings-strip__container">
          {/* Certification & City Badge */}
          <div className="ratings-strip__meta">
            <div className="ratings-strip__badge">
              <ShieldCheck size={16} color="#2F7D4F" />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--color-veg, #2F7D4F)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                100% Pure Vegetarian
              </span>
            </div>

            <div className="ratings-strip__divider" />

            <div className="ratings-strip__badge">
              <MapPin size={14} color="var(--color-brass, #B89A64)" />
              <span
                style={{
                  fontSize: '12px',
                  color: 'rgba(246, 239, 228, 0.7)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Shyam Nagar, Kanpur
              </span>
            </div>
          </div>

          {/* Platform Scores & Links */}
          <div
            ref={cardsWrapRef}
            className="ratings-strip__cards-wrap"
            onScroll={handleScroll}
          >
            {RATINGS.map((item, idx) => {
              const hasScore = item.score !== null
              const isCentered = isMobile && centeredIndex === idx
              const scaleClass = isMobile
                ? isCentered
                  ? 'ratings-card--scale-center'
                  : 'ratings-card--scale-neighbor'
                : ''

              if (hasScore) {
                return (
                  <a
                    key={item.platform}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`ratings-card ${scaleClass}`}
                    aria-label={`${item.platform} rating: ${item.score?.toFixed(1)} out of 5`}
                  >
                    <Star size={13} fill="var(--color-brass, #B89A64)" stroke="var(--color-brass, #B89A64)" />
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: 'var(--color-text-inverse, #F6EFE4)',
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      <CountUp to={item.score!} decimals={1} duration={1.2} />
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 500 }}>
                      <ShinyText text={item.platform} />
                    </span>
                    {item.count && (
                      <span
                        style={{
                          fontSize: '11px',
                          color: 'rgba(184, 154, 100, 0.75)',
                          fontFamily: 'var(--font-sans)',
                        }}
                      >
                        (<CountUp to={item.count} decimals={0} duration={1.4} />)
                      </span>
                    )}
                    <span className="ratings-card__underline" />
                  </a>
                )
              }

              // Platform with null score: "View rating" link with arrow nudge
              return (
                <a
                  key={item.platform}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ratings-card ${scaleClass}`}
                  aria-label={`View rating on ${item.platform}`}
                >
                  <span style={{ fontSize: '12px', fontWeight: 500 }}>
                    <ShinyText text={item.platform} />
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      color: 'var(--color-brass, #B89A64)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                    }}
                  >
                    View rating
                    <ExternalLink size={11} className="arrow-nudge" />
                  </span>
                  <span className="ratings-card__underline" />
                </a>
              )
            })}

            {/* Link to All Reviews */}
            <Link
              to="/reviews"
              className="ratings-strip__all-link"
              aria-label="View all guest reviews"
            >
              <span>All Reviews</span>
              <ArrowRight size={12} className="arrow-nudge" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
