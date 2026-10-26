import { Link } from 'react-router-dom'
import { ArrowRight, Image as ImageIcon } from 'lucide-react'
import { GALLERY_ITEMS } from '../../content/gallery'

export default function GalleryTeaser() {
  const previewItems = GALLERY_ITEMS.slice(0, 6)

  return (
    <section
      className="gallery-teaser section section-dark"
      style={{
        padding: 'clamp(56px, 8vw, 88px) 0',
        backgroundColor: '#17120E',
        borderTop: '1px solid rgba(184, 154, 100, 0.12)',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '32px',
          }}
        >
          <div>
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
              Sanctuary Ambience & Plates
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 300,
                color: 'var(--color-text-inverse)',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Glimpses into the Atmosphere.
            </h2>
          </div>

          <Link
            to="/gallery"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--color-brass)',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            <span>View Full Gallery</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Horizontal strip of 6 images */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '14px',
            marginBottom: '28px',
          }}
        >
          {previewItems.map(item => (
            <Link
              key={item.id}
              to="/gallery"
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                aspectRatio: '1/1',
                border: '1px solid rgba(184, 154, 100, 0.2)',
                display: 'block',
                backgroundColor: '#120E0B',
              }}
              className="gallery-strip-item"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(18, 14, 11, 0.8) 0%, transparent 60%)',
                  opacity: 0.8,
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '10px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    color: 'rgba(246, 239, 228, 0.9)',
                    fontWeight: 500,
                    lineHeight: 1.2,
                  }}
                >
                  {item.title}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link
            to="/gallery"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-brass)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              textDecoration: 'none',
            }}
          >
            <ImageIcon size={14} />
            <span>Open Interactive Ambience Lightbox →</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
