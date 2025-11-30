# Exercise 3: Framework Comparison - Hints

## Overview

This exercise helps you understand the differences and similarities between React, Vue, and Angular by building the same component in all three frameworks.

---

## React Implementation Hints

### Hint 1: State Management
```jsx
const [quantity, setQuantity] = useState(1);
```

React uses hooks for state management. The `useState` hook returns an array with the current value and a setter function.

### Hint 2: Calculated Values
```jsx
const total = (product.price * quantity).toFixed(2);
```

You can calculate derived values directly in the component body. They'll recalculate on every render.

### Hint 3: Event Handlers
```jsx
<button onClick={increment}>+</button>
```

Use camelCase event handlers (`onClick`, not `onclick`). Pass the function reference, not a call.

---

## Vue Implementation Hints

### Hint 1: Props with TypeScript-like Validation
```javascript
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});
```

Vue's `defineProps` provides runtime validation for component inputs.

### Hint 2: Reactive State
```javascript
const quantity = ref(1);
```

Use `ref()` for reactive primitives. Access with `.value` in `<script>`, but not in `<template>`.

### Hint 3: Computed Properties
```javascript
const total = computed(() => {
  return (props.product.price * quantity.value).toFixed(2);
});
```

Computed properties are cached and only recalculate when dependencies change.

### Hint 4: Template Directives
```vue
<button @click="increment">+</button>
<button :disabled="quantity === 0">-</button>
```

- `@click` is shorthand for `v-on:click`
- `:disabled` is shorthand for `v-bind:disabled`

---

## Angular Implementation Hints

### Hint 1: TypeScript Interface
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}
```

Angular requires TypeScript. Define interfaces for type safety.

### Hint 2: Input Decorator
```typescript
@Input() product!: Product;
```

`@Input()` marks a property as receiving data from the parent component. The `!` tells TypeScript this will be assigned.

### Hint 3: Component Property
```typescript
quantity: number = 1;
```

Simple class properties are automatically reactive in Angular.

### Hint 4: Getter for Calculated Values
```typescript
get total(): string {
  return (this.product.price * this.quantity).toFixed(2);
}
```

Getters recalculate whenever dependencies change, similar to computed properties.

### Hint 5: Template Syntax
```html
<img [src]="product.image">
<button (click)="increment()">+</button>
```

- `[property]` for property binding
- `(event)` for event binding
- `{{ value }}` for interpolation

---

## Key Differences Comparison

### State Management

**React:**
```jsx
const [quantity, setQuantity] = useState(1);
setQuantity(quantity + 1);
```

**Vue:**
```javascript
const quantity = ref(1);
quantity.value++;
```

**Angular:**
```typescript
quantity: number = 1;
this.quantity++;
```

---

### Computed Values

**React:**
```jsx
const total = (product.price * quantity).toFixed(2);
// Recalculates on every render
```

**Vue:**
```javascript
const total = computed(() => {
  return (props.product.price * quantity.value).toFixed(2);
});
// Cached, only recalculates when dependencies change
```

**Angular:**
```typescript
get total(): string {
  return (this.product.price * this.quantity).toFixed(2);
}
// Recalculates on change detection
```

---

### Event Handling

**React:**
```jsx
<button onClick={increment}>+</button>
// Pass function reference
```

**Vue:**
```vue
<button @click="increment">+</button>
<!-- Can call directly or pass reference -->
```

**Angular:**
```html
<button (click)="increment()">+</button>
<!-- Always include () to call -->
```

---

### Conditional Attributes

**React:**
```jsx
<button disabled={quantity === 0}>-</button>
```

**Vue:**
```vue
<button :disabled="quantity === 0">-</button>
```

**Angular:**
```html
<button [disabled]="quantity === 0">-</button>
```

---

## Common Patterns

### Pattern 1: Preventing Negative Quantities

All three handle this the same way in logic:

```javascript
function decrement() {
  if (quantity > 0) {
    // decrement
  }
}
```

### Pattern 2: Disabling Buttons

All three can disable the button when quantity is 0, just with different syntax.

---

## Step-by-Step Checklist

### For All Three Frameworks:

- [ ] Set up state/property for quantity (initial value: 1)
- [ ] Create increment function
- [ ] Create decrement function (with guard for 0)
- [ ] Calculate total price
- [ ] Create addToCart function (console.log for now)
- [ ] Render product image
- [ ] Render product name, price, description
- [ ] Render quantity selector (-, number, +)
- [ ] Render total price
- [ ] Render "Add to Cart" button
- [ ] Disable decrement when quantity is 0
- [ ] Disable "Add to Cart" when quantity is 0

---

## Testing Your Implementation

Test the same functionality in all three:

1. **Initial State**
   - Quantity starts at 1
   - Total shows product.price × 1

2. **Increment**
   - Click + button 5 times
   - Quantity shows 6
   - Total updates correctly

3. **Decrement**
   - Click - button until quantity is 0
   - Minus button becomes disabled
   - "Add to Cart" button becomes disabled

4. **Add to Cart**
   - Set quantity to 3
   - Click "Add to Cart"
   - Check console for message

---

## Analysis Questions

After implementing all three, reflect on:

### 1. Which syntax felt most natural?
- React's JSX feels like JavaScript with HTML
- Vue's templates feel like enhanced HTML
- Angular's templates are HTML with powerful directives

### 2. State management differences
- React: Immutable updates with setter functions
- Vue: Mutable updates with reactive refs
- Angular: Direct property mutation

### 3. Which would you choose for:
- **Small project?** Vue (easiest to get started)
- **Large team?** Angular (opinionated structure)
- **Maximum flexibility?** React (choose your own tools)

---

## Common Mistakes

### React Mistake: Mutating State
```jsx
// WRONG:
quantity = quantity + 1;

// CORRECT:
setQuantity(quantity + 1);
```

### Vue Mistake: Forgetting .value
```javascript
// WRONG (in <script setup>):
quantity++;

// CORRECT:
quantity.value++;
```

### Angular Mistake: Forgetting 'this'
```typescript
// WRONG:
increment(): void {
  quantity++;  // ReferenceError
}

// CORRECT:
increment(): void {
  this.quantity++;
}
```

---

## Bonus Challenge

After completing all three, try these:

1. **Add Multiple Products**
   - Create an array of products
   - Render multiple cards
   - Compare how each framework handles lists

2. **Share Cart State**
   - Lift state up to parent component
   - Share cart across components
   - Compare state management approaches

3. **Add Routing**
   - React: React Router
   - Vue: Vue Router
   - Angular: Angular Router
   - Compare routing philosophies

---

## Similarities Across All Three

Despite syntax differences, all three:
- Use component-based architecture
- Have reactive data systems
- Support props/inputs for parent-child communication
- Handle events similarly
- Can calculate derived values
- Support conditional rendering and attribute binding

**The concepts are universal—only the syntax differs!**

---

## What This Exercise Teaches

1. **Syntax is surface-level** - The underlying concepts (state, events, props) are the same
2. **Each framework has trade-offs** - No "best" framework, only best for your needs
3. **Learning one helps you learn others** - Concepts transfer, syntax is just memorization
4. **Choose based on context** - Project size, team, ecosystem, and personal preference all matter

---

## Next Steps

1. Fill out the comparison table in the README
2. Answer the analysis questions
3. Choose which framework feels best for YOU
4. Continue with exercises in your chosen framework
5. Remember: Being proficient in one is better than mediocre in all three!

**Great job comparing frameworks! This understanding will serve you throughout your career.** 🚀

