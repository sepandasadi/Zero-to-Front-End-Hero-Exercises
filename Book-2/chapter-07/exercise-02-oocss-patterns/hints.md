# Exercise 02: OOCSS Patterns - Hints

## Overview

OOCSS (Object-Oriented CSS) has two main principles:
1. **Separate Structure from Skin** - Visual styles separate from structural styles
2. **Separate Container from Content** - Objects should look the same regardless of where they're placed

---

## Core OOCSS Patterns

### 1. The Media Object

The most famous OOCSS pattern - image on left, content on right.

```css
/* Structure - defines layout */
.media {
  display: flex;
  align-items: flex-start;
}

.media__image {
  margin-right: 1rem;
  flex-shrink: 0;
}

.media__body {
  flex: 1;
}

/* Skins - define appearance */
.media--small .media__image {
  width: 50px;
}

.media--large .media__image {
  width: 100px;
}
```

**HTML:**
```html
<div class="media media--small">
  <img src="avatar.jpg" class="media__image" alt="">
  <div class="media__body">
    <h3>Title</h3>
    <p>Content</p>
  </div>
</div>
```

---

### 2. The Box Object

Reusable container with consistent padding and optional borders/backgrounds.

```css
/* Structure */
.box {
  padding: 1.5rem;
}

/* Skins */
.box--bordered {
  border: 1px solid #ddd;
}

.box--shadowed {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.box--primary {
  background: #e3f2fd;
  border-color: #2196f3;
}

.box--danger {
  background: #ffebee;
  border-color: #f44336;
}
```

---

### 3. The Button System

Structure/skin separation for buttons:

```css
/* Structure - size and spacing */
.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

.btn--sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.btn--lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
}

/* Skins - colors and effects */
.btn--primary {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.btn--secondary {
  background: #6c757d;
  color: white;
  border-color: #6c757d;
}

.btn--outline {
  background: transparent;
  color: #007bff;
  border-color: #007bff;
}

/* State skins */
.btn--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

---

## Key OOCSS Principles

### 1. Avoid Location-Dependent Styles

**Bad:**
```css
#sidebar .widget {
  color: blue;
}

.header .widget {
  color: red;
}
```

**Good:**
```css
.widget {
  /* base styles */
}

.widget--primary {
  color: blue;
}

.widget--secondary {
  color: red;
}
```

### 2. Separate Structure from Skin

**Bad:**
```css
.button-blue {
  padding: 10px 20px;
  background: blue;
  color: white;
  border-radius: 4px;
}

.button-green {
  padding: 10px 20px;
  background: green;
  color: white;
  border-radius: 4px;
}
```

**Good:**
```css
/* Structure */
.button {
  padding: 10px 20px;
  border-radius: 4px;
}

/* Skins */
.button--blue {
  background: blue;
  color: white;
}

.button--green {
  background: green;
  color: white;
}
```

### 3. Use Classes, Avoid IDs

OOCSS objects should be reusable - use classes, not IDs.

### 4. Compose Objects

```html
<!-- Combine multiple objects -->
<div class="box box--bordered box--shadowed media media--large">
  <img src="..." class="media__image">
  <div class="media__body">
    Content
  </div>
</div>
```

---

## Exercise Implementation Tips

### Media Object Variations

```css
/* Reverse (image on right) */
.media--reverse {
  flex-direction: row-reverse;
}

.media--reverse .media__image {
  margin-right: 0;
  margin-left: 1rem;
}

/* Stacked (image on top) */
.media--stacked {
  flex-direction: column;
}

.media--stacked .media__image {
  margin-right: 0;
  margin-bottom: 1rem;
}

/* Centered */
.media--center {
  align-items: center;
}
```

### Box Object Variations

```css
.box--rounded {
  border-radius: 8px;
}

.box--success {
  background: #d4edda;
  border-color: #28a745;
  color: #155724;
}

.box--warning {
  background: #fff3cd;
  border-color: #ffc107;
  color: #856404;
}
```

---

## Common Patterns to Implement

1. **Media Object** - Image + content
2. **Box Object** - Reusable container
3. **Button System** - Sizes + colors
4. **Grid Object** - Flexible grid layout
5. **List Object** - Styled lists (inline, vertical, horizontal)

---

## Testing Your Implementation

Good OOCSS should allow:
```html
<!-- Mix and match easily -->
<button class="btn btn--lg btn--primary">Large Primary</button>
<button class="btn btn--sm btn--outline">Small Outline</button>

<!-- Compose objects -->
<div class="box box--rounded box--shadowed box--primary">
  <div class="media media--center">
    <!-- Content -->
  </div>
</div>

<!-- Reuse anywhere -->
<div class="sidebar">
  <div class="media media--small">...</div>
</div>

<div class="content">
  <div class="media media--small">...</div>
</div>
```

---

## Success Criteria

- [ ] Objects are reusable anywhere
- [ ] Structure separate from skin
- [ ] No location-dependent styles
- [ ] Easy to compose objects
- [ ] Consistent naming
- [ ] Minimal CSS duplication

Good luck building your OOCSS pattern library! 🎨

