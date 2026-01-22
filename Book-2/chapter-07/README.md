# Chapter 7: Modern JavaScript (ES6+) - Exercises

Welcome to the modern JavaScript world! These exercises will teach you the powerful ES6+ features that make JavaScript development more elegant, concise, and maintainable.

## 📚 What You'll Practice

- Destructuring arrays and objects
- Spread and rest operators
- Template literals and tagged templates
- Optional chaining and nullish coalescing
- Map and Set data structures
- Default parameters and enhanced object literals
- Modern coding patterns and best practices

## 🎯 Learning Objectives

By completing these exercises, you will:
- Master destructuring for cleaner variable declarations
- Use spread/rest operators confidently
- Build dynamic strings with template literals
- Handle undefined/null values safely with optional chaining
- Work with Map and Set for better data management
- Write more concise and readable code
- Understand modern JavaScript patterns used in production codebases

---

## 📂 Exercise Overview

### Exercise 1: Destructuring Deep Dive ⭐
**Difficulty:** Beginner  
**Time:** 30-40 minutes  
**Focus:** Array and object destructuring, nested structures, default values

Extract values from arrays and objects like a pro. Learn to work with complex nested data structures and avoid tedious manual assignments.

**[Start Exercise](./exercise-01-destructuring/)**

---

### Exercise 2: Spread & Rest Operators ⭐⭐
**Difficulty:** Beginner-Intermediate  
**Time:** 35-45 minutes  
**Focus:** Spreading arrays/objects, rest parameters, shallow vs deep copying

Master the three dots (`...`) that revolutionized JavaScript. Learn when to use spread and when to use rest, and understand shallow copying implications.

**[Start Exercise](./exercise-02-spread-rest/)**

---

### Exercise 3: Template Literals & Tagged Templates ⭐⭐
**Difficulty:** Intermediate  
**Time:** 40-50 minutes  
**Focus:** Multi-line strings, interpolation, tagged templates, HTML generation

Say goodbye to ugly string concatenation. Build dynamic strings, create HTML templates, and even write custom template processors.

**[Start Exercise](./exercise-03-template-literals/)**

---

### Exercise 4: Optional Chaining & Nullish Coalescing ⭐⭐
**Difficulty:** Intermediate  
**Time:** 35-45 minutes  
**Focus:** Safe property access, optional methods, `??` operator, API handling

Stop writing endless `if` checks for undefined values. Access nested properties safely and provide sensible defaults with modern operators.

**[Start Exercise](./exercise-04-optional-chaining/)**

---

### Exercise 5: Map and Set Data Structures ⭐⭐⭐
**Difficulty:** Intermediate-Advanced  
**Time:** 45-60 minutes  
**Focus:** Maps vs objects, Set operations, real-world use cases

Go beyond plain objects. Learn when Maps and Sets are superior choices and how to use them for cleaner, more performant code.

**[Start Exercise](./exercise-05-map-set/)**

---

### Exercise 6: Default Parameters & Enhanced Object Literals ⭐⭐
**Difficulty:** Intermediate  
**Time:** 30-40 minutes  
**Focus:** Function defaults, property/method shorthand, computed properties

Write cleaner function signatures and more elegant object definitions. Learn the shortcuts that make modern JavaScript so concise.

**[Start Exercise](./exercise-06-enhanced-objects/)**

---

### Challenge: Modern E-Commerce Cart ⭐⭐⭐⭐
**Difficulty:** Advanced  
**Time:** 2-3 hours  
**Focus:** Combining all ES6+ features in a real application

Build a production-quality shopping cart that uses all the modern JavaScript features you've learned. This is where everything comes together!

**[Start Challenge](./challenge-ecommerce-cart/)**

---

## 📝 Quiz

Test your knowledge of modern JavaScript features!

**[Take the Quiz](./quiz.md)**

---

## 💡 Why These Features Matter

### Before ES6+:
```js
// Messy, verbose, error-prone
var firstName = user.firstName;
var lastName = user.lastName;
var email = user.email;

var greeting = "Hello, " + firstName + " " + lastName + "!";

if (user && user.address && user.address.city) {
  var city = user.address.city;
}
```

### After ES6+:
```js
// Clean, concise, safe
const { firstName, lastName, email } = user;

const greeting = `Hello, ${firstName} ${lastName}!`;

const city = user?.address?.city ?? 'Unknown';
```

**These aren't just syntactic sugar — they make your code:**
- ✅ More readable and maintainable
- ✅ Less prone to errors
- ✅ Easier to refactor
- ✅ Closer to how other modern languages work
- ✅ Production-ready and professional

---

## 🚀 Getting Started

### Prerequisites
- Completed Chapter 1-6 (or familiar with JavaScript basics)
- Understanding of arrays and objects
- Modern browser (Chrome, Firefox, Safari, Edge)

### How to Approach These Exercises

1. **Start with Exercise 1** - Destructuring is foundational
2. **Practice in the browser console** - Test concepts quickly
3. **Type every example** - Don't copy-paste; build muscle memory
4. **Experiment freely** - Break things and see what happens
5. **Compare with old syntax** - Understand what problems ES6+ solves
6. **Use in real projects** - Apply these immediately

### Testing Your Code

**For exercises 1-6:**
1. Open `index.html` in your browser (or link your JS file)
2. Open DevTools Console (F12 or Cmd+Option+I)
3. Check the console output
4. Experiment by changing values

**For the challenge:**
1. Open `index.html` in your browser
2. Test all functionality
3. Check the console for errors
4. Verify data persistence

---

## 🎓 Learning Tips

### If You're Stuck:
- **Read the error message** - Modern syntax errors are usually clear
- **Check the MDN docs** - Linked in each exercise
- **Use console.log()** - See what values you're actually working with
- **Try the solution** - But understand WHY it works
- **Start simple** - Master basic destructuring before nested structures

### Common Gotchas:

**1. Shallow copying with spread:**
```js
const original = { user: { name: 'Alice' } };
const copy = { ...original };
copy.user.name = 'Bob';
// original.user.name is also 'Bob'! 😱
```

**2. Destructuring undefined:**
```js
const { name } = undefined; // ❌ Error!
const { name } = undefined || {}; // ✅ Safe
```

**3. Optional chaining on function calls:**
```js
user.getName();    // Error if getName doesn't exist
user.getName?.();  // ✅ Returns undefined if getName doesn't exist
```

---

## ✅ Completion Checklist

Track your progress:

- [ ] Exercise 1: Destructuring Deep Dive
- [ ] Exercise 2: Spread & Rest Operators
- [ ] Exercise 3: Template Literals & Tagged Templates
- [ ] Exercise 4: Optional Chaining & Nullish Coalescing
- [ ] Exercise 5: Map and Set Data Structures
- [ ] Exercise 6: Default Parameters & Enhanced Objects
- [ ] Challenge: Modern E-Commerce Cart
- [ ] Quiz: 15 questions

---

## 📖 Quick Reference

### Destructuring
```js
// Arrays
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Objects
const { name, age, ...others } = user;

// Nested
const { address: { city, zip } } = user;

// Defaults
const { name = 'Anonymous' } = {};
```

### Spread & Rest
```js
// Spread (expand)
const arr = [1, 2, 3];
const newArr = [...arr, 4, 5];
const obj = { ...user, active: true };

// Rest (collect)
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b);
}
```

### Template Literals
```js
// Basic
const message = `Hello, ${name}!`;

// Multi-line
const html = `
  <div>
    <h1>${title}</h1>
  </div>
`;

// Tagged
const styled = css`color: ${theme.primary};`;
```

### Optional Chaining & Nullish Coalescing
```js
// Optional chaining
user?.address?.city  // undefined if any part is null/undefined
user.getAddress?.()  // Call method only if it exists

// Nullish coalescing
const port = config.port ?? 3000;  // Use 3000 if port is null/undefined
const name = user.name ?? 'Guest';
```

### Map & Set
```js
// Map
const map = new Map();
map.set('key', 'value');
map.get('key');
map.has('key');
map.delete('key');

// Set
const set = new Set([1, 2, 2, 3]);  // [1, 2, 3]
set.add(4);
set.has(2);
set.delete(1);
```

### Enhanced Objects
```js
// Property shorthand
const name = 'Alice';
const user = { name };  // { name: 'Alice' }

// Method shorthand
const obj = {
  sayHi() { return 'Hi!'; }
};

// Computed properties
const key = 'dynamicKey';
const obj = { [key]: 'value' };

// Default parameters
function greet(name = 'Guest') {
  return `Hello, ${name}!`;
}
```

---

## 📚 Additional Resources

**MDN Documentation:**
- [Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

**Practice:**
- [JavaScript.info ES6](https://javascript.info/)
- [ES6 Features](https://github.com/lukehoban/es6features)

---

## 🌟 Real-World Impact

These aren't just features to learn — they're **essential tools** for modern development:

- **React/Vue/Angular** - Heavy use of destructuring and spread
- **Node.js** - Optional chaining prevents crashes in production
- **API handling** - Destructuring makes data extraction elegant
- **State management** - Spread operators enable immutability
- **Job interviews** - ES6+ knowledge is expected

---

**Ready to write modern JavaScript?** Start with [Exercise 1 →](./exercise-01-destructuring/) and level up your coding! 🚀

*Chapter 7 • Modern JavaScript (ES6+) • Edition 2*
