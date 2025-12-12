# Exercise 3 Solution: Modal Component

Complete implementation of an accessible Modal component with focus trap, keyboard handling, and backdrop.

## 📁 Files

- `index.html` - Complete modal demo
- `components/modal.css` - Modal styles
- `components/modal.js` - Modal JavaScript functionality
- `components/button.css` - Button component (from Exercise 2)

## 🎨 Features Implemented

✅ Centered modal dialog
✅ Semi-transparent backdrop
✅ Focus trap (Tab cycles within modal)
✅ Escape key closes modal
✅ Backdrop click closes modal
✅ Body scroll prevention
✅ Smooth animations
✅ ARIA attributes
✅ Multiple size variants
✅ Fully keyboard accessible

## 🚀 Usage

```html
<!-- Trigger Button -->
<button class="btn btn--primary" onclick="modal.open()">
  Open Modal
</button>

<!-- Modal HTML -->
<div class="modal" id="myModal" role="dialog" aria-modal="true" hidden>
  <div class="modal__backdrop"></div>
  <div class="modal__dialog modal__dialog--medium">
    <div class="modal__header">
      <h2 class="modal__title">Modal Title</h2>
      <button class="modal__close" aria-label="Close">×</button>
    </div>
    <div class="modal__body">
      <p>Modal content...</p>
    </div>
    <div class="modal__footer">
      <button class="btn btn--ghost">Cancel</button>
      <button class="btn btn--primary">Confirm</button>
    </div>
  </div>
</div>
```

```javascript
// Initialize modal
const modal = new Modal(document.getElementById('myModal'));

// Open modal
modal.open();

// Close modal
modal.close();
```

## 🎓 Key Learnings

### Focus Trap
Traps keyboard focus within the modal when open:
- Tab cycles through focusable elements
- Shift+Tab cycles backward
- Focus returns to trigger on close

### Accessibility
- `role="dialog"` for screen readers
- `aria-modal="true"` indicates modal behavior
- `aria-labelledby` points to title
- Escape key closes modal
- Focus management

### Body Scroll Lock
Prevents scrolling the page behind the modal:
```javascript
document.body.style.overflow = 'hidden';
```

---

**Great work on building an accessible modal!** 🎨✨

