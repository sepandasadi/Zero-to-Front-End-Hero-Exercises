# Exercise 13: Lexical Scope ⭐

## 🎯 Objective

See how inner functions access outer variables.

## 📝 Instructions

Create nested functions and observe variable access.

```js
function outer() {
  const outerVar = 'I am outer';

  function inner() {
    const innerVar = 'I am inner';
    console.log(outerVar);  // Can access outer variable
    console.log(innerVar);  // Can access own variable
  }

  inner();
  // console.log(innerVar);  // Error! Can't access inner variable
}
```

## ⏱️ Estimated Time

10 minutes

