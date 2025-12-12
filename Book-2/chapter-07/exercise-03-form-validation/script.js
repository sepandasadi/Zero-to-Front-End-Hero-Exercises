// TODO: Add your JavaScript here










// SOLUTION (scroll down to see - try it yourself first!)


























/* SOLUTION:

const area = document.querySelector('.exercise-area');

// Create form HTML
const formHTML = `
  <form id="signupForm">
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" id="username" name="username">
      <div class="error" id="usernameError"></div>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
      <div class="error" id="emailError"></div>
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <div class="error" id="passwordError"></div>
    </div>

    <button type="submit" id="submitBtn">Sign Up</button>
  </form>
`;

area.innerHTML += formHTML;

const form = document.querySelector('#signupForm');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const submitBtn = document.querySelector('#submitBtn');

// Validation functions
function validateUsername() {
  const username = usernameInput.value;
  const error = document.querySelector('#usernameError');

  if (username.length < 3) {
    error.textContent = 'Username must be at least 3 characters';
    usernameInput.classList.remove('valid');
    usernameInput.classList.add('invalid');
    return false;
  } else {
    error.textContent = '✓ Looks good!';
    error.style.color = '#28a745';
    usernameInput.classList.remove('invalid');
    usernameInput.classList.add('valid');
    return true;
  }
}

function validateEmail() {
  const email = emailInput.value;
  const error = document.querySelector('#emailError');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    error.textContent = 'Please enter a valid email address';
    error.style.color = '#dc3545';
    emailInput.classList.remove('valid');
    emailInput.classList.add('invalid');
    return false;
  } else {
    error.textContent = '✓ Looks good!';
    error.style.color = '#28a745';
    emailInput.classList.remove('invalid');
    emailInput.classList.add('valid');
    return true;
  }
}

function validatePassword() {
  const password = passwordInput.value;
  const error = document.querySelector('#passwordError');

  if (password.length < 8) {
    error.textContent = 'Password must be at least 8 characters';
    error.style.color = '#dc3545';
    passwordInput.classList.remove('valid');
    passwordInput.classList.add('invalid');
    return false;
  } else {
    error.textContent = '✓ Looks good!';
    error.style.color = '#28a745';
    passwordInput.classList.remove('invalid');
    passwordInput.classList.add('valid');
    return true;
  }
}

function updateSubmitButton() {
  const allValid = validateUsername() && validateEmail() && validatePassword();
  submitBtn.disabled = !allValid;
}

// Attach real-time validation
usernameInput.addEventListener('input', updateSubmitButton);
emailInput.addEventListener('input', updateSubmitButton);
passwordInput.addEventListener('input', updateSubmitButton);

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!submitBtn.disabled) {
    alert(`✅ Account created!\nUsername: ${usernameInput.value}\nEmail: ${emailInput.value}`);
    form.reset();

    // Clear validation classes
    [usernameInput, emailInput, passwordInput].forEach(input => {
      input.classList.remove('valid', 'invalid');
    });

    // Clear error messages
    document.querySelectorAll('.error').forEach(err => err.textContent = '');

    updateSubmitButton();
  }
});

// Initial check
updateSubmitButton();

*/

