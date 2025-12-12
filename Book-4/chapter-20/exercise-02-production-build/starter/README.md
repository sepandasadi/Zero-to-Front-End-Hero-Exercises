# Production Build - Starter

This is the starter code for Exercise 2: Production Build with Multi-Stage Docker.

## Your Task

Create a production-ready Docker image using:
1. **Multi-stage Dockerfile** (builder + nginx)
2. **nginx configuration** for SPA routing
3. **Security headers**
4. **Health check endpoint**

## Getting Started

```bash
# Install dependencies
npm install

# Test locally
npm start
```

Visit http://localhost:3000 and test the routing.

## What You Need to Create

### 1. Dockerfile (Multi-Stage)

**Stage 1: Builder**
- Use `node:18-alpine` as build stage
- Install dependencies
- Build the React app (`npm run build`)

**Stage 2: Production**
- Use `nginx:alpine`
- Copy build files from builder stage
- Copy nginx configuration
- Expose port 80

### 2. nginx.conf

Create an nginx configuration file that:
- Serves static files from `/usr/share/nginx/html`
- Handles SPA routing (all routes → index.html)
- Adds security headers
- Implements caching for static assets
- Provides a health check endpoint

### 3. .dockerignore

Exclude unnecessary files:
- node_modules
- build
- .git
- *.md

## Build and Test

```bash
# Build the multi-stage image
docker build -t react-prod:v1 .

# Check the size (should be < 30 MB!)
docker images react-prod:v1

# Run the container
docker run -p 8080:80 react-prod:v1
```

Visit http://localhost:8080

## Testing Checklist

- [ ] App loads at http://localhost:8080
- [ ] Navigation works (click links)
- [ ] Refresh on /about or /contact still works (SPA routing)
- [ ] Health check works: `curl http://localhost:8080/health`
- [ ] Image size is < 30 MB
- [ ] Security headers are present

## Success Criteria

- ✅ Multi-stage build works
- ✅ nginx serves the app correctly
- ✅ SPA routing works (refresh on any route)
- ✅ Health check returns 200 OK
- ✅ Image size < 30 MB (massive reduction from ~450 MB!)
- ✅ Security headers configured

## Hints

**nginx SPA routing:**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Health check:**
```nginx
location /health {
    return 200 "OK";
    add_header Content-Type text/plain;
}
```

Good luck! 🚀

See the [Exercise README](../README.md) for detailed instructions.

