# Exercise 1: React Performance Optimization

**Difficulty:** ⭐⭐ Intermediate

**Estimated Time:** 45-60 minutes

---

## 🎯 Learning Objectives

By completing this exercise, you will:
- Master React.memo to prevent unnecessary re-renders
- Use useMemo to cache expensive calculations
- Use useCallback to stabilize function references
- Profile React components with React DevTools Profiler
- Measure performance improvements quantitatively

---

## 📋 Scenario

You have a ProductList component that re-renders all products every time the search filter changes, even though most products haven't changed. This causes significant performance issues when dealing with even a moderate number of products (100+).

---

## 🔧 Setup

### Prerequisites
- Node.js 18+ installed
- React 18+ knowledge
- Chrome or Edge browser (for React DevTools)

### Installation

```bash
# Navigate to exercise directory
cd exercise-01-react-performance

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

---

## 📊 Initial Performance Issues

Open the starter app and observe:

1. **Type in the search filter** - Notice that EVERY ProductCard logs "rendered" even though their props didn't change
2. **Change the sort** - Again, all products re-render
3. **Check React DevTools Profiler**:
   - Open React DevTools → Profiler
   - Click record
   - Type one character in the search box
   - Stop recording
   - See all ProductCards highlighted as "rendered"

**Current Problems:**
- `filteredProducts` calculation runs on every render (even when products/searchTerm don't change)
- `sortedProducts` sorts on every render
- All ProductCards re-render when parent re-renders (even with same props)
- `onAddToCart` function is recreated on every render

---

## 🎯 Tasks

### Task 1: Measure Baseline Performance

Before optimizing, measure current performance:

1. Open React DevTools → Profiler
2. Click "Record"
3. Type "laptop" in the search box (6 keystrokes)
4. Click "Stop"

**Document:**
- How many times did ProductList render?
- How many times did each ProductCard render?
- What was the total render time?

Save these numbers! You'll compare them after optimization.

---

### Task 2: Optimize with useMemo

**Problem:** `filteredProducts` and sorting logic run on every render.

**Solution:**

1. Wrap the filtering logic in `useMemo`:

```javascript
const filteredProducts = useMemo(() => {
  console.log('🔍 Filtering products...');
  return products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [products, searchTerm]); // Only recalculate when these change
```

2. Wrap the sorting logic in `useMemo`:

```javascript
const sortedProducts = useMemo(() => {
  console.log('📊 Sorting products...');
  const filtered = /* your filtered products */;

  return filtered.sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return a.price - b.price;
  });
}, [filteredProducts, sortBy]); // Dependencies
```

**Test:** Type in search. Console should only show "Filtering" and "Sorting" when searchTerm/sortBy actually change!

---

### Task 3: Optimize ProductCard with React.memo

**Problem:** All ProductCards re-render when parent re-renders, even with same props.

**Solution:**

Wrap ProductCard in `React.memo`:

```javascript
const ProductCard = React.memo(function ProductCard({ product, onAddToCart }) {
  console.log('ProductCard rendered:', product.id);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
});
```

**Test:** Type in search. ProductCards should NOT log "rendered" anymore!

---

### Task 4: Stabilize onAddToCart with useCallback

**Problem:** Even with React.memo, ProductCards might still re-render if `onAddToCart` is recreated on every render.

**Solution:**

Wrap `onAddToCart` in `useCallback`:

```javascript
const onAddToCart = useCallback((product) => {
  console.log('Adding to cart:', product.name);
  // Your add to cart logic here
}, []); // No dependencies if logic doesn't depend on props/state
```

**Test:** Now ProductCards should truly only re-render when their own product data changes!

---

### Task 5: Measure Improved Performance

Repeat the profiling from Task 1:

1. Open React DevTools → Profiler
2. Click "Record"
3. Type "laptop" in the search box (6 keystrokes)
4. Click "Stop"

**Document:**
- How many times did ProductList render? (Should be same as before: 6)
- How many times did each ProductCard render? (Should be 0 or minimal!)
- What was the total render time? (Should be significantly lower!)

---

## ✅ Success Criteria

Your solution should achieve:

- ✅ Typing in search only re-renders ProductList, not individual ProductCards
- ✅ Changing sort only re-renders ProductCards that change position
- ✅ Console logs for filtering/sorting only appear when dependencies change
- ✅ Console logs for "ProductCard rendered" decrease by 90%+
- ✅ React Profiler shows minimal re-renders for ProductCards
- ✅ Total render time improves by 70%+ for list operations

---

## 📈 Expected Results

### Before Optimization
- Typing "laptop" (6 keystrokes):
  - ProductList renders: 6 times
  - Each ProductCard renders: 6 times
  - Total: 600 renders for 100 products
  - Render time: ~300-500ms

### After Optimization
- Typing "laptop" (6 keystrokes):
  - ProductList renders: 6 times
  - Each ProductCard renders: 0 times (props unchanged!)
  - Total: 6 renders
  - Render time: ~10-20ms

**Performance improvement: 95%+ reduction in renders! 🚀**

---

## 🎁 Bonus Challenges

### Bonus 1: Virtualize for 1000+ Products

If you have 1000+ products, even with React.memo, rendering all DOM nodes is slow.

Install react-window:

```bash
npm install react-window
```

Implement virtualization:

```javascript
import { FixedSizeList } from 'react-window';

function ProductList({ products }) {
  // ... filtering and sorting logic ...

  return (
    <FixedSizeList
      height={600}
      itemCount={sortedProducts.length}
      itemSize={120}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <ProductCard product={sortedProducts[index]} />
        </div>
      )}
    </FixedSizeList>
  );
}
```

**Result:** Render 10,000 products in < 50ms!

---

### Bonus 2: Add Performance Metrics

Use the Performance API to measure operations:

```javascript
function ProductList({ products }) {
  const filteredProducts = useMemo(() => {
    performance.mark('filter-start');
    const result = products.filter(/* ... */);
    performance.mark('filter-end');
    performance.measure('filter', 'filter-start', 'filter-end');

    const measure = performance.getEntriesByName('filter')[0];
    console.log(`Filtering took: ${measure.duration.toFixed(2)}ms`);

    return result;
  }, [products, searchTerm]);

  // ...
}
```

---

## 📚 Key Takeaways

- **React.memo**: Prevents component re-renders when props haven't changed
- **useMemo**: Caches expensive computations, recalculates only when dependencies change
- **useCallback**: Stabilizes function references for use with React.memo child components
- **Measure first!**: Always profile before and after optimization to verify improvements
- **Dependencies matter**: Wrong dependencies = bugs or unnecessary recalculations

---

## 🔗 Related Concepts

- Component reconciliation
- Virtual DOM diffing
- Referential equality
- Shallow comparison
- React Profiler

---

## 📖 Further Reading

- [React.memo documentation](https://react.dev/reference/react/memo)
- [useMemo documentation](https://react.dev/reference/react/useMemo)
- [useCallback documentation](https://react.dev/reference/react/useCallback)
- [React Profiler documentation](https://react.dev/reference/react/Profiler)

---

## 🎉 Congratulations!

You've successfully optimized a React component using React.memo, useMemo, and useCallback. These patterns are essential for building performant React applications at scale!

**Next:** Move on to Exercise 2 - Bundle Size Optimization

