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
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  children,
  onClick,
  type = 'button',
}) => {
  // TODO: Build className string based on props
  // TODO: Apply proper CSS classes
  // TODO: Handle click events
  // TODO: Support disabled state

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="button"
    >
      {children}
    </button>
  )
}

