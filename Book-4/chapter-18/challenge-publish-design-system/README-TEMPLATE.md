# @yourorg/design-system

> A comprehensive, accessible React component library with a complete design system.

[![npm version](https://badge.fury.io/js/%40yourorg%2Fdesign-system.svg)](https://www.npmjs.com/package/@yourorg/design-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎨 Features

- 🧩 **7 Core Components** - Button, Input, Card, Modal, Select, Checkbox, Badge
- 🎭 **Design Tokens** - Consistent colors, spacing, typography
- 🌗 **Dark Mode** - Built-in theme switching
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 📦 **Tree-shakeable** - Import only what you need
- 📚 **Storybook** - Interactive documentation
- ✅ **Tested** - 80%+ test coverage
- 🔷 **TypeScript** - Full type definitions

## 📦 Installation

```bash
npm install @yourorg/design-system
# or
yarn add @yourorg/design-system
```

## 🚀 Quick Start

```jsx
import { Button, Input, Card, ThemeProvider } from '@yourorg/design-system';
import '@yourorg/design-system/dist/index.css';

function App() {
  return (
    <ThemeProvider>
      <Card>
        <Card.Header>
          <h2>Welcome</h2>
        </Card.Header>
        <Card.Body>
          <Input label="Email" type="email" />
        </Card.Body>
        <Card.Footer>
          <Button variant="primary">Submit</Button>
        </Card.Footer>
      </Card>
    </ThemeProvider>
  );
}
```

## 📚 Components

### Button

```jsx
<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'`
- `size`: `'sm' | 'md' | 'lg'`
- `isLoading`: `boolean`
- `isDisabled`: `boolean`
- `leftIcon`: `ReactNode`
- `rightIcon`: `ReactNode`

### Input

```jsx
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
/>
```

**Props:**
- `variant`: `'outline' | 'filled' | 'flushed'`
- `size`: `'sm' | 'md' | 'lg'`
- `label`: `string`
- `helperText`: `string`
- `errorMessage`: `string`
- `isInvalid`: `boolean`
- `isDisabled`: `boolean`
- `isRequired`: `boolean`

### Card

```jsx
<Card variant="elevated">
  <Card.Header>Header</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Footer</Card.Footer>
</Card>
```

**Props:**
- `variant`: `'elevated' | 'outline' | 'filled'`
- `padding`: `'none' | 'sm' | 'md' | 'lg'`

[See full documentation →](https://your-storybook-url.com)

## 🎨 Design Tokens

Access design tokens in JavaScript:

```js
import { tokens } from '@yourorg/design-system';

const primaryColor = tokens.colors.brand[500];
const spacing = tokens.spacing[4];
```

## 🌗 Theming

```jsx
import { ThemeProvider, useTheme } from '@yourorg/design-system';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <YourApp />
    </ThemeProvider>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

## 📖 Documentation

- [Storybook](https://your-storybook-url.com) - Interactive component documentation
- [Design Tokens](./docs/tokens.md) - Complete token reference
- [Accessibility](./docs/accessibility.md) - Accessibility guidelines
- [Migration Guide](./docs/migration.md) - Upgrading between versions

## 🧪 Testing

All components are thoroughly tested:

```bash
npm test
npm run test:coverage
```

## 🛠 Development

```bash
# Install dependencies
npm install

# Run Storybook
npm run storybook

# Run tests
npm test

# Build library
npm run build
```

## 📦 Package Contents

```
@yourorg/design-system/
├── dist/
│   ├── index.js       # CommonJS build
│   ├── index.esm.js   # ES Module build
│   ├── index.d.ts     # TypeScript definitions
│   └── index.css      # Component styles
└── README.md
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📄 License

MIT © Your Name

## 🙏 Acknowledgments

Built with:
- [React](https://react.dev)
- [Rollup](https://rollupjs.org)
- [Storybook](https://storybook.js.org)
- [Jest](https://jestjs.io)
- [Testing Library](https://testing-library.com)

## 📮 Support

- [GitHub Issues](https://github.com/yourusername/design-system/issues)
- [Documentation](https://your-storybook-url.com)
- [Discussions](https://github.com/yourusername/design-system/discussions)

---

**Built with ❤️ by Your Name**

