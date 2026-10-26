import ScrollVelocity from './reactbits/ScrollVelocity'

export default function MarqueeStrip() {
  const marqueeItems = [
    'Pure Vegetarian Dining • North Indian Specialties • Indo-Chinese Flavours • Artisanal Fast Food • Slow-Cooked Desserts • ',
  ]

  return (
    <div
      className="marquee-strip"
      style={{
        padding: '24px 0',
        backgroundColor: '#171310',
        borderTop: '1px solid rgba(184, 154, 100, 0.15)',
        borderBottom: '1px solid rgba(184, 154, 100, 0.15)',
        overflow: 'hidden',
        color: 'var(--color-brass-light)',
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(20px, 2.5vw, 28px)',
        fontWeight: 300,
        letterSpacing: '0.06em',
      }}
    >
      <ScrollVelocity texts={marqueeItems} velocity={1.8} />
    </div>
  )
}
