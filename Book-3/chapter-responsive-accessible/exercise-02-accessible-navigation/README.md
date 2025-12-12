# Exercise 2: Accessible Navigation ⭐⭐

## 🎯 Objective

Build a fully accessible, responsive navigation menu with hamburger toggle that works with keyboard, mouse, and screen readers.

## 📝 Instructions

Create a navigation system that's usable by everyone, following WCAG 2.1 guidelines.

### Requirements

1. **Responsive Navigation:**
   - Desktop: Horizontal menu
   - Mobile: Hamburger menu
   - Smooth transitions

2. **Accessibility Features:**
   - Proper ARIA attributes
   - Keyboard navigable (Tab, Enter, Escape)
   - Screen reader announcements
   - Focus management
   - Visible focus indicators

3. **Hamburger Menu:**
   - Toggle open/close
   - Close on Escape key
   - Close when clicking outside
   - Trap focus when open (mobile)
   - Announce state changes

4. **Semantic HTML:**
   - Use `<nav>` element
   - Use `<button>` for toggle
   - Proper heading hierarchy

## 🎯 Tasks

1. Create semantic HTML structure
2. Add proper ARIA attributes
3. Style for mobile and desktop
4. Implement hamburger toggle (JavaScript)
5. Add keyboard navigation
6. Add focus trap for mobile menu
7. Test with screen reader

## 🎁 Bonus Challenges

1. Add dropdown submenus
2. Implement mega menu
3. Add search in navigation
4. Sticky navigation on scroll
5. Highlight active page
6. Add breadcrumbs
7. Smooth scroll to sections
8. Add skip to main content link

## ✅ Success Criteria

- Can navigate with keyboard only (Tab, Shift+Tab, Enter, Escape)
- Screen reader announces menu state ("expanded", "collapsed")
- Focus visible at all times
- Mobile menu closes on Escape
- Focus trapped in mobile menu when open
- All interactive elements have ≥ 44px touch targets
- Passes WAVE accessibility check
- Works without JavaScript (progressive enhancement)

## ARIA Attributes Needed

```html
<button aria-expanded="false" aria-controls="menu">
<nav aria-label="Main navigation">
<ul role="list">
```

## ⏱️ Estimated Time

1.5-2 hours

## 💡 Tips

- Test with keyboard only (unplug mouse!)
- Test with screen reader (NVDA, VoiceOver)
- Use semantic HTML before adding ARIA
- Focus outline is required - make it visible!
- Hamburger button needs descriptive aria-label

## 📚 Key Concepts

- ARIA roles and attributes
- Keyboard navigation (Tab, Enter, Esc)
- Focus management
- Screen reader compatibility
- Semantic HTML
- Progressive enhancement

