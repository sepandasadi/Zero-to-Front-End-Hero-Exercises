# Chapter 16 Quiz: Build Tools & Deployment Pipelines

**Time Limit:** 30 minutes
**Passing Score:** 80% (12/15 correct)
**Format:** Multiple choice, some questions may have multiple correct answers

---

## Questions

### 1. Why use multi-stage Docker builds for front-end applications?

A) To run multiple services in one container
B) To reduce final image size by excluding build dependencies
C) To enable parallel processing
D) To support multiple programming languages

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: B**

**Explanation:**

Multi-stage builds separate the build environment from the production environment:

```dockerfile
# Stage 1: Build (includes node_modules, dev dependencies)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build  # Creates dist/

# Stage 2: Production (only includes built files)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Final image: ~25MB instead of ~225MB!
```

**Benefits:**
- Build stage includes all dependencies (~200MB)
- Production stage only has built files (~5MB)
- Final image is 80-90% smaller
- More secure (no build tools in production)

**Why other options are wrong:**
- A: One service per container is best practice
- C: Multi-stage doesn't enable parallelization
- D: Each stage uses same language, just different purposes
</details>

---

### 2. What is the main advantage of Vite over webpack for new projects?

A) Vite has more plugins available
B) Vite uses native ES modules for instant dev server startup
C) Vite produces smaller bundles
D) Vite is easier to configure

<details>
<summary>Answer & Explanation</summary>

**Correct Answers: B and D**

**Explanation:**

**B - Native ES Modules:**
```javascript
// Vite dev server
npm run dev
# Server starts in < 100ms
# No bundling needed in development!

// webpack dev server
npm run dev
# Server starts in 10-30 seconds
# Must bundle everything first
```

**How it works:**
- Vite serves source files as ES modules directly
- Browser's native import system loads modules on-demand
- Only transforms file being requested
- HMR is instant (< 50ms)

**D - Easier Configuration:**
```javascript
// vite.config.js - Simple!
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()]
});

// webpack.config.js - Complex
// 50-100+ lines of configuration needed
```

**Why other options are partially wrong:**
- A: webpack has MORE plugins (older, larger ecosystem)
- C: Both produce similar bundle sizes with proper config
</details>

---

### 3. Which environment variables should NEVER be committed to Git?

A) `VITE_API_URL`
B) `DATABASE_PASSWORD`
C) `VITE_APP_NAME`
D) `AWS_SECRET_ACCESS_KEY`

<details>
<summary>Answer & Explanation</summary>

**Correct Answers: B and D**

**Explanation:**

**Safe to commit (.env.example):**
```bash
# ✅ Public configuration (frontend can access these)
VITE_API_URL=https://api.example.com
VITE_APP_NAME=MyApp
VITE_GOOGLE_ANALYTICS_ID=UA-123456-1

# These are exposed to browser anyway
# No sensitive data
```

**NEVER commit (.gitignore these):**
```bash
# ❌ Private secrets (server-side only)
DATABASE_PASSWORD=super_secret_123
AWS_SECRET_ACCESS_KEY=abc123def456xyz789
STRIPE_SECRET_KEY=sk_live_abc123
ENCRYPTION_KEY=...

# These give access to your infrastructure!
# If leaked = catastrophic breach
```

**Best practice:**
```bash
# .env.example (commit this)
VITE_API_URL=https://api.example.com
DATABASE_PASSWORD=your_password_here

# .env (DON'T commit)
VITE_API_URL=https://api.example.com
DATABASE_PASSWORD=actual_real_password

# .gitignore
.env
.env.local
.env.*.local
```

**Front-end rule:** Only `VITE_*` variables are exposed to browser. Never put secrets in VITE_ vars!
</details>

---

### 4. In a CI/CD pipeline, when should you run tests?

A) Only before deploying to production
B) On every pull request and main branch push
C) Once per day via cron job
D) Only when manually triggered

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: B**

**Explanation:**

**Proper CI/CD pipeline:**
```yaml
# .github/workflows/ci.yml
on:
  pull_request:    # ✅ Test every PR
  push:
    branches: [main]  # ✅ Test every commit to main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm test  # Runs for every change!
```

**Why test on every change:**
- **Catch bugs early** (before code review, not after deploy)
- **Fast feedback** (developer knows immediately if they broke something)
- **Prevent bad merges** (can't merge if tests fail)
- **Build confidence** (green checkmark = safe to deploy)

**Real-world timeline:**
```
10:00 AM - Developer pushes code
10:01 AM - CI runs tests automatically
10:03 AM - Tests pass ✅ or fail ❌
10:05 AM - Developer fixes issues (if any)
10:10 AM - Tests pass ✅
10:15 AM - Code review
10:30 AM - Merge to main
10:31 AM - Auto-deploy to staging
```

**Why other options are bad:**
- A: Too late! Bugs already in production
- C: Once per day misses most changes
- D: Manual = forgotten = bugs in production
</details>

---

### 5. What is the purpose of code splitting in production builds?

A) To make code easier to read
B) To reduce initial JavaScript bundle size
C) To improve development experience
D) To enable server-side rendering

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: B**

**Explanation:**

**Without code splitting:**
```
app.js (2.5MB) ← User downloads entire app upfront
```

**With code splitting:**
```
main.js (50KB)     ← Initial load
vendor.js (120KB)  ← React, React-DOM (loaded in parallel)
dashboard.js (80KB) ← Loaded only when user visits /dashboard
settings.js (60KB)  ← Loaded only when user visits /settings
```

**Configuration:**
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          utils: ['lodash-es', 'date-fns']
        }
      }
    }
  }
});
```

**Benefits:**
- **Faster initial load** - Only download what's needed for current page
- **Better caching** - Vendor bundle rarely changes (cache for 1 year!)
- **Improved performance** - Less JavaScript to parse and execute
- **Better UX** - User sees page faster

**Real impact:**
```
Before: 2.5MB download, 3.2s load time
After:  170KB initial, 1.1s load time

User visits dashboard:
  Additional 80KB loaded (dashboard.js)
  Still faster than loading everything upfront!
```

**Why other options are wrong:**
- A: Code splitting is for users, not developers
- C: Doesn't affect development (dev bundles aren't split)
- D: Code splitting ≠ SSR (different optimizations)
</details>

---

### 6. Which deployment strategy allows instant rollback with zero downtime?

A) Rolling deployment
B) Canary deployment
C) Blue-green deployment
D) Recreate deployment

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: C**

**Explanation:**

**Blue-Green Deployment:**
```
Blue Environment (v1.0) ← 100% traffic (LIVE)
Green Environment (idle)

Deploy v2.0 to Green:
Blue Environment (v1.0) ← 100% traffic (still live)
Green Environment (v2.0) ← 0% traffic (testing)

Test Green, then switch traffic:
Blue Environment (v1.0) ← 0% traffic (idle, ready for rollback)
Green Environment (v2.0) ← 100% traffic (LIVE)

Rollback (if needed):
Blue Environment (v1.0) ← 100% traffic (LIVE again)
Green Environment (v2.0) ← 0% traffic (rolled back)
```

**Why it's instant:**
- Both environments run simultaneously
- Switching traffic is just updating load balancer
- Takes < 1 second to switch
- If issues, switch back instantly

**Implementation with Vercel:**
```bash
# Vercel does this automatically!
vercel --prod
# Creates new deployment, tests it, switches traffic
# Previous deployment still running (instant rollback available)
```

**Why other options are slower:**
- **A - Rolling:** Gradual, takes 10-30 minutes, rollback requires redeployment
- **B - Canary:** Gradual (5% → 25% → 50% → 100%), takes hours
- **D - Recreate:** Downtime while new version deploys, slow rollback
</details>

---

### 7. What should npm ci be used for instead of npm install in CI/CD?

A) npm ci is faster
B) npm ci uses the lockfile exactly, ensuring reproducible builds
C) npm ci automatically updates dependencies
D) npm ci works better with Docker

<details>
<summary>Answer & Explanation</summary>

**Correct Answers: A and B**

**Explanation:**

**npm install vs npm ci:**

```bash
# npm install
- Installs from package.json
- May install newer versions (^1.0.0 → 1.2.0)
- Updates package-lock.json
- Slower (checks existing node_modules)

# npm ci
- Installs from package-lock.json EXACTLY
- Same versions every time (reproducible)
- Deletes node_modules first (clean install)
- Faster (30-50% faster than npm install)
```

**Why it matters in CI/CD:**
```yaml
# ❌ BAD: npm install in CI
- run: npm install
# Might install different versions than local!
# "Works on my machine" syndrome

# ✅ GOOD: npm ci in CI
- run: npm ci
# Exact same versions as package-lock.json
# Reproducible builds every time
```

**Real-world example:**
```
Developer's machine:
  react: 18.2.0 (from package-lock.json)

npm install in CI:
  react: 18.3.0 (latest 18.x, package.json has ^18.0.0)
  ❌ Different version! Tests might pass locally, fail in CI

npm ci in CI:
  react: 18.2.0 (from package-lock.json)
  ✅ Exact same version! Reproducible
```

**When to use each:**
- **npm install:** Local development, adding new packages
- **npm ci:** CI/CD, production builds, Docker

**Why C is wrong:** npm ci NEVER updates dependencies (that's the point!)
</details>

---

### 8. What is the correct order for a typical CI/CD pipeline?

A) Deploy → Test → Build → Lint
B) Lint → Test → Build → Deploy
C) Build → Lint → Test → Deploy
D) Test → Build → Lint → Deploy

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: B**

**Explanation:**

**Proper CI/CD pipeline order:**
```
1. Lint (fastest, 10-20 seconds)
   ↓ If pass
2. Test (medium, 1-2 minutes)
   ↓ If pass
3. Build (slower, 2-3 minutes)
   ↓ If pass
4. Deploy (slowest, 3-5 minutes)
```

**Why this order?**

**Fail fast principle:**
```yaml
jobs:
  lint:  # ✅ Runs first (fastest feedback)
    runs-on: ubuntu-latest
    steps:
      - run: npm run lint  # 15 seconds

  test:  # ✅ Runs after lint passes
    needs: [lint]
    steps:
      - run: npm test  # 90 seconds

  build:  # ✅ Only if tests pass
    needs: [lint, test]
    steps:
      - run: npm run build  # 2 minutes

  deploy:  # ✅ Only if build succeeds
    needs: [build]
    steps:
      - run: vercel --prod  # 3 minutes
```

**Benefits:**
- **Fast feedback:** Linting errors caught in 15 seconds (not after 5 minutes of building)
- **Save resources:** Don't waste time building if code doesn't even lint
- **Prevent bad deploys:** Never deploy code that fails tests

**Real timeline:**
```
✅ Good order (Lint → Test → Build → Deploy):
10:00 - Lint starts
10:00:15 - Lint passes, tests start
10:02:00 - Tests pass, build starts
10:04:30 - Build passes, deploy starts
10:08:00 - Deploy complete
Total: 8 minutes

❌ Bad order (Build → Deploy → Test):
10:00 - Build starts
10:03:00 - Build complete, deploy starts
10:08:00 - Deploy complete
10:08:05 - Tests start
10:09:30 - Tests FAIL!
10:10:00 - Rollback needed
Already deployed broken code to users! 😱
```
</details>

---

### 9. What is the purpose of health check endpoints in containerized applications?

A) To monitor developer productivity
B) To allow orchestrators to detect and restart unhealthy containers
C) To improve application performance
D) To reduce bundle size

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: B**

**Explanation:**

**Health check endpoint:**
```javascript
// pages/api/health.js (Next.js)
export default async function handler(req, res) {
  try {
    // Check critical dependencies
    const dbHealthy = await checkDatabase();
    const redisHealthy = await checkRedis();
    const apiHealthy = await checkExternalAPI();

    if (dbHealthy && redisHealthy && apiHealthy) {
      return res.status(200).json({ status: 'healthy' });
    } else {
      return res.status(503).json({
        status: 'unhealthy',
        checks: { dbHealthy, redisHealthy, apiHealthy }
      });
    }
  } catch (error) {
    return res.status(503).json({ status: 'unhealthy', error: error.message });
  }
}
```

**Docker configuration:**
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1
```

**What happens:**
```
Every 30 seconds:
  Docker calls: wget http://localhost/health

  If returns 200:
    Container status: healthy ✅

  If returns 503 or times out (3 consecutive failures):
    Container status: unhealthy ❌
    Orchestrator (Docker, Kubernetes) restarts container automatically
```

**Kubernetes example:**
```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 80
  initialDelaySeconds: 5
  periodSeconds: 10

# If health check fails 3 times:
# Kubernetes kills and restarts the pod
```

**Real-world benefit:**
```
Scenario: Database connection pool exhausted

Without health check:
  - App can't connect to DB
  - Returns 500 errors to users
  - Stays broken until manual intervention
  - Users affected for hours

With health check:
  - App can't connect to DB
  - Health check fails
  - Container restarted automatically
  - Fresh connections established
  - Users affected for < 30 seconds
```
</details>

---

### 10. Which file ensures that Docker builds don't include unnecessary files?

A) `.gitignore`
B) `.dockerignore`
C) `.npmignore`
D) `Dockerfile`

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: B**

**Explanation:**

**`.dockerignore` (like .gitignore for Docker):**
```
# .dockerignore
node_modules
dist
build
.git
.env
.env.local
*.md
.vscode
.idea
coverage
.DS_Store
npm-debug.log
```

**Why it matters:**
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app

# COPY . . includes everything EXCEPT .dockerignore files
COPY . .
# Without .dockerignore: copies 500MB+ (includes node_modules!)
# With .dockerignore: copies 10MB (only source code)

RUN npm ci
RUN npm run build
```

**Impact on build time:**
```
Without .dockerignore:
  Sending build context: 520 MB
  Build time: 5 minutes

With .dockerignore:
  Sending build context: 12 MB
  Build time: 45 seconds

97% faster! 🚀
```

**Best practices:**
```
# Always exclude:
node_modules  # Will be reinstalled anyway
dist          # Will be rebuilt
.git          # Not needed in container
.env*         # Secrets shouldn't be in image
coverage      # Test artifacts
*.log         # Log files
```

**Why other options are wrong:**
- A: `.gitignore` - For Git, not Docker
- C: `.npmignore` - For npm packages, not Docker
- D: `Dockerfile` - Defines build steps, doesn't exclude files
</details>

---

### 11. What is the benefit of using a CDN for static assets?

A) Reduces server costs
B) Assets served from geographically closer servers, improving load times
C) Automatically optimizes images
D) Provides better security

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: B**

**Explanation:**

**How CDNs work:**
```
Without CDN:
  User in Tokyo → Request → Your server in US → 200ms latency

With CDN:
  User in Tokyo → Request → CDN edge in Tokyo → 10ms latency

95% faster! 🚀
```

**CDN architecture:**
```
Your Origin Server (US East)
    ↓
CDN Edge Servers:
  - US West
  - Europe
  - Asia Pacific
  - South America
  - Australia

User requests asset:
  → Routed to nearest edge server
  → Edge serves cached copy
  → If not cached, fetches from origin once
  → Caches for future requests
```

**Configuration:**
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  }
});

// Output:
// assets/logo.a8f3b2c1.png
// assets/app.f1e2d3c4.js
// assets/vendor.b5a6c7d8.js

// Deploy to CDN:
// https://cdn.example.com/assets/logo.a8f3b2c1.png
```

**Performance impact:**
```
User in New York (near your server):
  Without CDN: 50ms
  With CDN: 10ms (80% faster)

User in Sydney (far from server):
  Without CDN: 250ms
  With CDN: 15ms (94% faster!)
```

**Why other options are partially true but not primary:**
- A: True, but secondary benefit
- C: Some CDNs do this (Cloudflare, CloudFront), but not all
- D: Some security benefits, but not primary purpose
</details>

---

### 12. In GitHub Actions, what does `needs: [lint, test]` mean?

A) The job will skip lint and test
B) The job only runs if both lint and test jobs succeed
C) The job runs in parallel with lint and test
D) The job requires lint and test packages to be installed

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: B**

**Explanation:**

**Job dependencies in GitHub Actions:**
```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    steps:
      - run: npm test

  build:
    needs: [lint, test]  # ← Waits for both to succeed
    runs-on: ubuntu-latest
    steps:
      - run: npm run build

  deploy:
    needs: [build]  # ← Waits for build to succeed
    runs-on: ubuntu-latest
    steps:
      - run: vercel --prod
```

**Execution timeline:**
```
Time 0s:
  lint starts   ─────────✅ (success at 15s)
  test starts   ──────────────✅ (success at 90s)

Time 90s (both complete):
  build starts  ────────✅ (success at 210s)

Time 210s:
  deploy starts ─────────✅ (success at 420s)
```

**If any job fails:**
```
Time 0s:
  lint starts   ─────────❌ (fails at 15s)
  test starts   ──────────────✅ (success at 90s)

Time 90s:
  build SKIPPED (lint failed)
  deploy SKIPPED (build didn't run)
```

**Parallel execution (no needs):**
```yaml
jobs:
  lint:
    # No needs = runs immediately
  test:
    # No needs = runs immediately (parallel with lint)
  security:
    # No needs = runs immediately (parallel with both)
```

**Benefits of `needs`:**
- ✅ Prevents deploying broken code
- ✅ Saves CI minutes (don't run unnecessary jobs)
- ✅ Clear dependency graph
- ✅ Fast feedback (fails early)
</details>

---

### 13. What is the purpose of source maps in production?

A) To make code run faster
B) To help debug minified JavaScript by mapping back to original source
C) To reduce bundle size
D) To enable hot module replacement

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: B**

**Explanation:**

**Problem without source maps:**
```javascript
// Production code (minified):
const e=React,{useState:t}=e;export function App(){const[n,r]=t(0);return e.createElement("button",{onClick:()=>r(n+1)},"Count: ",n)}

// Error in console:
Uncaught TypeError: undefined is not a function
  at App.js:1:234

// You see: r(n+1)
// Where is this in your code? No idea! 😱
```

**Solution with source maps:**
```javascript
// Same minified code, but with .map file
app.a8f3b2c1.js
app.a8f3b2c1.js.map  ← Source map

// Error in console:
Uncaught TypeError: undefined is not a function
  at App.jsx:12:18

// Click on link, see original code:
const [count, setCount] = useState(0);
return (
  <button onClick={() => setCount(count + 1)}>
    Count: {count}
  </button>
);

// Ah! setCount is undefined. Easy to debug! ✅
```

**Configuration:**
```javascript
// vite.config.js
export default defineConfig({
  build: {
    sourcemap: true,  // Generate .map files

    rollupOptions: {
      output: {
        sourcemapExcludeSources: true  // Don't include source code
      }
    }
  }
});
```

**Best practices:**
```javascript
// 1. Generate source maps in production
sourcemap: true

// 2. Upload to error tracking (Sentry)
npx @sentry/cli releases files 1.0.0 upload-sourcemaps ./dist

// 3. DON'T serve publicly
# nginx.conf
location ~ \.map$ {
  deny all;
}

// 4. Use in error tracking only
// Sentry uses source maps to show readable stack traces
// Public can't download them
```

**Sentry without source maps:**
```
Error: Cannot read property 'map' of undefined
  at a (app.a8f3b2c1.js:1:2345)

❌ Useless! What is 'a'? What line in original code?
```

**Sentry with source maps:**
```
Error: Cannot read property 'map' of undefined
  at ProductList (src/components/ProductList.jsx:45:12)

const products = response.data;
const productCards = products.map(p => <ProductCard />);
                     ↑ products is undefined!

✅ Clear! Response didn't have .data property
```
</details>

---

### 14. What is the primary purpose of caching in nginx for an SPA?

A) To reduce database load
B) To serve static assets faster by avoiding server processing
C) To improve SEO
D) To enable server-side rendering

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: B**

**Explanation:**

**nginx caching for SPAs:**
```nginx
server {
  # index.html (app entry point)
  location / {
    try_files $uri /index.html;
    add_header Cache-Control "no-cache, must-revalidate";
    # ↑ Always fetch fresh (checks for updates)
  }

  # Static assets (JS, CSS, images with content hash)
  location /assets {
    expires 1y;  # Cache for 1 year!
    add_header Cache-Control "public, immutable";
    # ↑ Never refetch (hash changes if file changes)
  }
}
```

**How it works:**
```
First visit:
  User → nginx → /index.html (2KB, no cache)
  User → nginx → /assets/app.a8f3b2c1.js (150KB, cache 1 year)
  User → nginx → /assets/vendor.f1e2d3c4.js (120KB, cache 1 year)

Total download: 272KB

Second visit (same day):
  User → nginx → /index.html (2KB, revalidate)
  User → Browser cache → /assets/app.a8f3b2c1.js (instant!)
  User → Browser cache → /assets/vendor.f1e2d3c4.js (instant!)

Total download: 2KB (99% reduction!)
```

**Content hash strategy:**
```javascript
// Build output:
app.a8f3b2c1.js  ← Hash from file content
vendor.f1e2d3c4.js

// If you change code:
app.b9e4c3d2.js  ← New hash! Browser fetches new file
vendor.f1e2d3c4.js  ← Same hash, uses cache

// index.html references:
<script src="/assets/app.b9e4c3d2.js"></script>
```

**Performance impact:**
```
Without caching:
  Every page load: 272KB download
  Load time: 3.2s (on 3G)

With caching:
  First load: 272KB, 3.2s
  Subsequent: 2KB, 0.3s

90% faster! 🚀
```

**Cache levels:**
```
1. Browser cache (local)
   - Fastest (instant)
   - Per user

2. CDN cache (edge servers)
   - Fast (10-50ms)
   - Shared across users in region

3. nginx cache (origin server)
   - Medium (50-100ms)
   - Shared across all users
```

**Why other options are wrong:**
- A: Caching static assets doesn't affect database
- C: Doesn't directly improve SEO (SPAs have other SEO challenges)
- D: nginx caching ≠ SSR (different techniques)
</details>

---

### 15. What should you do immediately after a production deployment?

A) Go home for the day
B) Monitor error rates, performance metrics, and user behavior
C) Start working on the next feature
D) Delete the previous version

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: B**

**Explanation:**

**Post-deployment checklist:**
```
Immediate (0-15 minutes):
  ✅ Check health checks passing
  ✅ Verify app loads in browser
  ✅ Run smoke tests (critical user flows)
  ✅ Check error rate in Sentry
  ✅ Monitor server logs

Short-term (15-60 minutes):
  ✅ Watch error rate (should be stable or decreasing)
  ✅ Monitor Core Web Vitals (LCP, INP, CLS)
  ✅ Check conversion funnels (are users completing actions?)
  ✅ Review performance metrics
  ✅ Watch for spike in support tickets

Long-term (1-24 hours):
  ✅ Monitor throughout day
  ✅ Compare metrics to pre-deployment baseline
  ✅ Check for memory leaks (gradual memory increase)
  ✅ Review user feedback
```

**What to monitor:**
```javascript
// 1. Error rate
// Sentry dashboard
const errorRate = errors / totalRequests;
// Should stay < 0.1% (1 in 1000 requests)

// 2. Performance
// Compare before/after
const deployment = {
  before: { LCP: 2.1s, INP: 180ms, CLS: 0.05 },
  after:  { LCP: 2.3s, INP: 190ms, CLS: 0.06 }
};
// Slight increase OK, but watch for spikes

// 3. User behavior
const metrics = {
  signupConversion: 2.5%,  // Before: 2.4%
  checkoutSuccess: 95%,    // Before: 94%
  avgSessionTime: '4m 30s' // Before: 4m 15s
};
// All metrics stable or improving ✅
```

**Red flags (immediate rollback):**
```
❌ Error rate > 2x baseline
  Before: 0.1%
  After: 0.5%
  → Rollback!

❌ Critical functionality broken
  Can't complete checkout
  → Rollback!

❌ Performance degradation > 50%
  Before: LCP 2s
  After: LCP 5s
  → Rollback!

❌ Spike in support tickets
  10x increase in "can't login" tickets
  → Rollback!
```

**Monitoring tools:**
```javascript
// Sentry (errors)
const errorCount = Sentry.getCurrentErrorCount();

// Google Analytics (user behavior)
gtag('event', 'deployment', {
  version: '1.2.0',
  timestamp: Date.now()
});

// Custom dashboard
fetch('/api/metrics')
  .then(res => res.json())
  .then(metrics => {
    if (metrics.errorRate > 0.002) {
      alert('High error rate! Consider rollback.');
    }
  });
```

**Why you MUST monitor:**
```
Real story:
  Friday 5 PM: Deploy to production
  Friday 5:05 PM: Go home (didn't monitor)
  Friday 8 PM: Error rate 100x normal
  Saturday 9 AM: Wake up to 1000+ support tickets
  Saturday: Spend entire day fixing + recovering data

If monitored for 15 minutes:
  Would have caught error immediately
  Rolled back in 1 minute
  Zero user impact
```

**Post-deployment monitoring is NOT optional. It's part of the deployment.**
</details>

---

## Scoring

- **15/15 (100%)**: Deployment Expert! 🚀
- **13-14 (87-93%)**: Excellent understanding
- **12 (80%)**: Passing - Good foundation
- **10-11 (67-73%)**: Review key concepts
- **< 10 (< 67%)**: Re-read chapter and practice exercises

---

## What's Next?

- **Scored 80%+**: Move on to Chapter 17: Accessibility
- **Scored < 80%**: Review chapter sections and retry quiz

---

## Additional Practice

- Complete the Challenge Project: Complete DevOps Setup
- Set up CI/CD for a personal project
- Containerize an existing application
- Practice with different deployment strategies

**Keep building and deploying!** 🚀

