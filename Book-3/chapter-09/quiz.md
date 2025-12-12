# Chapter 9: Page Speed and Optimization - Quiz

Test your knowledge of web performance optimization!

**Instructions:**
- Answer all 15 questions
- Each question has one correct answer
- Explanations are provided after each question
- Passing score: 13/15 (87%)

---

## Questions

### 1. What are Google's Core Web Vitals?

**A)** LCP, FCP, and TTI
**B)** LCP, INP, and CLS
**C)** FID, TTI, and TBT
**D)** TTFB, LCP, and FCP

<details>
<summary>Show Answer</summary>

**Correct Answer: B) LCP, INP, and CLS**

**Explanation:**
Core Web Vitals are three key metrics:
- **LCP (Largest Contentful Paint)**: ≤ 2.5s - measures loading performance
- **INP (Interaction to Next Paint)**: ≤ 200ms - measures interactivity
- **CLS (Cumulative Layout Shift)**: ≤ 0.1 - measures visual stability

Note: INP replaced FID (First Input Delay) in March 2024 as a Core Web Vital.
</details>

---

### 2. What is the target LCP (Largest Contentful Paint) score for a "good" rating?

**A)** ≤ 1.0 seconds
**B)** ≤ 1.5 seconds
**C)** ≤ 2.5 seconds
**D)** ≤ 4.0 seconds

<details>
<summary>Show Answer</summary>

**Correct Answer: C) ≤ 2.5 seconds**

**Explanation:**
LCP measures how long it takes for the largest content element to become visible. Google's thresholds:
- **Good**: ≤ 2.5s
- **Needs Improvement**: 2.5s - 4.0s
- **Poor**: > 4.0s

LCP typically measures hero images, video thumbnails, or large text blocks above the fold.
</details>

---

### 3. Which image format typically provides the smallest file size for photos?

**A)** JPEG
**B)** PNG
**C)** WebP
**D)** AVIF

<details>
<summary>Show Answer</summary>

**Correct Answer: D) AVIF**

**Explanation:**
AVIF (AV1 Image File Format) provides the best compression:
- **AVIF**: ~50% smaller than JPEG (best)
- **WebP**: ~25-35% smaller than JPEG
- **JPEG**: Standard format
- **PNG**: Largest (but supports transparency)

Best practice: Use `<picture>` with AVIF, WebP, and JPEG fallbacks:
```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description">
</picture>
```
</details>

---

### 4. What does the `loading="lazy"` attribute do on an `<img>` tag?

**A)** Compresses the image automatically
**B)** Defers loading images until they're near the viewport
**C)** Loads images in the background thread
**D)** Uses a placeholder image first

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Defers loading images until they're near the viewport**

**Explanation:**
Native lazy loading delays image loading until the image is about to enter the viewport:

```html
<img src="product.jpg" loading="lazy" alt="Product">
```

**Benefits:**
- Faster initial page load
- Saves bandwidth
- No JavaScript required

**When to use:**
- Images below the fold
- Long-form content
- Product galleries

**When NOT to use:**
- Hero images (above the fold)
- LCP elements
</details>

---

### 5. What is the primary benefit of code splitting in a React application?

**A)** Makes code easier to read
**B)** Reduces initial bundle size
**C)** Improves SEO
**D)** Prevents bugs

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Reduces initial bundle size**

**Explanation:**
Code splitting breaks your bundle into smaller chunks that load on-demand:

```jsx
// Instead of this (everything loaded upfront)
import Dashboard from './Dashboard';

// Do this (load only when needed)
const Dashboard = lazy(() => import('./Dashboard'));
```

**Benefits:**
- **Smaller initial bundle**: 800KB → 200KB
- **Faster first load**: Users only download what they need
- **Better caching**: Unchanged routes don't need to re-download

**Result:** Faster Time to Interactive (TTI) and better Core Web Vitals.
</details>

---

### 6. Which caching strategy provides the fastest repeat visits?

**A)** No caching
**B)** Server-side caching
**C)** Browser caching with long max-age
**D)** CDN caching

<details>
<summary>Show Answer</summary>

**Correct Answer: C) Browser caching with long max-age**

**Explanation:**
Browser caching stores assets locally, eliminating network requests entirely:

```nginx
# Cache static assets for 1 year
location ~* \.(js|css|png|jpg|webp|svg|woff2)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

**Speed comparison (for cached assets):**
1. **Browser cache**: 0ms (instant!)
2. **CDN cache**: 20-50ms (network request, but fast)
3. **Server cache**: 100-500ms (depends on location)
4. **No cache**: Full load time

**Best practice:** Use content hashing (`app.abc123.js`) so cached files update when content changes.
</details>

---

### 7. What is the purpose of the `srcset` attribute in an `<img>` tag?

**A)** Specify image source
**B)** Provide multiple image sizes for responsive images
**C)** Add alternative text
**D)** Enable lazy loading

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Provide multiple image sizes for responsive images**

**Explanation:**
`srcset` lets the browser choose the appropriate image size based on screen size and resolution:

```html
<img
  src="hero-800.jpg"
  srcset="
    hero-400.jpg 400w,
    hero-800.jpg 800w,
    hero-1200.jpg 1200w
  "
  sizes="(max-width: 600px) 400px, 800px"
  alt="Hero"
>
```

**Benefits:**
- Mobile gets 400px (50KB) instead of 1200px (500KB)
- Retina displays get 2x images automatically
- Saves bandwidth and improves LCP

**Result:** 90% smaller images for mobile users!
</details>

---

### 8. Which tool is built into Chrome DevTools for performance auditing?

**A)** WebPageTest
**B)** GTmetrix
**C)** Lighthouse
**D)** Pingdom

<details>
<summary>Show Answer</summary>

**Correct Answer: C) Lighthouse**

**Explanation:**
Lighthouse is built directly into Chrome DevTools and provides comprehensive audits:

**How to use:**
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Click "Analyze page load"
4. Review scores (0-100) for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

**Lighthouse provides:**
- Core Web Vitals scores
- Actionable recommendations
- Estimated savings (KB, ms)
- Diagnostic information

**Other tools:**
- **WebPageTest**: More detailed, tests from real locations
- **GTmetrix**: Combines multiple tools
- **Pingdom**: Monitoring and alerts
</details>

---

### 9. What is a performance budget?

**A)** Money allocated for hosting
**B)** Maximum allowed asset sizes and load times
**C)** Time allocated for optimization
**D)** Server resource limits

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Maximum allowed asset sizes and load times**

**Explanation:**
Performance budgets set limits to prevent performance regression:

**Example budget:**
```json
{
  "budget": [
    {
      "resourceSizes": [
        { "resourceType": "script", "budget": 200 },
        { "resourceType": "stylesheet", "budget": 50 },
        { "resourceType": "image", "budget": 500 }
      ]
    }
  ],
  "timings": [
    { "metric": "interactive", "budget": 3000 },
    { "metric": "first-contentful-paint", "budget": 1500 }
  ]
}
```

**Benefits:**
- Enforced in CI/CD (PR fails if budget exceeded)
- Prevents "death by a thousand cuts"
- Keeps team accountable

**Common budgets:**
- JavaScript: < 200KB (gzipped)
- CSS: < 50KB (gzipped)
- Images per page: < 500KB
- LCP: < 2.5s
</details>

---

### 10. Which React optimization technique prevents unnecessary re-renders?

**A)** useEffect
**B)** useState
**C)** React.memo
**D)** useRef

<details>
<summary>Show Answer</summary>

**Correct Answer: C) React.memo**

**Explanation:**
`React.memo` wraps components to skip re-renders when props haven't changed:

```jsx
// ❌ Bad: Re-renders on every parent update
function ExpensiveComponent({ data }) {
  return <div>{expensiveCalculation(data)}</div>;
}

// ✅ Good: Only re-renders when data changes
const ExpensiveComponent = memo(({ data }) => {
  const result = useMemo(() => expensiveCalculation(data), [data]);
  return <div>{result}</div>;
});
```

**Other optimization hooks:**
- **useMemo**: Memoize expensive calculations
- **useCallback**: Memoize functions
- **useRef**: Store values without causing re-renders

**Impact:** Can reduce renders by 80-90% in some apps!
</details>

---

### 11. What causes Cumulative Layout Shift (CLS)?

**A)** Slow network connection
**B)** Content moving after page load
**C)** Large JavaScript bundles
**D)** Unoptimized images

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Content moving after page load**

**Explanation:**
CLS measures visual stability. Common causes:

**1. Images without dimensions:**
```html
<!-- ❌ Bad: Image loads, pushes content down -->
<img src="product.jpg" alt="Product">

<!-- ✅ Good: Space reserved, no shift -->
<img src="product.jpg" width="800" height="600" alt="Product">
```

**2. Web fonts loading (FOUT):**
```css
/* ✅ Good: Use font-display to control loading */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2');
  font-display: swap; /* Show fallback, then swap */
}
```

**3. Ads/embeds without reserved space:**
```css
/* Reserve space for ad */
.ad-container {
  min-height: 250px;
  background: #f0f0f0;
}
```

**Target:** CLS ≤ 0.1
</details>

---

### 12. Which bundle analysis tool visualizes what's in your JavaScript bundles?

**A)** ESLint
**B)** Prettier
**C)** webpack-bundle-analyzer
**D)** Jest

<details>
<summary>Show Answer</summary>

**Correct Answer: C) webpack-bundle-analyzer**

**Explanation:**
Bundle analyzers create interactive treemaps showing:
- Size of each module
- What's in each chunk
- Duplicate dependencies
- Largest contributors

**Webpack:**
```bash
npm install --save-dev webpack-bundle-analyzer
```

**Vite:**
```bash
npm install --save-dev rollup-plugin-visualizer
```

**What to look for:**
- Large dependencies to replace (moment.js → date-fns)
- Duplicate packages (multiple versions of React)
- Unused code to remove
- Opportunities for code splitting

**Example finding:** "Moment.js is 230KB! Switch to date-fns (12KB) = save 218KB!"
</details>

---

### 13. What is the main advantage of using a CDN (Content Delivery Network)?

**A)** Cheaper hosting costs
**B)** Better security
**C)** Faster delivery from geographically distributed servers
**D)** Automatic code optimization

<details>
<summary>Show Answer</summary>

**Correct Answer: C) Faster delivery from geographically distributed servers**

**Explanation:**
CDNs cache your assets on servers worldwide, serving from the nearest location:

**Without CDN:**
- User in Tokyo → US server: 200ms latency
- User in London → US server: 100ms latency

**With CDN:**
- User in Tokyo → Tokyo edge server: 20ms latency ⚡
- User in London → London edge server: 15ms latency ⚡

**10x faster!**

**Popular CDNs:**
- Cloudflare (free tier available)
- AWS CloudFront
- Vercel Edge Network
- Netlify Edge

**Additional benefits:**
- Automatic caching
- DDoS protection
- Free SSL
- Compression (Brotli/Gzip)
</details>

---

### 14. Which Next.js Image component feature automatically optimizes images?

**A)** Automatic WebP/AVIF conversion
**B)** Automatic lazy loading
**C)** Automatic responsive images
**D)** All of the above

<details>
<summary>Show Answer</summary>

**Correct Answer: D) All of the above**

**Explanation:**
Next.js `<Image>` component provides automatic optimization:

```jsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Preload for LCP
/>
```

**Automatic features:**
1. **Format conversion**: Serves WebP/AVIF to supporting browsers
2. **Lazy loading**: Unless `priority` is set
3. **Responsive images**: Automatically generates multiple sizes
4. **On-demand optimization**: Images optimized when requested, not at build time
5. **Proper sizing**: Prevents CLS with width/height

**Result:**
- 500KB JPEG → 80KB WebP automatically
- No manual optimization needed
- Better Core Web Vitals
</details>

---

### 15. What is the difference between lab data and field data in performance monitoring?

**A)** Lab data is from real users, field data is simulated
**B)** Lab data is simulated, field data is from real users
**C)** They are the same thing
**D)** Lab data is faster than field data

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Lab data is simulated, field data is from real users**

**Explanation:**

**Lab Data (Synthetic):**
- Tools: Lighthouse, WebPageTest
- Environment: Controlled (same device, network, location)
- Benefits: Repeatable, good for debugging
- Limitations: May not reflect real user experience

**Field Data (Real User Monitoring - RUM):**
- Tools: Google Analytics, Sentry, New Relic
- Environment: Real users (various devices, networks, locations)
- Benefits: Truth in production, shows real impact
- Limitations: Harder to debug, more variables

**Example difference:**
```
Lab (Lighthouse on fast laptop):
LCP: 1.2s ✅ Good

Field (real users):
LCP: 3.5s ❌ Poor
(50% of users on slow 3G with old phones)
```

**Best practice:** Use both!
- Lab: Development and debugging
- Field: Monitor production reality
</details>

---

## Scoring

- **15/15 (100%)**: Performance Expert! 🏆
- **13-14/15 (87-93%)**: Excellent! You understand web performance. ⭐
- **11-12/15 (73-80%)**: Good! Review the missed concepts.
- **9-10/15 (60-67%)**: Passing, but review Core Web Vitals and optimization techniques.
- **< 9/15 (< 60%)**: Review the chapter and try again.

---

## Key Takeaways

If you remember nothing else, remember these:

1. **Core Web Vitals matter**: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1
2. **Images are the biggest win**: Use WebP/AVIF, lazy loading, srcset
3. **Code split everything**: Don't send 800KB when 200KB will do
4. **Cache aggressively**: Browser cache + CDN = instant repeat visits
5. **Measure constantly**: Lighthouse + RUM = complete picture

**Performance is a feature!** Fast sites win. 🚀

