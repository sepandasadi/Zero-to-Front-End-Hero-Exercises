import { InputHTMLAttributes } from 'react'

// TODO: Define props interface
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // label?: string
  // error?: string
  // success?: boolean
  // Add more props as needed
}

// TODO: Implement Input component with states
function Input({ className, ...props }: InputProps) {
  return (
    <input className={className} {...props} />
  )
}

export default Input

