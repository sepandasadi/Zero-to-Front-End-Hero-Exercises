# Challenge: Offline-First E-Commerce PWA

**Difficulty:** Advanced
**Time:** 8-10 hours
**Goal:** Build production-ready PWA with offline support and Lighthouse PWA score 100

## 🎯 Project Overview

Build an e-commerce product catalog that:
- ✅ Works offline (Service Worker)
- ✅ Installable (PWA)
- ✅ Fast (HTTP/2, edge caching)
- ✅ Background sync for orders
- ✅ Push notifications
- ✅ Lighthouse PWA score: 100

## 📦 Features Required

### **1. Core Functionality**
- Product listing (12+ products)
- Product details page
- Shopping cart
- Checkout (simulate)
- Order history

### **2. PWA Features**
- HTTPS
- Service Worker with all caching strategies
- Web App Manifest
- Install prompt
- Offline page
- Works 100% offline

### **3. Performance**
- Lazy load images (Intersection Observer)
- Code splitting by route
- Prefetch on hover
- Priority hints on critical resources
- HTTP/2 optimized

### **4. Advanced Features**
- Background sync (submit orders when online)
- Push notifications (order updates)
- Edge caching (Cloudflare Workers or Vercel Edge)
- IndexedDB for offline cart

## 🛠️ Phase 1: Basic App (2 hours)

- [ ] Create product listing page
- [ ] Create product details page
- [ ] Implement shopping cart
- [ ] Basic routing (React Router or similar)

## ⚙️ Phase 2: Service Worker (2 hours)

- [ ] Register Service Worker
- [ ] Cache static assets (cache-first)
- [ ] Cache API responses (stale-while-revalidate)
- [ ] Implement offline page
- [ ] Test offline functionality

## 📱 Phase 3: PWA Features (2 hours)

- [ ] Create Web App Manifest
- [ ] Add app icons (192x192, 512x512)
- [ ] Implement install prompt
- [ ] Add to home screen
- [ ] Fullscreen mode (`display: standalone`)

## 🚀 Phase 4: Performance (2 hours)

- [ ] Intersection Observer lazy loading
- [ ] Code split routes
- [ ] Prefetch on hover
- [ ] Priority hints
- [ ] HTTP/2 optimization

## ⚡ Phase 5: Advanced Features (2 hours)

- [ ] Background sync for orders
- [ ] IndexedDB for offline cart persistence
- [ ] Push notifications (optional)
- [ ] Edge caching (Cloudflare Workers)

## ✅ Acceptance Criteria

**Functionality:**
- [ ] All pages work perfectly
- [ ] Shopping cart persists offline
- [ ] Orders sync when back online

**PWA:**
- [ ] Install prompt works
- [ ] Installable to home screen
- [ ] Works 100% offline
- [ ] Offline page displays when offline

**Performance:**
- [ ] Lighthouse Performance: 90+
- [ ] Lighthouse PWA: 100
- [ ] All Core Web Vitals: Green
- [ ] First visit < 2s
- [ ] Repeat visit < 500ms (cached)

**Technical:**
- [ ] Service Worker registered
- [ ] All caching strategies implemented
- [ ] Background sync working
- [ ] IndexedDB for persistence
- [ ] Deployed to HTTPS (Vercel, Netlify, etc.)

## 🎁 Bonus Challenges

1. **Multi-language support**: Edge functions for i18n
2. **Optimistic UI**: Update UI instantly, sync later
3. **Analytics**: Track offline behavior
4. **A/B testing**: Edge-based experiments
5. **Image CDN**: Cloudinary or Imgix
6. **WebP/AVIF**: Automatic format conversion
7. **Dark mode**: Persist preference
8. **Skeleton screens**: Better loading states
9. **Error boundaries**: Graceful error handling
10. **E2E tests**: Cypress or Playwright

## 📊 Success Metrics

### **Minimum (Pass):**
- Lighthouse PWA: 90+
- Works offline
- Install prompt
- Background sync

### **Excellent:**
- Lighthouse PWA: 100
- LCP < 1.5s
- Works perfectly offline
- All advanced features

### **Outstanding:**
- All metrics green
- Edge caching implemented
- Push notifications
- Production-deployed
- Blog post documenting journey

## 📝 Deliverables

1. **GitHub repository**
2. **Live demo** (HTTPS required)
3. **README.md** with:
   - Installation instructions
   - Architecture decisions
   - Lighthouse screenshots
   - Offline demo video
4. **Blog post** (optional): "Building an Offline-First PWA"

## 💡 Tips

1. **Start simple**: Get basic app working first
2. **Test offline early**: Use Chrome DevTools → Offline checkbox
3. **Use Workbox**: Easier than vanilla Service Workers
4. **IndexedDB**: Use Dexie.js wrapper (simpler API)
5. **Test install**: Clear site data to test install prompt again
6. **Monitor cache size**: Don't cache everything!

## 🎓 Learning Outcomes

After completing this challenge:
- ✅ Build production PWAs
- ✅ Implement all Service Worker patterns
- ✅ Handle offline scenarios
- ✅ Deploy to edge (Cloudflare/Vercel)
- ✅ Pass Lighthouse PWA audit
- ✅ Portfolio-worthy project

---

**Ready to build an offline-first PWA?** ⚡

**Time estimate:** 8-10 hours
**Difficulty:** Advanced
**Portfolio-worthy:** ✅ Absolutely!

