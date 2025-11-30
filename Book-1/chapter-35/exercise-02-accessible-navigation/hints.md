# Exercise 2 Hints: Accessible Navigation

## ARIA Attributes

### aria-expanded
Tells screen readers if element is expanded or collapsed:
```html
<button aria-expanded="false">Menu</button>
```

### aria-controls
Links button to the element it controls:
```html
<button aria-controls="nav-menu">Menu</button>
<nav id="nav-menu"></nav>
```

### aria-label
Provides accessible name when text isn't visible:
```html
<button aria-label="Toggle navigation menu">
  <span class="icon"></span>
</button>
```

### aria-hidden
Hides element from screen readers:
```html
<nav aria-hidden="true"></nav>
```

## Complete Example

```html
<button
  id="hamburger"
  aria-label="Toggle navigation menu"
  aria-expanded="false"
  aria-controls="nav-menu"
>
  <!-- Icon -->
</button>

<nav aria-label="Main navigation">
  <ul id="nav-menu" role="list">
    <li><a href="#home">Home</a></li>
  </ul>
</nav>
```

## JavaScript Toggle

```javascript
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
let isOpen = false;

function toggleMenu() {
  isOpen = !isOpen;
  hamburger.setAttribute('aria-expanded', isOpen);
  nav.setAttribute('aria-hidden', !isOpen);
}

hamburger.addEventListener('click', toggleMenu);
```

## Keyboard Navigation

### Close on Escape

```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isOpen) {
    closeMenu();
    hamburger.focus(); // Return focus
  }
});
```

### Close on Outside Click

```javascript
document.addEventListener('click', (e) => {
  if (isOpen &&
      !nav.contains(e.target) &&
      !hamburger.contains(e.target)) {
    closeMenu();
  }
});
```

## Focus Trap

**Trap focus within mobile menu:**

```javascript
function trapFocus() {
  const focusableElements = nav.querySelectorAll(
    'a[href], button:not([disabled])'
  );

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  nav.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab: wrap to last
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab: wrap to first
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });
}
```

## Skip Link

**Hidden but accessible:**

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: white;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<main id="main-content">
  <!-- Content -->
</main>
```

## Responsive Navigation

**Mobile: Hamburger menu**
```css
/* Mobile */
.hamburger {
  display: flex;
}

nav {
  position: absolute;
  max-height: 0;
  overflow: hidden;
}

nav[aria-hidden="false"] {
  max-height: 500px;
}
```

**Desktop: Horizontal menu**
```css
@media (min-width: 768px) {
  .hamburger {
    display: none;
  }

  nav {
    position: static;
    max-height: none;
  }

  .nav-menu {
    display: flex;
  }
}
```

## Focus Styles

**Always visible:**
```css
a:focus,
button:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* Never do this! */
/* *:focus { outline: none; } */
```

## Testing

**Keyboard only:**
1. Unplug mouse
2. Tab to navigate
3. Enter to activate
4. Escape to close menu

**Screen reader:**
- Windows: NVDA (free)
- Mac: VoiceOver (Cmd+F5)
- Verify announcements

**Tools:**
- WAVE browser extension
- axe DevTools
- Lighthouse accessibility audit

---

**Accessibility is not optional - it's essential!** ♿

