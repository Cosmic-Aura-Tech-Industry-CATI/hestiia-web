import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Music, HeartHandshake } from 'lucide-react'
import SpotlightCard from '../reactbits/SpotlightCard'
import TapScale from '../reactbits/TapScale'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './experience-teaser.css'

gsap.registerPlugin(ScrollTrigger)

export default function ExperienceTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const cards = [
    {
      id: 'family-dining',
      title: 'Family Dining Sanctuary',
      badge: 'Certified Pure Veg',
      badgeColor: '#2F7D4F',
      description: 'Generous table layouts, warm acoustic pacing, and dedicated hospitality designed for relaxed family dinners and celebrations.',
      icon: HeartHandshake,
      isPulse: false,
    },
    {
      id: 'private-dining',
      title: 'Private Dining Space',
      badge: 'Ask us',
      badgeColor: 'var(--color-brass, #B89A64)',
      description: 'Dedicated private dining area for birthday banquets, intimate anniversaries, and family get-togethers.',
      icon: Users,
      isPulse: true,
    },
    {
      id: 'live-music',
      title: 'Acoustic Evenings',
      badge: 'Ask us',
      badgeColor: 'var(--color-brass, #B89A64)',
      description: 'Mellow acoustic performances and soothing soundscapes during select weekend dinner gatherings.',
      icon: Music,
      isPulse: true,
    },
  ]

  // Track viewport size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // GSAP: Desktop entrance + Mobile sticky stack scaling and glow sweep
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cardWraps = section.querySelectorAll<HTMLElement>('.experience-card-wrap')
    const iconBoxes = section.querySelectorAll<HTMLElement>('.exp-card__icon-box')
    const header = section.querySelector('.experience-teaser__header')

    if (isReduced) {
      gsap.set([header, cardWraps, iconBoxes], { opacity: 1, y: 0, scale: 1, rotate: 0 })
      return
    }

    const mm = gsap.matchMedia()

    // 1. Desktop: Stagger entrance + icon rotate-settle
    mm.add('(min-width: 1024px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          once: true,
        },
      })

      tl.from(header, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power3.out',
      })
        .from(
          cardWraps,
          {
            opacity: 0,
            y: 28,
            scale: 0.96,
            stagger: 0.12,
            duration: 0.85,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .from(
          iconBoxes,
          {
            opacity: 0,
            scale: 0.75,
            rotate: -18,
            stagger: 0.12,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.7'
        )
    })

    // 2. Mobile: Sticky stack dim/scale effect as each card is overlapped
    mm.add('(max-width: 1023px)', () => {
      cardWraps.forEach((wrap, i) => {
        // Soft glow sweep on viewport enter
        const glowLayer = wrap.querySelector('.mobile-glow-sweep')
        ScrollTrigger.create({
          trigger: wrap,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            if (glowLayer) {
              glowLayer.classList.add('mobile-glow-sweep--active')
            }
          },
        })

        // Scale & dim previous card when the next card slides over it
        if (i < cardWraps.length - 1) {
          const nextCard = cardWraps[i + 1]
          gsap.to(wrap, {
            scale: 0.94,
            opacity: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top 65%',
              end: 'top 25%',
              scrub: true,
            },
          })
        }
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="experience-teaser section section-dark"
      aria-labelledby="experience-teaser-title"
    >
      <div className="container">
        {/* Header */}
        <div className="experience-teaser__header">
          <div>
            <span className="experience-teaser__eyebrow">
              The Hestiia Experience
            </span>
            <h2 id="experience-teaser-title" className="experience-teaser__title">
              Hospitality Beyond the Plate.
            </h2>
          </div>

          <Link
            to="/about#experience"
            className="experience-teaser__header-link"
            aria-label="Explore the dining sanctuary experience"
          >
            <span>Explore The Experience</span>
            <ArrowRight size={14} className="exp-header-arrow" />
          </Link>
        </div>

        {/* 3 Cards: Desktop SpotlightCard vs Mobile Sticky Stacking */}
        <div className="experience-teaser__cards-grid">
          {cards.map((card, idx) => {
            const Icon = card.icon

            const cardContent = (
              <div
                className="experience-card"
                style={{
                  height: '100%',
                }}
              >
                {/* Mobile glow sweep layer */}
                {isMobile && <div className="mobile-glow-sweep" aria-hidden="true" />}

                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '18px',
                    }}
                  >
                    <div className="exp-card__icon-box">
                      <Icon size={20} color="var(--color-brass, #B89A64)" />
                    </div>

                    <span
                      className={`exp-card__badge ${card.isPulse ? 'chip-soft-pulse' : ''}`}
                      style={{
                        border: `1px solid ${card.badgeColor}`,
                        color: card.badgeColor,
                      }}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="exp-card__title">
                    {card.title}
                  </h3>

                  <p className="exp-card__desc">
                    {card.description}
                  </p>
                </div>

                <div style={{ marginTop: '24px' }}>
                  <Link
                    to="/about#experience"
                    className="exp-card__link"
                    aria-label={`Read details about ${card.title}`}
                  >
                    <span>Read details</span>
                    <ArrowRight size={12} className="exp-card__arrow" />
                  </Link>
                </div>
              </div>
            )

            return (
              <div
                key={card.id}
                className="experience-card-wrap"
                style={{ '--card-index': idx } as React.CSSProperties}
              >
                {!isMobile ? (
                  <SpotlightCard
                    spotlightColor="rgba(184, 154, 100, 0.18)"
                    className="h-full"
                  >
                    {cardContent}
                  </SpotlightCard>
                ) : (
                  <TapScale scale={0.97} style={{ width: '100%', height: '100%' }}>
                    {cardContent}
                  </TapScale>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
