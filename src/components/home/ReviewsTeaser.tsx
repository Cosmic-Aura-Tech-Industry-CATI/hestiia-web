import { useEffect, useRef } from 'react'
import { Star, ExternalLink, ArrowRight } from 'lucide-react'
import { RATINGS } from '../../content/ratings'
import { REVIEW_PLATFORMS } from '../../content/testimonials'
import CountUp from '../reactbits/CountUp'
import ClickSpark from '../reactbits/ClickSpark'
import TapScale from '../reactbits/TapScale'
import Button from '../ui/Button'
import SnapCarousel from './SnapCarousel'
import { useDeviceMotion } from '../../hooks/useDeviceMotion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './reviews-teaser.css'

gsap.registerPlugin(ScrollTrigger)

export default function ReviewsTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const { isMobile, isTouch } = useDeviceMotion()

  const scoredRatings = RATINGS.filter((r) => r.score !== null)
  const displayPlatforms = REVIEW_PLATFORMS.slice(0, 3)

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

    const safetyTimer = setTimeout(() => {
      gsap.set([stars, quoteMarks, words], { opacity: 1, scale: 1, y: 0, clearProps: 'transform,opacity' })
    }, 1500)

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        clearTimeout(safetyTimer)
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
            clearProps: 'transform,opacity',
          }
        )
      },
    })

    return () => {
      clearTimeout(safetyTimer)
      trigger.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="reviews-teaser home-section section-dark"
      aria-labelledby="reviews-teaser-title"
    >
      <div className="home-container">
        {/* Header */}
        <div className="reviews-teaser__header">
          <div>
            <span className="eyebrow reviews-teaser__eyebrow">
              Public Social Proof
            </span>
            <h2 id="reviews-teaser-title" className="h-section reviews-teaser__title">
              Verified Diner <em className="accent">Impressions</em>.
            </h2>
          </div>

          <ClickSpark sparkColor="var(--color-brass, #B89A64)">
            <Button
              to="/reviews"
              variant="secondary"
              size="md"
              icon={<ArrowRight size={14} />}
              iconPosition="right"
              aria-label="Read all verified customer reviews"
            >
              Read All Reviews
            </Button>
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
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'rgba(246, 239, 228, 0.75)',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {item.platform}
                </span>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px' }}>
                  <span
                    className="stat"
                    style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      color: 'var(--color-brass, #B89A64)',
                    }}
                  >
                    <CountUp to={item.score!} decimals={1} duration={1.2} />
                  </span>
                  <span style={{ fontSize: '13px', color: 'rgba(246, 239, 228, 0.6)' }}>
                    / {item.outOf}
                  </span>
                </div>

                {/* Stars fill left to right in sequence */}
                <div className="review-stars-wrap">
                  {[...Array(5)].map((_, starIdx) => (
                    <span key={starIdx} className="star-fill-item">
                      <Star
                        size={13}
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
                    fontSize: '12px',
                    color: 'rgba(184, 154, 100, 0.9)',
                    textAlign: 'right',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                  }}
                >
                  <CountUp to={item.count} decimals={0} duration={1.4} /> {item.countLabel || 'ratings'}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Quote Cards Track (Desktop 3-col grid, SnapCarousel below 1024px) */}
        <SnapCarousel
          itemCount={displayPlatforms.length}
          ariaLabel="Verified Diner Impressions Carousel"
          desktopWrapperClassName="reviews-cards-track grid-three-col"
        >
          {displayPlatforms.map((platform, idx) => {
            const words = platform.note.split(' ')

            const cardElement = (
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="review-quote-card card"
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
                      marginBottom: '12px',
                    }}
                  >
                    <h3 className="h-card" style={{ margin: 0 }}>
                      {platform.name}
                    </h3>
                    <ExternalLink size={15} color="var(--color-brass, #B89A64)" />
                  </div>

                  {/* Review text word by word fade */}
                  <p
                    className="body"
                    style={{
                      margin: 0,
                      lineHeight: 1.65,
                      color: 'rgba(246, 239, 228, 0.82)',
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
                  className="card__actions"
                  style={{
                    marginTop: '20px',
                    paddingTop: '14px',
                    borderTop: '1px solid rgba(184, 154, 100, 0.14)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-brass, #B89A64)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
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
                {isMobile || isTouch ? (
                  <TapScale scale={0.97} style={{ width: '100%', height: '100%' }}>
                    {cardElement}
                  </TapScale>
                ) : (
                  cardElement
                )}
              </div>
            )
          })}
        </SnapCarousel>
      </div>
    </section>
  )
}
