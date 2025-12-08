# Exercise 3: Docker Deployment - Solution

## ✅ Complete Solution

This solution demonstrates production-ready Docker containerization for a React SPA with optimized image size, nginx configuration, and comprehensive security.

## 🎯 What Was Implemented

### 1. Multi-Stage Dockerfile ✅
**File:** `Dockerfile`

**Stage 1: Build**
- Base: `node:18-alpine` (~120MB)
- Installs dependencies
- Builds production bundle
- Cleans npm cache

**Stage 2: Production**
- Base: `nginx:alpine` (~23MB)
- Copies only built files from Stage 1
- Adds custom nginx config
- Configures health check
- Runs as non-root user

**Result:** Final image ~25-30MB (90% size reduction!)

### 2. nginx Configuration ✅
**File:** `nginx.conf`

**Features:**
- ✅ SPA routing (`try_files $uri /index.html`)
- ✅ Gzip compression (6x compression level)
- ✅ Static asset caching (1 year for hashed files)
- ✅ Security headers (CSP, X-Frame-Options, etc.)
- ✅ Health check endpoint (`/health`)
- ✅ Performance optimizations
- ✅ Non-root user execution

### 3. .dockerignore ✅
**File:** `.dockerignore`

**Excludes:**
- node_modules (saves ~200MB)
- dist/build folders
- Git files
- IDE config
- Documentation
- Test files

**Impact:** Build context reduced from ~250MB to ~5MB!

### 4. docker-compose Setup ✅
**File:** `docker-compose.yml`

**Services:**
- Frontend (React app with nginx)
- Backend API (example, commented)
- PostgreSQL (example, commented)
- Redis (example, commented)

**Features:**
- ✅ Health checks for all services
- ✅ Auto-restart policies
- ✅ Custom networks
- ✅ Volume management
- ✅ Environment variables

## 🚀 Usage

### Build Docker Image

```bash
# Build image
docker build -t myapp:1.0.0 .

# Check image size (should be ~25-30MB)
docker images myapp:1.0.0

# Expected output:
# REPOSITORY   TAG      SIZE
# myapp        1.0.0    26.5MB
```

### Run Container

```bash
# Run container
docker run -d \
  --name myapp \
  -p 8080:80 \
  myapp:1.0.0

# Visit http://localhost:8080
```

### Test Application

```bash
# Test home page
curl http://localhost:8080/

# Test health check
curl http://localhost:8080/health
# Output: healthy

# Test SPA routing (should return index.html)
curl http://localhost:8080/about
curl http://localhost:8080/dashboard

# Check health status
docker ps
# Should show "healthy" in STATUS column

# View logs
docker logs myapp

# Stop and remove
docker stop myapp
docker rm myapp
```

### Using docker-compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Check status
docker-compose ps

# Expected output:
# NAME       STATUS                   PORTS
# react-app  Up (healthy)             0.0.0.0:3000->80/tcp

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## 📊 Image Optimization Breakdown

### Without Multi-Stage Build:
```
Base image (node:18)          ~900MB
+ Dependencies                +200MB
+ Source code                 +5MB
+ Built files                 +3MB
────────────────────────────────────
Total:                        ~1.1GB ❌
```

### With Multi-Stage Build:
```
Base image (nginx:alpine)     ~23MB
+ Built files only            +3MB
+ Custom nginx config         +10KB
────────────────────────────────────
Total:                        ~26MB ✅
```

**Savings:** 97.6% smaller!

## 🔍 Testing

### Test 1: Build and Size
```bash
docker build -t myapp:test .
docker images myapp:test

# Verify: SIZE column should show ~25-30MB
```

### Test 2: SPA Routing
```bash
docker run -d -p 8080:80 --name test myapp:test

# Test all routes return HTML (not 404)
curl -I http://localhost:8080/
curl -I http://localhost:8080/about
curl -I http://localhost:8080/dashboard/stats
curl -I http://localhost:8080/settings/profile

# All should return: HTTP/1.1 200 OK

docker stop test && docker rm test
```

### Test 3: Compression
```bash
docker run -d -p 8080:80 --name test myapp:test

# Check gzip compression
curl -H "Accept-Encoding: gzip" -I http://localhost:8080/

# Should see: Content-Encoding: gzip

docker stop test && docker rm test
```

### Test 4: Security Headers
```bash
docker run -d -p 8080:80 --name test myapp:test

curl -I http://localhost:8080/

# Should see:
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# X-XSS-Protection: 1; mode=block
# Content-Security-Policy: ...

docker stop test && docker rm test
```

### Test 5: Health Check
```bash
docker run -d -p 8080:80 --name test myapp:test

# Wait 30 seconds for first health check
sleep 35

# Check health status
docker ps

# STATUS column should show: Up X seconds (healthy)

# Check health history
docker inspect test | grep -A 10 Health

docker stop test && docker rm test
```

### Test 6: docker-compose
```bash
docker-compose up -d

# Check all services healthy
docker-compose ps

# Should show:
# react-app   Up (healthy)

# Test app
curl http://localhost:3000/health

# Cleanup
docker-compose down
```

## 🎓 Key Learnings

### 1. Multi-Stage Builds

**Why they matter:**
- **Before:** ~1.1GB image (includes all build tools, source code)
- **After:** ~26MB image (only nginx + built files)
- **Impact:** Faster deployments, lower storage costs

**How it works:**
```dockerfile
# Stage 1: Build (temporary, discarded)
FROM node:18-alpine AS builder
RUN npm ci && npm run build

# Stage 2: Production (final image)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

### 2. SPA Routing in nginx

**The problem:**
```
User visits: https://example.com/dashboard
nginx looks for: /usr/share/nginx/html/dashboard/index.html
File doesn't exist → 404 ❌
```

**The solution:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**How it works:**
1. Try to serve file ($uri)
2. Try to serve directory ($uri/)
3. Fall back to /index.html (React Router handles the route)

### 3. Caching Strategy

**index.html** - No caching:
```nginx
location / {
  add_header Cache-Control "no-cache, must-revalidate";
  expires 0;
}
```
Why? Always get fresh HTML (references new JS/CSS)

**/assets** - Aggressive caching:
```nginx
location /assets {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```
Why? Files have content hash - if changed, new filename

### 4. Security Headers

**Content Security Policy:**
```nginx
add_header Content-Security-Policy "default-src 'self'; ...";
```
Prevents XSS attacks by controlling what resources can load.

**X-Frame-Options:**
```nginx
add_header X-Frame-Options "DENY";
```
Prevents clickjacking by blocking iframe embedding.

### 5. Health Checks

**Purpose:**
- Container orchestrator (Docker, Kubernetes) monitors health
- Unhealthy containers automatically restarted
- Load balancers stop routing traffic to unhealthy instances

**Configuration:**
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -f http://localhost/health || exit 1
```

**States:**
- starting → healthy → unhealthy → restarted

## 📈 Performance Impact

### Deployment Speed
- **Before:** Deploy ~1.1GB image → 5-10 minutes
- **After:** Deploy ~26MB image → 30-60 seconds
- **Improvement:** 10x faster deployments

### Storage Costs
- **Per environment:** ~1GB → ~26MB (97% savings)
- **10 environments:** ~10GB → ~260MB
- **Annual savings:** Hundreds of dollars on container registry storage

### Startup Time
- **node:18 base:** ~5-10 seconds
- **nginx:alpine base:** ~1-2 seconds
- **Improvement:** 5x faster container startup

## 💡 Production Recommendations

### 1. Use BuildKit for Faster Builds
```bash
# Enable BuildKit (faster, better caching)
export DOCKER_BUILDKIT=1
docker build -t myapp:1.0.0 .
```

### 2. Tag Images Properly
```bash
# Semantic versioning
docker build -t myapp:1.2.3 .
docker build -t myapp:1.2 .
docker build -t myapp:1 .
docker build -t myapp:latest .
```

### 3. Scan for Vulnerabilities
```bash
# Scan image for security issues
docker scan myapp:1.0.0

# Or use Trivy
trivy image myapp:1.0.0
```

### 4. Use Layer Caching
```dockerfile
# Copy package files first (cached if unchanged)
COPY package*.json ./
RUN npm ci

# Copy source code last (changes frequently)
COPY . .
```

### 5. Optimize nginx Worker Processes
```nginx
# Auto-detect number of CPU cores
worker_processes auto;
```

## 🐛 Troubleshooting

### Issue: "404 Not Found" on routes

**Problem:** SPA routing not configured
**Solution:** Add `try_files $uri $uri/ /index.html;`

### Issue: Large image size

**Problem:** Not using multi-stage build
**Solution:** Separate build and production stages

### Issue: Health check failing

**Problem:** curl not installed or endpoint not configured
**Solution:**
```dockerfile
RUN apk add --no-cache curl
```

### Issue: Permission denied errors

**Problem:** Running as root user
**Solution:** Create and switch to non-root user

### Issue: Static assets not loading

**Problem:** nginx MIME types not configured
**Solution:**
```nginx
include /etc/nginx/mime.types;
```

## 🎯 Next Steps

1. **Push to Registry**
```bash
docker tag myapp:1.0.0 your-registry.com/myapp:1.0.0
docker push your-registry.com/myapp:1.0.0
```

2. **Deploy to Kubernetes**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: myapp
        image: myapp:1.0.0
```

3. **Add SSL/TLS**
- Use Let's Encrypt for free certificates
- Configure nginx for HTTPS
- Enable HTTP/2

4. **Implement Blue-Green Deployment**
- Run two versions simultaneously
- Switch traffic with load balancer
- Instant rollback capability

## 🎉 Success!

You've successfully containerized a React application with:
- ✅ 97% smaller image size
- ✅ Production-ready nginx configuration
- ✅ SPA routing working correctly
- ✅ Security headers implemented
- ✅ Health checks configured
- ✅ docker-compose setup for local dev

This Docker setup is ready for:
- ✅ Production deployments
- ✅ Kubernetes orchestration
- ✅ CI/CD pipelines
- ✅ Cloud platforms (AWS ECS, Google Cloud Run, etc.)

You're ready for the Challenge Project! 🚀

