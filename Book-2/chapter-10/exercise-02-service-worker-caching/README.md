# Exercise 2: Service Worker Caching

**Difficulty:** Intermediate-Advanced
**Time:** 2 hours
**Focus:** Multiple caching strategies

## 🎯 Learning Objectives

- Register and install Service Worker
- Implement cache-first strategy (static assets)
- Implement network-first strategy (API)
- Implement stale-while-revalidate
- Test offline functionality

## 📋 Requirements

### **1. Register Service Worker**
```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

### **2. Cache Static Assets** (cache-first)
- CSS, JS, images
- Serve from cache immediately
- Fallback to network if not cached

### **3. Cache API Responses** (network-first)
- Try network first
- Fallback to cache if offline
- Update cache with fresh data

### **4. HTML Pages** (stale-while-revalidate)
- Serve cached immediately
- Update in background

## ✅ Acceptance Criteria

- [ ] Service Worker registered
- [ ] Static assets cached (cache-first)
- [ ] API responses cached (network-first)
- [ ] Works offline
- [ ] Old caches cleaned up on activate
- [ ] Tested in Chrome DevTools → Application → Service Workers

## 🎁 Bonus

- Use Workbox library
- Cache expiration (TTL)
- Background sync
- Push notifications

