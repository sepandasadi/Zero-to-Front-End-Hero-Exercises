# Challenge Project: Accessible Component Library

**Difficulty**: ⭐⭐⭐⭐ Expert
**Time**: 2-3 hours
**Goal**: Build a library of fully accessible, reusable UI components

---

## 🎯 Project Overview

Create a collection of 5 interactive UI components that are **fully accessible**—keyboard navigable, screen reader friendly, and WCAG 2.1 AA compliant.

**This is a capstone project** that combines everything you learned in Chapter 9. When you're done, you'll have real, production-quality accessible components you can use in any project!

---

## 📋 Required Components

Build these 5 components:

### 1. Accordion (Collapsible Sections)
- Multiple collapsible sections
- Click to expand/collapse
- Keyboard support (Enter/Space to toggle, Arrow keys to navigate)
- `aria-expanded` state management
- Only one section open at a time (optional mode)

### 2. Modal Dialog
- Opens on button click
- Traps focus inside modal
- Closes on Escape key
- Returns focus to trigger on close
- Background overlay
- `role="dialog"` and `aria-modal="true"`
- Proper labeling with `aria-labelledby`

### 3. Dropdown Menu
- Button trigger
- Opens/closes menu
- Keyboard navigation (Arrow keys, Escape, Tab)
- `aria-haspopup`, `aria-expanded`
- Auto-closes on outside click
- Visual focus indicators

### 4. Tabs Interface
- Multiple tabs with content panels
- Click to switch tabs
- Arrow key navigation between tabs
- Tab/Shift+Tab to move in/out of tablist
- `role="tablist"`, `role="tab"`, `role="tabpanel"`
- `aria-selected`, `aria-controls`, `aria-labelledby`

### 5. Alert/Toast Notifications
- Different severity levels (info, success, warning, error)
- Auto-dismiss option
- Manual close button
- `role="alert"` for urgent messages
- `role="status"` for non-urgent updates
- `aria-live` regions for dynamic announcements

---

## ✅ Requirements for Each Component

**Every component must:**

### Accessibility ✨
- [ ] Fully keyboard accessible (no mouse required)
- [ ] Proper ARIA attributes
- [ ] Screen reader tested and verified
- [ ] Focus management (where applicable)
- [ ] Visible focus indicators
- [ ] Semantic HTML structure
- [ ] Pass Lighthouse accessibility audit (100 score)

### Functionality 🎯
- [ ] Works in modern browsers (Chrome, Firefox, Safari, Edge)
- [ ] Handles edge cases gracefully
- [ ] Includes all interactions specified above
- [ ] No console errors or warnings

### Code Quality 💻
- [ ] Clean, readable code
- [ ] Commented where helpful
- [ ] Follows best practices
- [ ] Reusable (can be dropped into any project)

### Documentation 📚
- [ ] Usage instructions
- [ ] Keyboard shortcuts documented
- [ ] Accessibility features explained
- [ ] Code examples provided

---

## 📁 Project Structure

```
challenge-component-library/
├── index.html              # Demo page showing all components
├── styles.css              # Shared styles
├── components/
│   ├── accordion.js        # Accordion component
│   ├── modal.js            # Modal component
│   ├── dropdown.js         # Dropdown component
│   ├── tabs.js             # Tabs component
│   └── alert.js            # Alert component
├── README.md               # Project documentation
└── TESTING.md              # Testing checklist and results
```

---

## 💡 Implementation Tips

### Accordion Pattern

```html
<div class="accordion">
  <button
    class="accordion-header"
    aria-expanded="false"
    aria-controls="section1"
    id="header1"
  >
    Section 1
  </button>
  <div
    class="accordion-content"
    id="section1"
    aria-labelledby="header1"
    hidden
  >
    Content here
  </div>
</div>
```

### Modal Pattern

```javascript
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  previousFocus = document.activeElement;
  modal.removeAttribute('hidden');

  // Focus first interactive element
  const firstInput = modal.querySelector('button, input, select');
  firstInput.focus();

  // Trap focus
  modal.addEventListener('keydown', trapFocus);

  // Close on Escape
  document.addEventListener('keydown', handleEscape);
}
```

### Focus Trap Pattern

```javascript
function trapFocus(e) {
  if (e.key !== 'Tab') return;

  const focusable = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}
```

---

## 🧪 Testing Requirements

**For each component, test:**

### 1. Keyboard Navigation
- [ ] All functionality accessible via keyboard
- [ ] Logical tab order
- [ ] All shortcuts work as documented
- [ ] No keyboard traps

### 2. Screen Reader
- [ ] Test with VoiceOver (Mac) or NVDA (Windows)
- [ ] All content announced correctly
- [ ] States announced (expanded, selected, etc.)
- [ ] Instructions clear

### 3. Automated Testing
- [ ] Run Lighthouse accessibility audit
- [ ] Check with axe DevTools
- [ ] Validate HTML

### 4. Visual Testing
- [ ] Focus indicators visible
- [ ] Works at 200% zoom
- [ ] Responsive on mobile
- [ ] High contrast mode

### 5. Edge Cases
- [ ] Multiple instances on same page
- [ ] Rapid interactions
- [ ] Empty states
- [ ] Very long content

---

## 📚 Resources

**ARIA Authoring Practices:**
- [Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
- [Modal Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [Menu Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- [Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [Alert Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)

**Testing Tools:**
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## 🎯 Deliverables

1. **Working Demo Page** (`index.html`)
   - Shows all 5 components
   - Each component demonstrated with multiple examples
   - Instructions for keyboard usage

2. **Documentation** (`README.md`)
   - Overview of the library
   - Installation/usage instructions
   - Keyboard shortcuts for each component
   - Accessibility features documented
   - Browser compatibility

3. **Testing Report** (`TESTING.md`)
   - Testing checklist completed
   - Screen reader test results
   - Lighthouse scores
   - Known issues or limitations

4. **Source Code**
   - Clean, commented JavaScript
   - Reusable CSS
   - Semantic HTML

---

## 🏆 Bonus Challenges (Optional)

Want to go further? Try these:

- [ ] Add animation/transitions (ensure they respect `prefers-reduced-motion`)
- [ ] Create TypeScript versions
- [ ] Add unit tests (Jest)
- [ ] Create a build process (webpack/rollup)
- [ ] Publish to npm
- [ ] Add more components (tooltip, combobox, slider)
- [ ] Create a Storybook demo
- [ ] Add dark mode support
- [ ] Internationalization (i18n) support

---

## ✅ Completion Checklist

Mark off as you complete:

- [ ] Accordion component built and tested
- [ ] Modal component built and tested
- [ ] Dropdown component built and tested
- [ ] Tabs component built and tested
- [ ] Alert component built and tested
- [ ] Demo page created
- [ ] All components pass keyboard test
- [ ] All components pass screen reader test
- [ ] Lighthouse accessibility score 100 for all
- [ ] README.md completed
- [ ] TESTING.md completed
- [ ] Code reviewed and cleaned up

---

## 🎉 Congratulations!

When you complete this challenge, you will have:
- Built 5 production-quality accessible components
- Mastered ARIA patterns
- Tested with real assistive technologies
- Created something you can showcase in your portfolio
- Leveled up as a web developer!

**This is HARD.** Most senior developers haven't built accessible components from scratch. Take your time, test thoroughly, and be proud of your work!

You've got this! 🚀

---

## 📝 Notes

**Starter files** are provided in the `starter/` folder to help you get started. **Solution files** are in `solution/` for reference (but try building it yourself first!).

**Stuck?** Review Chapter 9, check the ARIA Authoring Practices Guide, or test with a screen reader to understand what's missing.

**Share your work!** When you complete this, you've built something impressive. Share it on GitHub, LinkedIn, or Twitter. Employers love to see accessibility-focused projects!

