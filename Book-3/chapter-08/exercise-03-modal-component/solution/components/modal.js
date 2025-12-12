/**
 * Modal Component - Complete Solution
 * Accessible modal dialog with focus trap, keyboard handling, and backdrop
 */

class Modal {
  constructor(modalElement) {
    this.modal = modalElement;
    this.backdrop = this.modal.querySelector('.modal__backdrop');
    this.closeBtn = this.modal.querySelector('.modal__close');
    this.previousFocus = null;
    this.focusTrap = null;

    this.init();
  }

  /**
   * Initialize event listeners
   */
  init() {
    // Close button click
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Backdrop click
    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => this.close());
    }

    // Escape key
    this.handleKeyDown = (e) => {
      if (e.key === 'Escape' && !this.modal.hasAttribute('hidden')) {
        this.close();
      }
    };
    document.addEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Open the modal
   */
  open() {
    // Store the element that triggered the modal
    this.previousFocus = document.activeElement;

    // Show the modal
    this.modal.removeAttribute('hidden');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Set up focus trap
    this.setupFocusTrap();

    // Focus first focusable element
    const firstFocusable = this.getFocusableElements()[0];
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  /**
   * Close the modal
   */
  close() {
    // Hide the modal
    this.modal.setAttribute('hidden', '');

    // Restore body scroll
    document.body.style.overflow = '';

    // Remove focus trap
    if (this.focusTrap) {
      this.modal.removeEventListener('keydown', this.focusTrap);
      this.focusTrap = null;
    }

    // Return focus to trigger element
    if (this.previousFocus) {
      this.previousFocus.focus();
      this.previousFocus = null;
    }
  }

  /**
   * Set up focus trap
   */
  setupFocusTrap() {
    this.focusTrap = (e) => {
      if (e.key !== 'Tab') return;

      const focusableElements = this.getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift + Tab (backward)
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      }
      // Tab (forward)
      else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    this.modal.addEventListener('keydown', this.focusTrap);
  }

  /**
   * Get all focusable elements in the modal
   */
  getFocusableElements() {
    const selectors = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    return Array.from(this.modal.querySelectorAll(selectors));
  }

  /**
   * Destroy the modal (cleanup)
   */
  destroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
    if (this.focusTrap) {
      this.modal.removeEventListener('keydown', this.focusTrap);
    }
  }
}

// Export for use in modules (optional)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Modal;
}

