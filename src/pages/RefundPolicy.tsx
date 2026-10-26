import PageHero from '../components/PageHero'
import PageClosingCta from '../components/PageClosingCta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { RESTAURANT } from '../content/restaurant'

export default function RefundPolicy() {
  useDocumentMeta(
    'Refund & Cancellation Policy | Hestiia Restaurant',
    'Cancellation and refund guidelines for table reservations and orders at Hestiia Restaurant Kanpur.'
  )

  return (
    <>
      <PageHero
        title="Refund & Cancellation"
        accentWord="Policy"
        intro="Guidelines governing dining reservations, deposit parameters, and guest service satisfaction."
        currentPage="Refund Policy"
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
              1. Dining Table Reservations
            </h2>
            <p>
              Standard dining reservations require no booking fee and can be cancelled or rescheduled at any time without charge. Please notify us at {RESTAURANT.phone.display} if your schedule changes.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--color-brass)', marginBottom: '8px' }}>
              2. Orders Placed via Partner Platforms
            </h2>
            <p>
              For food delivery orders through Zomato or Swiggy, cancellation and refund policies are administered per the respective platform’s terms of service.
            </p>
          </section>
        </div>
      </div>

      <PageClosingCta />
    </>
  )
}
