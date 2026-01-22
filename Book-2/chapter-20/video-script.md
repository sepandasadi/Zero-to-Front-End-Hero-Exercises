# Chapter 20: Regular Expressions - Video Walkthrough Script

**Total Duration:** 35-38 minutes  
**Target:** Developers learning regex patterns

---

## Segment 1: Introduction (3 minutes)

**Narration:**
"Regular expressions - regex - are one of the most powerful tools in programming. They're patterns that match text, and they're used everywhere: validating emails, searching logs, parsing data, and transforming text."

**Show examples:**
- Email validation in forms
- Find/replace in code editors
- Log file analysis
- Data extraction from APIs

**Learning objectives:**
1. Understand regex syntax
2. Build validation patterns
3. Process and transform text
4. Use groups and lookaheads
5. Apply to real-world problems

---

## Segment 2: Regex Fundamentals (8 minutes)

### Basic Patterns (3 min)
```js
/hello/ // Literal text
/\d/    // Any digit
/\w/    // Any word character
/\s/    // Any whitespace
/./     // Any character
```

**Live demo:** Test each pattern

### Quantifiers (2 min)
```js
/a*/    // 0 or more
/a+/    // 1 or more
/a?/    // 0 or 1
/a{3}/  // Exactly 3
/a{2,5}/ // 2 to 5
```

### Anchors (2 min)
```js
/^hello/ // Start
/world$/ // End
/\b/     // Word boundary
```

### Character Classes (1 min)
```js
/[aeiou]/  // Any vowel
/[a-z]/    // Any lowercase
/[^0-9]/   // NOT digit
```

---

## Segment 3: Validation Patterns (8 minutes)

### Email (2 min)
```js
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```
Explain each part, show test cases

### Password Strength (3 min)
```js
// Multiple requirements using lookaheads
const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
```
Show why lookaheads are needed

### Phone Numbers (3 min)
```js
const phone = /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/;
```
Test various formats

---

## Segment 4: Groups & Backreferences (6 minutes)

### Capturing Groups (3 min)
```js
const date = "2024-01-15";
const pattern = /(\d{4})-(\d{2})-(\d{2})/;
const [_, year, month, day] = date.match(pattern);
```

### Named Groups (2 min)
```js
const pattern = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const { groups } = date.match(pattern);
console.log(groups.year); // More readable!
```

### Backreferences (1 min)
```js
/\b(\w+)\s+\1\b/ // Find duplicate words
```

---

## Segment 5: Text Processing (5 minutes)

### Find and Replace
```js
text.replace(/phone/g, '[REDACTED]');
text.replace(/(\d{2})\/(\d{2})\/(\d{4})/g, '$3-$1-$2');
```

### Data Extraction
```js
const emails = text.match(/[^\s@]+@[^\s@]+\.[^\s@]+/g);
```

### Cleaning
```js
html.replace(/<[^>]*>/g, ''); // Strip HTML
text.replace(/\s+/g, ' ');    // Normalize whitespace
```

---

## Segment 6: Best Practices & Wrap-up (5 minutes)

**Common Pitfalls:**
- Forgetting to escape special chars
- Not using ^ and $ (partial matches)
- Greedy vs lazy quantifiers
- Performance with complex patterns

**When NOT to use regex:**
- Parsing HTML/XML (use parser)
- Complex nested structures
- Simple string operations (`includes()`, `startsWith()`)

**Testing regex:**
- Use regex101.com
- Test edge cases
- Consider performance

**Key Takeaways:**
✅ Start simple, build up complexity
✅ Test thoroughly with edge cases
✅ Comment complex patterns
✅ Use named groups for clarity
✅ Know regex limitations

---

**Recording Notes:**
- Use regex101.com for visual explanations
- Show patterns matching text in real-time
- Highlight matched groups with colors
- Display common mistakes and how to fix

**Total Duration: 35-38 minutes**
