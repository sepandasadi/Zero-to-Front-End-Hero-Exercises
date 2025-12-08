# Complete DevOps Setup - Getting Started Guide

## 🎯 Challenge Overview

Build a production-ready deployment pipeline from scratch combining everything from Exercises 1-3:
- Modern build configuration (Vite + optimization)
- Complete CI/CD automation (GitHub Actions)
- Docker containerization (multi-stage builds)
- Monitoring and observability (Sentry + Web Vitals)
- Professional documentation and runbooks

**Duration:** 10-12 hours
**Difficulty:** Advanced ⭐⭐⭐

## 📋 Prerequisites

### Tools Required
- ✅ Node.js 18+ installed
- ✅ Docker Desktop installed
- ✅ Git installed
- ✅ GitHub account
- ✅ Vercel or Netlify account (free tier)
- ✅ Sentry account (free tier)

### Knowledge Required
- Completed Exercises 1, 2, and 3
- Basic understanding of React
- Comfortable with command line
- Familiar with Git/GitHub

## 🚀 Quick Start

### Step 1: Set Up Project (1 hour)

```bash
# Create new Vite project
npm create vite@latest devops-challenge -- --template react
cd devops-challenge

# Install dependencies
npm install react-router-dom axios

# Install dev dependencies
npm install -D \
  @vitejs/plugin-react \
  vite-plugin-compression \
  rollup-plugin-visualizer \
  vitest @testing-library/react @testing-library/jest-dom \
  eslint eslint-plugin-react prettier

# Initialize Git
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository
gh repo create devops-challenge --public --source=. --remote=origin --push
```

### Step 2: Configure Build (2 hours)

Follow Exercise 1 solution to set up:
- Code splitting (vendor, router, utils)
- Environment variables (.env files)
- Bundle optimization (< 200KB target)
- Source maps
- Bundle analysis

**Files to create:**
- `vite.config.js`
- `src/config.js`
- `.env.development`
- `.env.staging`
- `.env.production`

### Step 3: Set Up CI/CD (2-3 hours)

Follow Exercise 2 solution to create:
- CI pipeline (lint, test, build, security)
- CD pipeline (staging + production)
- GitHub secrets
- Environment protection rules

**Files to create:**
- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`
- `.eslintrc.cjs`
- `.prettierrc`
- `vitest.config.js`
- Test files

### Step 4: Containerize (2 hours)

Follow Exercise 3 solution to set up:
- Multi-stage Dockerfile
- nginx configuration
- docker-compose setup
- Health checks

**Files to create:**
- `Dockerfile`
- `nginx.conf`
- `.dockerignore`
- `docker-compose.yml`

### Step 5: Add Monitoring (1-2 hours)

```bash
# Install Sentry
npm install @sentry/react @sentry/vite-plugin

# Install Web Vitals
npm install web-vitals
```

**Configure Sentry:**
1. Create project at sentry.io
2. Get DSN (Data Source Name)
3. Add to `.env.production`:
   ```
   VITE_SENTRY_DSN=https://abc123@o123.ingest.sentry.io/456
   ```
4. Initialize in `src/main.jsx`:
   ```javascript
   import * as Sentry from "@sentry/react";

   Sentry.init({
     dsn: import.meta.env.VITE_SENTRY_DSN,
     environment: import.meta.env.VITE_ENV,
     tracesSampleRate: 1.0,
   });
   ```

**Configure Web Vitals:**
```javascript
// src/reportWebVitals.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to Sentry, Google Analytics, or custom endpoint
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Step 6: Create Documentation (1 hour)

Create these documentation files:

#### `README.md`
- Project overview
- Setup instructions
- Development workflow
- Deployment process

#### `DEPLOYMENT_RUNBOOK.md`
- Pre-deployment checklist
- Deployment steps
- Post-deployment verification
- Monitoring dashboards

#### `ROLLBACK_PROCEDURE.md`
- When to rollback
- Rollback steps (automatic vs manual)
- Post-rollback actions
- Root cause analysis

#### `ARCHITECTURE.md`
- System architecture diagram
- Technology stack
- Infrastructure overview
- Data flow

#### `TROUBLESHOOTING.md`
- Common issues and solutions
- Debugging procedures
- Contact information

## 📊 Success Criteria Checklist

### Build Configuration ✅
- [ ] Code splitting working (vendor, router, utils)
- [ ] Bundle size < 200KB (gzipped)
- [ ] Environment variables configured
- [ ] Source maps generated
- [ ] Bundle analysis available

### CI/CD Pipeline ✅
- [ ] CI runs on every PR (< 5 minutes)
- [ ] All tests passing
- [ ] Security scans running
- [ ] Staging deploys automatically
- [ ] Production requires approval
- [ ] Notifications working

### Docker Setup ✅
- [ ] Image size < 30MB
- [ ] SPA routing working
- [ ] Health checks passing
- [ ] Gzip compression enabled
- [ ] Security headers present
- [ ] docker-compose working

### Monitoring ✅
- [ ] Sentry capturing errors
- [ ] Source maps uploaded
- [ ] Web Vitals tracked
- [ ] Performance metrics logged
- [ ] Alerts configured

### Documentation ✅
- [ ] README complete
- [ ] Deployment runbook created
- [ ] Rollback procedure documented
- [ ] Architecture diagram included
- [ ] Troubleshooting guide complete

## 🎯 Verification Steps

### 1. Test Build Locally
```bash
npm run build:production
npm run preview
# Visit http://localhost:4173
# Verify app loads correctly
```

### 2. Test Docker Locally
```bash
docker build -t devops-challenge:test .
docker run -p 8080:80 devops-challenge:test
# Visit http://localhost:8080
# Verify app loads and routes work
```

### 3. Test CI Pipeline
```bash
# Create test branch
git checkout -b test-ci
echo "test" >> README.md
git add .
git commit -m "Test CI"
git push -u origin test-ci

# Create PR
gh pr create --title "Test CI" --body "Testing pipeline"

# Check GitHub Actions tab - should see CI running
```

### 4. Test CD Pipeline
```bash
# Merge PR
gh pr merge --squash

# Check GitHub Actions - should see:
# 1. CI running on main
# 2. Deploy to staging (automatic)
# 3. Deploy to production (waiting for approval)

# Approve production deployment
# Navigate to Actions → Deploy workflow → Review deployments
```

### 5. Verify Monitoring
```bash
# Trigger an error in the app
# Check Sentry dashboard - error should appear within 1 minute
# Verify source maps show original code (not minified)
```

### 6. Test Rollback
```bash
# If deployment fails, automatic rollback triggers
# Or manually trigger via Vercel dashboard
# Verify previous version is restored
```

## 💡 Pro Tips

### Tip 1: Start Simple, Iterate
Don't try to do everything at once. Get one piece working, then add the next:
1. ✅ Build optimization
2. ✅ CI pipeline
3. ✅ CD pipeline
4. ✅ Docker
5. ✅ Monitoring
6. ✅ Documentation

### Tip 2: Test Locally First
Before pushing to CI/CD:
- Run `npm test` locally
- Run `npm run build` locally
- Test Docker build locally
- Verify everything works

### Tip 3: Use Feature Branches
Create branches for each phase:
- `feature/build-setup`
- `feature/ci-pipeline`
- `feature/docker`
- `feature/monitoring`

### Tip 4: Commit Often
Small, focused commits are easier to debug:
```bash
git commit -m "Add code splitting"
git commit -m "Configure environment variables"
git commit -m "Add source maps"
```

### Tip 5: Document As You Go
Don't leave documentation for the end. Document each step when fresh in your mind.

## 🆘 Need Help?

### Resources
- Exercise 1 solution (build setup)
- Exercise 2 solution (CI/CD)
- Exercise 3 solution (Docker)
- Challenge README (requirements)
- Book chapter (theory)

### Common Issues
1. **Build failing:** Check `vite.config.js` for syntax errors
2. **CI not running:** Verify workflow files in `.github/workflows/`
3. **Docker build slow:** Add `.dockerignore` file
4. **Deployment failing:** Check GitHub secrets configuration
5. **Monitoring not working:** Verify Sentry DSN is correct

## 🎉 Ready to Start?

Follow the 6 steps above, refer to exercise solutions when needed, and build something amazing!

**Estimated timeline:**
- Day 1: Steps 1-2 (Project setup + Build configuration)
- Day 2: Step 3 (CI/CD pipelines)
- Day 3: Steps 4-6 (Docker + Monitoring + Documentation)

Good luck! 🚀

