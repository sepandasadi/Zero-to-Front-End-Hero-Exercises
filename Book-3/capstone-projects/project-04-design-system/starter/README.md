# Design System & Component Library - Starter Template

Create your own professional component library with Storybook documentation.

## 🚀 Quick Start

```bash
npm install
npm run dev         # Start Vite dev server
npm run storybook   # Start Storybook
```

## 🎯 Project Goals

Build a reusable component library with:

1. **Core Components** - 15-20 essential UI components
2. **Design Tokens** - Colors, spacing, typography
3. **Documentation** - Storybook stories for each component
4. **Accessibility** - WCAG 2.1 compliant
5. **TypeScript** - Type-safe components
6. **Testing** - Unit tests for all components
7. **Theming** - Light/dark mode support
8. **NPM Package** - Publishable library

## 📦 Setup

### Initialize Storybook:

```bash
npx storybook@latest init
```

### Add TypeScript:

```bash
npm install --save-dev typescript @types/react @types/react-dom
```

## 🎨 Components to Build

### Essential (Must Have):
- [ ] Button (variants: primary, secondary, outline, ghost)
- [ ] Input (text, email, password, number)
- [ ] Textarea
- [ ] Select / Dropdown
- [ ] Checkbox
- [ ] Radio Button
- [ ] Switch / Toggle
- [ ] Modal / Dialog
- [ ] Alert / Toast
- [ ] Card
- [ ] Badge
- [ ] Avatar
- [ ] Tooltip
- [ ] Loading Spinner
- [ ] Progress Bar

### Advanced (Nice to Have):
- [ ] Tabs
- [ ] Accordion
- [ ] Breadcrumb
- [ ] Pagination
- [ ] Table
- [ ] Form
- [ ] DatePicker
- [ ] Autocomplete
- [ ] Dropdown Menu
- [ ] Popover

## 📁 Project Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   ├── Button.test.tsx
│   │   └── Button.css
│   ├── Input/
│   ├── Modal/
│   └── ...
├── tokens/
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   └── index.ts
├── themes/
│   ├── light.ts
│   └── dark.ts
├── hooks/
│   └── useTheme.ts
├── utils/
│   └── classNames.ts
└── index.ts              # Main export file
```

## 💡 Implementation Guide

### 1. Design Tokens (tokens/colors.ts):

```typescript
export const colors = {
  // Primary
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    900: '#1e3a8a',
  },
  // ...more colors
}
```

### 2. Button Component:

```typescript
import React from 'react'
import './Button.css'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  children,
  onClick,
}) => {
  const className = `btn btn--${variant} btn--${size} ${disabled ? 'btn--disabled' : ''}`

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  )
}
```

### 3. Storybook Story:

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost']
    }
  }
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  )
}
```

### 4. Testing:

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    fireEvent.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies correct variant class', () => {
    render(<Button variant="secondary">Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('btn--secondary')
  })
})
```

## 📚 Resources

- [Storybook Docs](https://storybook.js.org/docs)
- [React Testing Library](https://testing-library.com/react)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## ✅ Success Criteria

- 15+ components fully implemented
- All components have Storybook stories
- Accessibility features (ARIA labels, keyboard nav)
- Unit tests with 80%+ coverage
- Responsive and works on all devices
- Documentation is clear and complete
- Can be installed as npm package

Build something amazing! 🎨

