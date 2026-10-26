import { Leaf, Users, Utensils, Music } from 'lucide-react'
import SpotlightCard from './reactbits/SpotlightCard'
import { SERVICES } from '../content/services'

const iconMap = {
  leaf: Leaf,
  users: Users,
  utensils: Utensils,
  music: Music,
}

export default function DiningExperience() {
  return (
    <section className="experience-section section" id="experience" aria-labelledby="experience-title" style={{ backgroundColor: '#1A1410' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-brass)',
              display: 'block',
              marginBottom: '12px',
            }}
          >
            The Hestiia Experience
          </span>
          <h2
            id="experience-title"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px, 4vw, 54px)',
              fontWeight: 300,
              color: 'var(--color-text-inverse)',
              margin: '0 0 16px',
            }}
          >
            Crafted for Comfort, <br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)' }}>Rooted in Tradition.</em>
          </h2>
          <p style={{ maxWidth: '540px', margin: '0 auto', fontSize: '15px', color: 'rgba(246, 239, 228, 0.7)' }}>
            Every detail — from our strict vegetarian kitchen standards to our private gathering space — is designed around genuine warmth.
          </p>
        </div>

        {/* Services Grid with Spotlight Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon]

            return (
              <SpotlightCard
                key={service.id}
                spotlightColor="rgba(184, 154, 100, 0.18)"
                style={{
                  borderRadius: '12px',
                  backgroundColor: 'rgba(38, 31, 26, 0.85)',
                  border: '1px solid rgba(184, 154, 100, 0.18)',
                  padding: '32px 28px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                  <div>
                    {/* Icon & Counter */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(184, 154, 100, 0.1)',
                          border: '1px solid rgba(184, 154, 100, 0.25)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-brass)',
                        }}
                      >
                        <IconComponent size={22} />
                      </div>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', color: 'rgba(184, 154, 100, 0.5)' }}>
                        0{index + 1}
                      </span>
                    </div>

                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-brass)' }}>
                      {service.tagline}
                    </span>

                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 400, color: 'var(--color-text-inverse)', margin: '8px 0 12px' }}>
                      {service.title}
                    </h3>

                    <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(246, 239, 228, 0.7)', margin: 0 }}>
                      {service.description}
                    </p>
                  </div>

                  {service.note && (
                    <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(184, 154, 100, 0.12)' }}>
                      <p style={{ fontSize: '12px', fontStyle: 'italic', color: 'rgba(246, 239, 228, 0.5)', margin: 0 }}>
                        {service.note}
                      </p>
                    </div>
                  )}
                </div>
              </SpotlightCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
