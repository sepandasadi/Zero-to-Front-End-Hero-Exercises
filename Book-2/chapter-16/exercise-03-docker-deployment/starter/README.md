# Exercise 3: Docker Deployment - Starter

## 🎯 Your Mission

Containerize this React application with Docker:
- ✅ Multi-stage Dockerfile (< 30MB target)
- ✅ nginx configuration for SPA routing
- ✅ docker-compose for local development
- ✅ Health checks configured
- ✅ Production-ready setup

## 📁 What's Included

This starter provides:
- Complete React project (optimized build from Exercise 1)
- Production-ready Vite configuration
- Ready to containerize
- **NO Docker configuration yet!**

## 🚀 Getting Started

### Prerequisites

```bash
# Install Docker
# macOS: Download Docker Desktop from docker.com
# Linux: sudo apt-get install docker docker-compose
# Windows: Download Docker Desktop from docker.com

# Verify installation
docker --version
# Should show: Docker version 20.x.x or higher

docker-compose --version
# Should show: Docker Compose version 2.x.x or higher
```

### Test the Application First

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build:production

# Preview production build
npm run preview
```

## 📋 Current State

### What's Missing:
- ❌ No Dockerfile
- ❌ No .dockerignore
- ❌ No nginx configuration
- ❌ No docker-compose.yml
- ❌ Can't run in container

### After Implementation:
- ✅ Multi-stage Dockerfile
- ✅ Optimized nginx config with SPA routing
- ✅ Gzip compression enabled
- ✅ Security headers configured
- ✅ Health checks working
- ✅ Image size < 30MB
- ✅ docker-compose setup

## 📚 Tasks

Refer to the main exercise README for detailed instructions:

### Task 1: Create Multi-Stage Dockerfile
Two stages:
- **Build stage:** Use `node:18-alpine`, install deps, build app
- **Production stage:** Use `nginx:alpine`, copy built files only

### Task 2: Configure nginx
Create `nginx.conf` with:
- SPA routing (`try_files $uri /index.html`)
- Gzip compression
- Security headers (CSP, X-Frame-Options, etc.)
- Static asset caching
- Health check endpoint (`/health`)

### Task 3: Create .dockerignore
Exclude unnecessary files:
- node_modules
- dist/build folders
- .git
- Documentation files
- Test files

### Task 4: Build and Test Docker Image
```bash
docker build -t myapp:1.0.0 .
docker run -p 8080:80 myapp:1.0.0
```

### Task 5: Create docker-compose Setup
Multi-service configuration:
- Frontend (React app)
- Optional: Backend API, database

## 🎯 Success Criteria

When complete, you should have:
- [ ] Docker image < 30MB
- [ ] SPA routing works (all URLs load correctly)
- [ ] Health check endpoint returns 200
- [ ] Gzip compression enabled
- [ ] Security headers present
- [ ] docker-compose starts all services
- [ ] Container runs as non-root user

## 💡 Hints

1. **Multi-stage:** Use `node:alpine` for build, `nginx:alpine` for production
2. **.dockerignore:** Exclude `node_modules`, `dist`, `.git` to reduce build context
3. **nginx:** Remember `try_files $uri $uri/ /index.html` for SPA routing
4. **Health check:** Add `/health` endpoint in nginx that returns 200
5. **Size:** Final image should be ~25-30MB (check with `docker images`)

## 📖 Reference

See the main [Exercise README](../README.md) for complete step-by-step instructions.

See the solution folder for complete working Dockerfile and nginx.conf!

Good luck! 🐳
