import React, { forwardRef } from 'react';
import './Input.css';

/**
 * Input Component
 *
 * A flexible input component with multiple variants, sizes, and states.
 *
 * @component
 * @example
 * <Input label="Email" type="email" placeholder="Enter your email" />
 * <Input variant="filled" helperText="Enter a valid email" />
 * <Input isInvalid errorMessage="This field is required" />
 */
const Input = forwardRef(({
  label,
  helperText,
  errorMessage,
  variant = 'outline',
  size = 'md',
  type = 'text',
  isInvalid = false,
  isDisabled = false,
  isRequired = false,
  className = '',
  id,
  ...props
}, ref) => {
  // Generate unique ID if not provided
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  const wrapperClasses = [
    'input-wrapper',
    `input-wrapper--${variant}`,
    `input-wrapper--${size}`,
    isInvalid && 'input-wrapper--invalid',
    isDisabled && 'input-wrapper--disabled',
    className
  ].filter(Boolean).join(' ');

  const inputClasses = [
    'input',
    `input--${variant}`,
    `input--${size}`
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={inputId} className="input__label">
          {label}
          {isRequired && <span className="input__required" aria-label="required">*</span>}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        type={type}
        className={inputClasses}
        disabled={isDisabled}
        required={isRequired}
        aria-invalid={isInvalid}
        aria-describedby={
          isInvalid && errorMessage
            ? errorId
            : helperText
            ? helperId
            : undefined
        }
        {...props}
      />

      {helperText && !isInvalid && (
        <p id={helperId} className="input__helper">
          {helperText}
        </p>
      )}

      {isInvalid && errorMessage && (
        <p id={errorId} className="input__error" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

