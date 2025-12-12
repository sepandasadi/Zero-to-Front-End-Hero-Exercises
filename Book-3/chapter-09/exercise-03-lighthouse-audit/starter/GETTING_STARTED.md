# Getting Started: Lighthouse Audit & Fixes

## 🎯 Your Task

Run a Lighthouse audit on a test website, identify performance issues, implement the top 5 fixes, and document your improvements.

---

## 📁 What's Provided

This folder contains a deliberately unoptimized website for you to audit and fix:

- `index.html` - Homepage with performance issues
- `styles.css` - Unoptimized CSS
- `app.js` - Unoptimized JavaScript
- `images/` - Large, unoptimized images
- `audit-template.md` - Template for documenting your results

---

## 🚀 Steps to Complete

### Step 1: Set Up Local Server

You need a local server to run Lighthouse (can't audit file:// URLs).

**Option A: Using Python**
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

**Option B: Using Node**
```bash
# Install globally
npm install -g http-server

# Run
http-server -p 8000
```

**Option C: Using VS Code**
Install "Live Server" extension and click "Go Live"

---

### Step 2: Run Initial Lighthouse Audit

1. Open the site in Chrome (http://localhost:8000)
2. Open DevTools (F12)
3. Click "Lighthouse" tab
4. Select all categories:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
5. Choose "Mobile" (stricter test)
6. Click "Analyze page load"

**Wait 30-60 seconds for the report...**

---

### Step 3: Document Initial Results

Take a screenshot of the full report and note:

- Performance score: ___/100
- Accessibility score: ___/100
- Best Practices score: ___/100
- SEO score: ___/100

**Key Metrics:**
- LCP (Largest Contentful Paint): ___ s
- TBT (Total Blocking Time): ___ ms
- CLS (Cumulative Layout Shift): ___

**Top Opportunities:**
1. _____________________
2. _____________________
3. _____________________
4. _____________________
5. _____________________

---

### Step 4: Implement Top 5 Fixes

Pick the 5 highest-impact opportunities from the Lighthouse report.

#### Common Fixes You'll Likely Need:

**1. Properly Size Images**

Current issue:
```html
<img src="images/hero-large.jpg"> <!-- 3000×2000px serving in 800×600px space -->
```

Your fix:
- Resize images to appropriate dimensions
- Convert to WebP/AVIF
- Add width/height attributes

**2. Remove Unused CSS**

Use Coverage tool:
1. DevTools → More tools → Coverage
2. Reload page
3. Identify unused CSS (red bars)
4. Remove unused styles

**3. Defer Offscreen Images**

Add lazy loading:
```html
<img src="image.jpg" alt="..." loading="lazy">
```

**4. Eliminate Render-Blocking Resources**

Add `defer` or `async` to scripts:
```html
<script src="app.js" defer></script>
```

Load non-critical CSS asynchronously:
```html
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

**5. Serve Images in Next-Gen Formats**

Convert images to WebP:
```bash
# Using cwebp
cwebp -q 80 input.jpg -o output.webp
```

Or use online tools like Squoosh.

---

### Step 5: Re-Run Lighthouse

After making fixes:

1. Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
2. Run Lighthouse again
3. Take screenshot of new results
4. Compare scores

---

### Step 6: Document Your Work

Use the provided `audit-template.md` to document:

1. **Initial Audit Results**
   - Screenshots
   - All scores
   - Top issues identified

2. **Fixes Implemented**
   - What you changed
   - Why you changed it
   - Code examples

3. **Final Audit Results**
   - Screenshots
   - New scores
   - Improvements

4. **Comparison Table**
   - Before vs After metrics
   - Percentage improvements

---

## ✅ Success Criteria

Your solution should achieve:

- [ ] Initial Lighthouse audit completed and documented
- [ ] At least 5 performance issues fixed
- [ ] Final audit shows improvement
- [ ] Performance score increased by 20+ points
- [ ] Screenshots of before/after reports
- [ ] Written documentation of all changes
- [ ] Code changes clearly visible in files

**Target Scores:**
- Performance: 90+ 🟢
- Accessibility: 90+ 🟢
- Best Practices: 90+ 🟢
- SEO: 90+ 🟢

---

## 💡 Tips

**1. Focus on Performance First**
The other categories are usually easier to fix.

**2. Check Mobile AND Desktop**
Mobile scores are typically lower. Fix mobile first.

**3. Run Multiple Times**
Scores can vary. Run 3 times and average.

**4. Use Throttling**
Test with "Slow 4G" to see real-world mobile performance.

**5. Fix One Thing at a Time**
Easier to see what worked.

**6. Production Build**
If you're auditing a React/Vue app, always use the production build.

---

## 🆘 Common Issues

**"Lighthouse failed to load"**
- Make sure you're using http://, not file://
- Try incognito mode (disable extensions)
- Clear cache and reload

**"Scores vary wildly"**
- Normal! Run 3-5 times
- Close other tabs
- Disable Chrome extensions
- Use incognito mode

**"Can't improve score"**
- Check you're testing production build
- Verify changes actually deployed
- Hard refresh (Ctrl+Shift+R)
- Check console for errors

**"Image optimization takes forever"**
- Use online tools (Squoosh, TinyPNG)
- Or skip for now and document the fix

---

## 📊 Expected Results

**Before Optimization:**
- Performance: ~35-50
- LCP: 5-8s
- TBT: 500-1000ms
- Image sizes: 2-3MB each

**After Optimization:**
- Performance: 90+
- LCP: < 2.5s
- TBT: < 200ms
- Image sizes: 50-200KB each

**Improvement: 40-60 points!** 🎉

---

## 🔗 Helpful Resources

- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Web.dev - Optimize Images](https://web.dev/fast/#optimize-your-images)
- [Squoosh - Image Compressor](https://squoosh.app)
- [Can I Use - WebP Support](https://caniuse.com/webp)

---

**Ready to audit? Open Chrome DevTools and let's go!** 🚀

