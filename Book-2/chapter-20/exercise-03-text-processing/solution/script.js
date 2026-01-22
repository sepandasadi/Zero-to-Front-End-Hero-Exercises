// Exercise 03: Text Processing - SOLUTION

console.log("=== Exercise 3: Text Processing ===\n");

// Task 1: Find and Replace
console.log("--- Task 1: Find and Replace ---");

const text = `Contact us at (555) 123-4567 or email@example.com. 
Visit https://example.com for more info. Date: 01/15/2024`;

// Redact phone numbers
const redactedPhones = text.replace(/\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}/g, '[REDACTED]');
console.log('Redacted phones:', redactedPhones);

// Convert date format MM/DD/YYYY to YYYY-MM-DD
const convertedDates = text.replace(/(\d{2})\/(\d{2})\/(\d{4})/g, '$3-$1-$2');
console.log('Converted dates:', convertedDates);

// Remove extra whitespace
const cleaned = text.replace(/\s+/g, ' ').trim();
console.log('Cleaned:', cleaned);

// Task 2: Extract Information
console.log("\n--- Task 2: Extract Information ---");

const mixedText = `
  Contact Alice at alice@example.com or (555) 123-4567.
  Visit https://example.com or http://test.org.
  Follow us: #javascript #webdev #coding
`;

// Extract emails
const emails = mixedText.match(/[^\s@]+@[^\s@]+\.[^\s@]+/g);
console.log('Emails:', emails);

// Extract phone numbers
const phones = mixedText.match(/\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}/g);
console.log('Phones:', phones);

// Extract URLs
const urls = mixedText.match(/https?:\/\/[^\s]+/g);
console.log('URLs:', urls);

// Extract hashtags
const hashtags = mixedText.match(/#\w+/g);
console.log('Hashtags:', hashtags);

// Task 3: Clean Data
console.log("\n--- Task 3: Clean Data ---");

const htmlText = '<p>This is <strong>bold</strong> text.</p>';
const noHTML = htmlText.replace(/<[^>]*>/g, '');
console.log('Stripped HTML:', noHTML);

const specialChars = 'Hello @#$% World! 123';
const alphanumericOnly = specialChars.replace(/[^a-zA-Z0-9\s]/g, '');
console.log('Alphanumeric only:', alphanumericOnly);

// Title case
function toTitleCase(str) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}
console.log('Title case:', toTitleCase('hello world from javascript'));

// Task 4: Parse Log Files
console.log("\n--- Task 4: Parse Logs ---");

const logEntry = '[2024-01-15 14:30:22] ERROR: Connection failed';
const logPattern = /\[(.+?)\]\s+(\w+):\s+(.+)/;
const match = logEntry.match(logPattern);

if (match) {
  console.log({
    timestamp: match[1],
    level: match[2],
    message: match[3]
  });
}

// Parse multiple logs
const logs = `
[2024-01-15 14:30:22] ERROR: Connection failed
[2024-01-15 14:31:15] INFO: Server started
[2024-01-15 14:32:00] WARN: High memory usage
`;

const allLogs = [...logs.matchAll(/\[(.+?)\]\s+(\w+):\s+(.+)/g)];
console.log('All parsed logs:', allLogs.map(m => ({
  timestamp: m[1],
  level: m[2],
  message: m[3]
})));

// Task 5: Markdown-like Parsing
console.log("\n--- Task 5: Markdown Parsing ---");

let markdown = 'This is **bold** and this is *italic* text. [Click here](https://example.com)';

// Convert **bold**
markdown = markdown.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

// Convert *italic*
markdown = markdown.replace(/\*(.+?)\*/g, '<em>$1</em>');

// Convert [text](url)
markdown = markdown.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

console.log('Parsed markdown:', markdown);

console.log("\n✅ Exercise complete!");
