# Getting Started - HTTP/2 Optimization

## 🎯 Your Task

Learn HTTP/2 optimization techniques and deploy a site with HTTP/2 enabled.

**Time estimate:** 1.5 hours

**Note:** This exercise focuses on understanding and deployment rather than code implementation.

---

## 📦 What You'll Learn

1. **HTTP/2 vs HTTP/1.1** differences
2. **Server Push** configuration
3. **Multiplexing** benefits
4. **Deployment** to HTTP/2-enabled platform

---

## 🔨 Implementation Steps

### **Phase 1: Understanding HTTP/2 (30 min)**

**HTTP/1.1 problems:**
- Multiple TCP connections (6 per domain)
- Head-of-line blocking
- No compression
- No server push

**HTTP/2 benefits:**
- **Multiplexing**: All requests over single connection
- **Header compression**: HPACK algorithm
- **Server push**: Proactive resource delivery
- **Stream prioritization**: Important resources first

---

### **Phase 2: Deploy to HTTP/2 Platform (30 min)**

**Option 1: Cloudflare Pages (Easiest)**

```bash
# Automatic HTTP/2 + HTTP/3!
npx wrangler pages publish ./dist
```

**Option 2: Vercel**

```bash
# Automatic HTTP/2
vercel --prod
```

**Option 3: Netlify**

```bash
# Automatic HTTP/2
netlify deploy --prod
```

All these platforms enable HTTP/2 automatically with HTTPS!

---

### **Phase 3: Configure Server Push (30 min)**

**Netlify (`_headers` file):**
```
/*
  Link: </styles.css>; rel=preload; as=style
  Link: </app.js>; rel=preload; as=script
  Link: </hero.jpg>; rel=preload; as=image
```

**Cloudflare Workers:**
```javascript
export default {
  async fetch(request) {
    const response = await fetch(request);
    const headers = new Headers(response.headers);

    headers.append('Link', '</styles.css>; rel=preload; as=style');
    headers.append('Link', '</app.js>; rel=preload; as=script');

    return new Response(response.body, {
      status: response.status,
      headers
    });
  }
};
```

---

### **Phase 4: Test & Measure (30 min)**

**1. Verify HTTP/2:**
```bash
curl -I --http2 https://your-site.com
# Should show: HTTP/2 200
```

**2. Chrome DevTools:**
- Network tab
- Right-click header → Enable "Protocol" column
- Look for "h2" (HTTP/2) or "h3" (HTTP/3)

**3. Online testers:**
- https://tools.keycdn.com/http2-test
- https://www.webpagetest.org/

---

## ✅ Success Criteria

- [ ] Understand HTTP/2 benefits
- [ ] Deployed to HTTP/2-enabled platform
- [ ] Verified with curl or DevTools
- [ ] Server push configured (optional)
- [ ] Measured performance improvement

---

## 💡 Key Insights

**HTTP/2 vs HTTP/1.1:**
| Feature | HTTP/1.1 | HTTP/2 |
|---------|----------|--------|
| Connections | 6 per domain | 1 |
| Multiplexing | ❌ | ✅ |
| Header compression | ❌ | ✅ (HPACK) |
| Server push | ❌ | ✅ |
| Binary protocol | ❌ | ✅ |

**Performance gains:**
- 20-40% faster page loads
- Reduced latency
- Better resource utilization

---

**Need help?** Check `../hints.md` or `../solution/`

