import PageHero from '../components/PageHero'
import PageClosingCta from '../components/PageClosingCta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { RESTAURANT } from '../content/restaurant'

export default function Terms() {
  useDocumentMeta(
    'Terms & Conditions | Hestiia Restaurant',
    'Terms and conditions governing dining reservations, takeaways, and services at Hestiia Restaurant Kanpur.'
  )

  return (
    <>
      <PageHero
        title="Terms &"
        accentWord="Conditions"
        intro="General parameters governing dining reservations, takeaway, and hospitality services at Hestiia Restaurant."
        currentPage="Terms & Conditions"
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
              1. Pure Vegetarian Sanctuary
            </h2>
            <p>
              Hestiia operates strictly as a 100% pure vegetarian dining establishment. All dishes, ingredients, gravies, and kitchen equipment are completely free of meat, fish, seafood, and eggs.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--color-brass)', marginBottom: '8px' }}>
              2. Reservations & Group Dining
            </h2>
            <p>
              Table reservations made via our certified partners (District, Zomato, EazyDiner) or by telephone ({RESTAURANT.phone.display}) are held for up to 15 minutes past the reserved schedule. Please notify us if you anticipate delays.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--color-brass)', marginBottom: '8px' }}>
              3. Pricing & Taxes
            </h2>
            <p>
              All listed menu prices are in Indian Rupees (INR) and are subject to statutory Goods and Services Tax (GST). Prices are subject to periodic kitchen updates.
            </p>
          </section>
        </div>
      </div>

      <PageClosingCta />
    </>
  )
}
