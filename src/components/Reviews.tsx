import { ExternalLink, Star } from 'lucide-react'
import { REVIEW_PLATFORMS } from '../content/testimonials'

export default function Reviews() {
  return (
    <section className="reviews-section section" id="reviews" aria-labelledby="reviews-title" style={{ padding: '64px 0', borderTop: '1px solid rgba(184, 154, 100, 0.12)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-brass)', marginBottom: '8px' }}>
            <Star size={16} fill="var(--color-brass)" />
            <Star size={16} fill="var(--color-brass)" />
            <Star size={16} fill="var(--color-brass)" />
            <Star size={16} fill="var(--color-brass)" />
            <Star size={16} fill="var(--color-brass)" />
          </div>
          <h2
            id="reviews-title"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 3vw, 42px)',
              fontWeight: 300,
              color: 'var(--color-text-inverse)',
              margin: '0 0 12px',
            }}
          >
            Verified Guest Impressions
          </h2>
          <p style={{ maxWidth: '480px', margin: '0 auto', fontSize: '14px', color: 'rgba(246, 239, 228, 0.65)' }}>
            We invite you to read unfiltered, genuine reviews directly on Google, Zomato, and EazyDiner.
          </p>
        </div>

        {/* Review Platform Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
          }}
        >
          {REVIEW_PLATFORMS.map(platform => (
            <a
              key={platform.id}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${platform.label} (opens in new tab)`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '24px',
                backgroundColor: 'rgba(38, 31, 26, 0.7)',
                borderRadius: '8px',
                border: '1px solid rgba(184, 154, 100, 0.18)',
                textDecoration: 'none',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
              className="review-platform-card"
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--color-text-inverse)', margin: 0 }}>
                    {platform.name}
                  </h3>
                  <ExternalLink size={15} color="var(--color-brass)" />
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(246, 239, 228, 0.65)', margin: 0 }}>
                  {platform.note}
                </p>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid rgba(184, 154, 100, 0.1)' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-brass)' }}>
                  View Live Reviews →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
