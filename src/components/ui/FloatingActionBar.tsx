import { useState, useEffect } from 'react'
import { Phone, MessageSquare, Navigation, Calendar } from 'lucide-react'
import { RESTAURANT } from '../../content/restaurant'
import { smoothScroller } from '../../lib/lenis'
import { useLocation, useNavigate } from 'react-router-dom'

export default function FloatingActionBar() {
  const [isHeroIntersecting, setIsHeroIntersecting] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname !== '/') return

    const heroEl = document.getElementById('home')
    if (!heroEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroIntersecting(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(heroEl)
    return () => observer.disconnect()
  }, [location.pathname])

  const isVisible = location.pathname !== '/' || !isHeroIntersecting

  const handleReserve = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault()
      const el = document.getElementById('visit')
      if (el) {
        smoothScroller.scrollTo(el, { offset: -70 })
      }
    } else {
      e.preventDefault()
      navigate('/#visit')
    }
  }

  if (!isVisible) return null

  return (
    <aside
      className="floating-action-bar"
      aria-label="Quick restaurant actions"
      style={{
        position: 'fixed',
        bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
        left: '12px',
        right: '12px',
        zIndex: 90,
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 10px',
          backgroundColor: 'rgba(26, 21, 18, 0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '40px',
          border: '1px solid rgba(184, 154, 100, 0.28)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Call */}
        <a
          href={`tel:${RESTAURANT.phone.e164}`}
          className="floating-btn"
          aria-label="Call Hestiia Restaurant"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '8px 10px',
            minHeight: '44px',
            boxSizing: 'border-box',
            color: 'var(--color-text-inverse)',
            fontSize: '12px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          <Phone size={14} color="var(--color-brass)" />
          <span>Call</span>
        </a>

        <div style={{ width: '1px', height: '16px', backgroundColor: 'rgba(184, 154, 100, 0.2)' }} />

        {/* WhatsApp */}
        <a
          href={RESTAURANT.whatsapp.chatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn"
          aria-label="Chat on WhatsApp"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '8px 10px',
            minHeight: '44px',
            boxSizing: 'border-box',
            color: 'var(--color-text-inverse)',
            fontSize: '12px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          <MessageSquare size={14} color="#25D366" />
          <span>WhatsApp</span>
        </a>

        <div style={{ width: '1px', height: '16px', backgroundColor: 'rgba(184, 154, 100, 0.2)' }} />

        {/* Directions */}
        <a
          href={RESTAURANT.platforms.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn"
          aria-label="Get directions on Google Maps"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '8px 10px',
            minHeight: '44px',
            boxSizing: 'border-box',
            color: 'var(--color-text-inverse)',
            fontSize: '12px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          <Navigation size={14} color="var(--color-brass)" />
          <span>Directions</span>
        </a>

        <div style={{ width: '1px', height: '16px', backgroundColor: 'rgba(184, 154, 100, 0.2)' }} />

        {/* Reserve */}
        <a
          href="/#visit"
          onClick={handleReserve}
          className="floating-btn-primary"
          aria-label="Reserve a Table"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '8px 14px',
            minHeight: '44px',
            boxSizing: 'border-box',
            backgroundColor: 'var(--color-brass)',
            color: '#1F1A16',
            borderRadius: '20px',
            fontSize: '12px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          <Calendar size={13} />
          <span>Reserve</span>
        </a>
      </div>
    </aside>
  )
}
