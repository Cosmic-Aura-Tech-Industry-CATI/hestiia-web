import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import interiorImg from '../assets/images/restaurant_interior.jpg'
import ScrollReveal from './reactbits/ScrollReveal'

gsap.registerPlugin(ScrollTrigger)

export default function BrandIntro() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion) return

    const ctx = gsap.context(() => {
      // Image reveal with mask wipe
      gsap.from(imageWrapRef.current, {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.4,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      gsap.from(imageRef.current, {
        scale: 1.15,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="brand-intro section" id="story" aria-labelledby="story-title">
      <div className="container">
        <div className="brand-intro__grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
          {/* Framed Image with Mask Reveal */}
          <div
            ref={imageWrapRef}
            className="brand-intro__image-wrap"
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              border: '1px solid rgba(184, 154, 100, 0.15)',
              aspectRatio: '4 / 5',
            }}
          >
            <img
              ref={imageRef}
              src={interiorImg}
              alt="Celebration and dining hall at Hestiia Restaurant in Shyam Nagar, Kanpur"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 60%, rgba(31, 26, 22, 0.6) 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Editorial Content */}
          <div className="brand-intro__content">
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-brass)',
                marginBottom: '16px',
              }}
            >
              Our Story & Heritage
            </span>

            <h2
              id="story-title"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(32px, 4vw, 56px)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: 'var(--color-text-inverse)',
                marginBottom: '28px',
              }}
            >
              Made for Every Craving. <br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)' }}>Shared with Everyone.</em>
            </h2>

            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', lineHeight: 1.8, color: 'rgba(246, 239, 228, 0.75)' }}>
              <ScrollReveal>
                Hestiia is a welcoming vegetarian dining destination in the heart of Shyam Nagar, Kanpur — where families gather for authentic North Indian thalis, friends connect over sizzling Indo-Chinese preparations, and every meal is crafted with intention.
              </ScrollReveal>

              <div style={{ height: '16px' }} />

              <ScrollReveal>
                From slow-simmered hand-ground curries to fresh wok-tossed creations, our kitchen celebrates pure vegetarian dining through fresh ingredients, generous hospitality, and an atmosphere designed to feel like home.
              </ScrollReveal>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                marginTop: '40px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(184, 154, 100, 0.15)',
              }}
            >
              <div>
                <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--color-brass)' }}>
                  100%
                </span>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(246, 239, 228, 0.6)' }}>
                  Pure Vegetarian
                </span>
              </div>
              <div style={{ width: '1px', height: '36px', backgroundColor: 'rgba(184, 154, 100, 0.15)' }} />
              <div>
                <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--color-brass)' }}>
                  4
                </span>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(246, 239, 228, 0.6)' }}>
                  Cuisine Disciplines
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
