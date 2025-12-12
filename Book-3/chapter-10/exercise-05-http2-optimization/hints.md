# Exercise 5: HTTP/2 Optimization - Hints

## 🔍 Hint 1: Check HTTP/2 Support

<details>
<summary>Click to reveal</summary>

**Chrome DevTools:**
1. Network tab
2. Right-click header row → Enable "Protocol" column
3. Look for "h2" (HTTP/2) or "h3" (HTTP/3)

**Online checker:**
- https://tools.keycdn.com/http2-test
- Enter your domain

**Curl:**
```bash
curl -I --http2 https://example.com
# Look for "HTTP/2 200"
```
</details>

---

## 🔍 Hint 2: Local HTTP/2 Testing

<details>
<summary>Click to reveal</summary>

**Option 1: Use Cloudflare Pages (Free)**
```bash
# Deploy to Cloudflare (automatic HTTP/2)
npx wrangler pages publish ./dist
```

**Option 2: Local with self-signed cert**
```bash
# Generate certificate
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Node.js HTTP/2 server
const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
});

server.on('stream', (stream, headers) => {
  stream.respond({ ':status': 200 });
  stream.end('<h1>Hello HTTP/2!</h1>');
});

server.listen(8443);
```
</details>

---

## 🔍 Hint 3: Server Push

<details>
<summary>Click to reveal</summary>

**Netlify (`_headers` file):**
```
/*
  Link: </styles.css>; rel=preload; as=style
  Link: </app.js>; rel=preload; as=script
```

**Cloudflare Workers:**
```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const response = await fetch(request);

  // Add Link headers for server push
  const newHeaders = new Headers(response.headers);
  newHeaders.append('Link', '</styles.css>; rel=preload; as=style');
  newHeaders.append('Link', '</app.js>; rel=preload; as=script');

  return new Response(response.body, {
    status: response.status,
    headers: newHeaders
  });
}
```

**Warning:** Don't push already-cached resources!
</details>

---

## 🔍 Hint 4: Measuring HTTP/2 Benefits

<details>
<summary>Click to reveal</summary>

**Lighthouse:**
- Run audit on HTTP/1.1 site
- Enable HTTP/2
- Run audit again
- Compare: Time to Interactive, FCP, LCP

**WebPageTest:**
- https://www.webpagetest.org/
- Test with HTTP/1.1 and HTTP/2
- Compare waterfall charts

**Expected improvements:**
- 20-40% faster page load
- Better parallel resource loading
- Reduced latency
</details>

---

## 📚 Resources

- [HTTP/2 - MDN](https://developer.mozilla.org/en-US/docs/Glossary/HTTP_2)
- [HTTP/2 Server Push](https://web.dev/http2-push/)
- [HTTP/2 vs HTTP/1.1](https://imagekit.io/blog/http2-vs-http1-performance/)


