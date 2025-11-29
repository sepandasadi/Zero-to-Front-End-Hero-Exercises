// Exercise 5: Form Error Handling - SOLUTION

function handleSubmit(formData) {
  const { email, password } = formData;

  // ========================================
  // Email Validation
  // ========================================

  if (!email) {
    throw new Error('Email is required');
  }

  if (email.length < 5) {
    throw new Error('Email must be at least 5 characters long');
  }

  if (!email.includes('@')) {
    throw new Error('Email must contain @ symbol');
  }

  // Check for dot after @
  const atIndex = email.indexOf('@');
  const dotAfterAt = email.indexOf('.', atIndex);
  if (dotAfterAt === -1) {
    throw new Error('Email must contain a dot (.) after @');
  }

  // ========================================
  // Password Validation
  // ========================================

  if (!password) {
    throw new Error('Password is required');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    throw new Error('Password must contain at least one number');
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    throw new Error('Password must contain at least one uppercase letter');
  }

  // All validations passed
  return 'Form submitted successfully!';
}

// Test cases
console.log('=== Test 1: Valid Input ===');
try {
  const result = handleSubmit({
    email: 'test@example.com',
    password: 'Password123'
  });
  console.log('✅', result);
} catch (e) {
  console.error('❌', e.message);
}

console.log('\n=== Test 2: Empty Email ===');
try {
  handleSubmit({ email: '', password: 'Password123' });
} catch (e) {
  console.log('✅ Correctly threw:', e.message);
}

console.log('\n=== Test 3: Invalid Email (no @) ===');
try {
  handleSubmit({ email: 'invalid', password: 'Password123' });
} catch (e) {
  console.log('✅ Correctly threw:', e.message);
}

console.log('\n=== Test 4: Invalid Email (no dot after @) ===');
try {
  handleSubmit({ email: 'test@invalid', password: 'Password123' });
} catch (e) {
  console.log('✅ Correctly threw:', e.message);
}

console.log('\n=== Test 5: Short Password ===');
try {
  handleSubmit({ email: 'test@example.com', password: 'short' });
} catch (e) {
  console.log('✅ Correctly threw:', e.message);
}

console.log('\n=== Test 6: Password with no number ===');
try {
  handleSubmit({ email: 'test@example.com', password: 'Password' });
} catch (e) {
  console.log('✅ Correctly threw:', e.message);
}

console.log('\n=== Test 7: Password with no uppercase ===');
try {
  handleSubmit({ email: 'test@example.com', password: 'password123' });
} catch (e) {
  console.log('✅ Correctly threw:', e.message);
}

// ========================================
// BONUS: Custom Error Classes
// ========================================

class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

class EmailError extends ValidationError {
  constructor(message) {
    super('email', message);
    this.name = 'EmailError';
  }
}

class PasswordError extends ValidationError {
  constructor(message) {
    super('password', message);
    this.name = 'PasswordError';
  }
}

function handleSubmitAdvanced(formData) {
  const { email, password } = formData;

  // Email validation
  if (!email) throw new EmailError('Email is required');
  if (email.length < 5) throw new EmailError('Email must be at least 5 characters');
  if (!email.includes('@')) throw new EmailError('Email must contain @ symbol');

  const atIndex = email.indexOf('@');
  if (email.indexOf('.', atIndex) === -1) {
    throw new EmailError('Email must contain a dot (.) after @');
  }

  // Password validation
  if (!password) throw new PasswordError('Password is required');
  if (password.length < 8) throw new PasswordError('Password must be at least 8 characters');
  if (!/\d/.test(password)) throw new PasswordError('Password must contain a number');
  if (!/[A-Z]/.test(password)) throw new PasswordError('Password must contain uppercase letter');

  return { success: true, message: 'Form submitted successfully!' };
}

console.log('\n=== Bonus: Custom Error Classes ===');
try {
  handleSubmitAdvanced({ email: 'bad', password: 'Password123' });
} catch (e) {
  console.log(`Caught ${e.name} on field "${e.field}": ${e.message}`);
}

// ========================================
// BONUS: Validation with detailed errors
// ========================================

function validateForm(formData) {
  const errors = {};
  const { email, password } = formData;

  // Collect all errors instead of throwing on first
  if (!email) {
    errors.email = 'Email is required';
  } else if (email.length < 5) {
    errors.email = 'Email must be at least 5 characters';
  } else if (!email.includes('@')) {
    errors.email = 'Email must contain @';
  } else if (email.indexOf('.', email.indexOf('@')) === -1) {
    errors.email = 'Email must contain dot after @';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/\d/.test(password)) {
    errors.password = 'Password must contain a number';
  } else if (!/[A-Z]/.test(password)) {
    errors.password = 'Password must contain uppercase letter';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, errors: {} };
}

console.log('\n=== Bonus: Validation with All Errors ===');
const validation = validateForm({ email: 'bad', password: 'short' });
if (!validation.valid) {
  console.log('Validation failed with errors:', validation.errors);
}


