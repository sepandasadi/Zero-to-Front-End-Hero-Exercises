import React from 'react'
import './Input.css'

export interface InputProps {
  /**
   * Input type
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'

  /**
   * Input value
   */
  value?: string

  /**
   * Default value (uncontrolled)
   */
  defaultValue?: string

  /**
   * Placeholder text
   */
  placeholder?: string

  /**
   * Input size
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Disabled state
   */
  disabled?: boolean

  /**
   * Error state
   */
  error?: boolean

  /**
   * Error message
   */
  errorMessage?: string

  /**
   * Full width input
   */
  fullWidth?: boolean

  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void

  /**
   * Additional CSS class
   */
  className?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    type = 'text',
    value,
    defaultValue,
    placeholder,
    size = 'medium',
    disabled = false,
    error = false,
    errorMessage,
    fullWidth = false,
    onChange,
    className = '',
    ...props
  }, ref) => {
    const classNames = [
      'input',
      `input--${size}`,
      error && 'input--error',
      disabled && 'input--disabled',
      fullWidth && 'input--full-width',
      className
    ].filter(Boolean).join(' ')

    return (
      <div className={fullWidth ? 'input-wrapper--full-width' : 'input-wrapper'}>
        <input
          ref={ref}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          className={classNames}
          aria-invalid={error}
          aria-describedby={error && errorMessage ? 'input-error' : undefined}
          {...props}
        />
        {error && errorMessage && (
          <span id="input-error" className="input__error-message">
            {errorMessage}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

