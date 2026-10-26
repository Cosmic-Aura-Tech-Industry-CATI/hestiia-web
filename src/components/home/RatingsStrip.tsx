import { RATINGS } from '../../content/ratings'
import { Star, ShieldCheck, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function RatingsStrip() {
  const scoredRatings = RATINGS.filter(r => r.score !== null)

  return (
    <section
      className="ratings-strip"
      aria-label="Guest Ratings & Certifications"
      style={{
        backgroundColor: '#17120E',
        borderTop: '1px solid rgba(184, 154, 100, 0.15)',
        borderBottom: '1px solid rgba(184, 154, 100, 0.15)',
        padding: '16px 0',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {/* Certification & City Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={16} color="#2F7D4F" />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-veg)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              100% Pure Vegetarian
            </span>
          </div>

          <div style={{ width: '1px', height: '14px', backgroundColor: 'rgba(184, 154, 100, 0.25)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={14} color="var(--color-brass)" />
            <span style={{ fontSize: '12px', color: 'rgba(246, 239, 228, 0.7)', fontFamily: 'var(--font-sans)' }}>
              Shyam Nagar, Kanpur
            </span>
          </div>
        </div>

        {/* Platform Scores */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {scoredRatings.map(item => (
            <div key={item.platform} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Star size={13} fill="var(--color-brass)" stroke="var(--color-brass)" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-inverse)' }}>
                {item.score?.toFixed(1)}
              </span>
              <span style={{ fontSize: '12px', color: 'rgba(246, 239, 228, 0.65)' }}>
                {item.platform}
              </span>
              {item.count && (
                <span style={{ fontSize: '11px', color: 'rgba(184, 154, 100, 0.75)' }}>
                  ({item.count})
                </span>
              )}
            </div>
          ))}

          <Link
            to="/reviews"
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-brass)',
              textDecoration: 'none',
              marginLeft: '4px',
            }}
          >
            All Reviews →
          </Link>
        </div>
      </div>
    </section>
  )
}
