# Exercise 2: CI/CD Pipeline with GitHub Actions

**Difficulty:** ⭐⭐⭐ Advanced
**Time Estimate:** 2-3 hours

## 🎯 Learning Objectives

By completing this exercise, you will:
- Create automated CI/CD pipelines with GitHub Actions
- Set up continuous integration (testing, linting, building)
- Configure continuous deployment to staging and production
- Manage secrets securely
- Implement deployment approvals and gates

---

## 📋 Scenario

Your team needs a professional CI/CD pipeline that:
- Runs tests on every pull request
- Lints and type-checks code
- Builds for production
- Automatically deploys to staging
- Requires manual approval for production
- Sends notifications on success/failure

---

## 🚀 Setup

### Prerequisites

- GitHub account
- Repository with a React/Vite project
- Vercel or Netlify account (for deployment)

### Step 1: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository and push
gh repo create my-app --public --source=. --remote=origin --push
```

---

## 🎯 Tasks

### Task 1: Create CI Workflow

**Create `.github/workflows/ci.yml`:**

```yaml
name: CI Pipeline

on:
  pull_request:
  push:
    branches: [main]

jobs:
  lint:
    name: Lint & Type Check
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Type check
        run: npm run type-check
        # Add this script to package.json if using TypeScript

  test:
    name: Run Tests
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - run: npm ci

      - name: Run tests with coverage
        run: npm test -- --coverage --watchAll=false

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
          fail_ci_if_error: false

  build:
    name: Build Application
    runs-on: ubuntu-latest
    needs: [lint, test]

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - run: npm ci

      - name: Build for production
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
          retention-days: 7

  security:
    name: Security Scan
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - run: npm ci

      - name: Run npm audit
        run: npm audit --audit-level=high
        continue-on-error: true

      - name: Check for secrets
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: ${{ github.event.repository.default_branch }}
          head: HEAD
```

**Test the workflow:**
```bash
git add .github/workflows/ci.yml
git commit -m "Add CI workflow"
git push

# Create a pull request
gh pr create --title "Add CI pipeline" --body "Testing CI"
```

---

### Task 2: Set Up GitHub Secrets

**In GitHub repository:**
1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add these secrets:

```
VITE_API_URL=https://api.example.com
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
SLACK_WEBHOOK=your_slack_webhook_url
```

**To get Vercel credentials:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login and get tokens
vercel login
vercel link

# Get org and project IDs from .vercel/project.json
```

---

### Task 3: Create Deployment Workflow

**Create `.github/workflows/deploy.yml`:**

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    environment: staging

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - run: npm ci

      - name: Deploy to Vercel Staging
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          scope: ${{ secrets.VERCEL_ORG_ID }}

      - name: Run smoke tests
        run: npm run test:e2e:smoke
        env:
          BASE_URL: ${{ steps.deploy.outputs.preview-url }}
        continue-on-error: true

  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: deploy-staging
    environment: production

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - run: npm ci

      - name: Build for production
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.PROD_API_URL }}
          VITE_SENTRY_DSN: ${{ secrets.SENTRY_DSN }}

      - name: Deploy to Vercel Production
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          scope: ${{ secrets.VERCEL_ORG_ID }}

      - name: Notify team
        uses: 8398a7/action-slack@v3
        if: always()
        with:
          status: ${{ job.status }}
          text: 'Production deployment ${{ job.status }}'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

### Task 4: Configure Environment Protection Rules

**In GitHub repository:**
1. Go to Settings → Environments
2. Create "staging" environment
3. Create "production" environment with protection rules:
   - ✅ Required reviewers (add yourself)
   - ✅ Wait timer: 5 minutes
   - ✅ Deployment branches: main only

---

### Task 5: Add Status Checks

**Configure branch protection:**
1. Go to Settings → Branches
2. Add rule for `main` branch:
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass
   - ✅ Select: lint, test, build, security
   - ✅ Require branches to be up to date

---

## ✅ Success Criteria

Your CI/CD pipeline must:

1. **Continuous Integration:**
   - ✅ Runs on every pull request
   - ✅ Lints code with ESLint
   - ✅ Runs all tests with coverage
   - ✅ Builds successfully
   - ✅ Runs security scans
   - ✅ All jobs run in parallel where possible

2. **Continuous Deployment:**
   - ✅ Automatically deploys to staging on main branch push
   - ✅ Runs smoke tests on staging
   - ✅ Requires manual approval for production
   - ✅ Sends notifications on completion

3. **Security:**
   - ✅ Secrets stored in GitHub Secrets
   - ✅ No secrets in code or logs
   - ✅ npm audit runs and reports issues
   - ✅ Secret scanning enabled

4. **Branch Protection:**
   - ✅ Can't push directly to main
   - ✅ All checks must pass before merge
   - ✅ Code review required
   - ✅ Branch must be up to date

---

## 🧪 Testing

### Test CI Pipeline

**1. Create feature branch:**
```bash
git checkout -b feature/test-ci
echo "// Test change" >> src/App.jsx
git add .
git commit -m "Test CI pipeline"
git push -u origin feature/test-ci
```

**2. Create pull request:**
```bash
gh pr create --title "Test CI" --body "Testing CI pipeline"
```

**3. Verify:**
- Go to Actions tab in GitHub
- All jobs should run (lint, test, build, security)
- Should see green checkmarks ✅
- PR should show "All checks have passed"

**4. Test failure:**
```bash
# Add a linting error
echo "const x = " >> src/App.jsx
git add .
git commit -m "Test CI failure"
git push
```

- CI should fail ❌
- PR should be blocked from merging

---

### Test CD Pipeline

**1. Merge to main:**
```bash
# Fix the error first
git checkout feature/test-ci
# Fix src/App.jsx
git add .
git commit -m "Fix linting error"
git push

# Merge PR
gh pr merge --squash
```

**2. Watch deployment:**
- Go to Actions tab
- Should see "Deploy" workflow running
- Staging deployment should complete automatically
- Production deployment should wait for approval

**3. Approve production:**
- Click on workflow run
- Click "Review deployments"
- Check "production"
- Click "Approve and deploy"

**4. Verify:**
- Visit staging URL
- Visit production URL
- Both should show latest changes

---

## 💡 Bonus Challenges

1. **Add Performance Budget:**
   ```yaml
   - name: Check bundle size
     run: npx bundlesize
   ```

2. **Lighthouse CI:**
   ```yaml
   - name: Run Lighthouse
     uses: treosh/lighthouse-ci-action@v9
     with:
       urls: |
         https://staging.example.com
       uploadArtifacts: true
   ```

3. **Parallel Testing:**
   ```yaml
   strategy:
     matrix:
       node-version: [16, 18, 20]
   ```

4. **Canary Deployment:**
   - Deploy to 10% of users first
   - Monitor errors for 10 minutes
   - Auto-rollback if error rate increases

5. **Automated Changelog:**
   ```yaml
   - uses: release-drafter/release-drafter@v5
   ```

---

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel GitHub Integration](https://vercel.com/docs/concepts/git/vercel-for-github)
- [GitHub Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)

---

## 🎉 Completion

Once you've successfully:
- Created CI workflow (lint, test, build, security)
- Set up CD workflow (staging + production)
- Configured GitHub secrets
- Added environment protection rules
- Tested both success and failure scenarios

You're ready for Exercise 3: Docker Deployment! 🚀

