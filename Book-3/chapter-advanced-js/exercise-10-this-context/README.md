# Exercise 10: Method vs Loose Function ⭐⭐

## 🎯 Objective

Understand how `this` changes based on HOW a function is called, and learn how to fix it with `bind`.

## 📝 Instructions

### Part 1: See the Problem

Create an object `user` with:
- A property `name`
- A method `show()` that logs `this.name`

Then:
1. Call it as a method: `user.show()` ✅ Works
2. Save it to a variable and call it: `const fn = user.show; fn()` ❌ Breaks

**Why does it break?** Because `this` is no longer `user`!

### Part 2: Fix It with `bind`

Use `.bind()` to permanently bind `this` to the `user` object.

```js
const boundFn = user.show.bind(user);
boundFn(); // Should work now!
```

### Requirements

- Create the `user` object with `name` and `show()`
- Demonstrate the problem
- Fix it with `bind`
- Explain WHY it breaks and how `bind` fixes it

## 💡 Hints

1. `this` depends on HOW the function is called
2. `user.show()` → `this` is `user`
3. `fn()` → `this` is `undefined` (or `window`)
4. `bind` creates a NEW function with `this` locked in

## 🏆 Bonus Challenges

1. Fix it using an arrow function instead of `bind`
2. Use `call` or `apply` to invoke with a different `this`
3. Create a method that has a callback with `this` issues
4. Build a timer object that uses `bind` correctly

## ✅ Solution

Check `solution.js` for complete explanations.


