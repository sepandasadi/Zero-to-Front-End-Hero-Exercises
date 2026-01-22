// Exercise 04: Lookaheads and Capturing Groups - STARTER

console.log("=== Exercise 4: Lookaheads & Groups ===\n");

// Task 1: Positive Lookahead
console.log("--- Task 1: Positive Lookahead ---");

// Match "Java" only when followed by "Script"
// TODO: Create pattern with positive lookahead
// const pattern1 = /Java(?=Script)/g;

const text1 = "JavaScript is awesome. Java is different.";
// TODO: Test your pattern

// Task 2: Negative Lookahead
console.log("\n--- Task 2: Negative Lookahead ---");

// Match "Java" only when NOT followed by "Script"
// TODO: Create pattern with negative lookahead
// const pattern2 = /Java(?!Script)/g;

// Task 3: Capturing Groups
console.log("\n--- Task 3: Capturing Groups ---");

const date = "2024-12-25";

// TODO: Extract year, month, day using capture groups
// const datePattern = /(\d{4})-(\d{2})-(\d{2})/;
// const [_, year, month, day] = date.match(datePattern);

// Task 4: Named Capture Groups
console.log("\n--- Task 4: Named Capture Groups ---");

const url = "https://example.com:8080/path";

// TODO: Extract protocol, domain, port using named groups
// const urlPattern = /(?<protocol>\w+):\/\/(?<domain>[^:]+)(:(?<port>\d+))?/;
// const { protocol, domain, port } = url.match(urlPattern).groups;

// Task 5: Non-Capturing Groups
console.log("\n--- Task 5: Non-Capturing Groups ---");

// TODO: Match "Mr." or "Mrs." or "Ms." without capturing
// const titlePattern = /(?:Mr|Mrs|Ms)\. \w+/;

const names = ["Mr. Smith", "Mrs. Jones", "Ms. Brown"];

// Task 6: Backreferences
console.log("\n--- Task 6: Backreferences ---");

// TODO: Find repeated words
// const repeatPattern = /\b(\w+)\s+\1\b/g;

const text2 = "This is is a test test of repeated repeated words.";
