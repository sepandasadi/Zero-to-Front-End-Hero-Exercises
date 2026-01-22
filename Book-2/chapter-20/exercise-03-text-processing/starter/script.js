// Exercise 03: Text Processing - STARTER

console.log("=== Exercise 3: Text Processing ===\n");

// Task 1: Extract Information
console.log("--- Task 1: Extract Email Addresses ---");

const text1 = "Contact us at support@example.com or sales@example.com for assistance.";

// TODO: Extract all email addresses
// const emails = text1.match(/???/g);

// Task 2: Extract Phone Numbers
console.log("\n--- Task 2: Extract Phone Numbers ---");

const text2 = "Call us at (555) 123-4567 or 555-987-6543 for support.";

// TODO: Extract all phone numbers
// const phones = text2.match(/???/g);

// Task 3: Replace Sensitive Data
console.log("\n--- Task 3: Mask Credit Cards ---");

const text3 = "My card is 4532-1234-5678-9010 and my friend's is 6011-1234-5678-9012.";

// TODO: Replace all but last 4 digits with asterisks
// const masked = text3.replace(/???/, '****-****-****-$1');

// Task 4: Clean Phone Numbers
console.log("\n--- Task 4: Normalize Phone Numbers ---");

const messyPhones = ['(555) 123-4567', '555-987-6543', '5551112222'];

// TODO: Convert all to format: XXX-XXX-XXXX
// const cleanPhones = messyPhones.map(phone => ...);

// Task 5: Extract Hashtags
console.log("\n--- Task 5: Extract Hashtags ---");

const tweet = "Learning #javascript and #regex is fun! #coding #webdev";

// TODO: Extract all hashtags
// const hashtags = tweet.match(/???/g);

// Task 6: Word Count
console.log("\n--- Task 6: Word Count ---");

const article = "The quick brown fox jumps over the lazy dog.";

// TODO: Count words (split on non-word characters)
// const words = article.match(/???/g);
// const wordCount = words ? words.length : 0;
