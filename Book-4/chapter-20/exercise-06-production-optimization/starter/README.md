# Production Optimization - Starter

This is the starter code for Exercise 6: Optimize Docker images for production.

## Your Task

Optimize a Docker image by:
1. Reducing image size to < 30 MB
2. Scanning for vulnerabilities
3. Using distroless or minimal base images
4. Running as non-root user
5. Implementing advanced layer caching

## Baseline Dockerfile

This is the baseline multi-stage Dockerfile (from Exercise 2):

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Baseline size:** ~25 MB

## Your Goal

Create an **optimized** Dockerfile that:
- Uses distroless or even smaller base images
- Compresses static assets
- Removes unnecessary files
- Runs as non-root user
- Has zero critical vulnerabilities

**Target size:** < 20 MB (or as small as possible!)

## Tasks

### 1. Create Optimized Dockerfile

Try these optimizations:
- Use `gcr.io/distroless/static` for distroless
- Or use `busybox` or `scratch` for minimal size
- Use `.dockerignore` effectively
- Clean up unnecessary files
- Compress assets during build

### 2. Scan for Vulnerabilities

```bash
# Using Trivy
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image YOUR_IMAGE:TAG

# Using Docker Scout (if available)
docker scout cves YOUR_IMAGE:TAG
```

### 3. Compare Sizes

```bash
# Build baseline
docker build -f Dockerfile.baseline -t react-app:baseline .

# Build optimized
docker build -f Dockerfile.optimized -t react-app:optimized .

# Compare
docker images | grep react-app
```

### 4. Benchmark Performance

```bash
# Test startup time
time docker run --rm react-app:baseline /bin/sh -c "exit"
time docker run --rm react-app:optimized /bin/sh -c "exit"
```

## Success Criteria

- [ ] Optimized image < 20 MB
- [ ] Zero critical vulnerabilities
- [ ] Runs as non-root user
- [ ] Startup time < 2 seconds
- [ ] At least 30% size reduction from baseline
- [ ] Application works correctly

## Tips

### Using Distroless

```dockerfile
FROM gcr.io/distroless/static
COPY --from=builder /app/build /usr/share/nginx/html
```

Note: Distroless doesn't include a shell, so you can't `docker exec` into it!

### Compress Assets

```dockerfile
RUN npm run build && \
    find build -type f \( -name '*.js' -o -name '*.css' -o -name '*.html' \) \
    -exec gzip -9 -k {} \;
```

### Multi-Stage with Static Server

Use a tiny static file server like:
- `busybox` with httpd
- Custom Go server (compile to < 5 MB binary)
- Rust server (also very small)

## Resources

- [Distroless Images](https://github.com/GoogleContainerTools/distroless)
- [Trivy Scanner](https://github.com/aquasecurity/trivy)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

Good luck! 🚀

See the [Exercise README](../README.md) for detailed instructions.

