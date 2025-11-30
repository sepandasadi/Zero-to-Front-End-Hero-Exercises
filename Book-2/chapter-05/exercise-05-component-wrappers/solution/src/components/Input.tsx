import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: boolean
  helpText?: string
}

function Input({
  label,
  error,
  success,
  helpText,
  className = '',
  ...props
}: InputProps) {
  const baseClasses = 'w-full px-4 py-2 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-1'

  const stateClasses = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
    : success
    ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
    : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'

  const classes = `${baseClasses} ${stateClasses} ${className}`

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input className={classes} {...props} />
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <span>❌</span> {error}
        </p>
      )}
      {success && !error && (
        <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
          <span>✓</span> Looks good!
        </p>
      )}
      {helpText && !error && !success && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  )
}

export default Input

