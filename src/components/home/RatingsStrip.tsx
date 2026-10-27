import { useEffect, useRef } from 'react'
import { RATINGS } from '../../content/ratings'
import { Star, ShieldCheck, MapPin, ArrowRight, ExternalLink } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CountUp from '../reactbits/CountUp'
import ShinyText from '../reactbits/ShinyText'
import DrawLine from '../reactbits/DrawLine'
import Button from '../ui/Button'
import SnapCarousel from './SnapCarousel'
import { useScrollRefresh } from './useScrollRefresh'
import './ratings-strip.css'

gsap.registerPlugin(ScrollTrigger)

export default function RatingsStrip() {
  const sectionRef = useRef<HTMLElement>(null)
  useScrollRefresh()

  // Scroll entrance with GSAP matchMedia
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cards = section.querySelectorAll('.ratings-card')
    const leftBlock = section.querySelector('.ratings-strip__left')
    const actionRow = section.querySelector('.ratings-strip__action-row')

    if (isReduced) {
      gsap.set([cards, leftBlock, actionRow], { opacity: 1, y: 0 })
      return
    }

    const mm = gsap.matchMedia()

    const safetyTimer = setTimeout(() => {
      gsap.set([cards, leftBlock, actionRow], { opacity: 1, y: 0, x: 0, clearProps: 'transform,opacity' })
    }, 1500)

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

        tl.from(leftBlock, {
          opacity: 0,
          y: isDesktop ? 16 : 10,
          duration: isDesktop ? 0.7 : 0.5,
          ease: 'power3.out',
        })
          .from(
            cards,
            {
              opacity: 0,
              y: isDesktop ? 16 : 10,
              stagger: isDesktop ? 0.05 : 0.03,
              duration: isDesktop ? 0.6 : 0.45,
              ease: 'power3.out',
            },
            '-=0.4'
          )
          .from(
            actionRow,
            {
              opacity: 0,
              x: 8,
              duration: 0.5,
              ease: 'power3.out',
            },
            '-=0.2'
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
      className="ratings-strip"
      aria-label="Guest Ratings & Certifications"
    >
      {/* Top gold line draws across */}
      <DrawLine color="rgba(184, 154, 100, 0.35)" height="1px" origin="left" duration={1.2} />

      <div className="home-container">
        <div className="ratings-strip__wrapper">
          {/* Left Block: Certification Badge + Location */}
          <div className="ratings-strip__left">
            <div className="ratings-strip__veg-badge">
              <ShieldCheck size={18} color="#2F7D4F" aria-hidden="true" />
              <span>100% Pure Vegetarian</span>
            </div>

            <div className="ratings-strip__location">
              <MapPin size={15} color="var(--color-brass, #B89A64)" aria-hidden="true" />
              <span>Shyam Nagar, Kanpur</span>
            </div>
          </div>

          {/* Right Block: Platform Cards with SnapCarousel on mobile */}
          <div className="ratings-strip__right">
            <SnapCarousel
              itemCount={RATINGS.length}
              ariaLabel="Verified dining and delivery platform ratings"
              desktopWrapperClassName="ratings-strip__grid"
            >
              {RATINGS.map((item) => {
                const hasScore = item.score !== null

                return (
                  <a
                    key={item.platform}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ratings-card"
                    aria-label={
                      hasScore
                        ? `${item.platform} rating: ${item.score?.toFixed(1)} out of 5 based on ${item.count} reviews`
                        : `View rating on ${item.platform}`
                    }
                  >
                    <span className="ratings-card__platform">
                      <ShinyText text={item.platform} />
                    </span>

                    {hasScore ? (
                      <>
                        <div className="ratings-card__score-wrap">
                          <Star
                            size={14}
                            fill="var(--color-brass, #B89A64)"
                            stroke="var(--color-brass, #B89A64)"
                            aria-hidden="true"
                          />
                          <span className="stat">
                            <CountUp to={item.score!} decimals={1} duration={1.2} />
                          </span>
                        </div>
                        {item.count && (
                          <span className="ratings-card__count">
                            <CountUp to={item.count} decimals={0} duration={1.4} /> reviews
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <span className="ratings-card__action-text">
                          View rating
                          <ExternalLink size={12} aria-hidden="true" />
                        </span>
                        <span className="ratings-card__count">Verified Profile</span>
                      </>
                    )}
                  </a>
                )
              })}
            </SnapCarousel>

            {/* "All reviews →" Link Button (Phase 2 & 3) */}
            <div className="ratings-strip__action-row">
              <Button
                to="/reviews"
                variant="ghost"
                size="md"
                icon={<ArrowRight size={14} />}
                iconPosition="right"
              >
                All Reviews
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
