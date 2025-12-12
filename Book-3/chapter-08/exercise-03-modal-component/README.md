# Exercise 3: Modal Component (Composite Component) ⭐⭐

**Difficulty:** Intermediate-Advanced
**Time:** 2 hours
**Focus:** Building composite components from primitives, accessibility patterns

## 🎯 Learning Objectives

- Build a complex composite component using primitives
- Implement accessibility features (focus trap, keyboard handling, ARIA)
- Handle overlay/backdrop interactions
- Manage component state and animations
- Prevent body scroll when modal is open

---

## 📋 Requirements

Build a fully accessible Modal component that uses your Button component from Exercise 2.

### Features

**Visual:**
- Modal container (centered on screen)
- Backdrop/overlay (semi-transparent)
- Header with title
- Body content area
- Footer with actions (buttons)
- Close button (X icon)
- Smooth open/close animations

**Functionality:**
- Opens on trigger button click
- Closes on:
  - Close button click
  - Backdrop click
  - Escape key press
- Prevents body scroll when open
- Traps focus inside modal
- Returns focus to trigger button on close

**Accessibility:**
- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby` pointing to title
- `aria-describedby` pointing to description
- Focus trap (Tab cycles through modal elements only)
- Escape key closes modal
- Focus visible indicators

**Sizes:**
- `small` (400px max-width)
- `medium` (600px max-width) - default
- `large` (800px max-width)
- `fullscreen` (full viewport)

---

## 📁 File Structure

```
exercise-03-modal-component/
├── README.md
├── hints.md
├── starter/
│   ├── GETTING_STARTED.md
│   ├── components/
│   │   ├── button.css (from Exercise 2)
│   │   └── modal.css
│   └── index.html
└── solution/
    ├── README.md
    ├── components/
    │   ├── button.css
    │   ├── modal.css
    │   └── modal.js
    └── index.html
```

---

## 🚀 Getting Started

### Modal HTML Structure

```html
<!-- Trigger button -->
<button class="btn btn--primary" id="openModal">
  Open Modal
</button>

<!-- Modal (hidden by default) -->
<div class="modal" id="myModal" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>
  <!-- Backdrop -->
  <div class="modal__backdrop"></div>

  <!-- Modal dialog -->
  <div class="modal__dialog modal__dialog--medium">
    <!-- Header -->
    <div class="modal__header">
      <h2 id="modal-title" class="modal__title">Modal Title</h2>
      <button class="modal__close" aria-label="Close modal">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
    </div>

    <!-- Body -->
    <div class="modal__body">
      <p>Modal content goes here...</p>
    </div>

    <!-- Footer -->
    <div class="modal__footer">
      <button class="btn btn--ghost modal-cancel">Cancel</button>
      <button class="btn btn--primary modal-confirm">Confirm</button>
    </div>
  </div>
</div>
```

### JavaScript Functions Needed

```javascript
// Open modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden'; // Prevent body scroll
  trapFocus(modal);
}

// Close modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.setAttribute('hidden', '');
  document.body.style.overflow = ''; // Restore body scroll
}

// Focus trap
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  firstFocusable.focus();

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  });
}
```

---

## ✅ Acceptance Criteria

- [ ] Modal centers on screen
- [ ] Backdrop dims background
- [ ] Close button works (X icon)
- [ ] Escape key closes modal
- [ ] Backdrop click closes modal
- [ ] Body scroll prevented when open
- [ ] Focus trapped inside modal
- [ ] Tab cycles through modal elements only
- [ ] Focus returns to trigger on close
- [ ] Smooth animations (fade in/out)
- [ ] 3 size variants work (small, medium, large)
- [ ] Uses design tokens for all styling
- [ ] ARIA attributes present
- [ ] Keyboard accessible

---

## 💡 Tips

**Backdrop:**
```css
.modal__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
```

**Modal Dialog:**
```css
.modal__dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-2xl);
  z-index: 1001;
  max-height: 90vh;
  overflow-y: auto;
}
```

**Animation:**
```css
.modal[hidden] {
  display: none;
}

.modal {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

---

## 🏆 Bonus Challenges

**Bonus 1:** Add slide-in animation from bottom

**Bonus 2:** Support stacked modals (modal opens another modal)

**Bonus 3:** Add confirmation modal variant with icon

**Bonus 4:** Mobile-responsive (full screen on mobile)

**Bonus 5:** Support custom animations

---

**Good luck building your first composite component!** 🎨✨

