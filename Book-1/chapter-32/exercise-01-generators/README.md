# Exercise 1: Generators & Iterators

## 🎯 Objective
Create pauseable functions and custom iterables.

## 📝 Instructions

1. **Basic Generator:**
   - Create a generator function
   - Use `yield` to pause and resume
   - Call `.next()` to iterate

2. **Infinite Sequence:**
   - Create an infinite number generator
   - Generate IDs on demand

3. **Custom Iterator:**
   - Make an object iterable with `Symbol.iterator`
   - Use `for...of` loop

4. **Async Generator:**
   - Create a generator that yields async values
   - Useful for pagination

## ✅ Success Criteria

- Generators pause and resume correctly
- Can create infinite sequences safely
- Custom objects work with `for...of`
- Understand when to use generators

## 💡 Hints

- `function*` creates a generator
- `yield` pauses execution
- `.next()` returns `{ value, done }`
- Generators are lazy (compute on demand)

