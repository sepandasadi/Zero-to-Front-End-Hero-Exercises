/**
 * Accessible Modal Dialog Component
 * Follows ARIA Authoring Practices Guide
 * https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 */

(function() {
  const openButton = document.getElementById('open-modal');
  const modal = document.getElementById('modal');
  const closeButton = document.getElementById('modal-close');
  const saveButton = document.getElementById('modal-save');

  let previousFocus = null;
  let focusableElements = [];
  let firstFocusable = null;
  let lastFocusable = null;

  // Open modal
  if (openButton) {
    openButton.addEventListener('click', openModal);
  }

  // Close modal
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  if (saveButton) {
    saveButton.addEventListener('click', () => {
      alert('Saved!');
      closeModal();
    });
  }

  // Close on overlay click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  function openModal() {
    // Store reference to element that had focus
    previousFocus = document.activeElement;

    // Show modal
    modal.removeAttribute('hidden');

    // Get all focusable elements in modal
    updateFocusableElements();

    // Focus first element
    if (firstFocusable) {
      firstFocusable.focus();
    }

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    // Hide modal
    modal.setAttribute('hidden', '');

    // Remove event listeners
    document.removeEventListener('keydown', handleKeyDown);

    // Restore body scroll
    document.body.style.overflow = '';

    // Return focus to trigger element
    if (previousFocus) {
      previousFocus.focus();
    }
  }

  function updateFocusableElements() {
    focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable = focusableElements[0];
    lastFocusable = focusableElements[focusableElements.length - 1];
  }

  function handleKeyDown(e) {
    // Close on Escape
    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    // Trap focus
    if (e.key === 'Tab') {
      trapFocus(e);
    }
  }

  function trapFocus(e) {
    if (focusableElements.length === 0) return;

    if (e.shiftKey) {
      // Shift + Tab: moving backwards
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      // Tab: moving forwards
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }
})();

