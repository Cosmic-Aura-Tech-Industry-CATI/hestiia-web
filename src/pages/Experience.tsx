import { Link } from 'react-router-dom'
import { Phone, Users, PartyPopper, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import PageClosingCta from '../components/PageClosingCta'
import DiningExperience from '../components/DiningExperience'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { RESTAURANT } from '../content/restaurant'

export default function Experience() {
  useDocumentMeta(
    'Dining Experience & Hospitality',
    'Discover the warm hospitality at Hestiia Restaurant Kanpur. Dedicated family dining, curated ambiance, and private gathering enquiries.'
  )

  const isConfirmed = (serviceName: string) => {
    const s = RESTAURANT.services.find(item => item.name.toLowerCase() === serviceName.toLowerCase())
    return s ? s.confirmed : false
  }

  const pdrConfirmed = isConfirmed('Private dining room')
  const liveMusicConfirmed = isConfirmed('Live music')
  const veganConfirmed = isConfirmed('Vegan options')

  return (
    <>
      <PageHero
        title="Thoughtful"
        accentWord="Hospitality"
        intro="Every element of our dining room in Shyam Nagar is designed for comfort, warmth, and memorable family celebrations."
        currentPage="Experience"
      />

      {/* 1. Core Dining Experience Feature (Imported Unchanged) */}
      <DiningExperience />

      {/* 2. Specific Hospitality Services Cards */}
      <section
        style={{
          padding: '64px 0 80px',
          backgroundColor: '#16110E',
          borderTop: '1px solid rgba(184, 154, 100, 0.15)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
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
              Tailored Amenities & Services
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                fontWeight: 300,
                color: 'var(--color-text-inverse)',
                margin: '0 auto 12px',
              }}
            >
              Dining with <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)' }}>Peace of Mind</em>
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(246, 239, 228, 0.7)', maxWidth: '580px', margin: '0 auto' }}>
              We believe in honest, transparent hospitality. Here is what we offer and how to check on custom arrangements.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Card 1: Private Dining Room */}
            <div
              style={{
                padding: '28px',
                borderRadius: '12px',
                backgroundColor: 'rgba(38, 31, 26, 0.75)',
                border: '1px solid rgba(184, 154, 100, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '20px',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', margin: 0, color: 'var(--color-text-inverse)' }}>
                    Private Dining
                  </h3>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: pdrConfirmed ? 'rgba(52, 168, 83, 0.15)' : 'rgba(184, 154, 100, 0.15)',
                      color: pdrConfirmed ? '#4ADE80' : 'var(--color-brass-light)',
                      border: '1px solid rgba(184, 154, 100, 0.3)',
                    }}
                  >
                    {pdrConfirmed ? 'Available' : 'Ask Us'}
                  </span>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(246, 239, 228, 0.75)', margin: 0 }}>
                  {pdrConfirmed
                    ? 'Dedicated private dining spaces for confidential celebrations, family gatherings, and anniversaries.'
                    : 'Looking for a private dining enclave or secluded family seating? Call our desk to confirm availability for your party date.'}
                </p>
              </div>

              {!pdrConfirmed ? (
                <a
                  href={`tel:${RESTAURANT.phone.e164}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--color-brass)',
                    textDecoration: 'none',
                  }}
                >
                  <Phone size={14} />
                  <span>Call to Check ({RESTAURANT.phone.display})</span>
                </a>
              ) : (
                <Link
                  to="/party"
                  style={{ fontSize: '12px', color: 'var(--color-brass)', textDecoration: 'none', fontWeight: 600 }}
                >
                  View Enclaves & Enquire →
                </Link>
              )}
            </div>

            {/* Card 2: Live Music */}
            <div
              style={{
                padding: '28px',
                borderRadius: '12px',
                backgroundColor: 'rgba(38, 31, 26, 0.75)',
                border: '1px solid rgba(184, 154, 100, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '20px',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', margin: 0, color: 'var(--color-text-inverse)' }}>
                    Live Music
                  </h3>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: liveMusicConfirmed ? 'rgba(52, 168, 83, 0.15)' : 'rgba(184, 154, 100, 0.15)',
                      color: liveMusicConfirmed ? '#4ADE80' : 'var(--color-brass-light)',
                      border: '1px solid rgba(184, 154, 100, 0.3)',
                    }}
                  >
                    {liveMusicConfirmed ? 'Scheduled' : 'Ask Us'}
                  </span>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(246, 239, 228, 0.75)', margin: 0 }}>
                  {liveMusicConfirmed
                    ? 'Acoustic performances and classical instrumental melodies on selected weekend evenings.'
                    : 'Acoustic musical evenings are hosted during special festival occasions. Please contact our desk for this week’s schedule.'}
                </p>
              </div>

              {!liveMusicConfirmed ? (
                <a
                  href={`tel:${RESTAURANT.phone.e164}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--color-brass)',
                    textDecoration: 'none',
                  }}
                >
                  <Phone size={14} />
                  <span>Call to Ask ({RESTAURANT.phone.display})</span>
                </a>
              ) : (
                <span style={{ fontSize: '12px', color: 'var(--color-brass)' }}>Weekend Evenings</span>
              )}
            </div>

            {/* Card 3: Families and Groups */}
            <div
              style={{
                padding: '28px',
                borderRadius: '12px',
                backgroundColor: 'rgba(38, 31, 26, 0.75)',
                border: '1px solid rgba(184, 154, 100, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '20px',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', margin: 0, color: 'var(--color-text-inverse)' }}>
                    Families & Large Groups
                  </h3>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: 'rgba(52, 168, 83, 0.15)',
                      color: '#4ADE80',
                      border: '1px solid rgba(52, 168, 83, 0.3)',
                    }}
                  >
                    Confirmed
                  </span>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(246, 239, 228, 0.75)', margin: 0 }}>
                  Generous 6-to-12 seater family tables, comfortable booth seating, and sharing thali options designed specifically for family celebrations.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-brass-light)' }}>
                <Users size={15} />
                <span style={{ fontSize: '12px', fontWeight: 500 }}>Groups up to 25+ welcome</span>
              </div>
            </div>

            {/* Card 4: Vegan Options */}
            <div
              style={{
                padding: '28px',
                borderRadius: '12px',
                backgroundColor: 'rgba(38, 31, 26, 0.75)',
                border: '1px solid rgba(184, 154, 100, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '20px',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', margin: 0, color: 'var(--color-text-inverse)' }}>
                    Vegan Adaptations
                  </h3>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: veganConfirmed ? 'rgba(52, 168, 83, 0.15)' : 'rgba(184, 154, 100, 0.15)',
                      color: veganConfirmed ? '#4ADE80' : 'var(--color-brass-light)',
                      border: '1px solid rgba(184, 154, 100, 0.3)',
                    }}
                  >
                    {veganConfirmed ? 'Available' : 'Ask Us'}
                  </span>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(246, 239, 228, 0.75)', margin: 0 }}>
                  {veganConfirmed
                    ? 'Dedicated dairy-free and plant-based curries cooked strictly without ghee or paneer.'
                    : 'While all our food is pure vegetarian, many dishes use dairy/ghee. Our kitchen will happily adapt specific preparations upon request.'}
                </p>
              </div>

              {!veganConfirmed ? (
                <a
                  href={`tel:${RESTAURANT.phone.e164}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--color-brass)',
                    textDecoration: 'none',
                  }}
                >
                  <Phone size={14} />
                  <span>Call to Inquire ({RESTAURANT.phone.display})</span>
                </a>
              ) : (
                <span style={{ fontSize: '12px', color: 'var(--color-brass)' }}>Plant-based options available</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Party & Celebration CTA Banner */}
      <section
        style={{
          padding: '48px 0',
          backgroundColor: '#1C1612',
          borderTop: '1px solid rgba(184, 154, 100, 0.2)',
        }}
      >
        <div className="container">
          <div
            style={{
              padding: '36px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(46, 36, 29, 0.9) 0%, rgba(31, 26, 22, 0.95) 100%)',
              border: '1px solid rgba(184, 154, 100, 0.3)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <PartyPopper size={20} color="var(--color-brass)" />
                <span
                  style={{
                    fontSize: '12px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brass)',
                  }}
                >
                  Celebrations & Gatherings
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '26px',
                  fontWeight: 300,
                  color: 'var(--color-text-inverse)',
                  margin: '0 0 6px',
                }}
              >
                Planning a Birthday, Kitty Party, or Family Gathering?
              </h3>
              <p style={{ fontSize: '14px', color: 'rgba(246, 239, 228, 0.75)', margin: 0, maxWidth: '580px' }}>
                We curate customized pure vegetarian buffet spreads, dedicated seating, and warm hospitality for groups.
              </p>
            </div>

            <Link
              to="/party"
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
                whiteSpace: 'nowrap',
              }}
            >
              <span>Explore Party Enquiries</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Closing CTA Band */}
      <PageClosingCta
        title="Reserve Your Gathering with"
        accentWord="Us"
        subtitle="Call directly or reserve your table in advance for prompt seating at our Shyam Nagar sanctuary."
      />
    </>
  )
}
