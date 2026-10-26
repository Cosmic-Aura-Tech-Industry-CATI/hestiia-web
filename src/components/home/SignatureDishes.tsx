import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { POPULAR_DISHES, MENU_CATEGORIES } from '../../content/menu'

export default function SignatureDishes() {
  const featuredDishes = POPULAR_DISHES.slice(0, 6)

  return (
    <section
      className="signature-dishes-teaser section section-dark"
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
              Signatures of Hestiia
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
              Crafted with Heritage Spices.
            </h2>
          </div>

          <Link
            to="/menu"
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
            <span>See Full Menu (193 Dishes)</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 6 Dish Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '36px',
          }}
        >
          {featuredDishes.map(dish => {
            const category = MENU_CATEGORIES.find(c => c.id === dish.categoryId)
            const imgSrc = dish.image?.srcSmall || category?.fallbackImage.srcSmall || ''
            const imgAlt = dish.image?.alt || `${dish.name} — Pure Vegetarian Dining at Hestiia`

            return (
              <div
                key={dish.id}
                style={{
                  backgroundColor: 'rgba(38, 31, 26, 0.75)',
                  borderRadius: '12px',
                  border: '1px solid rgba(184, 154, 100, 0.18)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                }}
                className="dish-teaser-card"
              >
                {/* Image */}
                <div style={{ position: 'relative', width: '100%', paddingTop: '62%', overflow: 'hidden', backgroundColor: '#16120F' }}>
                  {imgSrc && (
                    <img
                      src={imgSrc}
                      alt={imgAlt}
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
                  )}

                  {/* Badges */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      zIndex: 2,
                    }}
                  >
                    {/* Pure Veg Mark */}
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        border: '1.5px solid #2F7D4F',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(31, 26, 22, 0.88)',
                      }}
                    >
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2F7D4F' }} />
                    </div>

                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '2px 6px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--color-brass)',
                        color: '#1F1A16',
                        fontSize: '10px',
                        fontWeight: 700,
                      }}
                    >
                      <Sparkles size={10} />
                      Signature
                    </span>
                  </div>

                  {/* Price */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      zIndex: 2,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(31, 26, 22, 0.9)',
                      border: '1px solid rgba(184, 154, 100, 0.35)',
                      color: 'var(--color-brass)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      fontWeight: 700,
                    }}
                  >
                    ₹{dish.price}
                  </div>
                </div>

                {/* Details */}
                <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '20px',
                        color: 'var(--color-text-inverse)',
                        margin: '0 0 6px 0',
                      }}
                    >
                      {dish.name}
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
                      {dish.description}
                    </p>
                  </div>

                  <div style={{ marginTop: '16px' }}>
                    <Link
                      to={`/menu/${dish.slug}`}
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
                      <span>View dish</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Center CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            to="/menu"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              backgroundColor: 'var(--color-brass)',
              color: '#1F1A16',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            <span>See Full 193-Dish Menu</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
