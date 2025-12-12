# Challenge: Complete Design System - Hints 💡

## Hint 1: Monorepo Structure

Use Lerna or npm workspaces:

```json
{
  "name": "my-design-system",
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*"
  ]
}
```

## Hint 2: Token Package Structure

```
packages/tokens/
├── src/
│   ├── tokens.json
│   └── build.js
├── dist/
│   ├── tokens.css
│   ├── tokens.scss
│   └── tokens.js
├── package.json
└── README.md
```

## Hint 3: Component Package Structure

```
packages/core/
├── src/
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.css
│   │   ├── Button.test.jsx
│   │   └── Button.stories.jsx
│   ├── Input/
│   └── index.js
├── package.json
└── README.md
```

## Hint 4: Build Script for Components

```json
{
  "scripts": {
    "build": "vite build",
    "test": "vitest",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

## Hint 5: Publishing to npm

```bash
# Login to npm
npm login

# Publish tokens package
cd packages/tokens
npm publish --access public

# Publish components package
cd packages/core
npm publish --access public
```

## Hint 6: Component Template

```jsx
// Button.jsx
import './Button.css';
import '@your-org/tokens/dist/tokens.css';

export function Button({
  variant = 'primary',
  size = 'medium',
  children,
  ...props
}) {
  const classes = `btn btn--${variant} btn--${size}`;
  return <button className={classes} {...props}>{children}</button>;
}
```

## Hint 7: Storybook Configuration

```javascript
// .storybook/main.js
module.exports = {
  stories: ['../packages/core/src/**/*.stories.@(js|jsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: '@storybook/react-vite',
};
```

## Hint 8: Testing Setup

```javascript
// Button.test.jsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('applies variant class', () => {
  render(<Button variant="primary">Test</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn--primary');
});
```

## Hint 9: CI/CD with GitHub Actions

```yaml
# .github/workflows/publish.yml
name: Publish
on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Hint 10: Deployment

**Vercel:**
```bash
npm install -g vercel
vercel --prod
```

**Netlify:**
```bash
npm run build-storybook
# Drag dist-storybook folder to Netlify
```

**GitHub Pages:**
```yaml
# .github/workflows/deploy-storybook.yml
name: Deploy Storybook
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build-storybook
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./storybook-static
```

**You can build this!** 🚀✨

