import { useState } from 'react'
import { Tag, Copy, Check, Clock, Sparkles } from 'lucide-react'
import PageHero from '../components/PageHero'
import PageClosingCta from '../components/PageClosingCta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { OFFERS_CONFIG } from '../content/offers'
import { RESTAURANT } from '../content/restaurant'
import { InstagramIcon } from '../components/icons/InstagramIcon'

export default function Offers() {
  useDocumentMeta(
    'Exclusive Offers & Dining Privileges',
    'Explore current seasonal dining offers, discounts, and privileges at Hestiia Restaurant in Shyam Nagar, Kanpur.'
  )

  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => {
      setCopiedCode(null)
    }, 2000)
  }

  const hasActiveOffers = OFFERS_CONFIG.enabled && OFFERS_CONFIG.items.length > 0

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
              {OFFERS_CONFIG.items.map(offer => (
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
                      {offer.description}
                    </p>

                    {offer.terms && offer.terms.length > 0 && (
                      <ul
                        style={{
                          paddingLeft: '18px',
                          margin: '0 0 16px',
                          fontSize: '12px',
                          lineHeight: 1.6,
                          color: 'rgba(246, 239, 228, 0.6)',
                        }}
                      >
                        {offer.terms.map((term, i) => (
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
                    {offer.code && (
                      <button
                        onClick={() => handleCopy(offer.code!)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          backgroundColor: 'rgba(184, 154, 100, 0.15)',
                          border: '1px dashed var(--color-brass)',
                          color: 'var(--color-brass-light)',
                          fontFamily: 'monospace',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {copiedCode === offer.code ? <Check size={14} color="#4ADE80" /> : <Copy size={14} />}
                        <span>{copiedCode === offer.code ? 'Copied!' : offer.code}</span>
                      </button>
                    )}

                    {offer.validTill && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'rgba(246, 239, 228, 0.5)' }}>
                        <Clock size={12} />
                        <span>Valid till {offer.validTill}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Closing CTA Band */}
      <PageClosingCta
        title="Dine with Us at"
        accentWord="Hestiia"
        subtitle="Enjoy authentic flavours and thoughtful hospitality on your next visit to Shyam Nagar, Kanpur."
      />
    </>
  )
}
