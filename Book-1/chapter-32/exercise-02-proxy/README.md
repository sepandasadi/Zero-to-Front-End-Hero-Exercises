# Exercise 2: Proxy & Reflect

## 🎯 Objective
Intercept and customize object behavior using Proxies.

## 📝 Instructions

1. **Basic Proxy:**
   - Intercept property access and assignment
   - Log all operations

2. **Validation Proxy:**
   - Validate data on assignment
   - Throw errors for invalid values

3. **Observable Object:**
   - Trigger callbacks when properties change
   - This is how Vue reactivity works!

4. **Negative Array Indices:**
   - Access arrays Python-style: `arr[-1]` gets last item

## ✅ Success Criteria

- Can intercept get/set operations
- Validation works correctly
- Observable triggers on changes
- Understand Proxy use cases

## 💡 Hints

- `new Proxy(target, handler)`
- Handler methods: `get`, `set`, `has`, `deleteProperty`
- Use `Reflect` for default behavior
- This powers Vue 3 reactivity!

## 🔥 Real-World Usage

**Vue 3 uses Proxies** to make reactive state!

