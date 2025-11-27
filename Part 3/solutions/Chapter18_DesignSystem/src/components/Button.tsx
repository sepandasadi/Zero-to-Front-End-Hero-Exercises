// src/components/Button.tsx
import React from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: Variant
  size?: Size
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant='primary', size='md', loading=false, children, ...props }, ref
){
  return (
    <button
      ref={ref}
      className={['btn', `btn--${variant}`, `btn--${size}`, loading?'is-loading':''].join(' ')}
      aria-busy={loading || undefined}
      {...props}
    >
      <span className="btn__label">{children}</span>
    </button>
  )
})
