# Exercise 3: Keyboard Navigation Fix

**Difficulty**: ⭐⭐ Intermediate
**Time**: 25 minutes
**Concepts**: Keyboard accessibility, focus management, tab order, focus styles

---

## 🎯 Goal

Fix a website with broken keyboard navigation. You'll learn:
- How to make custom controls keyboard accessible
- How to provide visible focus indicators
- How to fix keyboard traps
- How to establish logical tab order
- How to handle interactive divs properly

---

## 📋 Instructions

### Step 1: Test the Broken Version

Open `starter/keyboard-issues.html` and:
1. **Unplug your mouse** (or don't use it!)
2. Press Tab to navigate
3. Try to use all features with only keyboard

**You'll encounter:**
- Elements you can't reach with Tab
- Invisible focus (can't see where you are)
- Keyboard traps (can't escape with keyboard)
- Div "buttons" that don't respond to Enter/Space
- Modals that don't manage focus

### Step 2: Fix Each Keyboard Issue

**For custom interactive elements:**
1. Replace `<div>` "buttons" with real `<button>` elements
2. Or add `tabindex="0"` + keyboard event handlers

**For focus visibility:**
1. Add visible focus styles to all interactive elements
2. Use `:focus` or `:focus-visible` in CSS
3. Never use `outline: none` without replacement!

**For modals:**
1. Move focus into modal when opened
2. Trap focus within modal (Tab cycles inside)
3. Return focus to trigger element when closed
4. Allow Escape key to close

### Step 3: Test Your Solution

**Keyboard-only test:**
1. Navigate entire page using only Tab/Shift+Tab
2. Can you reach everything?
3. Can you see where you are at all times?
4. Can you activate all interactive elements with Enter/Space?
5. Can you escape from all modals/overlays?

---

## ✅ Acceptance Criteria

Your keyboard-accessible version should:
- [ ] All interactive elements reachable with Tab
- [ ] Visible focus indicators on all interactive elements
- [ ] No keyboard traps (can always Tab away)
- [ ] Real `<button>` elements for all buttons
- [ ] Modal focus management (trap focus, return focus)
- [ ] Escape key closes modals
- [ ] Logical tab order
- [ ] Pass full keyboard navigation test

---

## 🧪 Testing Checklist

**The Keyboard Test (CRITICAL):**

1. **Navigation**: Tab through entire page—can you reach everything?
2. **Visibility**: Can you always see where you are?
3. **Activation**: Do Enter and Space activate buttons/links?
4. **Escape**: Can you close modals with Escape?
5. **Reverse**: Can you Shift+Tab backwards through everything?
6. **No Traps**: Can you Tab out of all components?

---

## 💡 Hints

**Focus styles pattern:**

```css
/* ✅ GOOD: Visible focus indicator */
button:focus,
a:focus {
  outline: 3px solid #4A90E2;
  outline-offset: 2px;
}

/* ✅ BETTER: Only show for keyboard (not mouse clicks) */
button:focus-visible {
  outline: 3px solid #4A90E2;
  outline-offset: 2px;
}

/* ❌ BAD: Removes focus indicator */
button:focus {
  outline: none; /* Don't do this! */
}
```

**Replace div buttons:**

```html
<!-- ❌ BAD: Not keyboard accessible -->
<div class="button" onclick="doSomething()">Click Me</div>

<!-- ✅ GOOD: Real button -->
<button type="button" onclick="doSomething()">Click Me</button>
```

**Modal focus management:**

```javascript
// When modal opens:
const modal = document.getElementById('modal');
const firstFocusable = modal.querySelector('button, a, input');
firstFocusable.focus();

// Trap focus inside modal
modal.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    // Cycle focus within modal
  }
  if (e.key === 'Escape') {
    closeModal();
  }
});
```

---

## 📚 Resources

- [WebAIM: Keyboard Accessibility](https://webaim.org/techniques/keyboard/)
- [MDN: :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
- [W3C: Focus Management](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)

---

## 🚀 Next Steps

Once you've fixed all keyboard issues:
1. Compare with `solution/keyboard-issues.html`
2. Move on to Exercise 4: Add ARIA Where Needed

Great job making the web keyboard-accessible! ⌨️

