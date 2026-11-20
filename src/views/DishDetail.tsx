'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import PageHero from '../components/PageHero'
import PageClosingCta from '../components/PageClosingCta'
import { DISHES, MENU_CATEGORIES } from '../content/menu'
import { Sparkles, ArrowLeft, ShieldCheck, Plus, Minus, ShoppingBag, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function DishDetail() {
  const params = useParams<{ slug?: string }>()
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug

  const { addToCart, getItemQuantity, openCart } = useCart()
  const [selectedQty, setSelectedQty] = useState<number>(1)
  const [justAdded, setJustAdded] = useState<boolean>(false)

  const dish = DISHES.find(d => d.slug === slug || d.id === slug)
  const category = dish ? MENU_CATEGORIES.find(c => c.id === dish.categoryId) : null

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
            href="/menu"
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

  const currentInCart = getItemQuantity(dish.id)
  const imageSrc = dish.image?.src || category?.fallbackImage.src
  const imageSrcSmall = dish.image?.srcSmall || category?.fallbackImage.srcSmall

  const handleAddToCart = () => {
    addToCart(
      {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: imageSrcSmall,
        isVeg: true,
      },
      selectedQty
    )
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2200)
  }

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
            margin: '0 auto',
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

            {/* Ingredients & Details */}
            {dish.detail?.ingredients && dish.detail.ingredients.length > 0 && (
              <div
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(31, 26, 22, 0.6)',
                  border: '1px solid rgba(184, 154, 100, 0.15)',
                  fontSize: '13px',
                }}
              >
                <strong style={{ color: 'var(--color-brass)', display: 'block', marginBottom: '6px' }}>
                  Key Fresh Ingredients:
                </strong>
                <span style={{ color: 'rgba(246, 239, 228, 0.8)' }}>
                  {dish.detail.ingredients.join(', ')}
                </span>
              </div>
            )}

            {dish.detail?.pairsWith && dish.detail.pairsWith.length > 0 && (
              <div
                style={{
                  paddingTop: '8px',
                  fontSize: '13px',
                  color: 'rgba(196, 180, 154, 0.9)',
                }}
              >
                <strong style={{ color: 'var(--color-brass)' }}>Pairs Perfectly With: </strong>
                <span>{dish.detail.pairsWith.join(', ')}</span>
              </div>
            )}

            {/* Interactive Ordering Panel */}
            <div
              style={{
                marginTop: '12px',
                padding: '20px',
                borderRadius: '12px',
                backgroundColor: 'rgba(38, 31, 26, 0.9)',
                border: '1px solid rgba(184, 154, 100, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                {/* Quantity Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'rgba(246, 239, 228, 0.7)' }}>Quantity:</span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: '6px',
                      border: '1px solid rgba(184, 154, 100, 0.35)',
                      backgroundColor: '#1F1A16',
                      overflow: 'hidden',
                    }}
                  >
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                      style={{
                        padding: '6px 12px',
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-brass)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Minus size={14} />
                    </button>
                    <span
                      style={{
                        padding: '0 8px',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--color-text-inverse)',
                        minWidth: '24px',
                        textAlign: 'center',
                      }}
                    >
                      {selectedQty}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setSelectedQty(selectedQty + 1)}
                      style={{
                        padding: '6px 12px',
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-brass)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Subtotal Display */}
                <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-brass-light)' }}>
                  Total: ₹{dish.price * selectedQty}
                </span>
              </div>

              {/* Add to Cart Button */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  style={{
                    flex: 1,
                    minWidth: '200px',
                    padding: '14px 24px',
                    backgroundColor: justAdded ? '#2F7D4F' : 'var(--color-brass)',
                    color: justAdded ? '#FFFFFF' : '#1F1A16',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'background-color 0.25s ease, transform 0.15s ease',
                  }}
                >
                  {justAdded ? (
                    <>
                      <Check size={16} />
                      <span>Added to Dining Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>Add to Order · ₹{dish.price * selectedQty}</span>
                    </>
                  )}
                </button>

                {currentInCart > 0 && (
                  <button
                    type="button"
                    onClick={openCart}
                    style={{
                      padding: '14px 20px',
                      backgroundColor: 'transparent',
                      color: 'var(--color-brass)',
                      border: '1px solid rgba(184, 154, 100, 0.4)',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>View Cart ({currentInCart})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Back link */}
            <div style={{ paddingTop: '8px' }}>
              <Link
                href="/menu"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgba(246, 239, 228, 0.7)',
                  fontSize: '13px',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                <ArrowLeft size={14} />
                <span>Return to 193-Dish Menu</span>
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
