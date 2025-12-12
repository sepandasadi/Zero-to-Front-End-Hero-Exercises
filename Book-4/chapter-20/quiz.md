# Chapter 20 Quiz: Deployment and DevOps

Test your knowledge of Docker, CI/CD, Kubernetes, and production deployment!

**Instructions:** Answer all 15 questions. Aim for 80% or higher to pass.

---

## Questions

### 1. Docker Basics

**What is the main difference between a Docker image and a Docker container?**

A) An image is running, a container is stopped
B) An image is a template, a container is a running instance
C) An image is larger than a container
D) There is no difference

<details>
<summary>Show Answer</summary>

**Answer: B**

An image is a read-only template with instructions for creating a container. A container is a runnable instance of an image. Think of images as classes and containers as objects in OOP.
</details>

---

### 2. Multi-Stage Builds

**What is the primary benefit of using multi-stage Docker builds?**

A) Faster build times
B) Smaller final image size
C) Better security scanning
D) Easier to write

<details>
<summary>Show Answer</summary>

**Answer: B**

Multi-stage builds allow you to use one image for building (with build tools, dependencies) and another minimal image for production. Only the final build artifacts are copied to the production stage, resulting in much smaller images (e.g., 450 MB → 25 MB).
</details>

---

### 3. Docker Layer Caching

**Which approach best utilizes Docker layer caching?**

```dockerfile
# Option A
COPY . .
RUN npm install

# Option B
COPY package*.json ./
RUN npm install
COPY . .
```

A) Option A - Faster builds
B) Option B - Better caching
C) Both are equivalent
D) Neither uses caching

<details>
<summary>Show Answer</summary>

**Answer: B**

Option B is better. By copying package.json first and running npm install before copying source code, the npm install layer can be cached and reused when only source code changes. Option A invalidates the cache on any code change.
</details>

---

### 4. Docker Compose

**What is the purpose of `depends_on` in docker-compose.yml?**

A) Sets the order services are listed
B) Controls service startup order
C) Defines which services are required
D) Manages service dependencies and startup order

<details>
<summary>Show Answer</summary>

**Answer: D**

`depends_on` controls both startup order and expresses dependencies between services. However, it only waits for the container to start, not for the application to be ready (use health checks for that).
</details>

---

### 5. Docker Networking

**How do services communicate in Docker Compose?**

A) Using localhost and port numbers
B) Using service names as hostnames
C) Using IP addresses only
D) They cannot communicate

<details>
<summary>Show Answer</summary>

**Answer: B**

Docker Compose creates a network where services can reach each other using service names as hostnames. For example, a backend service named `api` can be reached at `http://api:5000` from other services.
</details>

---

### 6. CI/CD Pipeline

**In a typical CI/CD pipeline, what is the correct order of steps?**

A) Build → Test → Deploy → Scan
B) Test → Build → Scan → Deploy
C) Deploy → Test → Build → Scan
D) Scan → Build → Test → Deploy

<details>
<summary>Show Answer</summary>

**Answer: B**

The correct order is: Test (verify code quality) → Build (create artifacts) → Scan (check for vulnerabilities) → Deploy (push to production). You want to fail fast - test before building, and scan before deploying.
</details>

---

### 7. Container Registry

**What is the purpose of a container registry?**

A) To run containers in production
B) To store and distribute Docker images
C) To scan images for vulnerabilities
D) To orchestrate containers

<details>
<summary>Show Answer</summary>

**Answer: B**

A container registry (like Docker Hub, GHCR, ECR) stores and distributes Docker images. It's like npm for Docker images - you push images to the registry and pull them when needed.
</details>

---

### 8. Kubernetes Basics

**What is the smallest deployable unit in Kubernetes?**

A) Container
B) Pod
C) Deployment
D) Node

<details>
<summary>Show Answer</summary>

**Answer: B**

A Pod is the smallest deployable unit in Kubernetes. A Pod can contain one or more containers that share storage and network resources. Most commonly, a Pod contains a single container.
</details>

---

### 9. Kubernetes Service

**What is the purpose of a Kubernetes Service?**

A) To run containers
B) To provide a stable endpoint for accessing Pods
C) To store configuration
D) To scale deployments

<details>
<summary>Show Answer</summary>

**Answer: B**

A Service provides a stable IP address and DNS name for accessing a set of Pods. Pods are ephemeral and can be recreated with new IPs, but the Service IP remains constant.
</details>

---

### 10. ConfigMap vs Secret

**What's the difference between a ConfigMap and a Secret in Kubernetes?**

A) ConfigMap is for configuration, Secret is for sensitive data
B) ConfigMap is stored in etcd, Secret is not
C) ConfigMap is larger than Secret
D) There is no difference

<details>
<summary>Show Answer</summary>

**Answer: A**

ConfigMap stores non-confidential configuration data (like app settings, URLs). Secret stores sensitive data (like passwords, API keys). Secrets are base64 encoded and can be encrypted at rest.
</details>

---

### 11. Horizontal Pod Autoscaler (HPA)

**What does a Horizontal Pod Autoscaler do?**

A) Increases container resources
B) Adds more nodes to the cluster
C) Scales the number of Pod replicas
D) Upgrades Pod versions

<details>
<summary>Show Answer</summary>

**Answer: C**

HPA automatically scales the number of Pod replicas based on metrics like CPU or memory usage. It adds more Pods when load increases and removes Pods when load decreases.
</details>

---

### 12. Rolling Updates

**What is a rolling update in Kubernetes?**

A) Restarting all Pods at once
B) Gradually replacing old Pods with new ones
C) Rolling back to a previous version
D) Updating configuration without restarting

<details>
<summary>Show Answer</summary>

**Answer: B**

A rolling update gradually replaces old Pods with new ones, ensuring no downtime. New Pods are created and become ready before old Pods are terminated. This is the default update strategy.
</details>

---

### 13. Liveness vs Readiness Probes

**What's the difference between liveness and readiness probes?**

A) Liveness checks if container is alive, readiness checks if it's ready for traffic
B) Liveness is for production, readiness is for development
C) They are the same thing
D) Readiness restarts containers, liveness removes them from service

<details>
<summary>Show Answer</summary>

**Answer: A**

- **Liveness probe**: Is the container alive? If it fails, Kubernetes restarts the container.
- **Readiness probe**: Is the container ready to serve traffic? If it fails, Kubernetes removes it from the Service (but doesn't restart it).
</details>

---

### 14. Image Size Optimization

**Which approach results in the smallest Docker image?**

A) `FROM node:18`
B) `FROM node:18-alpine`
C) `FROM nginx:alpine`
D) `FROM busybox`

<details>
<summary>Show Answer</summary>

**Answer: D**

Size comparison:
- `node:18` → ~900 MB
- `node:18-alpine` → ~150 MB
- `nginx:alpine` → ~25 MB
- `busybox` → ~1-5 MB

For serving static files, busybox is the smallest. For production React apps with nginx, `nginx:alpine` is the best balance.
</details>

---

### 15. Security Best Practices

**Which of the following is NOT a Docker security best practice?**

A) Run containers as non-root user
B) Use latest tag for predictability
C) Scan images for vulnerabilities
D) Use minimal base images

<details>
<summary>Show Answer</summary>

**Answer: B**

Using the `latest` tag is NOT a best practice. The `latest` tag is unpredictable and can change over time, leading to inconsistent builds. Always use specific version tags (e.g., `nginx:1.25-alpine` instead of `nginx:latest`).
</details>

---

## Scoring

- **13-15 correct (87-100%):** Excellent! You have a strong understanding of Docker and Kubernetes.
- **11-12 correct (73-80%):** Good job! Review the topics you missed.
- **8-10 correct (53-67%):** You're getting there. Review the chapter and exercises.
- **Below 8 (< 53%):** Needs work. Go back through the exercises and try again.

---

## Key Takeaways

After completing this chapter, you should understand:

1. **Docker Fundamentals**
   - Images vs containers
   - Multi-stage builds
   - Layer caching
   - Dockerfile best practices

2. **Docker Compose**
   - Service orchestration
   - Networking
   - Volumes
   - Development workflows

3. **CI/CD**
   - GitHub Actions
   - Automated testing
   - Image building and pushing
   - Security scanning

4. **Kubernetes**
   - Pods, Deployments, Services
   - ConfigMaps and Secrets
   - Auto-scaling (HPA)
   - Rolling updates
   - Health checks

5. **Production**
   - Image optimization
   - Security hardening
   - Non-root users
   - Resource limits
   - Monitoring

---

## Next Steps

- Complete any exercises you haven't finished
- Tackle the Challenge Project
- Build your own production pipeline
- Deploy a real project to production

**Congratulations on completing Chapter 20!** 🎉

You now have the skills to deploy front-end applications to production using modern DevOps practices!

---

[Back to Chapter 20](./README.md)

