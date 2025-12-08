# Exercise 3: Docker Deployment

**Difficulty:** ⭐⭐ Intermediate
**Time Estimate:** 90-120 minutes

## 🎯 Learning Objectives

By completing this exercise, you will:
- Create multi-stage Docker builds for front-end apps
- Configure nginx for SPA routing and caching
- Optimize Docker image size
- Create docker-compose setups for local development
- Implement health checks

---

## 📋 Scenario

Your team needs to containerize the React application for:
- Consistent deployment across environments
- Easy scaling with container orchestration
- Simplified local development setup
- Production-ready nginx configuration

---

## 🚀 Setup

### Prerequisites

- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- Existing React/Vite project
- Basic understanding of Docker concepts

### Verify Docker Installation

```bash
docker --version
# Should show: Docker version 20.x.x or higher

docker-compose --version
# Should show: Docker Compose version 2.x.x or higher
```

---

## 🎯 Tasks

### Task 1: Create Multi-Stage Dockerfile

**Create `Dockerfile` in project root:**

```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build application
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

**Why multi-stage?**
- Build stage has all dev dependencies (~200MB)
- Production stage only has built files (~5MB)
- **Final image: ~25MB instead of 225MB!**

---

### Task 2: Configure nginx

**Create `nginx.conf`:**

```nginx
events {
  worker_connections 1024;
}

http {
  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  # Logging
  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;

  # Performance
  sendfile on;
  tcp_nopush on;
  tcp_nodelay on;
  keepalive_timeout 65;
  types_hash_max_size 2048;

  # Gzip compression
  gzip on;
  gzip_vary on;
  gzip_min_length 1024;
  gzip_types text/plain text/css text/xml text/javascript
             application/x-javascript application/xml+rss
             application/json application/javascript;

  server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Cache static assets
    location /assets {
      expires 1y;
      add_header Cache-Control "public, immutable";
      access_log off;
    }

    # Cache images, fonts
    location ~* \.(jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ {
      expires 30d;
      add_header Cache-Control "public, immutable";
      access_log off;
    }

    # Health check endpoint
    location /health {
      access_log off;
      return 200 "healthy\n";
      add_header Content-Type text/plain;
    }

    # SPA fallback (all routes → index.html)
    location / {
      try_files $uri $uri/ /index.html;
      add_header Cache-Control "no-cache, must-revalidate";
    }
  }
}
```

**This configuration provides:**
- ✅ SPA routing (all routes fall back to index.html)
- ✅ Gzip compression
- ✅ Security headers
- ✅ Asset caching with far-future expires
- ✅ Health check endpoint
- ✅ Proper MIME types

---

### Task 3: Build and Test Docker Image

**Create `.dockerignore`:**
```
node_modules
dist
.git
.env
.env.local
npm-debug.log
coverage
.vscode
.idea
```

**Build the image:**
```bash
docker build -t myapp:1.0.0 .

# Watch the build process
# Stage 1: Building...
# Stage 2: Creating production image...
```

**Check image size:**
```bash
docker images myapp:1.0.0
# Should be around 25-30MB
```

**Run the container:**
```bash
docker run -p 8080:80 myapp:1.0.0

# Visit http://localhost:8080
# App should load correctly
```

**Test health check:**
```bash
curl http://localhost:8080/health
# Should return: healthy
```

---

### Task 4: Create Docker Compose Setup

**Create `docker-compose.yml`:**

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/health"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 5s
    restart: unless-stopped

  # Optional: Add backend API
  api:
    image: myapp-api:latest
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://db:5432/myapp
    depends_on:
      - db
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 3s
      retries: 3

  # Optional: Add database
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=dev_password
    volumes:
      - db_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  db_data:
```

**Run with docker-compose:**
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

---

### Task 5: Optimize Image Size

**Current size check:**
```bash
docker images myapp:1.0.0
```

**Optimization techniques:**

**1. Use alpine base images** (already done ✅)

**2. Remove unnecessary files in build:**
```dockerfile
# In builder stage, before build
RUN npm ci --only=production=false \
    && npm cache clean --force
```

**3. Analyze layers:**
```bash
docker history myapp:1.0.0
```

**4. Use .dockerignore effectively:**
```
node_modules
dist
.git
*.md
.env*
coverage
.vscode
.DS_Store
```

**Target:** Final image < 30MB

---

## ✅ Success Criteria

Your Docker setup must:

1. **Dockerfile:**
   - ✅ Multi-stage build (builder + production)
   - ✅ Uses alpine images
   - ✅ Final image < 30MB
   - ✅ Includes health check
   - ✅ Runs as non-root user (bonus)

2. **nginx Configuration:**
   - ✅ SPA routing works (all routes → index.html)
   - ✅ Gzip compression enabled
   - ✅ Security headers present
   - ✅ Asset caching configured
   - ✅ Health check endpoint available

3. **Docker Compose:**
   - ✅ Services defined (frontend, optional: api, db)
   - ✅ Health checks configured
   - ✅ Volumes for data persistence
   - ✅ Proper service dependencies

4. **Build & Run:**
   - ✅ `docker build` completes successfully
   - ✅ `docker run` starts app on port 80
   - ✅ App accessible at http://localhost:8080
   - ✅ Health check returns 200

---

## 🧪 Testing

### Test 1: Build and Run

```bash
# Build
docker build -t myapp:test .

# Run
docker run -d -p 8080:80 --name myapp-test myapp:test

# Verify running
docker ps | grep myapp-test

# Check logs
docker logs myapp-test

# Test health check
curl http://localhost:8080/health

# Stop and remove
docker stop myapp-test
docker rm myapp-test
```

---

### Test 2: SPA Routing

```bash
# Start container
docker run -d -p 8080:80 myapp:test

# Test routes
curl http://localhost:8080/
curl http://localhost:8080/about
curl http://localhost:8080/products/123

# All should return 200 and HTML content
# Not 404!
```

---

### Test 3: Compression

```bash
# Check if gzip is working
curl -H "Accept-Encoding: gzip" -I http://localhost:8080/

# Should see:
# Content-Encoding: gzip
```

---

### Test 4: Docker Compose

```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps

# Should show:
# myapp-frontend-1  running
# myapp-api-1       running (if configured)
# myapp-db-1        running (if configured)

# Test frontend
curl http://localhost:3000

# Check health
docker-compose ps
# Should show "(healthy)" status

# Cleanup
docker-compose down
```

---

## 💡 Bonus Challenges

1. **Run as Non-Root User:**
   ```dockerfile
   RUN addgroup -g 1001 -S nodejs && \
       adduser -S nodejs -u 1001
   USER nodejs
   ```

2. **Add Nginx Caching:**
   ```nginx
   proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m;
   ```

3. **Multi-Architecture Build:**
   ```bash
   docker buildx build --platform linux/amd64,linux/arm64 -t myapp:1.0.0 .
   ```

4. **Production Secrets Management:**
   ```yaml
   services:
     frontend:
       secrets:
         - api_key
   secrets:
     api_key:
       external: true
   ```

5. **Resource Limits:**
   ```yaml
   services:
     frontend:
       deploy:
         resources:
           limits:
             cpus: '0.5'
             memory: 256M
   ```

---

## 📚 Resources

- [Docker Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [nginx Documentation](https://nginx.org/en/docs/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

---

## 🎉 Completion

Once you've successfully:
- Created multi-stage Dockerfile
- Configured nginx for SPA routing
- Optimized image size < 30MB
- Set up docker-compose
- Tested all functionality

You're ready for the Challenge Project: Complete DevOps Setup! 🚀

