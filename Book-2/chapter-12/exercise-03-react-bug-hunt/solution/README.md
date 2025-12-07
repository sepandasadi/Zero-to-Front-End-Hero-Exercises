# Exercise 03: React Bug Hunt - Solution

This solution demonstrates fixes for all 10 common React bugs:

## Setup

```bash
npm install
npm run dev
```

## Bugs Fixed

1. **Counter.jsx** - Infinite re-render loop
2. **UserProfile.jsx** - Missing useEffect dependencies
3. **Timer.jsx** - Stale closure
4. **WindowSize.jsx** - Memory leak (event listener)
5. **Clock.jsx** - Memory leak (setInterval)
6. **TodoList.jsx** - Object identity issue
7. **ShoppingCart.jsx** - Array mutation
8. **LiveData.jsx** - Missing cleanup (subscription)
9. **SearchBar.jsx** - Async setState issue
10. **ExpensiveList.jsx** - useCallback dependency

## Documentation

- `BUG_REPORT.md` - Detailed bug analysis
- `REACT_DEVTOOLS_GUIDE.md` - How to use React DevTools
- `MEMORY_LEAK_ANALYSIS.md` - Memory leak detection
- `LESSONS_LEARNED.md` - Key takeaways

## All Components Work Correctly

Each component demonstrates the fix and includes comments explaining:
- What the bug was
- Why it occurred
- How it was fixed
- How to prevent it in the future


