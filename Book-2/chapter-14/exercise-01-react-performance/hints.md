# Hints - Exercise 1: React Performance Optimization

## Stuck? Try These Hints!

### Hint 1: Understanding the Problem

**Question:** Why are all ProductCards re-rendering?

**Answer:** When a parent component (App) re-renders, all child components (ProductCard) also re-render by default, even if their props haven't changed.

**Solution:** Wrap ProductCard in `React.memo()` to prevent unnecessary re-renders.

---

### Hint 2: When to Use useMemo

**Question:** How do I know if I should use useMemo?

**Ask yourself:**
1. Is this calculation expensive? (filtering/sorting arrays, complex math)
2. Does it run on every render?
3. Does the result only change when specific values change?

If yes to all three, use useMemo!

**Example:**
```javascript
// This runs EVERY render
const filtered = products.filter(/* ... */);

// This only runs when products or searchTerm change
const filtered = useMemo(() =>
  products.filter(/* ... */),
  [products, searchTerm]
);
```

---

### Hint 3: useMemo Dependencies

**Question:** What should I put in the dependencies array?

**Rule:** Include ALL values from outside the useMemo that are used inside it.

```javascript
const sortedProducts = useMemo(() => {
  const sorted = [...filteredProducts]; // Uses filteredProducts

  sorted.sort((a, b) => {
    if (sortBy === 'name') { // Uses sortBy
      return a.name.localeCompare(b.name);
    }
    return a.price - b.price;
  });

  return sorted;
}, [filteredProducts, sortBy]); // Both must be in dependencies!
```

---

### Hint 4: React.memo Syntax

**Question:** How exactly do I use React.memo?

**Before:**
```javascript
function ProductCard({ product, onAddToCart }) {
  // component code
}
export default ProductCard;
```

**After:**
```javascript
import React from 'react';

const ProductCard = React.memo(function ProductCard({ product, onAddToCart }) {
  // component code
});

export default ProductCard;
```

Or using an arrow function:
```javascript
const ProductCard = React.memo(({ product, onAddToCart }) => {
  // component code
});
```

---

### Hint 5: useCallback for Event Handlers

**Question:** Why does ProductCard still re-render after React.memo?

**Answer:** The `onAddToCart` function is recreated on every render, which React.memo sees as a "new" prop.

**Solution:**
```javascript
const onAddToCart = useCallback((product) => {
  setCart(prev => [...prev, product]);
}, []); // Empty dependencies because logic doesn't depend on props/state
```

---

### Hint 6: Debugging with Console Logs

**Add console logs to understand when things run:**

```javascript
const filteredProducts = useMemo(() => {
  console.log('🔍 FILTERING - This should only log when searchTerm changes');
  return products.filter(/* ... */);
}, [searchTerm]);

const sortedProducts = useMemo(() => {
  console.log('📊 SORTING - This should only log when filter or sortBy changes');
  // ...
}, [filteredProducts, sortBy]);
```

Type in the search box and watch the console!

---

### Hint 7: Testing with React Profiler

**Step-by-step:**

1. Open React DevTools in browser
2. Click the "Profiler" tab
3. Click the record button (⏺️)
4. Interact with your app (type "laptop")
5. Click stop (⏹️)
6. Look at the flame graph

**What to look for:**
- Gray components = didn't render (good!)
- Colored components = rendered (check if necessary)
- Render time = how long it took

---

### Hint 8: Common Mistake - Inline Functions

**❌ This breaks React.memo:**
```javascript
<ProductCard
  product={product}
  onAddToCart={(product) => addToCart(product)} // NEW function every render!
/>
```

**✅ Use useCallback instead:**
```javascript
const handleAddToCart = useCallback((product) => {
  addToCart(product);
}, []);

<ProductCard
  product={product}
  onAddToCart={handleAddToCart} // SAME function every render ✅
/>
```

---

### Hint 9: When NOT to Optimize

Don't use useMemo/useCallback for:
- Simple calculations (2 + 2)
- Values that change every render anyway
- Component that rarely renders

**Premature optimization is the root of all evil!**

Only optimize when:
1. You measure a performance problem
2. The component renders frequently
3. The calculation is expensive

---

### Hint 10: Verification Checklist

After implementing all optimizations, verify:

- [ ] ProductCard is wrapped in React.memo
- [ ] filteredProducts uses useMemo with [searchTerm] dependency
- [ ] sortedProducts uses useMemo with [filteredProducts, sortBy] dependencies
- [ ] onAddToCart uses useCallback with [] dependencies
- [ ] Console logs only appear when dependencies actually change
- [ ] React Profiler shows ProductCards as "Did not render"
- [ ] Typing in search feels instant (no lag)

---

### Hint 11: Order of Operations

**Recommended implementation order:**

1. **First:** Add useMemo for filtering (immediate feedback in console)
2. **Second:** Add useMemo for sorting (see both memoizations working)
3. **Third:** Add React.memo to ProductCard (but it might still re-render...)
4. **Fourth:** Add useCallback for onAddToCart (now ProductCard won't re-render!)

This order helps you understand each optimization independently.

---

### Hint 12: Understanding React.memo Comparison

React.memo does a **shallow comparison** of props:

```javascript
// These will SKIP re-render (shallow equal):
prevProps.product.id === nextProps.product.id // same object reference
prevProps.onAddToCart === nextProps.onAddToCart // same function reference

// These will CAUSE re-render (not shallow equal):
prevProps.onAddToCart !== nextProps.onAddToCart // different function!
```

That's why useCallback is important - it keeps function references stable!

---

### Still Stuck?

1. **Check the solution** - Compare your code with the solution folder
2. **Read console logs** - They tell you what's running
3. **Use React Profiler** - Visual feedback on renders
4. **Review the README** - Step-by-step tasks with code examples

Remember: Performance optimization is about measuring, optimizing, and verifying. Always profile before and after!

Good luck! 🚀

