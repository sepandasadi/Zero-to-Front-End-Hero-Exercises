# Exercise 5: Caching Strategy

**Difficulty:** Advanced
**Time:** 2 hours
**Focus:** Browser caching, CDN, and Service Workers

---

## 🎯 Learning Objectives

- Configure browser caching with proper headers
- Implement content hashing for cache busting
- Deploy to CDN
- (Optional) Implement Service Worker caching

---

## 📋 Requirements

### **1. Content Hashing**

Ensure your build generates hashed filenames:
```
app.abc123.js
styles.def456.css
logo.ghi789.png
```

Verify in build output.

### **2. Cache Headers**

Configure your server (or hosting platform) with proper cache headers:

**For Vercel (vercel.json):**
```json
{
  "headers": [
    {
      "source": "/(.*).js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**For Netlify (_headers file):**
```
/*.js
  Cache-Control: public, max-age=31536000, immutable
/*.css
  Cache-Control: public, max-age=31536000, immutable
```

### **3. Deploy to CDN**

Deploy your app to a platform with automatic CDN:
- Vercel
- Netlify
- Cloudflare Pages

Verify assets are served from CDN (check response headers).

### **4. Measure Improvement**

- First visit: measure load time
- Repeat visit: measure load time (should be instant for cached assets)
- Document improvement

---

## ✅ Acceptance Criteria

- [ ] Content hashing enabled
- [ ] Cache headers configured
- [ ] Deployed to CDN platform
- [ ] Verification of cache headers in Network tab
- [ ] Before/after performance metrics
- [ ] Repeat visit is 80%+ faster

---

## 🎁 Bonus

- Implement Service Worker for offline support
- Cache API responses with stale-while-revalidate
- Add cache versioning strategy
- Monitor cache hit rates

