// Exercise 02: Validation Patterns - SOLUTION

console.log("=== Exercise 2: Validation Patterns ===\n");

// ========================================
// Task 1: Email Validation
// ========================================
console.log("--- Task 1: Email Validation ---");

// Email pattern breakdown:
// ^              - Start of string
// [^\s@]+        - One or more chars that aren't space or @
// @              - Literal @
// [^\s@]+        - One or more chars that aren't space or @
// \.             - Literal dot
// [^\s@]+        - One or more chars that aren't space or @
// $              - End of string
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Test cases
const emails = [
  'user@example.com',      // Valid
  'john.doe@company.co.uk', // Valid
  'invalid.email',          // Invalid (no @)
  'no@domain',              // Invalid (no TLD)
  '@example.com',           // Invalid (no local part)
  'user @example.com',      // Invalid (space)
  'user@example..com'       // Edge case (double dot)
];

emails.forEach(email => {
  console.log(`${email.padEnd(25)} : ${emailPattern.test(email) ? '✓' : '✗'}`);
});

// More robust email pattern (still not perfect!)
const betterEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// ========================================
// Task 2: Phone Number Validation
// ========================================
console.log("\n--- Task 2: Phone Number Validation ---");

// US phone number with flexible formatting
// \(? - Optional opening parenthesis
// \d{3} - Three digits (area code)
// \)? - Optional closing parenthesis
// [-\s]? - Optional hyphen or space
// \d{3} - Three digits
// [-\s]? - Optional hyphen or space
// \d{4} - Four digits
const phonePattern = /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/;

const phones = [
  '(555) 123-4567',   // Valid
  '555-123-4567',     // Valid
  '5551234567',       // Valid
  '555 123 4567',     // Valid
  '123-4567',         // Invalid (too short)
  '(555)1234567',     // Valid
  '+1 555-123-4567'   // Invalid (country code not in pattern)
];

phones.forEach(phone => {
  console.log(`${phone.padEnd(20)} : ${phonePattern.test(phone) ? '✓' : '✗'}`);
});

// International format (with optional +1)
const intlPhonePattern = /^(\+1[-\s]?)?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/;

// ========================================
// Task 3: URL Validation
// ========================================
console.log("\n--- Task 3: URL Validation ---");

// URL pattern breakdown:
// ^https? - Start with http or https
// :\/\/ - Literal ://
// (www\.)? - Optional www.
// [-a-zA-Z0-9@:%._\+~#=] - Valid domain chars
// {1,256} - Domain length
// \.[a-zA-Z0-9()]{1,6} - TLD
// \b - Word boundary
// ([-a-zA-Z0-9()@:%_\+.~#?&\/=]*) - Optional path and query
const urlPattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

const urls = [
  'http://example.com',              // Valid
  'https://www.example.com',         // Valid
  'https://example.com/path',        // Valid
  'https://example.com/path?q=test', // Valid
  'example.com',                     // Invalid (no protocol)
  'htp://example.com',               // Invalid (typo in protocol)
  'https:/example.com'               // Invalid (missing /)
];

urls.forEach(url => {
  console.log(`${url.padEnd(35)} : ${urlPattern.test(url) ? '✓' : '✗'}`);
});

// ========================================
// Task 4: Password Strength
// ========================================
console.log("\n--- Task 4: Password Strength ---");

// Password requirements using lookaheads:
// (?=.*[a-z]) - Must have lowercase (lookahead doesn't consume)
// (?=.*[A-Z]) - Must have uppercase
// (?=.*\d) - Must have digit
// (?=.*[@$!%*?&]) - Must have special char
// .{8,} - At least 8 chars total
const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const passwords = [
  'Password1!',     // Valid
  'weak',           // Invalid (too short)
  'NoDigit!',       // Invalid (no digit)
  'nouppercas1!',   // Invalid (no uppercase)
  'NOLOWERCASE1!',  // Invalid (no lowercase)
  'NoSpecial1',     // Invalid (no special char)
  'Perfect123!'     // Valid
];

passwords.forEach(pwd => {
  console.log(`${pwd.padEnd(20)} : ${strongPasswordPattern.test(pwd) ? '✓ Strong' : '✗ Weak'}`);
});

// Individual checks (better UX to show what's missing)
function checkPasswordStrength(password) {
  return {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    digit: /\d/.test(password),
    special: /[@$!%*?&]/.test(password)
  };
}

console.log('\nPassword "test123":', checkPasswordStrength('test123'));
console.log('Password "Perfect123!":', checkPasswordStrength('Perfect123!'));

// ========================================
// Task 5: Username Validation
// ========================================
console.log("\n--- Task 5: Username Validation ---");

// Username rules:
// ^[a-zA-Z] - Start with letter
// [a-zA-Z0-9_] - Then letters, digits, underscore
// {2,15} - 2-15 more chars (total 3-16)
// $ - End
const usernamePattern = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;

// No consecutive underscores
const noConsecutiveUnderscores = /^(?!.*__)[a-zA-Z][a-zA-Z0-9_]{2,15}$/;

const usernames = [
  'john_doe',       // Valid
  'Alice123',       // Valid
  'x',              // Invalid (too short)
  '123user',        // Invalid (starts with number)
  'user__name',     // Invalid (consecutive underscores)
  'validUser_99',   // Valid
  'ThisIsTooLongUserName'  // Invalid (too long)
];

usernames.forEach(username => {
  const basic = usernamePattern.test(username);
  const strict = noConsecutiveUnderscores.test(username);
  console.log(`${username.padEnd(25)} : Basic: ${basic ? '✓' : '✗'}, Strict: ${strict ? '✓' : '✗'}`);
});

// ========================================
// Task 6: Credit Card Format
// ========================================
console.log("\n--- Task 6: Credit Card Format ---");

// 16 digits, optional spaces/hyphens every 4
const cardPattern = /^\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}$/;

const cards = [
  '1234 5678 9012 3456',  // Valid
  '1234-5678-9012-3456',  // Valid
  '1234567890123456',     // Valid
  '1234 5678 9012 345',   // Invalid (wrong length)
  'abcd 5678 9012 3456'   // Invalid (letters)
];

cards.forEach(card => {
  console.log(`${card.padEnd(25)} : ${cardPattern.test(card) ? '✓' : '✗'}`);
});

// Clean formatting (remove non-digits)
function formatCardNumber(input) {
  const cleaned = input.replace(/\D/g, '');
  const groups = cleaned.match(/.{1,4}/g) || [];
  return groups.join(' ');
}

console.log('\nFormatted:', formatCardNumber('1234567890123456'));

// ========================================
// BONUS: Combined Validation Function
// ========================================
console.log("\n--- Bonus: Validation Object ---");

const validators = {
  email: (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str),
  phone: (str) => /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/.test(str),
  url: (str) => /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/.test(str),
  strongPassword: (str) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(str),
  username: (str) => /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/.test(str),
  zipCode: (str) => /^\d{5}(-\d{4})?$/.test(str),
  hexColor: (str) => /^#[0-9A-Fa-f]{6}$/.test(str),
  ipAddress: (str) => /^(\d{1,3}\.){3}\d{1,3}$/.test(str)
};

// Test the validators
console.log('Email "user@test.com":', validators.email('user@test.com'));
console.log('Phone "(555) 123-4567":', validators.phone('(555) 123-4567'));
console.log('Password "Test123!":', validators.strongPassword('Test123!'));
console.log('Hex color "#FF5733":', validators.hexColor('#FF5733'));

console.log("\n✅ Exercise complete!");
console.log("\n💡 Key Takeaways:");
console.log("- Regex perfect for format validation");
console.log("- Lookaheads (?=) for complex requirements");
console.log("- Always test edge cases");
console.log("- Regex can't validate everything (e.g., if email exists)");
console.log("- Use regex for format, server for true validation");
