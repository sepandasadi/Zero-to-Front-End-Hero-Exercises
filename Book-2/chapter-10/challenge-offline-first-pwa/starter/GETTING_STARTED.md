# Getting Started - Offline-First E-Commerce PWA Challenge

## 🎯 Challenge Overview

Build a production-ready e-commerce PWA with:
- Full offline support
- Install prompt
- Background sync for orders
- Lighthouse PWA score: 100
- IndexedDB for cart persistence

**Time estimate:** 8-10 hours (break into phases!)

---

## 📦 Setup

### **1. Initialize Project**
```bash
mkdir ecommerce-pwa
cd ecommerce-pwa
npm init -y
npm install dexie # IndexedDB wrapper
```

### **2. Start Development Server**
```bash
# Option 1: VS Code Live Server
# Right-click index.html → "Open with Live Server"

# Option 2: Node.js
npm install -g http-server
http-server -p 8000

# Option 3: Python
python3 -m http.server 8000
```

---

## 🗺️ Implementation Phases

### **Phase 1: Basic App (2 hours)**
Build the core e-commerce functionality:

- [ ] Product listing page (12+ products)
- [ ] Product details page
- [ ] Shopping cart
- [ ] Checkout form
- [ ] Basic routing (vanilla JS or React Router)

**Files to create:**
- `index.html` - Product listing
- `product.html` - Product details
- `cart.html` - Shopping cart
- `checkout.html` - Checkout page
- `styles.css` - Styling
- `app.js` - Main app logic

---

### **Phase 2: PWA Foundation (2 hours)**

- [ ] Create `manifest.json`
- [ ] Generate icons (192x192, 512x512)
- [ ] Register Service Worker
- [ ] Implement basic caching (cache-first for assets)
- [ ] Create offline fallback page

**Files to create:**
- `manifest.json`
- `sw.js`
- `offline.html`
- `icons/` folder with icons

**Test:** App should work offline after first visit

---

### **Phase 3: Install Prompt (1 hour)**

- [ ] Capture `beforeinstallprompt` event
- [ ] Show custom install UI
- [ ] Handle user choice
- [ ] Detect standalone mode
- [ ] Track installation analytics

**Test:** Install prompt appears, app can be installed

---

### **Phase 4: IndexedDB Cart (2 hours)**

- [ ] Set up Dexie.js
- [ ] Create database schema (products, cart, orders)
- [ ] Persist cart to IndexedDB
- [ ] Load cart from IndexedDB on page load
- [ ] Handle cart operations (add, remove, update)

**Test:** Cart persists after refresh and offline

---

### **Phase 5: Background Sync (2 hours)**

- [ ] Implement background sync registration
- [ ] Queue orders when offline
- [ ] Sync orders when back online
- [ ] Show sync status to user
- [ ] Handle sync failures

**Test:** Submit order offline → goes online → order syncs automatically

---

### **Phase 6: Advanced Features (1 hour)**

- [ ] Intersection Observer lazy loading for product images
- [ ] Prefetch on hover for product pages
- [ ] Priority hints for hero images
- [ ] Edge caching (deploy to Vercel/Netlify)

**Test:** Lighthouse Performance 90+

---

### **Phase 7: Testing & Polish (1 hour)**

- [ ] Run Lighthouse PWA audit (goal: 100)
- [ ] Test all offline scenarios
- [ ] Test background sync
- [ ] Test on mobile device
- [ ] Add loading states and error handling

---

## ✅ Success Criteria

**Functionality:**
- [ ] Product catalog loads
- [ ] Can add products to cart
- [ ] Cart persists offline (IndexedDB)
- [ ] Can checkout
- [ ] Orders sync when online

**PWA:**
- [ ] Manifest valid
- [ ] Service Worker active
- [ ] Works 100% offline
- [ ] Installable to home screen
- [ ] Opens in standalone mode

**Performance:**
- [ ] Lighthouse PWA: 100
- [ ] Lighthouse Performance: 90+
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

**Deployment:**
- [ ] Deployed to HTTPS (Vercel/Netlify/Cloudflare)
- [ ] Edge caching configured
- [ ] All assets optimized

---

## 🎨 Recommended Tools

**Icons:**
- https://www.pwabuilder.com/ (generate all icon sizes)
- https://realfavicongenerator.net/

**Testing:**
- Chrome DevTools → Lighthouse
- Chrome DevTools → Application tab
- https://www.webpagetest.org/

**Deployment:**
- Vercel (automatic HTTPS, edge functions)
- Netlify (easy deployment, edge caching)
- Cloudflare Pages (global CDN)

---

## 📁 Starter Files Provided

Basic HTML/CSS structure:
- `index.html` - Product listing template
- `styles.css` - Basic styling
- `app.js` - Starter code with TODOs
- `products.json` - Sample product data

You need to implement:
- Service Worker (`sw.js`)
- Manifest (`manifest.json`)
- IndexedDB logic (`db.js`)
- Background sync (`sync.js`)
- Install prompt UI

---

## 💡 Tips

1. **Build incrementally:** Get each phase working before moving to next
2. **Test offline early:** Use DevTools → Network → Offline
3. **Use Workbox (optional):** Simpler than vanilla Service Workers
4. **IndexedDB is async:** Use async/await or Dexie.js
5. **Test on real device:** PWA features work differently on mobile
6. **Clear cache often:** Update cache version when making changes

---

## 🐛 Debugging

**Service Worker not updating:**
- DevTools → Application → Service Workers → "Update on reload"
- Or change `CACHE_NAME` version

**Install prompt not showing:**
- Clear site data
- Visit site twice
- Check all PWA requirements

**Offline doesn't work:**
- Check Service Worker is active
- Verify files are in cache
- Check fetch event handler

---

## 📚 Resources

- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Workbox Docs](https://developers.google.com/web/tools/workbox)
- [Dexie.js Tutorial](https://dexie.org/docs/Tutorial/)
- [Background Sync](https://web.dev/periodic-background-sync/)

---

**Good luck building your PWA!** 🚀

**Estimated time:** 8-10 hours (take breaks!)

Need help? Check `../hints.md` or `../solution/`

