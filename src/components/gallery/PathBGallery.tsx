import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { GALLERY_ITEMS, type GalleryItem } from '../../content/gallery'
import { track } from '../../lib/analytics'

export default function PathBGallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const openLightbox = (item: GalleryItem, triggerEl?: HTMLElement) => {
    if (triggerEl) triggerRef.current = triggerEl
    setSelectedItem(item)
    track('gallery_open', { image_id: item.id })
  }

  const closeLightbox = () => {
    setSelectedItem(null)
    if (triggerRef.current) {
      triggerRef.current.focus()
    }
  }

  const currentIndex = selectedItem
    ? GALLERY_ITEMS.findIndex(i => i.id === selectedItem.id)
    : -1

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setSelectedItem(GALLERY_ITEMS[currentIndex - 1])
    } else {
      setSelectedItem(GALLERY_ITEMS[GALLERY_ITEMS.length - 1])
    }
  }, [currentIndex])

  const handleNext = useCallback(() => {
    if (currentIndex < GALLERY_ITEMS.length - 1) {
      setSelectedItem(GALLERY_ITEMS[currentIndex + 1])
    } else {
      setSelectedItem(GALLERY_ITEMS[0])
    }
  }, [currentIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedItem, handlePrev, handleNext])

  return (
    <div className="path-b-gallery" aria-label="Restaurant Food & Ambience Photo Gallery">
      {/* Draggable Momentum Carousel */}
      <motion.div
        ref={carouselRef}
        className="gallery-carousel-track"
        drag="x"
        dragConstraints={{ right: 0, left: -((GALLERY_ITEMS.length - 1) * 320) }}
        dragElastic={0.15}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
        style={{
          display: 'flex',
          gap: '24px',
          cursor: 'grab',
          userSelect: 'none',
          paddingBottom: '20px',
        }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {GALLERY_ITEMS.map(item => {
          return (
            <motion.div
              key={item.id}
              className="gallery-card"
              onClick={e => openLightbox(item, e.currentTarget)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openLightbox(item, e.currentTarget)
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open photo of ${item.title}`}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                flexShrink: 0,
                width: 'clamp(280px, 26vw, 360px)',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#261F1A',
                border: '1px solid rgba(184, 154, 100, 0.2)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
                position: 'relative',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden' }}>
                <img
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  className="gallery-card-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 50%, rgba(31,26,22,0.8) 100%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '16px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <p style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: '18px', color: '#FFFFFF' }}>
                      {item.title}
                    </p>
                    <ZoomIn size={18} color="var(--color-brass)" />
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Swipe / Momentum Drag Cue */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(246, 239, 228, 0.5)' }}>
          ← Drag or Swipe to Browse Photos →
        </span>
      </div>

      {/* Lightbox Dialog (AnimatePresence) */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 500,
              backgroundColor: 'rgba(15, 12, 10, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              aria-label="Close Lightbox"
              autoFocus
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'none',
                border: 'none',
                color: 'var(--color-text-inverse)',
                cursor: 'pointer',
                padding: '8px',
                zIndex: 510,
              }}
            >
              <X size={30} />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous Image"
              style={{
                position: 'absolute',
                left: '24px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(31, 26, 22, 0.8)',
                border: '1px solid rgba(184, 154, 100, 0.3)',
                color: 'var(--color-brass)',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 510,
              }}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Next Image"
              style={{
                position: 'absolute',
                right: '24px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(31, 26, 22, 0.8)',
                border: '1px solid rgba(184, 154, 100, 0.3)',
                color: 'var(--color-brass)',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 510,
              }}
            >
              <ChevronRight size={24} />
            </button>

            {/* Lightbox Image Preview */}
            <motion.div
              key={selectedItem.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={selectedItem.src}
                alt={selectedItem.alt}
                width={selectedItem.width}
                height={selectedItem.height}
                style={{
                  maxWidth: '100%',
                  maxHeight: '75vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.85)',
                }}
              />
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--color-text-inverse)' }}>
                  {selectedItem.title}
                </p>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'rgba(246, 239, 228, 0.6)' }}>
                  {selectedItem.alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
