// Form Validation with Regex - STARTER

// TODO: Define validation patterns
const patterns = {
  username: /^[a-zA-Z0-9_]{3,16}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  phone: /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,
  website: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/
};

// TODO: Get form elements
const form = document.getElementById('signup-form');
const inputs = {
  username: document.getElementById('username'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  phone: document.getElementById('phone'),
  website: document.getElementById('website')
};

// TODO: Validate function
function validate(input, pattern) {
  // Validate input against pattern
  // Show/hide validation icons
  // Show/hide error messages
}

// TODO: Add event listeners for real-time validation
Object.entries(inputs).forEach(([name, input]) => {
  // Validate on blur (when user leaves field)
  // Validate on input (as user types)
});

// TODO: Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Validate all fields
  // If all valid, show success message
  // If any invalid, show errors
});
