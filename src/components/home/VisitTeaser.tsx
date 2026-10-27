import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Clock, Phone, MessageSquare, Navigation, Calendar, ArrowRight } from 'lucide-react'
import { RESTAURANT } from '../../content/restaurant'
import Magnet from '../reactbits/Magnet'
import TapScale from '../reactbits/TapScale'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './visit-teaser.css'

gsap.registerPlugin(ScrollTrigger)

export default function VisitTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const mapPinRef = useRef<HTMLDivElement>(null)

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [liveStatus, setLiveStatus] = useState<{
    isOpen: boolean
    label: string
    detail: string
  }>({
    isOpen: true,
    label: 'Open Now',
    detail: 'Closes at 11:00 PM',
  })

  // Track viewport size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Live "Open now / Closed" badge calculation (Daily 11:00 to 23:00)
  useEffect(() => {
    const calculateStatus = () => {
      const now = new Date()
      const hours = now.getHours()
      // Open between 11:00 AM (11) and 11:00 PM (23)
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

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)',
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

        // Card slides up with clip reveal
        tl.fromTo(
          card,
          {
            clipPath: 'inset(100% 0% 0% 0%)',
            y: isDesktop ? 40 : 24,
            opacity: 0.3,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            opacity: 1,
            duration: isDesktop ? 0.9 : 0.65,
            ease: 'power3.out',
          },
          '-=0.4'
        )

        // Small map pin drops and settles
        if (mapPin) {
          tl.fromTo(
            mapPin,
            { y: -26, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'bounce.out',
            },
            '-=0.5'
          )
        }

        // Address lines stagger
        tl.fromTo(
          lines,
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.4'
        )

        // Buttons stagger
        tl.fromTo(
          actions,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.3'
        )
      }
    )

    return () => mm.revert()
  }, [])

  return (
    <section
      id="visit"
      ref={sectionRef}
      className="visit-teaser section section-dark section-ambient-glow"
      aria-labelledby="visit-teaser-title"
    >
      <div className="container">
        {/* Header */}
        <div className="visit-teaser__header">
          <div>
            <span className="visit-teaser__eyebrow">
              Sanctuary Location
            </span>
            <h2 id="visit-teaser-title" className="visit-teaser__title">
              Join Us in Shyam Nagar.
            </h2>
          </div>

          <Link
            to="/contact"
            className="visit-teaser__header-link"
            aria-label="View full restaurant location, map, and reservation booking details"
          >
            <span>Full Location & Booking</span>
            <ArrowRight size={14} className="visit-header-arrow" />
          </Link>
        </div>

        {/* Animated Main Card with Clip Reveal */}
        <div ref={cardRef} className="visit-card">
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
            <span style={{ color: 'rgba(246, 239, 228, 0.75)' }}>
              {liveStatus.detail}
            </span>
          </div>

          {/* Address & Hours Grid */}
          <div className="visit-grid">
            {/* Address with dropping map pin */}
            <div className="visit-info-line" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div className="visit-icon-box">
                <div ref={mapPinRef} className="visit-map-pin">
                  <MapPin size={18} color="var(--color-brass, #B89A64)" />
                </div>
              </div>
              <div>
                <strong
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    color: 'var(--color-text-inverse, #F6EFE4)',
                    marginBottom: '4px',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  Sanctuary Address
                </strong>
                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    lineHeight: 1.6,
                    color: 'rgba(246, 239, 228, 0.75)',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {RESTAURANT.address.fullDisplay}
                </p>
              </div>
            </div>

            {/* Dining Hours */}
            <div className="visit-info-line" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div className="visit-icon-box">
                <Clock size={18} color="var(--color-brass, #B89A64)" />
              </div>
              <div>
                <strong
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    color: 'var(--color-text-inverse, #F6EFE4)',
                    marginBottom: '4px',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  Dining Hours
                </strong>
                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    lineHeight: 1.6,
                    color: 'rgba(246, 239, 228, 0.75)',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {RESTAURANT.hours.displayText}
                </p>
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-brass-light, #D4B88A)',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {RESTAURANT.priceRange}
                </span>
              </div>
            </div>
          </div>

          {/* Action Row: Reserve, Call, WhatsApp, Directions with Magnet + Icon Wiggle + TapScale */}
          <div className="visit-actions-row">
            {/* 1. Reserve Button */}
            <Magnet disabled={isMobile} strength={0.22} padding={18}>
              <TapScale scale={0.96}>
                <Link
                  to="/contact"
                  className="visit-btn-primary"
                  aria-label="Reserve a dining table at Hestiia"
                >
                  <span className="visit-btn-icon">
                    <Calendar size={14} />
                  </span>
                  <span>Reserve a Table</span>
                </Link>
              </TapScale>
            </Magnet>

            {/* 2. Call Button */}
            <Magnet disabled={isMobile} strength={0.22} padding={18}>
              <TapScale scale={0.96}>
                <a
                  href={`tel:${RESTAURANT.phone.e164}`}
                  className="visit-btn-secondary"
                  aria-label={`Call Hestiia Restaurant at ${RESTAURANT.phone.display}`}
                >
                  <span className="visit-btn-icon">
                    <Phone size={14} color="var(--color-brass, #B89A64)" />
                  </span>
                  <span>Call {RESTAURANT.phone.display}</span>
                </a>
              </TapScale>
            </Magnet>

            {/* 3. WhatsApp Button */}
            <Magnet disabled={isMobile} strength={0.22} padding={18}>
              <TapScale scale={0.96}>
                <a
                  href={RESTAURANT.whatsapp.chatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visit-btn-secondary"
                  aria-label="Chat with Hestiia Restaurant on WhatsApp"
                >
                  <span className="visit-btn-icon">
                    <MessageSquare size={14} color="#25D366" />
                  </span>
                  <span>WhatsApp</span>
                </a>
              </TapScale>
            </Magnet>

            {/* 4. Directions Button */}
            <Magnet disabled={isMobile} strength={0.22} padding={18}>
              <TapScale scale={0.96}>
                <a
                  href={RESTAURANT.platforms.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visit-btn-secondary"
                  aria-label="Get driving directions to Hestiia Restaurant on Google Maps"
                >
                  <span className="visit-btn-icon">
                    <Navigation size={14} color="var(--color-brass, #B89A64)" />
                  </span>
                  <span>Directions</span>
                </a>
              </TapScale>
            </Magnet>
          </div>
        </div>
      </div>
    </section>
  )
}
