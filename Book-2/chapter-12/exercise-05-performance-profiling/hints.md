# Exercise 05: Performance Profiling - Hints

## 🔍 Quick Performance Guide

### Recording a Profile
1. Performance tab → Record
2. Interact with app (5-10s max)
3. Stop → Analyze

### Reading the Profile

**FPS Chart:**
- Green = Good (60 FPS)
- Yellow/Red = Bad (< 30 FPS)

**Main Thread:**
- Long yellow blocks = Long tasks
- Look for > 50ms tasks

**Memory:**
- Should stay relatively flat
- Growing = memory leak

### Common Fixes

**React Re-renders:**
```jsx
// ❌ Re-renders every time
<ExpensiveList items={items} />

// ✅ Memo prevents unnecessary renders
const MemoList = React.memo(ExpensiveList);
<MemoList items={items} />
```

**Expensive Calculations:**
```jsx
// ❌ Recalculates every render
const sorted = items.sort();

// ✅ Only recalculates when items change
const sorted = useMemo(() => items.sort(), [items]);
```

**Virtual Scrolling:**
```jsx
// ❌ Renders 10,000 items
{items.map(item => <Item key={item.id} {...item} />)}

// ✅ Only renders visible items
<VirtualList items={items} itemHeight={50} />
```

**Image Optimization:**
```html
<!-- ❌ Large image -->
<img src="large.jpg" />

<!-- ✅ Optimized -->
<img
  src="small.webp"
  srcset="small.webp 300w, medium.webp 600w, large.webp 1200w"
  loading="lazy"
/>
```

**Code Splitting:**
```javascript
// ❌ Load everything
import HeavyComponent from './Heavy';

// ✅ Load on demand
const HeavyComponent = lazy(() => import('./Heavy'));
```

### Memory Leak Detection
1. Memory tab → Take snapshot
2. Interact with app
3. Take another snapshot
4. Compare → Memory should be stable

---
**Optimize for the user experience!** ⚡


