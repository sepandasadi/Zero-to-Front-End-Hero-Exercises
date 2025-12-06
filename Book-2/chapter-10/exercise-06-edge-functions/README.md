# Exercise 6: Edge Functions

**Difficulty:** Advanced
**Time:** 2 hours
**Focus:** Deploy code to edge (Cloudflare Workers, Vercel Edge)

## 🎯 Learning Objectives

- Deploy edge functions
- Implement edge caching
- Understand edge vs traditional servers
- Optimize for global delivery

## 📋 Requirements

### **1. Choose Edge Platform**

**Cloudflare Workers:**
```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const cache = caches.default;
  let response = await cache.match(request);

  if (!response) {
    response = await fetch(request);
    event.waitUntil(cache.put(request, response.clone()));
  }

  return response;
}
```

**Vercel Edge Functions:**
```javascript
export const config = {
  runtime: 'edge'
};

export default async function handler(req) {
  return new Response('Hello from the edge!', {
    headers: { 'content-type': 'text/html' }
  });
}
```

### **2. Edge Caching**
```javascript
// Cache static assets at edge
const cache = await caches.open('v1');
await cache.put(request, response);

// Set cache headers
const headers = new Headers(response.headers);
headers.set('Cache-Control', 'public, max-age=3600');
```

### **3. Geolocation**
```javascript
const country = request.headers.get('cf-ipcountry');
// Customize content by location
```

## ✅ Acceptance Criteria

- [ ] Edge function deployed
- [ ] Static assets cached at edge
- [ ] Tested from multiple locations
- [ ] Latency < 50ms globally
- [ ] Cache hit rate > 90%

## 🎁 Bonus

- A/B testing at edge
- Edge-side rendering (ESR)
- Bot detection
- Rate limiting
- Image optimization at edge


