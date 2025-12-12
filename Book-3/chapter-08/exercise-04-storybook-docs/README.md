# Exercise 4: Storybook Documentation ⭐⭐

**Difficulty:** Intermediate
**Time:** 1.5 hours
**Focus:** Component documentation with Storybook

## 🎯 Learning Objectives

- Set up Storybook for component documentation
- Write component stories for all variants
- Use Storybook controls for interactive props
- Write MDX documentation
- Add accessibility testing with a11y addon

---

## 📋 Requirements

Set up Storybook and document your components from Exercises 2 and 3.

### Setup

1. Install Storybook
2. Configure for your project
3. Add addons (controls, a11y, docs)
4. Create stories for each component

### Components to Document

- Button (all 5 variants, 3 sizes)
- Input (all states)
- Checkbox (all states)
- Modal (all sizes)

### Story Requirements

Each component should have:
- Default story
- All variant stories
- All size stories
- All state stories
- Interactive controls
- MDX documentation page

---

## 🚀 Getting Started

### Install Storybook

```bash
npx storybook@latest init
```

### Create Button Stories

**`components/Button.stories.js`:**

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
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
  },
};

const Template = ({ variant, size, disabled, loading, label }) => {
  const classes = `btn btn--${variant} btn--${size} ${loading ? 'btn--loading' : ''}`;
  return `
    <button class="${classes}" ${disabled ? 'disabled' : ''}>
      ${loading ? '<span class="btn__spinner"></span>' : ''}
      ${label}
    </button>
  `;
};

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  size: 'medium',
  label: 'Primary Button',
  disabled: false,
  loading: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  variant: 'secondary',
  label: 'Secondary Button',
};

export const AllVariants = () => `
  <div style="display: flex; gap: 12px;">
    <button class="btn btn--primary">Primary</button>
    <button class="btn btn--secondary">Secondary</button>
    <button class="btn btn--outline">Outline</button>
    <button class="btn btn--ghost">Ghost</button>
    <button class="btn btn--danger">Danger</button>
  </div>
`;
```

### Create MDX Documentation

**`components/Button.mdx`:**

````mdx
import { Meta, Story, Canvas, Controls } from '@storybook/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

# Button

Primary UI component for user actions.

## When to Use

- Primary actions (submit, save, confirm)
- Secondary actions (cancel, back)
- Destructive actions (delete, remove)

## When NOT to Use

- For navigation - use links instead
- For toggling - use checkbox or switch

## Variants

<Canvas>
  <Story of={ButtonStories.AllVariants} />
</Canvas>

## Sizes

<Canvas>
  <Story of={ButtonStories.AllSizes} />
</Canvas>

## States

### Disabled
<Canvas>
  <Story of={ButtonStories.Disabled} />
</Canvas>

### Loading
<Canvas>
  <Story of={ButtonStories.Loading} />
</Canvas>

## Accessibility

- Keyboard navigable with Tab
- Activates with Space or Enter
- `aria-busy="true"` when loading
- `disabled` attribute prevents interaction

## Props

<Controls of={ButtonStories.Primary} />
````

---

## ✅ Acceptance Criteria

- [ ] Storybook installed and running
- [ ] All components have stories
- [ ] Interactive controls work
- [ ] MDX documentation pages created
- [ ] Accessibility addon shows no violations
- [ ] All variants displayed
- [ ] "When to use" guidelines included
- [ ] Code examples included

---

## 💡 Tips

**Run Storybook:**
```bash
npm run storybook
```

**Build Storybook:**
```bash
npm run build-storybook
```

**Deploy:**
- Deploy to Chromatic
- Or deploy to Netlify/Vercel

---

**Document your components beautifully!** 📚✨

