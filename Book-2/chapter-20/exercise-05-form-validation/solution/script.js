// Form Validation with Regex - SOLUTION

const patterns = {
  username: /^[a-zA-Z0-9_]{3,16}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  phone: /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,
  website: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/
};

const form = document.getElementById('signup-form');
const inputs = {
  username: document.getElementById('username'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  phone: document.getElementById('phone'),
  website: document.getElementById('website')
};

function validate(input, pattern) {
  const value = input.value.trim();
  const validationSpan = input.nextElementSibling;

  // Skip validation for optional empty fields
  if (!input.required && value === '') {
    input.classList.remove('valid', 'invalid');
    validationSpan.textContent = '';
    return true;
  }

  const isValid = pattern.test(value);

  if (isValid) {
    input.classList.add('valid');
    input.classList.remove('invalid');
    validationSpan.textContent = '✓';
    validationSpan.style.color = '#10b981';
  } else {
    input.classList.add('invalid');
    input.classList.remove('valid');
    validationSpan.textContent = '✗';
    validationSpan.style.color = '#ef4444';
  }

  return isValid;
}

// Add real-time validation
Object.entries(inputs).forEach(([name, input]) => {
  // Validate on blur
  input.addEventListener('blur', () => {
    if (input.value.trim() !== '' || input.required) {
      validate(input, patterns[name]);
    }
  });

  // Validate on input (after first blur)
  input.addEventListener('input', () => {
    if (input.classList.contains('valid') || input.classList.contains('invalid')) {
      validate(input, patterns[name]);
    }
  });
});

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  let allValid = true;

  // Validate all required fields
  Object.entries(inputs).forEach(([name, input]) => {
    if (input.required || input.value.trim() !== '') {
      const isValid = validate(input, patterns[name]);
      if (!isValid) allValid = false;
    }
  });

  if (allValid) {
    // Show success message
    const successMsg = document.getElementById('success-message');
    successMsg.style.display = 'block';

    // In real app: submit data to server
    console.log('Form data:', {
      username: inputs.username.value,
      email: inputs.email.value,
      phone: inputs.phone.value,
      website: inputs.website.value || 'Not provided'
    });

    // Reset form after 2 seconds
    setTimeout(() => {
      form.reset();
      Object.values(inputs).forEach(input => {
        input.classList.remove('valid', 'invalid');
        input.nextElementSibling.textContent = '';
      });
      successMsg.style.display = 'none';
    }, 2000);
  } else {
    console.log('Form has errors - please fix them');
  }
});

console.log('✅ Form validation initialized!');
