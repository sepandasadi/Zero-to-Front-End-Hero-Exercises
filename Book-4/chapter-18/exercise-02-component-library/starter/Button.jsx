import React, { forwardRef } from 'react';
import './Button.css';

/**
 * Button Component - STARTER
 *
 * Your task: Build a flexible button component with multiple variants, sizes, and states.
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
  // TODO: Create classNames array combining all variant/size/state classes
  const classNames = [
    'btn',
    // TODO: Add variant class
    // TODO: Add size class
    // TODO: Add loading class if isLoading
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    // TODO: Only call onClick if not loading and not disabled
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
      {/* TODO: Show loading spinner when isLoading */}

      {/* TODO: Show leftIcon when not loading and leftIcon exists */}

      <span className="btn__content">
        {children}
      </span>

      {/* TODO: Show rightIcon when not loading and rightIcon exists */}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;

