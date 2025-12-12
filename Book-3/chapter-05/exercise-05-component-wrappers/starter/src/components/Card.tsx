import { ReactNode, HTMLAttributes } from 'react'

// TODO: Define props interface
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  // variant?: 'default' | 'elevated' | 'outlined'
  // Add more props as needed
}

// TODO: Implement Card component
function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export default Card

