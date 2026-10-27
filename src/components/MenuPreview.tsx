import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  Sparkles,
  Plus,
  Minus,
  Search,
  ChevronDown,
  X,
  ShoppingBag,
  ArrowRight,
  Filter,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import FlowingMenu, { type FlowingMenuItem } from './reactbits/FlowingMenu'
import {
  MENU_CATEGORIES as STATIC_CATEGORIES,
  DISHES as STATIC_DISHES,
  MENU_GROUPS,
  MENU_CONFIG,
  type Dish,
  type MenuCategory,
} from '../content/menu'
import { menuService } from '../services/menu.service'

export default function MenuPreview() {
  const { addToCart, updateQuantity, getItemQuantity, totalItemCount, subtotal, openCart } = useCart()
  const [categories, setCategories] = useState<MenuCategory[]>(STATIC_CATEGORIES)
  const [allDishes, setAllDishes] = useState<Dish[]>(STATIC_DISHES)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<'default' | 'price_asc' | 'price_desc'>('default')

  const shouldReduceMotion = useReducedMotion()

  // Fetch dynamic dishes and categories from backend
  useEffect(() => {
    let isMounted = true
    const loadDynamicData = async () => {
      try {
        const [fetchedDishes, fetchedCategories] = await Promise.all([
          menuService.getDishes(),
          menuService.getCategories(),
        ])

        if (!isMounted) return

        if (Array.isArray(fetchedCategories) && fetchedCategories.length > 0) {
          const mappedCats: MenuCategory[] = fetchedCategories.map((fc, idx) => {
            const existing = STATIC_CATEGORIES.find(
              sc => sc.id === fc.slug || sc.name.toLowerCase() === fc.name.toLowerCase()
            )
            return {
              id: fc.slug || existing?.id || fc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              name: fc.name,
              groupId: existing?.groupId || 'fast-food',
              order: fc.displayOrder || idx + 1,
              seoIntro: fc.description || existing?.seoIntro || `Pure vegetarian ${fc.name} crafted fresh daily at Hestiia.`,
              fallbackImage: existing?.fallbackImage || {
                src: '/menu/category-paneer.webp',
                srcSmall: '/menu/category-paneer-sm.webp',
                alt: `${fc.name} at Hestiia Kanpur`,
                isIllustrative: true,
              },
            }
          })
          setCategories(mappedCats)
        }

        if (Array.isArray(fetchedDishes) && fetchedDishes.length > 0) {
          const mappedDishes: Dish[] = fetchedDishes
            .filter(d => d.available !== false)
            .map(d => {
              const existing = STATIC_DISHES.find(
                sd => sd.id === d.id || sd.slug === d.slug || sd.name.toLowerCase() === d.name.toLowerCase()
              )
              const matchedCat = (fetchedCategories || []).find(
                c => c.name.toLowerCase() === d.category.toLowerCase() || c.slug === d.category.toLowerCase()
              )
              const catId = matchedCat?.slug || existing?.categoryId || d.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')

              return {
                id: d.id,
                slug: d.slug,
                name: d.name,
                suggestedName: existing?.suggestedName || null,
                categoryId: catId,
                price: d.price,
                isVeg: true,
                description: d.description || existing?.description || `Freshly prepared ${d.name} at Hestiia.`,
                sourceDescription: existing?.sourceDescription || null,
                portion: existing?.portion || null,
                options: existing?.options || null,
                spiceLevel: d.spiceLevel || existing?.spiceLevel || 1,
                popular: Boolean(d.isSignature ?? existing?.popular),
                tags: existing?.tags || ['pure-veg'],
                image: d.image
                  ? {
                      src: d.image,
                      srcSmall: d.image,
                      alt: `${d.name} - pure vegetarian dining at Hestiia`,
                      isIllustrative: false,
                    }
                  : existing?.image || null,
                seo: existing?.seo || {
                  title: `${d.name} - Pure Veg at Hestiia Kanpur`,
                  metaDescription: d.description || `${d.name} at Hestiia Restaurant Kanpur`,
                  keywords: [d.name, 'Kanpur', 'pure veg'],
                },
                detail: {
                  story: d.fullDescription || existing?.detail?.story || d.description,
                  ingredients:
                    d.ingredients && d.ingredients.length > 0
                      ? d.ingredients
                      : existing?.detail?.ingredients || ['Fresh Seasonal Ingredients'],
                  servesPeople: existing?.detail?.servesPeople || 2,
                  pairsWith: existing?.detail?.pairsWith || [],
                },
              }
            })
          setAllDishes(mappedDishes)
        }
      } catch {
        // Keep initial static dishes if backend is unreachable
      }
    }

    loadDynamicData()
    return () => {
      isMounted = false
    }
  }, [])

  // Helper map for category lookup
  const categoryMap = useMemo(() => {
    const map = new Map<string, MenuCategory>()
    categories.forEach(c => {
      map.set(c.id.toLowerCase(), c)
      map.set(c.name.toLowerCase(), c)
    })
    return map
  }, [categories])

  // Filter by category
  const filteredByCategory = useMemo(() => {
    if (selectedCategory === 'all') {
      return allDishes
    }
    const catObj = categories.find(c => c.id === selectedCategory)
    const catNameLow = catObj ? catObj.name.toLowerCase() : selectedCategory.toLowerCase()
    return allDishes.filter(d =>
      d.categoryId === selectedCategory ||
      d.categoryId === catNameLow ||
      (catObj && d.categoryId === catObj.id)
    )
  }, [allDishes, selectedCategory, categories])

  // Filter by search query
  const filteredBySearch = useMemo(() => {
    if (!searchQuery.trim()) return filteredByCategory
    const q = searchQuery.toLowerCase().trim()
    return filteredByCategory.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      (d.detail?.ingredients && d.detail.ingredients.some(ing => ing.toLowerCase().includes(q))) ||
      d.categoryId.toLowerCase().includes(q)
    )
  }, [filteredByCategory, searchQuery])

  // Sort by price or default
  const processedDishes = useMemo(() => {
    const dishes = [...filteredBySearch]
    if (sortBy === 'price_asc') {
      return dishes.sort((a, b) => a.price - b.price)
    }
    if (sortBy === 'price_desc') {
      return dishes.sort((a, b) => b.price - a.price)
    }
    return dishes
  }, [filteredBySearch, sortBy])

  // Map high-level menu groups into FlowingMenu
  const flowingItems: FlowingMenuItem[] = useMemo(() => {
    return MENU_GROUPS.map(group => ({
      id: group.id,
      title: group.name,
      category: `${group.categoryIds.length} Categories`,
      description: group.description,
      highlights: allDishes
        .filter(d => group.categoryIds.includes(d.categoryId) && d.popular)
        .map(d => d.name)
        .slice(0, 4),
      url: MENU_CONFIG.authoritativeMenuUrl,
    }))
  }, [allDishes])

  // Reusable Single Dish Card Renderer
  const renderDishCard = (dish: Dish, idx: number, parentCategory?: MenuCategory) => {
    const cat = parentCategory || categoryMap.get(dish.categoryId.toLowerCase()) || categories[0]
    const imageSrc = dish.image?.src || cat?.fallbackImage.src || '/menu/category-paneer.webp'
    const imageSrcSmall = dish.image?.srcSmall || cat?.fallbackImage.srcSmall || '/menu/category-paneer-sm.webp'
    const imageAlt = dish.image?.alt || `${dish.name} — pure vegetarian dining at Hestiia`
    const quantity = getItemQuantity(dish.id)

    return (
      <motion.article
        key={dish.id}
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.28,
          delay: shouldReduceMotion ? 0 : Math.min(idx * 0.02, 0.25),
        }}
        style={{
          backgroundColor: 'rgba(38, 31, 26, 0.75)',
          borderRadius: '14px',
          border: '1px solid rgba(184, 154, 100, 0.18)',
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

          {/* Gradient overlay */}
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

          {/* Top Overlays: Pure Veg Mark & Category Badge */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              right: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 2,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                title="100% Pure Vegetarian"
                style={{
                  width: '18px',
                  height: '18px',
                  border: '1.5px solid #2F7D4F',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(31, 26, 22, 0.88)',
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2F7D4F' }} />
              </div>

              {dish.popular && (
                <span
                  style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#1F1A16',
                    backgroundColor: 'var(--color-brass)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  }}
                >
                  <Sparkles size={11} />
                  <span>Chef's Choice</span>
                </span>
              )}
            </div>

            {cat && (
              <span
                style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-sans)',
                  color: 'rgba(246, 239, 228, 0.9)',
                  backgroundColor: 'rgba(22, 17, 14, 0.85)',
                  border: '1px solid rgba(184, 154, 100, 0.3)',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat.name}
              </span>
            )}
          </div>

          {/* Portion Tag */}
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
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '20px',
                fontWeight: 400,
                color: 'var(--color-text-inverse)',
                margin: '0 0 8px',
                lineHeight: 1.25,
              }}
            >
              {dish.name}
            </h4>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 300,
                lineHeight: 1.55,
                color: 'rgba(246, 239, 228, 0.72)',
                margin: 0,
              }}
            >
              {dish.description}
            </p>
          </div>

          {/* Upgraded Add to Cart / Stepper Bar */}
          <div
            style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid rgba(184, 154, 100, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
            }}
          >
            <div>
              <span style={{ fontSize: '11px', color: 'rgba(246, 239, 228, 0.5)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price</span>
              <span style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-brass)' }}>₹{dish.price}</span>
            </div>

            {quantity > 0 ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'rgba(24, 19, 16, 0.95)',
                  borderRadius: '8px',
                  border: '1.5px solid var(--color-brass)',
                  padding: '4px 10px',
                  boxShadow: '0 2px 8px rgba(184, 154, 100, 0.25)',
                }}
              >
                <button
                  type="button"
                  onClick={() => updateQuantity(dish.id, quantity - 1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-brass)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '3px',
                  }}
                  title="Decrease quantity"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#F6EFE4', minWidth: '18px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => addToCart({ id: dish.id, name: dish.name, price: dish.price, image: imageSrcSmall, isVeg: true }, 1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-brass)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '3px',
                  }}
                  title="Increase quantity"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => addToCart({ id: dish.id, name: dish.name, price: dish.price, image: imageSrcSmall, isVeg: true }, 1)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--color-brass), var(--color-brass-light))',
                  border: 'none',
                  color: '#16110E',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 3px 12px rgba(184, 154, 100, 0.25)',
                  transition: 'transform 0.15s ease',
                }}
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </motion.article>
    )
  }

  // Active category object when a specific category is chosen
  const currentCategory = categories.find(c => c.id === selectedCategory)

  // Is "All Categories" default view active?
  const isAllDefaultView = selectedCategory === 'all' && !searchQuery.trim() && sortBy === 'default'

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
            marginBottom: '36px',
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
              Pure Vegetarian Artisanship · Kanpur
            </span>
            <h2
              id="menu-title"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(30px, 4vw, 52px)',
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

        {/* Luxury Unified Menu Control Bar: Category Dropdown + Search + Price Filter */}
        <div
          style={{
            backgroundColor: 'rgba(38, 31, 26, 0.85)',
            border: '1px solid rgba(184, 154, 100, 0.3)',
            borderRadius: '16px',
            padding: '20px 24px',
            marginBottom: '36px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              alignItems: 'flex-end',
            }}
          >
            {/* 1. Category Dropdown Selector */}
            <div style={{ flex: '1 1 260px', minWidth: '220px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-brass)',
                  marginBottom: '8px',
                }}
              >
                <Filter size={13} />
                <span>Menu Category</span>
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 38px 12px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#16110E',
                    border: '1px solid rgba(184, 154, 100, 0.35)',
                    color: '#F6EFE4',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: 500,
                    appearance: 'none',
                    cursor: 'pointer',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="all" style={{ backgroundColor: '#191410', color: '#F6EFE4' }}>
                    ✨ All Categories ({allDishes.length} Dishes)
                  </option>
                  {categories.map((cat) => {
                    const count = allDishes.filter(d => d.categoryId === cat.id || d.categoryId === cat.name.toLowerCase()).length
                    return (
                      <option key={cat.id} value={cat.id} style={{ backgroundColor: '#191410', color: '#F6EFE4' }}>
                        {cat.name} ({count})
                      </option>
                    )
                  })}
                </select>
                <ChevronDown
                  size={16}
                  color="var(--color-brass)"
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                />
              </div>
            </div>

            {/* 2. Real-time Search Input */}
            <div style={{ flex: '2 1 300px', minWidth: '240px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-brass)',
                  marginBottom: '8px',
                }}
              >
                <Search size={13} />
                <span>Search Menu</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by dish name, paneer, noodles, momos, rolls..."
                  style={{
                    width: '100%',
                    padding: '12px 38px 12px 38px',
                    borderRadius: '8px',
                    backgroundColor: '#16110E',
                    border: '1px solid rgba(184, 154, 100, 0.35)',
                    color: '#F6EFE4',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <Search
                  size={15}
                  color="var(--color-brass)"
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'rgba(246, 239, 228, 0.6)',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    title="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* 3. Price Filter / Sort Selector */}
            <div style={{ flex: '1 1 200px', minWidth: '180px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '11px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-brass)',
                  marginBottom: '8px',
                }}
              >
                Sort by Price
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '12px 38px 12px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#16110E',
                    border: '1px solid rgba(184, 154, 100, 0.35)',
                    color: '#F6EFE4',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: 500,
                    appearance: 'none',
                    cursor: 'pointer',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="default" style={{ backgroundColor: '#191410', color: '#F6EFE4' }}>Default Order</option>
                  <option value="price_asc" style={{ backgroundColor: '#191410', color: '#F6EFE4' }}>Price: Low to High (₹ to ₹₹₹)</option>
                  <option value="price_desc" style={{ backgroundColor: '#191410', color: '#F6EFE4' }}>Price: High to Low (₹₹₹ to ₹)</option>
                </select>
                <ChevronDown
                  size={16}
                  color="var(--color-brass)"
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* Active Filter Chips & Reset Bar */}
          {(selectedCategory !== 'all' || searchQuery.trim() || sortBy !== 'default') && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '16px',
                paddingTop: '14px',
                borderTop: '1px solid rgba(184, 154, 100, 0.15)',
                flexWrap: 'wrap',
                fontSize: '12px',
                color: 'rgba(246, 239, 228, 0.75)',
              }}
            >
              <span>Active Filters:</span>
              {selectedCategory !== 'all' && (
                <span style={{ backgroundColor: 'rgba(184, 154, 100, 0.15)', border: '1px solid rgba(184, 154, 100, 0.3)', color: 'var(--color-brass)', padding: '2px 8px', borderRadius: '4px' }}>
                  {currentCategory?.name || selectedCategory}
                </span>
              )}
              {searchQuery.trim() && (
                <span style={{ backgroundColor: 'rgba(184, 154, 100, 0.15)', border: '1px solid rgba(184, 154, 100, 0.3)', color: 'var(--color-brass)', padding: '2px 8px', borderRadius: '4px' }}>
                  "{searchQuery}"
                </span>
              )}
              {sortBy !== 'default' && (
                <span style={{ backgroundColor: 'rgba(184, 154, 100, 0.15)', border: '1px solid rgba(184, 154, 100, 0.3)', color: 'var(--color-brass)', padding: '2px 8px', borderRadius: '4px' }}>
                  {sortBy === 'price_asc' ? 'Price: Low to High' : 'Price: High to Low'}
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchQuery('')
                  setSortBy('default')
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#F87171',
                  cursor: 'pointer',
                  fontSize: '12px',
                  textDecoration: 'underline',
                  marginLeft: 'auto',
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Content Render: View 1 (All Categories Sectioned) OR View 2 (Filtered Grid) */}
        {isAllDefaultView ? (
          /* View 1: All Categories rendered together in sequential sections */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '52px', marginBottom: '56px' }}>
            {categories.map((cat, catIdx) => {
              const catDishes = allDishes.filter(d => d.categoryId === cat.id || d.categoryId === cat.name.toLowerCase())
              if (catDishes.length === 0) return null

              return (
                <div key={cat.id} id={`category-${cat.id}`}>
                  {/* Category Header Banner */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      flexWrap: 'wrap',
                      gap: '12px',
                      padding: '16px 22px',
                      backgroundColor: 'rgba(38, 31, 26, 0.65)',
                      borderRadius: '12px',
                      borderLeft: '4px solid var(--color-brass)',
                      borderRight: '1px solid rgba(184, 154, 100, 0.15)',
                      borderTop: '1px solid rgba(184, 154, 100, 0.15)',
                      borderBottom: '1px solid rgba(184, 154, 100, 0.15)',
                      marginBottom: '22px',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h3
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(22px, 2.5vw, 28px)',
                            fontWeight: 400,
                            color: 'var(--color-text-inverse)',
                            margin: 0,
                          }}
                        >
                          {cat.name}
                        </h3>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(47, 125, 79, 0.15)',
                            border: '1px solid rgba(47, 125, 79, 0.3)',
                            color: '#4ADE80',
                          }}
                        >
                          {catDishes.length} {catDishes.length === 1 ? 'Dish' : 'Dishes'}
                        </span>
                      </div>
                      <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'rgba(246, 239, 228, 0.72)', lineHeight: 1.5 }}>
                        {cat.seoIntro}
                      </p>
                    </div>

                    <span style={{ fontSize: '11px', color: 'var(--color-brass)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Section {catIdx + 1} of {categories.length}
                    </span>
                  </div>

                  {/* Dishes Grid for this Category */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
                      gap: '24px',
                    }}
                    className="menu-dishes-grid"
                  >
                    {catDishes.map((dish, idx) => renderDishCard(dish, idx, cat))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* View 2: Filtered or Sorted Grid */
          <div style={{ marginBottom: '56px' }}>
            {/* Header info for active selection */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                padding: '14px 20px',
                backgroundColor: 'rgba(38, 31, 26, 0.5)',
                borderRadius: '8px',
                border: '1px solid rgba(184, 154, 100, 0.15)',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: '#F6EFE4', margin: 0, fontWeight: 400 }}>
                {selectedCategory !== 'all' ? (currentCategory?.name || selectedCategory) : 'All Dishes'}
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--color-brass)', fontWeight: 600 }}>
                {processedDishes.length} {processedDishes.length === 1 ? 'Dish Found' : 'Dishes Found'}
              </span>
            </div>

            {processedDishes.length === 0 ? (
              <div
                style={{
                  padding: '48px 24px',
                  textAlign: 'center',
                  backgroundColor: 'rgba(38, 31, 26, 0.6)',
                  borderRadius: '12px',
                  border: '1px solid rgba(184, 154, 100, 0.2)',
                }}
              >
                <Search size={36} color="var(--color-brass)" style={{ margin: '0 auto 12px', opacity: 0.7 }} />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: '#F6EFE4', margin: '0 0 8px' }}>
                  No Dishes Match Your Query
                </h4>
                <p style={{ fontSize: '14px', color: 'rgba(246, 239, 228, 0.7)', margin: '0 0 16px' }}>
                  We couldn't find any dish matching "{searchQuery}". Try searching for popular items like "paneer", "pizza", "noodles", or "kebab".
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all')
                    setSearchQuery('')
                    setSortBy('default')
                  }}
                  style={{
                    backgroundColor: 'var(--color-brass)',
                    border: 'none',
                    color: '#16110E',
                    padding: '9px 20px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  View All Menu Dishes
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
                  gap: '24px',
                }}
                className="menu-dishes-grid"
              >
                {processedDishes.map((dish, idx) => renderDishCard(dish, idx))}
              </div>
            )}
          </div>
        )}

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
              {allDishes.length} Dishes Total · 100% Pure Vegetarian
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

      {/* Floating Bottom Cart Bar (Sticky when cart has items) */}
      <AnimatePresence>
        {totalItemCount > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 220 }}
            style={{
              position: 'fixed',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              width: 'calc(100% - 32px)',
              maxWidth: '560px',
              backgroundColor: '#191410',
              border: '1.5px solid var(--color-brass)',
              borderRadius: '14px',
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative' }}>
                <ShoppingBag size={22} color="var(--color-brass)" />
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-8px',
                    backgroundColor: 'var(--color-brass)',
                    color: '#16110E',
                    fontSize: '10px',
                    fontWeight: 800,
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {totalItemCount}
                </span>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#F6EFE4' }}>
                  {totalItemCount} {totalItemCount === 1 ? 'Dish' : 'Dishes'} in Tray
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-brass)', fontWeight: 600 }}>
                  ₹{subtotal} (Plus 5% GST)
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={openCart}
                style={{
                  background: 'none',
                  border: '1px solid rgba(184, 154, 100, 0.4)',
                  color: '#F6EFE4',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                View Tray
              </button>
              <Link
                to="/checkout"
                style={{
                  background: 'linear-gradient(135deg, var(--color-brass), var(--color-brass-light))',
                  color: '#16110E',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 10px rgba(184, 154, 100, 0.3)',
                }}
              >
                <span>Checkout</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scoped CSS for card hover states */}
      <style>{`
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
        }
        @media (max-width: 640px) {
          .menu-dishes-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
