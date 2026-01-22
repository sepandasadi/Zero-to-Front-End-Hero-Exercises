# Chapter 22: Functional Programming - Quiz

## Multiple Choice
**1. What is a pure function?** a) Function without return b) Same input → same output, no side effects c) Function with one parameter d) Async function | **Answer**: b
**2. Which is immutable update?** a) `arr.push(item)` b) `arr = [...arr, item]` c) `obj.prop = value` d) `arr[0] = value` | **Answer**: b
**3. What is function composition?** a) Writing long functions b) Combining small functions into larger ones c) Using classes d) Recursive functions | **Answer**: b
**4. What is a higher-order function?** a) Fast function b) Function that takes/returns functions c) Recursive function d) Pure function | **Answer**: b
**5. What is recursion base case?** a) First call b) Condition to stop recursion c) Fastest path d) Error handler | **Answer**: b

## True/False
**6. Pure functions are easier to test.** **Answer**: True
**7. Array.map() mutates the original array.** **Answer**: False
**8. Recursion always uses less memory than loops.** **Answer**: False
**9. compose() applies functions right-to-left.** **Answer**: True
**10. Immutability prevents bugs.** **Answer**: True (helps prevent)

## Code Output
**11. What returns?** `const add = x => y => x + y; add(2)(3)` **Answer**: 5
**12. What returns?** `[1,2,3].map(x => x * 2)` **Answer**: [2,4,6]
**13. What returns?** `[1,2,3,4].filter(x => x % 2 === 0)` **Answer**: [2,4]
**14. Mutation?** `const a = {x:1}; const b = {...a, y:2}; b.x = 9; a.x === ?` **Answer**: 1
**15. What returns?** `const fact = n => n <= 1 ? 1 : n * fact(n-1); fact(5)` **Answer**: 120
