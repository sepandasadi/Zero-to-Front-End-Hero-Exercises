# CI/CD Pipeline - Starter

This is the starter code for Exercise 4: Automated Docker Builds with GitHub Actions.

## Your Task

Create a GitHub Actions workflow that:
1. Runs tests on every push
2. Builds a Docker image
3. Pushes to GitHub Container Registry (GHCR)
4. Scans for vulnerabilities
5. Builds multi-platform images

## What You Need to Create

### .github/workflows/docker-build.yml

Create a workflow file that:

**Triggers:**
- On push to main
- On pull request
- Manual trigger (workflow_dispatch)

**Jobs:**
1. **Test Job**
   - Checkout code
   - Install dependencies
   - Run tests

2. **Build Job**
   - Checkout code
   - Set up Docker Buildx
   - Login to GHCR
   - Build and push image
   - Tag with commit SHA and latest

3. **Security Scan Job**
   - Scan image with Trivy
   - Upload results

4. **Multi-Platform Build Job**
   - Build for linux/amd64 and linux/arm64

## Setup Steps

### 1. Fork/Create Repository

This exercise requires a GitHub repository.

### 2. Add Secrets

Add these secrets to your GitHub repository:
- `GHCR_TOKEN` - GitHub Personal Access Token with `packages:write` permission

### 3. Create Workflow File

Create `.github/workflows/docker-build.yml` following the structure above.

### 4. Push to GitHub

```bash
git add .
git commit -m "Add CI/CD workflow"
git push origin main
```

## Example Workflow Structure

```yaml
name: Docker Build and Push

on:
  push:
    branches: [ main ]
  pull_request:
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      # Add your test steps

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      # Add your build steps

  security-scan:
    needs: build
    runs-on: ubuntu-latest
    steps:
      # Add security scan steps

  multi-platform:
    needs: security-scan
    runs-on: ubuntu-latest
    steps:
      # Add multi-platform build steps
```

## Success Criteria

- [ ] Workflow triggers on push
- [ ] Tests run successfully
- [ ] Docker image builds
- [ ] Image pushes to GHCR
- [ ] Security scan completes
- [ ] Multi-platform images build (amd64 + arm64)
- [ ] Workflow badge is green

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Build Action](https://github.com/docker/build-push-action)
- [Trivy Action](https://github.com/aquasecurity/trivy-action)

Good luck! 🚀

See the [Exercise README](../README.md) for detailed instructions.

