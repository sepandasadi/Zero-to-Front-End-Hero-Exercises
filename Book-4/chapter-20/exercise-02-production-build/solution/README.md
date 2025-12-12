# Production Build - Solution

This is the complete solution for Exercise 2: Production Build with Multi-Stage Docker.

## What's Included

### 1. Multi-Stage Dockerfile
- **Stage 1 (Builder):** Builds the React app
- **Stage 2 (nginx):** Serves the built files

### 2. nginx.conf
- SPA routing configuration
- Security headers
- Gzip compression
- Static asset caching
- Health check endpoint

### 3. .dockerignore
Excludes unnecessary files for faster builds.

## How to Use

### Build the Image

```bash
docker build -t react-prod:solution .
```

### Check Image Size

```bash
docker images react-prod:solution
```

Expected: **~25 MB** (vs 450+ MB for development build!)

### Run the Container

```bash
docker run -p 8080:80 --name prod-app react-prod:solution
```

Visit http://localhost:8080

### Test Features

**1. SPA Routing:**
- Navigate to http://localhost:8080/about
- Refresh the page
- Should still work! (This would 404 without proper nginx config)

**2. Health Check:**
```bash
curl http://localhost:8080/health
```
Should return: `OK`

**3. Security Headers:**
```bash
curl -I http://localhost:8080
```
Should see headers like:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block

**4. Health Check Status:**
```bash
docker inspect --format='{{.State.Health.Status}}' prod-app
```
Should show: `healthy`

## Key Concepts

### Multi-Stage Builds

```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder
# ... build steps ...

# Stage 2: Production
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
```

**Benefits:**
- Final image only contains production artifacts
- No build tools or source code in production
- Massive size reduction (450 MB → 25 MB)

### nginx SPA Routing

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**How it works:**
1. Try to find the exact file ($uri)
2. Try to find a directory ($uri/)
3. Fall back to index.html (SPA entry point)

This ensures refreshing `/about` works correctly.

### Security Headers

```nginx
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
```

**What they do:**
- **X-Frame-Options:** Prevents clickjacking
- **X-Content-Type-Options:** Prevents MIME type sniffing
- **X-XSS-Protection:** Enables XSS filter

### Caching Strategy

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

Static assets are cached for 1 year, improving performance.

## Testing

### Full Test Suite

```bash
# Build
docker build -t react-prod:test .

# Run
docker run -d -p 8080:80 --name test-app react-prod:test

# Wait for health check
sleep 10

# Test home page
curl -s http://localhost:8080 | grep -q "Production Build" && echo "✅ Home works"

# Test SPA routing
curl -s http://localhost:8080/about | grep -q "html" && echo "✅ SPA routing works"

# Test health check
curl -s http://localhost:8080/health | grep -q "OK" && echo "✅ Health check works"

# Test security headers
curl -I http://localhost:8080 2>/dev/null | grep -q "X-Frame-Options" && echo "✅ Security headers present"

# Check image size
SIZE=$(docker images react-prod:test --format "{{.Size}}")
echo "📦 Image size: $SIZE"

# Cleanup
docker rm -f test-app
```

## Comparison: Development vs Production

| Metric | Development | Production |
|--------|------------|------------|
| Base Image | node:18-alpine | nginx:alpine |
| Image Size | ~450 MB | ~25 MB |
| Build Tool | react-scripts | Pre-built static files |
| Web Server | Node.js dev server | nginx |
| Performance | Good | Excellent |
| Security | Basic | Hardened |

## Common Issues

**Problem:** Refreshing `/about` returns 404

**Solution:** Check nginx `try_files` directive is configured correctly.

---

**Problem:** Health check failing

**Solution:** Ensure nginx is running and `/health` endpoint is configured.

---

**Problem:** Image size too large

**Solution:** Check you're using multi-stage build and only copying `/app/build` directory.

## Advanced Optimizations

Want to go further? Try:

1. **Use distroless base:** Even smaller and more secure
2. **Add Brotli compression:** Better than gzip
3. **Implement HTTP/2:** Better performance
4. **Add rate limiting:** Protect against abuse
5. **Use CDN:** For static assets

## Next Steps

Move on to [Exercise 3: Docker Compose](../exercise-03-docker-compose/README.md) to learn about:
- Multi-container applications
- Service networking
- Volume persistence
- Development environments

Excellent work! 🎉

