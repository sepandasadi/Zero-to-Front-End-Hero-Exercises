# Challenge Project: Performance Optimization Sprint

**Difficulty:** Advanced
**Time:** 6-8 hours
**Goal:** Take a slow app to Lighthouse 90+ with green Core Web Vitals

---

## 🎯 Project Overview

You'll be given a **deliberately slow application** (or build one) and optimize it to achieve:
- ✅ Lighthouse Performance score: 90+
- ✅ LCP: < 2.5s
- ✅ INP: < 200ms
- ✅ CLS: < 0.1
- ✅ Total bundle size: < 200KB (gzipped)

---

## 📦 Starter App (Choose One)

### **Option A: Use Provided Slow App**

Clone the starter (will be provided):
```bash
git clone [repo-url]/slow-app-starter
cd slow-app-starter
npm install
npm run dev
```

**Intentional problems:**
- 🐌 Huge images (2MB+, no optimization)
- 🐌 Everything loaded upfront (500KB JavaScript bundle)
- 🐌 No code splitting
- 🐌 Render-blocking CSS
- 🐌 No caching headers
- 🐌 Layout shifts (images without dimensions)
- 🐌 Heavy dependencies (moment.js, lodash)
- 🐌 CSS-in-JS runtime overhead

### **Option B: Build Your Own Slow App**

Create a simple e-commerce product page with:
- Hero section (large image)
- Product grid (12+ products with images)
- Reviews section
- Related products carousel
- Modal for product details

**Make it intentionally slow** (then fix it!):
- Use large, unoptimized images
- Import everything in one bundle
- Use heavy libraries
- No lazy loading

---

## 📊 Phase 1: Baseline Measurement (30 minutes)

### **1. Initial Audit**

Run Lighthouse:
```bash
# Build for production
npm run build

# Serve production build
npx serve -s dist

# Open Lighthouse in Chrome DevTools
# Record all scores
```

Document baseline:
```markdown
## Baseline Performance

**Lighthouse Scores:**
- Performance: __/100
- Accessibility: __/100
- Best Practices: __/100
- SEO: __/100

**Core Web Vitals:**
- LCP: __ seconds
- INP: __ ms
- CLS: __

**Bundle Sizes:**
- JavaScript: __ KB
- CSS: __ KB
- Images: __ KB
- Total: __ KB

**Opportunities (from Lighthouse):**
- [ ] ...
- [ ] ...
```

### **2. Bundle Analysis**

Install and run bundle analyzer:
```bash
# For Vite
npm install -D rollup-plugin-visualizer

# For Webpack
npm install -D webpack-bundle-analyzer
```

Identify:
- Largest dependencies
- Duplicate packages
- Unused code

---

## 🛠️ Phase 2: Image Optimization (1.5 hours)

### **Required Tasks:**

1. **Convert to modern formats**
   - [ ] All images → WebP
   - [ ] All images → AVIF
   - [ ] Implement `<picture>` with fallbacks

2. **Create responsive versions**
   - [ ] 3 sizes: 400px, 800px, 1200px
   - [ ] Implement `srcset` and `sizes`

3. **Lazy loading**
   - [ ] Hero image: No lazy loading
   - [ ] All other images: `loading="lazy"`

4. **Compression**
   - [ ] Hero: < 100KB (800px version)
   - [ ] Product images: < 50KB each
   - [ ] Total images: < 500KB

5. **Prevent CLS**
   - [ ] All images have `width` and `height`
   - [ ] Or use `aspect-ratio` CSS

**Expected improvement:** 60-80% image size reduction, 1-2s LCP improvement

---

## 📦 Phase 3: Code Splitting (2 hours)

### **Required Tasks:**

1. **Route-based splitting**
   ```jsx
   // Before: Everything imported
   import Home from './pages/Home';
   import Products from './pages/Products';
   import About from './pages/About';

   // After: Lazy load routes
   const Home = lazy(() => import('./pages/Home'));
   const Products = lazy(() => import('./pages/Products'));
   const About = lazy(() => import('./pages/About'));
   ```

2. **Component-level splitting**
   - [ ] Lazy load modal components
   - [ ] Lazy load charts/maps
   - [ ] Lazy load below-the-fold sections

3. **Library optimization**
   - [ ] Replace moment.js (230KB) with date-fns (12KB)
   - [ ] Import lodash functions individually: `import debounce from 'lodash/debounce'`
   - [ ] Remove unused dependencies

4. **Manual chunking**
   ```javascript
   // vite.config.js
   export default {
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             ui: ['@mui/material']
           }
         }
       }
     }
   };
   ```

**Expected improvement:** 50-70% bundle size reduction

---

## 🎨 Phase 4: CSS Optimization (1 hour)

### **Required Tasks:**

1. **Purge unused CSS**
   - [ ] Configure Tailwind purge (if using Tailwind)
   - [ ] Remove unused CSS manually

2. **Critical CSS**
   - [ ] Inline above-the-fold CSS
   - [ ] Async load non-critical CSS

3. **Avoid runtime CSS-in-JS**
   - [ ] If using styled-components, consider migrating to CSS Modules or Tailwind

4. **Minify CSS**
   - [ ] Ensure build tool minifies CSS (should be default)

**Expected improvement:** 70-90% CSS size reduction

---

## ⚡ Phase 5: Performance Patterns (1.5 hours)

### **React Optimizations:**

1. **Prevent unnecessary re-renders**
   ```jsx
   // Wrap expensive components
   const ProductCard = memo(({ product }) => {
     // ...
   });

   // Memoize calculations
   const sortedProducts = useMemo(
     () => products.sort((a, b) => a.price - b.price),
     [products]
   );
   ```

2. **Virtualize long lists**
   ```jsx
   import { FixedSizeList } from 'react-window';

   // Instead of rendering 1000 products
   <FixedSizeList
     height={600}
     itemCount={products.length}
     itemSize={200}
   >
     {ProductRow}
   </FixedSizeList>
   ```

3. **Debounce expensive operations**
   ```jsx
   const debouncedSearch = useMemo(
     () => debounce((query) => {
       // Expensive search
     }, 300),
     []
   );
   ```

---

## 🗄️ Phase 6: Caching & Deployment (1 hour)

### **Required Tasks:**

1. **Content hashing**
   - [ ] Ensure files have content hashes: `app.abc123.js`

2. **Browser caching**
   - [ ] Set long cache headers for static assets

3. **Deploy to CDN**
   - [ ] Vercel, Netlify, or Cloudflare Pages
   - [ ] Verify assets served from CDN

4. **Compression**
   - [ ] Enable Brotli/Gzip compression
   - [ ] Verify in Network tab: `content-encoding: br`

---

## 📈 Phase 7: Measurement & Documentation (30 minutes)

### **Final Audit:**

Run Lighthouse again and document improvements:

```markdown
## Final Performance

**Lighthouse Scores:**
- Performance: __/100 (improvement: +__)
- Accessibility: __/100
- Best Practices: __/100
- SEO: __/100

**Core Web Vitals:**
- LCP: __ seconds (improvement: -__ seconds)
- INP: __ ms (improvement: -__ ms)
- CLS: __ (improvement: -__)

**Bundle Sizes:**
- JavaScript: __ KB (reduction: -__ KB, __%)
- CSS: __ KB (reduction: -__ KB, __%)
- Images: __ KB (reduction: -__ KB, __%)
- Total: __ KB (reduction: -__ KB, __%)

**Optimizations Applied:**
- [ ] Image optimization (WebP, AVIF, responsive)
- [ ] Code splitting (route + component)
- [ ] Library optimization (replaced moment.js, etc.)
- [ ] React.memo and useMemo
- [ ] CSS purging
- [ ] Lazy loading
- [ ] CDN deployment
- [ ] Browser caching
```

---

## ✅ Acceptance Criteria

**Must Achieve:**
- [ ] Lighthouse Performance: 90+
- [ ] LCP: < 2.5s
- [ ] INP: < 200ms
- [ ] CLS: < 0.1
- [ ] JavaScript bundle: < 200KB (gzipped)
- [ ] CSS: < 50KB (gzipped)
- [ ] All Core Web Vitals: Green

**Documentation:**
- [ ] Before/after screenshots
- [ ] Performance metrics comparison
- [ ] List of all optimizations applied
- [ ] Bundle analysis before/after
- [ ] Deployment URL

**Code Quality:**
- [ ] No broken functionality
- [ ] Maintains UI/UX quality
- [ ] Clean, readable code
- [ ] No console errors

---

## 🎁 Bonus Challenges

1. **Service Worker**: Implement offline caching
2. **Prefetching**: Prefetch next route on hover
3. **Priority Hints**: Use `fetchpriority="high"` on LCP image
4. **HTTP/2**: Verify HTTP/2 is enabled
5. **Image CDN**: Use Cloudinary with automatic optimization
6. **Performance monitoring**: Set up Real User Monitoring (Sentry, DataDog)
7. **CI/CD**: Add Lighthouse CI to GitHub Actions
8. **Performance budget**: Fail builds if budget exceeded
9. **WebP/AVIF server**: Serve format based on `Accept` header
10. **Edge caching**: Implement edge caching with Cloudflare Workers

---

## 📊 Success Metrics

### **Minimum (Pass):**
- Lighthouse 90+
- All Core Web Vitals green
- 50% bundle size reduction

### **Excellent:**
- Lighthouse 95+
- LCP < 1.5s
- 70% bundle size reduction
- Deployed with CDN

### **Outstanding:**
- Lighthouse 98+
- LCP < 1.0s
- 80% bundle size reduction
- Service Worker + offline support
- Lighthouse CI integrated

---

## 📝 Deliverables

Submit:
1. **GitHub repository** with clean code
2. **Live demo URL** (Vercel/Netlify)
3. **PERFORMANCE.md** with:
   - Before/after metrics
   - All optimizations applied
   - Lessons learned
   - Screenshots of Lighthouse reports
4. **Blog post** (optional) documenting the optimization journey

---

## 💡 Tips

1. **Start with easy wins**: Images first (biggest impact)
2. **Measure after each change**: See what actually helps
3. **Don't break functionality**: Performance shouldn't sacrifice UX
4. **Test on slow connections**: Use Chrome DevTools throttling
5. **Test on mobile**: Real device testing reveals issues
6. **Use RUM in production**: Lab metrics don't tell the whole story

---

## 🎓 Learning Outcomes

After completing this challenge, you'll be able to:
- ✅ Audit performance with Lighthouse
- ✅ Optimize images for web
- ✅ Implement code splitting
- ✅ Configure caching strategies
- ✅ Deploy to CDN
- ✅ Measure and monitor performance
- ✅ Meet Core Web Vitals targets
- ✅ Improve SEO through performance
- ✅ Add "Performance Optimization" to your resume

---

**Ready to make it fast?** ⚡ This challenge will level up your performance skills!

**Time to completion:** 6-8 hours
**Difficulty:** Advanced
**Portfolio-worthy:** ✅ Absolutely!

---

**Good luck!** 🚀

