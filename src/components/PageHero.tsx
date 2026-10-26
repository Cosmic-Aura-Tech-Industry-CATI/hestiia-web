import { Link } from 'react-router-dom'
import BlurText from './reactbits/BlurText'

interface PageHeroProps {
  eyebrow?: string
  title: string
  accentWord?: string
  intro: string
  currentPage: string
  breadcrumbs?: { label: string; path?: string }[]
}

export default function PageHero({
  eyebrow = 'Pure Vegetarian Sanctuary · Kanpur',
  title,
  accentWord,
  intro,
  currentPage,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section
      className="page-hero"
      style={{
        backgroundColor: '#1F1A16',
        borderBottom: '1px solid rgba(184, 154, 100, 0.15)',
        paddingTop: 'calc(var(--header-height) + clamp(24px, 4vw, 40px))',
        paddingBottom: 'clamp(28px, 4vw, 48px)',
        color: 'var(--color-text-inverse)',
      }}
    >
      <div className="container">
        {/* Breadcrumb (Home / Page) */}
        <nav aria-label="Breadcrumbs" style={{ marginBottom: '16px' }}>
          <ol
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              fontSize: '11px',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'rgba(246, 239, 228, 0.55)',
            }}
          >
            <li>
              <Link
                to="/"
                style={{
                  color: 'var(--color-brass)',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            {breadcrumbs ? (
              breadcrumbs.map((b, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {b.path ? (
                    <Link to={b.path} style={{ color: 'var(--color-brass)', textDecoration: 'none' }}>
                      {b.label}
                    </Link>
                  ) : (
                    <span aria-current="page" style={{ color: 'rgba(246, 239, 228, 0.85)' }}>
                      {b.label}
                    </span>
                  )}
                  {idx < breadcrumbs.length - 1 && <span aria-hidden="true">/</span>}
                </li>
              ))
            ) : (
              <li aria-current="page" style={{ color: 'rgba(246, 239, 228, 0.85)' }}>
                {currentPage}
              </li>
            )}
          </ol>
        </nav>

        {/* Small Gold Label */}
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-brass)',
            marginBottom: '8px',
          }}
        >
          {eyebrow}
        </span>

        {/* Big Serif Title with Italic Gold Accent Word */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(32px, 5.5vw, 56px)',
            fontWeight: 300,
            lineHeight: 1.15,
            color: 'var(--color-text-inverse)',
            margin: '0 0 12px 0',
          }}
        >
          <BlurText text={title} delay={40} animateBy="words" direction="top" />
          {accentWord && (
            <span
              style={{
                fontStyle: 'italic',
                color: 'var(--color-brass)',
                marginLeft: '0.3em',
                fontWeight: 400,
              }}
            >
              {accentWord}
            </span>
          )}
        </h1>

        {/* One-Line Intro */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(13px, 1.4vw, 15px)',
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'rgba(246, 239, 228, 0.75)',
            maxWidth: '760px',
            margin: 0,
          }}
        >
          {intro}
        </p>
      </div>
    </section>
  )
}
