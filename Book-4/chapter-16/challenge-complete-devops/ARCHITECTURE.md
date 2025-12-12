# System Architecture

## 🏗️ Overview

This document describes the complete architecture of our DevOps setup, including build processes, CI/CD pipelines, deployment infrastructure, and monitoring systems.

---

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          Developer Workflow                          │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ├─ git push
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│                         GitHub Repository                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │   main       │  │  feature/*   │  │    tags      │             │
│  │   branch     │  │   branches   │  │   (releases) │             │
│  └──────────────┘  └──────────────┘  └──────────────┘             │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ├─ webhook trigger
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│                       GitHub Actions (CI/CD)                         │
│                                                                       │
│  ┌────────────────────── CI Pipeline ──────────────────────┐        │
│  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────────┐           │        │
│  │  │ Lint │  │ Test │  │Build │  │ Security │  (parallel)│        │
│  │  └──────┘  └──────┘  └──────┘  └──────────┘           │        │
│  │      └────────┬────────┘                                │        │
│  │               ↓                                         │        │
│  │        All checks pass ✅                               │        │
│  └─────────────────────────────────────────────────────────┘        │
│                               │                                      │
│  ┌────────────────────── CD Pipeline ──────────────────────┐        │
│  │                                                          │        │
│  │  Staging Deploy (Auto)    Production Deploy (Manual)    │        │
│  │        ↓                           ↓                     │        │
│  │  ┌──────────┐              ┌──────────────┐            │        │
│  │  │  Build   │              │ Wait for     │            │        │
│  │  │  Upload  │              │ Approval     │            │        │
│  │  │  Deploy  │              │    👤         │            │        │
│  │  └──────────┘              └──────────────┘            │        │
│  │        │                           │                     │        │
│  └────────┼───────────────────────────┼────────────────────┘        │
└───────────┼───────────────────────────┼─────────────────────────────┘
            │                           │
            ↓                           ↓
┌──────────────────┐          ┌──────────────────┐
│   Staging Env    │          │  Production Env  │
│                  │          │                  │
│  Docker Container│          │ Docker Container │
│  ┌────────────┐ │          │ ┌────────────┐  │
│  │   nginx    │ │          │ │   nginx    │  │
│  │   Alpine   │ │          │ │   Alpine   │  │
│  │   (~26MB)  │ │          │ │   (~26MB)  │  │
│  └────────────┘ │          │ └────────────┘  │
│                  │          │                  │
│  Vercel/Netlify  │          │  Vercel/Netlify │
└──────────────────┘          └──────────────────┘
            │                           │
            └───────────┬───────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────────────┐
│                         Monitoring & Alerts                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │  Sentry  │  │ Web Vitals│  │Analytics │  │  Slack   │           │
│  │  Errors  │  │Performance│  │ User Data│  │  Alerts  │           │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🧩 Component Details

### 1. Source Code Management

**Platform:** GitHub

**Repository Structure:**
```
my-app/
├── .github/
│   └── workflows/
│       ├── ci.yml          # Continuous Integration
│       └── deploy.yml      # Continuous Deployment
├── src/
│   ├── components/
│   ├── pages/
│   ├── config.js          # Environment config
│   └── main.jsx
├── public/
├── Dockerfile             # Multi-stage build
├── docker-compose.yml     # Local development
├── nginx.conf             # Production server config
├── vite.config.js         # Build configuration
└── package.json
```

**Branch Strategy:**
- `main` - Production-ready code
- `feature/*` - Feature development
- `hotfix/*` - Emergency fixes
- Tags - Release versions (v1.0.0, v1.1.0, etc.)

---

### 2. Build System

**Tool:** Vite 5.x

**Build Process:**
```javascript
1. Install dependencies (npm ci)
2. Run build (npm run build:production)
3. Code splitting:
   - vendor.js   (~140KB) - React, ReactDOM
   - router.js   (~25KB)  - React Router
   - utils.js    (~20KB)  - Axios, utilities
   - index.js    (~15KB)  - Application code
4. Minification (esbuild)
5. Gzip compression
6. Source map generation
```

**Output:**
```
dist/
├── index.html
├── assets/
│   ├── vendor.[hash].js
│   ├── router.[hash].js
│   ├── utils.[hash].js
│   ├── index.[hash].js
│   ├── index.[hash].css
│   └── *.map (source maps)
└── stats.html (bundle analysis)
```

**Optimization Techniques:**
- Tree shaking (remove unused code)
- Code splitting (lazy loading)
- Asset hashing (cache busting)
- Minification (reduce file size)
- Compression (gzip/brotli)

---

### 3. CI Pipeline (GitHub Actions)

**Trigger:** Pull request or push to main

**Jobs (Parallel Execution):**

#### Job 1: Lint & Type Check
```yaml
- Checkout code
- Setup Node.js 18
- Install dependencies (npm ci)
- Run ESLint
- Check code formatting (Prettier)
Duration: ~15-20 seconds
```

#### Job 2: Test
```yaml
- Checkout code
- Setup Node.js 18
- Install dependencies (npm ci)
- Run tests with coverage (Vitest)
- Upload coverage to Codecov
Duration: ~60-90 seconds
```

#### Job 3: Build
```yaml
- Checkout code
- Setup Node.js 18
- Install dependencies (npm ci)
- Build for staging
- Build for production
- Check bundle size (< 512KB)
- Upload artifacts
Duration: ~120 seconds
```

#### Job 4: Security
```yaml
- Checkout code
- Run npm audit
- Check for secrets (TruffleHog)
- Scan dependencies
Duration: ~30 seconds
```

**Total Duration:** ~3-5 minutes (parallel execution)

---

### 4. CD Pipeline (GitHub Actions)

**Trigger:** Push to main or manual workflow dispatch

**Environments:**

#### Staging Environment
```yaml
Trigger: Automatic on main push
Protection: None
Steps:
  1. Build for staging
  2. Deploy to Vercel/Netlify
  3. Run smoke tests
  4. Send Slack notification
Duration: ~2-3 minutes
URL: https://staging.example.com
```

#### Production Environment
```yaml
Trigger: Manual approval after staging
Protection: Required reviewers
Steps:
  1. Wait for approval 👤
  2. Build for production
  3. Upload source maps to Sentry
  4. Deploy to Vercel/Netlify
  5. Create GitHub release
  6. Run production smoke tests
  7. Monitor for 5 minutes
  8. Send Slack notification
Duration: ~5-7 minutes (after approval)
URL: https://example.com
```

---

### 5. Containerization (Docker)

**Multi-Stage Build:**

```dockerfile
# Stage 1: Build (temporary)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
# Result: ~200MB (discarded)

# Stage 2: Production (final)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
# Result: ~26MB (90% reduction!)
```

**Container Configuration:**
- Base: nginx:alpine (~23MB)
- Health check: /health endpoint
- User: non-root (nodejs:1001)
- Exposed port: 80

---

### 6. Web Server (nginx)

**Key Features:**

```nginx
# SPA Routing
location / {
  try_files $uri $uri/ /index.html;
}

# Asset Caching
location /assets {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

# Gzip Compression
gzip on;
gzip_types text/plain text/css application/json application/javascript;

# Security Headers
add_header X-Frame-Options "DENY";
add_header Content-Security-Policy "default-src 'self';...";
add_header X-Content-Type-Options "nosniff";
```

**Performance:**
- Gzip compression: 6x ratio
- Static asset caching: 1 year
- index.html: no-cache (always fresh)

---

### 7. Hosting Infrastructure

**Platform:** Vercel / Netlify

**Features:**
- Global CDN (edge locations worldwide)
- Automatic SSL/TLS certificates
- Instant rollback capabilities
- Preview deployments for PRs
- Built-in analytics
- Serverless functions (if needed)

**CDN Architecture:**
```
User Request
    ↓
Nearest Edge Server (10-50ms)
    ↓
Cache Hit? → Return cached asset
    ↓
Cache Miss? → Fetch from origin → Cache → Return
```

---

### 8. Monitoring & Observability

#### Sentry (Error Tracking)
```javascript
// Initialize in src/main.jsx
Sentry.init({
  dsn: VITE_SENTRY_DSN,
  environment: 'production',
  tracesSampleRate: 1.0,
  beforeSend(event) {
    // Filter PII, enhance context
    return event;
  }
});
```

**Metrics Tracked:**
- Error rate (errors/hour)
- Error types and frequency
- Affected users (%)
- Stack traces (with source maps)
- User sessions replay

#### Web Vitals (Performance)
```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Report to analytics
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
```

**Metrics Tracked:**
- LCP (Largest Contentful Paint) - < 2.5s
- FID (First Input Delay) - < 100ms
- CLS (Cumulative Layout Shift) - < 0.1
- FCP (First Contentful Paint) - < 1.8s
- TTFB (Time to First Byte) - < 600ms

#### Google Analytics (User Behavior)
- Active users
- Page views
- Session duration
- Conversion rates
- User flow

---

## 🔄 Data Flow

### 1. Development Flow

```
Developer → Code → Git Push → GitHub
                                  ↓
                          GitHub Actions (CI)
                                  ↓
                          All checks pass ✅
                                  ↓
                          Code Review
                                  ↓
                          Merge to main
```

### 2. Deployment Flow

```
Merge to main → GitHub Actions → Build
                                   ↓
                          Deploy to Staging
                                   ↓
                          Automated Tests
                                   ↓
                          Manual Approval 👤
                                   ↓
                          Deploy to Production
                                   ↓
                          Monitor (5 min)
                                   ↓
                          Success! 🎉
```

### 3. User Request Flow

```
User → example.com → DNS → CDN Edge Server
                              ↓
                       Cache Hit? → Return HTML
                              ↓
                       Cache Miss? → Origin
                              ↓
                       nginx Container
                              ↓
                       index.html + Assets
                              ↓
                       Browser Renders
                              ↓
                       API Calls (if needed)
```

---

## 🔒 Security Architecture

### 1. Build Security
- Dependency scanning (npm audit)
- Secret scanning (TruffleHog)
- No secrets in code or env files
- Lockfile validation (npm ci)

### 2. Deployment Security
- GitHub Secrets for sensitive data
- Environment-specific credentials
- Branch protection rules
- Required code reviews
- Status check enforcement

### 3. Runtime Security
- Content Security Policy (CSP)
- Security headers (X-Frame-Options, etc.)
- HTTPS only (TLS 1.2+)
- Non-root container user
- Regular dependency updates

### 4. Monitoring Security
- Error tracking without PII
- Secure source map handling
- Access control on dashboards
- Alert on security events

---

## 📈 Scalability

### Current Architecture
- Single container per environment
- CDN for static assets
- Serverless functions for API (if needed)

**Capacity:**
- Staging: 100 concurrent users
- Production: 10,000+ concurrent users (CDN)

### Future Scaling Options

#### Horizontal Scaling
```
Load Balancer
    ↓
┌─────┬─────┬─────┐
│ C1  │ C2  │ C3  │  (Multiple containers)
└─────┴─────┴─────┘
```

#### Kubernetes Orchestration
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3  # Auto-scaling
  template:
    spec:
      containers:
      - name: myapp
        image: myapp:1.0.0
```

---

## 💰 Cost Breakdown

### Monthly Costs (Estimated)

| Service | Tier | Cost |
|---------|------|------|
| GitHub Actions | Free tier | $0 |
| Vercel Hosting | Hobby | $0 |
| Sentry | Developer | $0 |
| Domain | Namecheap | $12/yr |
| **Total** | | **~$1/month** |

**Note:** Free tiers suitable for small-medium apps. Upgrade as needed for growth.

---

## 🔧 Technology Stack

### Frontend
- React 18.2
- React Router 6.20
- Axios 1.6

### Build Tools
- Vite 5.0
- Rollup (via Vite)
- esbuild (minification)

### Testing
- Vitest
- React Testing Library
- jsdom

### CI/CD
- GitHub Actions
- Vercel deployment

### Containerization
- Docker
- docker-compose
- nginx

### Monitoring
- Sentry (errors)
- Web Vitals (performance)
- Google Analytics (users)

---

## 📊 Performance Metrics

### Build Performance
- Development startup: < 1 second
- Production build: 2-3 minutes
- Bundle size: ~185KB (gzipped)
- Code splitting: 4 chunks

### CI/CD Performance
- CI pipeline: 3-5 minutes
- Staging deployment: 2-3 minutes
- Production deployment: 5-7 minutes
- Total (main → production): 10-15 minutes

### Runtime Performance
- LCP: < 1.2s (target: < 2.5s)
- FID: < 50ms (target: < 100ms)
- CLS: < 0.05 (target: < 0.1)
- Lighthouse Score: 95+ / 100

### Infrastructure Performance
- CDN response time: 10-50ms
- Container startup: < 2 seconds
- Health check interval: 30 seconds
- Auto-restart: < 1 minute

---

## 🎯 Future Enhancements

### Short-term (1-3 months)
- [ ] Add E2E tests (Playwright/Cypress)
- [ ] Implement canary deployments
- [ ] Add performance budgets
- [ ] Set up Lighthouse CI

### Medium-term (3-6 months)
- [ ] Migrate to Kubernetes
- [ ] Add feature flags
- [ ] Implement A/B testing
- [ ] Add real user monitoring (RUM)

### Long-term (6-12 months)
- [ ] Multi-region deployment
- [ ] Infrastructure as Code (Terraform)
- [ ] Automated security scanning
- [ ] Advanced observability (traces, logs)

---

**Last Updated:** [Date]
**Owner:** DevOps Team
**Review Frequency:** Quarterly

