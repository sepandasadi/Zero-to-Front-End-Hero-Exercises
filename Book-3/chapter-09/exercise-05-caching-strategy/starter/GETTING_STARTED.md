# Getting Started: Caching Strategy

## 🎯 Your Task

Implement browser caching with proper headers, content hashing, and deploy to a CDN.

---

## 📋 Steps to Complete

### Step 1: Verify Content Hashing

Check that your build tool generates hashed filenames:

```bash
npm run build
ls dist/assets/

# Should see:
# app.abc123def.js
# style.456ghi789.css
```

If not, configure your build tool:

**Vite:**
```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  }
};
```

**Webpack:**
```javascript
// webpack.config.js
output: {
  filename: '[name].[contenthash].js',
  chunkFilename: '[name].[contenthash].js'
}
```

---

### Step 2: Configure Cache Headers

Choose your hosting platform:

#### Option A: Vercel

Create `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

#### Option B: Netlify

Create `_headers` file:
```
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/
  Cache-Control: public, max-age=0, must-revalidate
```

#### Option C: Cloudflare Pages

Automatic! Just deploy - caching handled by Cloudflare.

---

### Step 3: Deploy to CDN

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**Cloudflare Pages:**
- Connect GitHub repo in Cloudflare dashboard
- Automatic deployment on push

---

### Step 4: Verify Cache Headers

```bash
curl -I https://your-site.com/assets/app.abc123.js

# Should see:
# Cache-Control: public, max-age=31536000, immutable
```

Or check in Chrome DevTools:
1. Network tab
2. Click a resource
3. Headers tab
4. Look for Cache-Control header

---

### Step 5: Measure Improvement

**First visit:**
- Open site in incognito
- Note load time in Network tab

**Repeat visit:**
- Refresh page
- Note load time
- Files should say "(from disk cache)"

**Expected: 80-90% faster repeat visits!**

---

## ✅ Success Criteria

- [ ] Content hashing enabled
- [ ] Cache headers configured
- [ ] Deployed to CDN
- [ ] Cache headers verified
- [ ] Repeat visits 80%+ faster
- [ ] Documentation complete

---

## 💡 Tips

1. **Test locally first:** Use `npx serve -s dist` to test build
2. **Hard refresh:** Ctrl+Shift+R to bypass cache while testing
3. **Incognito mode:** Test first visit cleanly
4. **Mobile test:** Real devices show real performance

---

**Ready to cache? Let's make those repeat visits instant!** ⚡

