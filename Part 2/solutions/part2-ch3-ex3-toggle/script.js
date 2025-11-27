const btn = document.getElementById('notifyToggle');
const status = document.getElementById('toggleStatus');

function updateStatus(pressed) {
  status.textContent = pressed ? 'Notifications are on.' : 'Notifications are off.';
}

function togglePressed() {
  const pressed = btn.getAttribute('aria-pressed') === 'true';
  btn.setAttribute('aria-pressed', String(!pressed));
  updateStatus(!pressed);
}

btn.addEventListener('click', togglePressed);
btn.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    togglePressed();
  }
});
