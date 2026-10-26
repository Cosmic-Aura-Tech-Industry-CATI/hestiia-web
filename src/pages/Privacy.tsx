import PageHero from '../components/PageHero'
import PageClosingCta from '../components/PageClosingCta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { RESTAURANT } from '../content/restaurant'

export default function Privacy() {
  useDocumentMeta(
    'Privacy Policy | Hestiia Restaurant',
    'How Hestiia Restaurant safeguards guest information and dining reservation confidentiality.'
  )

  return (
    <>
      <PageHero
        title="Privacy"
        accentWord="Policy"
        intro="How Hestiia Restaurant respects, safeguards, and handles your personal dining reservation details."
        currentPage="Privacy Policy"
      />

      <div className="container" style={{ padding: '64px 0 80px' }}>
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
            fontSize: '14px',
            lineHeight: 1.8,
            color: 'rgba(246, 239, 228, 0.78)',
          }}
        >
          <section>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--color-brass)', marginBottom: '8px' }}>
              1. Information Collection
            </h2>
            <p>
              We collect guest contact details (such as name, telephone number, and reservation time) solely for verifying table bookings and accommodating dining preferences.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--color-brass)', marginBottom: '8px' }}>
              2. Confidentiality & Security
            </h2>
            <p>
              Your information is never sold, traded, or shared with unauthorized commercial entities. For inquiries, email {RESTAURANT.email}.
            </p>
          </section>
        </div>
      </div>

      <PageClosingCta />
    </>
  )
}
