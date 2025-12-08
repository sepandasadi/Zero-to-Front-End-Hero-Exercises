# Getting Started - Exercise 1: React Performance Optimization

## Installation

```bash
npm install
```

## Running the App

```bash
npm run dev
```

Then open http://localhost:5173

## Your Task

This app has significant performance issues. Your goal is to optimize it using React performance techniques.

### Current Problems

1. **No React.memo** - ProductCard re-renders even when props don't change
2. **No useMemo** - Filtering and sorting run on every render
3. **No useCallback** - onAddToCart is recreated every render
4. **Performance impact** - 100 products × 6 keystrokes = 600 unnecessary renders!

### Testing Performance

1. Open React DevTools → Profiler
2. Click "Record"
3. Type "laptop" in the search (6 keystrokes)
4. Click "Stop"
5. Notice ALL ProductCards render on every keystroke!

### What You'll Learn

- When to use React.memo
- When to use useMemo
- When to use useCallback
- How to measure performance with React Profiler

### Success Criteria

After optimization:
- ✅ Typing in search only re-renders ProductList, not ProductCards
- ✅ Console logs for "ProductCard rendered" decrease by 90%+
- ✅ React Profiler shows minimal re-renders
- ✅ Total render time improves by 70%+

## Next Steps

1. Read the [README.md](../README.md) for detailed tasks
2. Start with Task 1: Measure baseline performance
3. Follow tasks 2-5 to apply optimizations
4. Measure improvement and verify success criteria

Good luck! 🚀

