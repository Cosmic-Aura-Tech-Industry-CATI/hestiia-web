import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CUISINES } from '../../content/cuisines'

export default function CuisinesTeaser() {
  return (
    <section
      className="cuisines-teaser section section-dark"
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
              Culinary Spectrum
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
              Four Dedicated Culinary Disciplines.
            </h2>
          </div>

          <Link
            to="/cuisines"
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
              transition: 'opacity 0.2s',
            }}
          >
            <span>Explore All Cuisines</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4 Small Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}
        >
          {CUISINES.map(item => (
            <Link
              key={item.id}
              to="/cuisines"
              style={{
                backgroundColor: 'rgba(38, 31, 26, 0.75)',
                borderRadius: '12px',
                border: '1px solid rgba(184, 154, 100, 0.18)',
                overflow: 'hidden',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, border-color 0.25s ease',
              }}
              className="cuisine-teaser-card"
            >
              <div style={{ position: 'relative', width: '100%', paddingTop: '60%', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={`${item.title} at Hestiia Restaurant`}
                  loading="lazy"
                  decoding="async"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-brass)',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    {item.subtitle}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '20px',
                      color: 'var(--color-text-inverse)',
                      margin: '0 0 10px 0',
                    }}
                  >
                    {item.title}
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
                    {item.description}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    color: 'var(--color-brass-light)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  <span>Learn more</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
