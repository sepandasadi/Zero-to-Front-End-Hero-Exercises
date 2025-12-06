# Getting Started - Edge Functions

## 🎯 Your Task

Deploy code to the edge (Cloudflare Workers or Vercel Edge Functions) for global low-latency delivery.

**Time estimate:** 2 hours

---

## 📦 What You'll Learn

1. **Edge computing** basics
2. **Cloudflare Workers** or **Vercel Edge Functions**
3. **Edge caching** strategies
4. **Geolocation** and personalization
5. **Performance** at the edge

---

## 🔨 Implementation Options

### **Option 1: Cloudflare Workers (Recommended)**

**Setup:**
```bash
npm install -g wrangler
wrangler login
wrangler init my-edge-function
cd my-edge-function
```

**Edit `src/index.js`:**
```javascript
export default {
  async fetch(request) {
    return new Response('Hello from the edge!', {
      headers: { 'content-type': 'text/plain' }
    });
  }
};
```

**Deploy:**
```bash
wrangler publish
```

**Free tier:** 100,000 requests/day

---

### **Option 2: Vercel Edge Functions**

**Create `pages/api/hello.js`:**
```javascript
export const config = {
  runtime: 'edge'
};

export default function handler(req) {
  return new Response('Hello from Vercel Edge!', {
    headers: { 'content-type': 'text/plain' }
  });
}
```

**Deploy:**
```bash
vercel --prod
```

---

## 🔨 Phase 1: Basic Edge Function (30 min)

Create a simple edge function that responds to requests.

**Cloudflare Worker:**
```javascript
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    return new Response(`
      <!DOCTYPE html>
      <html>
      <head><title>Edge Function</title></head>
      <body>
        <h1>Hello from the Edge! ⚡</h1>
        <p>Request URL: ${url.pathname}</p>
        <p>Method: ${request.method}</p>
      </body>
      </html>
    `, {
      headers: { 'content-type': 'text/html' }
    });
  }
};
```

---

## 🔨 Phase 2: Edge Caching (45 min)

Implement caching at the edge:

```javascript
export default {
  async fetch(request, env, ctx) {
    const cache = caches.default;

    // Try cache first
    let response = await cache.match(request);
    if (response) {
      return response;
    }

    // Fetch from origin
    response = await fetch(request);

    // Cache for 1 hour
    const headers = new Headers(response.headers);
    headers.set('Cache-Control', 'public, max-age=3600');

    const cachedResponse = new Response(response.body, {
      status: response.status,
      headers
    });

    ctx.waitUntil(cache.put(request, cachedResponse.clone()));

    return cachedResponse;
  }
};
```

---

## 🔨 Phase 3: Geolocation (45 min)

Personalize based on user location:

```javascript
export default {
  async fetch(request) {
    const country = request.cf?.country || 'Unknown';
    const city = request.cf?.city || 'Unknown';

    return new Response(`
      <!DOCTYPE html>
      <html>
      <head><title>Geo Edge Function</title></head>
      <body>
        <h1>Hello from ${city}, ${country}! 🌍</h1>
        <p>Your request was served from the nearest edge location.</p>
        <p>Colo: ${request.cf?.colo}</p>
        <p>Latitude: ${request.cf?.latitude}</p>
        <p>Longitude: ${request.cf?.longitude}</p>
      </body>
      </html>
    `, {
      headers: { 'content-type': 'text/html' }
    });
  }
};
```

---

## ✅ Success Criteria

- [ ] Edge function deployed
- [ ] Responds to requests globally
- [ ] Caching implemented
- [ ] Tested from multiple locations
- [ ] Latency < 50ms globally

---

## 🧪 Testing

**1. Test globally:**
- https://www.webpagetest.org/
- Test from multiple locations
- Verify low latency everywhere

**2. Test caching:**
```bash
# First request
curl -I https://your-worker.workers.dev
# X-Cache: MISS

# Second request
curl -I https://your-worker.workers.dev
# X-Cache: HIT
```

**3. Test geolocation:**
- Use VPN to test from different countries
- Verify personalized response

---

**Need help?** Check `../hints.md` or `../solution/`

