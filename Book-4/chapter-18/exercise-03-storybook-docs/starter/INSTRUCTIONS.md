# Exercise 3: Storybook Documentation - Instructions

## 🎯 Goal

Set up Storybook and create comprehensive documentation for all your components from Exercise 2.

## 📝 Tasks

### Part 1: Storybook Configuration

**File:** `.storybook/main.js`

1. **Configure stories location**
   ```javascript
   stories: [
     '../stories/**/*.mdx',
     '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
   ],
   ```

2. **Add accessibility addon**
   ```javascript
   addons: [
     '@storybook/addon-links',
     '@storybook/addon-essentials',
     '@storybook/addon-interactions',
     '@storybook/addon-a11y', // Add this!
   ],
   ```

**File:** `.storybook/preview.js`

1. **Import design tokens CSS**
   - Import the CSS from exercise-01

2. **Add theme decorator**
   ```javascript
   decorators: [
     (Story, context) => {
       const theme = context.globals.theme || 'light';

       React.useEffect(() => {
         if (theme === 'dark') {
           document.documentElement.setAttribute('data-theme', 'dark');
         } else {
           document.documentElement.removeAttribute('data-theme');
         }
       }, [theme]);

       return <Story />;
     },
   ],
   ```

### Part 2: Create Button Stories

**File:** `stories/Button.stories.jsx`

1. **Import Button component**
   ```javascript
   import Button from '../../exercise-02-component-library/solution/Button';
   import '../../exercise-02-component-library/solution/Button.css';
   ```

2. **Configure story metadata**
   ```javascript
   export default {
     title: 'Components/Button',
     component: Button,
     parameters: { layout: 'centered' },
     tags: ['autodocs'],
     argTypes: {
       variant: {
         control: 'select',
         options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
       },
       size: {
         control: 'select',
         options: ['sm', 'md', 'lg'],
       },
       isLoading: { control: 'boolean' },
       isDisabled: { control: 'boolean' },
       onClick: { action: 'clicked' },
     },
   };
   ```

3. **Create stories for each variant**
   - Primary, Secondary, Outline, Ghost, Danger
   - Small, Medium, Large
   - Loading, Disabled
   - With icons

4. **Create composite stories**
   - AllVariants - show all variants together
   - AllSizes - show all sizes together
   - AllStates - show all states together

### Part 3: Create Input Stories

**File:** `stories/Input.stories.jsx`

1. **Import Input component**

2. **Configure story metadata** with argTypes for:
   - variant (outline, filled, flushed)
   - size (sm, md, lg)
   - type (text, email, password, etc.)
   - label, helperText, errorMessage
   - isInvalid, isDisabled, isRequired

3. **Create stories**
   - Default
   - WithLabel
   - WithHelperText
   - Required
   - WithError
   - Disabled
   - All variants
   - All sizes
   - Input types
   - Form example

### Part 4: Create Card Stories

**File:** `stories/Card.stories.jsx`

1. **Import Card component**

2. **Configure story metadata**

3. **Create stories**
   - Default
   - Elevated, Outline, Filled
   - WithHeader, WithFooter, Complete
   - Real-world examples:
     - Product card
     - User profile card
     - Pricing card
   - AllVariants
   - AllPaddingSizes

### Part 5: Create Introduction Page

**File:** `stories/Introduction.mdx`

1. **Write introduction** explaining:
   - What's in the design system
   - Available components
   - How to install and use
   - Links to documentation

## ✅ Success Criteria

Your Storybook should have:

- [ ] Storybook runs on `http://localhost:6006`
- [ ] Stories for all components (Button, Input, Card)
- [ ] Stories for all variants and sizes
- [ ] Interactive controls configured
- [ ] Accessibility addon shows zero violations
- [ ] Component documentation auto-generated
- [ ] Examples show all states (loading, disabled, error)
- [ ] Theme switcher works in toolbar
- [ ] Introduction page explaining the system

## 💡 Hints

### Story Format (CSF 3.0)
```javascript
export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};
```

### Composite Story
```javascript
export const AllVariants = () => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
  </div>
);
```

### ArgTypes Configuration
```javascript
argTypes: {
  variant: {
    control: 'select',
    options: ['primary', 'secondary'],
    description: 'The visual style variant',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'primary' },
    },
  },
}
```

## 📚 Resources

- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)
- [Storybook Args](https://storybook.js.org/docs/react/writing-stories/args)
- [A11y Addon](https://storybook.js.org/addons/@storybook/addon-a11y)

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start Storybook:
   ```bash
   npm run storybook
   ```

3. Open `http://localhost:6006`

4. Create stories for each component

5. Test interactive controls

6. Check accessibility panel

7. Build Storybook:
   ```bash
   npm run build-storybook
   ```

## 🎁 Bonus Challenges

- Add more real-world examples
- Create complex form examples
- Add code snippets showing usage
- Deploy Storybook to Chromatic or GitHub Pages
- Add visual regression testing
- Create dark mode showcase
- Add keyboard shortcut documentation

Good luck! 📚

