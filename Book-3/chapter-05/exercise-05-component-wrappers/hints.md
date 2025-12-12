# Exercise 5: Component Wrappers - Hints

## TypeScript Setup

Already configured! Just rename files from `.jsx` to `.tsx`

---

## Component Props Pattern

### Basic Interface

```tsx
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}
```

**Benefits:**
- Type safety for props
- Autocomplete in IDE
- Inherits all native button attributes
- Optional with `?` operator

---

## Button Component Example

```tsx
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors'

  const variantClasses = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'bg-transparent text-purple-600 hover:bg-purple-50',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
```

**Usage:**
```tsx
<Button variant="primary" size="lg" onClick={() => alert('Clicked!')}>
  Click Me
</Button>

<Button variant="ghost" className="mt-4">
  Custom Classes Work!
</Button>
```

---

## className Passthrough Pattern

### Problem: Overriding Styles

```tsx
// User wants to add margin
<Button className="mt-4">Click</Button>
```

### Solution: Merge classNames

```tsx
const classes = `${baseClasses} ${variantClasses[variant]} ${className}`
```

This allows:
```tsx
<Button className="mt-4 w-full">
  Full Width Button with Margin
</Button>
```

---

## Card Component

```tsx
import { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined'
  children: ReactNode
}

function Card({
  variant = 'default',
  className = '',
  children,
  ...props
}: CardProps) {
  const baseClasses = 'rounded-lg p-6 transition-shadow'

  const variantClasses = {
    default: 'bg-white border border-gray-200 shadow-md',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-white border-2 border-gray-300',
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Card
```

---

## Input Component with States

```tsx
import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: boolean
}

function Input({
  label,
  error,
  success,
  className = '',
  ...props
}: InputProps) {
  const baseClasses = 'w-full px-4 py-2 border rounded-lg transition-colors'

  const stateClasses = error
    ? 'border-red-500 focus:ring-red-500'
    : success
    ? 'border-green-500 focus:ring-green-500'
    : 'border-gray-300 focus:ring-purple-500'

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
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {success && (
        <p className="mt-1 text-sm text-green-600">✓ Looks good!</p>
      )}
    </div>
  )
}

export default Input
```

**Usage:**
```tsx
<Input label="Email" type="email" placeholder="you@example.com" />
<Input label="Name" error="Name is required" />
<Input label="Username" success />
```

---

## Advanced: Composition Pattern

### SubComponents

```tsx
function Card({ children, ...props }: CardProps) {
  return <div {...props}>{children}</div>
}

Card.Header = function CardHeader({ children }: { children: ReactNode }) {
  return <div className="mb-4 pb-4 border-b">{children}</div>
}

Card.Body = function CardBody({ children }: { children: ReactNode }) {
  return <div className="mb-4">{children}</div>
}

Card.Footer = function CardFooter({ children }: { children: ReactNode }) {
  return <div className="mt-4 pt-4 border-t">{children}</div>
}
```

**Usage:**
```tsx
<Card>
  <Card.Header>
    <h3>Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Content</p>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

---

## Utility: clsx/classnames

For complex className logic, consider `clsx`:

```bash
npm install clsx
```

```tsx
import clsx from 'clsx'

const classes = clsx(
  'base-class',
  variant === 'primary' && 'primary-classes',
  size === 'lg' && 'large-classes',
  disabled && 'disabled-classes',
  className
)
```

---

## Type Safety Benefits

```tsx
// ✅ TypeScript catches errors
<Button variant="invalid"> {/* Error! */}
<Button size={123}> {/* Error! */}

// ✅ Autocomplete works
<Button variant="..." // Shows: primary | secondary | ghost
```

---

## Common Patterns

### Optional Props with Defaults

```tsx
interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

function Component({ variant = 'primary', size = 'md' }: Props) {
  // variant and size always have values
}
```

### Conditional Rendering

```tsx
interface Props {
  icon?: ReactNode
  loading?: boolean
}

function Button({ icon, loading, children }: Props) {
  return (
    <button>
      {loading && <Spinner />}
      {icon && <span>{icon}</span>}
      {children}
    </button>
  )
}
```

---

## Testing Checklist

- [ ] Components accept all props correctly
- [ ] TypeScript shows errors for invalid props
- [ ] className passthrough works
- [ ] All variants render correctly
- [ ] Native attributes work (onClick, disabled, etc.)
- [ ] Autocomplete works in IDE

---

## Common Mistakes

### ❌ Mistake 1: Not spreading ...props

```tsx
// Wrong - loses onClick, disabled, etc.
function Button({ variant, children }: Props) {
  return <button className="...">{children}</button>
}

// Correct
function Button({ variant, ...props }: Props) {
  return <button {...props} className="...">{children}</button>
}
```

### ❌ Mistake 2: className order matters

```tsx
// Wrong - user className gets overridden
<button className={`${className} ${baseClasses}`} />

// Correct - user className last (wins specificity)
<button className={`${baseClasses} ${className}`} />
```

### ❌ Mistake 3: Not using ReactNode for children

```tsx
// Wrong - string only
interface Props {
  children: string
}

// Correct - accepts any React content
interface Props {
  children: ReactNode
}
```

---

Good luck with TypeScript! 🎯

