# Exercise 03: Template Literals & Tagged Templates

## 🎯 Objective

Master template literals for building dynamic strings, creating multi-line text, and generating HTML. Learn tagged templates for custom string processing.

## 📚 What You'll Learn

- Template literal syntax with backticks
- Expression interpolation with `${}`
- Multi-line strings without escape characters
- Building HTML templates dynamically
- Tagged template functions (advanced)
- Real-world use cases

## 📋 Tasks

### Task 1: Basic Template Literals

Create these strings using template literals:

1. Given `const name = 'Alice'` and `const age = 25`, create:
   - `"Hello, Alice!"`
   - `"Alice is 25 years old"`
   - `"In 5 years, Alice will be 30"`

2. With expressions directly in templates:
   - Calculate and display: `"2 + 2 = 4"`
   - Use method: `"HELLO in lowercase is hello"`

**Expected output:**
```
Hello, Alice!
Alice is 25 years old
In 5 years, Alice will be 30
2 + 2 = 4
HELLO in lowercase is hello
```

### Task 2: Multi-line Strings

Create a multi-line address label using template literals:

```js
const name = 'Sarah Johnson';
const street = '123 Main St';
const city = 'Springfield';
const state = 'IL';
const zip = '62701';
```

Create a formatted address that looks like:
```
Sarah Johnson
123 Main St
Springfield, IL 62701
```

### Task 3: Building HTML Templates

Given this product data:
```js
const product = {
  name: 'Laptop',
  price: 999,
  description: 'Powerful laptop for developers',
  inStock: true
};
```

Create an HTML card string using template literals:
```html
<div class="product-card">
  <h2>Laptop</h2>
  <p>Powerful laptop for developers</p>
  <p class="price">$999</p>
  <span class="badge">In Stock</span>
</div>
```

### Task 4: Conditional Content in Templates

Create a function `getUserGreeting(user)` that returns different greetings:

```js
const user1 = { name: 'Alice', isPremium: true, points: 150 };
const user2 = { name: 'Bob', isPremium: false, points: 50 };
```

Output:
```
Welcome back, Alice! ⭐ Premium Member
You have 150 points

Welcome back, Bob!
You have 50 points
```

### Task 5: Dynamic HTML List Generation

Given an array of tasks:
```js
const tasks = [
  { id: 1, text: 'Learn JavaScript', completed: true },
  { id: 2, text: 'Build a project', completed: false },
  { id: 3, text: 'Deploy to production', completed: false }
];
```

Generate HTML list items for each task with appropriate classes.

### Task 6: Tagged Template Function (Advanced)

Create a tagged template function `highlight` that wraps interpolated values in `<mark>` tags:

```js
const name = 'Alice';
const score = 95;

const result = highlight`Student ${name} scored ${score} points`;
// Should return: "Student <mark>Alice</mark> scored <mark>95</mark> points"
```

### Task 7: SQL Query Builder (Tagged Template)

Create a `sql` tagged template that handles escaping:

```js
const table = 'users';
const id = 5;

const query = sql`SELECT * FROM ${table} WHERE id = ${id}`;
// Should build a safe SQL-like query string
```

### Task 8: Real-World Use Case - Email Template

Create a function `generateWelcomeEmail(user)` that returns a full email template:

```js
const user = {
  name: 'Alice Johnson',
  email: 'alice@example.com',
  subscriptionType: 'Premium',
  expiryDate: '2024-12-31'
};
```

Generate a professional welcome email with all details formatted.

## ✅ Success Criteria

Your solution should:

1. ✅ Use backticks for all template literals
2. ✅ Properly interpolate expressions with `${}`
3. ✅ Create clean multi-line strings
4. ✅ Generate valid HTML strings
5. ✅ Implement at least one tagged template
6. ✅ Handle conditional content elegantly
7. ✅ All output properly formatted

## 💡 Hints

### Hint 1: Basic Syntax
```js
const name = 'World';
const greeting = `Hello, ${name}!`;
```

### Hint 2: Multi-line
```js
const multi = `
  Line 1
  Line 2
  Line 3
`;
```

### Hint 3: Expressions
```js
const result = `Sum: ${10 + 20}`;
const method = `Uppercase: ${'hello'.toUpperCase()}`;
```

### Hint 4: Tagged Templates
```js
function myTag(strings, ...values) {
  // strings: array of string literals
  // values: array of interpolated values
  return strings[0] + values[0] + strings[1];
}

const result = myTag`Hello ${name}!`;
```

### Hint 5: Conditional in Template
```js
const message = `Hello${isPremium ? ', Premium Member' : ''}!`;
```

## ⏱️ Estimated Time

**40-50 minutes**
- 10 minutes: Tasks 1-2 (Basics)
- 15 minutes: Tasks 3-5 (HTML generation)
- 15 minutes: Tasks 6-7 (Tagged templates)
- 10 minutes: Task 8 (Real-world)

## 🎯 Bonus Challenges

### Bonus 1: Style Tag Function
```js
function css(strings, ...values) {
  // Build a CSS string
}

const color = 'blue';
const styles = css`
  .button {
    color: ${color};
    padding: 10px;
  }
`;
```

### Bonus 2: Internationalization (i18n)
```js
function t(strings, ...values) {
  // Could lookup translations
  return /* translated string */;
}
```

### Bonus 3: Table Generator
Generate a complete HTML table from array of objects.

## 📖 Resources

- [MDN: Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [MDN: Tagged Templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)
- Chapter 7: Template Literals section

---

**Ready to template?** Say goodbye to string concatenation! 🚀
