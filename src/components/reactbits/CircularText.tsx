import { useId } from 'react'

interface CircularTextProps {
  text: string
  radius?: number
  spinDuration?: number
  className?: string
  style?: React.CSSProperties
}

export default function CircularText({
  text,
  radius = 36,
  spinDuration = 16,
  className = '',
  style = {},
}: CircularTextProps) {
  const pathId = useId()
  const size = (radius + 12) * 2

  return (
    <div
      className={`circular-text-wrap ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
        ...style,
      }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        style={{
          width: '100%',
          height: '100%',
          animation: `spinCircleText ${spinDuration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        <defs>
          <path
            id={pathId}
            d={`M ${size / 2}, ${size / 2} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text
          fill="var(--color-brass, #B89A64)"
          fontSize="9"
          fontFamily="var(--font-sans)"
          fontWeight="600"
          letterSpacing="0.16em"
          style={{ textTransform: 'uppercase' }}
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  )
}
