# Docker Basics - Starter

This is the starter code for Exercise 1: Docker Basics.

## Your Task

Containerize this React application by creating:

1. **Dockerfile** - Define how to build your Docker image
2. **.dockerignore** - Exclude unnecessary files from the image

## Getting Started

```bash
# Install dependencies
npm install

# Test locally first
npm start
```

Visit http://localhost:3000 to see the app running.

## What You Need to Create

### Dockerfile

Create a `Dockerfile` in this directory with:
- Base image: `node:18-alpine`
- Working directory: `/app`
- Copy package files and install dependencies
- Copy source code
- Expose port 3000
- Start command: `npm start`

### .dockerignore

Create a `.dockerignore` file to exclude:
- node_modules
- build
- .git
- .env
- *.md

## Build and Run

```bash
# Build the image
docker build -t react-app:dev .

# Run the container
docker run -p 3000:3000 react-app:dev
```

## Success Criteria

- [ ] Dockerfile builds successfully
- [ ] Container runs without errors
- [ ] App accessible at http://localhost:3000
- [ ] Image size is reasonable

Good luck! 🚀

See the [Exercise README](../README.md) for detailed instructions.

