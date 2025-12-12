# Exercise 4 Solution: Storybook Documentation

This exercise involves installing and configuring Storybook, which is done via npm installation rather than static files.

## 🚀 Complete Setup Guide

### Step 1: Install Storybook

```bash
# In your project directory
npx storybook@latest init
```

This will:
- Detect your project type
- Install necessary dependencies
- Create `.storybook` configuration folder
- Generate example stories

### Step 2: Install Accessibility Addon

```bash
npm install @storybook/addon-a11y --save-dev
```

### Step 3: Configure Addons

**`.storybook/main.js`:**

```javascript
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};
```

### Step 4: Create Button Stories

**`src/components/Button.stories.js`:**

```javascript
import './button.css';
import '../tokens/tokens.css';

export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'Button style variant',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    label: {
      control: 'text',
      description: 'Button text',
    },
  },
};

// Template function
const Template = ({ variant = 'primary', size = 'medium', disabled, loading, label }) => {
  const classes = `btn btn--${variant} btn--${size} ${loading ? 'btn--loading' : ''}`;
  return `
    <button class="${classes}" ${disabled ? 'disabled' : ''} ${loading ? 'aria-busy="true"' : ''}>
      ${loading ? '<span class="btn__spinner"></span>' : ''}
      ${label}
    </button>
  `;
};

// Default story
export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  size: 'medium',
  label: 'Primary Button',
};

// All variants
export const AllVariants = () => `
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <button class="btn btn--primary">Primary</button>
    <button class="btn btn--secondary">Secondary</button>
    <button class="btn btn--outline">Outline</button>
    <button class="btn btn--ghost">Ghost</button>
    <button class="btn btn--danger">Danger</button>
  </div>
`;

// All sizes
export const AllSizes = () => `
  <div style="display: flex; gap: 12px; align-items: center;">
    <button class="btn btn--primary btn--small">Small</button>
    <button class="btn btn--primary btn--medium">Medium</button>
    <button class="btn btn--primary btn--large">Large</button>
  </div>
`;

// Disabled state
export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'primary',
  size: 'medium',
  label: 'Disabled Button',
  disabled: true,
};

// Loading state
export const Loading = Template.bind({});
Loading.args = {
  variant: 'primary',
  size: 'medium',
  label: 'Loading...',
  loading: true,
};
```

### Step 5: Create MDX Documentation

**`src/components/Button.mdx`:**

````mdx
import { Meta, Story, Canvas, Controls, Description } from '@storybook/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

# Button

Primary UI component for user actions and form submissions.

## When to Use

✅ **Use buttons for:**
- Primary actions (save, submit, confirm)
- Secondary actions (cancel, back)
- Destructive actions (delete, remove)
- Triggering modals or dropdowns

❌ **Don't use buttons for:**
- Navigation between pages - use links (`<a>`) instead
- Toggling state - use checkbox or switch
- Selecting from options - use radio buttons

## Variants

<Canvas>
  <Story of={ButtonStories.AllVariants} />
</Canvas>

### Primary
Use for the main action on a page. There should typically be only one primary button visible.

### Secondary
Use for secondary actions that are less important than the primary action.

### Outline
Use for tertiary actions or when you need a button that's less visually prominent.

### Ghost
Use for the least important actions, or when you want minimal visual weight.

### Danger
Use for destructive actions like delete or remove. Always confirm before executing.

## Sizes

<Canvas>
  <Story of={ButtonStories.AllSizes} />
</Canvas>

## States

### Default
The normal, interactive state of the button.

<Canvas>
  <Story of={ButtonStories.Primary} />
</Canvas>

### Disabled
Use when an action is unavailable. Provides visual feedback that the action cannot be performed.

<Canvas>
  <Story of={ButtonStories.Disabled} />
</Canvas>

### Loading
Shows a spinner to indicate an action is in progress. Prevents double-submission.

<Canvas>
  <Story of={ButtonStories.Loading} />
</Canvas>

## Accessibility

### Keyboard Navigation
- **Tab:** Focus the button
- **Space/Enter:** Activate the button

### Screen Readers
- Button text is announced
- `aria-busy="true"` announced when loading
- `disabled` attribute prevents interaction

### Focus Visible
Clear focus outline appears when navigating with keyboard.

## Best Practices

### Do's ✅
- Use clear, action-oriented labels ("Save Changes" not "Submit")
- Place primary action on the right in button groups
- Use loading state for async operations
- Keep labels short (1-3 words)
- Use consistent sizing across similar contexts

### Don'ts ❌
- Don't use multiple primary buttons on the same page
- Don't use generic labels like "Click Here"
- Don't disable buttons without explanation
- Don't use buttons for navigation
- Don't make buttons too small (minimum 44x44px touch target)

## Props

<Controls of={ButtonStories.Primary} />

## Code Example

```html
<!-- Primary button -->
<button class="btn btn--primary btn--medium">
  Save Changes
</button>

<!-- Loading state -->
<button class="btn btn--primary btn--medium btn--loading" aria-busy="true">
  <span class="btn__spinner"></span>
  Saving...
</button>

<!-- Disabled -->
<button class="btn btn--secondary btn--medium" disabled>
  Cancel
</button>
```

## Component API

| Class | Description |
|-------|-------------|
| `.btn` | Base button class (required) |
| `.btn--primary` | Primary variant |
| `.btn--secondary` | Secondary variant |
| `.btn--outline` | Outline variant |
| `.btn--ghost` | Ghost variant |
| `.btn--danger` | Danger variant |
| `.btn--small` | Small size |
| `.btn--medium` | Medium size (default) |
| `.btn--large` | Large size |
| `.btn--loading` | Loading state |
| `.btn--full-width` | Full width button |

---

**Related Components:** Input, Checkbox, Modal
````

### Step 6: Run Storybook

```bash
npm run storybook
```

Storybook will open at `http://localhost:6006`

### Step 7: Build for Production

```bash
npm run build-storybook
```

This creates a static site in `storybook-static/` that you can deploy.

## 📊 Complete Component Documentation Checklist

For each component, include:

- [ ] **Default story** with interactive controls
- [ ] **Variant stories** (all visual variations)
- [ ] **Size stories** (if applicable)
- [ ] **State stories** (disabled, loading, error, etc.)
- [ ] **MDX documentation page** with:
  - [ ] Description
  - [ ] When to use / when not to use
  - [ ] All variants showcased
  - [ ] Accessibility notes
  - [ ] Best practices (do's and don'ts)
  - [ ] Props documentation
  - [ ] Code examples
- [ ] **Accessibility tests** passing (addon-a11y)

## 🚀 Deployment Options

### Option 1: Chromatic (Recommended)
```bash
npm install chromatic --save-dev
npx chromatic --project-token=<your-token>
```

### Option 2: Netlify
```bash
npm run build-storybook
# Drag storybook-static folder to Netlify
```

### Option 3: Vercel
```bash
vercel --prod
```

### Option 4: GitHub Pages
```bash
npm run build-storybook
# Push storybook-static to gh-pages branch
```

## 🎓 What You Learned

- ✅ Setting up Storybook from scratch
- ✅ Writing interactive stories with Controls
- ✅ Creating MDX documentation pages
- ✅ Integrating accessibility testing
- ✅ Organizing component documentation
- ✅ Deploying Storybook sites

**Congratulations! You now have beautiful, interactive component documentation!** 📚✨

