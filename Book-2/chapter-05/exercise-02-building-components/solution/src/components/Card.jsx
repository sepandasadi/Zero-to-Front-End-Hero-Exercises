function Card({ children, variant = 'default' }) {
  const variantClasses = {
    default: 'bg-white border border-gray-200 shadow-md',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-white border-2 border-gray-300',
  }

  const className = `rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-xl ${variantClasses[variant]}`

  return (
    <div className={className}>
      {children}
    </div>
  )
}

export function CardImage({ src, alt }) {
  return <img src={src} alt={alt} className="w-full h-48 object-cover" />
}

export function CardTitle({ children }) {
  return <h3 className="text-xl font-bold text-gray-900 mb-2">{children}</h3>
}

export function CardDescription({ children }) {
  return <p className="text-gray-600 text-sm leading-relaxed">{children}</p>
}

export function CardFooter({ children }) {
  return <div className="pt-4 mt-4 border-t border-gray-100">{children}</div>
}

export default Card

