// Exercise 01: RegEx Fundamentals - STARTER

console.log("=== Exercise 1: RegEx Fundamentals ===\n");

// Task 1: Basic Patterns
console.log("--- Task 1: Basic Patterns ---");

const text1 = "hello world";
const text2 = "abc123";
const text3 = "programming";

// TODO: Test if text1 contains "hello"
const hasHello = /hello/.test(text1);
console.log("Has 'hello':", hasHello);

// TODO: Test if text2 contains any digit


// TODO: Test if text3 contains vowels


// Task 2: Quantifiers
console.log("\n--- Task 2: Quantifiers ---");

// TODO: Create regex for exactly 10 digits (phone number)
const phonePattern = null; // Fix this

console.log("Is '5551234567' a valid phone?", phonePattern.test('5551234567'));
console.log("Is '555' a valid phone?", phonePattern.test('555'));

// TODO: Create regex for username (3-16 alphanumeric)


// TODO: Create regex for password (8+ characters)


// Task 3: Character Classes
console.log("\n--- Task 3: Character Classes ---");

const testString = "Hello 123 World!";

// TODO: Find all word characters
const words = testString.match(/\w+/g);
console.log("Words:", words);

// TODO: Find all digits


// TODO: Find all non-digits


// Task 4: Anchors
console.log("\n--- Task 4: Anchors ---");

// TODO: Match "hello" only at start
const startsWithHello = /^hello/;
console.log("'hello world' starts with hello:", startsWithHello.test('hello world'));
console.log("'say hello' starts with hello:", startsWithHello.test('say hello'));

// TODO: Match "world" only at end


// TODO: Match exact word with boundaries


// Task 5: Flags
console.log("\n--- Task 5: Flags ---");

const text = "Hello HELLO hello";

// TODO: Find all "hello" (case insensitive)


// TODO: Find all vowels globally


console.log("\n✅ Exercise complete!");
