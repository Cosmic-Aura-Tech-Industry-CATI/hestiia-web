import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import PageClosingCta from '../components/PageClosingCta'
import GalleryAdapter from '../components/gallery/GalleryAdapter'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { GALLERY_ITEMS } from '../content/gallery'

export default function Gallery() {
  useDocumentMeta(
    'Ambience & Food Gallery',
    'Explore the visual gallery of Hestiia Restaurant Kanpur. From handcrafted vegetarian thalis and paneer curries to warm interior tablescapes.'
  )

  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  const handlePrev = useCallback(() => {
    setActiveIdx(prev => (prev === null ? null : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length))
  }, [])

  const handleNext = useCallback(() => {
    setActiveIdx(prev => (prev === null ? null : (prev + 1) % GALLERY_ITEMS.length))
  }, [])

  const handleClose = useCallback(() => {
    setActiveIdx(null)
  }, [])

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    if (activeIdx === null) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
      else if (e.key === 'ArrowLeft') handlePrev()
      else if (e.key === 'ArrowRight') handleNext()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIdx, handleClose, handlePrev, handleNext])

  return (
    <>
      <PageHero
        title="Visual"
        accentWord="Sanctuary"
        intro="A window into our handcrafted pure vegetarian dishes, traditional tandoors, and atmospheric dining hall in Shyam Nagar, Kanpur."
        currentPage="Gallery"
      />

      {/* 1. 3D Ring Interactive Experience (Imported Unchanged) */}
      <section style={{ overflow: 'hidden', paddingBottom: '32px' }}>
        <GalleryAdapter />
      </section>

      {/* 2. Full Responsive Masonry / Photo Grid with Lightbox */}
      <section
        style={{
          padding: '64px 0 96px',
          backgroundColor: '#16110E',
          borderTop: '1px solid rgba(184, 154, 100, 0.15)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-brass)',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              The Full Collection
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                fontWeight: 300,
                color: 'var(--color-text-inverse)',
                margin: '0 auto 12px',
              }}
            >
              Every Plate & Corner, <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)' }}>Captured</em>
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(246, 239, 228, 0.65)', margin: 0 }}>
              Tap any image to view in high resolution with dish details.
            </p>
          </div>

          {/* Responsive Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {GALLERY_ITEMS.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setActiveIdx(index)}
                style={{
                  position: 'relative',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(184, 154, 100, 0.18)',
                  aspectRatio: '4 / 3',
                  backgroundColor: '#1F1A16',
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                />

                {/* Overlay gradient */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 50%, rgba(20, 15, 12, 0.85) 100%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Caption bar */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    pointerEvents: 'none',
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: 'var(--color-brass)',
                        marginBottom: '4px',
                      }}
                    >
                      {item.category}
                    </span>
                    <strong
                      style={{
                        fontSize: '15px',
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 400,
                        color: 'var(--color-text-inverse)',
                      }}
                    >
                      {item.title}
                    </strong>
                  </div>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(184, 154, 100, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-brass-light)',
                    }}
                  >
                    <Maximize2 size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              backgroundColor: 'rgba(10, 8, 6, 0.94)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
          >
            {/* Close Button */}
            <button
              onClick={e => {
                e.stopPropagation()
                handleClose()
              }}
              aria-label="Close Lightbox"
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(38, 31, 26, 0.85)',
                border: '1px solid rgba(184, 154, 100, 0.4)',
                color: 'var(--color-text-inverse)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <X size={20} />
            </button>

            {/* Prev Button */}
            <button
              onClick={e => {
                e.stopPropagation()
                handlePrev()
              }}
              aria-label="Previous Image"
              style={{
                position: 'absolute',
                left: '24px',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(38, 31, 26, 0.85)',
                border: '1px solid rgba(184, 154, 100, 0.4)',
                color: 'var(--color-text-inverse)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              onClick={e => {
                e.stopPropagation()
                handleNext()
              }}
              aria-label="Next Image"
              style={{
                position: 'absolute',
                right: '24px',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(38, 31, 26, 0.85)',
                border: '1px solid rgba(184, 154, 100, 0.4)',
                color: 'var(--color-text-inverse)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <ChevronRight size={24} />
            </button>

            {/* Lightbox Image Container */}
            <div
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '920px',
                width: '100%',
                maxHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={GALLERY_ITEMS[activeIdx].src}
                alt={GALLERY_ITEMS[activeIdx].alt}
                style={{
                  maxWidth: '100%',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  border: '1px solid rgba(184, 154, 100, 0.3)',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
                }}
              />
              <div
                style={{
                  marginTop: '16px',
                  textAlign: 'center',
                  color: 'var(--color-text-inverse)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '22px',
                    margin: '0 0 4px',
                    color: 'var(--color-brass-light)',
                  }}
                >
                  {GALLERY_ITEMS[activeIdx].title}
                </h3>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'rgba(246, 239, 228, 0.75)',
                    maxWidth: '500px',
                    margin: '0 auto',
                  }}
                >
                  {GALLERY_ITEMS[activeIdx].alt}
                </p>
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '8px',
                    fontSize: '11px',
                    color: 'rgba(246, 239, 228, 0.5)',
                  }}
                >
                  {activeIdx + 1} of {GALLERY_ITEMS.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Closing CTA Band */}
      <PageClosingCta
        title="Experience the Ambiance in"
        accentWord="Person"
        subtitle="Reserve a table today to immerse yourself in our serene pure vegetarian dining hall in Shyam Nagar."
      />
    </>
  )
}
