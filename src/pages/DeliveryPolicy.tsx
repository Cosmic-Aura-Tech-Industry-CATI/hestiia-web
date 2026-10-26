import PageHero from '../components/PageHero'
import PageClosingCta from '../components/PageClosingCta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { RESTAURANT } from '../content/restaurant'
import { ExternalLink } from 'lucide-react'

export default function DeliveryPolicy() {
  useDocumentMeta(
    'Delivery & Takeaway Policy | Hestiia Restaurant',
    'Certified home delivery and direct pickup parameters for Hestiia Restaurant Kanpur.'
  )

  return (
    <>
      <PageHero
        title="Delivery & Takeaway"
        accentWord="Policy"
        intro="Parameters for certified home delivery and direct restaurant takeaway in Kanpur."
        currentPage="Delivery Policy"
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
              1. Certified Delivery Partners
            </h2>
            <p>
              Online food delivery is managed and fulfilled by certified delivery executives via Zomato and Swiggy. Freshness-sealed, pure-vegetarian packaging is used for all orders.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '12px', flexWrap: 'wrap' }}>
              <a
                href={RESTAURANT.platforms.zomato}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-brass)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>Order on Zomato</span>
                <ExternalLink size={13} />
              </a>
              <a
                href={RESTAURANT.platforms.swiggy}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-brass)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>Order on Swiggy</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--color-brass)', marginBottom: '8px' }}>
              2. Direct Restaurant Takeaway
            </h2>
            <p>
              Guests may call {RESTAURANT.phone.display} to place pre-orders for in-person pickup at our Shyam Nagar location.
            </p>
          </section>
        </div>
      </div>

      <PageClosingCta />
    </>
  )
}
