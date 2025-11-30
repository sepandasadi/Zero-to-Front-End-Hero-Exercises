# Exercise 5: Component Wrappers & Patterns

## Learning Objectives

By the end of this exercise, you will:

- ✅ Build reusable component wrappers with TypeScript
- ✅ Create prop-based variant systems
- ✅ Handle className passthrough for customization
- ✅ Compose utilities programmatically
- ✅ Design clean component APIs
- ✅ Use TypeScript for type safety

**Time:** 90-120 minutes
**Difficulty:** Intermediate-Advanced

---

## Scenario

You're building a component library for **"DesignFlow"**. Instead of repeating Tailwind classes everywhere, you need reusable, type-safe components with clean APIs that other developers can use.

**Goal:** Build 4 production-ready components with variants, sizes, and full TypeScript support.

---

## Setup

If not using TypeScript yet:

```bash
npm install --save-dev typescript @types/react @types/react-dom
```

Rename files to `.tsx` and add `tsconfig.json`.

---

## Part 1: Button Component (30 minutes)

### **Requirements:**

Build a `<Button>` component with:

**Variants:**
- `primary`: Purple, white text
- `secondary`: Gray, dark text
- `ghost`: Transparent, purple text
- `danger`: Red, white text

**Sizes:**
- `sm`: Small padding, small text
- `md`: Medium (default)
- `lg`: Large padding, large text

**Features:**
- Loading state (spinner + disabled)
- Icon support (left or right)
- Full HTML button props
- className passthrough for custom styles

### **Type Definition:**

```tsx
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
```

### **Implementation Pattern:**

```tsx
export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  // Base classes (always applied)
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Variant classes
  const variantClasses = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-purple-500 disabled:bg-purple-400',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100',
    ghost: 'bg-transparent text-purple-600 hover:bg-purple-50 active:bg-purple-100 focus:ring-purple-500 dark:hover:bg-purple-900/20',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500 disabled:bg-red-400',
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Disabled styles
  const disabledClasses = 'disabled:opacity-50 disabled:cursor-not-allowed';

  // Combine all classes
  const buttonClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses,
    className,  // Custom classes last (highest specificity)
  ].join(' ');

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Spinner />}
      {!isLoading && leftIcon && <span>{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span>{rightIcon}</span>}
    </button>
  );
}
```

### **Usage Examples:**

```tsx
<Button variant="primary">Submit</Button>
<Button variant="secondary" size="sm">Cancel</Button>
<Button variant="danger" size="lg" isLoading>Delete</Button>
<Button variant="ghost" leftIcon={<Icon />}>Settings</Button>
<Button className="w-full" onClick={() => alert('Clicked!')}>
  Custom Width
</Button>
```

---

## Part 2: Input Component (25 minutes)

### **Requirements:**

Build an `<Input>` component with:

**Variants:**
- `outline`: Default border
- `filled`: Background filled
- `flushed`: Bottom border only

**Sizes:**
- `sm`, `md`, `lg`

**Features:**
- Error state (red border)
- Disabled state
- Help text
- Label
- Icon support (left/right)

### **Type Definition:**

```tsx
type InputProps = {
  label?: string;
  error?: string;
  helpText?: string;
  variant?: 'outline' | 'filled' | 'flushed';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;
```

### **Usage:**

```tsx
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  helpText="We'll never share your email"
/>

<Input
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
/>

<Input
  variant="filled"
  size="lg"
  leftIcon={<SearchIcon />}
  placeholder="Search..."
/>
```

---

## Part 3: Card Component (20 minutes)

### **Requirements:**

Compound component pattern with sub-components:

- `Card` (container)
- `CardHeader`
- `CardBody`
- `CardFooter`

**Variants:**
- `elevated`: Shadow, no border
- `outline`: Border, no shadow
- `flat`: Neither

**Features:**
- Hover effect (optional)
- Padding control
- Dark mode support

### **Implementation:**

```tsx
type CardProps = {
  variant?: 'elevated' | 'outline' | 'flat';
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
};

export function Card({
  variant = 'elevated',
  hoverable = false,
  padding = 'md',
  children,
  className = '',
}: CardProps) {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-xl transition-all';

  const variantClasses = {
    elevated: 'shadow-md hover:shadow-lg',
    outline: 'border border-gray-200 dark:border-gray-700',
    flat: '',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClasses = hoverable ? 'cursor-pointer' : '';

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}

// Sub-components
export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mt-4 flex items-center gap-3 ${className}`}>{children}</div>;
}
```

### **Usage:**

```tsx
<Card variant="elevated" hoverable>
  <CardHeader>
    <h3 className="text-xl font-bold">Product Title</h3>
  </CardHeader>
  <CardBody>
    <p>Product description...</p>
  </CardBody>
  <CardFooter>
    <Button variant="primary">Buy Now</Button>
    <Button variant="ghost">Details</Button>
  </CardFooter>
</Card>
```

---

## Part 4: Select Component (20 minutes)

Build a styled `<Select>` dropdown component.

**Requirements:**
- Variants (outline, filled)
- Sizes (sm, md, lg)
- Error state
- Label
- Disabled state

---

## Part 5: Helper Utilities (10 minutes)

Create a utility for combining class names (like `clsx` or `cn`):

```tsx
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Usage
<button className={cn(
  'base-class',
  variant === 'primary' && 'primary-class',
  size === 'lg' && 'large-class',
  disabled && 'disabled-class',
  className
)} />
```

Or install `clsx`:

```bash
npm install clsx
```

---

## Deliverables

Your component library should have:

- [ ] `Button` component (4 variants, 3 sizes, loading, icons, TypeScript)
- [ ] `Input` component (3 variants, 3 sizes, error, label, icons)
- [ ] `Card` compound component (3 variants, padding control)
- [ ] `Select` component (styled dropdown)
- [ ] Helper utilities (`cn` function)
- [ ] Full TypeScript support
- [ ] Dark mode support for all components
- [ ] Storybook or demo page showing all variants

---

## Testing Your Components

Create a demo page:

```tsx
function ComponentShowcase() {
  return (
    <div className="p-8 space-y-8">
      {/* Buttons */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <div className="flex gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Sizes</h2>
        <div className="flex items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* States */}
      <section>
        <h2 className="text-2xl font-bold mb-4">States</h2>
        <div className="flex gap-4">
          <Button isLoading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button leftIcon={<Icon />}>With Icon</Button>
        </div>
      </section>

      {/* ... more sections for other components */}
    </div>
  );
}
```

---

## Key Patterns

### **Pattern 1: Prop-Based Classes**

```tsx
const variants = {
  primary: 'bg-blue-500 text-white',
  secondary: 'bg-gray-200 text-gray-900',
};

<button className={variants[variant]} />
```

### **Pattern 2: className Passthrough**

```tsx
<button className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
```

Custom classes come **last** for highest specificity!

### **Pattern 3: Spreading Props**

```tsx
function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={...} {...props} />;
}
```

Allows `onClick`, `disabled`, `aria-*`, etc. to pass through!

### **Pattern 4: Compound Components**

```tsx
<Card>
  <CardHeader>...</CardHeader>
  <CardBody>...</CardBody>
  <CardFooter>...</CardFooter>
</Card>
```

Flexible composition!

---

## Extension Challenges

1. **Add Tailwind variants** to components (e.g., `colorScheme` prop that generates classes)
2. **Create a `Stack` component** for spacing (like Chakra UI)
3. **Add animation variants** (bounce, slide, fade)
4. **Create a form builder** that uses your Input/Button components
5. **Publish as npm package** for reuse across projects

---

## Key Learnings

- ✅ Prop-based class selection
- ✅ className passthrough pattern
- ✅ TypeScript for component props
- ✅ Spreading HTML attributes
- ✅ Compound component pattern
- ✅ Clean component APIs
- ✅ Reusable, scalable patterns

**You've built a professional component library!** 🎉

---

## Next Steps

Move on to **Exercise 6: Tailwind + CSS Variables** for advanced theming!

