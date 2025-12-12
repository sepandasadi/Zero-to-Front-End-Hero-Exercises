# Chapter 23: JavaScript Fundamentals - Quiz

Test your understanding of JavaScript fundamentals! This quiz covers variables, data types, operators, conditionals, loops, and basic DOM manipulation.

**Instructions:**
- Answer each question to the best of your ability
- Some questions have multiple correct answers
- Try to answer without looking at the chapter first
- Answers with explanations are provided at the bottom
- Be honest with yourself—struggling means you're learning!

---

## Questions

### 1. What is JavaScript primarily used for?

A) Styling websites
B) Adding interactivity and behavior to websites
C) Defining the structure of web pages
D) Managing databases

---

### 2. Which of the following is the correct way to declare a variable that won't change?

A) `var name = "Alex";`
B) `let name = "Alex";`
C) `const name = "Alex";`
D) `variable name = "Alex";`

---

### 3. What's the difference between `let` and `const`?

A) `let` is for strings, `const` is for numbers
B) `let` can be reassigned, `const` cannot
C) `const` is faster than `let`
D) They're exactly the same

---

### 4. What will this code output?
```js
const age = 25;
console.log(typeof age);
```

A) `25`
B) `"number"`
C) `"string"`
D) `number`

---

### 5. Which is the correct way to create a template literal?

A) `"Hello, " + name + "!"`
B) `'Hello, ${name}!'`
C) `` `Hello, ${name}!` ``
D) `"Hello, ${name}!"`

---

### 6. What does `===` do?

A) Assigns a value
B) Checks if two values are equal (loose equality)
C) Checks if two values are equal AND the same type (strict equality)
D) Checks if one value is greater than another

---

### 7. What's wrong with this code?
```js
const score = 100;
score = 200;
```

A) Nothing, it's correct
B) You can't reassign a `const` variable
C) Missing semicolon
D) `const` only works with strings

---

### 8. What does this code output?
```js
console.log(5 == "5");
console.log(5 === "5");
```

A) `true`, `true`
B) `false`, `false`
C) `true`, `false`
D) `false`, `true`

---

### 9. Which comparison operator should you use in modern JavaScript?

A) `==` and `!=`
B) `===` and `!==`
C) Both are equally good
D) It doesn't matter

---

### 10. What does the `&&` (AND) operator do?

A) Returns true if at least one condition is true
B) Returns true only if both conditions are true
C) Flips true to false
D) Adds two numbers

---

### 11. What will this code output?
```js
const age = 16;
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
```

A) `Adult`
B) `Minor`
C) `undefined`
D) Error

---

### 12. How many times will this loop run?
```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

A) 4 times
B) 5 times
C) 6 times
D) Infinite times

---

### 13. What does `i++` do?

A) Multiplies i by 2
B) Adds 1 to i
C) Subtracts 1 from i
D) Sets i to 0

---

### 14. What's the output of this loop?
```js
for (let i = 1; i <= 3; i++) {
  console.log(i);
}
```

A) `0 1 2`
B) `1 2 3`
C) `1 2 3 4`
D) `0 1 2 3`

---

### 15. How do you select an HTML element with id="myButton"?

A) `document.get('myButton')`
B) `document.getElementById('myButton')`
C) `document.select('#myButton')`
D) `get.element('myButton')`

---

### 16. What does `addEventListener` do?

A) Creates a new element
B) Deletes an element
C) Waits for an event (like a click) and runs code when it happens
D) Changes the style of an element

---

### 17. What's the best tool for debugging JavaScript?

A) Asking your cat
B) `console.log()`
C) Rewriting everything from scratch
D) Giving up

---

### 18. Which is a valid way to change text in an element?

A) `element.text = "New text"`
B) `element.textContent = "New text"`
C) `element.changeText("New text")`
D) `element = "New text"`

---

### 19. What does this ternary operator do?
```js
const message = age >= 18 ? "Welcome" : "Too young";
```

A) Adds age and 18
B) Sets message to "Welcome" if age is 18 or more, otherwise "Too young"
C) Always sets message to "Welcome"
D) Throws an error

---

### 20. What does the modulo operator (%) return?

A) The quotient of a division
B) The remainder after division
C) The square root
D) The absolute value

---

## Bonus Questions

### 21. Why should you avoid using `var` in modern JavaScript?

A) It's too slow
B) It has confusing scoping behavior
C) It doesn't work in browsers
D) It's being removed from JavaScript

---

### 22. What's the difference between `undefined` and `null`?

A) They're exactly the same
B) `undefined` means a variable has no value yet, `null` means intentionally empty
C) `undefined` is for numbers, `null` is for strings
D) `null` is a syntax error

---

### 23. How can you check if a number is even?

A) `if (number % 2 === 0)`
B) `if (number / 2 === 0)`
C) `if (number.isEven())`
D) `if (number % 2 === 1)`

---

### 24. What happens if you forget `let`, `const`, or `var` when declaring a variable?

A) JavaScript creates a global variable (bad practice!)
B) Syntax error
C) The variable becomes undefined
D) Nothing, it's fine

---

### 25. Which loop structure checks the condition AFTER running the code once?

A) `for` loop
B) `while` loop
C) `do...while` loop
D) `forEach` loop

---

## Answer Key

### Basic Questions

**1. B** - Adding interactivity and behavior to websites

JavaScript is the programming language of the web that makes pages interactive. HTML provides structure, CSS provides styling, and JavaScript provides behavior.

---

**2. C** - `const name = "Alex";`

`const` is used for variables that won't be reassigned. It's the recommended default choice.

---

**3. B** - `let` can be reassigned, `const` cannot

```js
let score = 0;
score = 10;  // ✅ Works

const age = 25;
age = 26;  // ❌ Error!
```

---

**4. D** - `number`

The `typeof` operator returns the type as a string. Since age is 25 (a number), it returns `"number"` (but the answer shows it without quotes to represent what appears in the console).

---

**5. C** - `` `Hello, ${name}!` ``

Template literals use backticks and `${}` for embedding variables:
```js
const name = "Alex";
const greeting = `Hello, ${name}!`;  // "Hello, Alex!"
```

---

**6. C** - Checks if two values are equal AND the same type (strict equality)

```js
5 === 5     // true (same value, same type)
5 === "5"   // false (different types)
```

Always use `===` instead of `==` in modern JavaScript.

---

**7. B** - You can't reassign a `const` variable

```js
const score = 100;
score = 200;  // ❌ TypeError: Assignment to constant variable
```

Use `let` if you need to reassign.

---

**8. C** - `true`, `false`

```js
5 == "5"   // true (loose equality converts types)
5 === "5"  // false (strict equality checks type too)
```

This is why you should always use `===` (strict equality).

---

**9. B** - `===` and `!==`

Strict equality operators prevent type coercion bugs. Always use `===` and `!==` in modern JavaScript.

---

**10. B** - Returns true only if both conditions are true

```js
true && true    // true
true && false   // false
false && false  // false
```

Both sides must be true for AND to return true.

---

**11. B** - `Minor`

Since `16 >= 18` is false, the else block runs, outputting "Minor".

---

**12. B** - 5 times

```js
i = 0  // First iteration
i = 1  // Second
i = 2  // Third
i = 3  // Fourth
i = 4  // Fifth
i = 5  // Stops (not less than 5)
```

---

**13. B** - Adds 1 to i

`i++` is shorthand for `i = i + 1`. Similarly, `i--` subtracts 1.

---

**14. B** - `1 2 3`

The loop starts at 1 and goes up to and including 3 (`i <= 3`).

---

**15. B** - `document.getElementById('myButton')`

```js
const button = document.getElementById('myButton');
```

This is the standard way to get an element by its ID.

---

**16. C** - Waits for an event and runs code when it happens

```js
button.addEventListener('click', function() {
  console.log("Button was clicked!");
});
```

---

**17. B** - `console.log()`

While the other options are... creative, `console.log()` is genuinely the most useful debugging tool. Professional developers use it constantly!

---

**18. B** - `element.textContent = "New text"`

```js
const heading = document.getElementById('title');
heading.textContent = "New text";
```

---

**19. B** - Sets message based on age condition

```js
// If age >= 18 is true, use "Welcome"
// Otherwise, use "Too young"
const message = age >= 18 ? "Welcome" : "Too young";
```

This is shorthand for an if/else statement.

---

**20. B** - The remainder after division

```js
10 % 3  // 1 (10 divided by 3 is 3 remainder 1)
10 % 2  // 0 (10 divided by 2 is 5 remainder 0)
```

Useful for checking if numbers are even/odd.

---

### Bonus Answers

**21. B** - It has confusing scoping behavior

`var` has function scope (not block scope) and hoisting behavior that confuses beginners and causes bugs. Use `let` and `const` instead.

---

**22. B** - `undefined` means no value yet, `null` means intentionally empty

```js
let x;           // undefined (forgot to assign)
let y = null;    // null (intentionally set to nothing)
```

---

**23. A** - `if (number % 2 === 0)`

If a number divided by 2 has no remainder, it's even:
```js
if (10 % 2 === 0) {  // 0 remainder = even
  console.log("Even");
}
```

---

**24. A** - JavaScript creates a global variable (bad practice!)

```js
name = "Alex";  // No const/let/var = global variable
```

This causes problems in larger programs. Always use `const` or `let`.

---

**25. C** - `do...while` loop

```js
do {
  console.log("Runs at least once");
} while (false);  // Condition checked after
```

Regular `while` loops check the condition first.

---

## Scoring

- **23-25 correct**: Excellent! You have a strong grasp of JavaScript fundamentals.
- **19-22 correct**: Great job! You understand most concepts well.
- **15-18 correct**: Good! Review the areas you missed and practice more.
- **11-14 correct**: Decent foundation. Revisit Chapter 23 and work through the exercises.
- **Below 11**: Take your time reviewing Chapter 23. Focus on understanding concepts, not memorizing.

---

## Key Takeaways to Remember

1. **Use `const` by default, `let` when needed** - Avoid `var`
2. **Always use `===` and `!==`** - Strict equality prevents bugs
3. **Template literals are powerful** - Use `` `Hello, ${name}!` ``
4. **Conditionals make programs smart** - if/else for decisions
5. **Loops avoid repetition** - Let the computer do the boring work
6. **DOM manipulation makes pages interactive** - getElementById, addEventListener
7. **console.log() is your debugging friend** - Use it liberally
8. **Errors are learning opportunities** - Read them, don't fear them

---

## Next Steps

1. ✅ Review any questions you got wrong
2. 📚 Revisit relevant sections in Chapter 23
3. 💻 Complete the practice exercises
4. 🚀 Build the click counter project
5. 🎮 Try the challenge game
6. 🔄 Experiment and break things—that's how you learn!

---

**Great work completing the quiz!** Every question you answered (right or wrong) helped solidify your understanding. Keep practicing and you'll be amazed at your progress! 🎉

**Ready for hands-on practice?** Head to Exercise 1 and start coding! 💪

