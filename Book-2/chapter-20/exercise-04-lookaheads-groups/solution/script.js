// Exercise 04: Lookaheads & Groups - SOLUTION

console.log("=== Exercise 4: Lookaheads & Groups ===\n");

// Task 1: Capturing Groups
console.log("--- Task 1: Capturing Groups ---");

// Groups are created with parentheses ()
// Access via match() or with $1, $2, etc. in replace()

const name = "Doe, John";
const namePattern = /^(\w+),\s*(\w+)$/;
const nameMatch = name.match(namePattern);

if (nameMatch) {
  console.log('Full match:', nameMatch[0]);     // "Doe, John"
  console.log('Last name:', nameMatch[1]);      // "Doe"
  console.log('First name:', nameMatch[2]);     // "John"
  
  // Swap using groups
  const swapped = name.replace(namePattern, '$2 $1');
  console.log('Swapped:', swapped); // "John Doe"
}

// Extract area code
const phone = "(555) 123-4567";
const areaCode = phone.match(/\((\d{3})\)/)?.[1];
console.log('Area code:', areaCode); // "555"

// Task 2: Named Groups
console.log("\n--- Task 2: Named Groups ---");

// Named groups: (?<name>pattern)
const datePattern = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const date = "2024-01-15";
const dateMatch = date.match(datePattern);

if (dateMatch) {
  console.log('Groups object:', dateMatch.groups);
  console.log('Year:', dateMatch.groups.year);
  console.log('Month:', dateMatch.groups.month);
  console.log('Day:', dateMatch.groups.day);
}

// Parse URL components
const urlPattern = /(?<protocol>https?):\/\/(?<domain>[^\/]+)(?<path>\/.*)?/;
const url = "https://example.com/path/to/page";
const urlMatch = url.match(urlPattern);

console.log('URL parts:', urlMatch?.groups);

// Task 3: Lookaheads
console.log("\n--- Task 3: Lookaheads ---");

// Positive lookahead (?=...): must be followed by
// Matches position, doesn't consume characters
const hasUppercase = /(?=.*[A-Z])/;
const hasDigit = /(?=.*\d)/;

console.log('Has uppercase:', hasUppercase.test('Password'));  // true
console.log('Has digit:', hasDigit.test('Password123'));      // true

// Password with multiple requirements (all must match)
const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
console.log('Strong password "Test123!":', strongPassword.test('Test123!')); // true
console.log('Weak password "test":', strongPassword.test('test'));          // false

// Negative lookahead (?!...): must NOT be followed by
const noConsecutiveSpaces = /^(?!.*  )[a-zA-Z\s]+$/;
console.log('No double spaces "hello world":', noConsecutiveSpaces.test('hello world'));   // true
console.log('Has double spaces "hello  world":', noConsecutiveSpaces.test('hello  world')); // false

// Task 4: Lookbehinds
console.log("\n--- Task 4: Lookbehinds ---");

// Positive lookbehind (?<=...): must be preceded by
// Extract price after $
const priceText = "$19.99 and $29.99";
const prices = [...priceText.matchAll(/(?<=\$)\d+\.\d{2}/g)];
console.log('Prices:', prices.map(m => m[0])); // ['19.99', '29.99']

// Negative lookbehind (?<!...): must NOT be preceded by
// Match numbers not preceded by $
const mixedNumbers = "$100 and 200 items";
const nonPriceNumbers = [...mixedNumbers.matchAll(/(?<!\$)\b\d+\b/g)];
console.log('Non-price numbers:', nonPriceNumbers.map(m => m[0])); // ['200']

// Task 5: Backreferences
console.log("\n--- Task 5: Backreferences ---");

// Backreference \1 matches the same text as first group
// Find duplicate words
const duplicateWords = /\b(\w+)\s+\1\b/g;
const textWithDupes = "This is is a test test string";
console.log('Duplicate words:', textWithDupes.match(duplicateWords)); // ['is is', 'test test']

// Match balanced quotes
const quotedText = '"Hello" and "World"';
const quotes = quotedText.match(/"([^"]*)"/g);
console.log('Quoted strings:', quotes);

// Match HTML tags
const htmlTags = /<(\w+)>.*?<\/\1>/g;
const html = '<div>Content</div> <span>Text</span> <p>Wrong</div>';
console.log('Balanced tags:', html.match(htmlTags)); // Only matches balanced ones

// Task 6: Real-World Parsing
console.log("\n--- Task 6: Complex Parsing ---");

// ISO date with named groups
const isoDate = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})T(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})/;
const timestamp = "2024-01-15T14:30:22";
const parsed = timestamp.match(isoDate);
console.log('Parsed ISO date:', parsed?.groups);

// CSS color patterns
const hexColor = /#[0-9A-Fa-f]{6}/;
const rgbColor = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/;
const hslColor = /hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)/;

console.log('#FF5733 is hex:', hexColor.test('#FF5733'));
console.log('rgb(255, 87, 51) is rgb:', rgbColor.test('rgb(255, 87, 51)'));

console.log("\n✅ Exercise complete!");
