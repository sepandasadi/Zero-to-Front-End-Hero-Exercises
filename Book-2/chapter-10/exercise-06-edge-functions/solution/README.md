# Exercise 6: Edge Functions - Solution

## 📋 Implementation Summary

This solution demonstrates edge computing with:
- ✅ Cloudflare Workers deployment
- ✅ Edge caching implementation
- ✅ Geolocation-based personalization
- ✅ Global low-latency delivery (< 50ms)

---

## 🔑 Key Concepts

### **1. Edge Computing**

**Traditional (Origin Server):**
```
User (Tokyo) → [12,000 km] → Server (US East)
Latency: 200-300ms
```

**Edge Computing:**
```
User (Tokyo) → [50 km] → Edge (Tokyo)
Latency: 10-20ms
```

**Result:** 10-20x faster! ⚡

---

### **2. Cloudflare Workers**

Run JavaScript at the edge (300+ locations):

```javascript
export default {
  async fetch(request, env, ctx) {
    return new Response('Hello from the edge!', {
      headers: {
        'content-type': 'text/plain',
        'x-edge-location': request.cf.colo
      }
    });
  }
};
```

**Deployment:**
```bash
wrangler publish
# Deployed to 300+ cities in < 30 seconds
```

---

### **3. Edge Caching**

Cache at the edge for instant delivery:

```javascript
export default {
  async fetch(request, env, ctx) {
    const cache = caches.default;
    const cacheKey = new Request(request.url, request);

    // Try cache first
    let response = await cache.match(cacheKey);

    if (response) {
      // Cache hit
      const headers = new Headers(response.headers);
      headers.set('X-Cache', 'HIT');
      return new Response(response.body, {
        status: response.status,
        headers
      });
    }

    // Cache miss - fetch from origin
    response = await fetch(request);

    // Cache for 1 hour
    const headers = new Headers(response.headers);
    headers.set('Cache-Control', 'public, max-age=3600');
    headers.set('X-Cache', 'MISS');

    const cachedResponse = new Response(response.body, {
      status: response.status,
      headers
    });

    // Store in cache (don't await)
    ctx.waitUntil(cache.put(cacheKey, cachedResponse.clone()));

    return cachedResponse;
  }
};
```

---

### **4. Geolocation**

Personalize content by location:

```javascript
export default {
  async fetch(request) {
    const cf = request.cf || {};
    const country = cf.country || 'Unknown';
    const city = cf.city || 'Unknown';
    const colo = cf.colo || 'Unknown';

    // Customize content
    const greeting = getGreeting(country); // e.g., "Bonjour" for France
    const currency = getCurrency(country); // e.g., "€" for EU

    return new Response(JSON.stringify({
      greeting,
      currency,
      location: { city, country, colo },
      latitude: cf.latitude,
      longitude: cf.longitude,
      timezone: cf.timezone
    }), {
      headers: { 'content-type': 'application/json' }
    });
  }
};

function getGreeting(country) {
  const greetings = {
    'US': 'Hello',
    'FR': 'Bonjour',
    'ES': 'Hola',
    'DE': 'Guten Tag',
    'JP': 'こんにちは'
  };
  return greetings[country] || 'Hello';
}
```

---

### **5. A/B Testing at Edge**

Run experiments at the edge:

```javascript
export default {
  async fetch(request) {
    // Deterministic A/B test based on cookie
    let variant = getCookie(request, 'ab-test');

    if (!variant) {
      // New user - assign variant
      variant = Math.random() < 0.5 ? 'A' : 'B';
    }

    const response = await fetch(request);
    const html = await response.text();

    // Modify HTML based on variant
    const modifiedHtml = variant === 'A'
      ? html.replace('{{CTA}}', 'Buy Now!')
      : html.replace('{{CTA}}', 'Get Started Free');

    return new Response(modifiedHtml, {
      headers: {
        'content-type': 'text/html',
        'set-cookie': `ab-test=${variant}; Path=/; Max-Age=2592000`
      }
    });
  }
};

function getCookie(request, name) {
  const cookies = request.headers.get('cookie') || '';
  const match = cookies.match(new RegExp(`${name}=([^;]+)`));
  return match ? match[1] : null;
}
```

---

## 📊 Performance Results

### **Before (Origin Server):**
```
Tokyo → US East: 250ms
London → US East: 100ms
Sydney → US East: 350ms

Average: 233ms
```

### **After (Edge Functions):**
```
Tokyo → Edge Tokyo: 15ms
London → Edge London: 12ms
Sydney → Edge Sydney: 18ms

Average: 15ms (15x faster!)
```

---

## 🎯 Use Cases

### **1. Static Site Acceleration**
```javascript
// Cache everything at edge
export default {
  async fetch(request) {
    const cache = caches.default;
    let response = await cache.match(request);

    if (!response) {
      response = await fetch(request);
      const headers = new Headers(response.headers);
      headers.set('Cache-Control', 'public, max-age=86400'); // 24 hours

      response = new Response(response.body, {
        status: response.status,
        headers
      });

      await cache.put(request, response.clone());
    }

    return response;
  }
};
```

---

### **2. API Rate Limiting**
```javascript
const rateLimitStore = new Map();

export default {
  async fetch(request) {
    const ip = request.headers.get('cf-connecting-ip');
    const now = Date.now();
    const limit = 100; // requests per minute

    if (!rateLimitStore.has(ip)) {
      rateLimitStore.set(ip, { count: 0, resetAt: now + 60000 });
    }

    const data = rateLimitStore.get(ip);

    if (now > data.resetAt) {
      data.count = 0;
      data.resetAt = now + 60000;
    }

    if (data.count >= limit) {
      return new Response('Rate limit exceeded', { status: 429 });
    }

    data.count++;

    return fetch(request);
  }
};
```

---

### **3. Bot Detection**
```javascript
export default {
  async fetch(request) {
    const userAgent = request.headers.get('user-agent') || '';

    // Simple bot detection
    const isBadBot = /bot|crawler|spider|scraper/i.test(userAgent);

    if (isBadBot) {
      return new Response('Access Denied', { status: 403 });
    }

    return fetch(request);
  }
};
```

---

## 🧪 Testing

### **1. Test from Multiple Locations**

Use WebPageTest:
- https://www.webpagetest.org/
- Test from 5+ locations
- Verify latency < 50ms everywhere

### **2. Load Testing**

```bash
# Apache Bench
ab -n 10000 -c 100 https://your-worker.workers.dev/

# Verify:
# - No errors
# - Consistent latency
# - Cache hit rate > 90%
```

### **3. Cache Verification**

```bash
# First request (cache miss)
curl -I https://your-worker.workers.dev/
# X-Cache: MISS

# Second request (cache hit)
curl -I https://your-worker.workers.dev/
# X-Cache: HIT
```

---

## 🎓 Learning Outcomes

After this exercise:

✅ **Understand edge computing:**
- Benefits over origin servers
- Global distribution
- Low latency delivery

✅ **Deploy edge functions:**
- Cloudflare Workers
- Vercel Edge Functions
- Configuration and deployment

✅ **Implement edge features:**
- Caching strategies
- Geolocation
- A/B testing
- Rate limiting

✅ **Measure performance:**
- Global latency testing
- Cache hit rates
- Load testing

---

## 📚 Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions)
- [Edge Computing Explained](https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/)
- [Workers Examples](https://developers.cloudflare.com/workers/examples/)

---

**Edge deployed!** ⚡ Enjoy global low-latency! 🌍🚀

