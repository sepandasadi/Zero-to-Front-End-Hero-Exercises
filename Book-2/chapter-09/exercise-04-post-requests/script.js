console.log("=== Exercise 4: POST Requests ===\n");

// DOM Elements
const form = document.getElementById('registration-form');
const submitBtn = document.getElementById('submit-btn');
const responseBox = document.getElementById('response-box');
const responseTitle = document.getElementById('response-title');
const responseData = document.getElementById('response-data');

// Form fields
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const bioInput = document.getElementById('bio');

// Error elements
const usernameError = document.getElementById('username-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

// Validation functions
function validateUsername(username) {
  return username.length >= 3;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function showError(input, errorElement) {
  input.classList.add('error');
  errorElement.classList.add('show');
}

function clearError(input, errorElement) {
  input.classList.remove('error');
  errorElement.classList.remove('show');
}

// Real-time validation
usernameInput.addEventListener('input', () => {
  if (usernameInput.value && !validateUsername(usernameInput.value)) {
    showError(usernameInput, usernameError);
  } else {
    clearError(usernameInput, usernameError);
  }
});

emailInput.addEventListener('input', () => {
  if (emailInput.value && !validateEmail(emailInput.value)) {
    showError(emailInput, emailError);
  } else {
    clearError(emailInput, emailError);
  }
});

passwordInput.addEventListener('input', () => {
  if (passwordInput.value && !validatePassword(passwordInput.value)) {
    showError(passwordInput, passwordError);
  } else {
    clearError(passwordInput, passwordError);
  }
});

// Form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  console.log("Form submitted!");

  // Get form values
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const bio = bioInput.value.trim();

  // Validate all fields
  let isValid = true;

  if (!validateUsername(username)) {
    showError(usernameInput, usernameError);
    isValid = false;
  } else {
    clearError(usernameInput, usernameError);
  }

  if (!validateEmail(email)) {
    showError(emailInput, emailError);
    isValid = false;
  } else {
    clearError(emailInput, emailError);
  }

  if (!validatePassword(password)) {
    showError(passwordInput, passwordError);
    isValid = false;
  } else {
    clearError(passwordInput, passwordError);
  }

  if (!isValid) {
    console.log("❌ Validation failed");
    showResponse('error', 'Please fix the errors above', null);
    return;
  }

  console.log("✓ Validation passed");

  // Prepare data
  const userData = {
    username,
    email,
    password, // In real app, this would be hashed!
    bio
  };

  console.log("Sending data:", userData);

  // Send POST request
  try {
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.textContent = '';
    responseBox.classList.remove('show');

    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✓ Response data:", data);

    // Show success
    showResponse('success', '✅ Account created successfully!', {
      ...data,
      note: 'This is a demo API. Data is not actually saved.'
    });

    // Reset form
    form.reset();

  } catch (error) {
    console.error("❌ Error:", error);
    showResponse('error', '❌ Failed to create account', {
      error: error.message,
      tip: 'Check your internet connection'
    });
  } finally {
    // Reset button
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    submitBtn.textContent = 'Create Account';
  }
});

function showResponse(type, title, data) {
  responseBox.className = 'response-box show ' + type;
  responseTitle.textContent = title;

  if (data) {
    responseData.textContent = JSON.stringify(data, null, 2);
  } else {
    responseData.textContent = '';
  }
}

console.log("✓ Form ready!");
console.log("\n📝 Try creating an account:");
console.log("   - Fill in the form");
console.log("   - Check validation");
console.log("   - Submit and see the POST request");
console.log("   - Open Network tab to see the request!");

