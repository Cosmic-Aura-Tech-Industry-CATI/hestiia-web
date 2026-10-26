import { Link } from 'react-router-dom'
import { MapPin, Clock, Phone, MessageSquare, Navigation, Calendar, ArrowRight } from 'lucide-react'
import { RESTAURANT } from '../../content/restaurant'

export default function VisitTeaser() {
  return (
    <section
      className="visit-teaser section section-dark"
      style={{
        padding: 'clamp(56px, 8vw, 88px) 0',
        backgroundColor: '#1F1A16',
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
            marginBottom: '36px',
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
              Sanctuary Location
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
              Join Us in Shyam Nagar.
            </h2>
          </div>

          <Link
            to="/contact"
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
            <span>Full Location & Booking</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Small Static Card */}
        <div
          style={{
            backgroundColor: 'rgba(38, 31, 26, 0.75)',
            borderRadius: '12px',
            border: '1px solid rgba(184, 154, 100, 0.22)',
            padding: 'clamp(24px, 4vw, 36px)',
            maxWidth: '920px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '28px',
              marginBottom: '32px',
            }}
          >
            {/* Address */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(184, 154, 100, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <MapPin size={18} color="var(--color-brass)" />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-inverse)', marginBottom: '4px' }}>
                  Sanctuary Address
                </strong>
                <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, color: 'rgba(246, 239, 228, 0.75)' }}>
                  {RESTAURANT.address.fullDisplay}
                </p>
              </div>
            </div>

            {/* Hours & Dining */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(184, 154, 100, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Clock size={18} color="var(--color-brass)" />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-inverse)', marginBottom: '4px' }}>
                  Dining Hours
                </strong>
                <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, color: 'rgba(246, 239, 228, 0.75)' }}>
                  {RESTAURANT.hours.displayText}
                </p>
                <span style={{ fontSize: '11px', color: 'var(--color-brass-light)' }}>
                  {RESTAURANT.priceRange}
                </span>
              </div>
            </div>
          </div>

          {/* Action Row: Call, WhatsApp, Directions, Reserve a Table */}
          <div
            style={{
              paddingTop: '24px',
              borderTop: '1px solid rgba(184, 154, 100, 0.15)',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 22px',
                backgroundColor: 'var(--color-brass)',
                color: '#1F1A16',
                borderRadius: '4px',
                fontSize: '12px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              <Calendar size={14} />
              <span>Reserve a Table</span>
            </Link>

            <a
              href={`tel:${RESTAURANT.phone.e164}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 18px',
                backgroundColor: 'rgba(38, 31, 26, 0.8)',
                border: '1px solid rgba(184, 154, 100, 0.25)',
                color: 'var(--color-text-inverse)',
                borderRadius: '4px',
                fontSize: '12px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              <Phone size={14} color="var(--color-brass)" />
              <span>Call {RESTAURANT.phone.display}</span>
            </a>

            <a
              href={RESTAURANT.whatsapp.chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 18px',
                backgroundColor: 'rgba(38, 31, 26, 0.8)',
                border: '1px solid rgba(184, 154, 100, 0.25)',
                color: 'var(--color-text-inverse)',
                borderRadius: '4px',
                fontSize: '12px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              <MessageSquare size={14} color="#25D366" />
              <span>WhatsApp</span>
            </a>

            <a
              href={RESTAURANT.platforms.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 18px',
                backgroundColor: 'rgba(38, 31, 26, 0.8)',
                border: '1px solid rgba(184, 154, 100, 0.25)',
                color: 'var(--color-text-inverse)',
                borderRadius: '4px',
                fontSize: '12px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              <Navigation size={14} color="var(--color-brass)" />
              <span>Directions</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
