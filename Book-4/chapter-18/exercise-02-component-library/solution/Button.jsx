import React, { forwardRef } from 'react';
import './Button.css';

/**
 * Button Component
 *
 * A flexible button component with multiple variants, sizes, and states.
 *
 * @component
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="outline" leftIcon={<Icon />}>With Icon</Button>
 * <Button isLoading>Loading...</Button>
 */
const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading = false,
  isDisabled = false,
  type = 'button',
  className = '',
  onClick,
  ...props
}, ref) => {
  const classNames = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    isLoading && 'btn--loading',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (!isLoading && !isDisabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      ref={ref}
      type={type}
      className={classNames}
      disabled={isDisabled || isLoading}
      onClick={handleClick}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <span className="btn__spinner" role="status" aria-label="Loading">
          <svg className="btn__spinner-icon" viewBox="0 0 24 24">
            <circle
              className="btn__spinner-circle"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              strokeWidth="3"
            />
          </svg>
        </span>
      )}

      {!isLoading && leftIcon && (
        <span className="btn__icon btn__icon--left">
          {leftIcon}
        </span>
      )}

      <span className="btn__content">
        {children}
      </span>

      {!isLoading && rightIcon && (
        <span className="btn__icon btn__icon--right">
          {rightIcon}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;

