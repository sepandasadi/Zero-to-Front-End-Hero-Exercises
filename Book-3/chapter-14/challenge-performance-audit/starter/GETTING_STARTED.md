# Getting Started - Performance Audit & Optimization Sprint

## Welcome to the Challenge! 🚀

This is a **comprehensive performance optimization project** that combines all concepts from Exercises 1-3.

**Your Mission:** Transform this slow, bloated app into a high-performance application.

---

## 📊 Current State (Intentionally Bad!)

```
Bundle Size: 2.5MB (way too large!)
Lighthouse Performance: 25/100 (terrible!)
LCP: 8.5s (should be < 2.5s)
Memory after 5min: 600MB (should be < 100MB)
Load Time (3G): 15+ seconds (unacceptable!)
```

---

## 🎯 Success Criteria

After optimization, achieve:

- ✅ Lighthouse Performance: 90+ (Desktop), 85+ (Mobile)
- ✅ Initial Bundle: < 200KB
- ✅ LCP: < 2.5s
- ✅ INP: < 200ms
- ✅ CLS: < 0.1
- ✅ Memory Stable: < 150MB after 10min
- ✅ All Core Web Vitals: GREEN

---

## 🛠️ Installation

```bash
npm install
```

This installs HEAVY dependencies (intentionally bloated):
- moment.js (~300KB)
- lodash (~250KB)
- recharts (~200KB)
- Material-UI (~180KB)

---

## 🚀 Running the App

```bash
# Development
npm run dev

# Build (check bundle size!)
npm run build

# Preview production build
npm run preview
```

---

## 📋 Phase 1: Baseline Measurement (1 hour)

### Task 1.1: Run Lighthouse Audit

```bash
npm run build
npm run preview
```

1. Open http://localhost:4173 in Chrome
2. Open DevTools → Lighthouse
3. Run audit
4. **Document results** in PERFORMANCE_REPORT.md

### Task 1.2: Bundle Analysis

1. Install bundle analyzer:
   ```bash
   npm install --save-dev rollup-plugin-visualizer
   ```

2. Configure in vite.config.js

3. Build and analyze:
   ```bash
   npm run build
   ```

4. **Document** top 5 largest dependencies

### Task 1.3: React Profiler Recording

1. Open React DevTools → Profiler
2. Navigate to Products page (10,000 items!)
3. Type in search
4. **Document** render times

### Task 1.4: Memory Baseline

1. DevTools → Memory → Heap snapshot
2. Navigate to Dashboard
3. Wait 2 minutes
4. Compare snapshots
5. **Document** memory growth and leaks

---

## 🎯 Phase 2: React Optimizations (3 hours)

### Issues to Fix:

1. ❌ 10,000-item list without virtualization
2. ❌ No React.memo on ProductCard
3. ❌ No useMemo for filtering/sorting
4. ❌ No useCallback for event handlers

**Goal:** Reduce render time from 3000ms to < 50ms (98% improvement!)

---

## 📦 Phase 3: Bundle Optimization (2 hours)

### Issues to Fix:

1. ❌ moment.js (300KB) → Replace with date-fns (20KB)
2. ❌ lodash (250KB) → Use native JavaScript or lodash-es
3. ❌ recharts (200KB) in main bundle → Lazy load
4. ❌ No code splitting
5. ❌ No manual chunking

**Goal:** Reduce bundle from 2.5MB to < 200KB (92% reduction!)

---

## 🔧 Phase 4: Memory Leak Fixes (2 hours)

### Leaks to Find and Fix:

1. ❌ WebSocket connection not closed
2. ❌ Multiple intervals not cleared
3. ❌ Event listeners not removed
4. ❌ Subscriptions not unsubscribed
5. ❌ Data arrays growing indefinitely

**Goal:** Reduce memory from 600MB to < 100MB (83% improvement!)

---

## 📊 Phase 5: Production Monitoring (2 hours)

### Tasks:

1. Install and configure web-vitals
2. Set up real user monitoring (RUM)
3. Configure Lighthouse CI
4. Set performance budgets
5. Add to GitHub Actions

---

## 📈 Phase 6: Final Measurement (1 hour)

Re-run all audits and document improvements:

1. Lighthouse (before vs after)
2. Bundle analyzer (before vs after)
3. React Profiler (before vs after)
4. Memory profiler (before vs after)

Create comprehensive PERFORMANCE_REPORT.md with:
- Executive summary
- Metrics comparison
- Optimizations applied
- Business impact
- Lessons learned

---

## 📦 Deliverables

Submit:

1. ✅ Optimized source code
2. ✅ PERFORMANCE_REPORT.md (complete with metrics)
3. ✅ Lighthouse reports (before/after screenshots)
4. ✅ Bundle analyzer reports (before/after)
5. ✅ Memory profiler screenshots (before/after)
6. ✅ Working Lighthouse CI configuration

---

## 💡 Tips

- **Work in phases** - Don't skip baseline measurement!
- **Measure twice, optimize once** - Always profile before and after
- **Document everything** - Keep detailed notes for your report
- **Test thoroughly** - Make sure nothing breaks
- **Use the exercises** - Reference Exercises 1-3 solutions

---

## 🎁 Bonus Challenges

1. **Achieve Lighthouse 95+**
2. **Deploy to production** (Vercel/Netlify)
3. **Build performance dashboard** (RUM visualization)
4. **Add critical CSS inlining**
5. **Implement service worker**

---

## 🏆 Portfolio Value

This project demonstrates:
- Performance profiling expertise
- React optimization skills
- Bundle optimization knowledge
- Memory leak debugging
- Production monitoring setup
- CI/CD integration

**This is a senior-level project perfect for your portfolio!**

---

## 🆘 Need Help?

- Review Exercise 1-3 solutions
- Check README.md in this folder
- Use Chrome DevTools extensively
- Reference the solution folder (but try first!)

---

## ⏰ Estimated Time: 10-12 hours

**Ready to transform this app? Let's go! 🚀**

