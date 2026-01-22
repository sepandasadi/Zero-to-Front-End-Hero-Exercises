# Exercise 02: Validation Patterns

## 🎯 Objective

Build practical validation patterns for common input types: emails, phone numbers, URLs, and passwords.

## 📋 Tasks

### Task 1: Email Validation
Create regex to validate email addresses:
- Basic format: `user@domain.com`
- Allow dots and hyphens
- Reject spaces and special chars
- Test edge cases

### Task 2: Phone Number Validation
Validate US phone numbers in multiple formats:
- `(555) 123-4567`
- `555-123-4567`
- `5551234567`
- `+1 555 123 4567`

### Task 3: URL Validation
Match valid URLs:
- `http://example.com`
- `https://www.example.com`
- `https://example.com/path?query=value`
- Reject invalid formats

### Task 4: Password Strength
Create validators for:
- Minimum 8 characters
- At least one uppercase
- At least one lowercase
- At least one digit
- At least one special character

### Task 5: Username Validation
- 3-16 characters
- Alphanumeric + underscore
- Must start with letter
- No consecutive underscores

### Task 6: Credit Card (Format Only - Not Real Validation!)
Match format (don't validate actual numbers):
- 16 digits
- Optional spaces/hyphens every 4 digits

## ✅ Success Criteria
- All validators work correctly
- Handle edge cases
- Understand regex construction
- Know validation limitations

**[Start Coding →](./starter/script.js)**
