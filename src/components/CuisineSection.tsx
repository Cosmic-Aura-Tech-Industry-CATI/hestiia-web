import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { CUISINES } from '../content/cuisines'
import { MENU_CONFIG } from '../content/menu'
import '../styles/cuisine.css'

gsap.registerPlugin(ScrollTrigger)

// ─── Tunable constants (mirror CSS vars for JS use) ─────────────────────────
const HEADER_H = 76 // px — keep in sync with hero.css --header-h
const STACK_OFFSET = 12 // px — extra offset per card (mirror --cuisine-stack-offset)

// ─── Desktop Panel spotlight glow ────────────────────────────────────────────
function PanelSpotlight({ isExpanded }: { isExpanded: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.parentElement!.getBoundingClientRect()
    pos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    ref.current.style.background = `radial-gradient(220px circle at ${pos.current.x}px ${pos.current.y}px, rgba(184, 154, 100, 0.18), transparent 75%)`
  }, [])

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isReducedMotion || isTouchDevice) return

    const parent = ref.current?.parentElement
    if (!parent) return

    parent.addEventListener('mousemove', handleMouseMove)
    return () => parent.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <div
      ref={ref}
      className="cuisine-panel__spotlight"
      aria-hidden="true"
      style={{
        opacity: isExpanded ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    />
  )
}

// ─── Desktop Expanding Panels ─────────────────────────────────────────────────
function DesktopPanels() {
  const [activeIndex, setActiveIndex] = useState(0)
  const panelRefs = useRef<(HTMLLIElement | null)[]>([])
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const expand = useCallback((idx: number) => {
    setActiveIndex(idx)
  }, [])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent, idx: number) => {
    const len = CUISINES.length
    let next = idx
    if (e.key === 'ArrowRight') { e.preventDefault(); next = (idx + 1) % len }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); next = (idx - 1 + len) % len }
    else if (e.key === 'Home') { e.preventDefault(); next = 0 }
    else if (e.key === 'End') { e.preventDefault(); next = len - 1 }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); expand(idx); return }
    else return

    expand(next)
    panelRefs.current[next]?.focus()
  }, [expand])

  return (
    <ul
      className="cuisine-panels"
      role="tablist"
      aria-label="Cuisine categories"
    >
      {CUISINES.map((item, idx) => {
        const isExpanded = idx === activeIndex
        const flexGrow = isExpanded ? 3 : 1

        return (
          <motion.li
            key={item.id}
            ref={el => { panelRefs.current[idx] = el }}
            className={`cuisine-panel ${isExpanded ? 'cuisine-panel--expanded' : 'cuisine-panel--collapsed'}`}
            role="tab"
            tabIndex={isExpanded ? 0 : -1}
            aria-selected={isExpanded}
            aria-label={`${item.title} cuisine category`}
            onMouseEnter={() => expand(idx)}
            onClick={() => expand(idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            animate={{ flexGrow }}
            transition={isReducedMotion ? { duration: 0 } : {
              type: 'spring',
              stiffness: 220,
              damping: 28,
            }}
            style={{ flexGrow }}
          >
            {/* Full-bleed image */}
            <motion.img
              src={item.image}
              alt={`${item.title} – pure vegetarian cuisine at Hestiia Restaurant, Kanpur`}
              loading={idx === 0 ? 'eager' : 'lazy'}
              width={640}
              height={480}
              className="cuisine-panel__img"
              animate={{ scale: isExpanded ? 1.06 : 1.0 }}
              transition={isReducedMotion ? { duration: 0 } : {
                type: 'spring',
                stiffness: 120,
                damping: 20,
              }}
            />

            {/* Gradient scrim */}
            <div className="cuisine-panel__scrim" aria-hidden="true" />

            {/* Spotlight glow */}
            <PanelSpotlight isExpanded={isExpanded} />

            {/* Number badge */}
            <span className="cuisine-panel__number" aria-hidden="true">
              0{item.order}
            </span>

            {/* Collapsed: vertical title */}
            <AnimatePresence initial={false}>
              {!isExpanded && (
                <motion.div
                  className="cuisine-panel__title-vertical"
                  key="vert"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={isReducedMotion ? { duration: 0 } : { duration: 0.2 }}
                  aria-hidden="true"
                >
                  <span>{item.title}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expanded: full content */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  className="cuisine-panel__content"
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={isReducedMotion ? { duration: 0 } : { duration: 0.25, delay: 0.15 }}
                >
                  <h3 className="cuisine-panel__title">{item.title}</h3>
                  <div className="cuisine-panel__expanded-content">
                    <p className="cuisine-panel__desc">{item.description}</p>
                    <a
                      href="#menu"
                      className="cuisine-panel__explore"
                      aria-label={`Explore ${item.title} menu`}
                      tabIndex={isExpanded ? 0 : -1}
                    >
                      <span>Explore</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        )
      })}
    </ul>
  )
}

// ─── Mobile Stacking Cards ────────────────────────────────────────────────────
function MobileCards() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const innerRefs = useRef<(HTMLDivElement | null)[]>([])
  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion) return

    ctxRef.current = gsap.context(() => {
      innerRefs.current.forEach((el, idx) => {
        if (!el || idx === CUISINES.length - 1) return // last card doesn't get dimmed

        // The next card triggers the dim on the current card
        const nextSticky = el.closest('.cuisine-card-sticky')?.nextElementSibling as HTMLElement
        if (!nextSticky) return

        ScrollTrigger.create({
          trigger: nextSticky,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          onUpdate: self => {
            if (!el) return
            const prog = self.progress
            gsap.set(el, {
              scale: 1 - (1 - 0.94) * prog,
              filter: `brightness(${1 - (1 - 0.7) * prog})`,
            })
          },
        })
      })
    }, sectionRef)

    return () => {
      ctxRef.current?.revert()
    }
  }, [])

  return (
    <div ref={sectionRef} className="cuisine-cards">
      {CUISINES.map((item, idx) => {
        const stickyTop = HEADER_H + 16 + idx * STACK_OFFSET
        return (
          <div
            key={item.id}
            className="cuisine-card-sticky"
            style={{ top: stickyTop }}
          >
            <div
              ref={el => { innerRefs.current[idx] = el }}
              className="cuisine-card-inner"
            >
              <img
                src={item.image}
                alt={`${item.title} – pure vegetarian cuisine at Hestiia Restaurant, Kanpur`}
                loading={idx === 0 ? 'eager' : 'lazy'}
                width={800}
                height={560}
              />
              <div className="cuisine-card__scrim" aria-hidden="true" />
              <span className="cuisine-card__number" aria-hidden="true">0{item.order}</span>
              <div className="cuisine-card__content">
                <h3 className="cuisine-card__title">{item.title}</h3>
                <p className="cuisine-card__desc">{item.description}</p>
                <a
                  href="#menu"
                  className="cuisine-card__explore"
                  aria-label={`Explore ${item.title} menu`}
                >
                  <span>Explore</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Section Reveal ───────────────────────────────────────────────────────────
function useSectionReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion || !ref.current) return

    const ctx = gsap.context(() => {
      const targets = ref.current!.querySelectorAll('.cuisine-reveal')
      gsap.from(targets, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 82%',
          once: true,
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [ref])
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function CuisineSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useSectionReveal(sectionRef)

  return (
    <section
      ref={sectionRef}
      className="cuisine-section"
      id="cuisine"
      aria-labelledby="cuisines-heading"
    >
      {/* Section Header */}
      <div className="container cuisine-reveal">
        <div className="cuisine-header">
          <div className="cuisine-heading-group">
            <span className="cuisine-eyebrow">What We Serve</span>
            <h2 id="cuisines-heading" className="cuisine-heading">
              Four Culinary Traditions.{' '}
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light, #D4B88A)' }}>
                One Pure Destination.
              </em>
            </h2>
          </div>

          <a
            href={MENU_CONFIG.authoritativeMenuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cuisine-menu-link"
            aria-label="View full menu on Zomato (opens in new tab)"
          >
            <span>View Full Menu on Zomato</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Desktop: Expanding Panels */}
      <div className="cuisine-reveal">
        <DesktopPanels />
      </div>

      {/* Mobile / Tablet: Stacking Cards */}
      <MobileCards />
    </section>
  )
}
