import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, Phone, MessageSquare, Mail, MapPin } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ScrollFloat from './reactbits/ScrollFloat'
import Magnet from './reactbits/Magnet'
import TapScale from './reactbits/TapScale'
import { InstagramIcon } from './icons/InstagramIcon'
import { RESTAURANT } from '../content/restaurant'
import './footer.css'

gsap.registerPlugin(ScrollTrigger)

const YEAR = new Date().getFullYear()

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced || !gridRef.current) return

      const cols = gridRef.current.children
      if (!cols.length) return

      gsap.from(cols, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 88%',
          once: true,
        },
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      })
    },
    { scope: footerRef }
  )

  return (
    <footer
      ref={footerRef}
      className="footer"
      style={{
        backgroundColor: '#140F0C',
        borderTop: '1px solid rgba(184, 154, 100, 0.15)',
        overflow: 'hidden',
      }}
    >
      {/* Giant Brand Floating Wordmark Effect */}
      <div style={{ paddingTop: '48px', paddingBottom: '16px' }} aria-hidden="true">
        <ScrollFloat text="HESTIIA" />
      </div>

      <div className="container" style={{ paddingBottom: '48px' }}>
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '36px',
            paddingTop: '32px',
            borderTop: '1px solid rgba(184, 154, 100, 0.12)',
            marginBottom: '48px',
          }}
        >
          {/* 1. Brand Descriptor & Pure Veg Certificate */}
          <div>
            <Link
              to="/"
              className="footer-logo-shine"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '26px',
                fontWeight: 300,
                color: 'var(--color-text-inverse)',
                display: 'inline-block',
                marginBottom: '12px',
                textDecoration: 'none',
              }}
            >
              Hestiia
              <span style={{ fontSize: '12px', verticalAlign: 'super', color: 'var(--color-brass)' }}>
                ®
              </span>
            </Link>
            <p
              style={{
                fontSize: '13px',
                lineHeight: 1.7,
                color: 'rgba(246, 239, 228, 0.65)',
                maxWidth: '280px',
                marginBottom: '16px',
              }}
            >
              A pure vegetarian culinary sanctuary in Shyam Nagar, Kanpur, celebrating traditional North Indian recipes and Indo-Chinese flavours.
            </p>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11px',
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-veg)',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-veg)',
                }}
              />
              Certified Pure Vegetarian
            </span>
          </div>

          {/* 2. Quick Links (All Key Routes) */}
          <div>
            <span
              style={{
                display: 'block',
                fontSize: '11px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-brass)',
                marginBottom: '16px',
              }}
            >
              Sanctuary Exploration
            </span>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <li>
                <Link to="/about" className="footer-link-slide" style={{ fontSize: '13px', color: 'rgba(246, 239, 228, 0.7)', textDecoration: 'none' }}>
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/cuisines" className="footer-link-slide" style={{ fontSize: '13px', color: 'rgba(246, 239, 228, 0.7)', textDecoration: 'none' }}>
                  Cuisines & Specialties
                </Link>
              </li>
              <li>
                <Link to="/menu" className="footer-link-slide" style={{ fontSize: '13px', color: 'rgba(246, 239, 228, 0.7)', textDecoration: 'none' }}>
                  Full Menu (193 Dishes)
                </Link>
              </li>
              <li>
                <Link to="/cart" className="footer-link-slide" style={{ fontSize: '13px', color: 'rgba(246, 239, 228, 0.7)', textDecoration: 'none' }}>
                  Online Ordering Cart
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="footer-link-slide" style={{ fontSize: '13px', color: 'rgba(246, 239, 228, 0.7)', textDecoration: 'none' }}>
                  Ambience & Food Gallery
                </Link>
              </li>
              <li>
                <Link to="/about#experience" className="footer-link-slide" style={{ fontSize: '13px', color: 'rgba(246, 239, 228, 0.7)', textDecoration: 'none' }}>
                  Dining Experience
                </Link>
              </li>
              <li>
                <Link to="/offers" className="footer-link-slide" style={{ fontSize: '13px', color: 'rgba(246, 239, 228, 0.7)', textDecoration: 'none' }}>
                  Exclusive Offers
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="footer-link-slide" style={{ fontSize: '13px', color: 'rgba(246, 239, 228, 0.7)', textDecoration: 'none' }}>
                  Guest Reviews
                </Link>
              </li>
              <li>
                <Link to="/party" className="footer-link-slide" style={{ fontSize: '13px', color: 'rgba(246, 239, 228, 0.7)', textDecoration: 'none' }}>
                  Parties & Private Dining
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link-slide" style={{ fontSize: '13px', color: 'rgba(246, 239, 228, 0.7)', textDecoration: 'none' }}>
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Verified Platform Links */}
          <div>
            <span
              style={{
                display: 'block',
                fontSize: '11px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-brass)',
                marginBottom: '16px',
              }}
            >
              Order & Reserve Platforms
            </span>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <li>
                <a
                  href={RESTAURANT.platforms.zomato}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link-slide"
                  style={{
                    fontSize: '13px',
                    color: 'rgba(246, 239, 228, 0.7)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>Zomato</span>
                  <ExternalLink size={12} color="var(--color-brass)" />
                </a>
              </li>
              <li>
                <a
                  href={RESTAURANT.platforms.swiggy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link-slide"
                  style={{
                    fontSize: '13px',
                    color: 'rgba(246, 239, 228, 0.7)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>Swiggy Dineout</span>
                  <ExternalLink size={12} color="var(--color-brass)" />
                </a>
              </li>
              <li>
                <a
                  href={RESTAURANT.platforms.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link-slide"
                  style={{
                    fontSize: '13px',
                    color: 'rgba(246, 239, 228, 0.7)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>Google Maps</span>
                  <ExternalLink size={12} color="var(--color-brass)" />
                </a>
              </li>
              <li>
                <a
                  href={RESTAURANT.platforms.eazydiner}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link-slide"
                  style={{
                    fontSize: '13px',
                    color: 'rgba(246, 239, 228, 0.7)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>EazyDiner</span>
                  <ExternalLink size={12} color="var(--color-brass)" />
                </a>
              </li>
              <li>
                <a
                  href={RESTAURANT.platforms.district}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link-slide"
                  style={{
                    fontSize: '13px',
                    color: 'rgba(246, 239, 228, 0.7)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>District by Zomato</span>
                  <ExternalLink size={12} color="var(--color-brass)" />
                </a>
              </li>
              <li>
                <a
                  href={RESTAURANT.platforms.justdial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link-slide"
                  style={{
                    fontSize: '13px',
                    color: 'rgba(246, 239, 228, 0.7)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>Justdial</span>
                  <ExternalLink size={12} color="var(--color-brass)" />
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Contact (Phone, WhatsApp, Email, Address) */}
          <div>
            <span
              style={{
                display: 'block',
                fontSize: '11px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-brass)',
                marginBottom: '16px',
              }}
            >
              Direct Hospitality
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={15} color="var(--color-brass)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(246, 239, 228, 0.7)' }}>
                  {RESTAURANT.address.fullDisplay}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} color="var(--color-brass)" style={{ flexShrink: 0 }} />
                <a
                  href={`tel:${RESTAURANT.phone.e164}`}
                  className="footer-link-slide"
                  style={{ fontSize: '13px', color: 'var(--color-brass-light)', textDecoration: 'none' }}
                >
                  {RESTAURANT.phone.display}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={14} color="#25D366" style={{ flexShrink: 0 }} />
                <a
                  href={RESTAURANT.whatsapp.chatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link-slide"
                  style={{ fontSize: '13px', color: '#4ADE80', textDecoration: 'none' }}
                >
                  WhatsApp: {RESTAURANT.whatsapp.display}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color="var(--color-brass)" style={{ flexShrink: 0 }} />
                <a
                  href={`mailto:${RESTAURANT.email}`}
                  className="footer-link-slide"
                  style={{ fontSize: '13px', color: 'var(--color-brass-light)', textDecoration: 'none' }}
                >
                  {RESTAURANT.email}
                </a>
              </div>

              <p style={{ fontSize: '12px', color: 'rgba(246, 239, 228, 0.45)', margin: '4px 0 0' }}>
                {RESTAURANT.hours.displayText} · {RESTAURANT.priceRange}
              </p>
            </div>
          </div>
        </div>

        {/* 5. Legal Links & Socials */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid rgba(184, 154, 100, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '12px',
            color: 'rgba(246, 239, 228, 0.5)',
          }}
        >
          {/* Legal Pages */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/terms" className="footer-link-slide" style={{ color: 'rgba(246, 239, 228, 0.55)', textDecoration: 'none' }}>
              Terms & Conditions
            </Link>
            <span>·</span>
            <Link to="/privacy" className="footer-link-slide" style={{ color: 'rgba(246, 239, 228, 0.55)', textDecoration: 'none' }}>
              Privacy Policy
            </Link>
            <span>·</span>
            <Link to="/refund-policy" className="footer-link-slide" style={{ color: 'rgba(246, 239, 228, 0.55)', textDecoration: 'none' }}>
              Refund Policy
            </Link>
            <span>·</span>
            <Link to="/delivery-policy" className="footer-link-slide" style={{ color: 'rgba(246, 239, 228, 0.55)', textDecoration: 'none' }}>
              Delivery Policy
            </Link>
          </div>

          {/* Social Icons (Instagram, Facebook only if set) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {RESTAURANT.social.instagram && (
              <Magnet strength={0.3} padding={12}>
                <TapScale scale={0.94}>
                  <a
                    href={RESTAURANT.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Hestiia Restaurant on Instagram"
                    style={{
                      color: 'var(--color-brass)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <InstagramIcon size={14} />
                    <span>@hestiiarestaurant</span>
                  </a>
                </TapScale>
              </Magnet>
            )}

            {/* Facebook is only displayed if set (never when null) */}
            {RESTAURANT.social.facebook && (
              <Magnet strength={0.3} padding={12}>
                <TapScale scale={0.94}>
                  <a
                    href={RESTAURANT.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook Page"
                    style={{ color: 'var(--color-brass)', textDecoration: 'none' }}
                  >
                    Facebook
                  </a>
                </TapScale>
              </Magnet>
            )}
          </div>
        </div>

        {/* Copyright notice */}
        <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '11px', color: 'rgba(246, 239, 228, 0.35)' }}>
          © {YEAR} Hestiia Restaurant. All rights reserved. · Pure Vegetarian Dining · Shyam Nagar, Kanpur
        </div>
      </div>
    </footer>
  )
}
