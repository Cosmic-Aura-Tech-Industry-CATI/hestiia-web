import { motion } from 'framer-motion'
import GalleryAdapter from './gallery/GalleryAdapter'

export default function FoodGallery() {
  return (
    <section className="gallery-section section" id="gallery" aria-labelledby="gallery-title" style={{ overflow: 'hidden' }}>
      <div className="container" style={{ marginBottom: '32px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-brass)',
              display: 'block',
              marginBottom: '12px',
            }}
          >
            Visual Journey
          </span>
          <h2
            id="gallery-title"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px, 4vw, 54px)',
              fontWeight: 300,
              color: 'var(--color-text-inverse)',
              margin: '0 0 16px',
            }}
          >
            Every Plate, <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)' }}>A Craft.</em>
          </h2>
          <p style={{ maxWidth: '520px', margin: '0 auto', fontSize: '15px', color: 'rgba(246, 239, 228, 0.7)' }}>
            Glimpses of our authentic preparations, hand-hammered tableware, and warm dining atmosphere.
          </p>
        </motion.div>
      </div>

      <div style={{ paddingLeft: 'var(--container-pad)', paddingRight: 'var(--container-pad)' }}>
        <GalleryAdapter />
      </div>
    </section>
  )
}
