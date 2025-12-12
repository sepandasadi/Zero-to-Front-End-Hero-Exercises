# Docker Basics - Solution

This is the complete solution for Exercise 1: Docker Basics.

## What's Included

### Dockerfile
A production-ready Dockerfile with:
- ✅ Lightweight base image (`node:18-alpine`)
- ✅ Layer caching optimization
- ✅ Non-root user for security
- ✅ Health checks
- ✅ Proper environment variables

### .dockerignore
Excludes unnecessary files to reduce image size:
- node_modules
- Build artifacts
- Git files
- Documentation
- IDE files

## How to Use

### Build the Image

```bash
docker build -t react-app:solution .
```

### Run the Container

```bash
docker run -p 3000:3000 --name react-solution react-app:solution
```

Visit http://localhost:3000

### Development with Hot Reload

```bash
docker run -p 3000:3000 \
  -v $(pwd)/src:/app/src \
  --name react-dev \
  react-app:solution
```

### Check Health Status

```bash
# Wait a few seconds after starting
docker inspect --format='{{.State.Health.Status}}' react-solution
```

Should show: `healthy`

## Key Concepts Demonstrated

### 1. Layer Caching
```dockerfile
# Copy package.json first
COPY package*.json ./
RUN npm ci

# Then copy source (changes more frequently)
COPY . .
```

This ensures npm install only runs when dependencies change.

### 2. Non-Root User
```dockerfile
RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactuser -u 1001
USER reactuser
```

Running as non-root improves security.

### 3. Health Checks
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s CMD node -e "..."
```

Docker can automatically check if the app is healthy.

### 4. .dockerignore
Prevents unnecessary files from being copied:
- Faster builds
- Smaller images
- Better security

## Testing the Solution

### 1. Build Test
```bash
docker build -t react-app:test .
```
Should complete without errors.

### 2. Run Test
```bash
docker run -d -p 3000:3000 --name test react-app:test
sleep 5
curl http://localhost:3000
docker rm -f test
```
Should return HTML.

### 3. Health Check Test
```bash
docker run -d -p 3000:3000 --name health-test react-app:test
sleep 10
docker inspect --format='{{.State.Health.Status}}' health-test
docker rm -f health-test
```
Should show `healthy`.

### 4. Size Check
```bash
docker images react-app:test
```
Should be around 400-500 MB (development build).

## Common Commands

```bash
# View logs
docker logs react-solution

# Follow logs
docker logs -f react-solution

# Execute commands in container
docker exec -it react-solution sh

# Stop container
docker stop react-solution

# Remove container
docker rm react-solution

# Remove image
docker rmi react-app:solution
```

## What You Learned

1. ✅ How to write a Dockerfile
2. ✅ Docker image layers and caching
3. ✅ Building and running containers
4. ✅ Port mapping with `-p`
5. ✅ Volume mounting for development
6. ✅ Security best practices (non-root)
7. ✅ Health checks
8. ✅ Using .dockerignore

## Next Steps

Move on to [Exercise 2: Production Build](../exercise-02-production-build/README.md) to learn about:
- Multi-stage builds
- nginx for production
- Optimizing image size (< 30 MB!)
- Production configurations

Great job completing Exercise 1! 🎉

