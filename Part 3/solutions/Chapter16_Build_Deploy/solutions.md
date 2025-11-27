# Chapter 16 — Exercise Solutions

This guide maps each exercise to the provided files and shows the exact commands you can run.

---

## Task 1 — CI workflow builds a versioned artifact
**Files:** `.github/workflows/ci.yml`, `vite.config.js`
- The workflow installs deps, runs lint/types/tests, builds, and uploads an artifact named `web-dist-${{ github.sha }}`.
- `vite.config.js` injects `__BUILD_SHA__` from `GITHUB_SHA` for traceability.

**How to verify locally (simulate):**
```bash
# Run tests and build locally
npm test -- --coverage
npm run build
# Artifact will be in ./dist (the CI job uploads it)
```

---

## Task 2 — Build a Docker image and serve the bundle
**Files:** `Dockerfile`, `nginx.conf`
- Multi-stage build outputs a small Nginx image serving `/usr/share/nginx/html`.

**Commands:**
```bash
# 1) Build the app first
npm ci && npm run build

# 2) Build the Docker image
docker build -t fe-app:chap16 .

# 3) Run it
docker run --rm -p 8080:80 fe-app:chap16

# 4) Open http://localhost:8080
```
Nginx serves the SPA, with static assets cached aggressively.

---

## Task 3 — SPA routing + caching via Nginx
**Files:** `nginx.conf`
- `try_files $uri /index.html;` handles SPA refresh/deep links.
- Static assets receive `Cache-Control: public, max-age=31536000, immutable`.

**Check:**
```bash
curl -I http://localhost:8080/assets/app.[hash].js
# Cache-Control header present; 200 OK
```

---

## Task 4 — Rollback procedure
**Files:** `deploy-checklist.md`, `rollback.md`
- Keep multiple artifacts (by commit SHA). To roll back, point deploy to a previous artifact and invalidate the CDN.

**Sample (conceptual) commands:**
```bash
# Example using a bucket + CloudFront (pseudo)
aws s3 cp s3://bucket/web-dist-<OLD_SHA>/ s3://bucket/current/ --recursive
aws cloudfront create-invalidation --distribution-id ABC123 --paths "/*"
```

---

## Optional — Semantic release
**File:** `semantic-release.config.cjs`
- Uses conventional commits to auto-bump versions and create GitHub releases.
