// TODO: Add your JavaScript here










// SOLUTION (scroll down to see - try it yourself first!)


























/* SOLUTION:

const area = document.querySelector('.exercise-area');

// Create modal HTML
const modalHTML = `
  <button class="btn-primary" id="openModalBtn">Open Modal</button>

  <div class="modal-overlay" id="modalOverlay">
    <div class="modal" id="modal">
      <div class="modal-header">
        <h2>Welcome to the Modal!</h2>
        <button class="close-btn" id="closeBtn" aria-label="Close modal">&times;</button>
      </div>
      <div class="modal-body">
        <p>This modal demonstrates professional event handling:</p>
        <ul>
          <li>✅ Click the X button to close</li>
          <li>✅ Click outside the modal to close</li>
          <li>✅ Press Escape key to close</li>
          <li>✅ Smooth animations</li>
          <li>✅ Background scrolling prevented</li>
        </ul>
        <p><strong>Try all the different ways to close it!</strong></p>
      </div>
      <div class="modal-footer">
        <button class="btn-secondary" id="cancelBtn">Cancel</button>
        <button class="btn-primary" id="confirmBtn">Confirm</button>
      </div>
    </div>
  </div>
`;

area.innerHTML += modalHTML;

// Get elements
const openModalBtn = document.querySelector('#openModalBtn');
const modalOverlay = document.querySelector('#modalOverlay');
const modal = document.querySelector('#modal');
const closeBtn = document.querySelector('#closeBtn');
const cancelBtn = document.querySelector('#cancelBtn');
const confirmBtn = document.querySelector('#confirmBtn');

// Function to open modal
function openModal() {
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Function to close modal
function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
}

// Open modal when button is clicked
openModalBtn.addEventListener('click', openModal);

// Close modal with X button
closeBtn.addEventListener('click', closeModal);

// Close modal with Cancel button
cancelBtn.addEventListener('click', closeModal);

// Confirm button action
confirmBtn.addEventListener('click', () => {
  alert('✅ Confirmed! Modal will now close.');
  closeModal();
});

// Close modal when clicking outside (on overlay)
modalOverlay.addEventListener('click', (e) => {
  // Only close if clicking the overlay itself, not the modal content
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  // Only close if modal is open and Escape is pressed
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
  }
});

*/

