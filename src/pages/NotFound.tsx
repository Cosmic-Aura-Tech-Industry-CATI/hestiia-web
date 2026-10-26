import PageHero from '../components/PageHero'
import PageClosingCta from '../components/PageClosingCta'
import { Link } from 'react-router-dom'
import { Home, Compass } from 'lucide-react'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function NotFound() {
  useDocumentMeta(
    '404 — Page Not Found',
    'The requested page or dish path could not be found at Hestiia Restaurant Kanpur.'
  )

  return (
    <>
      <PageHero
        eyebrow="404 — Culinary Path Uncharted"
        title="Sanctuary"
        accentWord="Not Found"
        intro="The page or dish you are looking for does not exist, has been moved, or is taking a quiet culinary pause."
        currentPage="404 Not Found"
      />

      <section style={{ padding: '64px 0 100px', textAlign: 'center', backgroundColor: '#16110E' }}>
        <div className="container">
          <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: 'var(--color-brass)',
                color: '#1F1A16',
                borderRadius: '6px',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              <Home size={15} />
              <span>Return to Home</span>
            </Link>

            <Link
              to="/menu"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                border: '1px solid rgba(184, 154, 100, 0.35)',
                color: 'var(--color-text-inverse)',
                borderRadius: '6px',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              <Compass size={15} color="var(--color-brass)" />
              <span>Explore 193 Dishes</span>
            </Link>
          </div>
        </div>
      </section>

      <PageClosingCta />
    </>
  )
}
