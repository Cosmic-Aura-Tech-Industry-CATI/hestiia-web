import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, Phone, MessageSquare, Navigation, Calendar, ShoppingBag } from 'lucide-react'
import Magnet from './reactbits/Magnet'
import { NAV_LINKS, MOBILE_NAV_LINKS } from '../content/navigation'
import { RESTAURANT } from '../content/restaurant'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItemCount, openCart } = useCart()

  const location = useLocation()
  const drawerRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLButtonElement>(null)

  // Scroll detection for navbar background/blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on route change
  const currentPath = location.pathname + location.hash
  const [prevPath, setPrevPath] = useState(currentPath)

  if (prevPath !== currentPath) {
    setPrevPath(currentPath)
    if (mobileOpen) {
      setMobileOpen(false)
    }
  }

  // Handle lock scroll and focus trap for mobile drawer
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('nav-open')
      document.body.style.overflow = 'hidden'

      const timer = setTimeout(() => {
        firstFocusableRef.current?.focus()
      }, 100)

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileOpen(false)
        }
        if (e.key === 'Tab' && drawerRef.current) {
          const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          if (focusable.length === 0) return
          const first = focusable[0]
          const last = focusable[focusable.length - 1]

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault()
            last.focus()
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => {
        clearTimeout(timer)
        document.body.classList.remove('nav-open')
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.classList.remove('nav-open')
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
          backgroundColor: scrolled ? 'rgba(31, 26, 22, 0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(184, 154, 100, 0.15)' : '1px solid transparent',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 'var(--header-height)',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="navbar__logo"
            aria-label="Hestiia Restaurant Home"
            style={{
              flexShrink: 0,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src="/brand/logo.webp"
              alt="Hestiia Restaurant"
              style={{
                height: '48px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Link>

          {/* Desktop Nav Links (Route-based with NavLink) */}
          <nav className="navbar__links" aria-label="Primary Navigation">
            <ul style={{ display: 'flex', alignItems: 'center', gap: '26px', listStyle: 'none', margin: 0, padding: 0 }}>
              {NAV_LINKS.map(link => {
                // Menu is active on /menu and /menu/*
                const isActive =
                  link.href === '/menu'
                    ? location.pathname === '/menu' || location.pathname.startsWith('/menu/')
                    : location.pathname === link.href

                return (
                  <li key={link.id}>
                    <NavLink
                      to={link.href}
                      className={isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
                      style={{
                        position: 'relative',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '13px',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: isActive ? 'var(--color-brass)' : 'rgba(246, 239, 228, 0.8)',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-active-underline"
                          style={{
                            position: 'absolute',
                            bottom: '-4px',
                            left: 0,
                            right: 0,
                            height: '1px',
                            backgroundColor: 'var(--color-brass)',
                          }}
                        />
                      )}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Actions: Cart Icon, Magnet Button, Mobile Hamburger */}
          <div
            className="navbar__action"
            style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}
          >
            {/* Interactive Cart Button */}
            <button
              onClick={openCart}
              type="button"
              aria-label={`Shopping Cart (${totalItemCount} items)`}
              title="Open Dining Cart"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(38, 31, 26, 0.6)',
                border: '1px solid rgba(184, 154, 100, 0.22)',
                color: 'var(--color-text-inverse)',
                cursor: 'pointer',
                transition: 'border-color 0.2s, background-color 0.2s, color 0.2s',
              }}
            >
              <ShoppingBag size={18} />
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  backgroundColor: 'var(--color-brass)',
                  color: '#1F1A16',
                  fontSize: '10px',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
                }}
              >
                {totalItemCount}
              </span>
            </button>

            {/* Desktop Magnet Reserve Button (links to /contact) */}
            <div className="navbar__desktop-cta" style={{ display: 'flex', alignItems: 'center' }}>
              <Magnet strength={0.25} padding={30}>
                <Link
                  to="/contact#reserve-form"
                  className="btn btn-primary"
                  id="nav-reserve-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 22px',
                    backgroundColor: 'var(--color-brass)',
                    color: '#1F1A16',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    borderRadius: 'var(--radius-sm)',
                    textDecoration: 'none',
                    transition: 'background-color 0.2s ease, transform 0.2s ease',
                  }}
                >
                  Reserve a Table
                </Link>
              </Magnet>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="navbar__hamburger"
              aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileOpen}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text-inverse)',
                padding: '8px',
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Right Slide-in Drawer with Backdrop (Below 1024px) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(10, 8, 6, 0.75)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                zIndex: 998,
              }}
            />

            {/* Right Slide-in Drawer */}
            <motion.aside
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(420px, 88vw)',
                backgroundColor: '#1A1512',
                borderLeft: '1px solid rgba(184, 154, 100, 0.2)',
                boxShadow: '-10px 0 35px rgba(0, 0, 0, 0.65)',
                zIndex: 999,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingTop: 'calc(24px + env(safe-area-inset-top, 0px))',
                paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
                paddingLeft: '28px',
                paddingRight: '28px',
                overflowY: 'auto',
              }}
            >
              {/* Drawer Top Bar: Brand & Close Button */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '16px',
                    marginBottom: '20px',
                    borderBottom: '1px solid rgba(184, 154, 100, 0.14)',
                  }}
                >
                  <Link
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Hestiia Restaurant Home"
                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                  >
                    <img
                      src="/brand/logo.webp"
                      alt="Hestiia Restaurant"
                      style={{
                        height: '38px',
                        width: 'auto',
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />
                  </Link>

                  <button
                    ref={firstFocusableRef}
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close navigation drawer"
                    style={{
                      background: 'rgba(38, 31, 26, 0.8)',
                      border: '1px solid rgba(184, 154, 100, 0.25)',
                      borderRadius: '50%',
                      width: '38px',
                      height: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-text-inverse)',
                      cursor: 'pointer',
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Staggered Navigation Links */}
                <nav aria-label="Mobile Navigation Links">
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {MOBILE_NAV_LINKS.map((link, index) => {
                      const isActive =
                        link.href === '/menu'
                          ? location.pathname === '/menu' || location.pathname.startsWith('/menu/')
                          : location.pathname === link.href

                      return (
                        <motion.li
                          key={link.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.04 * index, duration: 0.28 }}
                          style={{ marginBottom: '10px' }}
                        >
                          <Link
                            to={link.href}
                            onClick={() => setMobileOpen(false)}
                            style={{
                              fontFamily: 'var(--font-serif)',
                              fontSize: 'clamp(22px, 5vw, 28px)',
                              fontWeight: 300,
                              fontStyle: 'italic',
                              textTransform: 'lowercase',
                              color: isActive ? 'var(--color-brass)' : 'var(--color-text-inverse)',
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '4px 0',
                              transition: 'color 0.2s ease',
                            }}
                          >
                            <span>{link.label}</span>
                            <ArrowUpRight size={20} color="var(--color-brass)" />
                          </Link>
                        </motion.li>
                      )
                    })}
                  </ul>
                </nav>
              </div>

              {/* Drawer Bottom Area: Call, WhatsApp, Directions, Reserve */}
              <div
                style={{
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(184, 154, 100, 0.14)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {/* Call Action */}
                  <a
                    href={`tel:${RESTAURANT.phone.e164}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '10px 8px',
                      backgroundColor: 'rgba(38, 31, 26, 0.8)',
                      border: '1px solid rgba(184, 154, 100, 0.25)',
                      color: 'var(--color-text-inverse)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 500,
                      textDecoration: 'none',
                    }}
                  >
                    <Phone size={14} color="var(--color-brass)" />
                    <span>Call</span>
                  </a>

                  {/* WhatsApp Action */}
                  <a
                    href={RESTAURANT.whatsapp.chatUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '10px 8px',
                      backgroundColor: 'rgba(38, 31, 26, 0.8)',
                      border: '1px solid rgba(184, 154, 100, 0.25)',
                      color: 'var(--color-text-inverse)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 500,
                      textDecoration: 'none',
                    }}
                  >
                    <MessageSquare size={14} color="#25D366" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {/* Directions Action */}
                  <a
                    href={RESTAURANT.platforms.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '10px 8px',
                      backgroundColor: 'rgba(38, 31, 26, 0.8)',
                      border: '1px solid rgba(184, 154, 100, 0.25)',
                      color: 'var(--color-text-inverse)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 500,
                      textDecoration: 'none',
                    }}
                  >
                    <Navigation size={14} color="var(--color-brass)" />
                    <span>Directions</span>
                  </a>

                  {/* Reserve Action (Routes to /contact) */}
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '10px 8px',
                      backgroundColor: 'var(--color-brass)',
                      color: '#1F1A16',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      textDecoration: 'none',
                    }}
                  >
                    <Calendar size={14} />
                    <span>Reserve</span>
                  </Link>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
