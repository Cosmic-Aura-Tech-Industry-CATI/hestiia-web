import { useState } from 'react'

interface Spark {
  id: number
  x: number
  y: number
  angle: number
  distance: number
}

interface ClickSparkProps {
  children: React.ReactNode
  sparkColor?: string
  sparkCount?: number
  className?: string
}

export default function ClickSpark({
  children,
  sparkColor = 'var(--color-brass)',
  sparkCount = 8,
  className = '',
}: ClickSparkProps) {
  const [sparks, setSparks] = useState<Spark[]>([])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top

    const newSparks: Spark[] = Array.from({ length: sparkCount }).map((_, i) => ({
      id: Date.now() + i,
      x: clickX,
      y: clickY,
      angle: (i * 360) / sparkCount,
      distance: 28 + Math.random() * 16,
    }))

    setSparks(prev => [...prev, ...newSparks])

    setTimeout(() => {
      setSparks(prev => prev.filter(s => !newSparks.some(ns => ns.id === s.id)))
    }, 600)
  }

  return (
    <div
      onClick={handleClick}
      className={`click-spark-wrapper ${className}`}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      {sparks.map(spark => {
        const rad = (spark.angle * Math.PI) / 180
        const dx = Math.cos(rad) * spark.distance
        const dy = Math.sin(rad) * spark.distance

        return (
          <span
            key={spark.id}
            style={{
              position: 'absolute',
              left: spark.x,
              top: spark.y,
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: sparkColor,
              pointerEvents: 'none',
              transform: `translate(${dx}px, ${dy}px)`,
              opacity: 0,
              transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms ease',
              animation: 'sparkFade 500ms forwards',
              zIndex: 99,
            }}
          />
        )
      })}
    </div>
  )
}
