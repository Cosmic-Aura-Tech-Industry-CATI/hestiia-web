import { useEffect, useRef, useState } from 'react'
import { MapPin, Clock, Phone, MessageSquare, Navigation, Calendar, ArrowRight } from 'lucide-react'
import { RESTAURANT } from '../../content/restaurant'
import Magnet from '../reactbits/Magnet'
import TapScale from '../reactbits/TapScale'
import Button from '../ui/Button'
import { useDeviceMotion } from '../../hooks/useDeviceMotion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './visit-teaser.css'

gsap.registerPlugin(ScrollTrigger)

export default function VisitTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const mapPinRef = useRef<HTMLDivElement>(null)

  const { isMobile, isTouch } = useDeviceMotion()
  const [liveStatus, setLiveStatus] = useState<{
    isOpen: boolean
    label: string
    detail: string
  }>({
    isOpen: true,
    label: 'Open Now',
    detail: 'Closes at 11:00 PM',
  })

  // Live "Open now / Closed" badge calculation (Daily 11:00 to 23:00)
  useEffect(() => {
    const calculateStatus = () => {
      const now = new Date()
      const hours = now.getHours()
      const isOpen = hours >= 11 && hours < 23

      setLiveStatus({
        isOpen,
        label: isOpen ? 'Open Now' : 'Closed Now',
        detail: isOpen ? 'Closes at 11:00 PM' : 'Opens at 11:00 AM',
      })
    }

    calculateStatus()
    const timer = setInterval(calculateStatus, 60000)
    return () => clearInterval(timer)
  }, [])

  // GSAP: Card clip reveal slide up, address lines stagger, and map pin drop
  useEffect(() => {
    const section = sectionRef.current
    const card = cardRef.current
    const mapPin = mapPinRef.current
    if (!section || !card) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const header = section.querySelector('.visit-teaser__header')
    const lines = card.querySelectorAll('.visit-info-line')
    const actions = card.querySelectorAll('.visit-actions-row > *')

    if (isReduced) {
      gsap.set([card, header, lines, actions, mapPin], { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' })
      return
    }

    const mm = gsap.matchMedia()

    const safetyTimer = setTimeout(() => {
      gsap.set([card, header, lines, actions, mapPin], {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0% 0% 0%)',
        clearProps: 'clipPath,transform,opacity',
      })
    }, 1500)

    mm.add(
      {
        isDesktop: '(min-width: 1024px) and (hover: hover)',
        isMobile: '(max-width: 1023px), (hover: none)',
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean; isMobile: boolean }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        })

        // Header entrance
        tl.from(header, {
          opacity: 0,
          y: isDesktop ? 20 : 12,
          duration: isDesktop ? 0.7 : 0.5,
          ease: 'power3.out',
        })
          // Card wipe reveal slide up
          .from(
            card,
            {
              clipPath: 'inset(100% 0% 0% 0%)',
              y: isDesktop ? 40 : 20,
              opacity: 0,
              duration: isDesktop ? 0.9 : 0.65,
              ease: 'power3.out',
              clearProps: 'clipPath',
            },
            '-=0.3'
          )
          // Info lines stagger
          .from(
            lines,
            {
              opacity: 0,
              y: 16,
              stagger: 0.1,
              duration: 0.6,
              ease: 'power2.out',
              clearProps: 'transform,opacity',
            },
            '-=0.4'
          )
          // Action buttons stagger
          .from(
            actions,
            {
              opacity: 0,
              y: 12,
              stagger: 0.08,
              duration: 0.5,
              ease: 'power2.out',
              clearProps: 'transform,opacity',
            },
            '-=0.3'
          )

        // Dropping map pin animation
        if (mapPin) {
          gsap.fromTo(
            mapPin,
            { y: -24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'bounce.out',
              delay: 0.5,
              clearProps: 'transform,opacity',
            }
          )
        }
      }
    )

    return () => {
      clearTimeout(safetyTimer)
      mm.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="visit-teaser home-section section-dark section-ambient-glow"
      aria-labelledby="visit-teaser-title"
    >
      <div className="home-container">
        {/* Header */}
        <div className="visit-teaser__header">
          <div>
            <span className="eyebrow visit-teaser__eyebrow">
              Hospitality & Access
            </span>
            <h2 id="visit-teaser-title" className="h-section visit-teaser__title">
              Visit the <em className="accent">Sanctuary</em>.
            </h2>
          </div>

          <Button
            to="/contact"
            variant="ghost"
            size="md"
            icon={<ArrowRight size={14} />}
            iconPosition="right"
            aria-label="View full contact, hours, and location details"
          >
            Full Details
          </Button>
        </div>

        {/* Animated Main Card with Clip Reveal */}
        <div ref={cardRef} className="visit-card card">
          {/* Live Open / Closed Status Badge with Pulsing Dot */}
          <div className="visit-live-badge">
            <span
              className={`visit-live-dot ${
                liveStatus.isOpen ? 'visit-live-dot--open' : 'visit-live-dot--closed'
              }`}
              aria-hidden="true"
            />
            <span
              style={{
                color: liveStatus.isOpen ? '#2F7D4F' : 'var(--color-brass, #B89A64)',
              }}
            >
              {liveStatus.label}
            </span>
            <span style={{ color: 'rgba(246, 239, 228, 0.5)' }}>·</span>
            <span style={{ color: 'rgba(246, 239, 228, 0.85)' }}>
              {liveStatus.detail}
            </span>
          </div>

          {/* Address & Hours Grid */}
          <div className="visit-grid">
            {/* Address with dropping map pin */}
            <div className="visit-info-line" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div className="visit-icon-box">
                <div ref={mapPinRef} className="visit-map-pin">
                  <MapPin size={18} color="var(--color-brass, #B89A64)" aria-hidden="true" />
                </div>
              </div>
              <div>
                <strong
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    color: 'var(--color-text-inverse, #F6EFE4)',
                    marginBottom: '4px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                  }}
                >
                  Sanctuary Address
                </strong>
                <p
                  className="body"
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: 'rgba(246, 239, 228, 0.82)',
                  }}
                >
                  {RESTAURANT.address.fullDisplay}
                </p>
              </div>
            </div>

            {/* Dining Hours */}
            <div className="visit-info-line" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div className="visit-icon-box">
                <Clock size={18} color="var(--color-brass, #B89A64)" aria-hidden="true" />
              </div>
              <div>
                <strong
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    color: 'var(--color-text-inverse, #F6EFE4)',
                    marginBottom: '4px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                  }}
                >
                  Dining Hours
                </strong>
                <p
                  className="body"
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: 'rgba(246, 239, 228, 0.82)',
                  }}
                >
                  {RESTAURANT.hours.displayText}
                </p>
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-brass-light, #D4B88A)',
                    fontFamily: 'var(--font-sans)',
                    display: 'block',
                    marginTop: '2px',
                  }}
                >
                  {RESTAURANT.priceRange}
                </span>
              </div>
            </div>
          </div>

          {/* Action Row: Reserve, Call, WhatsApp, Directions with Button components */}
          <div className="visit-actions-row button-group">
            {/* 1. Reserve Button */}
            <Magnet disabled={isTouch || isMobile} strength={0.22} padding={18}>
              <TapScale scale={0.96}>
                <Button
                  to="/contact"
                  variant="primary"
                  size="md"
                  icon={<Calendar size={15} />}
                  iconPosition="left"
                  aria-label="Reserve a dining table at Hestiia"
                >
                  Reserve a Table
                </Button>
              </TapScale>
            </Magnet>

            {/* 2. Call Button */}
            <Magnet disabled={isTouch || isMobile} strength={0.22} padding={18}>
              <TapScale scale={0.96}>
                <Button
                  href={`tel:${RESTAURANT.phone.e164}`}
                  variant="secondary"
                  size="md"
                  icon={<Phone size={15} />}
                  iconPosition="left"
                  aria-label={`Call Hestiia Restaurant at ${RESTAURANT.phone.display}`}
                >
                  Call {RESTAURANT.phone.display}
                </Button>
              </TapScale>
            </Magnet>

            {/* 3. WhatsApp Button */}
            <Magnet disabled={isTouch || isMobile} strength={0.22} padding={18}>
              <TapScale scale={0.96}>
                <Button
                  href={RESTAURANT.whatsapp.chatUrl}
                  variant="secondary"
                  size="md"
                  icon={<MessageSquare size={15} color="#25D366" />}
                  iconPosition="left"
                  aria-label="Chat with Hestiia Restaurant on WhatsApp"
                >
                  WhatsApp
                </Button>
              </TapScale>
            </Magnet>

            {/* 4. Directions Button */}
            <Magnet disabled={isTouch || isMobile} strength={0.22} padding={18}>
              <TapScale scale={0.96}>
                <Button
                  href={RESTAURANT.platforms.googleMaps}
                  variant="secondary"
                  size="md"
                  icon={<Navigation size={15} />}
                  iconPosition="left"
                  aria-label="Get driving directions to Hestiia Restaurant on Google Maps"
                >
                  Directions
                </Button>
              </TapScale>
            </Magnet>
          </div>
        </div>
      </div>
    </section>
  )
}
