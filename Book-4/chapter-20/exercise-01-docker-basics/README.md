# Exercise 1: Docker Basics - Containerize a React App

**Difficulty:** ⭐ Beginner
**Time:** 1-2 hours

## 🎯 Learning Objectives
- Create your first Dockerfile
- Build Docker images
- Run containers locally
- Understand Docker layers
- Access containerized applications

## 📋 Prerequisites
- Docker Desktop installed
- Node.js and npm installed
- Basic React knowledge

## 🚀 Getting Started

### 1. Navigate to the starter folder
```bash
cd exercise-01-docker-basics/starter
```

### 2. Install dependencies
```bash
npm install
```

### 3. Test the React app locally
```bash
npm start
```

Visit http://localhost:3000 to verify the app works.

## 📝 Instructions

### Step 1: Create a Dockerfile (15 minutes)

Create a `Dockerfile` in the starter folder with:

1. **Choose a base image:** Use `node:18-alpine` (lightweight Node.js image)
2. **Set working directory:** `/app`
3. **Copy package files:** Copy `package*.json` first (layer caching!)
4. **Install dependencies:** Run `npm ci --only=production`
5. **Copy source code:** Copy all remaining files
6. **Expose port:** Port 3000
7. **Start command:** `npm start`

**Hint:** Each instruction creates a layer. Order matters for caching!

### Step 2: Create .dockerignore (5 minutes)

Create a `.dockerignore` file to exclude unnecessary files:
- node_modules
- build
- .git
- .env
- *.md

**Why?** Reduces image size and build time.

### Step 3: Build the Docker image (10 minutes)

```bash
# Build the image
docker build -t react-app:dev .

# Check the image
docker images | grep react-app
```

**Expected:** You should see your image with tag `dev`

### Step 4: Run the container (10 minutes)

```bash
# Run the container
docker run -p 3000:3000 --name react-container react-app:dev
```

Visit http://localhost:3000 - your containerized app should be running!

### Step 5: Docker CLI Practice (20 minutes)

Try these commands:

```bash
# List running containers
docker ps

# Stop the container
docker stop react-container

# Start it again
docker start react-container

# View logs
docker logs react-container

# Follow logs in real-time
docker logs -f react-container

# Execute command inside container
docker exec -it react-container sh

# Remove container
docker rm -f react-container

# Remove image
docker rmi react-app:dev
```

### Step 6: Add hot reload (20 minutes)

For development, you want code changes to reflect immediately.

Run with volume mounting:

```bash
docker run -p 3000:3000 \
  -v $(pwd)/src:/app/src \
  --name react-dev \
  react-app:dev
```

Now edit `src/App.js` and see changes reflect immediately!

### Step 7: Optimize the Dockerfile (20 minutes)

Make these improvements:

1. **Environment variable:** Add `ENV NODE_ENV=development`
2. **Non-root user:** Create and switch to non-root user for security
3. **Health check:** Add a simple health check

Rebuild and test:

```bash
docker build -t react-app:dev-optimized .
docker run -p 3000:3000 react-app:dev-optimized
```

## ✅ Success Criteria

- [ ] Dockerfile builds successfully
- [ ] Container runs and app is accessible at http://localhost:3000
- [ ] .dockerignore excludes unnecessary files
- [ ] Image size is reasonable (< 500 MB)
- [ ] You can view logs with `docker logs`
- [ ] Hot reload works with volume mounting
- [ ] Health check passes (`docker inspect --format='{{.State.Health.Status}}' <container>`)

## 🧪 Testing

1. **Build test:**
```bash
docker build -t react-app:test .
```
Should complete without errors.

2. **Run test:**
```bash
docker run -d -p 3000:3000 --name test-container react-app:test
sleep 5
curl http://localhost:3000
docker rm -f test-container
```
Should return HTML content.

3. **Size check:**
```bash
docker images react-app:test
```
Should be under 500 MB.

## 💡 Helpful Tips

**Build not working?**
- Check your Dockerfile syntax
- Make sure you're in the right directory
- Try `docker build --no-cache -t react-app:dev .`

**Container not accessible?**
- Check port mapping with `docker ps`
- Make sure port 3000 isn't already in use
- Try `docker logs <container-name>` to see errors

**Want to see what's inside the image?**
```bash
docker run -it react-app:dev sh
```

**Clean up everything:**
```bash
docker rm -f $(docker ps -aq)
docker rmi $(docker images -q react-app)
```

## 🎓 Key Concepts

**Docker Image:**
A read-only template with instructions for creating a container. Like a class in OOP.

**Docker Container:**
A runnable instance of an image. Like an object instance.

**Layer Caching:**
Docker caches each layer. If nothing changed, it reuses the cache. That's why we copy package.json first!

**Volume Mounting:**
Allows sharing files between host and container. Perfect for development.

**Port Mapping:**
`-p 3000:3000` maps host port 3000 to container port 3000.

## 📚 Additional Resources

- [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)
- [Docker CLI Reference](https://docs.docker.com/engine/reference/commandline/cli/)
- [Best Practices](https://docs.docker.com/develop/dev-best-practices/)

## 🎯 Next Steps

Once you complete this exercise:
1. Compare your solution with the provided solution
2. Try building other apps (Vue, Angular)
3. Move on to [Exercise 2: Production Build →](../exercise-02-production-build/README.md)

---

[Back to Chapter 20](../README.md)

