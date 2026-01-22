# Exercise 01: Jest Setup

## 🎯 Objective

Set up Jest testing framework and write your first tests using common matchers.

## 📋 Tasks

### Task 1: Install Jest

```bash
npm init -y
npm install --save-dev jest
```

Add to package.json:
```json
{
  "scripts": {
    "test": "jest"
  }
}
```

### Task 2: Write First Test

Create `math.js`:
```js
function add(a, b) {
  return a + b;
}
module.exports = { add };
```

Create `math.test.js`:
```js
const { add } = require('./math');

test('adds 2 + 3 to equal 5', () => {
  expect(add(2, 3)).toBe(5);
});
```

Run: `npm test`

### Task 3: Common Matchers

Test with these matchers:
- `.toBe()` - strict equality
- `.toEqual()` - deep equality
- `.toBeTruthy()` / `.toBeFalsy()`
- `.toBeGreaterThan()`
- `.toContain()`
- `.toThrow()`

### Task 4: Describe Blocks

Organize tests:
```js
describe('Calculator', () => {
  test('addition', () => { ... });
  test('subtraction', () => { ... });
});
```

### Task 5: Test Edge Cases

- Zero values
- Negative numbers
- Large numbers
- Invalid inputs

## ✅ Success Criteria

- Jest installed and configured
- Tests run with `npm test`
- Use multiple matchers correctly
- Tests are well-organized
- Edge cases covered

**[Start Coding →](./starter/)**
