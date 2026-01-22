// Exercise 01: RegEx Fundamentals - SOLUTION

console.log("=== Exercise 1: RegEx Fundamentals ===\n");

// Task 1: Basic Patterns
console.log("--- Task 1: Basic Patterns ---");

const text1 = "hello world";
const text2 = "abc123";
const text3 = "programming";

// Literal text match
const hasHello = /hello/.test(text1);
console.log("Has 'hello':", hasHello); // true

// \d matches any digit
const hasDigit = /\d/.test(text2);
console.log("Has digit:", hasDigit); // true

// [aeiou] matches any vowel
const hasVowel = /[aeiou]/.test(text3);
console.log("Has vowel:", hasVowel); // true

// Task 2: Quantifiers
console.log("\n--- Task 2: Quantifiers ---");

// {10} = exactly 10 occurrences
const phonePattern = /^\d{10}$/;
console.log("'5551234567':", phonePattern.test('5551234567')); // true
console.log("'555':", phonePattern.test('555')); // false

// {3,16} = 3 to 16 occurrences, ^ and $ anchor entire string
const usernamePattern = /^[a-zA-Z0-9]{3,16}$/;
console.log("'john123':", usernamePattern.test('john123')); // true
console.log("'ab':", usernamePattern.test('ab')); // false (too short)

// {8,} = 8 or more occurrences
const passwordPattern = /^.{8,}$/;
console.log("'password123':", passwordPattern.test('password123')); // true
console.log("'short':", passwordPattern.test('short')); // false

// Task 3: Character Classes
console.log("\n--- Task 3: Character Classes ---");

const testString = "Hello 123 World!";

// \w = [a-zA-Z0-9_], + = one or more, g = global
const words = testString.match(/\w+/g);
console.log("Words:", words); // ['Hello', '123', 'World']

// \d = digit
const digits = testString.match(/\d+/g);
console.log("Digits:", digits); // ['123']

// \D = NOT digit
const nonDigits = testString.match(/\D+/g);
console.log("Non-digits:", nonDigits); // ['Hello ', ' World!']

// \s = whitespace
const spaces = testString.match(/\s/g);
console.log("Spaces:", spaces); // [' ', ' ']

// Task 4: Anchors
console.log("\n--- Task 4: Anchors ---");

// ^ = start of string
const startsWithHello = /^hello/;
console.log("'hello world':", startsWithHello.test('hello world')); // true
console.log("'say hello':", startsWithHello.test('say hello')); // false

// $ = end of string
const endsWithWorld = /world$/;
console.log("'hello world':", endsWithWorld.test('hello world')); // true
console.log("'world hello':", endsWithWorld.test('world hello')); // false

// \b = word boundary
const exactWord = /\bhello\b/;
console.log("'hello world':", exactWord.test('hello world')); // true
console.log("'helloworld':", exactWord.test('helloworld')); // false
console.log("'say hello':", exactWord.test('say hello')); // true

// Task 5: Flags
console.log("\n--- Task 5: Flags ---");

const text = "Hello HELLO hello";

// i = case insensitive, g = global (all matches)
const allHellos = text.match(/hello/gi);
console.log("All 'hello' (case insensitive):", allHellos); // ['Hello', 'HELLO', 'hello']

// Without g flag, only first match
const firstHello = text.match(/hello/i);
console.log("First 'hello':", firstHello); // ['Hello']

// Global vowel search
const vowels = text.match(/[aeiou]/gi);
console.log("All vowels:", vowels); // ['e', 'o', 'E', 'O', 'e', 'o']

// BONUS: More Patterns
console.log("\n--- Bonus: Common Patterns ---");

// Email-like pattern (simplified)
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log("'user@example.com':", emailPattern.test('user@example.com')); // true
console.log("'invalid.email':", emailPattern.test('invalid.email')); // false

// URL-like pattern (simplified)
const urlPattern = /^https?:\/\/.+/;
console.log("'https://example.com':", urlPattern.test('https://example.com')); // true
console.log("'example.com':", urlPattern.test('example.com')); // false

// Hexadecimal color
const hexPattern = /^#[0-9A-Fa-f]{6}$/;
console.log("'#FF5733':", hexPattern.test('#FF5733')); // true
console.log("'#FFF':", hexPattern.test('#FFF')); // false (too short)

console.log("\n✅ Exercise complete!");
console.log("\n💡 Key Takeaways:");
console.log("- Use .test() for boolean checks");
console.log("- Use .match() to find matches");
console.log("- Flags: i (case insensitive), g (global), m (multiline)");
console.log("- ^ = start, $ = end, \\b = word boundary");
console.log("- \\d = digit, \\w = word char, \\s = whitespace");
console.log("- Quantifiers: + (1+), * (0+), ? (0-1), {n}, {n,m}");
