# Exercise 2: CI/CD Pipeline - Starter

## 🎯 Your Mission

Add professional CI/CD pipelines to this project using GitHub Actions:
- ✅ Continuous Integration (lint, test, build, security)
- ✅ Continuous Deployment (staging + production)
- ✅ Environment protection rules
- ✅ Automated notifications

## 📁 What's Included

This starter provides:
- Complete React project (from Exercise 1 solution)
- Optimized build configuration
- **NO CI/CD configured yet!**

## 🚀 Getting Started

### Step 1: Create GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub (requires gh CLI)
gh repo create my-cicd-app --public --source=. --remote=origin --push
```

### Step 2: Install Additional Dependencies
```bash
# Testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# Linting dependencies
npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-config-prettier

# Formatting
npm install -D prettier
```

### Step 3: Test Locally
```bash
npm run dev     # Should work
npm run build   # Should work
# npm run lint  # Need to add this script
# npm test      # Need to configure tests
```

## 📋 Current State

### What's Missing:
- ❌ No GitHub Actions workflows
- ❌ No automated testing
- ❌ No linting setup
- ❌ No deployment configuration
- ❌ No environment secrets
- ❌ No branch protection rules

### After Implementation:
- ✅ CI pipeline (lint, test, build, security)
- ✅ CD pipeline (staging + production)
- ✅ Automated deployments
- ✅ Status checks on PRs
- ✅ Production approval gates
- ✅ Slack/Discord notifications

## 📚 Tasks

Refer to the main exercise README for detailed instructions:

### Task 1: Create CI Workflow
Create `.github/workflows/ci.yml` with parallel jobs:
- Lint & type check
- Run tests with coverage
- Build for staging and production
- Security scans

### Task 2: Set Up GitHub Secrets
Configure secrets in repository settings:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `VITE_API_URL_STAGING`
- `VITE_API_URL_PRODUCTION`
- `SLACK_WEBHOOK` (optional)

### Task 3: Create Deployment Workflow
Create `.github/workflows/deploy.yml`:
- Deploy to staging automatically
- Deploy to production with manual approval
- Run smoke tests
- Send notifications

### Task 4: Configure Environment Protection
Set up in GitHub repository:
- Create `staging` environment (no protection)
- Create `production` environment (with approval rules)

### Task 5: Add Status Checks
Enable branch protection on main branch:
- Require PR reviews
- Require status checks to pass
- Require branches to be up to date

## 🎯 Success Criteria

When complete, you should have:
- [ ] CI runs on every PR (< 5 minutes)
- [ ] All checks must pass before merge
- [ ] Staging deploys automatically on main push
- [ ] Production requires manual approval
- [ ] Notifications sent on deployment
- [ ] Tests run with coverage reporting
- [ ] Code is linted and formatted

## 💡 Hints

1. **Start Simple:** Get basic CI working first, then add CD
2. **Parallel Jobs:** lint and test can run simultaneously
3. **Secrets:** Never commit secrets - use GitHub Secrets
4. **Testing:** Use Vitest for fast test execution
5. **Branch Protection:** Configure after workflows are working

## 📖 Reference

See the main [Exercise README](../README.md) for complete step-by-step instructions.

See the solution folder for complete working examples!

Good luck! 🚀
