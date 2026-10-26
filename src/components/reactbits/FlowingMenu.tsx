import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export interface FlowingMenuItem {
  id: string
  title: string
  category: string
  description: string
  highlights: string[]
  url: string
}

interface FlowingMenuProps {
  items: FlowingMenuItem[]
}

export default function FlowingMenu({ items }: FlowingMenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="flowing-menu" style={{ width: '100%' }}>
      {items.map((item, index) => {
        const isHovered = hoveredIndex === index

        return (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="flowing-menu__item"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              padding: '28px 0',
              borderBottom: '1px solid var(--color-border-dark)',
              textDecoration: 'none',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            {/* Background hover slide */}
            <motion.div
              initial={false}
              animate={{
                opacity: isHovered ? 0.08 : 0,
                x: isHovered ? 0 : -20,
              }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'var(--color-brass)',
                borderRadius: '8px',
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 2,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    color: 'var(--color-brass)',
                  }}
                >
                  0{index + 1}
                </span>
                <motion.h3
                  animate={{ x: isHovered ? 8 : 0, color: isHovered ? 'var(--color-brass-light)' : 'var(--color-text-inverse)' }}
                  transition={{ duration: 0.25 }}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  {item.title}
                </motion.h3>
              </div>

              <motion.div
                animate={{
                  x: isHovered ? 0 : -6,
                  y: isHovered ? 0 : 6,
                  opacity: isHovered ? 1 : 0.4,
                }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--color-brass)',
                }}
              >
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-sans)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Zomato Menu
                </span>
                <ArrowUpRight size={18} />
              </motion.div>
            </div>

            {/* Highlights row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginTop: '12px',
                paddingLeft: '32px',
                zIndex: 2,
              }}
            >
              {item.highlights.map((dish, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '12px',
                    fontFamily: 'var(--font-sans)',
                    color: 'rgba(246, 239, 228, 0.6)',
                    backgroundColor: 'rgba(184, 154, 100, 0.08)',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    border: '1px solid rgba(184, 154, 100, 0.12)',
                  }}
                >
                  {dish}
                </span>
              ))}
            </div>
          </a>
        )
      })}
    </div>
  )
}
