# Exercise 4 Hints: Accessible Modal

## Modal HTML Structure

```html
<div
  id="modal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
  hidden
>
  <h2 id="modal-title">Modal Title</h2>
  <p id="modal-desc">Modal description</p>
  <button id="close">Close</button>
</div>
```

## Focus Trap

```javascript
const focusableElements = modal.querySelectorAll(
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
);

const firstElement = focusableElements[0];
const lastElement = focusableElements[focusableElements.length - 1];

modal.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
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
  }

  if (e.key === 'Escape') {
    closeModal();
  }
});
```

## Return Focus

```javascript
let previouslyFocused;

function openModal() {
  previouslyFocused = document.activeElement;
  modal.removeAttribute('hidden');
  firstElement.focus();
}

function closeModal() {
  modal.setAttribute('hidden', '');
  previouslyFocused.focus();
}
```

---

**Modal focus management is crucial!** 🎯

