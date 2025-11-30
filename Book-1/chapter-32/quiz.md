# Chapter 32 Quiz: Advanced JavaScript Patterns

Test your understanding of Generators, Proxy, WeakMap, WeakSet, Symbols, and advanced JavaScript patterns.

---

## Question 1: Generator Functions (Basic)

What's the difference between a regular function and a generator function?

**A)** Generator functions are faster
**B)** Generator functions can pause and resume execution
**C)** Generator functions don't return values
**D)** There's no difference

<details>
<summary>Show Answer</summary>

**Answer: B**

Generator functions can pause execution with `yield` and resume later:

```javascript
// Regular function
function regular() {
  return 1;
  return 2; // Never executes
}

// Generator function
function* generator() {
  yield 1;  // Pause here
  yield 2;  // Resume and pause here
  yield 3;  // Resume and pause here
}

const gen = generator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

Key differences:
- Declared with `function*`
- Use `yield` instead of `return`
- Return an iterator object
- Execution is pauseable
- State is maintained between calls
</details>

---

## Question 2: Generator Syntax

Which creates a generator function?

**A)** `function generator() { yield 1; }`
**B)** `function* generator() { yield 1; }`
**C)** `async function generator() { yield 1; }`
**D)** `generator function() { yield 1; }`

<details>
<summary>Show Answer</summary>

**Answer: B**

Generator functions require the `*` asterisk:

```javascript
// ✓ Correct
function* myGenerator() {
  yield 1;
  yield 2;
}

// Also correct (different position)
function *myGenerator() { yield 1; }
function*myGenerator() { yield 1; }

// Object method
const obj = {
  *generator() {
    yield 1;
  }
};

// Class method
class MyClass {
  *generator() {
    yield 1;
  }
}

// ✗ Wrong - missing *
function notAGenerator() {
  yield 1; // SyntaxError!
}
```

The `*` can be placed:
- After `function`
- Before function name
- No space between (style choice)
</details>

---

## Question 3: Infinite Generators

Can generators create infinite sequences?

**A)** No, they would crash
**B)** Yes, because they're lazy and compute on demand
**C)** Only with special syntax
**D)** Only in Node.js

<details>
<summary>Show Answer</summary>

**Answer: B**

Generators are lazy - they only compute when requested:

```javascript
// Infinite ID generator
function* infiniteIds() {
  let id = 1;
  while (true) { // Infinite loop is OK!
    yield `ID-${id++}`;
  }
}

const ids = infiniteIds();
console.log(ids.next().value); // "ID-1"
console.log(ids.next().value); // "ID-2"
console.log(ids.next().value); // "ID-3"
// Can keep calling forever!

// Infinite Fibonacci
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
for (let i = 0; i < 10; i++) {
  console.log(fib.next().value);
}
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34

// Take first N values
function* take(iterable, n) {
  let count = 0;
  for (const value of iterable) {
    if (count++ >= n) break;
    yield value;
  }
}

const first10Fib = [...take(fibonacci(), 10)];
```

This is safe because:
- Generators are lazy (compute on demand)
- You control when to stop
- Memory efficient
</details>

---

## Question 4: Custom Iterators

How do you make an object iterable?

**A)** Add a `.next()` method
**B)** Implement `Symbol.iterator`
**C)** Use `Object.makeIterable()`
**D)** Objects are automatically iterable

<details>
<summary>Show Answer</summary>

**Answer: B**

Implement `Symbol.iterator` to make objects work with `for...of`:

```javascript
// Make a range iterable
const range = {
  start: 1,
  end: 5,

  // Must use [Symbol.iterator]
  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) {
      yield i;
    }
  }
};

// Now works with for...of
for (const num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}

// Also works with spread
const arr = [...range]; // [1, 2, 3, 4, 5]

// Without generator
const range2 = {
  start: 1,
  end: 5,

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for (const num of range2) {
  console.log(num); // 1, 2, 3, 4, 5
}
```

Anything with `Symbol.iterator` is iterable:
- Arrays, Strings, Maps, Sets (built-in)
- Custom objects (if you add it)
</details>

---

## Question 5: Proxy Basics

What does a Proxy do?

**A)** Speeds up object access
**B)** Intercepts and customizes object operations
**C)** Creates a copy of an object
**D)** Makes objects immutable

<details>
<summary>Show Answer</summary>

**Answer: B**

Proxy intercepts operations on objects:

```javascript
const target = { name: 'John', age: 30 };

const handler = {
  // Intercept property access
  get(target, property) {
    console.log(`Getting ${property}`);
    return target[property];
  },

  // Intercept property assignment
  set(target, property, value) {
    console.log(`Setting ${property} = ${value}`);
    target[property] = value;
    return true; // Indicates success
  }
};

const proxy = new Proxy(target, handler);

proxy.name; // Logs: "Getting name"
proxy.age = 31; // Logs: "Setting age = 31"
```

Proxy can intercept:
- `get` - Property access
- `set` - Property assignment
- `has` - `in` operator
- `deleteProperty` - `delete` operator
- `apply` - Function calls
- `construct` - `new` operator
- And 13 more traps!

**Real-world uses:**
- Vue 3 reactivity
- Redux Toolkit's Immer
- Validation
- Default values
- Logging/debugging
</details>

---

## Question 6: Proxy Validation

How would you use a Proxy to validate data?

**A)** Proxies can't validate
**B)** Intercept `set` and throw errors for invalid values
**C)** Use a validation library
**D)** Proxies only read data

<details>
<summary>Show Answer</summary>

**Answer: B**

Validate in the `set` trap:

```javascript
const validator = {
  set(target, property, value) {
    // Validate age
    if (property === 'age') {
      if (typeof value !== 'number') {
        throw new TypeError('Age must be a number');
      }
      if (value < 0 || value > 150) {
        throw new RangeError('Age must be between 0 and 150');
      }
    }

    // Validate email
    if (property === 'email') {
      if (!value.includes('@')) {
        throw new Error('Invalid email address');
      }
    }

    // If valid, set the value
    target[property] = value;
    return true;
  }
};

const user = new Proxy({}, validator);

user.age = 30;           // ✓ OK
user.age = 'thirty';     // ✗ TypeError
user.age = 200;          // ✗ RangeError
user.email = 'john@example.com'; // ✓ OK
user.email = 'invalid';  // ✗ Error

// More advanced: Schema validation
function createValidatedObject(schema) {
  return new Proxy({}, {
    set(target, prop, value) {
      const validator = schema[prop];

      if (!validator) {
        throw new Error(`Property ${prop} not in schema`);
      }

      if (!validator(value)) {
        throw new Error(`Invalid value for ${prop}`);
      }

      target[prop] = value;
      return true;
    }
  });
}

const schema = {
  name: value => typeof value === 'string' && value.length > 0,
  age: value => typeof value === 'number' && value >= 0,
  email: value => typeof value === 'string' && value.includes('@')
};

const validatedUser = createValidatedObject(schema);
validatedUser.name = 'John';        // ✓ OK
validatedUser.age = -5;             // ✗ Error
validatedUser.unknown = 'value';    // ✗ Error (not in schema)
```
</details>

---

## Question 7: Reflect API

What is the Reflect API used for with Proxies?

**A)** Mirror objects
**B)** Provide default behavior for proxy traps
**C)** Reflect is unrelated to Proxy
**D)** Create reflections of functions

<details>
<summary>Show Answer</summary>

**Answer: B**

Reflect provides default implementations for all proxy traps:

```javascript
const handler = {
  get(target, property) {
    console.log(`Getting ${property}`);

    // Use Reflect for default behavior
    return Reflect.get(target, property);

    // Instead of:
    // return target[property];
  },

  set(target, property, value) {
    console.log(`Setting ${property} = ${value}`);

    // Validate
    if (property === 'age' && value < 0) {
      return false; // Reject
    }

    // Use Reflect for default behavior
    return Reflect.set(target, property, value);
  }
};

const proxy = new Proxy({ name: 'John' }, handler);
```

Why use Reflect instead of direct access?

```javascript
// Problem with direct access
const handler = {
  get(target, property, receiver) {
    // Wrong - doesn't preserve receiver
    return target[property];
  }
};

// Correct with Reflect
const handler = {
  get(target, property, receiver) {
    // Preserves receiver (this binding)
    return Reflect.get(target, property, receiver);
  }
};

// Matters for getters
const obj = {
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

const proxy = new Proxy(obj, handler);
proxy.firstName = 'John';
proxy.lastName = 'Doe';
console.log(proxy.fullName); // Works correctly
```

Reflect methods:
- `Reflect.get()`
- `Reflect.set()`
- `Reflect.has()`
- `Reflect.deleteProperty()`
- `Reflect.apply()`
- `Reflect.construct()`
- And more!
</details>

---

## Question 8: WeakMap vs Map

What's the main difference between Map and WeakMap?

**A)** WeakMap is faster
**B)** WeakMap keys must be objects and are weakly referenced
**C)** WeakMap can store more data
**D)** WeakMap is deprecated

<details>
<summary>Show Answer</summary>

**Answer: B**

WeakMap uses weak references and requires object keys:

```javascript
// Map - strong references
const map = new Map();
let obj = { data: 'test' };
map.set(obj, 'value');

obj = null; // Object still in memory! (referenced by map)
// Memory leak if you forget to clean up

// WeakMap - weak references
const weakMap = new WeakMap();
let obj2 = { data: 'test' };
weakMap.set(obj2, 'value');

obj2 = null; // Object can be garbage collected!
// WeakMap entry automatically removed
```

**Map:**
- Keys can be any type
- Has `.size` property
- Can iterate (`.forEach()`, `for...of`)
- Keys prevent garbage collection
- Can enumerate all keys

```javascript
const map = new Map();
map.set('string', 1);
map.set(42, 2);
map.set({}, 3);

console.log(map.size); // 3

for (const [key, value] of map) {
  console.log(key, value);
}
```

**WeakMap:**
- Keys MUST be objects
- No `.size` property
- Can't iterate
- Weak references (auto garbage collection)
- Can't enumerate keys

```javascript
const weakMap = new WeakMap();

weakMap.set({}, 1);    // ✓ OK
weakMap.set('str', 2); // ✗ TypeError: key must be object

// No iteration
weakMap.forEach();     // ✗ TypeError
weakMap.size;          // undefined
for (const x of weakMap) {} // ✗ TypeError
```

**When to use:**
- Use Map: When you need iteration, size, or primitive keys
- Use WeakMap: For private data, metadata, caching (prevents memory leaks)
</details>

---

## Question 9: WeakMap Use Case

What's the best use case for WeakMap?

**A)** Storing configuration
**B)** Caching API responses
**C)** Storing private instance data
**D)** Creating constants

<details>
<summary>Show Answer</summary>

**Answer: C**

WeakMap is perfect for private data:

```javascript
// Private data pattern
const privateData = new WeakMap();

class User {
  constructor(name, password) {
    // Public property
    this.name = name;

    // Private data stored in WeakMap
    privateData.set(this, {
      password,
      loginCount: 0
    });
  }

  login(password) {
    const data = privateData.get(this);

    if (data.password === password) {
      data.loginCount++;
      return true;
    }
    return false;
  }

  getLoginCount() {
    return privateData.get(this).loginCount;
  }
}

const user = new User('John', 'secret123');

console.log(user.name);           // "John" (public)
console.log(user.password);       // undefined (truly private!)
console.log(user.getLoginCount()); // 0

user.login('secret123');
console.log(user.getLoginCount()); // 1

// When user is garbage collected, WeakMap entry auto-removed
```

**Other use cases:**

1. **DOM Element Metadata:**
```javascript
const metadata = new WeakMap();

function addClickTracker(element) {
  metadata.set(element, {
    clicks: 0,
    created: Date.now()
  });

  element.addEventListener('click', () => {
    metadata.get(element).clicks++;
  });
}

// When element is removed from DOM, metadata is auto-cleaned!
```

2. **Object Caching:**
```javascript
const cache = new WeakMap();

function expensiveOperation(obj) {
  if (cache.has(obj)) {
    return cache.get(obj);
  }

  const result = /* expensive computation */;
  cache.set(obj, result);
  return result;
}

// Cache auto-cleans when object is GC'd
```
</details>

---

## Question 10: Symbols

What are Symbols used for?

**A)** Storing strings efficiently
**B)** Creating unique identifiers
**C)** Mathematical operations
**D)** Drawing shapes

<details>
<summary>Show Answer</summary>

**Answer: B**

Symbols create unique, unforgeable identifiers:

```javascript
// Each Symbol is unique
const sym1 = Symbol('description');
const sym2 = Symbol('description');

console.log(sym1 === sym2); // false (unique!)

// Use as object keys
const obj = {
  [sym1]: 'value1',
  [sym2]: 'value2',
  normalKey: 'value3'
};

console.log(obj[sym1]); // "value1"
console.log(obj[sym2]); // "value2"

// Hidden from normal iteration
Object.keys(obj);          // ['normalKey']
for (const key in obj) {}  // Only 'normalKey'
JSON.stringify(obj);       // {"normalKey":"value3"}

// But accessible via:
Object.getOwnPropertySymbols(obj); // [sym1, sym2]
Reflect.ownKeys(obj);             // ['normalKey', sym1, sym2]
```

**Common uses:**

1. **Well-known Symbols (meta-programming):**
```javascript
Symbol.iterator   // Make object iterable
Symbol.toStringTag // Custom [object Type]
Symbol.hasInstance // Custom instanceof
Symbol.toPrimitive // Custom type coercion

class MyArray {
  [Symbol.iterator]() {
    // Custom iteration
  }

  get [Symbol.toStringTag]() {
    return 'MyArray';
  }
}
```

2. **Private-ish Properties:**
```javascript
const _internal = Symbol('internal');

class MyClass {
  constructor() {
    this[_internal] = 'hidden';
    this.public = 'visible';
  }

  getInternal() {
    return this[_internal];
  }
}

const obj = new MyClass();
console.log(obj.public);    // "visible"
console.log(obj._internal); // undefined
console.log(Object.keys(obj)); // ['public']
```

3. **Preventing Collisions:**
```javascript
// Library A
const MY_KEY = Symbol('key');
obj[MY_KEY] = 'A';

// Library B (different Symbol)
const MY_KEY = Symbol('key');
obj[MY_KEY] = 'B';

// No collision!
```
</details>

---

## Question 11: Observable Pattern with Proxy

How would Vue-style reactivity work with Proxy?

**A)** Proxies can't track changes
**B)** Intercept set, notify subscribers
**C)** Use polling
**D)** Requires external library

<details>
<summary>Show Answer</summary>

**Answer: B**

Vue 3's reactivity uses Proxy to track changes:

```javascript
// Simplified Vue-style reactivity
function reactive(target) {
  const subscribers = new Set();

  return new Proxy(target, {
    get(target, property) {
      // Track which properties are accessed
      return Reflect.get(target, property);
    },

    set(target, property, value) {
      const oldValue = target[property];
      const result = Reflect.set(target, property, value);

      // Notify subscribers when value changes
      if (oldValue !== value) {
        subscribers.forEach(fn => fn(property, value, oldValue));
      }

      return result;
    }
  });

  // Add subscribe method
  reactive.subscribe = (fn) => {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  };

  return reactive;
}

// Usage
const state = reactive({ count: 0, name: 'John' });

// Subscribe to changes
const unsubscribe = state.subscribe((prop, newVal, oldVal) => {
  console.log(`${prop} changed from ${oldVal} to ${newVal}`);
});

state.count++; // Logs: "count changed from 0 to 1"
state.name = 'Jane'; // Logs: "name changed from John to Jane"

unsubscribe(); // Stop listening

// More advanced: computed properties
function computed(getter) {
  let cached;
  let dirty = true;

  const runner = new Proxy({}, {
    get(target, property) {
      // Re-run getter when accessed and dirty
      if (dirty) {
        cached = getter();
        dirty = false;
      }
      return cached;
    }
  });

  // Mark dirty when dependencies change
  state.subscribe(() => {
    dirty = true;
  });

  return runner;
}

const state = reactive({ firstName: 'John', lastName: 'Doe' });

const fullName = computed(() => {
  console.log('Computing...');
  return `${state.firstName} ${state.lastName}`;
});

console.log(fullName.value); // Computing... "John Doe"
console.log(fullName.value); // "John Doe" (cached!)

state.firstName = 'Jane';
console.log(fullName.value); // Computing... "Jane Doe"
```

This is essentially how Vue 3 and MobX work!
</details>

---

## Question 12: Generator Return Value

What does calling a generator function return?

**A)** The first yielded value
**B)** An iterator object
**C)** undefined
**D)** An array of all yielded values

<details>
<summary>Show Answer</summary>

**Answer: B**

Generator functions return an iterator:

```javascript
function* myGenerator() {
  yield 1;
  yield 2;
  return 3;
}

const gen = myGenerator(); // Returns iterator object

console.log(typeof gen);       // "object"
console.log(gen.next);         // function
console.log(gen[Symbol.iterator]); // function

// Iterator methods
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: true }
console.log(gen.next()); // { value: undefined, done: true }

// Iterators are iterable
const gen2 = myGenerator();
for (const value of gen2) {
  console.log(value); // 1, 2 (return value not included!)
}

// Convert to array (excludes return value)
const gen3 = myGenerator();
console.log([...gen3]); // [1, 2]
```

**Iterator object has:**
- `.next()` - Get next value
- `[Symbol.iterator]()` - Makes it iterable
- `.return()` - Early exit
- `.throw()` - Inject error

```javascript
function* gen() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } catch (e) {
    console.log('Caught:', e);
  }
}

const iterator = gen();
console.log(iterator.next());     // { value: 1, done: false }
console.log(iterator.throw('error')); // Logs: "Caught: error"
console.log(iterator.return(999)); // { value: 999, done: true }
```
</details>

---

## Question 13: Proxy Performance

When should you NOT use Proxy?

**A)** For reactivity systems
**B)** For hot code paths (performance-critical code)
**C)** For validation
**D)** For logging

<details>
<summary>Show Answer</summary>

**Answer: B**

Proxies have overhead - avoid in performance-critical code:

```javascript
// ✗ Bad: Proxy in tight loop
const data = new Proxy([], {
  get(target, prop) {
    console.log('Access'); // Expensive operation
    return target[prop];
  }
});

// This will be slow!
for (let i = 0; i < 1000000; i++) {
  data.push(i); // Each access triggers proxy
}

// ✓ Good: Use plain objects for performance
const data = [];
for (let i = 0; i < 1000000; i++) {
  data.push(i); // Fast!
}
```

**Performance tips:**

1. **Use Proxies sparingly:**
```javascript
// ✗ Bad: Proxy for every object
function createTodo(text) {
  return new Proxy({ text, done: false }, handler);
}

// ✓ Good: Proxy for container only
const todos = new Proxy([], handler);
todos.push({ text: 'Task', done: false }); // Only array is proxied
```

2. **Avoid in tight loops:**
```javascript
// ✗ Bad
for (let i = 0; i < 1000000; i++) {
  proxy.count++; // Proxy overhead per iteration
}

// ✓ Good
let temp = proxy.count;
for (let i = 0; i < 1000000; i++) {
  temp++; // Fast
}
proxy.count = temp; // Single proxy operation
```

3. **Cache proxy results:**
```javascript
const cache = new WeakMap();

function createProxy(obj) {
  if (cache.has(obj)) {
    return cache.get(obj);
  }

  const proxy = new Proxy(obj, handler);
  cache.set(obj, proxy);
  return proxy;
}
```

**When Proxies are worth it:**
- Reactivity systems (Vue, MobX)
- Validation layers
- Development tools/debugging
- API abstractions
- Not in tight loops!
</details>

---

## Question 14: WeakSet Use Case

What's a good use case for WeakSet?

**A)** Storing user IDs
**B)** Tracking processed objects without memory leaks
**C)** Creating unique arrays
**D)** Storing primitive values

<details>
<summary>Show Answer</summary>

**Answer: B**

WeakSet is perfect for tracking objects:

```javascript
// Track processed objects
const processed = new WeakSet();

function processUser(user) {
  if (processed.has(user)) {
    console.log('Already processed!');
    return;
  }

  // Do expensive operation
  console.log(`Processing ${user.name}...`);

  // Mark as processed
  processed.add(user);
}

const user1 = { name: 'Alice' };
const user2 = { name: 'Bob' };

processUser(user1); // "Processing Alice..."
processUser(user1); // "Already processed!"
processUser(user2); // "Processing Bob..."

// When user objects are GC'd, WeakSet auto-cleans!
```

**More use cases:**

1. **DOM Event Tracking:**
```javascript
const listenersAdded = new WeakSet();

function addClickListener(element) {
  if (listenersAdded.has(element)) {
    return; // Already has listener
  }

  element.addEventListener('click', handler);
  listenersAdded.add(element);
}

// Auto-cleanup when element is removed from DOM
```

2. **Object Marking:**
```javascript
const marked = new WeakSet();

function markForUpdate(obj) {
  marked.add(obj);
}

function isMarked(obj) {
  return marked.has(obj);
}

function processMarked(objects) {
  return objects.filter(obj => isMarked(obj));
}
```

3. **Preventing Circular References:**
```javascript
const seen = new WeakSet();

function stringify(obj) {
  if (seen.has(obj)) {
    return '[Circular]';
  }

  seen.add(obj);

  // ... stringify logic
}
```

**WeakSet vs Set:**

```javascript
// Set - strong references
const set = new Set();
let obj = {};
set.add(obj);
obj = null; // Object still in memory! (in Set)

// WeakSet - weak references
const weakSet = new WeakSet();
let obj2 = {};
weakSet.add(obj2);
obj2 = null; // Object can be GC'd!
```
</details>

---

## Question 15: Advanced Pattern Combination

Which pattern combines Proxy, WeakMap, and Symbols?

**A)** Singleton pattern
**B)** Reactive state management
**C)** Factory pattern
**D)** Observer pattern

<details>
<summary>Show Answer</summary>

**Answer: B**

Reactive state combines all three:

```javascript
// Symbols for privacy
const _subscribers = Symbol('subscribers');
const _state = Symbol('state');

// WeakMap for truly private data
const privateData = new WeakMap();

class ReactiveStore {
  constructor(initialState) {
    // Store private data
    privateData.set(this, {
      [_state]: initialState,
      [_subscribers]: new Set()
    });

    // Create reactive proxy
    return new Proxy(this, {
      get(target, property) {
        if (property === 'state') {
          // Return proxied state
          const data = privateData.get(target);
          return new Proxy(data[_state], {
            set(stateTarget, prop, value) {
              const oldValue = stateTarget[prop];
              stateTarget[prop] = value;

              // Notify subscribers
              if (oldValue !== value) {
                data[_subscribers].forEach(fn => {
                  fn(prop, value, oldValue);
                });
              }

              return true;
            }
          });
        }

        return Reflect.get(target, property);
      }
    });
  }

  subscribe(callback) {
    const data = privateData.get(this);
    data[_subscribers].add(callback);

    // Return unsubscribe function
    return () => data[_subscribers].delete(callback);
  }

  getState() {
    return privateData.get(this)[_state];
  }
}

// Usage
const store = new ReactiveStore({
  count: 0,
  user: { name: 'John' }
});

// Subscribe to changes
const unsubscribe = store.subscribe((prop, newVal, oldVal) => {
  console.log(`${prop}: ${oldVal} → ${newVal}`);

  // Update UI
  document.getElementById(prop).textContent = newVal;
});

// Reactive state
store.state.count++; // Triggers subscriber!
store.state.user = { name: 'Jane' }; // Triggers subscriber!

// Private data is truly private
console.log(store[_subscribers]); // undefined
console.log(store[_state]);       // undefined

// Clean up
unsubscribe();

// When store is GC'd, WeakMap auto-cleans!
```

**Why this pattern is powerful:**

1. **Proxy:** Automatic change detection
2. **WeakMap:** True privacy + auto cleanup
3. **Symbols:** Hide implementation details

**Real frameworks using this:**
- Vue 3 (Proxy reactivity)
- MobX (Proxy observables)
- Redux Toolkit (Immer with Proxy)

This is graduate-level JavaScript! 🎓
</details>

---

## Scoring

- **13-15 correct**: Master! 🏆 You understand advanced patterns deeply!
- **10-12 correct**: Excellent! 🌟 Great grasp of advanced concepts
- **7-9 correct**: Good! 📚 You understand the basics, practice more
- **4-6 correct**: Learning! 🔄 Review exercises and try building something
- **Below 4**: Keep Going! 💪 These are advanced - take your time!

---

## Key Takeaways

### Generators
- Pauseable functions with `function*` and `yield`
- Return iterators
- Perfect for lazy evaluation and infinite sequences
- Can create custom iterables with `Symbol.iterator`

### Proxy & Reflect
- Intercept object operations (get, set, etc.)
- Power Vue 3 reactivity and Redux Toolkit
- Use Reflect for default behavior
- Has performance overhead - use wisely

### WeakMap & WeakSet
- Weak references allow garbage collection
- Keys must be objects
- Can't iterate (ensures privacy)
- Perfect for private data and metadata
- No memory leaks!

### Symbols
- Create unique identifiers
- Hidden from normal iteration
- Used for meta-programming (Symbol.iterator, etc.)
- Good for preventing property collisions

### Real-World Applications
- **Vue 3:** Proxy for reactivity
- **MobX:** Proxy for observables
- **Redux Toolkit:** Proxy for Immer
- **React:** WeakMap for component metadata
- **RxJS:** Generators for observables

These patterns power modern frameworks! 🚀

