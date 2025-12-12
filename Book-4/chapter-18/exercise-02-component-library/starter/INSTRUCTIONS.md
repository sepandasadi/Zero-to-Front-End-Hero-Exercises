# Exercise 2: Component Library - Instructions

## 🎯 Goal

Build a small component library with Button, Input, and Card components with multiple variants and consistent APIs.

## 📝 Tasks

### Part 1: Button Component

**File:** `Button.jsx`

1. **Complete the component logic**
   - Build classNames array with variant, size, and loading classes
   - Implement handleClick to prevent clicks when loading/disabled
   - Add loading spinner JSX
   - Add left and right icon rendering
   - Make spinner conditionally show when isLoading is true

2. **Style the component** (`Button.css`)
   - Base button styles (display, padding, border, cursor, etc.)
   - 5 variants: primary (blue), secondary (gray), outline, ghost, danger (red)
   - 3 sizes: sm, md, lg
   - Loading state (hide text, show spinner)
   - Disabled state (opacity, cursor: not-allowed)
   - Hover and active states
   - Focus styles with ring for accessibility

3. **Write tests** (`Button.test.jsx`)
   - Test all variants render correctly
   - Test all sizes apply correct classes
   - Test loading and disabled states
   - Test icon rendering (left, right, both)
   - Test onClick handler
   - Test onClick doesn't fire when disabled/loading
   - Test ref forwarding
   - Test props spreading
   - **Target: 80%+ coverage**

### Part 2: Input Component

**Files:** `Input.jsx`, `Input.css`, `Input.test.jsx`

1. **Create the component**
   - Props: label, helperText, errorMessage, variant, size, type, isInvalid, isDisabled, isRequired
   - Variants: outline, filled, flushed
   - Sizes: sm, md, lg
   - Generate unique ID if not provided
   - Associate label with input (htmlFor/id)
   - Associate helper/error text with aria-describedby
   - Show asterisk for required fields
   - Use forwardRef

2. **Style the component**
   - Wrapper with label, input, helper/error text
   - 3 variants with different styles
   - 3 sizes
   - Invalid state (red border, error message)
   - Disabled state
   - Focus styles
   - Dark mode support

3. **Write comprehensive tests**
   - All variants and sizes
   - States (invalid, disabled, required)
   - Label association
   - Helper text vs error message
   - Accessibility (aria attributes)
   - User interactions

### Part 3: Card Component (Compound)

**Files:** `Card.jsx`, `Card.css`, `Card.test.jsx`

1. **Create compound component**
   - Main Card component with variant and padding props
   - Card.Header subcomponent
   - Card.Body subcomponent
   - Card.Footer subcomponent
   - All use displayName for debugging

2. **Implement variants**
   - elevated (box shadow)
   - outline (border)
   - filled (background color)

3. **Implement padding options**
   - none, sm, md, lg

4. **Style the compound component**
   - Card container styles
   - Header (top, border-bottom)
   - Body (main content, flex: 1)
   - Footer (bottom, border-top)
   - Responsive design

5. **Write tests**
   - Test Card renders children
   - Test all variants
   - Test all padding sizes
   - Test compound components (Header, Body, Footer)
   - Test they work together
   - Test display names

## ✅ Success Criteria

Your implementation should have:

- [ ] All components have consistent API (variant, size props)
- [ ] Components use design tokens from Exercise 1
- [ ] forwardRef implemented for Button and Input
- [ ] Comprehensive unit tests (80%+ coverage)
- [ ] Accessible (ARIA attributes, keyboard support)
- [ ] Components work together harmoniously
- [ ] Clean, readable code with comments

## 💡 Hints

### forwardRef Pattern
```jsx
const Component = forwardRef((props, ref) => {
  return <div ref={ref} {...props} />;
});
Component.displayName = 'Component';
```

### ClassNames Pattern
```jsx
const classNames = [
  'base-class',
  `variant-${variant}`,
  `size-${size}`,
  isActive && 'active',
  className
].filter(Boolean).join(' ');
```

### Testing with React Testing Library
```jsx
import { render, screen, fireEvent } from '@testing-library/react';

it('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Compound Components
```jsx
const Card = ({ children }) => <div className="card">{children}</div>;
Card.Header = ({ children }) => <div className="card__header">{children}</div>;
Card.displayName = 'Card';
Card.Header.displayName = 'Card.Header';
```

### Running Tests
```bash
npm install           # Install dependencies
npm test             # Run all tests
npm run test:watch   # Watch mode
npm run test:coverage # Check coverage
```

## 📚 Resources

- [React forwardRef](https://react.dev/reference/react/forwardRef)
- [Compound Components Pattern](https://kentcdodds.com/blog/compound-components-with-react-hooks)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

## 🚀 Getting Started

1. Start with Button component
2. Complete the JSX logic
3. Style all variants and sizes
4. Write comprehensive tests
5. Move to Input component
6. Then Card component
7. Run all tests and verify 80%+ coverage

## 🎁 Bonus Challenges

- Add TypeScript types instead of just comments
- Add more components (Badge, Checkbox, Select)
- Create interactive demo.html
- Add animations
- Implement size variants for Card
- Add loading state to Input
- Create form validation examples

Good luck! 🚀

