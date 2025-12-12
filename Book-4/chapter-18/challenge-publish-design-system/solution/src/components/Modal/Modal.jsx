import React, { useEffect, useRef } from 'react';
import './Modal.css';

/**
 * Modal Component
 * An accessible dialog component with focus management
 *
 * @component
 * @example
 * <Modal isOpen={isOpen} onClose={handleClose} title="Modal Title">
 *   <p>Modal content goes here</p>
 * </Modal>
 */
const Modal = ({
  isOpen = false,
  onClose,
  title,
  children,
  size = 'md',
  closeOnBackdrop = true,
  closeOnEsc = true,
  ...props
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Store previously focused element
      previousFocusRef.current = document.activeElement;

      // Focus modal
      modalRef.current?.focus();

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = '';

      // Restore focus
      previousFocusRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!closeOnEsc) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose, closeOnEsc]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div
        ref={modalRef}
        className={`modal modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        tabIndex={-1}
        {...props}
      >
        <div className="modal__header">
          {title && <h2 id="modal-title" className="modal__title">{title}</h2>}
          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

