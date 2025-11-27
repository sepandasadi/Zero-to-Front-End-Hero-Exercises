# Exercise 3: Responsive Navigation

## 🎯 Objective

Build a fully responsive navigation bar that transforms from a horizontal menu on desktop to a mobile-friendly hamburger menu on smaller screens—all using CSS only!

## 📚 Concepts Practiced

- Responsive navigation patterns
- CSS-only hamburger menu (checkbox hack)
- Touch-friendly targets
- Flexbox layouts
- Smooth transitions
- Accessibility considerations

## 🎨 Design Requirements

### Mobile (< 768px)
- Logo on left, hamburger icon on right
- Menu hidden by default
- Click hamburger to reveal full-screen menu
- Touch-friendly targets (44px minimum)
- Smooth slide-in animation

### Desktop (768px+)
- Logo on left
- Horizontal navigation on right
- No hamburger icon
- Hover effects on menu items
- Sticky/fixed optional

## 📋 Instructions

### Step 1: HTML Structure

The key to a CSS-only hamburger menu is using a checkbox:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Navigation</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <a href="#" class="nav-logo">MyBrand</a>

      <!-- Checkbox for CSS-only toggle -->
      <input type="checkbox" id="nav-toggle" class="nav-toggle">

      <!-- Hamburger icon (label clicks checkbox) -->
      <label for="nav-toggle" class="nav-toggle-label">
        <span class="hamburger"></span>
      </label>

      <!-- Menu -->
      <ul class="nav-menu">
        <li class="nav-item"><a href="#home" class="nav-link">Home</a></li>
        <li class="nav-item"><a href="#about" class="nav-link">About</a></li>
        <li class="nav-item"><a href="#services" class="nav-link">Services</a></li>
        <li class="nav-item"><a href="#portfolio" class="nav-link">Portfolio</a></li>
        <li class="nav-item"><a href="#contact" class="nav-link">Contact</a></li>
      </ul>
    </div>
  </nav>

  <main>
    <section class="hero">
      <h1>Responsive Navigation Demo</h1>
      <p>Resize the browser or use DevTools to see the navigation adapt!</p>
    </section>
  </main>
</body>
</html>
```

### Step 2: Base Styles & Mobile

```css
/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
}

/* Navbar Container */
.navbar {
  background: #333;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  position: relative;
}

/* Logo */
.nav-logo {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 1001;
}

/* Hide checkbox (but keep it functional) */
.nav-toggle {
  display: none;
}

/* Hamburger Icon */
.nav-toggle-label {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 24px;
  cursor: pointer;
  z-index: 1001;
}

.hamburger,
.hamburger::before,
.hamburger::after {
  display: block;
  background: white;
  height: 3px;
  width: 100%;
  border-radius: 3px;
  transition: all 0.3s ease;
  position: relative;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
}

.hamburger::before {
  top: -8px;
}

.hamburger::after {
  top: 8px;
}

/* Mobile Menu (Hidden by Default) */
.nav-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: #333;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  /* Hidden off-screen */
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 1rem 2rem;
  /* Touch-friendly */
  min-height: 44px;
  display: flex;
  align-items: center;
}

/* When checkbox is checked, show menu */
.nav-toggle:checked ~ .nav-menu {
  transform: translateX(0);
}

/* Animate hamburger to X when open */
.nav-toggle:checked ~ .nav-toggle-label .hamburger {
  background: transparent;
}

.nav-toggle:checked ~ .nav-toggle-label .hamburger::before {
  transform: rotate(45deg);
  top: 0;
}

.nav-toggle:checked ~ .nav-toggle-label .hamburger::after {
  transform: rotate(-45deg);
  top: 0;
}
```

### Step 3: Desktop Styles (768px+)

```css
@media (min-width: 768px) {
  .nav-container {
    padding: 1rem 2rem;
  }

  /* Hide hamburger on desktop */
  .nav-toggle-label {
    display: none;
  }

  /* Show menu as horizontal */
  .nav-menu {
    position: static;
    flex-direction: row;
    justify-content: flex-end;
    width: auto;
    height: auto;
    background: transparent;
    transform: translateX(0);
    gap: 0;
  }

  .nav-link {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    transition: background 0.2s ease;
  }

  /* Hover effects on desktop */
  .nav-link:hover {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
}

/* Large desktop: Constrain width */
@media (min-width: 1200px) {
  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### Step 4: Add Active Link State

```css
.nav-link.active {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

/* Add this with JavaScript or use :target */
.nav-link:focus {
  outline: 2px solid white;
  outline-offset: 2px;
}
```

### Step 5: Accessibility Improvements

```css
/* Ensure hamburger is keyboard accessible */
.nav-toggle:focus ~ .nav-toggle-label {
  outline: 2px solid white;
  outline-offset: 4px;
}

/* Skip to content link (optional but recommended) */
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  background: #333;
  color: white;
  padding: 1rem;
  text-decoration: none;
}

.skip-link:focus {
  top: 0;
  z-index: 2000;
}
```

## ✅ Testing Checklist

### Functionality
- [ ] Hamburger icon appears on mobile (<768px)
- [ ] Click hamburger to open menu
- [ ] Click again to close menu
- [ ] Menu slides in smoothly
- [ ] Hamburger animates to X when open
- [ ] On desktop, menu is always visible horizontally
- [ ] No hamburger icon on desktop

### Accessibility
- [ ] Can tab to hamburger with keyboard
- [ ] Can activate hamburger with Enter/Space
- [ ] Can tab through menu items
- [ ] Focus states are visible
- [ ] Menu items have sufficient color contrast

### Touch Targets
- [ ] Hamburger is at least 44px tappable area
- [ ] Menu items are at least 44px tall on mobile

### Visual
- [ ] Smooth transitions
- [ ] No layout shifts
- [ ] Works at all intermediate sizes
- [ ] Hamburger animation is smooth

## 💡 Tips

1. **The Checkbox Hack**
   ```html
   <input type="checkbox" id="toggle">
   <label for="toggle">Click me</label>
   <div>Content controlled by checkbox</div>
   ```
   ```css
   input:checked ~ div {
     /* Styles when checked */
   }
   ```

2. **Touch-Friendly**
   - Hamburger should be 44px×44px minimum
   - Menu items should be tall enough to tap easily

3. **Smooth Animations**
   - Use `transform` (not `left`/`right`) for performance
   - Add `transition` for smooth effects

4. **Testing**
   - Test on real mobile devices if possible
   - Check keyboard navigation
   - Verify touch targets are large enough

## 🎯 Success Criteria

Your solution should:

✅ Show hamburger menu on mobile
✅ Show horizontal menu on desktop
✅ Use CSS-only toggle (checkbox hack)
✅ Have smooth animations
✅ Meet touch target size requirements (44px)
✅ Be keyboard accessible
✅ Have clear focus states
✅ Work at all screen sizes

## 🚀 Bonus Challenges

1. **Add dropdown submenus** for desktop
2. **Add menu overlay** (dim background) when mobile menu is open
3. **Close menu when clicking outside** (requires JavaScript)
4. **Add icons** to menu items
5. **Create a "priority+" navigation** that adapts based on available space
6. **Add search bar** that appears in menu on mobile

## 📚 Resources

- [The Checkbox Hack](https://css-tricks.com/the-checkbox-hack/)
- [Inclusive Components: Menu](https://inclusive-components.design/menus-menu-buttons/)
- [MDN: Hamburger Menu](https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_cookbook/Split_Navigation)

---

**Time Estimate:** 60-90 minutes

Build navigation that works everywhere! 🍔➡️📋

