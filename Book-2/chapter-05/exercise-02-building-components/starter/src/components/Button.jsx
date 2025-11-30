// TODO: Build Button component with variants and sizes
// Variants: primary, secondary, ghost
// Sizes: sm, md, lg
// States: hover, focus, active, disabled

function Button({ children, variant = 'primary', size = 'md', disabled = false, ...props }) {
  // TODO: Define base classes
  const baseClasses = ''

  // TODO: Define variant classes
  const variantClasses = {
    primary: '',
    secondary: '',
    ghost: '',
  }

  // TODO: Define size classes
  const sizeClasses = {
    sm: '',
    md: '',
    lg: '',
  }

  // TODO: Combine classes
  const className = ''

  return (
    <button className={className} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

export default Button

