# Challenge: Advanced Data Parser

## 🎯 Objective

Build a comprehensive data parsing library using regex. Parse CSV, extract structured data, transform formats, and create reusable validators.

## 📚 Features

### Core Functionality
1. **CSV Parser** - Parse CSV with quoted fields, escaped commas
2. **Log Parser** - Extract structured data from server logs
3. **Format Converter** - Transform data formats (dates, phones, etc.)
4. **Validation Library** - Reusable regex validators
5. **Data Extractor** - Pull specific patterns from text

### Required Parsers

**CSV:**
```csv
"Name","Email","Phone"
"John Doe","john@example.com","(555) 123-4567"
"Jane Smith","jane@example.com","555-987-6543"
```

**Server Logs:**
```
[2024-01-15 14:30:22] ERROR 192.168.1.1 - Connection timeout
[2024-01-15 14:31:15] INFO 192.168.1.5 - User login successful
```

**Various Formats:**
- Dates: MM/DD/YYYY → YYYY-MM-DD
- Phones: Normalize to standard format
- URLs: Extract components
- Emails: Validate and extract domain

## ✅ Success Criteria

- Parse CSV correctly handling quoted commas
- Extract all log components
- Convert between formats
- Build reusable library
- Handle edge cases
- Performance optimized

## ⏱️ Estimated Time: 3-4 hours

**[Start Coding →](./starter/script.js)**
