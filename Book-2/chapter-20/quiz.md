# Chapter 20: Regular Expressions - Quiz

## Multiple Choice

**1. What does `/\d+/` match?**
a) One or more digits  
b) Exactly one digit  
c) Any character  
d) Zero or more digits  
**Answer**: a

**2. What is the difference between `/pattern/` and `/pattern/g`?**
a) No difference  
b) g makes it case insensitive  
c) g finds all matches instead of just first  
d) g makes it multiline  
**Answer**: c

**3. What does `^` mean in a regex?**
a) NOT operator  
b) Start of string  
c) End of string  
d) Any character  
**Answer**: b

**4. Which matches a valid email format?**
a) `/.*@.*/`  
b) `/\w+@\w+\.\w+/`  
c) `/[^@]+@[^@]+\.[^@]+/`  
d) All of the above work  
**Answer**: c (most appropriate)

**5. What does a lookahead `(?=...)` do?**
a) Matches and consumes characters  
b) Matches without consuming characters  
c) Negates the pattern  
d) Creates a capturing group  
**Answer**: b

## True/False

**6. `/[abc]/` matches the literal string "abc".**
**Answer**: False (matches a, b, OR c)

**7. Regex `/test/i` matches "TEST", "Test", and "test".**
**Answer**: True (i flag = case insensitive)

**8. `\d` is equivalent to `[0-9]`.**
**Answer**: True

**9. Regex patterns are always faster than string methods.**
**Answer**: False

**10. Capturing groups are created with parentheses `()`.**
**Answer**: True

## Code Output

**11. What does this match?**
```js
/\b\d{3}-\d{2}-\d{4}\b/.test('123-45-6789')
```
**Answer**: true (SSN pattern)

**12. What's the result?**
```js
'hello world'.match(/\w+/g)
```
**Answer**: ['hello', 'world']

**13. What's the output?**
```js
'test123test'.replace(/\d+/, 'X')
```
**Answer**: 'testXtest' (replaces first match)

**14. What matches?**
```js
/^[a-zA-Z0-9]{8,}$/.test('Pass1234')
```
**Answer**: true

**15. What's the result?**
```js
'(555) 123-4567'.match(/\d+/g)
```
**Answer**: ['555', '123', '4567']

---

## Answer Key
1.a  2.c  3.b  4.c  5.b  6.F  7.T  8.T  9.F  10.T  11.true  12.['hello','world']  13.'testXtest'  14.true  15.['555','123','4567']
