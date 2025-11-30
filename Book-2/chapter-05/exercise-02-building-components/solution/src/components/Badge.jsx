function Badge({ children, variant = 'default', size = 'md' }) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full'

  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-purple-100 text-purple-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
  }

  const className = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`

  return (
    <span className={className}>
      {children}
    </span>
  )
}

export default Badge

