# Troubleshooting Guide

## 🎯 Overview

This guide provides solutions to common issues encountered during development, build, deployment, and production operations.

---

## 📋 Quick Reference

| Issue | Likely Cause | Quick Fix |
|-------|-------------|-----------|
| Build fails | Missing dependencies | `npm ci` |
| Tests fail | Node version mismatch | Use Node 18+ |
| Lint errors | Code style issues | `npm run lint:fix` |
| Docker build slow | No .dockerignore | Add .dockerignore |
| 404 on routes | nginx misconfigured | Check try_files directive |
| High bundle size | No code splitting | Configure manualChunks |
| CI not running | Workflow file missing | Check .github/workflows/ |
| Deploy fails | Missing secrets | Check GitHub Secrets |
| Source maps missing | Not generated | sourcemap: true in vite.config.js |
| Health check fails | Endpoint not configured | Add /health in nginx.conf |

---

## 🔧 Build Issues

### Issue: `npm install` fails

**Symptoms:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**

**Option 1: Use npm ci (recommended)**
```bash
# Delete existing node_modules
rm -rf node_modules package-lock.json

# Clean install from lockfile
npm ci
```

**Option 2: Force resolution**
```bash
npm install --legacy-peer-deps
```

**Option 3: Update dependencies**
```bash
npm update
npm install
```

---

### Issue: Build fails with "out of memory"

**Symptoms:**
```
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

**Solutions:**

**Option 1: Increase Node memory**
```bash
# In package.json
"scripts": {
  "build": "NODE_OPTIONS=--max-old-space-size=4096 vite build"
}
```

**Option 2: Reduce bundle size**
```bash
# Check what's large
npm run analyze

# Remove large dependencies
# Split code more aggressively
```

**Option 3: Build in stages**
```bash
# Build with less parallelization
export NODE_OPTIONS="--max-old-space-size=2048"
npm run build
```

---

### Issue: Vite dev server won't start

**Symptoms:**
```
Error: Cannot find module 'vite'
```

**Solutions:**

**Check 1: Dependencies installed**
```bash
npm ci
```

**Check 2: Port already in use**
```bash
# Find process using port 5173
lsof -i :5173

# Kill it
kill -9 <PID>

# Or use different port
vite --port 3000
```

**Check 3: Permissions**
```bash
# Clear cache
rm -rf node_modules/.vite
npm run dev
```

---

### Issue: Import errors in development

**Symptoms:**
```
Failed to resolve import "./Component" from "src/App.jsx"
```

**Solutions:**

**Check 1: File exists and path is correct**
```bash
# Check file location
ls -la src/components/Component.jsx

# Fix import path
import Component from './components/Component';
```

**Check 2: File extension**
```bash
# Add .jsx extension if needed
import Component from './components/Component.jsx';
```

**Check 3: Case sensitivity**
```bash
# macOS/Windows are case-insensitive, Linux is not
# Make sure case matches exactly
./components/Component.jsx  # ✅
./components/component.jsx  # ❌ (if file is Component.jsx)
```

---

## 🧪 Testing Issues

### Issue: Tests fail with "Cannot find module"

**Symptoms:**
```
Error: Cannot find module 'react'
```

**Solutions:**

**Check 1: Test dependencies installed**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

**Check 2: Vitest config exists**
```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
});
```

**Check 3: Setup file exists**
```javascript
// src/test/setup.js
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});
```

---

### Issue: Tests pass locally but fail in CI

**Symptoms:**
CI shows test failures that don't happen locally.

**Solutions:**

**Check 1: Node version matches**
```yaml
# .github/workflows/ci.yml
- uses: actions/setup-node@v4
  with:
    node-version: '18'  # Match your local version
```

**Check 2: Use npm ci in CI**
```yaml
# Don't use npm install in CI
- run: npm ci  # ✅ Exact versions from lockfile
```

**Check 3: Environment variables**
```bash
# Make sure test env vars are set in CI
env:
  CI: true
  NODE_ENV: test
```

**Check 4: Timezone issues**
```javascript
// Mock dates in tests
vi.setSystemTime(new Date('2024-01-01'));
```

---

## 🐳 Docker Issues

### Issue: Docker build very slow

**Symptoms:**
Building Docker image takes 10+ minutes.

**Solutions:**

**Check 1: Create .dockerignore**
```
# .dockerignore
node_modules
dist
.git
*.md
coverage
.vscode
```

**Impact:** Reduces build context from ~250MB to ~5MB

**Check 2: Use layer caching**
```dockerfile
# Copy package files first (cached if unchanged)
COPY package*.json ./
RUN npm ci

# Copy source code last (changes frequently)
COPY . .
```

**Check 3: Use BuildKit**
```bash
# Enable BuildKit for faster builds
export DOCKER_BUILDKIT=1
docker build -t myapp:1.0.0 .
```

---

### Issue: Docker image too large

**Symptoms:**
Image size > 500MB

**Solutions:**

**Check 1: Use multi-stage build**
```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production (only this stage in final image)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

**Result:** ~26MB instead of ~500MB

**Check 2: Use alpine base images**
```dockerfile
# Instead of
FROM node:18  # ~900MB

# Use
FROM node:18-alpine  # ~120MB
```

**Check 3: Clean up in same layer**
```dockerfile
RUN npm ci && \
    npm run build && \
    npm cache clean --force
```

---

### Issue: Container exits immediately

**Symptoms:**
```bash
docker run myapp:1.0.0
# Container exits with code 0
```

**Solutions:**

**Check 1: Process runs in foreground**
```dockerfile
# For nginx, use:
CMD ["nginx", "-g", "daemon off;"]

# NOT:
CMD ["nginx"]  # ❌ Daemonizes and exits
```

**Check 2: Check logs**
```bash
docker logs <container-id>
```

**Check 3: Run interactively**
```bash
docker run -it myapp:1.0.0 /bin/sh
# Debug inside container
```

---

### Issue: 404 errors in Docker container

**Symptoms:**
App loads at `/` but shows 404 for `/about`, `/dashboard`, etc.

**Solutions:**

**Check 1: nginx SPA routing configured**
```nginx
# nginx.conf
location / {
  try_files $uri $uri/ /index.html;  # ← Critical for SPA
}
```

**Check 2: nginx config copied to container**
```dockerfile
COPY nginx.conf /etc/nginx/nginx.conf
```

**Check 3: Verify inside container**
```bash
docker exec -it <container> cat /etc/nginx/nginx.conf
```

---

## 🚀 CI/CD Issues

### Issue: GitHub Actions workflow not running

**Symptoms:**
Pushed code but no workflow triggered.

**Solutions:**

**Check 1: Workflow file location**
```bash
# Must be in this exact path:
.github/workflows/ci.yml
```

**Check 2: YAML syntax**
```bash
# Validate YAML syntax
# Use GitHub's workflow validator or yamllint
yamllint .github/workflows/ci.yml
```

**Check 3: Trigger configuration**
```yaml
on:
  push:
    branches: [main]  # Make sure branch name matches
  pull_request:
```

**Check 4: Actions enabled**
- Go to repository Settings → Actions
- Verify "Allow all actions" is selected

---

### Issue: CI job failing on "npm ci"

**Symptoms:**
```
Error: Cannot find package-lock.json
```

**Solutions:**

**Check 1: Commit lockfile**
```bash
git add package-lock.json
git commit -m "Add lockfile"
git push
```

**Check 2: Node version matches**
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'npm'  # Cache dependencies
```

---

### Issue: Deployment secrets not working

**Symptoms:**
```
Error: Required secret 'VERCEL_TOKEN' not found
```

**Solutions:**

**Check 1: Secrets exist in GitHub**
- Settings → Secrets and variables → Actions
- Verify secret name matches exactly (case-sensitive)

**Check 2: Secret referenced correctly**
```yaml
env:
  VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}  # ✅
  # NOT:
  # VERCEL_TOKEN: ${{ VERCEL_TOKEN }}  # ❌
```

**Check 3: Environment secrets vs repository secrets**
```yaml
jobs:
  deploy:
    environment: production  # Uses environment-level secrets
```

---

### Issue: Deployment works but app broken

**Symptoms:**
Deployment succeeds but app shows errors or blank page.

**Solutions:**

**Check 1: Environment variables**
```bash
# Verify env vars set in deployment platform
# Vercel: Project → Settings → Environment Variables
```

**Check 2: Build output**
```bash
# Check if dist/ folder has files
# Download build artifact from GitHub Actions
# Verify index.html and assets exist
```

**Check 3: Browser console errors**
```
# Open DevTools
# Check for:
- Failed to load resource (404s)
- CORS errors
- JavaScript errors
```

**Check 4: API endpoints**
```bash
# Verify API_URL is correct for environment
echo $VITE_API_URL

# Test API endpoint
curl $VITE_API_URL/health
```

---

## 🌐 Production Issues

### Issue: High error rate in Sentry

**Symptoms:**
Sentry shows 100+ errors/minute.

**Solutions:**

**Check 1: Identify error type**
```
# Go to Sentry dashboard
# Look for:
- Most common error
- Affected users (%)
- Browser/device patterns
```

**Check 2: Rollback if critical**
```bash
# If error rate > 5x baseline: ROLLBACK
# See ROLLBACK_PROCEDURE.md
```

**Check 3: Fix and redeploy**
```bash
# Create hotfix branch
git checkout -b hotfix/error-fix

# Fix issue
# Test locally
npm test

# Deploy
git push
```

---

### Issue: Slow page load times

**Symptoms:**
LCP > 4s, users complaining about slowness.

**Solutions:**

**Check 1: Bundle size**
```bash
npm run analyze
# Look for large dependencies
# Check if code splitting is working
```

**Check 2: CDN caching**
```bash
# Check cache headers
curl -I https://example.com/assets/vendor.*.js

# Should see:
Cache-Control: public, max-age=31536000, immutable
```

**Check 3: Network waterfall**
```
# Open DevTools → Network
# Look for:
- Render-blocking resources
- Large assets
- Slow API calls
```

**Check 4: Lighthouse report**
```bash
# Run Lighthouse audit
# Follow recommendations:
- Reduce unused JavaScript
- Optimize images
- Minimize main-thread work
```

---

### Issue: Source maps not working

**Symptoms:**
Sentry shows minified code, can't debug errors.

**Solutions:**

**Check 1: Source maps generated**
```bash
# Verify .map files exist in dist/
ls dist/assets/*.map
```

**Check 2: Source maps uploaded to Sentry**
```yaml
# In deploy.yml
- name: Upload source maps
  run: |
    sentry-cli releases files ${{ github.sha }} upload-sourcemaps ./dist/assets
  env:
    SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
```

**Check 3: Source maps not served publicly**
```nginx
# nginx.conf
location ~ \.map$ {
  deny all;  # Don't serve .map files publicly
}
```

---

### Issue: Health checks failing

**Symptoms:**
Container marked as unhealthy, keeps restarting.

**Solutions:**

**Check 1: Health endpoint configured**
```nginx
# nginx.conf
location /health {
  access_log off;
  return 200 "healthy\n";
  add_header Content-Type text/plain;
}
```

**Check 2: Test health endpoint**
```bash
curl http://localhost/health
# Should return: healthy
```

**Check 3: Adjust health check timing**
```dockerfile
# Give more time for startup
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://localhost/health || exit 1
```

---

## 📱 Environment-Specific Issues

### Development

**Issue:** Hot reload not working
```bash
# Solution: Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

**Issue:** Port already in use
```bash
# Find and kill process
lsof -i :5173
kill -9 <PID>
```

### Staging

**Issue:** Staging shows production data
```bash
# Check environment variable
echo $VITE_API_URL
# Should be: https://api.staging.example.com
```

### Production

**Issue:** Can't reproduce error locally
```bash
# Use production build locally
npm run build:production
npm run preview

# Check Sentry for:
- Browser version
- Device type
- Exact error message
```

---

## 🆘 Emergency Procedures

### Site is Down

1. **Check status**
   ```bash
   curl -I https://example.com
   ```

2. **Check deployment logs**
   - GitHub Actions → Recent workflows
   - Vercel → Deployments

3. **Rollback immediately**
   - See ROLLBACK_PROCEDURE.md

4. **Notify team**
   - Slack: #incidents
   - Create incident ticket

### Data Breach Suspected

1. **DO NOT ROLLBACK** (preserve evidence)
2. **Notify security team immediately**
3. **Document everything**
4. **Follow security incident procedure**

### Performance Degradation

1. **Check monitoring dashboards**
   - Sentry (errors)
   - Web Vitals (performance)
   - Server metrics (CPU/memory)

2. **Identify bottleneck**
   - API slowness?
   - Database issues?
   - CDN problems?

3. **Mitigate**
   - Scale resources
   - Enable caching
   - Rollback if needed

---

## 📞 Getting Help

### Internal Resources
- **Documentation:** `/docs` folder
- **Runbooks:** `DEPLOYMENT_RUNBOOK.md`
- **Architecture:** `ARCHITECTURE.md`

### Team Contacts
- **DevOps:** #devops (Slack)
- **Backend:** #backend-team (Slack)
- **On-call:** @oncall-engineer (Slack)

### External Resources
- [Vite Docs](https://vitejs.dev/)
- [Docker Docs](https://docs.docker.com/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [nginx Docs](https://nginx.org/en/docs/)

---

**Last Updated:** [Date]
**Owner:** DevOps Team
**Contributions:** Welcome! PRs encouraged.

