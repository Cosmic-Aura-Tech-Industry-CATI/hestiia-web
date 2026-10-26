import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Image as ImageIcon, X } from 'lucide-react'
import { GALLERY_ITEMS, type GalleryItem } from '../../content/gallery'
import Magnet from '../reactbits/Magnet'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './gallery-teaser.css'

gsap.registerPlugin(ScrollTrigger)

export default function GalleryTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Split gallery into two sets for opposite rows
  const row1Items = GALLERY_ITEMS.slice(0, 4)
  const row2Items = GALLERY_ITEMS.slice(4, 8)

  // Track viewport size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Infinite GSAP marquee with scroll velocity skewX and speed boost
  useEffect(() => {
    const row1 = row1Ref.current
    const row2 = row2Ref.current
    if (!row1 || !row2) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    // 1. Row 1 moves left
    const tween1 = gsap.to(row1, {
      xPercent: -50,
      ease: 'none',
      duration: isMobile ? 22 : 28,
      repeat: -1,
    })

    // 2. Row 2 moves right
    gsap.set(row2, { xPercent: -50 })
    const tween2 = gsap.to(row2, {
      xPercent: 0,
      ease: 'none',
      duration: isMobile ? 24 : 30,
      repeat: -1,
    })

    // Scroll velocity tracking
    let lastScrollY = window.scrollY
    let scrollTimeout: any = null

    const handleScrollVelocity = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY
      lastScrollY = currentScrollY

      // Calculate normalized velocity and skew
      const skew = Math.max(-6, Math.min(6, delta * 0.08))
      const speedMultiplier = 1 + Math.min(3, Math.abs(delta) * 0.04)

      tween1.timeScale(speedMultiplier)
      tween2.timeScale(speedMultiplier)

      gsap.to([row1, row2], {
        skewX: skew,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      })

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        tween1.timeScale(1)
        tween2.timeScale(1)
        gsap.to([row1, row2], {
          skewX: 0,
          duration: 0.5,
          ease: 'power3.out',
        })
      }, 100)
    }

    window.addEventListener('scroll', handleScrollVelocity, { passive: true })

    // Pause on hover (desktop)
    const handleMouseEnter = () => {
      if (!isMobile) {
        tween1.pause()
        tween2.pause()
      }
    }
    const handleMouseLeave = () => {
      if (!isMobile) {
        tween1.play()
        tween2.play()
      }
    }

    // Pause on touch (mobile)
    const handleTouchStart = () => {
      tween1.pause()
      tween2.pause()
    }
    const handleTouchEnd = () => {
      tween1.play()
      tween2.play()
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener('mouseenter', handleMouseEnter)
      section.addEventListener('mouseleave', handleMouseLeave)
      section.addEventListener('touchstart', handleTouchStart, { passive: true })
      section.addEventListener('touchend', handleTouchEnd, { passive: true })
    }

    return () => {
      window.removeEventListener('scroll', handleScrollVelocity)
      if (section) {
        section.removeEventListener('mouseenter', handleMouseEnter)
        section.removeEventListener('mouseleave', handleMouseLeave)
        section.removeEventListener('touchstart', handleTouchStart)
        section.removeEventListener('touchend', handleTouchEnd)
      }
      tween1.kill()
      tween2.kill()
      clearTimeout(scrollTimeout)
    }
  }, [isMobile])

  // Clip-path stagger entrance for gallery images
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cards = section.querySelectorAll('.gallery-card')
    const header = section.querySelector('.gallery-teaser__header')

    if (isReduced) {
      gsap.set([header, cards], { opacity: 1, y: 0 })
      return
    }

    gsap.set(cards, { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.2 })

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(header, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
        gsap.to(cards, {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 0.9,
          stagger: 0.05,
          ease: 'power3.out',
        })
      },
    })

    return () => trigger.kill()
  }, [])

  // Handle card click (Desktop links or Mobile opens lightbox)
  const handleCardClick = useCallback((e: React.MouseEvent, itemIndex: number) => {
    if (isMobile) {
      e.preventDefault()
      setLightboxIndex(itemIndex)
    }
  }, [isMobile])

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length)
    }
  }

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)
    }
  }

  const currentItem: GalleryItem | null = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null

  return (
    <section
      ref={sectionRef}
      className="gallery-teaser section section-dark"
      aria-labelledby="gallery-teaser-title"
    >
      <div className="container">
        {/* Header */}
        <div className="gallery-teaser__header">
          <div>
            <span className="gallery-teaser__eyebrow">
              Sanctuary Ambience & Plates
            </span>
            <h2 id="gallery-teaser-title" className="gallery-teaser__title">
              Glimpses into the Atmosphere.
            </h2>
          </div>

          <Link
            to="/gallery"
            className="gallery-teaser__header-link"
            aria-label="View complete restaurant photo gallery"
          >
            <span>View Full Gallery</span>
            <ArrowRight size={14} className="gallery-header-arrow" />
          </Link>
        </div>
      </div>

      {/* Two Opposite Marquee Rows */}
      <div className="gallery-marquee-wrap">
        {/* Row 1: Moves Left */}
        <div ref={row1Ref} className="gallery-marquee-row">
          <div className="gallery-marquee-track">
            {[...row1Items, ...row1Items].map((item, idx) => (
              <Link
                key={`r1-${item.id}-${idx}`}
                to="/gallery"
                className="gallery-card"
                onClick={(e) => handleCardClick(e, idx % row1Items.length)}
                aria-label={`View photo of ${item.title}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="gallery-card__img"
                />
                <div className="gallery-card__caption">
                  <span className="gallery-card__caption-title">{item.title}</span>
                  <span className="gallery-card__caption-sub">{item.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Row 2: Moves Right */}
        <div ref={row2Ref} className="gallery-marquee-row">
          <div className="gallery-marquee-track">
            {[...row2Items, ...row2Items].map((item, idx) => (
              <Link
                key={`r2-${item.id}-${idx}`}
                to="/gallery"
                className="gallery-card"
                onClick={(e) => handleCardClick(e, 4 + (idx % row2Items.length))}
                aria-label={`View photo of ${item.title}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="gallery-card__img"
                />
                <div className="gallery-card__caption">
                  <span className="gallery-card__caption-title">{item.title}</span>
                  <span className="gallery-card__caption-sub">{item.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA with Magnet on Desktop */}
      <div className="container" style={{ textAlign: 'center' }}>
        <Magnet disabled={isMobile} strength={0.25} padding={24}>
          <Link
            to="/gallery"
            className="gallery-cta-btn"
            aria-label="Open Interactive Ambience Lightbox"
          >
            <ImageIcon size={14} />
            <span>Open Interactive Ambience Lightbox →</span>
          </Link>
        </Magnet>
      </div>

      {/* Mobile Swipe Lightbox Modal */}
      <AnimatePresence>
        {currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="gallery-lightbox-overlay"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              type="button"
              className="gallery-lightbox-close"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex(null)
              }}
              aria-label="Close photo preview"
            >
              <X size={20} />
            </button>

            {/* Draggable Card for Swipe */}
            <motion.div
              layoutId={currentItem.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -40) {
                  nextLightbox()
                } else if (info.offset.x > 40) {
                  prevLightbox()
                }
              }}
              className="gallery-lightbox-card"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentItem.src}
                alt={currentItem.alt}
                className="gallery-lightbox-img"
              />
              <div className="gallery-lightbox-meta">
                <div>
                  <h3 className="gallery-lightbox-title">{currentItem.title}</h3>
                  <span style={{ fontSize: '12px', color: 'rgba(246, 239, 228, 0.65)' }}>
                    Swipe left/right to browse
                  </span>
                </div>
                <span className="gallery-lightbox-count">
                  0{lightboxIndex! + 1} / 0{GALLERY_ITEMS.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
