# Exercise 01: RegEx Fundamentals

## 🎯 Objective

Learn regular expression syntax, test patterns, and use basic regex methods.

## 📋 Tasks

### Task 1: Basic Patterns
Test these patterns:
- `/hello/` matches "hello world"
- `/\d/` matches strings with digits
- `/[aeiou]/` matches strings with vowels

### Task 2: Quantifiers
Match:
- Phone: exactly 10 digits
- Username: 3-16 alphanumeric characters
- Password: 8+ characters

### Task 3: Character Classes
Create patterns for:
- Any word character: `\w`
- Any digit: `\d`
- Any whitespace: `\s`
- NOT digit: `\D`

### Task 4: Anchors
- Match "hello" only at start of string
- Match "world" only at end
- Match exact word with word boundaries

### Task 5: Flags
- Case insensitive search
- Global search (find all matches)
- Multi-line mode

## 💡 Hints

```js
// test() returns boolean
/pattern/.test(string)

// match() returns array of matches
string.match(/pattern/g)

// Flags
/pattern/i  // Case insensitive
/pattern/g  // Global
/pattern/m  // Multiline
```

**[Start Coding →](./starter/script.js)**
