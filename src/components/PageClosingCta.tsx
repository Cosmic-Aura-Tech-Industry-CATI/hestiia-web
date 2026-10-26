import { Link } from 'react-router-dom'
import { Phone, MessageSquare, Calendar } from 'lucide-react'
import { RESTAURANT } from '../content/restaurant'

interface PageClosingCtaProps {
  title?: string
  accentWord?: string
  subtitle?: string
}

export default function PageClosingCta({
  title = 'Join Us at the',
  accentWord = 'Sanctuary',
  subtitle = 'Experience authentic pure vegetarian dining in Shyam Nagar, Kanpur. Reserve your table or contact our team directly.',
}: PageClosingCtaProps) {
  return (
    <section
      aria-label="Reservation and Contact CTA"
      style={{
        backgroundColor: '#16110E',
        borderTop: '1px solid rgba(184, 154, 100, 0.2)',
        borderBottom: '1px solid rgba(184, 154, 100, 0.1)',
        padding: '64px 0',
      }}
    >
      <div className="container" style={{ textAlign: 'center' }}>
        <span
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-brass)',
            marginBottom: '12px',
          }}
        >
          Hospitality & Reservations
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 300,
            color: 'var(--color-text-inverse)',
            margin: '0 auto 16px',
            maxWidth: '650px',
            lineHeight: 1.2,
          }}
        >
          {title} <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)' }}>{accentWord}</em>
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            lineHeight: 1.7,
            color: 'rgba(246, 239, 228, 0.7)',
            maxWidth: '560px',
            margin: '0 auto 32px',
          }}
        >
          {subtitle}
        </p>

        {/* Action Buttons: Reserve / Call / WhatsApp */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          {/* Reserve a Table */}
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '6px',
              backgroundColor: 'var(--color-brass)',
              color: '#1F1A16',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(184, 154, 100, 0.25)',
              transition: 'background-color 0.2s ease, transform 0.2s ease',
            }}
          >
            <Calendar size={16} />
            <span>Reserve a Table</span>
          </Link>

          {/* Call Direct */}
          <a
            href={`tel:${RESTAURANT.phone.e164}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: '6px',
              backgroundColor: 'rgba(38, 31, 26, 0.8)',
              border: '1px solid rgba(184, 154, 100, 0.35)',
              color: 'var(--color-text-inverse)',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'border-color 0.2s ease',
            }}
          >
            <Phone size={15} color="var(--color-brass)" />
            <span>Call {RESTAURANT.phone.display}</span>
          </a>

          {/* WhatsApp Direct */}
          <a
            href={RESTAURANT.whatsapp.chatUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: '6px',
              backgroundColor: 'rgba(37, 211, 102, 0.12)',
              border: '1px solid rgba(37, 211, 102, 0.35)',
              color: '#4ADE80',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'background-color 0.2s ease',
            }}
          >
            <MessageSquare size={15} color="#25D366" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  )
}
