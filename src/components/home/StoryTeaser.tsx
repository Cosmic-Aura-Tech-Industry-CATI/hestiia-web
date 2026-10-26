import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import interiorImg from '../../assets/images/restaurant_interior.jpg'

export default function StoryTeaser() {
  return (
    <section
      className="story-teaser section section-dark"
      style={{
        padding: 'clamp(56px, 8vw, 88px) 0',
        backgroundColor: '#1F1A16',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
          }}
        >
          {/* 1 Photo */}
          <div
            style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(184, 154, 100, 0.25)',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.55)',
            }}
          >
            <img
              src={interiorImg}
              alt="Hestiia Restaurant Dining Sanctuary Interior in Shyam Nagar, Kanpur"
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                aspectRatio: '4/3',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(31, 26, 22, 0.6) 0%, transparent 60%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* 60-word text + button to /about */}
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
                marginBottom: '12px',
              }}
            >
              Our Philosophy · Kanpur
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 300,
                color: 'var(--color-text-inverse)',
                margin: '0 0 16px 0',
                lineHeight: 1.2,
              }}
            >
              A Sanctuary of Pure Vegetarian Heritage.
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.75,
                color: 'rgba(246, 239, 228, 0.78)',
                marginBottom: '28px',
              }}
            >
              Rooted in Shyam Nagar, Hestiia is a certified pure vegetarian dining sanctuary where slow-simmered culinary traditions meet calm hospitality. Our kitchen honors authentic North Indian recipes, wok-tossed Indo-Chinese specialities, and hand-kneaded tandoori breads, crafted purely with cold-pressed oils, rich dairy, and fresh garden herbs for peaceful family feasts.
            </p>

            <Link
              to="/about"
              className="btn btn-outline"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                border: '1px solid var(--color-brass)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-brass)',
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-brass)'
                e.currentTarget.style.color = '#1F1A16'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'var(--color-brass)'
              }}
            >
              <span>Read Our Story</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
