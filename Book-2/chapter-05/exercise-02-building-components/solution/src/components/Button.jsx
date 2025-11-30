function Button({ children, variant = 'primary', size = 'md', disabled = false, ...props }) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantClasses = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-purple-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-500',
    ghost: 'bg-transparent text-purple-600 hover:bg-purple-50 active:bg-purple-100 focus:ring-purple-500 border border-purple-200',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const className = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`

  return (
    <button className={className} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

export default Button

