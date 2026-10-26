import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Star, ExternalLink, ArrowRight } from 'lucide-react'
import { RATINGS } from '../../content/ratings'
import { REVIEW_PLATFORMS } from '../../content/testimonials'
import CountUp from '../reactbits/CountUp'
import ClickSpark from '../reactbits/ClickSpark'
import TapScale from '../reactbits/TapScale'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './reviews-teaser.css'

gsap.registerPlugin(ScrollTrigger)

export default function ReviewsTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [hasInteracted, setHasInteracted] = useState<boolean>(false)
  const autoAdvanceTimerRef = useRef<any>(null)
  const activeMobileIndexRef = useRef<number>(0)

  const scoredRatings = RATINGS.filter((r) => r.score !== null)

  // Track viewport size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // GSAP: Stars fill left to right in sequence + Quote mark scale in & words fade
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const stars = section.querySelectorAll('.star-fill-item')
    const quoteMarks = section.querySelectorAll('.review-quote-mark')
    const words = section.querySelectorAll('.review-quote-word')

    if (isReduced) {
      gsap.set([stars, quoteMarks, words], { opacity: 1, scale: 1, y: 0 })
      return
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        // 1. Stars fill left to right in sequence
        gsap.fromTo(
          stars,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.04,
            duration: 0.45,
            ease: 'back.out(1.8)',
          }
        )

        // 2. Quote marks scale in
        gsap.fromTo(
          quoteMarks,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 0.35,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power3.out',
            delay: 0.2,
          }
        )

        // 3. Text fades word by word on first view
        gsap.fromTo(
          words,
          { opacity: 0.15, y: 4 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.02,
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.3,
          }
        )
      },
    })

    return () => trigger.kill()
  }, [])

  // Desktop slow infinite marquee (pause on hover/touch)
  useEffect(() => {
    const track = trackRef.current
    if (!track || isMobile) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    const tween = gsap.to(track, {
      xPercent: -50,
      ease: 'none',
      duration: 32,
      repeat: -1,
    })

    const handleMouseEnter = () => tween.pause()
    const handleMouseLeave = () => tween.play()

    track.addEventListener('mouseenter', handleMouseEnter)
    track.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      track.removeEventListener('mouseenter', handleMouseEnter)
      track.removeEventListener('mouseleave', handleMouseLeave)
      tween.kill()
    }
  }, [isMobile])

  // Mobile: swipe snap cards, auto-advance every 5s, stops after first touch
  useEffect(() => {
    if (!isMobile || hasInteracted || !containerRef.current) return

    autoAdvanceTimerRef.current = setInterval(() => {
      if (!containerRef.current) return
      const cards = containerRef.current.querySelectorAll<HTMLElement>('.review-quote-card-wrap')
      if (cards.length === 0) return

      const nextIndex = (activeMobileIndexRef.current + 1) % cards.length
      activeMobileIndexRef.current = nextIndex

      cards[nextIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }, 5000)

    return () => {
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current)
      }
    }
  }, [isMobile, hasInteracted])

  // Stop auto-advance on first touch/interaction
  const handleTouchStart = useCallback(() => {
    setHasInteracted(true)
    if (autoAdvanceTimerRef.current) {
      clearInterval(autoAdvanceTimerRef.current)
    }
  }, [])

  // Duplicate platforms for seamless marquee loop on desktop
  const displayPlatforms = !isMobile
    ? [...REVIEW_PLATFORMS, ...REVIEW_PLATFORMS]
    : REVIEW_PLATFORMS

  return (
    <section
      ref={sectionRef}
      className="reviews-teaser section section-dark section-ambient-glow"
      aria-labelledby="reviews-teaser-title"
    >
      <div className="container">
        {/* Header */}
        <div className="reviews-teaser__header">
          <div>
            <span className="reviews-teaser__eyebrow">
              Public Social Proof
            </span>
            <h2 id="reviews-teaser-title" className="reviews-teaser__title">
              Verified Diner Impressions.
            </h2>
          </div>

          <ClickSpark sparkColor="var(--color-brass, #B89A64)">
            <Link
              to="/reviews"
              className="reviews-teaser__header-link"
              aria-label="Read all verified customer reviews"
            >
              <span>Read All Reviews</span>
              <ArrowRight size={14} className="reviews-header-arrow" />
            </Link>
          </ClickSpark>
        </div>

        {/* Platform Scores Bar with CountUp and sequential star fills */}
        <div className="reviews-scores-grid">
          {scoredRatings.map((item) => (
            <div key={item.platform} className="reviews-score-card">
              <div>
                <span
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    color: 'rgba(246, 239, 228, 0.65)',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {item.platform}
                </span>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
                  <span
                    style={{
                      fontSize: '22px',
                      fontWeight: 700,
                      color: 'var(--color-brass, #B89A64)',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    <CountUp to={item.score!} decimals={1} duration={1.2} />
                  </span>
                  <span style={{ fontSize: '12px', color: 'rgba(246, 239, 228, 0.5)' }}>
                    / {item.outOf}
                  </span>
                </div>

                {/* Stars fill left to right in sequence */}
                <div className="review-stars-wrap">
                  {[...Array(5)].map((_, starIdx) => (
                    <span key={starIdx} className="star-fill-item">
                      <Star
                        size={12}
                        fill="var(--color-brass, #B89A64)"
                        stroke="var(--color-brass, #B89A64)"
                      />
                    </span>
                  ))}
                </div>
              </div>

              {item.count && (
                <span
                  style={{
                    fontSize: '11px',
                    color: 'rgba(184, 154, 100, 0.85)',
                    textAlign: 'right',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  <CountUp to={item.count} decimals={0} duration={1.4} /> {item.countLabel || 'ratings'}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Quote Cards Track (Marquee on desktop, swipe snap on mobile) */}
        <div
          ref={containerRef}
          className="reviews-cards-container"
          onTouchStart={handleTouchStart}
        >
          <div ref={trackRef} className="reviews-cards-track">
            {displayPlatforms.map((platform, idx) => {
              const words = platform.note.split(' ')

              const cardElement = (
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="review-quote-card"
                  aria-label={`Read verified reviews on ${platform.name}`}
                >
                  <div>
                    {/* Quotation mark scales in */}
                    <span className="review-quote-mark" aria-hidden="true">
                      “
                    </span>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '20px',
                          color: 'var(--color-text-inverse, #F6EFE4)',
                          margin: 0,
                        }}
                      >
                        {platform.name}
                      </h3>
                      <ExternalLink size={14} color="var(--color-brass, #B89A64)" />
                    </div>

                    {/* Review text word by word fade */}
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '13px',
                        lineHeight: 1.6,
                        color: 'rgba(246, 239, 228, 0.75)',
                        margin: 0,
                      }}
                    >
                      {words.map((word, wIdx) => (
                        <span key={wIdx} className="review-quote-word">
                          {word}
                        </span>
                      ))}
                    </p>
                  </div>

                  <div
                    style={{
                      marginTop: '20px',
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(184, 154, 100, 0.12)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--color-brass, #B89A64)',
                      }}
                    >
                      Read Verified Reviews →
                    </span>
                  </div>
                </a>
              )

              return (
                <div
                  key={`${platform.id}-${idx}`}
                  className="review-quote-card-wrap"
                >
                  {isMobile ? (
                    <TapScale scale={0.97} style={{ width: '100%', height: '100%' }}>
                      {cardElement}
                    </TapScale>
                  ) : (
                    cardElement
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
