# Design System - Project Structure

## 📁 Monorepo Structure

```
my-design-system/
├── packages/
│   ├── tokens/                    # Design tokens package
│   │   ├── src/
│   │   │   ├── tokens.json       # Token definitions
│   │   │   └── build.js          # Build script
│   │   ├── dist/                 # Generated files
│   │   │   ├── tokens.css
│   │   │   ├── tokens.scss
│   │   │   ├── tokens.js
│   │   │   └── tokens.d.ts
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── core/                      # React components
│       ├── src/
│       │   ├── Button/
│       │   │   ├── Button.jsx
│       │   │   ├── Button.css
│       │   │   ├── Button.test.jsx
│       │   │   └── Button.stories.jsx
│       │   ├── Input/
│       │   ├── Checkbox/
│       │   ├── Modal/
│       │   └── index.js
│       ├── package.json
│       └── README.md
│
├── apps/
│   ├── storybook/                 # Storybook documentation
│   │   ├── .storybook/
│   │   │   ├── main.js
│   │   │   └── preview.js
│   │   ├── stories/
│   │   └── package.json
│   │
│   └── demo/                      # Demo application
│       ├── src/
│       ├── public/
│       └── package.json
│
├── .github/
│   └── workflows/
│       ├── test.yml
│       ├── publish.yml
│       └── chromatic.yml
│
├── package.json                   # Root package.json
├── lerna.json                     # Lerna config
├── .gitignore
├── .npmrc
├── README.md
└── LICENSE
```

---

## 📦 Package Details

### Tokens Package (`@your-org/tokens`)

Design tokens as the single source of truth.

**Files:**
- `tokens.json` - Token definitions
- `build.js` - Generates CSS, Sass, JS, TypeScript
- `build.css` - CSS custom properties
- `build.scss` - Sass variables
- `build.js` - JavaScript export
- `build.d.ts` - TypeScript types

**Usage:**
```bash
npm install @your-org/tokens
```

```css
@import '@your-org/tokens/dist/tokens.css';
```

---

### Core Package (`@your-org/core`)

React component library.

**Components (14 total):**

**Primitives (9):**
1. Button
2. Input
3. Checkbox
4. Radio
5. Select
6. TextArea
7. Badge
8. Avatar
9. Spinner

**Composites (5):**
10. Card
11. Modal
12. Dropdown
13. Alert
14. Tabs

**Each component includes:**
- `.jsx` - Component implementation
- `.css` - Component styles
- `.test.jsx` - Unit tests
- `.stories.jsx` - Storybook stories

**Usage:**
```bash
npm install @your-org/core
```

```jsx
import { Button, Input } from '@your-org/core';
```

---

### Storybook App

Component documentation and playground.

**Features:**
- Interactive component previews
- Props controls
- Accessibility testing
- MDX documentation
- Visual regression testing

**Run:**
```bash
npm run storybook
```

**Build:**
```bash
npm run build-storybook
```

---

### Demo App

Example application using the design system.

**Purpose:**
- Show real-world usage
- Test integration
- Performance benchmarking
- Live demo for stakeholders

---

## 🚀 Getting Started

### Initial Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/my-design-system
cd my-design-system

# Install dependencies
npm install

# Bootstrap packages
npm run bootstrap

# Build all packages
npm run build
```

### Development

```bash
# Run all packages in dev mode
npm run dev

# Run Storybook
npm run storybook

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format
```

### Publishing

```bash
# Build packages
npm run build

# Publish to npm (using Lerna)
npm run publish-packages

# Or publish manually
cd packages/tokens
npm publish --access public

cd ../core
npm publish --access public
```

---

## 🔧 Development Workflow

### Adding a New Component

1. **Create component folder:**
```bash
mkdir packages/core/src/NewComponent
```

2. **Create component files:**
```bash
touch packages/core/src/NewComponent/NewComponent.jsx
touch packages/core/src/NewComponent/NewComponent.css
touch packages/core/src/NewComponent/NewComponent.test.jsx
touch packages/core/src/NewComponent/NewComponent.stories.jsx
```

3. **Implement component** using design tokens

4. **Write tests:**
```jsx
import { render, screen } from '@testing-library/react';
import { NewComponent } from './NewComponent';

test('renders component', () => {
  render(<NewComponent />);
  expect(screen.getByRole('...')).toBeInTheDocument();
});
```

5. **Create Storybook story:**
```jsx
export default {
  title: 'Components/NewComponent',
  component: NewComponent,
};

export const Default = () => <NewComponent />;
```

6. **Export from index:**
```jsx
export { NewComponent } from './NewComponent/NewComponent';
```

7. **Build and test:**
```bash
npm run build
npm run test
npm run storybook
```

---

## 📊 Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run dev` | Run all packages in dev mode |
| `npm run build` | Build all packages |
| `npm run test` | Run all tests |
| `npm run lint` | Lint all code |
| `npm run format` | Format code with Prettier |
| `npm run storybook` | Start Storybook |
| `npm run build-storybook` | Build static Storybook |
| `npm run publish-packages` | Publish to npm |
| `npm run clean` | Clean node_modules |
| `npm run bootstrap` | Install dependencies |

---

## 🎯 Version Management

Using Lerna for independent versioning:

```bash
# Version packages
lerna version

# Publish packages
lerna publish

# Publish from packages
lerna publish from-package
```

**Versioning strategy:**
- Major (v1.0.0 → v2.0.0): Breaking changes
- Minor (v1.0.0 → v1.1.0): New features
- Patch (v1.0.0 → v1.0.1): Bug fixes

---

## 🔐 Publishing to npm

### First Time Setup

```bash
# Login to npm
npm login

# Set registry (if using private registry)
npm config set registry https://registry.npmjs.org/
```

### Publishing Process

```bash
# 1. Update version
npm version patch # or minor, or major

# 2. Build
npm run build

# 3. Test
npm run test

# 4. Publish
npm publish --access public
```

### Scoped Packages

Use organization scope:
```json
{
  "name": "@your-org/tokens",
  "version": "1.0.0"
}
```

---

## 📈 CI/CD

GitHub Actions workflows:

**`.github/workflows/test.yml`** - Run tests on PR
**`.github/workflows/publish.yml`** - Publish on release
**`.github/workflows/chromatic.yml`** - Visual regression

---

## 🎨 Design Workflow

1. **Design in Figma** - Create components with design tokens
2. **Sync tokens** - Export from Figma to tokens.json
3. **Build components** - Implement in React
4. **Document in Storybook** - Create stories and MDX docs
5. **Test** - Unit tests + visual regression
6. **Publish** - Release to npm
7. **Update** - Iterate based on feedback

---

## 📚 Additional Resources

- **Storybook:** http://localhost:6006
- **Demo App:** http://localhost:3000
- **npm Registry:** https://npmjs.com/~your-org
- **Documentation:** ./docs/

---

**Questions?** Open an issue or check the [Contributing Guide](./CONTRIBUTING.md)

