/**
 * Accessible Alert/Toast Notification Component
 * Follows ARIA Authoring Practices Guide
 * https://www.w3.org/WAI/ARIA/apg/patterns/alert/
 */

// Make showAlert globally available
window.showAlert = function(type, message, duration = 5000) {
  const container = document.getElementById('alert-container');
  if (!container) return;

  // Create alert element
  const alert = document.createElement('div');
  alert.className = `alert ${type}`;

  // Set appropriate ARIA role based on severity
  if (type === 'error') {
    alert.setAttribute('role', 'alert'); // Urgent, interrupts screen reader
  } else {
    alert.setAttribute('role', 'status'); // Polite, waits for pause
  }

  alert.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
  alert.setAttribute('aria-atomic', 'true');

  // Create content
  const content = document.createElement('div');
  content.className = 'alert-content';
  content.textContent = message;

  // Create close button
  const closeButton = document.createElement('button');
  closeButton.className = 'alert-close';
  closeButton.setAttribute('aria-label', 'Close notification');
  closeButton.textContent = '×';

  closeButton.addEventListener('click', () => {
    removeAlert(alert);
  });

  // Append elements
  alert.appendChild(content);
  alert.appendChild(closeButton);
  container.appendChild(alert);

  // Auto-dismiss after duration
  if (duration > 0) {
    setTimeout(() => {
      removeAlert(alert);
    }, duration);
  }

  return alert;
};

function removeAlert(alert) {
  // Fade out animation
  alert.style.opacity = '0';
  alert.style.transform = 'translateX(400px)';
  alert.style.transition = 'all 0.3s ease-out';

  setTimeout(() => {
    if (alert.parentNode) {
      alert.parentNode.removeChild(alert);
    }
  }, 300);
}

// Example usage (for testing)
/*
showAlert('info', 'This is an informational message');
showAlert('success', 'Operation completed successfully!');
showAlert('warning', 'Please review before proceeding');
showAlert('error', 'Something went wrong', 0); // 0 = no auto-dismiss
*/

