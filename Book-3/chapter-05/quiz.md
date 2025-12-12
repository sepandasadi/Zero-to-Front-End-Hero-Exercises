# Chapter 5: Utility-First CSS (Tailwind) - Quiz

## Instructions

- **15 multiple-choice questions**
- **Each question has one best answer**
- **Explanations provided after each answer**
- **Estimated time:** 20-30 minutes

Take this quiz after completing the chapter and exercises to test your Tailwind mastery!

---

## Questions

### **1. What is the fundamental difference between utility-first CSS and traditional CSS?**

A) Utility-first is faster
B) Utility-first composes single-purpose classes instead of writing custom component styles
C) Utility-first only works with React
D) Utility-first doesn't use CSS

<details>
<summary><strong>Answer</strong></summary>

**B) Utility-first composes single-purpose classes instead of writing custom component styles**

**Explanation:**

**Traditional (semantic classes):**
```html
<button class="btn btn--primary">Click</button>
```
```css
.btn { padding: 0.5rem 1rem; border-radius: 0.5rem; }
.btn--primary { background: #3b82f6; color: white; }
```

**Utility-first:**
```html
<button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
  Click
</button>
```

**Key difference:** You compose from pre-built, single-purpose utilities instead of writing custom CSS classes.

**Benefits:**
- No naming decisions
- Consistent design system
- Faster iteration
- Smaller CSS bundles
</details>

---

### **2. Why isn't Tailwind "just inline styles"?**

A) It is inline styles
B) Tailwind has variants (hover, responsive), design constraints, and can be purged
C) Tailwind is faster than inline styles
D) Inline styles are better

<details>
<summary><strong>Answer</strong></summary>

**B) Tailwind has variants (hover, responsive), design constraints, and can be purged**

**Explanation:**

**Inline styles:**
```html
<div style="padding: 16px; background: #3b82f6;">
  <!-- ❌ Can't use hover, focus, or responsive -->
  <!-- ❌ No design system constraints -->
  <!-- ❌ Can't be purged -->
  <!-- ❌ Specificity issues -->
</div>
```

**Tailwind utilities:**
```html
<div class="p-4 bg-blue-500 hover:bg-blue-600 md:p-6 dark:bg-blue-400">
  <!-- ✅ Variants work (hover, responsive, dark mode) -->
  <!-- ✅ Design system enforced (p-4 = 1rem from scale) -->
  <!-- ✅ Unused classes are purged -->
  <!-- ✅ Low, predictable specificity -->
</div>
```

**Tailwind is a constrained design system, not arbitrary values!**
</details>

---

### **3. What does the `content` array in `tailwind.config.js` do?**

A) Stores website content
B) Tells Tailwind which files to scan for class names
C) Configures content layout
D) Nothing, it's optional

<details>
<summary><strong>Answer</strong></summary>

**B) Tells Tailwind which files to scan for class names**

**Explanation:**

```js
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // ...
}
```

**JIT (Just-In-Time) mode scans these files** and generates ONLY the utility classes you actually use!

**Why this matters:**
- Development: Fast builds, small CSS file
- Production: Only ships used classes (~5-15KB)
- No manual purging needed

**If you don't configure `content` correctly:**
- Classes won't be generated
- Your styles won't work
- Build will fail

**Always include all template files!**
</details>

---

### **4. How do you apply styles only on tablet and larger screens?**

A) `tablet:bg-blue-500`
B) `md:bg-blue-500`
C) `@media:bg-blue-500`
D) `responsive:bg-blue-500`

<details>
<summary><strong>Answer</strong></summary>

**B) `md:bg-blue-500`**

**Explanation:**

Tailwind's responsive prefixes:

```html
<div class="
  bg-red-500      <!-- Mobile (base): red -->
  md:bg-blue-500  <!-- Tablet (768px+): blue -->
  lg:bg-green-500 <!-- Desktop (1024px+): green -->
">
```

**Breakpoints:**
- `sm:` → 640px
- `md:` → 768px
- `lg:` → 1024px
- `xl:` → 1280px
- `2xl:` → 1536px

**Mobile-first approach:**
- Base styles = mobile
- `md:` = tablet and up
- `lg:` = desktop and up

**Customizable in config:**
```js
theme: {
  screens: {
    tablet: '768px',  // Now use tablet: prefix!
  }
}
```
</details>

---

### **5. What's wrong with this code?**

```jsx
const color = 'blue';
<div className={`bg-${color}-500`}>
```

A) Nothing, it's correct
B) Tailwind can't detect dynamically constructed class names
C) Should use inline styles instead
D) Missing quotes

<details>
<summary><strong>Answer</strong></summary>

**B) Tailwind can't detect dynamically constructed class names**

**Explanation:**

**❌ BROKEN (JIT can't see this):**
```jsx
const color = 'blue';
<div className={`bg-${color}-500`}>  // Won't work!
```

**Why?** Tailwind's JIT scans your source files for **complete class names** like `bg-blue-500`. It can't execute JavaScript to figure out dynamic strings.

**✅ FIX #1: Complete class names in object**
```jsx
const colors = {
  blue: 'bg-blue-500',
  red: 'bg-red-500',
  green: 'bg-green-500',
};
<div className={colors[color]}>
```

**✅ FIX #2: Safelist in config (if you really need dynamic)**
```js
// tailwind.config.js
safelist: [
  'bg-blue-500',
  'bg-red-500',
  'bg-green-500',
]
```

**Best practice:** Always use complete, statically analyzable class names!
</details>

---

### **6. When should you use `@apply` in Tailwind?**

A) For all components
B) Never
C) Only for true repetition (button base styles, etc.)
D) Only on Tuesdays

<details>
<summary><strong>Answer</strong></summary>

**C) Only for true repetition (button base styles, etc.)**

**Explanation:**

**❌ OVERUSE (defeats the purpose):**
```css
.card { @apply bg-white rounded-lg shadow p-4; }
.card-title { @apply text-xl font-bold mb-2; }
.card-body { @apply text-gray-600; }
/* You're just recreating BEM! */
```

**✅ APPROPRIATE USE:**
```css
@layer components {
  .btn {
    @apply inline-flex items-center gap-2 px-4 py-2 font-semibold rounded-lg transition;
  }
}
```

Then compose:
```html
<button class="btn bg-blue-500 text-white hover:bg-blue-600">
```

**Use `@apply` for:**
- Truly repeated base patterns
- Third-party component overrides
- Extracting complex, stable patterns

**Don't use `@apply` to:**
- Hide all utilities (defeats the point!)
- Create a parallel BEM system
- Avoid "ugly" HTML
</details>

---

### **7. How do you enable dark mode in Tailwind?**

A) It's automatic
B) Set `darkMode: 'class'` or `darkMode: 'media'` in config
C) Write custom CSS
D) Install a plugin

<details>
<summary><strong>Answer</strong></summary>

**B) Set `darkMode: 'class'` or `darkMode: 'media'` in config**

**Explanation:**

**Config:**
```js
// tailwind.config.js
export default {
  darkMode: 'class',  // or 'media'
  // ...
}
```

**Two strategies:**

**1. Class-based (most common):**
```js
darkMode: 'class'
```

Toggle by adding `dark` class to `<html>`:
```html
<html class="dark">  <!-- Enables dark mode -->
```

**2. System preference:**
```js
darkMode: 'media'
```

Automatically uses system `prefers-color-scheme`.

**Usage:**
```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Adapts to theme!
</div>
```

**Most apps use `class` mode** for manual toggle control.
</details>

---

### **8. What does the `group` variant do?**

A) Groups CSS files
B) Styles a child based on parent state
C) Creates component groups
D) Nothing, it's deprecated

<details>
<summary><strong>Answer</strong></summary>

**B) Styles a child based on parent state**

**Explanation:**

**Problem:** Want to change child styles when hovering parent?

```html
<!-- ❌ Can't do this with normal hover -->
<div class="hover:???">  <!-- How to change child? -->
  <p>I want to change when div is hovered</p>
</div>
```

**Solution: Group variant!**
```html
<div class="group p-4 rounded-lg hover:bg-blue-50 cursor-pointer">
  <h3 class="text-gray-900 group-hover:text-blue-600">
    Title changes on hover
  </h3>
  <p class="text-gray-600 group-hover:text-blue-500">
    I change too!
  </p>
  <svg class="opacity-0 group-hover:opacity-100">
    Arrow appears on hover
  </svg>
</div>
```

**When parent (`.group`) is hovered, all children with `group-hover:` apply their styles!**

**Also works with:**
- `group-focus:`
- `group-active:`
- `group-disabled:`

**Powerful for card hover effects!**
</details>

---

### **9. What's the purpose of the `extend` key in Tailwind config?**

A) Extends bundle size
B) Adds to default theme without replacing it
C) Required for all customization
D) Same as `theme`

<details>
<summary><strong>Answer</strong></summary>

**B) Adds to default theme without replacing it**

**Explanation:**

**❌ WITHOUT `extend` (replaces defaults):**
```js
theme: {
  colors: {
    primary: '#3b82f6',
    // Oops! Lost all default colors (red, green, blue-100, etc.)
  }
}
```

**✅ WITH `extend` (adds to defaults):**
```js
theme: {
  extend: {
    colors: {
      primary: '#3b82f6',
      // Keeps all defaults + adds 'primary'
    }
  }
}
```

**Use `extend` when:**
- Adding custom values
- Keeping Tailwind defaults
- Adding new utilities

**Replace `theme` directly when:**
- You want complete control
- Building a custom design system from scratch
- Don't need Tailwind's defaults

**99% of projects use `extend`!**
</details>

---

### **10. How do you reference CSS custom properties in Tailwind config?**

A) `primary: '$primary'`
B) `primary: 'var(--primary)'`
C) `primary: '--primary'`
D) You can't

<details>
<summary><strong>Answer</strong></summary>

**B) `primary: 'var(--primary)'`**

**Explanation:**

This enables the **hybrid approach** (Tailwind + CSS variables):

**Config:**
```js
theme: {
  extend: {
    colors: {
      primary: 'var(--color-primary)',
      surface: 'var(--color-surface)',
    }
  }
}
```

**CSS:**
```css
:root {
  --color-primary: #3b82f6;
  --color-surface: #ffffff;
}

[data-theme="dark"] {
  --color-primary: #60a5fa;
  --color-surface: #1f2937;
}
```

**Usage:**
```html
<div class="bg-surface text-primary">
  <!-- Automatically adapts to theme! -->
</div>
```

**Benefits:**
- Runtime theming (no rebuild)
- Multi-theme support
- Instant theme switching

**This is how professional apps handle theming!**
</details>

---

### **11. What's the typical production CSS bundle size with Tailwind + JIT?**

A) 500-1000 KB
B) 100-200 KB
C) 5-15 KB (gzipped)
D) Tailwind doesn't work in production

<details>
<summary><strong>Answer</strong></summary>

**C) 5-15 KB (gzipped)**

**Explanation:**

**Tailwind JIT mode (default in v3+):**
- Scans your templates
- Generates ONLY classes you actually use
- No manual purging needed

**Typical sizes:**
- Small app: ~5-8 KB gzipped
- Medium app: ~10-15 KB gzipped
- Large app: ~15-30 KB gzipped

**Compare to:**
- Unstyled Tailwind v2 (all utilities): ~3 MB
- Bootstrap: ~25 KB (minimal customization)
- Custom CSS (unoptimized): 50-200 KB

**Add 100 new components?** CSS size barely changes (only new utilities added)!

**This is why Tailwind is performance-friendly!** ⚡
</details>

---

### **12. When is `@apply` appropriate in Tailwind?**

A) For every component
B) For base button/input styles that are truly repeated
C) Never use it
D) Only in production

<details>
<summary><strong>Answer</strong></summary>

**B) For base button/input styles that are truly repeated**

**Explanation:**

**✅ GOOD USE:**
```css
@layer components {
  .btn {
    @apply inline-flex items-center gap-2 px-4 py-2 font-semibold rounded-lg transition duration-150 focus:outline-none focus:ring-2;
  }
}
```

**Why it's OK:**
- This pattern repeats 20+ times
- It's a stable, unchanging base
- Variants can still be composed

**Usage:**
```html
<button class="btn bg-blue-500 text-white hover:bg-blue-600">Primary</button>
<button class="btn bg-gray-200 text-gray-900 hover:bg-gray-300">Secondary</button>
```

**❌ BAD USE:**
```css
.product-card { @apply bg-white rounded-lg shadow-md p-6 hover:shadow-lg; }
.product-card-title { @apply text-xl font-bold text-gray-900 mb-2; }
.product-card-price { @apply text-2xl font-bold text-blue-600; }
/* You've recreated BEM! Defeating the purpose! */
```

**Rule:** Only `@apply` for base patterns that repeat frequently!
</details>

---

### **13. How should you handle component variants in Tailwind?**

A) Write custom CSS for each variant
B) Use `@apply` for everything
C) Create component wrappers with prop-based class names
D) Tailwind doesn't support variants

<details>
<summary><strong>Answer</strong></summary>

**C) Create component wrappers with prop-based class names**

**Explanation:**

**The professional pattern:**
```tsx
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

const variants = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  ghost: 'bg-transparent text-blue-500 hover:bg-blue-50',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center gap-2 font-semibold rounded-lg
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    />
  );
}
```

**Usage:**
```jsx
<Button variant="primary" size="lg">Submit</Button>
<Button variant="ghost">Cancel</Button>
```

**Benefits:**
- Clean, reusable API
- TypeScript safety
- Still uses Tailwind utilities (no custom CSS!)
- Easy to customize with `className` prop
</details>

---

### **14. What's the difference between `dark:` and `[data-theme="dark"]:`?**

A) They're the same
B) `dark:` is shorthand, `[data-theme="dark"]:` is an arbitrary variant
C) `dark:` doesn't work
D) One is for Vue, one for React

<details>
<summary><strong>Answer</strong></summary>

**B) `dark:` is shorthand, `[data-theme="dark"]:` is an arbitrary variant**

**Explanation:**

**Built-in `dark:` variant:**
```html
<div class="bg-white dark:bg-gray-900">
  <!-- Requires dark mode configured in config -->
</div>
```

**Arbitrary variant (custom selector):**
```html
<div class="bg-white [data-theme='dark']:bg-gray-900">
  <!-- Works with any attribute! -->
</div>
```

**When to use each:**

**`dark:`** - For standard light/dark theming
```js
// Config
darkMode: 'class'  // Looks for .dark class
```

**`[data-theme="X"]:`** - For multi-theme support
```html
<html data-theme="ocean">
```
```html
<div class="
  [data-theme='ocean']:bg-blue-900
  [data-theme='forest']:bg-green-900
  [data-theme='sunset']:bg-orange-900
">
```

**Arbitrary variants** let you target any selector!
</details>

---

### **15. What's the recommended approach for a Tailwind project?**

A) Use `@apply` for everything
B) Write custom CSS alongside Tailwind
C) Compose utilities in markup, extract to components when repetitive
D) Never use Tailwind classes directly

<details>
<summary><strong>Answer</strong></summary>

**C) Compose utilities in markup, extract to components when repetitive**

**Explanation:**

**The professional flow:**

**1. Start with direct composition:**
```jsx
<button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
  Click
</button>
```

**2. When repeated 5+ times, extract to component:**
```tsx
<Button variant="primary">Click</Button>
```

**3. For very stable patterns, consider `@apply`:**
```css
.btn { @apply px-4 py-2 rounded-lg font-semibold; }
```

**Avoid:**
- ❌ Using `@apply` for everything (kills utility-first benefits)
- ❌ Writing lots of custom CSS (why use Tailwind then?)
- ❌ Never extracting (leads to massive HTML)

**Balance:**
- Most styles → direct utilities
- Repeated patterns → component wrappers
- Very stable bases → `@apply` sparingly

**This is how companies like Shopify and GitHub use Tailwind!**
</details>

---

## Scoring Guide

- **13-15 correct:** 🏆 **Tailwind Expert!** You understand utility-first deeply.
- **10-12 correct:** ⭐ **Strong grasp!** Review the questions you missed.
- **7-9 correct:** 📚 **Good foundation!** Practice more with exercises.
- **4-6 correct:** 🔄 **Re-read Chapter 5** and do the exercises.
- **0-3 correct:** 📖 **Start over** - These concepts are crucial!

---

## Key Takeaways

If you remember nothing else, remember these:

1. **Utility-first = composition**, not inline styles

2. **JIT scans templates** - only generates classes you use

3. **Mobile-first responsive** - base styles = mobile, `md:` = tablet+

4. **Don't dynamically construct class names** - use complete strings

5. **Use `@apply` sparingly** - only for true repetition

6. **Component wrappers** - The professional pattern for variants

7. **Tailwind + CSS variables** - Perfect for multi-theme support

8. **It's OK to combine** Tailwind and Sass in the same project!

---

**Ready for Chapter 6 (Component Libraries)?** You'll learn when to use pre-built components instead of building from scratch! 🚀

