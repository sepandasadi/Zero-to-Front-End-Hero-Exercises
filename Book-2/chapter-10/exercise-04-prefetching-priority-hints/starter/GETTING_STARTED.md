# Getting Started - Prefetching & Priority Hints

## 🎯 Your Task

Optimize a blog website using prefetching and priority hints to improve performance.

**Time estimate:** 1 hour

---

## 📦 Setup

```bash
# Open with Live Server or any local server
# No build tools needed!
```

---

## 🔨 Implementation Steps

### **Phase 1: Prefetch on Hover (30 min)**

Implement hover-based prefetching for blog posts:

```javascript
const links = document.querySelectorAll('.post-link');

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    const prefetch = document.createElement('link');
    prefetch.rel = 'prefetch';
    prefetch.href = link.href;
    document.head.appendChild(prefetch);
  }, { once: true });
});
```

---

### **Phase 2: Priority Hints (20 min)**

Add `fetchpriority` to optimize loading:

```html
<!-- Hero image (LCP): High priority -->
<img src="hero.jpg" fetchpriority="high" alt="Hero">

<!-- Below-fold images: Low priority -->
<img src="footer.jpg" fetchpriority="low" loading="lazy" alt="Footer">

<!-- Critical CSS: Preload -->
<link rel="preload" href="critical.css" as="style">
```

---

### **Phase 3: Resource Hints (10 min)**

Add DNS prefetch and preconnect:

```html
<head>
  <!-- DNS Prefetch for external domains -->
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">

  <!-- Preconnect for resources you'll definitely use -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
```

---

## ✅ Success Criteria

- [ ] Hover prefetch implemented on blog links
- [ ] Priority hints added to all images
- [ ] DNS prefetch for external resources
- [ ] Preload for critical CSS
- [ ] Measure with Lighthouse (before/after)
- [ ] LCP improved by 10%+

---

## 🧪 Testing

### **Test Prefetch:**
1. Open DevTools → Network tab
2. Hover over a link (don't click)
3. See prefetch request (Priority: Low)
4. Click link → instant load!

### **Test Priority Hints:**
1. Network tab → Priority column
2. Hero image: Priority "High"
3. Below-fold images: Priority "Low"

---

**Need help?** Check `../hints.md` or `../solution/`

