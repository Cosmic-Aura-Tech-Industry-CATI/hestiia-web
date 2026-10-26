import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles, Plus, Minus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import FlowingMenu, { type FlowingMenuItem } from './reactbits/FlowingMenu'
import {
  MENU_CATEGORIES,
  DISHES,
  MENU_GROUPS,
  MENU_CONFIG,
  type Dish,
} from '../content/menu'

export default function MenuPreview() {
  const { addToCart, updateQuantity, getItemQuantity } = useCart()
  const [activeTab, setActiveTab] = useState<string>(MENU_CATEGORIES[0]?.id || 'sandwiches')
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const tabButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const shouldReduceMotion = useReducedMotion()

  const currentCategory =
    MENU_CATEGORIES.find(c => c.id === activeTab) || MENU_CATEGORIES[0]

  const categoryDishes: Dish[] = DISHES.filter(d => d.categoryId === currentCategory.id)

  // Map high-level menu groups into FlowingMenu
  const flowingItems: FlowingMenuItem[] = MENU_GROUPS.map(group => ({
    id: group.id,
    title: group.name,
    category: `${group.categoryIds.length} Categories`,
    description: group.description,
    highlights: DISHES.filter(d => group.categoryIds.includes(d.categoryId) && d.popular)
      .map(d => d.name)
      .slice(0, 4),
    url: MENU_CONFIG.authoritativeMenuUrl,
  }))

  // Check scroll overflows for tab bar
  const updateScrollButtons = useCallback(() => {
    const el = tabsContainerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 6)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6)
  }, [])

  useEffect(() => {
    const el = tabsContainerRef.current
    if (!el) return
    updateScrollButtons()
    el.addEventListener('scroll', updateScrollButtons, { passive: true })
    window.addEventListener('resize', updateScrollButtons)
    return () => {
      el.removeEventListener('scroll', updateScrollButtons)
      window.removeEventListener('resize', updateScrollButtons)
    }
  }, [updateScrollButtons])

  const scrollTabs = (direction: 'left' | 'right') => {
    const el = tabsContainerRef.current
    if (!el) return
    const amount = direction === 'left' ? -260 : 260
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const handleSelectTab = (categoryId: string) => {
    setActiveTab(categoryId)
    const btn = tabButtonRefs.current[categoryId]
    if (btn) {
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }

  return (
    <section className="menu-preview-section section section-dark" id="menu" aria-labelledby="menu-title">
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
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
                marginBottom: '12px',
              }}
            >
              Pure Vegetarian Artisanship · Kanpur
            </span>
            <h2
              id="menu-title"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                fontWeight: 300,
                color: 'var(--color-text-inverse)',
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              Taste What Defines Us.
            </h2>
          </div>

          <a
            href={MENU_CONFIG.authoritativeMenuUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: 'var(--color-brass)',
              color: '#1F1A16',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease, transform 0.2s ease',
            }}
            className="menu-cta-btn"
          >
            <span>Live Menu on Zomato</span>
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* 21 Categories Horizontal Scrollable Tabs */}
        <div style={{ position: 'relative', marginBottom: '32px' }}>
          {/* Desktop Left Scroll Arrow */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollTabs('left')}
              aria-label="Scroll tabs left"
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 4,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(31, 26, 22, 0.92)',
                border: '1px solid var(--color-brass)',
                color: 'var(--color-brass)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                transition: 'background-color 0.2s',
              }}
              className="tab-nav-arrow"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {/* Desktop Right Scroll Arrow */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollTabs('right')}
              aria-label="Scroll tabs right"
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 4,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(31, 26, 22, 0.92)',
                border: '1px solid var(--color-brass)',
                color: 'var(--color-brass)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                transition: 'background-color 0.2s',
              }}
              className="tab-nav-arrow"
            >
              <ChevronRight size={18} />
            </button>
          )}

          {/* Tab Strip Container */}
          <div
            ref={tabsContainerRef}
            role="tablist"
            aria-label="Restaurant Menu Categories"
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              padding: '8px 4px 16px',
              borderBottom: '1px solid rgba(184, 154, 100, 0.18)',
              scrollBehavior: 'smooth',
            }}
            className="menu-tabs-scroll-strip"
          >
            {MENU_CATEGORIES.map(cat => {
              const isActive = activeTab === cat.id
              const count = DISHES.filter(d => d.categoryId === cat.id).length

              return (
                <button
                  key={cat.id}
                  ref={el => {
                    tabButtonRefs.current[cat.id] = el
                  }}
                  id={`tab-${cat.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${cat.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => handleSelectTab(cat.id)}
                  style={{
                    position: 'relative',
                    flexShrink: 0,
                    padding: '10px 18px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: '0.02em',
                    color: isActive ? '#1F1A16' : 'rgba(246, 239, 228, 0.78)',
                    backgroundColor: isActive ? 'var(--color-brass)' : 'rgba(38, 31, 26, 0.65)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--color-brass)' : 'rgba(184, 154, 100, 0.22)',
                    borderRadius: '24px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span>{cat.name}</span>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '2px 6px',
                      borderRadius: '10px',
                      backgroundColor: isActive ? 'rgba(31, 26, 22, 0.22)' : 'rgba(184, 154, 100, 0.12)',
                      color: isActive ? '#1F1A16' : 'var(--color-brass)',
                      fontWeight: 600,
                    }}
                  >
                    {count}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="active-menu-tab"
                      transition={{ type: 'spring', bounce: 0.18, duration: 0.35 }}
                      style={{
                        position: 'absolute',
                        inset: -1,
                        borderRadius: '24px',
                        border: '1px solid var(--color-brass-light)',
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Category Header Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.id}
            id={`panel-${currentCategory.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${currentCategory.id}`}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
            transition={{ duration: 0.22 }}
            style={{
              padding: '24px 28px',
              backgroundColor: 'rgba(38, 31, 26, 0.7)',
              borderRadius: '12px',
              border: '1px solid rgba(184, 154, 100, 0.18)',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(24px, 3vw, 32px)',
                      fontWeight: 400,
                      color: 'var(--color-text-inverse)',
                      margin: 0,
                    }}
                  >
                    {currentCategory.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(47, 125, 79, 0.15)',
                      border: '1px solid rgba(47, 125, 79, 0.3)',
                      color: '#4ADE80',
                    }}
                  >
                    Pure Veg · {categoryDishes.length} {categoryDishes.length === 1 ? 'Dish' : 'Dishes'}
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    fontFamily: 'var(--font-sans)',
                    color: 'rgba(246, 239, 228, 0.75)',
                    lineHeight: 1.6,
                    maxWidth: '840px',
                  }}
                >
                  {currentCategory.seoIntro}
                </p>
              </div>

              <div
                style={{
                  fontSize: '12px',
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-brass)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>Category {currentCategory.order} of {MENU_CATEGORIES.length}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Category Dishes Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: '24px',
              marginBottom: '56px',
            }}
            className="menu-dishes-grid"
          >
            {categoryDishes.map((dish, idx) => {
              const imageSrc = dish.image?.src || currentCategory.fallbackImage.src
              const imageSrcSmall = dish.image?.srcSmall || currentCategory.fallbackImage.srcSmall
              const imageAlt =
                dish.image?.alt || `${dish.name} — ${currentCategory.name} pure vegetarian dining at Hestiia`

              return (
                <motion.article
                  key={dish.id}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.28,
                    delay: shouldReduceMotion ? 0 : Math.min(idx * 0.03, 0.3),
                  }}
                  style={{
                    backgroundColor: 'rgba(38, 31, 26, 0.75)',
                    borderRadius: '12px',
                    border: '1px solid rgba(184, 154, 100, 0.16)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                  }}
                  className="dish-card"
                >
                  {/* Dish Image Container */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      paddingTop: '62.5%', // 16:10 aspect ratio
                      backgroundColor: '#16120F',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={imageSrcSmall}
                      srcSet={`${imageSrcSmall} 480w, ${imageSrc} 1200w`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                      alt={imageAlt}
                      loading="lazy"
                      decoding="async"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                      className="dish-card-img"
                    />

                    {/* Subtle bottom gradient to blend image into card */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '35%',
                        background: 'linear-gradient(to top, rgba(38, 31, 26, 0.95), transparent)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Top Overlays: Pure Veg Mark & Badges */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        zIndex: 2,
                      }}
                    >
                      {/* Indian Standard Pure Veg Icon */}
                      <div
                        title="Pure Vegetarian"
                        aria-label="Pure Vegetarian"
                        style={{
                          width: '18px',
                          height: '18px',
                          border: '1.5px solid #2F7D4F',
                          borderRadius: '3px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(31, 26, 22, 0.88)',
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
                        }}
                      >
                        <div
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: '#2F7D4F',
                          }}
                        />
                      </div>

                      {/* Popular / Chef's Special Badge */}
                      {dish.popular && (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '3px 8px',
                            borderRadius: '12px',
                            backgroundColor: 'rgba(184, 154, 100, 0.92)',
                            color: '#1F1A16',
                            fontSize: '11px',
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
                          }}
                        >
                          <Sparkles size={11} />
                          Popular
                        </span>
                      )}
                    </div>

                    {/* Price Badge on Image Corner */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        zIndex: 2,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(31, 26, 22, 0.88)',
                        border: '1px solid rgba(184, 154, 100, 0.35)',
                        color: 'var(--color-brass)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '14px',
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.45)',
                      }}
                    >
                      ₹{dish.price}
                    </div>

                    {/* Portion Tag on Bottom Right of Image */}
                    {dish.portion && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '12px',
                          zIndex: 2,
                          fontSize: '11px',
                          fontFamily: 'var(--font-sans)',
                          color: 'rgba(246, 239, 228, 0.85)',
                          backgroundColor: 'rgba(31, 26, 22, 0.75)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          border: '1px solid rgba(184, 154, 100, 0.2)',
                        }}
                      >
                        {dish.portion}
                      </div>
                    )}
                  </div>

                  {/* Dish Details */}
                  <div
                    style={{
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: 1,
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      {/* Dish Name */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          justifyContent: 'space-between',
                          gap: '12px',
                          marginBottom: '8px',
                        }}
                      >
                        <h4
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '21px',
                            fontWeight: 400,
                            color: 'var(--color-text-inverse)',
                            margin: 0,
                            lineHeight: 1.25,
                          }}
                        >
                          {dish.name}
                        </h4>
                      </div>

                      {/* Description */}
                      <p
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '13px',
                          fontWeight: 300,
                          lineHeight: 1.6,
                          color: 'rgba(246, 239, 228, 0.72)',
                          margin: 0,
                        }}
                      >
                        {dish.description}
                      </p>
                    </div>

                    {/* Dish Tags / Pairing Details (if available) */}
                    {dish.detail?.pairsWith && dish.detail.pairsWith.length > 0 && (
                      <div
                        style={{
                          marginTop: '14px',
                          paddingTop: '10px',
                          borderTop: '1px solid rgba(184, 154, 100, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '11px',
                          fontFamily: 'var(--font-sans)',
                          color: 'rgba(196, 180, 154, 0.85)',
                        }}
                      >
                        <span style={{ color: 'var(--color-brass)', fontWeight: 600 }}>Pairs with:</span>
                        <span>{dish.detail.pairsWith.slice(0, 2).join(', ')}</span>
                      </div>
                    )}

                    {/* Interactive Add to Cart & Quantity Bar */}
                    <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(184, 154, 100, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-brass)' }}>₹{dish.price}</span>
                      {getItemQuantity(dish.id) > 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(24, 19, 16, 0.9)', borderRadius: '6px', border: '1px solid rgba(184, 154, 100, 0.3)', padding: '3px 8px' }}>
                          <button
                            type="button"
                            onClick={() => updateQuantity(dish.id, getItemQuantity(dish.id) - 1)}
                            style={{ background: 'none', border: 'none', color: 'var(--color-brass)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px' }}
                            title="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#F6EFE4', minWidth: '16px', textAlign: 'center' }}>
                            {getItemQuantity(dish.id)}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(dish.id, getItemQuantity(dish.id) + 1)}
                            style={{ background: 'none', border: 'none', color: 'var(--color-brass)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px' }}
                            title="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addToCart({ id: dish.id, name: dish.name, price: dish.price, image: imageSrcSmall, isVeg: true })}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '6px 14px',
                            borderRadius: '6px',
                            backgroundColor: 'rgba(184, 154, 100, 0.15)',
                            border: '1px solid rgba(184, 154, 100, 0.35)',
                            color: 'var(--color-brass)',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                          }}
                        >
                          <Plus size={13} />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* Explore All Culinary Disciplines with FlowingMenu */}
        <div style={{ marginTop: '24px', paddingTop: '32px', borderTop: '1px solid rgba(184, 154, 100, 0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-brass)',
                margin: 0,
              }}
            >
              Explore Disciplines ({MENU_GROUPS.length} Culinary Traditions)
            </h4>

            <span style={{ fontSize: '12px', fontFamily: 'var(--font-sans)', color: 'rgba(246, 239, 228, 0.6)' }}>
              193 Dishes Total · 100% Pure Vegetarian
            </span>
          </div>

          <FlowingMenu items={flowingItems} />
        </div>

        {/* Factual Disclaimer */}
        <p
          style={{
            marginTop: '32px',
            fontSize: '12px',
            fontFamily: 'var(--font-sans)',
            color: 'rgba(246, 239, 228, 0.45)',
            fontStyle: 'italic',
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          {MENU_CONFIG.disclaimer}
        </p>
      </div>

      {/* Scoped CSS for card hover states & responsive tabs scroll */}
      <style>{`
        .menu-tabs-scroll-strip::-webkit-scrollbar {
          display: none;
        }
        @media (hover: hover) {
          .dish-card:hover {
            transform: translateY(-4px);
            border-color: rgba(184, 154, 100, 0.45) !important;
            box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.6) !important;
          }
          .dish-card:hover .dish-card-img {
            transform: scale(1.04);
          }
          .menu-cta-btn:hover {
            background-color: var(--color-brass-light) !important;
            transform: translateY(-1px);
          }
          .tab-nav-arrow:hover {
            background-color: var(--color-brass) !important;
            color: #1F1A16 !important;
          }
        }
        @media (max-width: 640px) {
          .tab-nav-arrow {
            display: none !important;
          }
          .menu-dishes-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
