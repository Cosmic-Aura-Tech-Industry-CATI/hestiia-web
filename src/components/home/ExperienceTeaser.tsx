import { Link } from 'react-router-dom'
import { ArrowRight, Users, Music, HeartHandshake } from 'lucide-react'

export default function ExperienceTeaser() {
  const cards = [
    {
      id: 'family-dining',
      title: 'Family Dining Sanctuary',
      badge: 'Certified Pure Veg',
      badgeColor: '#2F7D4F',
      description: 'Generous table layouts, warm acoustic pacing, and dedicated hospitality designed for relaxed family dinners and celebrations.',
      icon: HeartHandshake,
    },
    {
      id: 'private-dining',
      title: 'Private Dining Space',
      badge: 'Ask us',
      badgeColor: 'var(--color-brass)',
      description: 'Dedicated private dining area for birthday banquets, intimate anniversaries, and family get-togethers.',
      icon: Users,
    },
    {
      id: 'live-music',
      title: 'Acoustic Evenings',
      badge: 'Ask us',
      badgeColor: 'var(--color-brass)',
      description: 'Mellow acoustic performances and soothing soundscapes during select weekend dinner gatherings.',
      icon: Music,
    },
  ]

  return (
    <section
      className="experience-teaser section section-dark"
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
              The Hestiia Experience
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
              Hospitality Beyond the Plate.
            </h2>
          </div>

          <Link
            to="/about#experience"
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
            <span>Explore The Experience</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 3 Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {cards.map(card => {
            const Icon = card.icon
            return (
              <div
                key={card.id}
                style={{
                  backgroundColor: 'rgba(38, 31, 26, 0.75)',
                  borderRadius: '12px',
                  border: '1px solid rgba(184, 154, 100, 0.18)',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(184, 154, 100, 0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={20} color="var(--color-brass)" />
                    </div>

                    <span
                      style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(31, 26, 22, 0.8)',
                        border: `1px solid ${card.badgeColor}`,
                        color: card.badgeColor,
                      }}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '22px',
                      color: 'var(--color-text-inverse)',
                      margin: '0 0 10px 0',
                    }}
                  >
                    {card.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      lineHeight: 1.65,
                      color: 'rgba(246, 239, 228, 0.7)',
                      margin: 0,
                    }}
                  >
                    {card.description}
                  </p>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <Link
                    to="/about#experience"
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-brass)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>Read details</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
