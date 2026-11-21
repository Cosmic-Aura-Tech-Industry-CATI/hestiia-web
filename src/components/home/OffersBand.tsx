'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { OFFERS_CONFIG } from '../../content/offers'
import { ArrowRight, Copy, Check } from 'lucide-react'
import ShinyText from '../reactbits/ShinyText'
import RotatingText from '../reactbits/RotatingText'
import CircularText from '../reactbits/CircularText'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { promotionsService } from '../../services/promotions.service'
import type { Promotion } from '../../types/api'
import './offers-band.css'

gsap.registerPlugin(ScrollTrigger)

export default function OffersBand() {
  const sectionRef = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)
  const [promotions, setPromotions] = useState<Promotion[]>([])

  useEffect(() => {
    promotionsService
      .getPromotions()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPromotions(data)
        }
      })
      .catch(() => {})
  }, [])

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

  const hasStaticOffers = OFFERS_CONFIG.enabled && OFFERS_CONFIG.items && OFFERS_CONFIG.items.length > 0
  const hasDynamicOffers = promotions.length > 0

  if (!hasStaticOffers && !hasDynamicOffers) {
    return null
  }

  const primaryOffer = hasDynamicOffers
    ? {
        title: promotions[0].title,
        description: promotions[0].subtitle,
        code: promotions[0].badge || 'WELCOME10',
      }
    : OFFERS_CONFIG.items[0]

  const offerTitles = hasDynamicOffers
    ? promotions.map((p) => p.title)
    : OFFERS_CONFIG.items.map((item) => item.title)

  const couponCode = primaryOffer.code || 'WELCOME10'

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
      aria-label="Current Offers and Dining Specials"
    >
      <div className="offers-band__shimmer" aria-hidden="true" />

      <div className="container">
        <div className="offers-band__inner">
          <div className="offers-band__content">
            <span className="offers-band__badge">
              <ShinyText text="Special Dining Privilege" speed={3.5} />
            </span>

            <div className="offers-band__heading">
              <span className="offers-band__eyebrow">Limited Time Privilege</span>
              {offerTitles.length > 1 ? (
                <div className="offers-band__rotating-title">
                  <RotatingText texts={offerTitles} interval={3500} />
                </div>
              ) : (
                <h3 className="offers-band__static-title">{primaryOffer.title}</h3>
              )}
            </div>

            <p className="offers-band__desc">{primaryOffer.description}</p>
          </div>

          <div className="offers-band__actions">
            <div className="offers-band__coupon">
              <span className="offers-band__coupon-label">Use Privilege Code:</span>
              <button
                type="button"
                className={`offers-band__coupon-btn ${copied ? 'offers-band__coupon-btn--copied' : ''}`}
                onClick={handleCopy}
                aria-label={`Copy coupon code ${couponCode}`}
              >
                <span className="offers-band__coupon-code">{couponCode}</span>
                <span className="offers-band__coupon-icon" aria-hidden="true">
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Check size={14} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Copy size={14} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </button>
            </div>

            <Link
              href="/offers"
              className="btn btn-primary offers-band__cta"
              aria-label="View all seasonal dining offers"
            >
              <span>Explore All Offers</span>
              <ArrowRight size={14} className="offers-band__cta-arrow" />
            </Link>
          </div>

          <div className="offers-band__badge-wrap" aria-hidden="true">
            <CircularText text="PURE VEGETARIAN SANCTUARY · " radius={48} spinDuration={18} />
          </div>
        </div>
      </div>
    </section>
  )
}
