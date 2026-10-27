import React from 'react'
import { Link } from 'react-router-dom'
import './button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link'
export type ButtonSize = 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  to?: string
  href?: string
  target?: string
  rel?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  className?: string
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  target,
  rel,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className = '',
  children,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  const classNames = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? 'btn--full-width' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="btn__icon btn__icon--left" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="btn__icon btn__icon--right" aria-hidden="true">
          {icon}
        </span>
      )}
    </>
  )

  // 1. React Router Internal Link
  if (to && !disabled) {
    return (
      <Link to={to} className={classNames} {...(props as Record<string, unknown>)}>
        {content}
      </Link>
    )
  }

  // 2. External Anchor Link
  if (href && !disabled) {
    const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')
    return (
      <a
        href={href}
        className={classNames}
        target={target || (isExternal && href.startsWith('http') ? '_blank' : undefined)}
        rel={rel || (isExternal && href.startsWith('http') ? 'noopener noreferrer' : undefined)}
        {...(props as Record<string, unknown>)}
      >
        {content}
      </a>
    )
  }

  // 3. Standard Button
  return (
    <button type={type} className={classNames} disabled={disabled} {...props}>
      {content}
    </button>
  )
}
