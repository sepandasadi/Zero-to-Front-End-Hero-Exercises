# Component Library - Hints & Implementation Patterns

Common challenges and solutions for building your component library.

---

## 🎯 Challenge 1: CSS-Only Modal

### The Problem
Creating a modal that opens/closes without JavaScript.

### The Solution
Use the `:target` pseudo-class:

**HTML:**
```html
<!-- Trigger -->
<a href="#modal-demo" class="btn btn-primary">Open Modal</a>

<!-- Modal -->
<div id="modal-demo" class="modal">
  <div class="modal-overlay"></div>
  <div class="modal-content">
    <a href="#" class="modal-close">&times;</a>
    <h2>Modal Title</h2>
    <p>Modal content goes here.</p>
    <button class="btn btn-primary">Action</button>
  </div>
</div>
```

**CSS:**
```css
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  align-items: center;
  justify-content: center;
}

/* Show when targeted */
.modal:target {
  display: flex;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
}

.modal-content {
  position: relative;
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 1;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  line-height: 1;
  text-decoration: none;
  color: #666;
}
```

**How It Works:**
- Clicking link changes URL to `#modal-demo`
- `:target` matches the modal with that ID
- Close button links to `#` (removes hash)

---

## 🎯 Challenge 2: CSS-Only Tabs

### The Problem
Switching between tab content without JavaScript.

### The Solution
Use hidden radio buttons:

**HTML:**
```html
<div class="tabs">
  <!-- Radio Buttons (hidden) -->
  <input type="radio" name="tabs" id="tab1" class="tab-input" checked>
  <input type="radio" name="tabs" id="tab2" class="tab-input">
  <input type="radio" name="tabs" id="tab3" class="tab-input">

  <!-- Tab Navigation -->
  <div class="tab-nav">
    <label for="tab1" class="tab-label">Overview</label>
    <label for="tab2" class="tab-label">Features</label>
    <label for="tab3" class="tab-label">Pricing</label>
  </div>

  <!-- Tab Content -->
  <div class="tab-panels">
    <div class="tab-panel">
      <h3>Overview</h3>
      <p>Overview content...</p>
    </div>
    <div class="tab-panel">
      <h3>Features</h3>
      <p>Features content...</p>
    </div>
    <div class="tab-panel">
      <h3>Pricing</h3>
      <p>Pricing content...</p>
    </div>
  </div>
</div>
```

**CSS:**
```css
/* Hide radio buttons */
.tab-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

/* Tab navigation */
.tab-nav {
  display: flex;
  border-bottom: 2px solid #e5e7eb;
}

.tab-label {
  padding: 1rem 2rem;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: all 0.3s;
}

.tab-label:hover {
  background: #f9fafb;
}

/* Active tab styling */
#tab1:checked ~ .tab-nav label[for="tab1"],
#tab2:checked ~ .tab-nav label[for="tab2"],
#tab3:checked ~ .tab-nav label[for="tab3"] {
  border-bottom-color: #3b82f6;
  color: #3b82f6;
}

/* Hide all panels by default */
.tab-panel {
  display: none;
  padding: 2rem;
}

/* Show active panel */
#tab1:checked ~ .tab-panels .tab-panel:nth-child(1),
#tab2:checked ~ .tab-panels .tab-panel:nth-child(2),
#tab3:checked ~ .tab-panels .tab-panel:nth-child(3) {
  display: block;
}
```

---

## 🎯 Challenge 3: CSS-Only Accordion

### The Problem
Expandable/collapsible sections without JavaScript.

### The Solution
Use checkbox inputs:

**HTML:**
```html
<div class="accordion">
  <div class="accordion-item">
    <input type="checkbox" id="acc1" class="accordion-toggle">
    <label for="acc1" class="accordion-header">
      <span>What is included?</span>
      <span class="accordion-icon">+</span>
    </label>
    <div class="accordion-content">
      <p>All features are included in every plan.</p>
    </div>
  </div>
  <!-- More items... -->
</div>
```

**CSS:**
```css
.accordion-toggle {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f9fafb;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background 0.3s;
}

.accordion-header:hover {
  background: #f3f4f6;
}

.accordion-icon {
  font-size: 1.5rem;
  transition: transform 0.3s;
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}

/* Expanded state */
.accordion-toggle:checked ~ .accordion-content {
  max-height: 500px;
  padding: 1rem;
}

.accordion-toggle:checked ~ .accordion-header .accordion-icon {
  transform: rotate(45deg);
}
```

---

## 🎯 Challenge 4: CSS-Only Tooltips

### The Problem
Showing tooltips on hover without JavaScript.

### The Solution
Use `::before` or `::after` with `data-` attributes:

**HTML:**
```html
<button class="btn" data-tooltip="Save your changes">
  Save
</button>

<button class="btn" data-tooltip="Cancel and go back" data-tooltip-pos="bottom">
  Cancel
</button>
```

**CSS:**
```css
[data-tooltip] {
  position: relative;
}

[data-tooltip]::before {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  padding: 0.5rem 0.75rem;
  background: #1f2937;
  color: white;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

/* Arrow */
[data-tooltip]::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: #1f2937;
  opacity: 0;
  transition: opacity 0.3s;
}

/* Show on hover */
[data-tooltip]:hover::before,
[data-tooltip]:hover::after {
  opacity: 1;
}

/* Bottom tooltip */
[data-tooltip-pos="bottom"]::before {
  bottom: auto;
  top: 100%;
  transform: translateX(-50%) translateY(8px);
}

[data-tooltip-pos="bottom"]::after {
  bottom: auto;
  top: 100%;
  border-top-color: transparent;
  border-bottom-color: #1f2937;
}
```

---

## 🎯 Challenge 5: Button State Management

### The Problem
Creating interactive button states (hover, active, focus, disabled).

### The Solution

**HTML:**
```html
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary" disabled>Disabled</button>
```

**CSS:**
```css
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

/* Hover state */
.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Active state (clicking) */
.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Focus state (keyboard navigation) */
.btn-primary:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Disabled state */
.btn-primary:disabled,
.btn-primary.btn-disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-primary:disabled:hover {
  background: #9ca3af;
  transform: none;
}
```

---

## 🎯 Challenge 6: Form Validation Styling

### The Problem
Showing valid/invalid states visually.

### The Solution
Use `:valid` and `:invalid` pseudo-classes:

**HTML:**
```html
<div class="form-group">
  <label for="email" class="form-label">Email</label>
  <input
    type="email"
    id="email"
    class="form-input"
    required
    placeholder="your@email.com"
  >
  <span class="form-error">Please enter a valid email</span>
</div>
```

**CSS:**
```css
.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 2px solid #d1d5db;
  border-radius: 0.375rem;
  transition: border-color 0.15s;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Valid state - only show after user interaction */
.form-input:valid:not(:placeholder-shown) {
  border-color: #10b981;
}

/* Invalid state - only show after user interaction */
.form-input:invalid:not(:placeholder-shown) {
  border-color: #ef4444;
}

/* Error message - hidden by default */
.form-error {
  display: none;
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* Show error when invalid */
.form-input:invalid:not(:placeholder-shown) ~ .form-error {
  display: block;
}
```

---

## 🎯 Challenge 7: Responsive Navigation

### The Problem
Creating a nav that works on desktop and mobile.

### The Solution
Mobile-first with hamburger menu:

**HTML:**
```html
<nav class="nav">
  <a href="#" class="nav-brand">Brand</a>

  <input type="checkbox" id="nav-toggle" class="nav-toggle">
  <label for="nav-toggle" class="nav-hamburger">
    <span></span>
    <span></span>
    <span></span>
  </label>

  <ul class="nav-menu">
    <li><a href="#" class="nav-link">Home</a></li>
    <li><a href="#" class="nav-link">About</a></li>
    <li><a href="#" class="nav-link">Services</a></li>
    <li><a href="#" class="nav-link">Contact</a></li>
  </ul>
</nav>
```

**CSS:**
```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.nav-toggle {
  display: none;
}

.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
}

.nav-hamburger span {
  width: 25px;
  height: 3px;
  background: #1f2937;
  transition: all 0.3s;
}

/* Mobile styles */
@media (max-width: 768px) {
  .nav-hamburger {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 60px;
    left: -100%;
    width: 100%;
    background: white;
    flex-direction: column;
    padding: 1rem;
    transition: left 0.3s;
  }

  /* Show menu when checked */
  .nav-toggle:checked ~ .nav-menu {
    left: 0;
  }

  /* Animate hamburger to X */
  .nav-toggle:checked ~ .nav-hamburger span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .nav-toggle:checked ~ .nav-hamburger span:nth-child(2) {
    opacity: 0;
  }

  .nav-toggle:checked ~ .nav-hamburger span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
}

/* Desktop styles */
@media (min-width: 769px) {
  .nav-menu {
    display: flex;
    gap: 2rem;
  }
}
```

---

## 🎯 Challenge 8: Card Hover Effects

### The Problem
Creating smooth, professional card interactions.

### The Solution

**CSS:**
```css
.card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .card-img {
  transform: scale(1.05);
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.card-text {
  color: #6b7280;
  margin-bottom: 1rem;
}
```

---

## 🎯 Challenge 9: Loading Spinners (CSS Animations)

### The Problem
Creating animated loaders without images.

### The Solution

**HTML:**
```html
<div class="spinner"></div>
<div class="spinner spinner-dots"></div>
```

**CSS:**
```css
/* Spinning circle */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Bouncing dots */
.spinner-dots {
  width: auto;
  height: auto;
  border: none;
  display: flex;
  gap: 8px;
}

.spinner-dots::before,
.spinner-dots::after {
  content: '';
  width: 12px;
  height: 12px;
  background: #3b82f6;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
}

.spinner-dots::before {
  animation-delay: -0.32s;
}

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}
```

---

## 🎯 Challenge 10: Utility Classes System

### The Problem
Creating reusable helper classes.

### The Solution

**utilities.css:**
```css
/* Spacing Utilities */
.m-0 { margin: 0; }
.m-1 { margin: 0.25rem; }
.m-2 { margin: 0.5rem; }
.m-3 { margin: 0.75rem; }
.m-4 { margin: 1rem; }

.mt-4 { margin-top: 1rem; }
.mr-4 { margin-right: 1rem; }
.mb-4 { margin-bottom: 1rem; }
.ml-4 { margin-left: 1rem; }

/* Display */
.d-none { display: none; }
.d-block { display: block; }
.d-flex { display: flex; }
.d-grid { display: grid; }

/* Flexbox */
.flex-row { flex-direction: row; }
.flex-column { flex-direction: column; }
.justify-center { justify-content: center; }
.align-center { align-items: center; }
.gap-4 { gap: 1rem; }

/* Text */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.text-sm { font-size: 0.875rem; }
.text-base { font-size: 1rem; }
.text-lg { font-size: 1.125rem; }

/* Colors */
.text-primary { color: #3b82f6; }
.text-success { color: #10b981; }
.text-danger { color: #ef4444; }

.bg-primary { background: #3b82f6; }
.bg-gray-100 { background: #f3f4f6; }

/* Borders */
.border { border: 1px solid #e5e7eb; }
.border-0 { border: none; }
.rounded { border-radius: 0.375rem; }
.rounded-full { border-radius: 9999px; }

/* Shadows */
.shadow-sm { box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); }
.shadow { box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
.shadow-lg { box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); }
```

---

## 💡 General Tips

### Component Building:
1. **Start Simple** - Build basic version first
2. **Add Variants** - Then create different styles
3. **Test States** - Check hover, focus, active, disabled
4. **Document** - Write clear examples

### CSS Organization:
1. **Use Variables** - Makes theming easy
2. **Be Consistent** - Same naming throughout
3. **Comment Code** - Explain complex parts
4. **Keep Modular** - Each file independent

### Debugging:
1. **Check Specificity** - More specific rules win
2. **Use DevTools** - Inspect and experiment
3. **Test Responsive** - Check all breakpoints
4. **Validate Code** - Use W3C validators

---

**You've got this!** These patterns solve 90% of component challenges. Build systematically and test often! 🎨✨

