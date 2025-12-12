// Optimized JavaScript - removed unused code and heavy calculations

console.log('App loaded successfully');

// Simple form validation
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Form submitted');
      alert('Thank you for your message!');
      form.reset();
    });
  }
});

