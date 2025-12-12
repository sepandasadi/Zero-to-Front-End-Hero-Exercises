# Console API Exercises - Solution

## Console Methods Used

### 1. Basic Logging
```javascript
console.log('Regular message');
console.info('Information');
console.warn('Warning');
console.error('Error');
console.debug('Debug info');
```

### 2. Styled Output
```javascript
console.log('%c✅ Success!',
  'color: green; font-size: 16px; font-weight: bold; background: #e8f5e9; padding: 4px 8px;'
);

console.log('%cError: %cSomething went wrong',
  'color: red; font-weight: bold;',
  'color: black;'
);
```

**Screenshot:**
![Styled Console Output](screenshots/styled-console.png)

### 3. Table Display
```javascript
const users = [
  { id: 1, name: 'Alice', role: 'Developer' },
  { id: 2, name: 'Bob', role: 'Designer' },
  { id: 3, name: 'Charlie', role: 'Manager' }
];

console.table(users);
console.table(users, ['name', 'role']);  // Specific columns
```

**Screenshot:**
![Console Table](screenshots/console-table.png)

### 4. Grouping
```javascript
console.group('User Authentication');
console.log('Validating credentials');
console.log('Checking database');

console.group('Database Query');
console.log('SELECT * FROM users');
console.groupEnd();

console.log('Generating token');
console.groupEnd();
```

**Screenshot:**
![Grouped Logs](screenshots/grouped-logs.png)

### 5. Performance Timing
```javascript
console.time('Array Processing');
const numbers = Array.from({ length: 1000000 }, (_, i) => i);
const doubled = numbers.map(n => n * 2);
console.timeEnd('Array Processing');
// Output: Array Processing: 45.234ms
```

### 6. Stack Traces
```javascript
function functionA() {
  functionB();
}

function functionB() {
  functionC();
}

function functionC() {
  console.trace('How did we get here?');
}

functionA();
```

### 7. Assertions
```javascript
const user = { name: 'Alice', age: 25 };

console.assert(user.age >= 18, 'User must be 18 or older');
// No output (assertion passed)

console.assert(user.age >= 30, 'User must be 30 or older');
// Assertion failed: User must be 30 or older
```

### 8. Custom Logger
```javascript
const logger = {
  debug: (msg) => console.log('%c🐛 DEBUG', 'background: #e3f2fd; color: #1976d2;', msg),
  info: (msg) => console.log('%cℹ️ INFO', 'background: #e8f5e9; color: #388e3c;', msg),
  warn: (msg) => console.log('%c⚠️ WARN', 'background: #fff3e0; color: #f57c00;', msg),
  error: (msg) => console.log('%c❌ ERROR', 'background: #ffebee; color: #c62828;', msg)
};

logger.info('User logged in');
logger.warn('Rate limit approaching');
logger.error('Payment failed');
```

**Screenshot:**
![Custom Logger](screenshots/custom-logger.png)

---

## What I Learned

### Key Takeaways:

1. **console.table() is amazing** for viewing structured data
2. **Styled output** makes logs easier to scan
3. **Grouping** organizes related logs together
4. **Timing** helps identify performance issues
5. **Custom loggers** provide consistent formatting

### Useful Console Shortcuts:

- `$0` - Currently selected element
- `$_` - Result of last expression
- `$$('selector')` - querySelectorAll
- `copy(object)` - Copy to clipboard
- `clear()` - Clear console

### Best Practices:

1. ✅ Use appropriate log levels (debug, info, warn, error)
2. ✅ Use console.table() for arrays/objects
3. ✅ Use console.group() for related logs
4. ✅ Use console.time() to measure performance
5. ✅ Remove console.logs before production (or use a logger)
6. ✅ Style important messages for visibility

---

**Time Spent:** 30 minutes
**Completion:** ✅ All console methods practiced


