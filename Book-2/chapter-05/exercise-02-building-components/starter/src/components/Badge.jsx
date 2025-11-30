// TODO: Build Badge component
// Variants: default, primary, success, warning, error
// Sizes: sm, md

function Badge({ children, variant = 'default', size = 'md' }) {
  // TODO: Define variant classes
  const variantClasses = {
    default: '',
    primary: '',
    success: '',
    warning: '',
    error: '',
  }

  // TODO: Define size classes
  const sizeClasses = {
    sm: '',
    md: '',
  }

  return (
    <span>
      {children}
    </span>
  )
}

export default Badge

