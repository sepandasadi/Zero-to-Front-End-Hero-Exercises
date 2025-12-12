# Lighthouse Audit - Starter Files

## 🎯 Objective

Run a Lighthouse audit on this deliberately unoptimized website, identify issues, implement fixes, and achieve a 90+ performance score.

## ⚠️ Deliberate Issues

This website has been intentionally created with performance and accessibility issues for you to find and fix:

### Performance Issues
- ❌ Render-blocking CSS and JavaScript
- ❌ Large, unoptimized images
- ❌ No lazy loading for off-screen images
- ❌ Unused CSS (60%+ unused)
- ❌ Missing image dimensions (causes CLS)
- ❌ Heavy JavaScript blocking main thread

### Accessibility Issues
- ❌ Missing alt text on images
- ❌ No form labels
- ❌ Low contrast text
- ❌ Missing meta description

### Best Practices Issues
- ❌ Images not in next-gen formats
- ❌ Console errors
- ❌ Inefficient code

## 🚀 Getting Started

1. **Start a local server:**
   ```bash
   python -m http.server 8000
   # or
   npx http-server -p 8000
   ```

2. **Open in Chrome:**
   ```
   http://localhost:8000
   ```

3. **Run Lighthouse:**
   - F12 → Lighthouse tab
   - Select all categories
   - Click "Analyze page load"

4. **Expected Initial Scores:**
   - Performance: 30-45 (🔴 Poor)
   - Accessibility: 60-75 (🟡 Needs Work)
   - Best Practices: 70-80 (🟡 Needs Work)
   - SEO: 80-90 (🟢 Good)

## ✅ Your Tasks

1. Document initial audit results
2. Identify top 5 issues
3. Implement fixes
4. Re-run audit
5. Document improvements

## 📊 Expected Results

**After fixes:**
- Performance: 90+ (🟢 Good)
- LCP: < 2.5s
- TBT: < 200ms
- CLS: < 0.1

## 📁 Files

- `index.html` - Main page (fix this)
- `styles.css` - Styles (remove unused, fix issues)
- `app.js` - JavaScript (defer, optimize)
- `audit-template.md` - Document your work here
- `GETTING_STARTED.md` - Detailed instructions

**Good luck!** 🚀

