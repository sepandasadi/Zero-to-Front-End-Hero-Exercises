// Challenge: Data Parser - SOLUTION

console.log("=== Data Parser Challenge ===\n");

const rawData = `
User: John Doe
Email: john.doe@example.com
Phone: (555) 123-4567
Website: https://johndoe.com
Joined: 2024-01-15

User: Jane Smith
Email: jane.smith@company.co.uk
Phone: 555-987-6543
Website: http://janesmith.dev
Joined: 2024-02-20

User: Bob Johnson
Email: bob@example.com
Phone: (555) 555-5555
Website: https://www.bobjohnson.com
Joined: 2024-03-10
`;

// Patterns for extraction
const patterns = {
  name: /User: (.+)/g,
  email: /Email: ([^\s@]+@[^\s@]+\.[^\s@]+)/g,
  phone: /Phone: (.+)/g,
  website: /Website: (https?:\/\/.+)/g,
  date: /Joined: (\d{4}-\d{2}-\d{2})/g
};

// Extract all matches
function extractAll(text, pattern) {
  const matches = [];
  let match;
  const regex = new RegExp(pattern.source, pattern.flags);
  while ((match = regex.exec(text)) !== null) {
    matches.push(match[1].trim());
  }
  return matches;
}

const names = extractAll(rawData, patterns.name);
const emails = extractAll(rawData, patterns.email);
const phones = extractAll(rawData, patterns.phone);
const websites = extractAll(rawData, patterns.website);
const dates = extractAll(rawData, patterns.date);

console.log('--- Extracted Data ---');
console.log('Names:', names);
console.log('Emails:', emails);
console.log('Phones:', phones);
console.log('Websites:', websites);
console.log('Dates:', dates);

// Normalize phone numbers
function normalizePhone(phone) {
  const digits = phone.replace(/\D/g, '');
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// Parse into structured data
const users = names.map((name, i) => ({
  name,
  email: emails[i],
  phone: normalizePhone(phones[i]),
  website: websites[i],
  joined: dates[i]
}));

console.log('\n--- Parsed Users ---');
console.log(JSON.stringify(users, null, 2));

// Validate data
console.log('\n--- Validation ---');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
const urlPattern = /^https?:\/\/.+/;

users.forEach((user, i) => {
  console.log(`User ${i + 1}: ${user.name}`);
  console.log(`  Email valid: ${emailPattern.test(user.email) ? '✓' : '✗'}`);
  console.log(`  Phone valid: ${phonePattern.test(user.phone) ? '✓' : '✗'}`);
  console.log(`  URL valid: ${urlPattern.test(user.website) ? '✓' : '✗'}`);
});

// Generate summary report
console.log('\n--- Summary Report ---');
console.log(`Total users: ${users.length}`);
console.log(`Email domains: ${[...new Set(emails.map(e => e.split('@')[1]))].join(', ')}`);
console.log(`Websites with SSL: ${websites.filter(w => w.startsWith('https')).length}/${websites.length}`);

const joinDates = dates.map(d => new Date(d));
const earliest = new Date(Math.min(...joinDates));
const latest = new Date(Math.max(...joinDates));
console.log(`Date range: ${earliest.toDateString()} to ${latest.toDateString()}`);

console.log('\n✅ Challenge complete!');
console.log('\n🏆 Advanced Features Demonstrated:');
console.log('- Pattern extraction with capture groups');
console.log('- Data normalization');
console.log('- Structured data parsing');
console.log('- Comprehensive validation');
console.log('- Summary statistics generation');
