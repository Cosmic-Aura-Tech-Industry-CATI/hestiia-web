import React from 'react'
import './shiny-text.css'

interface ShinyTextProps {
  text: string
  disabled?: boolean
  speed?: number
  className?: string
  style?: React.CSSProperties
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = '',
  style = {},
}: ShinyTextProps) {
  return (
    <span
      className={`shiny-text ${disabled ? 'shiny-text--disabled' : ''} ${className}`}
      style={{
        animationDuration: `${speed}s`,
        ...style,
      }}
    >
      {text}
    </span>
  )
}
