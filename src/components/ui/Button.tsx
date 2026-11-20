'use client'

import React from 'react'
import Link from 'next/link'
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

  const destination = href || to

  // 1. Link (Internal or External)
  if (destination && !disabled) {
    const isExternal =
      destination.startsWith('http') ||
      destination.startsWith('tel:') ||
      destination.startsWith('mailto:')

    if (isExternal) {
      return (
        <a
          href={destination}
          className={classNames}
          target={target || '_blank'}
          rel={rel || 'noopener noreferrer'}
          {...(props as Record<string, unknown>)}
        >
          {content}
        </a>
      )
    }

    return (
      <Link href={destination} className={classNames} {...(props as Record<string, unknown>)}>
        {content}
      </Link>
    )
  }

  // 2. Standard Button
  return (
    <button type={type} className={classNames} disabled={disabled} {...props}>
      {content}
    </button>
  )
}
