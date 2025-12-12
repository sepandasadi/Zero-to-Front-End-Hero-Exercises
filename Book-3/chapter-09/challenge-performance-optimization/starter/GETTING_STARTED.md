# Challenge: Getting Started

## 🎯 Goal

Take a slow app from Lighthouse 40 → 90+ with all Core Web Vitals green.

---

## ⏱️ Time Budget

**Total: 6-8 hours**

| Phase | Time | Focus |
|-------|------|-------|
| 1 | 30 min | Baseline measurement |
| 2 | 1.5 hrs | Image optimization |
| 3 | 2 hrs | Code splitting |
| 4 | 1 hr | CSS & React optimization |
| 5 | 1 hr | Caching & deployment |
| 6 | 30 min | Final audit & docs |

---

## 📊 Phase 1: Measure (30 min)

### Initial Audit

```bash
npm run build
npx serve -s dist

# Open Chrome DevTools → Lighthouse
# Run audit, take screenshot, document:
```

**Record:**
- Lighthouse scores (all 4 categories)
- Core Web Vitals (LCP, INP, CLS)
- Bundle sizes (JS, CSS, images)
- Top 5 opportunities from Lighthouse

---

## 🖼️ Phase 2: Images (1.5 hrs)

**Quickest wins! Do this first!**

### Tasks:

1. **Convert hero image to WebP/AVIF:**
   - Use Squoosh: https://squoosh.app
   - Quality: 75-85
   - Size: 1200px width max

2. **Create responsive versions:**
   - 400px (mobile)
   - 800px (tablet)
   - 1200px (desktop)

3. **Implement picture element:**
   ```html
   <picture>
     <source srcset="hero.avif" type="image/avif">
     <source srcset="hero.webp" type="image/webp">
     <img src="hero.jpg" width="1200" height="800" alt="Hero">
   </picture>
   ```

4. **Add lazy loading:**
   ```html
   <img src="..." loading="lazy" alt="...">
   ```

**Expected improvement: +30-40 Lighthouse points**

---

## 📦 Phase 3: Code Splitting (2 hrs)

### Route Splitting

```jsx
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
```

### Component Splitting

```jsx
const Modal = lazy(() => import('./components/Modal'));
const Chart = lazy(() => import('./components/Chart'));
```

### Library Optimization

```bash
# Replace moment.js (230KB) with date-fns (12KB)
npm uninstall moment
npm install date-fns
```

**Expected improvement: +15-25 points**

---

## 🎨 Phase 4: CSS & React (1 hr)

### Remove Unused CSS

1. DevTools → Coverage tab
2. Reload page
3. Note red bars (unused CSS)
4. Remove unused styles

### React Optimization

```jsx
const ProductCard = memo(({ product }) => {
  // ...
});

const sorted = useMemo(() =>
  products.sort((a, b) => a.price - b.price),
  [products]
);
```

**Expected improvement: +5-10 points**

---

## 🗄️ Phase 5: Caching (1 hr)

### Deploy to CDN

```bash
# Vercel (recommended)
npx vercel

# Netlify
npx netlify deploy --prod
```

### Configure Headers

**vercel.json:**
```json
{
  "headers": [{
    "source": "/assets/(.*)",
    "headers": [{
      "key": "Cache-Control",
      "value": "public, max-age=31536000, immutable"
    }]
  }]
}
```

**Expected improvement: +5 points, 9x faster repeats**

---

## 📈 Phase 6: Final Check (30 min)

### Re-run Lighthouse

- Take screenshot
- Compare with baseline
- Document all changes

### Success Criteria

- [ ] Lighthouse Performance: 90+
- [ ] LCP: < 2.5s
- [ ] INP: < 200ms
- [ ] CLS: < 0.1
- [ ] Bundle: < 200KB

---

## 💡 Pro Tips

1. **Measure after each phase** - See what works
2. **Images first** - Biggest impact
3. **Don't break functionality** - Test as you go
4. **Use throttling** - Test on "Slow 3G"
5. **Deploy often** - Test on real CDN

---

## 🆘 Stuck?

**Score 80-89?**
- Preload LCP image
- Add fetchpriority="high"
- Check for CLS issues
- Minify everything

**Still slow LCP?**
- Optimize hero image more
- Remove render-blocking resources
- Deploy to CDN

**High CLS?**
- Add width/height to ALL images
- Use font-display: swap
- Reserve space for ads

---

## 📝 Deliverables

Submit:
1. GitHub repo
2. Live demo URL
3. PERFORMANCE.md with before/after metrics
4. Lighthouse screenshots

---

**Ready? Start your timer and let's go!** ⏱️🚀

