# CI/CD Pipeline - Solution

This is the complete solution for Exercise 4: Automated Docker Builds with GitHub Actions.

## What's Included

### GitHub Actions Workflow
`.github/workflows/docker-build.yml` with:
- ✅ Automated testing on every push
- ✅ Docker image building
- ✅ Push to GitHub Container Registry
- ✅ Security vulnerability scanning (Trivy)
- ✅ Multi-platform builds (amd64 + arm64)
- ✅ Layer caching for faster builds
- ✅ Automatic tagging (latest, SHA, branch)

## Workflow Overview

```
┌─────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Test   │───▶│Build & Push  │───▶│Security Scan │───▶│Multi-Platform│
│  Job    │    │    Job       │    │    Job       │    │    Build     │
└─────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

## Setup Instructions

### 1. Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. GitHub Container Registry Setup

No additional secrets needed! The workflow uses `GITHUB_TOKEN` which is automatically provided.

### 3. Trigger the Workflow

The workflow runs automatically on:
- Push to main/master
- Pull requests
- Manual trigger (Actions tab → Run workflow)

### 4. View Results

1. Go to your repository
2. Click "Actions" tab
3. See the workflow runs

## Workflow Breakdown

### Job 1: Test

```yaml
test:
  runs-on: ubuntu-latest
  steps:
    - Checkout code
    - Setup Node.js
    - Install dependencies
    - Run tests
```

**Purpose:** Ensure code quality before building image

### Job 2: Build and Push

```yaml
build-and-push:
  needs: test
  steps:
    - Setup Docker Buildx
    - Login to GHCR
    - Extract metadata (tags)
    - Build and push image
```

**Purpose:** Build production Docker image and push to registry

**Tags created:**
- `latest` (on main branch)
- `main-abc1234` (branch + commit SHA)
- `pr-123` (on pull requests)

### Job 3: Security Scan

```yaml
security-scan:
  needs: build-and-push
  steps:
    - Run Trivy scanner
    - Upload results to GitHub Security
```

**Purpose:** Scan for vulnerabilities and report in Security tab

### Job 4: Multi-Platform Build

```yaml
multi-platform:
  needs: security-scan
  steps:
    - Setup QEMU (for ARM emulation)
    - Build for linux/amd64 and linux/arm64
```

**Purpose:** Create images that work on both Intel and ARM processors

## Using the Image

### Pull from GitHub Container Registry

```bash
# Login (if repository is private)
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Pull the image
docker pull ghcr.io/USERNAME/REPO:latest

# Run the container
docker run -p 80:80 ghcr.io/USERNAME/REPO:latest
```

### Pull Multi-Platform Image

```bash
docker pull ghcr.io/USERNAME/REPO:multi-platform
```

This works on both Intel Macs and M1/M2 Macs (ARM)!

## Features Explained

### 1. Docker Buildx
Enables advanced Docker features:
- Multi-platform builds
- Advanced caching
- Build parallelization

### 2. Layer Caching
```yaml
cache-from: type=gha
cache-to: type=gha,mode=max
```
Speeds up builds by reusing layers from previous builds.

### 3. Metadata Action
```yaml
docker/metadata-action@v5
```
Automatically generates tags and labels based on:
- Branch name
- Commit SHA
- Pull request number
- Semantic version tags

### 4. QEMU
```yaml
docker/setup-qemu-action@v3
```
Enables building for ARM architecture on Intel runners.

### 5. Security Scanning
```yaml
aquasecurity/trivy-action
```
Scans image for:
- CVEs (Common Vulnerabilities and Exposures)
- Misconfigurations
- Exposed secrets
- License issues

## Viewing Results

### 1. Workflow Status

Add badge to README.md:
```markdown
![Docker Build](https://github.com/USERNAME/REPO/workflows/Docker%20Build%20and%20Push/badge.svg)
```

### 2. Security Scan Results

View in: Repository → Security → Code scanning

### 3. Package Registry

View published images: Repository → Packages

## Common Issues

### **Workflow fails on push to GHCR**

**Solution:** Ensure `packages: write` permission is set:
```yaml
permissions:
  contents: read
  packages: write
```

### **Multi-platform build is slow**

**Solution:** This is normal. ARM emulation is slower. Consider:
- Only building multi-platform on releases
- Using native ARM runners (GitHub-hosted ARM runners)

### **Security scan finds vulnerabilities**

**Solution:**
1. Check severity (critical vs low)
2. Update base image: `FROM nginx:alpine` → `FROM nginx:1.25-alpine`
3. Update dependencies

### **Tests fail**

**Solution:** Ensure tests pass locally first:
```bash
npm test
```

## Advanced: Conditional Jobs

Run security scan only on main branch:
```yaml
security-scan:
  if: github.ref == 'refs/heads/main'
```

Build multi-platform only on tags:
```yaml
multi-platform:
  if: startsWith(github.ref, 'refs/tags/')
```

## What You Learned

1. ✅ Creating GitHub Actions workflows
2. ✅ Automating Docker builds
3. ✅ Pushing to container registries
4. ✅ Implementing security scanning
5. ✅ Building multi-platform images
6. ✅ Using layer caching
7. ✅ Automatic tagging strategies
8. ✅ CI/CD best practices

## Next Steps

Move on to [Exercise 5: Kubernetes Deployment](../exercise-05-kubernetes-deployment/README.md) to learn about:
- Kubernetes manifests
- Deployments and services
- Auto-scaling
- Rolling updates

Excellent work! You now have a fully automated CI/CD pipeline! 🎉

