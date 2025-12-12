# Exercise 1: Library Setup - Complete Hints

## Overview

This exercise involves building the **same page** in all 4 libraries to compare developer experience. The best way to learn is by doing!

---

## General Approach

###Step 1: Pick a Library (15 min each)
1. Create new Vite project
2. Install library dependencies
3. Set up provider/wrapper
4. Build the required components

### Step 2: Fill Comparison Table
After building all 4, evaluate each on:
- Setup difficulty
- Code required
- Developer experience
- Documentation quality
- API intuition

---

## Detailed Examples

See these files for complete implementations:
- `hints/mui-example.md` - Material UI complete code
- `hints/chakra-example.md` - Chakra UI complete code
- `hints/bootstrap-example.md` - Bootstrap complete code (if exists)
- `hints/antd-example.md` - Ant Design complete code (if exists)
- `hints/comparison-guide.md` - Comprehensive comparison

---

## Quick Setup Commands

### Material UI
```bash
npm create vite@latest mui-demo -- --template react
cd mui-demo && npm install
npm install @mui/material @emotion/react @emotion/styled
```

### Chakra UI
```bash
npm create vite@latest chakra-demo -- --template react
cd chakra-demo && npm install
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

### Bootstrap
```bash
npm create vite@latest bootstrap-demo -- --template react
cd bootstrap-demo && npm install
npm install bootstrap react-bootstrap
```

### Ant Design
```bash
npm create vite@latest antd-demo -- --template react
cd antd-demo && npm install
npm install antd
```

---

## Required Components Checklist

For each library, implement:

- [ ] **Header/AppBar**
  - Logo text
  - 3 navigation links
  - Primary action button

- [ ] **Main Content**
  - Page heading
  - Description paragraph
  - Card with title, body, and button

- [ ] **Form Section**
  - Text input (Name)
  - Email input
  - Select dropdown (Country)
  - Checkbox (Terms)
  - Submit button

---

## Common Patterns

### Provider Setup Pattern
```jsx
// main.jsx - Common for most libraries
import Provider from 'library'

root.render(
  <Provider>
    <App />
  </Provider>
)
```

### Component Import Pattern
```jsx
// Option 1: Named imports (MUI, Chakra, Ant Design)
import { Button, Card, Input } from 'library'

// Option 2: CSS classes (Bootstrap)
import 'bootstrap/dist/css/bootstrap.min.css'
```

---

## Troubleshooting

### Issue: Styles not applying
- **MUI:** Did you add `<CssBaseline />`?
- **Chakra:** Is `<ChakraProvider>` wrapping your app?
- **Bootstrap:** Did you import the CSS?
- **Ant Design:** Are you using `<ConfigProvider>`?

### Issue: Components not found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Typescript errors
All libraries support TS. If using TS:
```bash
npm install @types/react @types/react-dom
```

---

## Comparison Criteria Guide

### Setup Difficulty (1-5)
- 1 = Very hard, confusing
- 3 = Moderate, clear docs
- 5 = Very easy, intuitive

### Code Required (count lines)
Count lines in your `App.jsx` for each library

### Developer Experience (1-5)
- How fun was it?
- How intuitive?
- How fast were you?

### Documentation Quality (1-5)
- Could you find answers easily?
- Were examples clear?
- Were there enough examples?

### Component API Intuition (1-5)
- Did component props make sense?
- Was naming intuitive?
- Were there surprises?

---

## Example Comparison Table

| Criteria | MUI | Chakra | Bootstrap | Ant Design |
|----------|-----|--------|-----------|------------|
| **Setup Difficulty** | 3 | 4 | 5 | 3 |
| **Code Required** | 120 lines | 100 lines | 90 lines | 110 lines |
| **Developer Experience** | 4 | 5 | 3 | 4 |
| **Documentation** | 5 | 4 | 3 | 4 |
| **API Intuition** | 4 | 5 | 4 | 3 |
| **Styling Approach** | sx prop | style props | CSS classes | style prop |
| **Would Use Again?** | Yes | Yes! | Maybe | Yes |

---

## Tips for Success

1. **Time box each library** - Don't spend more than 20 minutes
2. **Use official docs** - They're your best resource
3. **Copy-paste is OK** - This is about comparison, not memorization
4. **Take notes** - Write down frustrations and "aha!" moments
5. **Trust your gut** - Your initial impression matters

---

## What Makes a Library "Good"?

Consider these factors:

**Developer Experience:**
- How fast can you build?
- How intuitive is the API?
- How good are error messages?

**Component Quality:**
- Do components have what you need?
- Are they accessible?
- Are they customizable?

**Documentation:**
- Can you find answers?
- Are examples good?
- Is there a community?

**Project Fit:**
- Does it match your design needs?
- Is the bundle size acceptable?
- Does your team like it?

---

## After Completion

You should be able to answer:

1. **Which library was easiest to set up?**
2. **Which library required the least code?**
3. **Which library felt best to use?**
4. **Which library would you choose for a real project?**
5. **What surprised you about each library?**

---

**Remember:** There's no "best" library - only the best library **for your specific project**! 🎯

Your hands-on experience with all 4 will make you much better at choosing the right tool for the job.

