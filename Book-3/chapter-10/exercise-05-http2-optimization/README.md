# Exercise 5: HTTP/2 Optimization

**Difficulty:** Advanced
**Time:** 1.5 hours
**Focus:** HTTP/2 multiplexing and server push

## 🎯 Learning Objectives

- Understand HTTP/2 vs HTTP/1.1
- Configure HTTP/2 server push
- Optimize for multiplexing
- Measure performance gains

## 📋 Requirements

### **1. Enable HTTP/2**
Server configuration depends on your stack:

**Nginx:**
```nginx
server {
  listen 443 ssl http2;
  server_name example.com;

  # SSL certificates required
  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/key.pem;
}
```

**Apache:**
```apache
Protocols h2 h2c http/1.1
```

**Node.js:**
```javascript
const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
});
```

### **2. Server Push**
```nginx
location / {
  http2_push /styles.css;
  http2_push /app.js;
  http2_push /logo.png;
}
```

### **3. Optimize Assets**
- Remove domain sharding (no longer needed)
- Remove asset concatenation (multiplexing handles it)
- Keep assets modular

## ✅ Acceptance Criteria

- [ ] HTTP/2 enabled on server
- [ ] Server push configured for critical assets
- [ ] Verify with Chrome DevTools (Protocol column)
- [ ] Measure before/after with Lighthouse
- [ ] Page load time improved 20%+

## 🎁 Bonus

- HTTP/3 (QUIC protocol)
- Edge caching with HTTP/2
- 103 Early Hints
- Server push preload directive


