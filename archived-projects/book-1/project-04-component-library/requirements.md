# Component Library - Detailed Requirements

Build a comprehensive, reusable component library with HTML and CSS showcasing 15-20 professional UI components.

---

## 🎯 Project Goal

Create a well-documented component library that can be used across multiple projects, demonstrating mastery of modular CSS architecture, design systems, and professional development practices.

---

## 📋 Minimum Requirements (MVP)

### Must Have (15 Components Minimum):

**Basic Elements (4):**
1. Buttons - 5+ variants (primary, secondary, outline, danger, disabled)
2. Form Inputs - All types (text, email, password, select, checkbox, radio, textarea)
3. Typography - Complete system (h1-h6, paragraphs, lists, blockquotes)
4. Colors & Variables - Design system showcase

**UI Components (6):**
5. Cards - 3+ styles (basic, image, pricing)
6. Navigation Bar - Responsive with mobile menu
7. Alerts/Notifications - 4 types (success, warning, error, info)
8. Badges & Tags - Various styles
9. Progress Bars - Different states
10. Breadcrumbs - Navigation component

**Complex Components (5):**
11. Modal/Dialog - CSS-only
12. Tabs - CSS-only
13. Accordion - CSS-only
14. Tooltips - CSS-only
15. Pagination - Complete component

### Bonus Components (Optional):
16. Dropdown Menu - CSS-only
17. Image Gallery Grid
18. Loading Spinners - CSS animations
19. Footer Templates - 3+ layouts
20. Hero Sections - 3+ styles

---

## 📐 File Structure Required

```
component-library/
├── index.html              # Main showcase/documentation page
├── css/
│   ├── variables.css      # Design tokens (colors, spacing, etc.)
│   ├── reset.css          # CSS reset
│   ├── typography.css     # Text styles
│   ├── buttons.css        # Button components
│   ├── forms.css          # Form components
│   ├── cards.css          # Card components
│   ├── navigation.css     # Nav components
│   ├── alerts.css         # Alert components
│   ├── modals.css         # Modal components
│   ├── tabs.css           # Tab components
│   ├── accordion.css      # Accordion components
│   └── utilities.css      # Helper classes
└── README.md              # Library documentation
```

---

## 🎨 Design System Requirements

### CSS Variables (variables.css)

Must include complete design system:

```css
:root {
  /* Colors - Primary Palette */
  --color-primary: #3b82f6;
  --color-primary-light: #60a5fa;
  --color-primary-dark: #2563eb;

  /* Colors - Semantic */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  /* Colors - Neutrals */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  /* ... through gray-900 */

  /* Typography */
  --font-family-sans: system-ui, sans-serif;
  --font-family-serif: Georgia, serif;
  --font-family-mono: 'Courier New', monospace;

  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  /* ... through 4xl */

  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  /* ... through spacing-16 */

  /* Border Radius */
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 500ms ease;
}
```

---

## 📦 Component Specifications

### 1. Buttons (buttons.css)

**Required Variants:**
- `.btn-primary` - Main action button
- `.btn-secondary` - Secondary actions
- `.btn-outline` - Outlined style
- `.btn-danger` - Destructive actions
- `.btn-success` - Positive actions
- `.btn-disabled` or `:disabled` - Disabled state

**Size Modifiers:**
- `.btn-sm` - Small button
- `.btn-md` - Medium (default)
- `.btn-lg` - Large button
- `.btn-block` - Full width

**States Required:**
- Default
- Hover
- Active (click)
- Focus (keyboard navigation)
- Disabled

**Example Usage:**
```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-primary btn-lg">Large Primary</button>
<button class="btn btn-outline">Outline Button</button>
```

---

### 2. Form Inputs (forms.css)

**Required Input Types:**
- Text input
- Email input
- Password input
- Textarea
- Select dropdown
- Checkbox
- Radio buttons
- File input

**States Required:**
- Default
- Focus
- Valid (`:valid`)
- Invalid (`:invalid`)
- Disabled

**Form Layout Classes:**
- `.form-group` - Input wrapper
- `.form-label` - Label styling
- `.form-input` - Input styling
- `.form-error` - Error message
- `.form-help` - Help text

---

### 3. Cards (cards.css)

**Required Card Types:**
1. **Basic Card:**
   - Header (optional)
   - Body
   - Footer (optional)

2. **Image Card:**
   - Image at top
   - Content below
   - Actions at bottom

3. **Pricing Card:**
   - Title
   - Price
   - Features list
   - CTA button

**Card Modifiers:**
- `.card-shadow` - With shadow
- `.card-hover` - Hover effect
- `.card-outline` - Outlined border

---

### 4. Navigation (navigation.css)

**Required Features:**
- Logo/brand area
- Horizontal menu items
- Active state indicator
- Dropdown support (CSS-only)
- Mobile responsive (hamburger)
- Sticky/fixed option

**Classes:**
- `.nav` - Main nav container
- `.nav-brand` - Logo/brand
- `.nav-menu` - Menu list
- `.nav-item` - Menu item
- `.nav-link` - Link styling
- `.nav-active` - Active state

---

### 5. Alerts (alerts.css)

**Required Types:**
- Success (green)
- Warning (yellow)
- Error (red)
- Info (blue)

**Features:**
- Icon support
- Close button (X)
- With/without title
- Dismissible option

**Example:**
```html
<div class="alert alert-success">
  <span class="alert-icon">✓</span>
  <div class="alert-content">
    <strong>Success!</strong> Your action was completed.
  </div>
  <button class="alert-close">&times;</button>
</div>
```

---

### 6. Modal (modals.css)

**CSS-Only Modal Requirements:**
- Uses `:target` pseudo-class
- Overlay background
- Centered content box
- Close button
- Animated entrance

**Implementation:**
```html
<a href="#modal-example">Open Modal</a>

<div id="modal-example" class="modal">
  <div class="modal-overlay"></div>
  <div class="modal-content">
    <a href="#" class="modal-close">&times;</a>
    <h2>Modal Title</h2>
    <p>Modal content goes here...</p>
  </div>
</div>
```

**CSS Pattern:**
```css
.modal {
  display: none;
}

.modal:target {
  display: flex;
}
```

---

### 7. Tabs (tabs.css)

**CSS-Only Tabs Requirements:**
- Use hidden radio buttons
- Tab navigation
- Content panels
- Active state styling

**HTML Pattern:**
```html
<div class="tabs">
  <input type="radio" name="tabs" id="tab1" checked>
  <label for="tab1">Tab 1</label>

  <input type="radio" name="tabs" id="tab2">
  <label for="tab2">Tab 2</label>

  <div class="tab-content" id="content1">Content 1</div>
  <div class="tab-content" id="content2">Content 2</div>
</div>
```

---

### 8. Accordion (accordion.css)

**CSS-Only Accordion Requirements:**
- Use checkbox inputs
- Collapsible sections
- Smooth transitions
- Icon rotation

**HTML Pattern:**
```html
<div class="accordion-item">
  <input type="checkbox" id="acc1" class="accordion-toggle">
  <label for="acc1" class="accordion-header">
    <span>Section Title</span>
    <span class="accordion-icon">+</span>
  </label>
  <div class="accordion-content">
    <p>Section content...</p>
  </div>
</div>
```

---

### 9. Tooltips (tooltips.css)

**CSS-Only Tooltip Requirements:**
- Appears on hover
- Positioning (top, right, bottom, left)
- Arrow pointer
- Uses `data-tooltip` attribute

**Example:**
```html
<button class="btn" data-tooltip="This is a tooltip">
  Hover me
</button>
```

**CSS:**
```css
[data-tooltip] {
  position: relative;
}

[data-tooltip]::after {
  content: attr(data-tooltip);
  /* Positioning and styling */
}

[data-tooltip]:hover::after {
  opacity: 1;
}
```

---

## 📄 Documentation Page (index.html)

### Required Sections:

1. **Header**
   - Library name/logo
   - Version number
   - GitHub link
   - Navigation to sections

2. **Introduction**
   - Brief description
   - Installation instructions
   - Quick start guide

3. **Design System**
   - Color palette showcase
   - Typography scale
   - Spacing system
   - Border radius options

4. **Components** (One section per component)
   - Component name
   - Description
   - Live example
   - HTML code snippet
   - CSS classes available
   - Usage notes

5. **Footer**
   - Credits
   - License info
   - Links

### Documentation Format for Each Component:

```html
<section id="buttons" class="component-section">
  <h2>Buttons</h2>
  <p class="component-description">
    Flexible button component with multiple variants and sizes.
  </p>

  <!-- Live Example -->
  <div class="component-demo">
    <button class="btn btn-primary">Primary</button>
    <button class="btn btn-secondary">Secondary</button>
    <!-- More examples -->
  </div>

  <!-- Code Snippet -->
  <pre><code class="language-html">
&lt;button class="btn btn-primary"&gt;Primary&lt;/button&gt;
&lt;button class="btn btn-secondary"&gt;Secondary&lt;/button&gt;
  </code></pre>

  <!-- Usage Guide -->
  <div class="component-usage">
    <h3>Available Classes</h3>
    <ul>
      <li><code>.btn-primary</code> - Primary button</li>
      <li><code>.btn-secondary</code> - Secondary button</li>
      <!-- More classes -->
    </ul>
  </div>
</section>
```

---

## 🎨 Styling Requirements

### CSS Organization:
- One file per component type
- Variables in separate file
- Utilities in separate file
- Modular and importable

### Naming Convention:
Use BEM (Block Element Modifier) or similar:
- `.component` - Block
- `.component__element` - Element
- `.component--modifier` - Modifier

### Responsive Requirements:
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- All components work on mobile
- Navigation adapts to mobile

### Browser Support:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

---

## ♿ Accessibility Requirements

### Must Include:
- [ ] Semantic HTML elements
- [ ] ARIA labels where appropriate
- [ ] Keyboard navigation support
- [ ] Focus visible styles
- [ ] Color contrast (WCAG AA)
- [ ] Screen reader friendly
- [ ] Skip links on documentation page

### Focus States:
All interactive elements must have visible focus:
```css
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

## 📊 Testing Requirements

### Functionality Tests:
- [ ] All CSS-only components work
- [ ] Modals open and close
- [ ] Tabs switch content
- [ ] Accordions expand/collapse
- [ ] Forms validate
- [ ] Tooltips appear on hover

### Responsive Tests:
- [ ] Works at 320px width
- [ ] Works at 768px width
- [ ] Works at 1024px width
- [ ] Works at 1920px width
- [ ] Navigation adapts

### Accessibility Tests:
- [ ] Keyboard navigation works
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] Screen reader compatible

### Code Quality:
- [ ] HTML validates (W3C)
- [ ] CSS validates (W3C)
- [ ] No console errors
- [ ] Clean, organized code

---

## 📦 Deliverables Checklist

### Files:
- [ ] index.html - Complete documentation page
- [ ] css/variables.css - Design system
- [ ] css/reset.css - CSS reset
- [ ] css/typography.css - Text styles
- [ ] css/buttons.css - Button components
- [ ] css/forms.css - Form components
- [ ] css/cards.css - Card components
- [ ] css/navigation.css - Nav components
- [ ] css/alerts.css - Alert components
- [ ] css/modals.css - Modal components
- [ ] css/tabs.css - Tab components
- [ ] css/accordion.css - Accordion components
- [ ] css/utilities.css - Helper classes
- [ ] README.md - Setup and usage guide

### Quality:
- [ ] 15+ components implemented
- [ ] All components documented
- [ ] Code is modular and reusable
- [ ] Consistent design system
- [ ] Responsive on all devices
- [ ] Accessible (WCAG AA)
- [ ] Valid HTML/CSS
- [ ] Professional appearance

---

## 🎯 Success Criteria

### Minimum Pass (60/100):
- 15 components implemented
- Basic documentation
- Components work
- Mostly responsive

### Portfolio-Ready (85/100):
- 18+ components
- Complete documentation
- Professional design
- Fully responsive
- Good code organization
- Accessible

### Exceptional (95+/100):
- 20+ components
- Comprehensive documentation
- Unique design system
- Perfect responsive
- Excellent code quality
- Full accessibility
- Could be used in real projects

---

## 💡 Pro Tips

### Component Design:
1. **Start with Variables** - Define your entire system first
2. **Build Modular** - Each component works independently
3. **Think Reusability** - Components should work anywhere
4. **Document Everything** - Show all variants and options

### Code Organization:
1. **One Component Per File** - Easy to find and maintain
2. **Use CSS Variables** - Easy to theme and customize
3. **Comment Your Code** - Explain complex CSS
4. **Consistent Naming** - Use same convention throughout

### Testing:
1. **Test Early** - Check each component as you build
2. **Test Real Usage** - Try components in actual layouts
3. **Test All States** - Hover, focus, active, disabled
4. **Test Responsive** - Every breakpoint, every component

---

## 🚀 Bonus Challenges

Want to level up? Try:
- **Dark Mode** - Toggle between light/dark themes
- **Multiple Themes** - 3+ color themes
- **CSS Grid System** - 12-column responsive grid
- **Animation Library** - Reusable CSS animations
- **Print Styles** - Optimized for printing
- **RTL Support** - Right-to-left languages

---

**Target:** Build a component library you'd actually want to use in real projects!

This is the most advanced Book 1 project - make it count! 🎨✨

See `hints.md` for implementation patterns and `rubric.md` for evaluation criteria.

