# Exercise 15: Function Declaration vs Expression Hoisting ⭐⭐

## 🎯 Objective

Learn which functions are hoisted and which aren't.

## 📝 Instructions

Compare function declarations vs function expressions.

### Function Declaration (Hoisted)
```js
sayHello();  // Works!

function sayHello() {
  console.log('Hello');
}
```

### Function Expression (Not Hoisted)
```js
sayHi();  // Error!

const sayHi = function() {
  console.log('Hi');
};
```

## ⏱️ Estimated Time

15 minutes

