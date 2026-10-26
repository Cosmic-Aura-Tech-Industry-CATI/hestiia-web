import { useParams, Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import PageClosingCta from '../components/PageClosingCta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { DISHES, MENU_CATEGORIES } from '../content/menu'
import { Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react'

export default function DishDetail() {
  const { slug } = useParams<{ slug: string }>()

  const dish = DISHES.find(d => d.slug === slug || d.id === slug)
  const category = dish ? MENU_CATEGORIES.find(c => c.id === dish.categoryId) : null

  useDocumentMeta(
    dish ? `${dish.name} — Pure Vegetarian | Hestiia Restaurant` : 'Dish Not Found',
    dish ? dish.description : 'Explore pure vegetarian dishes at Hestiia Restaurant Kanpur.'
  )

  if (!dish) {
    return (
      <>
        <PageHero
          title="Dish"
          accentWord="Not Found"
          intro="The requested culinary creation is not currently listed in our authentic 193-dish menu."
          currentPage="Dish Not Found"
        />
        <div className="container" style={{ padding: '64px 0 100px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(246, 239, 228, 0.7)', marginBottom: '24px' }}>
            Browse all 193 pure vegetarian dishes arranged across 21 culinary disciplines.
          </p>
          <Link
            to="/menu"
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--color-brass)',
              color: '#1F1A16',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '12px',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <ArrowLeft size={16} />
            <span>Return to Menu</span>
          </Link>
        </div>
      </>
    )
  }

  const imageSrc = dish.image?.src || category?.fallbackImage.src
  const imageSrcSmall = dish.image?.srcSmall || category?.fallbackImage.srcSmall

  return (
    <>
      <PageHero
        title={dish.name}
        accentWord={dish.popular ? 'Signature' : undefined}
        intro={dish.description}
        currentPage={dish.name}
        breadcrumbs={[
          { label: 'Menu', path: '/menu' },
          { label: dish.name },
        ]}
      />

      <div className="container" style={{ padding: '48px 0 80px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            alignItems: 'start',
            maxWidth: '960px',
          }}
        >
          {/* Dish Image */}
          {imageSrcSmall && (
            <div
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(184, 154, 100, 0.25)',
                backgroundColor: '#16120F',
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.55)',
              }}
            >
              <img
                src={imageSrcSmall}
                srcSet={`${imageSrcSmall} 480w, ${imageSrc} 1200w`}
                sizes="(max-width: 640px) 100vw, 450px"
                alt={dish.name}
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </div>
          )}

          {/* Dish Specifications */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '32px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  color: 'var(--color-brass)',
                }}
              >
                ₹{dish.price}
              </span>

              {dish.portion && (
                <span
                  style={{
                    fontSize: '12px',
                    color: 'rgba(246, 239, 228, 0.85)',
                    backgroundColor: 'rgba(38, 31, 26, 0.8)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: '1px solid rgba(184, 154, 100, 0.25)',
                  }}
                >
                  {dish.portion}
                </span>
              )}

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  color: '#4ADE80',
                  backgroundColor: 'rgba(47, 125, 79, 0.15)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  border: '1px solid rgba(47, 125, 79, 0.3)',
                }}
              >
                <ShieldCheck size={14} />
                100% Pure Vegetarian
              </span>

              {dish.popular && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#1F1A16',
                    backgroundColor: 'var(--color-brass)',
                    padding: '4px 10px',
                    borderRadius: '12px',
                  }}
                >
                  <Sparkles size={12} />
                  Signature Dish
                </span>
              )}
            </div>

            <p style={{ color: 'rgba(246, 239, 228, 0.8)', lineHeight: 1.7, margin: 0, fontSize: '15px' }}>
              {dish.detail?.story || dish.description}
            </p>

            {dish.detail?.pairsWith && dish.detail.pairsWith.length > 0 && (
              <div
                style={{
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(184, 154, 100, 0.15)',
                  fontSize: '13px',
                  color: 'rgba(196, 180, 154, 0.9)',
                }}
              >
                <strong style={{ color: 'var(--color-brass)' }}>Pairs With: </strong>
                <span>{dish.detail.pairsWith.join(', ')}</span>
              </div>
            )}

            <div style={{ paddingTop: '16px' }}>
              <Link
                to="/menu"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  backgroundColor: 'var(--color-brass)',
                  color: '#1F1A16',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                }}
              >
                <ArrowLeft size={14} />
                <span>Explore Full Menu</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <PageClosingCta
        title={`Savor our ${dish.name} at`}
        accentWord="Hestiia"
        subtitle="Prepared fresh to order in our pure vegetarian kitchen in Shyam Nagar, Kanpur."
      />
    </>
  )
}
