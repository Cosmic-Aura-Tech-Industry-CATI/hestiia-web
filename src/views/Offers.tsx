'use client'

import { useState, useEffect } from 'react'
import { Tag, Copy, Check, Clock, Sparkles } from 'lucide-react'
import PageHero from '../components/PageHero'
import PageClosingCta from '../components/PageClosingCta'
import { OFFERS_CONFIG } from '../content/offers'
import { RESTAURANT } from '../content/restaurant'
import { InstagramIcon } from '../components/icons/InstagramIcon'
import { promotionsService } from '../services/promotions.service'
import type { Promotion } from '../types/api'

export default function Offers() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [promotions, setPromotions] = useState<Promotion[]>([])

  useEffect(() => {
    promotionsService
      .getPromotions()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPromotions(data)
        }
      })
      .catch(() => {
        // Fallback silently
      })
  }, [])

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => {
      setCopiedCode(null)
    }, 2000)
  }

  // Display either dynamic backend promotions or static items
  const activeItems = promotions.length > 0 ? promotions : OFFERS_CONFIG.items
  const hasActiveOffers = (OFFERS_CONFIG.enabled && OFFERS_CONFIG.items.length > 0) || promotions.length > 0

  return (
    <>
      <PageHero
        title="Curated Dining"
        accentWord="Privileges"
        intro="Seasonal celebrations, festive packages, and exclusive dining privileges at our Shyam Nagar sanctuary."
        currentPage="Offers"
      />

      <section
        style={{
          padding: '64px 0 96px',
          backgroundColor: '#16110E',
          minHeight: '45vh',
        }}
      >
        <div className="container">
          {!hasActiveOffers ? (
            /* Friendly Empty / Coming Soon State */
            <div
              style={{
                maxWidth: '620px',
                margin: '0 auto',
                padding: '48px 36px',
                borderRadius: '16px',
                backgroundColor: 'rgba(38, 31, 26, 0.75)',
                border: '1px solid rgba(184, 154, 100, 0.25)',
                textAlign: 'center',
                boxShadow: '0 20px 48px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(184, 154, 100, 0.15)',
                  border: '1px solid rgba(184, 154, 100, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: 'var(--color-brass)',
                }}
              >
                <Sparkles size={24} />
              </div>

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
                Seasonal Dining Specials
              </span>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(28px, 4vw, 38px)',
                  fontWeight: 300,
                  color: 'var(--color-text-inverse)',
                  margin: '0 0 16px',
                }}
              >
                New Offers <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)' }}>Coming Soon</em>
              </h2>

              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: 'rgba(246, 239, 228, 0.75)',
                  marginBottom: '32px',
                }}
              >
                We regularly introduce festive thali celebrations, holiday banquets, and weekday dining treats. Follow our official Instagram page to be the first to know about new perks and flash dining discounts.
              </p>

              {RESTAURANT.social.instagram && (
                <a
                  href={RESTAURANT.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '13px 26px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-brass)',
                    color: '#1F1A16',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textDecoration: 'none',
                    boxShadow: '0 4px 16px rgba(184, 154, 100, 0.25)',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <InstagramIcon size={16} />
                  <span>Follow @hestiiarestaurant on Instagram</span>
                </a>
              )}
            </div>
          ) : (
            /* Active Offers Grid */
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '28px',
              }}
            >
              {activeItems.map((offer: any) => (
                <div
                  key={offer.id}
                  style={{
                    padding: '32px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(38, 31, 26, 0.8)',
                    border: '1px solid rgba(184, 154, 100, 0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '20px',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <Tag size={16} color="var(--color-brass)" />
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '24px',
                          fontWeight: 400,
                          color: 'var(--color-text-inverse)',
                          margin: 0,
                        }}
                      >
                        {offer.title}
                      </h3>
                    </div>

                    <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(246, 239, 228, 0.8)', margin: '0 0 16px' }}>
                      {offer.description || offer.subtitle}
                    </p>

                    {(offer.terms || offer.items) && (offer.terms || offer.items).length > 0 && (
                      <ul
                        style={{
                          paddingLeft: '18px',
                          margin: '0 0 16px',
                          fontSize: '12px',
                          lineHeight: 1.6,
                          color: 'rgba(246, 239, 228, 0.6)',
                        }}
                      >
                        {(offer.terms || offer.items).map((term: string, i: number) => (
                          <li key={i}>{term}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div
                    style={{
                      borderTop: '1px solid rgba(184, 154, 100, 0.15)',
                      paddingTop: '16px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    {(offer.code || offer.badge) && (
                      <button
                        onClick={() => handleCopy(offer.code || offer.badge)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(184, 154, 100, 0.15)',
                          border: '1px dashed var(--color-brass)',
                          color: 'var(--color-brass)',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {copiedCode === (offer.code || offer.badge) ? (
                          <>
                            <Check size={12} />
                            <span>COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>{offer.code || offer.badge}</span>
                          </>
                        )}
                      </button>
                    )}

                    {offer.validTill && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '11px',
                          color: 'rgba(246, 239, 228, 0.5)',
                        }}
                      >
                        <Clock size={12} />
                        Valid till {offer.validTill}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <PageClosingCta
        title="Reserve Your Table for Special"
        accentWord="Privileges"
        subtitle="Call directly to plan custom banquets, party catering, or festival dinner reservations."
      />
    </>
  )
}
