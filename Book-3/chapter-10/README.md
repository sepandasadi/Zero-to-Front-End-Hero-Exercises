# Chapter 10: Lazy Loading & Caching Deep Dive - Exercises

Master advanced performance patterns that make apps feel instant!

## 🎯 Learning Objectives

By completing these exercises, you will:
- Implement Intersection Observer for custom lazy loading
- Build Service Workers with multiple caching strategies
- Create offline-first Progressive Web Apps
- Optimize for HTTP/2
- Deploy edge functions
- Implement prefetching and priority hints

---

## 📚 Exercises Overview

| Exercise | Difficulty | Time | Focus |
|----------|-----------|------|-------|
| 1. Intersection Observer Lazy Loading | Intermediate | 1.5 hours | Custom lazy loading with animations |
| 2. Service Worker Caching | Intermediate-Advanced | 2 hours | Multiple caching strategies |
| 3. Progressive Web App (PWA) | Advanced | 2.5 hours | Offline support, install prompt |
| 4. Prefetching & Priority Hints | Intermediate | 1 hour | Performance optimization |
| 5. HTTP/2 Optimization | Advanced | 1.5 hours | Server push, multiplexing |
| 6. Edge Functions | Advanced | 2 hours | Cloudflare Workers or Vercel Edge |

**Total Time:** ~10.5 hours

---

## 🏆 Challenge Project

**Offline-First E-Commerce PWA** (8-10 hours)
- Full PWA with offline support
- Service Worker with all caching strategies
- Background sync for orders
- Install prompt
- Edge caching
- Lighthouse PWA score: 100

See `challenge-offline-first-pwa/` for details.

---

## 📝 Quiz

Test your knowledge with 15 questions on:
- Intersection Observer API
- Service Worker caching strategies
- HTTP/2 vs HTTP/3
- Edge computing
- PWA requirements

See `quiz.md` for the full quiz.

---

## 🚀 Getting Started

1. Complete exercises in order (build on each other)
2. Each exercise has starter code
3. Solutions provided for reference
4. Test with Chrome DevTools → Application tab (Service Workers, Cache Storage)

---

## 💡 Key Concepts

**Lazy Loading:**
- Intersection Observer > native `loading="lazy"` (more control)
- Prefetch on hover (300-500ms window)
- Priority hints for critical resources

**Service Workers:**
- Cache-first: Static assets (instant!)
- Network-first: API requests (fresh data)
- Stale-while-revalidate: Best of both worlds

**PWA:**
- HTTPS + Service Worker + Manifest = PWA
- Install prompt increases engagement 40%+
- Offline support builds trust

---

## ✅ Completion Checklist

- [ ] Complete all 6 exercises
- [ ] Build the challenge project
- [ ] Pass the quiz (13+ correct)
- [ ] Deploy a PWA to production
- [ ] Achieve Lighthouse PWA score 100

---

**Ready to make apps feel instant?** Start with Exercise 1! ⚡

