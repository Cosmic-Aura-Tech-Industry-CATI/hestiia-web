import { useEffect, useRef } from 'react'
import { ArrowRight, Users, Music, HeartHandshake } from 'lucide-react'
import SpotlightCard from '../reactbits/SpotlightCard'
import TapScale from '../reactbits/TapScale'
import Button from '../ui/Button'
import SnapCarousel from './SnapCarousel'
import { useDeviceMotion } from '../../hooks/useDeviceMotion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './experience-teaser.css'

gsap.registerPlugin(ScrollTrigger)

export default function ExperienceTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const { isMobile, isTouch } = useDeviceMotion()

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
      description: 'Dedicated private dining area for birthday banquets, intimate anniversaries, and family get-togethers in Shyam Nagar.',
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

  // GSAP: Desktop entrance + Mobile reveal
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

    const safetyTimer = setTimeout(() => {
      gsap.set([header, cardWraps, iconBoxes], {
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        clearProps: 'transform,opacity',
      })
    }, 1500)

    // 1. Desktop: Stagger entrance + icon rotate-settle
    mm.add('(min-width: 1024px) and (hover: hover)', () => {
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

    // 2. Mobile: Simple clean one-time reveal
    mm.add('(max-width: 1023px), (hover: none)', () => {
      gsap.from([header, cardWraps], {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.08,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          once: true,
        },
      })
    })

    return () => {
      clearTimeout(safetyTimer)
      mm.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="experience-teaser home-section section-dark section-ambient-glow"
      aria-labelledby="experience-teaser-title"
    >
      <div className="home-container">
        {/* Header */}
        <div className="experience-teaser__header">
          <div>
            <span className="eyebrow experience-teaser__eyebrow">
              Atmosphere & Hospitality
            </span>
            <h2 id="experience-teaser-title" className="h-section experience-teaser__title">
              Crafted for Intimate <em className="accent">Gatherings</em>.
            </h2>
          </div>

          <Button
            to="/about#experience"
            variant="secondary"
            size="md"
            icon={<ArrowRight size={14} />}
            iconPosition="right"
            aria-label="Explore guest experiences and private dining at Hestiia"
          >
            Explore Guest Experiences
          </Button>
        </div>

        {/* 3 Experience Cards: Desktop 3-col grid, SnapCarousel below 1024px */}
        <SnapCarousel
          itemCount={cards.length}
          ariaLabel="Guest Experiences Carousel"
          desktopWrapperClassName="experience-teaser__cards-grid grid-three-col"
        >
          {cards.map((card, idx) => {
            const Icon = card.icon

            const cardContent = (
              <div className="experience-card card">
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <div className="exp-card__icon-box">
                      <Icon size={20} color="var(--color-brass, #B89A64)" aria-hidden="true" />
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

                  <h3 className="h-card exp-card__title">
                    {card.title}
                  </h3>

                  <p className="exp-card__desc body">
                    {card.description}
                  </p>
                </div>

                <div className="card__actions" style={{ marginTop: '24px' }}>
                  <Button
                    to="/about#experience"
                    variant="ghost"
                    size="md"
                    icon={<ArrowRight size={13} />}
                    iconPosition="right"
                    aria-label={`Read details about ${card.title}`}
                  >
                    Read details
                  </Button>
                </div>
              </div>
            )

            return (
              <div
                key={card.id}
                className="experience-card-wrap"
                style={{ '--card-index': idx } as React.CSSProperties}
              >
                {!isMobile && !isTouch ? (
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
        </SnapCarousel>
      </div>
    </section>
  )
}
