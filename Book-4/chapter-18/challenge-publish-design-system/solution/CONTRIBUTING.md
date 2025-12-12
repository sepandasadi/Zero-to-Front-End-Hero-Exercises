# Contributing to Design System

Thank you for your interest in contributing! This document provides guidelines for contributing to our design system.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Component Guidelines](#component-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and follow our Code of Conduct.

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/design-system.git
   cd design-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start Storybook:
   ```bash
   npm run storybook
   ```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/component-name
# or
git checkout -b fix/bug-description
```

### 2. Make Changes

- Write code following our [Component Guidelines](#component-guidelines)
- Add tests following our [Testing Guidelines](#testing-guidelines)
- Update documentation in Storybook

### 3. Test Your Changes

```bash
# Run tests
npm test

# Run linting
npm run lint

# Check test coverage
npm run test:coverage
```

### 4. Commit Your Changes

Follow our [Commit Conventions](#commit-conventions):

```bash
git add .
git commit -m "feat(Button): add loading state"
```

### 5. Push and Create PR

```bash
git push origin feature/component-name
```

Then create a Pull Request on GitHub.

## Component Guidelines

### File Structure

```
src/components/ComponentName/
├── ComponentName.jsx
├── ComponentName.css
├── ComponentName.test.jsx
├── ComponentName.stories.jsx
└── index.js
```

### Component Template

```jsx
import React, { forwardRef } from 'react';
import './ComponentName.css';

/**
 * ComponentName Component
 *
 * Brief description of what this component does.
 *
 * @component
 * @example
 * <ComponentName variant="primary">
 *   Content
 * </ComponentName>
 */
const ComponentName = forwardRef(({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  ...props
}, ref) => {
  const classNames = [
    'component',
    `component--${variant}`,
    `component--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classNames} {...props}>
      {children}
    </div>
  );
});

ComponentName.displayName = 'ComponentName';

export default ComponentName;
```

### Component Requirements

✅ **Must Have:**
- forwardRef support (if applicable)
- Consistent API (variant, size props)
- PropTypes or TypeScript definitions
- Accessibility (ARIA attributes, keyboard support)
- Responsive design
- Dark mode support
- Error states
- Documentation in Storybook

✅ **Should Have:**
- Loading states (if applicable)
- Disabled states
- Custom className support
- Pass-through props (...props)

### CSS Guidelines

```css
/* BEM naming convention */
.component { }
.component__element { }
.component--modifier { }

/* Use design tokens */
.component {
  color: var(--color-text-primary);
  padding: var(--space-4);
  border-radius: var(--radius-base);
}

/* Dark mode support */
[data-theme='dark'] .component {
  background-color: var(--color-bg-secondary);
}

/* Responsive design */
@media (max-width: 768px) {
  .component {
    padding: var(--space-2);
  }
}
```

## Testing Guidelines

### Test Structure

```jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  describe('Rendering', () => {
    it('renders children', () => {
      render(<ComponentName>Content</ComponentName>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('applies variant class', () => {
      // Test variant rendering
    });
  });

  describe('States', () => {
    it('handles disabled state', () => {
      // Test states
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', () => {
      // Test interactions
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      // Test accessibility
    });
  });

  describe('Props', () => {
    it('forwards ref', () => {
      // Test ref forwarding
    });
  });
});
```

### Test Coverage Requirements

- **Minimum**: 80% coverage
- **Target**: 90%+ coverage

Test these areas:
- ✅ Rendering
- ✅ Props
- ✅ Variants and sizes
- ✅ States (loading, disabled, error)
- ✅ Interactions (clicks, keyboard)
- ✅ Accessibility (ARIA, roles)
- ✅ Edge cases

### Accessibility Testing

```jsx
import { axe } from 'jest-axe';

it('has no accessibility violations', async () => {
  const { container } = render(<ComponentName />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(Button): add loading state
fix(Input): correct error message positioning
docs(Card): update usage examples
test(Modal): add keyboard navigation tests
refactor(tokens): reorganize color palette
```

## Pull Request Process

### Before Submitting

- [ ] Code follows our style guidelines
- [ ] Tests pass (`npm test`)
- [ ] Test coverage is 80%+
- [ ] Linting passes (`npm run lint`)
- [ ] Storybook builds (`npm run build-storybook`)
- [ ] Documentation is updated
- [ ] CHANGELOG.md is updated (if applicable)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No accessibility violations
- [ ] Follows component guidelines

## Screenshots (if applicable)
Add screenshots here
```

### Review Process

1. Automated checks must pass
2. At least one maintainer approval required
3. All conversations must be resolved
4. Branch must be up to date with main

## Questions?

- Open an issue with the `question` label
- Join our [Discussions](https://github.com/yourusername/design-system/discussions)

Thank you for contributing! 🎉

