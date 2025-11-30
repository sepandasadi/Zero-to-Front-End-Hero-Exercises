import { ButtonHTMLAttributes } from 'react'

// TODO: Define props interface
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // variant?: 'primary' | 'secondary' | 'ghost'
  // size?: 'sm' | 'md' | 'lg'
  // Add more props as needed
}

// TODO: Implement Button component with proper TypeScript types
function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}

export default Button

