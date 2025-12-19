import React from 'react'
import './Button.css'

export interface ButtonProps {
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'

  /**
   * Button size
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Full width button
   */
  fullWidth?: boolean

  /**
   * Disabled state
   */
  disabled?: boolean

  /**
   * Loading state
   */
  loading?: boolean

  /**
   * Button content
   */
  children: React.ReactNode

  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void

  /**
   * HTML button type
   */
  type?: 'button' | 'submit' | 'reset'

  /**
   * Additional CSS class
   */
  className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    loading = false,
    children,
    onClick,
    type = 'button',
    className = '',
  }, ref) => {
    const classNames = [
      'button',
      `button--${variant}`,
      `button--${size}`,
      fullWidth && 'button--full-width',
      loading && 'button--loading',
      className
    ].filter(Boolean).join(' ')

    return (
      <button
        ref={ref}
        type={type}
        className={classNames}
        onClick={onClick}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
      >
        {loading && (
          <span className="button__spinner" role="status" aria-label="Loading">
            <svg className="spinner" viewBox="0 0 50 50">
              <circle
                className="spinner-circle"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="5"
              ></circle>
            </svg>
          </span>
        )}
        <span className={loading ? 'button__label--hidden' : 'button__label'}>
          {children}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'

