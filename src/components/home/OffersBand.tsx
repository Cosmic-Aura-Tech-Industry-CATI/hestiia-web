import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { OFFERS_CONFIG } from '../../content/offers'
import { ArrowRight, Copy, Check } from 'lucide-react'
import ShinyText from '../reactbits/ShinyText'
import RotatingText from '../reactbits/RotatingText'
import CircularText from '../reactbits/CircularText'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './offers-band.css'

gsap.registerPlugin(ScrollTrigger)

export default function OffersBand() {
  const sectionRef = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)

  // Wipe entrance animation
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    gsap.set(section, { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.3 })

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(section, {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        })
      },
    })

    return () => trigger.kill()
  }, [])

  // Render only when offers exist, as now
  if (!OFFERS_CONFIG.enabled || !OFFERS_CONFIG.items || OFFERS_CONFIG.items.length === 0) {
    return null
  }

  const primaryOffer = OFFERS_CONFIG.items[0]
  const offerTitles = OFFERS_CONFIG.items.map((item) => item.title)
  const couponCode = primaryOffer.code || 'HESTIIA10'

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section
      ref={sectionRef}
      className="offers-band"
      aria-label="Current dining promotions and offers"
    >
      {/* Slow animated gold gradient borders */}
      <div className="offers-band__border-top" aria-hidden="true" />
      <div className="offers-band__border-bottom" aria-hidden="true" />

      <div className="container">
        <div className="offers-band__inner">
          <div className="offers-band__left">
            {/* CircularText badge: Hidden below 640px */}
            <div className="offers-circular-badge" aria-hidden="true">
              <CircularText text="• LIMITED PERK • HESTIIA DINING " radius={34} spinDuration={18} />
            </div>

            <div>
              {/* ShinyText headline */}
              <div style={{ marginBottom: '4px' }}>
                <ShinyText
                  text="SANCTUARY DINING PRIVILEGE"
                  speed={3}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                  }}
                />
              </div>

              {/* RotatingText for offer titles */}
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(18px, 2.5vw, 22px)',
                  color: 'var(--color-text-inverse, #F6EFE4)',
                  fontWeight: 400,
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '8px',
                  flexWrap: 'wrap',
                }}
              >
                <RotatingText texts={offerTitles} interval={3200} />
              </div>

              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'rgba(246, 239, 228, 0.75)' }}>
                {primaryOffer.description}
              </p>
            </div>
          </div>

          {/* Right Action: Coupon Code Copy Button with tick animation + View Offer Link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="offers-copy-btn"
              onClick={handleCopy}
              aria-label={`Copy coupon code ${couponCode}`}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#2F7D4F' }}
                  >
                    <Check size={13} />
                    <span>Copied!</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Copy size={13} />
                    <span>Code: {couponCode}</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <Link
              to="/offers"
              className="offers-view-btn"
              aria-label="View current dining offers"
            >
              <span>View Offer</span>
              <ArrowRight size={13} className="offers-arrow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
