# Exercise 1: Module Basics

## 🎯 Objective
Learn to export and import functions, objects, and variables between modules.

## 📝 Instructions

1. Create utility functions in separate modules
2. Export functions using named and default exports
3. Import and use functions in main app

## Files to Create

- `utils/math.js` - Math utility functions
- `utils/formatters.js` - String formatting functions
- `app.js` - Main application (imports from utils)
- `index.html` - HTML file with module script

## ✅ Success Criteria

- Named exports work correctly
- Default exports work correctly
- Functions can be imported and used
- No module errors in console

## 💡 Hints

- Use `export function name() {}` for named exports
- Use `export default function() {}` for default export
- Import with `import { name } from './file.js'`
- HTML script needs `type="module"`

## 🚀 Running

Start a local server:
```bash
python3 -m http.server 8000
# or
npx serve
```

Then open http://localhost:8000

