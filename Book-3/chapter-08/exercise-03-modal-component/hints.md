# Exercise 3: Modal Component - Hints 💡

## Hint 1: Modal Positioning

Use fixed positioning to center the modal:

```css
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.modal__dialog {
  position: relative;
  z-index: 1;
  background: white;
  border-radius: var(--radius-lg);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-2xl);
}
```

## Hint 2: Hidden State

Use the `hidden` attribute:

```html
<div class="modal" hidden>...</div>
```

```css
.modal[hidden] {
  display: none;
}
```

## Hint 3: Focus Trap Implementation

```javascript
function setupFocusTrap(modal) {
  const focusableSelectors = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ');

  const focusableElements = modal.querySelectorAll(focusableSelectors);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  firstElement.focus();

  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}
```

## Hint 4: Prevent Body Scroll

```javascript
function openModal(modal) {
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
}
```

## Hint 5: Escape Key Handler

```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openModal = document.querySelector('.modal:not([hidden])');
    if (openModal) {
      closeModal(openModal);
    }
  }
});
```

## Hint 6: Complete Modal JavaScript

```javascript
class Modal {
  constructor(modalElement) {
    this.modal = modalElement;
    this.backdrop = this.modal.querySelector('.modal__backdrop');
    this.closeBtn = this.modal.querySelector('.modal__close');
    this.previousFocus = null;

    this.init();
  }

  init() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.backdrop.addEventListener('click', () => this.close());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.modal.hasAttribute('hidden')) {
        this.close();
      }
    });
  }

  open() {
    this.previousFocus = document.activeElement;
    this.modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    this.trapFocus();
  }

  close() {
    this.modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
  }

  trapFocus() {
    const focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    first.focus();

    this.modal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }
}

// Usage
const modal = new Modal(document.getElementById('myModal'));
document.getElementById('openBtn').addEventListener('click', () => modal.open());
```

**You've got this!** 🎨✨

