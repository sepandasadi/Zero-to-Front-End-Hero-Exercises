# Chapter 6: Component Libraries - Quiz

## Instructions

- **15 multiple-choice questions**
- **Each question has one best answer**
- **Explanations provided after each answer**
- **Estimated time:** 20-30 minutes

Take this quiz after completing the chapter and exercises to test your component library knowledge!

---

## Questions

### **1. What is the primary benefit of using a component library over building custom components?**

A) Smaller bundle size
B) Pre-built accessibility, testing, and documentation
C) Unlimited customization freedom
D) No learning curve

<details>
<summary><strong>Answer</strong></summary>

**B) Pre-built accessibility, testing, and documentation**

**Explanation:**

Component libraries provide battle-tested components with:
- ✅ **Accessibility built-in** (ARIA, keyboard nav, focus management)
- ✅ **Testing** (thousands of edge cases solved)
- ✅ **Documentation** (live examples, API docs)
- ✅ **Maintenance** (bug fixes, updates)

**Bundle size:** Actually larger than custom (tradeoff for features)
**Customization:** More limited than building from scratch
**Learning curve:** Each library has its own API to learn

**The value proposition:**
- Spend time building features, not reinventing buttons
- Get accessibility and testing "for free"
- Move faster with less code

**When libraries make sense:**
- Complex apps (dashboards, admin panels)
- Accessibility requirements
- Small teams needing velocity
- Standard UI patterns
</details>

---

### **2. Which component library has the largest bundle size?**

A) Bootstrap
B) Material UI (MUI)
C) Chakra UI
D) Ant Design

<details>
<summary><strong>Answer</strong></summary>

**D) Ant Design**

**Explanation:**

**Bundle sizes (approximate):**
- Bootstrap: ~130KB
- Material UI: ~200KB
- Chakra UI: ~150KB
- **Ant Design: ~300KB** ← Largest

**Why Ant Design is larger:**
- Most comprehensive component set
- Rich data tables with built-in features
- Advanced form handling
- Internationalization (i18n) built-in
- More features = more code

**When the size is worth it:**
- Enterprise data-heavy apps
- Complex tables and forms
- Need i18n support
- Features outweigh size concerns

**When to avoid:**
- Marketing sites (use Bootstrap or custom)
- Small apps where every KB matters
- Simple CRUD apps (MUI or Chakra sufficient)

**Mitigation:**
- Tree-shaking (import only what you use)
- Code splitting (load tables only when needed)
- Lazy loading heavy components
</details>

---

### **3. What is the recommended way to customize MUI components globally?**

A) Write custom CSS that overrides MUI styles
B) Use inline styles on every component
C) Use `createTheme()` and `ThemeProvider` with component overrides
D) Fork the MUI repository and modify source code

<details>
<summary><strong>Answer</strong></summary>

**C) Use `createTheme()` and `ThemeProvider` with component overrides**

**Explanation:**

**✅ CORRECT approach:**
```tsx
const theme = createTheme({
  palette: { primary: { main: '#your-color' } },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
        },
      },
    },
  },
});

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
```

**Why this is best:**
- ✅ Centralized configuration
- ✅ Consistent across entire app
- ✅ Respects MUI's theming system
- ✅ Easy to maintain and update
- ✅ Type-safe with TypeScript

**❌ Why other options are bad:**

**A) Custom CSS overrides:**
```css
/* ❌ BAD - specificity wars, breaks theme updates */
.MuiButton-root {
  background: blue !important;
}
```

**B) Inline styles:**
```tsx
{/* ❌ BAD - repetitive, hard to maintain */}
<Button style={{ borderRadius: 12, textTransform: 'none' }}>
```

**D) Forking:**
- Nightmare to maintain
- No updates or bug fixes
- Breaks entire ecosystem

**Best practice:** Theme first, `sx` prop for one-offs, custom CSS as last resort.
</details>

---

### **4. What is Chakra UI's primary philosophy?**

A) Material Design compliance
B) Developer experience and composability
C) Enterprise data management
D) Server-side rendering

<details>
<summary><strong>Answer</strong></summary>

**B) Developer experience and composability**

**Explanation:**

Chakra UI prioritizes:

**1. Developer Experience:**
```tsx
<Box
  p={4}                    // padding: theme.space[4]
  bg="blue.500"            // background: theme.colors.blue[500]
  color="white"
  borderRadius="lg"
  _hover={{ bg: "blue.600" }}
>
  Content
</Box>
```
- Style props reference theme
- Intuitive API
- Less boilerplate
- Faster to write

**2. Composability:**
```tsx
<Stack spacing={4}>  {/* Compose simple primitives */}
  <Box>...</Box>
  <Box>...</Box>
</Stack>
```
- Build complex UIs from simple primitives
- Flexible composition
- No fighting abstractions

**Not Chakra's focus:**
- **Material Design:** That's MUI's thing
- **Enterprise data:** That's Ant Design's strength
- **SSR:** Works fine, but not unique selling point

**When Chakra shines:**
- Modern startups and SaaS
- Teams prioritizing DX
- Projects needing fast iteration
- Developers who love clean APIs

**Chakra's secret sauce:**
```tsx
// No CSS files, no className juggling, just props
<Button colorScheme="brand" size="lg" variant="solid">
  Click
</Button>
```

Everything references your theme!
</details>

---

### **5. Which library is best for server-rendered applications (Rails, Django, Laravel)?**

A) Material UI
B) Chakra UI
C) Bootstrap
D) Ant Design

<details>
<summary><strong>Answer</strong></summary>

**C) Bootstrap**

**Explanation:**

**Why Bootstrap wins for server-rendered apps:**

1. **Framework-agnostic:**
   - Works with any backend
   - No React/Vue required
   - Pure HTML + CSS + JS

2. **HTML-first approach:**
   ```html
   <!-- Works in any template engine -->
   <button class="btn btn-primary">Click</button>
   <div class="card">...</div>
   ```

3. **Mature integration:**
   - Rails gem: `bootstrap-sass`
   - Django: Easy static file integration
   - Laravel: Mix support
   - PHP: Just include CSS/JS

4. **No build step required:**
   - CDN links work fine
   - Progressive enhancement
   - Works without JavaScript

**Why React libraries (MUI, Chakra, Ant) are harder:**
```tsx
// ❌ Can't use in server templates
import { Button } from '@mui/material';
<Button>Click</Button>
```
- Require React runtime
- Need build tools
- Complex SSR setup

**When to use Bootstrap:**
- Rails/Django/Laravel apps
- Traditional server-rendered sites
- Progressive enhancement needed
- Team doesn't use React/Vue

**When React libraries make sense:**
- Next.js (React SSR framework)
- Remix (React SSR framework)
- Modern SPA with API backend
</details>

---

### **6. What does "tree-shaking" mean in the context of component libraries?**

A) Removing dead branches from Git history
B) Only importing and bundling the components you actually use
C) Organizing components in a folder tree
D) Shaking the component tree to find bugs

<details>
<summary><strong>Answer</strong></summary>

**B) Only importing and bundling the components you actually use**

**Explanation:**

**The problem:**
```tsx
// ❌ BAD - Imports EVERYTHING (MUI = ~2MB!)
import * as Mui from '@mui/material';
```

**Tree-shaking solution:**
```tsx
// ✅ GOOD - Only imports Button (~10KB)
import { Button } from '@mui/material/Button';
```

**How it works:**

Modern bundlers (Webpack, Vite, Rollup) analyze your imports:

1. **Scan code** for import statements
2. **Build dependency graph** of what's used
3. **Remove unused code** ("shake dead branches")
4. **Bundle only used code**

**Real-world impact:**

**Without tree-shaking:**
```
Initial bundle: 2.5MB
Gzipped: 800KB
Load time: 4s on 3G
```

**With tree-shaking:**
```
Initial bundle: 200KB
Gzipped: 60KB
Load time: 0.8s on 3G
```

**How to enable:**

**1. Use per-component imports:**
```tsx
import { Button } from '@mui/material/Button';
import { TextField } from '@mui/material/TextField';
```

**2. Or configure Babel plugin:**
```js
// babel.config.js
{
  "plugins": [
    ["babel-plugin-import", {
      "libraryName": "@mui/material",
      "camel2DashComponentName": false
    }]
  ]
}
```

**3. Check your bundle:**
```bash
npm install --save-dev webpack-bundle-analyzer
```

**Critical for performance!** Especially with MUI and Ant Design.
</details>

---

### **7. How should you handle focus indicators when customizing components?**

A) Remove them with `outline: none` for cleaner design
B) Style them to match your brand, never remove them
C) Only show them for keyboard users, hide for mouse users
D) They're not important for modern UIs

<details>
<summary><strong>Answer</strong></summary>

**B) Style them to match your brand, never remove them**

**Explanation:**

**❌ NEVER do this:**
```css
button:focus {
  outline: none;  /* Breaks accessibility! */
}
```

**✅ DO THIS instead:**
```tsx
<Button
  sx={{
    '&:focus-visible': {
      outline: '2px solid',
      outlineColor: 'primary.main',
      outlineOffset: '2px',
    },
  }}
>
```

**Why focus indicators matter:**

1. **Keyboard navigation:**
   - 15-20% of users navigate with Tab key
   - Invisible focus = broken experience
   - Can't tell where you are

2. **Accessibility requirement:**
   - WCAG 2.1 requires visible focus
   - Legal requirement in many countries
   - Screen reader users benefit too

3. **Motor disability:**
   - Users who can't use mouse
   - Switch device users
   - Voice control users

**Option C is clever but...**
```css
:focus:not(:focus-visible) {
  outline: none;  /* Hide for mouse */
}
:focus-visible {
  outline: 2px solid blue;  /* Show for keyboard */
}
```

This works but **simple is better:**
- Just style the outline nicely
- Don't overcomplicate
- Test with keyboard

**Real-world styling:**
```tsx
// Material UI
theme.components.MuiButton.styleOverrides.root = {
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: theme.palette.primary.light,
    outlineOffset: '2px',
  },
};

// Chakra UI
const Button = defineStyleConfig({
  baseStyle: {
    _focusVisible: {
      boxShadow: '0 0 0 3px',
      boxShadowColor: 'blue.200',
    },
  },
});
```

**Test it:** Tab through your UI. Can you always see where you are?
</details>

---

### **8. What is the primary use case for Ant Design?**

A) Marketing landing pages
B) E-commerce product pages
C) Admin panels and data-heavy dashboards
D) Portfolio websites

<details>
<summary><strong>Answer</strong></summary>

**C) Admin panels and data-heavy dashboards**

**Explanation:**

**Ant Design excels at:**

**1. Data Tables:**
```tsx
<Table
  columns={columns}
  dataSource={data}
  pagination={{ pageSize: 50 }}
  sorter
  filters
  expandable
  rowSelection
/>
```
- Built-in sorting, filtering, pagination
- Virtual scrolling for 10,000+ rows
- Row selection, expansion, actions
- Best table component of any library

**2. Complex Forms:**
```tsx
<Form
  layout="vertical"
  form={form}
  onFinish={onSubmit}
>
  {/* Rich validation, async rules, field arrays */}
  <Form.Item name="email" rules={[...]}>
    <Input />
  </Form.Item>
</Form>
```
- Powerful validation engine
- Async validation
- Dynamic fields
- Form arrays

**3. Enterprise Features:**
- Advanced date pickers (ranges, presets)
- Upload components with progress
- Tree select (hierarchical data)
- Transfer lists
- Steps/wizard components

**Real-world Ant Design users:**
- Alibaba (creators)
- Tencent
- Baidu
- Internal business tools
- Admin dashboards
- CRM systems

**Why NOT Ant Design for:**

**A) Marketing pages:**
- Too heavy (~300KB)
- Opinionated design
- Generic look
- Use custom CSS or Bootstrap

**B) E-commerce:**
- Product pages need unique design
- Ant Design too "admin-y"
- Use Tailwind or custom

**D) Portfolios:**
- Need unique, creative design
- Ant Design too corporate
- Build custom

**Perfect fit:**
```
✅ Internal tools
✅ Dashboards
✅ Admin panels
✅ Data management apps
✅ Enterprise software
```
</details>

---

### **9. How do you avoid the "library look" in your application?**

A) Use multiple component libraries together
B) Deep theme customization + custom component wrappers
C) Remove all library components and build from scratch
D) Use only inline styles

<details>
<summary><strong>Answer</strong></summary>

**B) Deep theme customization + custom component wrappers**

**Explanation:**

**The 5-strategy approach:**

**1. Deep Theme Customization:**
```tsx
// ❌ Minimal (still looks like MUI)
const theme = createTheme({
  palette: { primary: { main: '#your-color' } }
});

// ✅ Deep (unique look)
const theme = createTheme({
  palette: { /* all colors */ },
  typography: {
    fontFamily: 'Your-Unique-Font',
    h1: { /* custom */ },
    // ... all variants
  },
  shape: { borderRadius: 20 },  // Unique!
  shadows: [ /* custom shadows */ ],
  components: {
    // Override EVERY component you use
  },
});
```

**2. Custom Component Wrappers:**
```tsx
// Wrap library components with your API
export function Button({ variant = 'primary', ...props }) {
  const variantMap = {
    primary: { color: 'primary', variant: 'contained' },
    secondary: { color: 'secondary', variant: 'outlined' },
  };

  return <MuiButton {...variantMap[variant]} {...props} />;
}
```

**3. Unique Visual Elements:**
- Custom illustrations (not stock)
- Unique color combinations
- Custom icons
- Distinctive typography
- Brand personality

**4. Strategic Custom Components:**
- Use library for: tables, modals, forms (complex)
- Build custom for: hero, product cards (unique)

**5. Sync Design Tokens:**
```js
// Single source of truth
export const tokens = {
  colors: { primary: '#3b82f6' },
  spacing: { unit: 8 },
};

// Use in MUI theme AND Tailwind config
```

**❌ Why other options fail:**

**A) Multiple libraries:**
- Conflicts, huge bundle
- Inconsistent patterns
- Maintenance nightmare

**C) Build from scratch:**
- Defeats the purpose
- Lose accessibility
- Reinvent the wheel

**D) Inline styles:**
- Unmaintainable
- No consistency
- Performance issues

**Real-world example:**

**Stripe** uses custom-built components but they:
- Look unique (brand colors, typography, spacing)
- Work like library components (accessible, tested)
- Have consistent API (design system)

You can achieve similar with **deep customization**, not abandonment!
</details>

---

### **10. What is the recommended approach for mixing Tailwind with a component library?**

A) Never mix them—choose one or the other
B) Use library for components, Tailwind for layout and page composition
C) Use Tailwind for everything and ignore the library
D) Only use the library's styling system

<details>
<summary><strong>Answer</strong></summary>

**B) Use library for components, Tailwind for layout and page composition**

**Explanation:**

**The hybrid pattern works great:**

```tsx
import { Button, TextField } from '@mui/material';

function LoginForm() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* ↑ Tailwind for layout and page styling */}

      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        {/* ↑ Tailwind for typography */}
        Log In
      </h1>

      <div className="space-y-4">
        {/* ↑ Tailwind for spacing */}

        <TextField label="Email" fullWidth />
        {/* ↑ MUI component for form input */}

        <TextField label="Password" type="password" fullWidth />

        <Button variant="contained" className="w-full">
          {/* ↑ MUI component + Tailwind utility */}
          Sign In
        </Button>
      </div>
    </div>
  );
}
```

**Why this works:**

**Library for:**
- ✅ Interactive components (buttons, inputs, modals)
- ✅ Complex components (tables, date pickers)
- ✅ Accessibility-critical components
- ✅ Forms with validation

**Tailwind for:**
- ✅ Layout (flex, grid, max-width, margins)
- ✅ Spacing between components
- ✅ Page-level styling
- ✅ Responsive design
- ✅ One-off customizations

**Share design tokens:**
```js
// tokens.js
export const tokens = {
  colors: { primary: '#3b82f6' },
  spacing: { unit: 8 },
};

// MUI theme
const muiTheme = createTheme({
  palette: { primary: { main: tokens.colors.primary } },
});

// Tailwind config
module.exports = {
  theme: {
    extend: {
      colors: { primary: tokens.colors.primary },
    },
  },
};
```

**Real-world pattern:**
```
/dashboard (admin) → MUI + Tailwind
  - Forms, tables → MUI
  - Layout, spacing → Tailwind

/marketing (public) → Pure Tailwind
  - Full custom design
```

**❌ Why NOT to:**

**Mix two component libraries:**
```tsx
<MuiButton>  {/* ❌ */}
<ChakraButton>  {/* ❌ Conflicts! */}
```

**Use only library styling:**
```tsx
<Box sx={{ display: 'flex', justifyContent: 'center' }}>
  {/* ❌ Verbose, could be Tailwind */}
</Box>
```

**Best practice:** Library for components, Tailwind for everything else.
</details>

---

### **11. Which statement about component library bundle sizes is TRUE?**

A) Bootstrap is the largest library
B) Tree-shaking can reduce MUI bundle by 90%
C) All libraries are exactly the same size
D) Bundle size doesn't matter in modern web apps

<details>
<summary><strong>Answer</strong></summary>

**B) Tree-shaking can reduce MUI bundle by 90%**

**Explanation:**

**Without tree-shaking:**
```tsx
import * as Mui from '@mui/material';
// Bundle: ~2MB
// Gzipped: ~600KB
```

**With proper tree-shaking:**
```tsx
import { Button } from '@mui/material/Button';
import { TextField } from '@mui/material/TextField';
// Bundle: ~200KB (90% reduction!)
// Gzipped: ~60KB
```

**Library sizes (with tree-shaking):**
- Bootstrap: ~130KB ← Smallest
- Chakra UI: ~150KB
- Material UI: ~200KB
- Ant Design: ~300KB ← Largest

**Why A is wrong:**
Bootstrap is actually the smallest! It's just CSS + minimal JS.

**Why C is wrong:**
Sizes vary significantly (130KB to 300KB).

**Why D is wrong:**
Bundle size always matters:
- **Mobile users:** Limited data plans
- **Slow networks:** 3G/4G in many regions
- **Performance:** LCP, TTI, CLS metrics
- **SEO:** Google considers page speed
- **User experience:** Fast = better

**Real-world impact:**

**Large bundle (500KB):**
- 3G load time: 6-8 seconds
- Mobile data: ~0.5MB per page
- Bounce rate: Higher

**Small bundle (100KB):**
- 3G load time: 1-2 seconds
- Mobile data: ~0.1MB per page
- Bounce rate: Lower

**How to optimize:**

1. **Tree-shaking** (import only what you use)
2. **Code splitting** (load tables only when needed)
3. **Lazy loading** (dynamic imports)
4. **Bundle analysis** (find what's big)

```bash
npm install --save-dev webpack-bundle-analyzer
# Run build
# Opens visualization of your bundle
```

**Target sizes:**
- Small app: < 200KB
- Medium app: < 500KB
- Large app: < 1MB
</details>

---

### **12. What is the `sx` prop in Material UI used for?**

A) To add accessibility attributes
B) For one-off, theme-aware styling
C) To define component sizes
D) For TypeScript type checking

<details>
<summary><strong>Answer</strong></summary>

**B) For one-off, theme-aware styling**

**Explanation:**

The `sx` prop is MUI's **shorthand** for theme-aware styling:

```tsx
<Button
  sx={{
    px: 4,               // padding-x: theme.spacing(4) = 32px
    py: 2,               // padding-y: theme.spacing(2) = 16px
    bgcolor: 'primary.main',  // theme.palette.primary.main
    color: 'primary.contrastText',
    borderRadius: 3,     // theme.spacing(3) = 24px
    '&:hover': {
      bgcolor: 'primary.dark',
    },
  }}
>
  Styled Button
</Button>
```

**Why it's useful:**

**1. References theme automatically:**
```tsx
sx={{ color: 'primary.main' }}
// ↓ Becomes:
color: theme.palette.primary.main
```

**2. Responsive values:**
```tsx
sx={{
  width: { xs: '100%', md: '50%' },  // Mobile → Desktop
  p: [2, 4, 6],  // 16px → 32px → 48px
}}
```

**3. Pseudo-selectors:**
```tsx
sx={{
  '&:hover': { bgcolor: 'grey.100' },
  '&:focus': { outline: '2px solid' },
  '& > *': { marginBottom: 2 },  // Direct children
}}
```

**When to use `sx`:**
- ✅ One-off customizations
- ✅ Component-specific styling
- ✅ Quick prototyping

**When NOT to use `sx`:**
- ❌ Repeated patterns (use theme overrides)
- ❌ Every component (defeats theme purpose)
- ❌ Complex styling (create custom component)

**Best practices:**

**1. Use theme first:**
```tsx
// ✅ Define in theme
theme.components.MuiButton.styleOverrides.root = {
  borderRadius: 12,
};

// Use everywhere
<Button>Styled</Button>
```

**2. Use `sx` for exceptions:**
```tsx
// ✅ One-off wider button
<Button sx={{ width: '100%' }}>Full Width</Button>
```

**3. Don't overuse:**
```tsx
// ❌ BAD - Should be in theme
<Button sx={{ borderRadius: 12, textTransform: 'none', fontWeight: 600 }}>
<Button sx={{ borderRadius: 12, textTransform: 'none', fontWeight: 600 }}>
<Button sx={{ borderRadius: 12, textTransform: 'none', fontWeight: 600 }}>
```

**Performance note:** `sx` is compiled at runtime, so it's slightly slower than theme styles. For repeated styles, use theme!
</details>

---

### **13. Which library has the best developer experience for style props?**

A) Bootstrap
B) Material UI
C) Chakra UI
D) Ant Design

<details>
<summary><strong>Answer</strong></summary>

**C) Chakra UI**

**Explanation:**

Chakra UI was **designed** for amazing developer experience:

**Chakra's style props:**
```tsx
<Box
  p={4}                    // padding: 1rem
  m={2}                    // margin: 0.5rem
  bg="blue.500"            // background: theme.colors.blue[500]
  color="white"            // color: white
  borderRadius="lg"        // borderRadius: theme.radii.lg
  boxShadow="md"           // boxShadow: theme.shadows.md
  _hover={{ bg: "blue.600" }}  // &:hover
  _focus={{ ring: 2 }}     // &:focus
>
  Content
</Box>
```

**Why it's the best:**

**1. Intuitive naming:**
```tsx
p={4}        // padding
px={4}       // padding-left and padding-right
py={2}       // padding-top and padding-bottom
m={2}        // margin
bg="blue"    // background
```

**2. References theme automatically:**
Every prop maps to your design tokens—no manual lookups!

**3. Responsive out of the box:**
```tsx
<Box
  width={{ base: "100%", md: "50%", lg: "25%" }}
  p={[2, 4, 6]}  // Mobile → Tablet → Desktop
>
```

**4. Pseudo-selectors as props:**
```tsx
<Button
  _hover={{ bg: "blue.600" }}
  _active={{ bg: "blue.700" }}
  _focus={{ ring: 2 }}
  _disabled={{ opacity: 0.5 }}
>
```

**5. No className juggling:**
```tsx
// ❌ Other libraries
<div className="p-4 bg-blue-500 hover:bg-blue-600">

// ✅ Chakra
<Box p={4} bg="blue.500" _hover={{ bg: "blue.600" }}>
```

**Comparison:**

**Material UI (`sx` prop):**
```tsx
<Box sx={{ p: 4, bgcolor: 'primary.main' }}>
```
- Good, but verbose
- Requires `sx` prop
- Less intuitive

**Bootstrap:**
```html
<div class="p-4 bg-primary">
```
- Class names, not props
- No theme reference
- Manual responsive

**Ant Design:**
```tsx
<div style={{ padding: 16, background: '#1890ff' }}>
```
- Mostly uses `style` prop
- No theme reference
- More verbose

**Developer happiness ranking:**
1. 🥇 **Chakra** - Best DX, fastest to write
2. 🥈 MUI - `sx` prop is good
3. 🥉 Ant Design - Style prop works
4. Bootstrap - Classes, not props

**Chakra's philosophy:** "Make it so easy, it feels like cheating!"
</details>

---

### **14. What is the primary risk of overusing `@apply` or custom CSS overrides with component libraries?**

A) Improved performance
B) Breaking accessibility and future updates
C) Better customization
D) Easier maintenance

<details>
<summary><strong>Answer</strong></summary>

**B) Breaking accessibility and future updates**

**Explanation:**

**The problem with deep CSS overrides:**

```css
/* ❌ DANGER ZONE */
.MuiButton-root {
  /* Override internal structure */
  padding: 10px 20px !important;
  background: blue !important;
  border: none !important;
}

.MuiButton-root:focus {
  outline: none !important;  /* Broke accessibility! */
}
```

**What you risk breaking:**

**1. Accessibility:**
```css
/* You might override */
.MuiButton-root:focus {
  outline: none;  /* ❌ Keyboard users can't see focus */
}

.MuiDialog-root {
  z-index: 100;  /* ❌ May break focus trap */
}
```

**2. Future updates:**
```css
/* MUI updates internal classes */
.MuiButton-label {  /* Deprecated in MUI v5! */
  font-size: 14px;
}
```
- Your overrides stop working
- Hard to debug
- Breaks on library updates

**3. Internal logic:**
```css
/* Override computed styles */
.MuiAutocomplete-popper {
  top: 0 !important;  /* ❌ Breaks positioning logic */
}
```

**4. Theme system:**
```css
/* Bypass theme entirely */
.MuiButton-root {
  background: blue;  /* ❌ Ignores theme.palette.primary */
}
```

**✅ SAFE customization:**

**Use official APIs:**
```tsx
// Material UI
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Safe! MUI maintains this API
          borderRadius: 12,
        },
      },
    },
  },
});

// Chakra UI
const Button = defineStyleConfig({
  baseStyle: {
    // Safe! Chakra maintains this API
    borderRadius: 'xl',
  },
});
```

**Why official APIs are safer:**
- ✅ Documented and maintained
- ✅ Won't break on updates
- ✅ Respect accessibility
- ✅ Work with theme
- ✅ TypeScript support

**When custom CSS is OK:**
```css
/* ✅ Scoped to your components */
.my-custom-wrapper .MuiButton-root {
  /* Safe: You control .my-custom-wrapper */
}
```

**Golden rule:** Use the library's customization APIs first, custom CSS as last resort!
</details>

---

### **15. For a data-heavy enterprise dashboard, which library is most recommended?**

A) Bootstrap
B) Chakra UI
C) Ant Design
D) No library, build custom

<details>
<summary><strong>Answer</strong></summary>

**C) Ant Design**

**Explanation:**

**Why Ant Design wins for enterprise dashboards:**

**1. Best-in-class data tables:**
```tsx
<Table
  columns={columns}
  dataSource={data}
  pagination={{ pageSizeOptions: [10, 25, 50, 100] }}
  sorter
  filters
  expandable={{
    expandedRowRender: (record) => <DetailView />,
  }}
  rowSelection={{
    type: 'checkbox',
    onChange: (keys) => handleSelection(keys),
  }}
  virtual  // Virtual scrolling for 10,000+ rows
/>
```

Features out of the box:
- ✅ Sorting (client and server-side)
- ✅ Filtering (multiple types)
- ✅ Pagination
- ✅ Row selection
- ✅ Expandable rows
- ✅ Fixed headers/columns
- ✅ Virtual scrolling
- ✅ Export functionality

**2. Enterprise-grade forms:**
```tsx
<Form
  form={form}
  layout="vertical"
  onFinish={handleSubmit}
>
  <Form.Item
    name="username"
    rules={[
      { required: true },
      { min: 3, max: 20 },
      { validator: checkUsernameAvailable },  // Async validation
    ]}
  >
    <Input />
  </Form.Item>

  <Form.List name="addresses">
    {(fields, { add, remove }) => (
      // Dynamic field arrays
    )}
  </Form.List>
</Form>
```

**3. Enterprise components:**
- Transfer lists (move items between lists)
- Tree select (hierarchical data)
- Cascader (multi-level dropdown)
- Upload with progress
- Advanced date pickers
- Steps/wizard

**4. Built for business:**
- Used by Alibaba, Tencent, Baidu
- Internationalization built-in
- Design language for enterprise
- Extensive documentation

**Why not the others?**

**Bootstrap:**
- ❌ Basic table (no sorting, filtering)
- ❌ Not React-specific
- ❌ Limited enterprise components
- Best for: Marketing sites

**Chakra UI:**
- ❌ Basic table (build your own logic)
- ❌ Simpler component set
- ❌ Not enterprise-focused
- Best for: Modern SaaS, startups

**Build custom:**
- ❌ Reinvent complex components
- ❌ Handle edge cases
- ❌ Maintain forever
- ❌ Time-consuming

**Real-world scenario:**

**Dashboard needs:**
- Users table (1,000+ rows)
- Transactions table (10,000+ rows)
- Complex filters (date ranges, status, categories)
- Bulk actions (select multiple, perform action)
- Export to CSV/Excel
- Form with 20+ fields, validation

**With Ant Design:** 1-2 weeks
**With Chakra/MUI:** 3-4 weeks (build table features)
**With Bootstrap:** 4-6 weeks (build everything)
**Build custom:** 8-12 weeks

**Ant Design = velocity for enterprise data apps!**

**When to choose alternatives:**
- Marketing site → Bootstrap or Custom
- Modern SaaS → Chakra UI or MUI
- Simple CRUD → Chakra UI or MUI
- Need Material Design → MUI
</details>

---

## Scoring Guide

- **13-15 correct:** 🏆 **Component Library Expert!** You understand library selection deeply.
- **10-12 correct:** ⭐ **Strong grasp!** Review the questions you missed.
- **7-9 correct:** 📚 **Good foundation!** Practice more with exercises.
- **4-6 correct:** 🔄 **Re-read Chapter 6** and do the exercises.
- **0-3 correct:** 📖 **Start over** - These concepts are crucial!

---

## Key Takeaways

If you remember nothing else, remember these:

1. **Component libraries** = speed, accessibility, testing (tradeoff: learning curve, bundle size)

2. **Choose by use case:**
   - Data-heavy → Ant Design
   - Modern SaaS → Chakra UI or MUI
   - Traditional sites → Bootstrap
   - Material Design → MUI

3. **Customize through official APIs**, not deep CSS overrides

4. **Tree-shaking is critical** - import only what you use

5. **Don't break accessibility** when customizing (focus, ARIA, keyboard nav)

6. **Mix with Tailwind/Sass** - library for components, Tailwind for layout

7. **Bundle sizes matter:**
   - Bootstrap: ~130KB
   - Chakra: ~150KB
   - MUI: ~200KB
   - Ant Design: ~300KB

8. **Avoid "library look"** - deep theme customization + component wrappers

---

**Ready for Chapter 7 (CSS Methodologies)?** You'll learn how to organize and scale CSS systematically! 🚀
