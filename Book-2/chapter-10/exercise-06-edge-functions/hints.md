# Exercise 6: Edge Functions - Hints

## 🔍 Hint 1: Getting Started with Cloudflare Workers

<details>
<summary>Click to reveal</summary>

**Setup:**
```bash
npm install -g wrangler
wrangler login
wrangler init my-worker
cd my-worker
```

**Basic worker (`src/index.js`):**
```javascript
export default {
  async fetch(request, env, ctx) {
    return new Response('Hello from Cloudflare Edge!', {
      headers: { 'content-type': 'text/html' }
    });
  }
};
```

**Deploy:**
```bash
wrangler publish
```

**Free tier:** 100,000 requests/day
</details>

---

## 🔍 Hint 2: Edge Caching

<details>
<summary>Click to reveal</summary>

```javascript
export default {
  async fetch(request, env, ctx) {
    const cache = caches.default;

    // Try cache first
    let response = await cache.match(request);

    if (response) {
      console.log('Cache hit!');
      return response;
    }

    // Fetch from origin
    response = await fetch(request);

    // Cache for 1 hour
    const headers = new Headers(response.headers);
    headers.set('Cache-Control', 'public, max-age=3600');

    const cachedResponse = new Response(response.body, {
      status: response.status,
      headers: headers
    });

    // Store in cache (don't await)
    ctx.waitUntil(cache.put(request, cachedResponse.clone()));

    return cachedResponse;
  }
};
```
</details>

---

## 🔍 Hint 3: Vercel Edge Functions

<details>
<summary>Click to reveal</summary>

**File:** `pages/api/hello.js`
```javascript
export const config = {
  runtime: 'edge'
};

export default function handler(req) {
  return new Response(
    JSON.stringify({
      message: 'Hello from Vercel Edge!',
      timestamp: new Date().toISOString()
    }),
    {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=60'
      }
    }
  );
}
```

**Deploy:**
```bash
vercel --prod
```
</details>

---

## 🔍 Hint 4: Geolocation & Personalization

<details>
<summary>Click to reveal</summary>

```javascript
export default {
  async fetch(request) {
    const country = request.cf?.country || 'Unknown';
    const city = request.cf?.city || 'Unknown';

    // Customize content by location
    const html = `
      <!DOCTYPE html>
      <html>
      <head><title>Edge Geolocation</title></head>
      <body>
        <h1>Hello from ${city}, ${country}!</h1>
        <p>Your request was served from the nearest edge location.</p>
        <p>Colo: ${request.cf?.colo}</p>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: { 'content-type': 'text/html' }
    });
  }
};
```
</details>

---

## 📚 Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions)
- [Edge Computing Explained](https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/)


