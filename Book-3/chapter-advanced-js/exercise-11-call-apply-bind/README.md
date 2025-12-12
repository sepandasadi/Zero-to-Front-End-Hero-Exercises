# Exercise 11: call/apply/bind ⭐⭐

## 🎯 Objective

Master the three methods that control the `this` keyword.

## 📝 Instructions

Use `call`, `apply`, and `bind` to control function context.

### Requirements

```js
const person = { name: 'Alice' };

function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

// Use call
greet.call(person, 'Hello', '!');  // "Hello, Alice!"

// Use apply
greet.apply(person, ['Hi', '?']);  // "Hi, Alice?"

// Use bind
const boundGreet = greet.bind(person);
boundGreet('Hey', '.');  // "Hey, Alice."
```

## 🎁 Bonus

1. Use `call` to borrow array methods
2. Create partial application with `bind`
3. Fix `this` in event handlers

## ⏱️ Estimated Time

20 minutes

