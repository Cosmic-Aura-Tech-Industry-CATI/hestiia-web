import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Utensils } from 'lucide-react'
import PageHero from '../components/PageHero'
import PageClosingCta from '../components/PageClosingCta'
import CuisineSection from '../components/CuisineSection'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { MENU_GROUPS, MENU_CATEGORIES, DISHES } from '../content/menu'
import { CUISINES } from '../content/cuisines'

export default function Cuisines() {
  useDocumentMeta(
    'Cuisines & Regional Specialties',
    'Explore North Indian heritage curries, sizzling Indo-Chinese wok dishes, evening snacks, and artisanal desserts at Hestiia Restaurant Kanpur.'
  )

  // Group dishes for each of the 4 culinary groups
  const detailedGroups = useMemo(() => {
    return MENU_GROUPS.map(group => {
      const cuisineMeta = CUISINES.find(c => c.id === group.id)
      const groupCategoryIds = MENU_CATEGORIES.filter(c => c.groupId === group.id).map(c => c.id)
      const groupDishes = DISHES.filter(d => groupCategoryIds.includes(d.categoryId))
      
      // Select 7 real dishes prioritizing popular ones
      const popular = groupDishes.filter(d => d.popular)
      const nonPopular = groupDishes.filter(d => !d.popular)
      const sampledDishes = [...popular, ...nonPopular].slice(0, 7)

      const primaryCatId = groupCategoryIds[0] || group.id

      return {
        ...group,
        image: cuisineMeta?.image,
        subtitle: cuisineMeta?.subtitle || 'Culinary Specialities',
        primaryCatId,
        dishes: sampledDishes,
      }
    })
  }, [])

  return (
    <>
      <PageHero
        title="Celebrated Regional"
        accentWord="Flavours"
        intro="An authentic journey through slow-simmered North Indian heritage curries, fiery Indo-Chinese wok specialities, and indulgent evening treats."
        currentPage="Cuisines"
      />

      {/* 1. Core Cuisine Visual Showcase (Imported Unchanged) */}
      <CuisineSection />

      {/* 2. Detailed 4 Group Cards with Real Dishes & Prices */}
      <section
        style={{
          padding: '64px 0 80px',
          backgroundColor: '#16110E',
          borderTop: '1px solid rgba(184, 154, 100, 0.15)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
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
              Curated Highlights from Our Kitchen
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(30px, 3.8vw, 46px)',
                fontWeight: 300,
                color: 'var(--color-text-inverse)',
                margin: '0 auto 16px',
                lineHeight: 1.2,
              }}
            >
              Four Culinary Chapters, <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)' }}>One Kitchen</em>
            </h2>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(246, 239, 228, 0.7)',
                maxWidth: '560px',
                margin: '0 auto',
                lineHeight: 1.7,
              }}
            >
              Each dish is prepared to order using cold-pressed oils, slow-roasted whole spices, and farm-fresh ingredients.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '28px',
            }}
          >
            {detailedGroups.map(group => (
              <div
                key={group.id}
                style={{
                  borderRadius: '12px',
                  backgroundColor: 'rgba(38, 31, 26, 0.75)',
                  border: '1px solid rgba(184, 154, 100, 0.22)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.35)',
                }}
              >
                {/* Header with image */}
                <div>
                  {group.image && (
                    <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                      <img
                        src={group.image}
                        alt={group.name}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(180deg, transparent 40%, rgba(38, 31, 26, 0.95) 100%)',
                        }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          backgroundColor: 'rgba(20, 16, 13, 0.85)',
                          border: '1px solid rgba(184, 154, 100, 0.3)',
                          padding: '4px 10px',
                          borderRadius: '20px',
                          fontSize: '11px',
                          fontFamily: 'var(--font-sans)',
                          color: 'var(--color-brass-light)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {group.subtitle}
                      </span>
                    </div>
                  )}

                  <div style={{ padding: '24px 24px 16px' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '24px',
                        fontWeight: 400,
                        color: 'var(--color-text-inverse)',
                        margin: '0 0 8px',
                      }}
                    >
                      {group.name}
                    </h3>
                    <p
                      style={{
                        fontSize: '13px',
                        lineHeight: 1.6,
                        color: 'rgba(246, 239, 228, 0.7)',
                        margin: '0 0 20px',
                      }}
                    >
                      {group.description}
                    </p>

                    {/* Dish list with real prices */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        borderTop: '1px solid rgba(184, 154, 100, 0.15)',
                        paddingTop: '16px',
                      }}
                    >
                      {group.dishes.map(dish => (
                        <div
                          key={dish.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            gap: '12px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {dish.popular && (
                              <Sparkles size={12} color="var(--color-brass)" style={{ flexShrink: 0 }} />
                            )}
                            <span
                              style={{
                                fontSize: '13px',
                                color: 'rgba(246, 239, 228, 0.9)',
                                fontFamily: 'var(--font-sans)',
                              }}
                            >
                              {dish.name}
                            </span>
                          </div>
                          <span
                            style={{
                              fontSize: '13px',
                              fontWeight: 600,
                              color: 'var(--color-brass)',
                              fontFamily: 'var(--font-sans)',
                              flexShrink: 0,
                            }}
                          >
                            ₹{dish.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card footer CTA linking to /menu?cat=<id> */}
                <div
                  style={{
                    padding: '16px 24px 24px',
                    borderTop: '1px solid rgba(184, 154, 100, 0.12)',
                    marginTop: '12px',
                  }}
                >
                  <Link
                    to={`/menu?cat=${group.primaryCatId}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      fontFamily: 'var(--font-sans)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-brass)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    <Utensils size={13} />
                    <span>See in Menu</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Closing CTA Band */}
      <PageClosingCta
        title="Savor Every Flavor at"
        accentWord="Hestiia"
        subtitle="Explore all 193 pure vegetarian delicacies live at our Shyam Nagar sanctuary."
      />
    </>
  )
}
