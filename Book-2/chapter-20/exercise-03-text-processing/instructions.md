# Exercise 03: Text Processing with RegEx

## 🎯 Objective

Use regex for find/replace, data extraction, cleaning, and log parsing.

## 📋 Tasks

### Task 1: Find and Replace
- Replace all phone numbers with `[REDACTED]`
- Convert dates from `MM/DD/YYYY` to `YYYY-MM-DD`
- Remove extra whitespace
- Replace URLs with clickable links (HTML)

### Task 2: Extract Information
Given text with mixed data, extract:
- All email addresses
- All phone numbers
- All URLs
- All #hashtags

### Task 3: Clean Data
- Remove HTML tags
- Strip special characters
- Normalize whitespace
- Convert to title case

### Task 4: Parse Log Files
Given server logs:
```
[2024-01-15 14:30:22] ERROR: Connection failed
[2024-01-15 14:31:15] INFO: Server started
```
Extract: timestamp, level, message

### Task 5: Markdown-like Parsing
Convert:
- `**bold**` → `<strong>bold</strong>`
- `*italic*` → `<em>italic</em>`
- `[link](url)` → `<a href="url">link</a>`

## ⏱️ Estimated Time: 40-50 minutes

**[Start Coding →](./starter/script.js)**
