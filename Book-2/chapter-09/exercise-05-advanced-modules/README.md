# Exercise 5: Advanced Module Patterns ⭐⭐⭐

## 🎯 Objective

Master advanced module concepts: default exports, re-exports, and dynamic imports.

## 📝 Instructions

### Part 1: Default vs Named Exports

Create three utility modules:

**math.js** - Use named exports
```javascript
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export const PI = 3.14159;
```

**logger.js** - Use default export
```javascript
export default class Logger {
  log(message) { console.log(message); }
  error(message) { console.error(message); }
}
```

**config.js** - Mix both
```javascript
export const API_URL = 'https://api.example.com';
export default {
  apiUrl: 'https://api.example.com',
  timeout: 5000
};
```

### Part 2: Re-exports (Barrel Pattern)

Create an **index.js** that re-exports everything:

```javascript
export * from './math.js';
export { default as Logger } from './logger.js';
export * from './config.js';
```

### Part 3: Dynamic Imports

Load modules on demand:

```javascript
button.addEventListener('click', async () => {
  const module = await import('./heavy-module.js');
  module.doSomething();
});
```

## 🎯 Tasks

1. **Create the module structure** described above
2. **Create app.js** that:
   - Imports from the barrel (index.js)
   - Uses dynamic imports for a large dataset
   - Demonstrates when to use default vs named exports

3. **Create a demo** showing:
   - Named imports: `import { add, subtract } from './math.js'`
   - Default import: `import Logger from './logger.js'`
   - Namespace import: `import * as math from './math.js'`
   - Dynamic import: `const module = await import('./module.js')`

## 🎁 Bonus Challenges

1. Create a plugin system with dynamic imports
2. Implement lazy loading for code splitting
3. Create circular dependency examples (and fix them)
4. Use import aliases

## 💡 Key Concepts

### Named Exports
- Can have multiple per file
- Must use exact name when importing
- Use for utilities with multiple functions

### Default Exports
- Only one per file
- Can rename when importing
- Use for main class or object

### Re-exports (Barrel)
- Simplifies imports from multiple files
- Creates single entry point
- Good for libraries

### Dynamic Imports
- Returns a Promise
- Enables code splitting
- Use for large/optional features

## ✅ Success Criteria

- Correctly uses named and default exports
- Implements barrel pattern (index.js)
- Demonstrates dynamic imports
- Code is organized logically

## ⏱️ Estimated Time

35-45 minutes

