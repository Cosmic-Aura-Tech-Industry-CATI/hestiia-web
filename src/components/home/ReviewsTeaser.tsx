import { Link } from 'react-router-dom'
import { Star, ExternalLink, ArrowRight } from 'lucide-react'
import { RATINGS } from '../../content/ratings'
import { REVIEW_PLATFORMS } from '../../content/testimonials'

export default function ReviewsTeaser() {
  const scoredRatings = RATINGS.filter(r => r.score !== null)

  return (
    <section
      className="reviews-teaser section section-dark"
      style={{
        padding: 'clamp(56px, 8vw, 88px) 0',
        backgroundColor: '#191410',
        borderTop: '1px solid rgba(184, 154, 100, 0.12)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-brass)',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              Public Social Proof
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 300,
                color: 'var(--color-text-inverse)',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Verified Diner Impressions.
            </h2>
          </div>

          <Link
            to="/reviews"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--color-brass)',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            <span>Read All Reviews</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Platform Scores Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          {scoredRatings.map(item => (
            <div
              key={item.platform}
              style={{
                padding: '18px 22px',
                borderRadius: '8px',
                backgroundColor: 'rgba(38, 31, 26, 0.65)',
                border: '1px solid rgba(184, 154, 100, 0.16)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.65)', fontFamily: 'var(--font-sans)' }}>
                  {item.platform}
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
                  <span style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-brass)' }}>
                    {item.score?.toFixed(1)}
                  </span>
                  <span style={{ fontSize: '12px', color: 'rgba(246, 239, 228, 0.5)' }}>
                    / {item.outOf}
                  </span>
                </div>
              </div>
              {item.count && (
                <span style={{ fontSize: '11px', color: 'rgba(184, 154, 100, 0.85)', textAlign: 'right' }}>
                  {item.count.toLocaleString()} {item.countLabel || 'ratings'}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* 3 Review / Discovery Cards from verified platforms */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {REVIEW_PLATFORMS.map(platform => (
            <a
              key={platform.id}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: 'rgba(38, 31, 26, 0.75)',
                borderRadius: '12px',
                border: '1px solid rgba(184, 154, 100, 0.18)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textDecoration: 'none',
                transition: 'border-color 0.25s, transform 0.25s',
              }}
              className="review-quote-card"
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', color: 'var(--color-brass)' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="var(--color-brass)" stroke="var(--color-brass)" />
                    ))}
                  </div>
                  <ExternalLink size={14} color="var(--color-brass)" />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '20px',
                    color: 'var(--color-text-inverse)',
                    margin: '0 0 8px 0',
                  }}
                >
                  {platform.name}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    lineHeight: 1.6,
                    color: 'rgba(246, 239, 228, 0.7)',
                    margin: 0,
                  }}
                >
                  "{platform.note}"
                </p>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid rgba(184, 154, 100, 0.12)' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brass)',
                  }}
                >
                  Read Verified Reviews →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
