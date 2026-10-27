import { useEffect, useRef } from 'react'
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
      <DrawLine color="rgba(184, 154, 100, 0.35)" height="1px" origin="left" duration={1.2} />

      <div className="container">
        <div className="ratings-strip__container">
          {/* Left Group: Certification & Location */}
          <div className="ratings-strip__meta">
            <div className="ratings-strip__badge">
              <ShieldCheck size={16} color="#2F7D4F" aria-hidden="true" />
              <span className="ratings-strip__badge-text">
                100% Pure Vegetarian
              </span>
            </div>

            <div className="ratings-strip__divider" aria-hidden="true" />

            <div className="ratings-strip__badge">
              <MapPin size={14} color="var(--color-brass, #B89A64)" aria-hidden="true" />
              <span className="ratings-strip__badge-location">
                Shyam Nagar, Kanpur
              </span>
            </div>
          </div>

          {/* Right Group: Platform Chips */}
          <div ref={cardsWrapRef} className="ratings-strip__chips">
            {RATINGS.map((item) => {
              const hasScore = item.score !== null

              if (hasScore) {
                return (
                  <a
                    key={item.platform}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ratings-chip ratings-card"
                    aria-label={`${item.platform} rating: ${item.score?.toFixed(1)} out of 5 based on ${item.count} reviews`}
                  >
                    <Star
                      size={13}
                      fill="var(--color-brass, #B89A64)"
                      stroke="var(--color-brass, #B89A64)"
                      aria-hidden="true"
                    />
                    <span className="ratings-chip__score">
                      <CountUp to={item.score!} decimals={1} duration={1.2} />
                    </span>
                    <span className="ratings-chip__platform">
                      <ShinyText text={item.platform} />
                    </span>
                    {item.count && (
                      <span className="ratings-chip__count">
                        (<CountUp to={item.count} decimals={0} duration={1.4} />)
                      </span>
                    )}
                    <span className="ratings-chip__underline" aria-hidden="true" />
                  </a>
                )
              }

              // Platform with null score: consistent chip with "Platform · View rating" and icon
              return (
                <a
                  key={item.platform}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ratings-chip ratings-card ratings-chip--link"
                  aria-label={`View rating on ${item.platform}`}
                >
                  <span className="ratings-chip__platform">
                    <ShinyText text={item.platform} />
                  </span>
                  <span className="ratings-chip__dot" aria-hidden="true">·</span>
                  <span className="ratings-chip__view-action">
                    View rating
                    <ExternalLink size={12} className="arrow-nudge" aria-hidden="true" />
                  </span>
                  <span className="ratings-chip__underline" aria-hidden="true" />
                </a>
              )
            })}

            {/* Action Chip: All Reviews */}
            <Link
              to="/reviews"
              className="ratings-chip ratings-card ratings-chip--all"
              aria-label="View all guest reviews"
            >
              <span>All Reviews</span>
              <ArrowRight size={13} className="arrow-nudge" aria-hidden="true" />
              <span className="ratings-chip__underline" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
