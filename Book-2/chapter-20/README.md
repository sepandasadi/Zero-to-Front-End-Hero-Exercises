# Chapter 20: Regular Expressions - Exercises

Master the power of pattern matching! Regular expressions are essential for validation, text processing, and data extraction.

## 📚 What You'll Practice

- Basic regex patterns and syntax
- Character classes and quantifiers
- Email, phone, URL validation
- Text search and replace
- Capturing groups and backreferences
- Lookaheads and lookbehinds
- Real-world form validation

## 🎯 Learning Objectives

- Write regex patterns for common use cases
- Validate user input with regex
- Extract data from strings
- Replace and transform text
- Understand regex performance
- Debug regex patterns

---

## 📂 Exercises

### Exercise 1: RegEx Fundamentals ⭐
**Time:** 30-35 minutes | **[Start](./exercise-01-regex-fundamentals/)**

Learn regex syntax, test() and match() methods, character classes, and quantifiers.

### Exercise 2: Validation Patterns ⭐⭐
**Time:** 35-45 minutes | **[Start](./exercise-02-validation-patterns/)**

Build validators for email, phone numbers, URLs, and passwords.

### Exercise 3: Text Processing ⭐⭐⭐
**Time:** 40-50 minutes | **[Start](./exercise-03-text-processing/)**

Find and replace patterns, extract information, clean data, parse logs.

### Exercise 4: Lookaheads & Groups ⭐⭐⭐
**Time:** 45-55 minutes | **[Start](./exercise-04-lookaheads-groups/)**

Master capturing groups, named groups, lookaheads, and backreferences.

### Exercise 5: Form Validation ⭐⭐⭐
**Time:** 40-50 minutes | **[Start](./exercise-05-form-validation/)**

Build a complete form validator with live feedback and error messages.

### Challenge: Data Parser ⭐⭐⭐⭐
**Time:** 3-4 hours | **[Start](./challenge-data-parser/)**

Parse CSV, extract structured data, transform formats, build validation library.

---

## 📝 Quiz
**[Take the Quiz](./quiz.md)**

---

## 📖 Quick Reference

```js
// Basic patterns
/hello/           // Literal text
/hello|world/     // OR
/[abc]/          // Character class (a, b, or c)
/[a-z]/          // Range (any lowercase letter)
/[^abc]/         // Negated class (NOT a, b, or c)

// Quantifiers
/a*/             // 0 or more
/a+/             // 1 or more
/a?/             // 0 or 1
/a{3}/           // Exactly 3
/a{2,5}/         // 2 to 5
/a{2,}/          // 2 or more

// Anchors
/^hello/         // Start of string
/world$/         // End of string
/\b word \b/     // Word boundary

// Special characters
/\d/             // Digit [0-9]
/\w/             // Word char [a-zA-Z0-9_]
/\s/             // Whitespace
/\D \W \S/       // Negated versions
/./              // Any character

// Flags
/pattern/g       // Global (all matches)
/pattern/i       // Case insensitive
/pattern/m       // Multiline

// Methods
'text'.match(/pattern/)    // Find matches
/pattern/.test('text')     // Boolean test
'text'.replace(/old/g, 'new') // Replace
'text'.split(/pattern/)    // Split by pattern
```

**Common Patterns:**
```js
// Email
/^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Phone (US)
/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/

// URL
/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/

// Password (8+ chars, upper, lower, number)
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
```

---

**Ready to regex?** [Start Exercise 1 →](./exercise-01-regex-fundamentals/)

*Chapter 20 • Regular Expressions • Edition 2*
