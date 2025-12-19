# Exercise 3: WeakMap & WeakSet

## 🎯 Objective
Use WeakMap and WeakSet for memory-efficient private data storage.

## 📝 Instructions

1. **Private Data with WeakMap:**
   - Store private instance data
   - Can't iterate or get all keys (true privacy!)
   - Automatic garbage collection

2. **Counter Class:**
   - Create a class that stores count privately
   - Use WeakMap to store private data
   - No way to access count directly

3. **DOM Metadata:**
   - Store metadata for DOM elements
   - Automatic cleanup when element is removed
   - No memory leaks!

4. **WeakSet for Object Tracking:**
   - Track processed objects
   - Prevent duplicate processing
   - Auto cleanup

## 💡 Key Differences

### Map vs WeakMap

**Map:**
- Keys can be anything
- Can iterate (forEach, for...of)
- Keys prevent garbage collection (memory leaks!)
- Has `.size` property

**WeakMap:**
- Keys MUST be objects
- Can't iterate (private!)
- Keys don't prevent garbage collection (auto cleanup!)
- No `.size` property

```javascript
// Map - keeps reference
const map = new Map();
let obj = { data: 'test' };
map.set(obj, 'value');
obj = null; // Object still in memory (referenced by map)

// WeakMap - doesn't keep reference
const weakMap = new WeakMap();
let obj2 = { data: 'test' };
weakMap.set(obj2, 'value');
obj2 = null; // Object can be garbage collected!
```

## ✅ Success Criteria

- Understand when to use WeakMap vs Map
- Can implement true private data
- Avoid memory leaks
- Use WeakSet for object tracking

## 🔥 Real-World Usage

**WeakMap is used for:**
- Private class data (before `#private` syntax)
- Storing DOM metadata
- Caching computed values
- Framework internals (React, Vue)

**Examples:**
- React: Storing component metadata
- Vue: Tracking reactive objects
- Libraries: Storing private state

## ⏱️ Estimated Time
20-30 minutes

