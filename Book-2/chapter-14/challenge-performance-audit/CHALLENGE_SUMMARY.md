# Challenge Project: Performance Audit & Optimization Sprint

## Project Status: Starter & Solution Frameworks Created ✅

This challenge combines all three exercises into one comprehensive performance optimization project.

---

## 📁 Project Structure

### Starter Folder

The starter application includes:

**Complete Files Created:**
- ✅ `package.json` - Heavy dependencies (moment.js, lodash, recharts, MUI)
- ✅ `vite.config.js` - Basic configuration (no optimizations)
- ✅ `index.html` - Basic HTML shell
- ✅ `src/main.jsx` - React app entry point
- ✅ `src/index.css` - Base styles
- ✅ `src/App.jsx` - Main app with routes (no lazy loading)
- ✅ `src/pages/Home.jsx` - Home page using lodash + moment.js
- ✅ `GETTING_STARTED.md` - Comprehensive instructions

**Files to Complete (Based on Exercise Code):**
- `src/pages/Products.jsx` - Copy from Exercise 1 starter (unoptimized ProductList)
- `src/pages/Dashboard.jsx` - Copy from Exercise 3 starter (memory leaks) + add charts
- `src/components/ProductCard.jsx` - Copy from Exercise 1 starter
- `src/data/products.js` - Generate 10,000 products (modify Exercise 1)
- `src/services/dataService.js` - Copy from Exercise 3 starter

---

## 🎯 Challenge Phases

### Phase 1: Baseline Measurement
- Run Lighthouse audit
- Analyze bundle with visualizer
- Profile React components
- Measure memory leaks

### Phase 2: React Optimizations
**Apply techniques from Exercise 1:**
- Add React.memo to ProductCard
- Add useMemo for filtering/sorting
- Add useCallback for event handlers
- Install react-window for virtualization

### Phase 3: Bundle Optimization
**Apply techniques from Exercise 2:**
- Replace moment.js with date-fns
- Replace lodash with native JavaScript
- Lazy load Dashboard
- Configure manual chunk splitting
- Enable tree shaking

### Phase 4: Memory Leak Fixes
**Apply techniques from Exercise 3:**
- Fix WebSocket leak
- Fix interval leak
- Fix event listener leak
- Fix subscription leak
- Limit array growth

### Phase 5: Production Monitoring
- Install web-vitals
- Set up RUM tracking
- Configure Lighthouse CI
- Add performance budgets

### Phase 6: Final Measurement
- Document all improvements
- Create comprehensive report
- Take screenshots
- Verify all success criteria met

---

## 📊 Expected Results

### Before Optimization
```
Lighthouse Performance: 25/100
Bundle Size: 2.5MB
LCP: 8.5s
INP: 850ms
CLS: 0.35
Memory after 10min: 600MB+
Load Time (3G): 15+ seconds
```

### After Optimization
```
Lighthouse Performance: 90+/100
Bundle Size: < 200KB
LCP: < 2.5s
INP: < 200ms
CLS: < 0.1
Memory after 10min: < 100MB
Load Time (3G): < 4 seconds
```

---

## 💡 Implementation Guide

### To Complete the Starter:

1. **Products Page:** Use Exercise 1 starter code
   - Generate 10,000 products instead of 100
   - No React.memo, useMemo, or useCallback
   - No virtualization

2. **Dashboard Page:** Combine Exercise 3 + charts
   - Include all 5 memory leaks from Exercise 3
   - Add recharts components (not lazy loaded)
   - Import and use recharts directly in component

3. **Data Generation:** Modify Exercise 1 products.js
   - Change `generateProducts(100)` to `generateProducts(10000)`

### To Complete the Solution:

1. **Products Page:** Use Exercise 1 solution code
   - All optimizations applied
   - Add virtualization for 10,000 items

2. **Dashboard Page:** Exercise 3 solution + lazy loading
   - All memory leaks fixed
   - Dashboard lazy loaded (Exercise 2 technique)

3. **Bundle Config:** Use Exercise 2 solution
   - date-fns instead of moment.js
   - Native JavaScript instead of lodash
   - Manual chunk splitting configured
   - Visualizer configured

4. **Monitoring:** Add web-vitals tracking
   - Install web-vitals package
   - Track LCP, INP, CLS, FCP, TTFB
   - Log to console or send to analytics

5. **CI/CD:** Add Lighthouse CI
   - Create `.github/workflows/lighthouse.yml`
   - Create `lighthouserc.json` config
   - Set performance budgets

---

## 📝 Deliverables

Students should submit:

1. **PERFORMANCE_REPORT.md** with:
   - Executive summary
   - Metrics comparison table
   - List of all optimizations
   - Screenshots (before/after)
   - Business impact analysis
   - Lessons learned

2. **Source Code:**
   - Fully optimized application
   - All tests passing
   - Clean, commented code

3. **Screenshots:**
   - Lighthouse reports (before/after)
   - Bundle analyzer (before/after)
   - Memory profiler (before/after)

4. **CI/CD Configuration:**
   - Working Lighthouse CI
   - GitHub Actions workflow
   - Performance budgets configured

---

## 🎁 Bonus Challenges

1. **Lighthouse 95+**
   - Critical CSS inlining
   - Font optimization
   - Resource hints (preload, prefetch)
   - Service worker

2. **Production Deployment**
   - Deploy to Vercel/Netlify
   - Configure CDN caching
   - Custom domain
   - Analytics integration

3. **Performance Dashboard**
   - Build RUM visualization
   - Show Web Vitals trends
   - Geographic performance data
   - Device type breakdown

---

## 🏆 Success Criteria

### Must Achieve:
- ✅ Lighthouse Performance: 90+ (Desktop)
- ✅ Initial Bundle: < 200KB
- ✅ LCP: < 2.5s
- ✅ INP: < 200ms
- ✅ CLS: < 0.1
- ✅ Memory: < 150MB after 10min
- ✅ All Core Web Vitals: GREEN
- ✅ Working Lighthouse CI

### Documentation:
- ✅ Complete PERFORMANCE_REPORT.md
- ✅ Before/after screenshots
- ✅ Detailed explanations
- ✅ Business impact analysis

---

## 📚 Resources for Students

### Reference Exercises:
- **Exercise 1:** React performance optimization techniques
- **Exercise 2:** Bundle size optimization techniques
- **Exercise 3:** Memory leak detection and fixing

### Tools:
- Chrome DevTools (Lighthouse, Performance, Memory, Network)
- React DevTools Profiler
- rollup-plugin-visualizer
- web-vitals library
- Lighthouse CI

### Documentation:
- React Performance Optimization
- Web Vitals
- Chrome DevTools Guides
- Vite Build Optimization

---

## ⏰ Time Estimate

**Total: 10-12 hours**

- Phase 1 (Baseline): 1 hour
- Phase 2 (React): 3 hours
- Phase 3 (Bundle): 2 hours
- Phase 4 (Memory): 2 hours
- Phase 5 (Monitoring): 2 hours
- Phase 6 (Final): 1 hour
- Documentation: 1-2 hours

---

## 🎓 Learning Outcomes

After completing this challenge, students will have:

1. **Senior-level performance optimization skills**
2. **Portfolio-worthy project with measurable results**
3. **Production-ready monitoring setup**
4. **CI/CD performance pipeline experience**
5. **Deep understanding of React performance**
6. **Bundle optimization expertise**
7. **Memory leak debugging proficiency**

---

## Implementation Notes for Instructors

To fully implement this challenge:

1. **Copy Exercise code** into starter/solution folders
2. **Modify Products page** to use 10,000 items
3. **Add recharts** to Dashboard (integrate from Exercise 2)
4. **Create monitoring files**: web-vitals setup, GitHub Actions
5. **Create templates**: PERFORMANCE_REPORT.md template

The current files provide the framework. The actual implementation can reuse code from Exercises 1-3 with minor modifications.

---

**This challenge represents a comprehensive, production-ready performance optimization project suitable for senior developer portfolios!**

