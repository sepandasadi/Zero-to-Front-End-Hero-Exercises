# Deployment Runbook

## 📋 Overview

This runbook provides step-by-step procedures for deploying the application to staging and production environments.

---

## 🚀 Pre-Deployment Checklist

### Before Every Deployment

- [ ] All tests passing locally (`npm test`)
- [ ] Lint checks passing (`npm run lint`)
- [ ] Build successful (`npm run build:production`)
- [ ] Code reviewed and approved
- [ ] Branch up to date with main
- [ ] Environment variables verified
- [ ] Changelog updated

### Before Production Deployment

- [ ] Staging deployment successful
- [ ] Smoke tests passed on staging
- [ ] No critical bugs in staging
- [ ] Stakeholders notified
- [ ] Rollback plan confirmed
- [ ] Monitoring dashboards ready
- [ ] Team available for 30 min post-deployment

---

## 🔄 Deployment Process

### Staging Deployment (Automatic)

**Trigger:** Merge to `main` branch

**Process:**
```bash
1. Create feature branch
   git checkout -b feature/my-feature

2. Make changes and commit
   git add .
   git commit -m "feat: add new feature"

3. Push to GitHub
   git push -u origin feature/my-feature

4. Create pull request
   gh pr create --title "Add new feature" --body "Description"

5. Wait for CI checks
   - Lint ✅
   - Test ✅
   - Build ✅
   - Security ✅

6. Get code review approval

7. Merge to main
   gh pr merge --squash

8. Automatic staging deployment triggers
   - Watch GitHub Actions: Deploy workflow
   - Monitor logs for errors
   - Wait for "Deploy to Staging" job to complete
```

**Verification:**
```bash
# Check deployment status
gh run list --workflow=deploy.yml

# Visit staging URL
open https://staging.example.com

# Check health endpoint
curl https://staging.example.com/health

# Run smoke tests
npm run test:e2e:smoke
```

**Expected Timeline:**
- CI pipeline: 3-5 minutes
- Staging deployment: 2-3 minutes
- Total: ~5-8 minutes

---

### Production Deployment (Manual Approval)

**Trigger:** Manual approval after successful staging deployment

**Process:**
```bash
1. Verify staging deployment
   - Visit https://staging.example.com
   - Test critical user flows
   - Check error rates in Sentry
   - Verify performance metrics

2. Navigate to GitHub Actions
   - Actions tab → Deploy workflow
   - Find the waiting deployment
   - Click "Review deployments"

3. Review deployment details
   - Commit hash
   - Changes included
   - Test results
   - Build artifacts

4. Approve deployment
   - Select "production" environment
   - Add approval comment
   - Click "Approve and deploy"

5. Monitor deployment
   - Watch "Deploy to Production" job
   - Monitor Slack notifications
   - Check deployment logs
```

**Post-Deployment Monitoring (First 30 Minutes):**

```bash
# 1. Verify deployment
curl https://example.com/health
# Expected: 200 OK

# 2. Check application loads
open https://example.com

# 3. Test critical paths
npm run test:e2e:production

# 4. Monitor Sentry for errors
# Visit: https://sentry.io/organizations/YOUR_ORG/issues/
# Check: Error rate should be stable

# 5. Check performance metrics
# Visit: Google Analytics or your monitoring dashboard
# Verify: Load times, user interactions normal

# 6. Monitor server metrics
# CPU: Should be < 70%
# Memory: Should be < 80%
# Response time: < 500ms p95
```

**Expected Timeline:**
- Manual approval: 1-2 minutes
- Production build: 2-3 minutes
- Deployment: 2-3 minutes
- Source map upload: 1 minute
- Monitoring: 5 minutes
- Total: ~15-20 minutes

---

## 🎯 Deployment Verification

### Automated Checks

Run immediately after deployment:

```bash
# 1. Health check
curl -f https://example.com/health || echo "FAILED"

# 2. Status code check
curl -I https://example.com | grep "200 OK" || echo "FAILED"

# 3. Assets loading
curl -I https://example.com/assets/vendor.*.js | grep "200 OK"

# 4. Security headers
curl -I https://example.com | grep "X-Frame-Options"
curl -I https://example.com | grep "Content-Security-Policy"
```

### Manual Checks

Complete these within 10 minutes of deployment:

**Functional Tests:**
- [ ] Home page loads
- [ ] Navigation works
- [ ] User authentication (if applicable)
- [ ] Critical user flows complete
- [ ] Forms submit successfully
- [ ] API calls working

**Performance Tests:**
- [ ] Page load < 3 seconds
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] Assets cached properly

**Monitoring:**
- [ ] Sentry receiving events
- [ ] Error rate normal (< 0.1%)
- [ ] No new critical errors
- [ ] User sessions normal

---

## 📊 Monitoring Dashboards

### Sentry (Error Tracking)
**URL:** https://sentry.io/organizations/YOUR_ORG/issues/

**What to watch:**
- Error count (should be < 10 errors/hour)
- New error types
- User impact (affected users)
- Error trends

**Alert thresholds:**
- ⚠️ Warning: Error rate > 2x baseline
- 🚨 Critical: Error rate > 5x baseline
- 🚨 Critical: New crash/error affecting > 10% users

### Google Analytics (User Behavior)
**URL:** https://analytics.google.com

**What to watch:**
- Active users (should be stable)
- Bounce rate (should be < 50%)
- Session duration (should be stable)
- Conversion rates (should be stable)

### Vercel Dashboard (Deployment Status)
**URL:** https://vercel.com/dashboard

**What to watch:**
- Build status
- Deployment status
- Function execution time
- Bandwidth usage

---

## 🚨 Rollback Procedure

### When to Rollback

Immediate rollback if:
- ❌ Critical functionality broken (checkout, login, etc.)
- ❌ Error rate > 5x baseline
- ❌ Performance degradation > 50%
- ❌ Security vulnerability discovered
- ❌ Data corruption detected

### Automatic Rollback

**Trigger:** Deployment job fails

**Process:**
- Rollback job automatically triggered
- Previous version restored
- Team notified via Slack
- No manual intervention needed

### Manual Rollback

**Process:**
```bash
1. Go to Vercel Dashboard
   https://vercel.com/YOUR_ORG/YOUR_PROJECT

2. Click "Deployments" tab

3. Find previous successful deployment

4. Click three dots (•••) → "Promote to Production"

5. Confirm promotion

6. Verify rollback
   curl https://example.com/health
   # Check version number or commit hash
```

**Alternative: Via GitHub Actions**
```bash
1. Go to Actions tab

2. Click "Deploy" workflow

3. Click "Run workflow"

4. Select "rollback" option (if configured)

5. Confirm and run
```

**Expected Timeline:**
- Vercel manual rollback: 1-2 minutes
- GitHub Actions rollback: 3-5 minutes

**Post-Rollback:**
- [ ] Verify application working
- [ ] Check error rates stabilized
- [ ] Notify stakeholders
- [ ] Create incident report
- [ ] Fix and redeploy

---

## 📝 Deployment Log Template

Keep a log of all production deployments:

```markdown
## Deployment: [Date] [Time]

**Version:** v1.2.3
**Commit:** abc123def456
**Deployed by:** @username

**Changes:**
- Feature: Added user dashboard
- Fix: Resolved login issue
- Chore: Updated dependencies

**Pre-deployment checks:**
- [x] Tests passing
- [x] Code reviewed
- [x] Staging verified

**Deployment:**
- Started: 2:00 PM
- Completed: 2:15 PM
- Duration: 15 minutes

**Verification:**
- [x] Health check passing
- [x] Smoke tests passing
- [x] Error rates normal
- [x] Performance metrics normal

**Issues:** None

**Rollback:** Not required
```

---

## 🔧 Troubleshooting

### Deployment Fails to Start

**Symptoms:** GitHub Actions workflow not triggering

**Checks:**
- Verify workflow file in `.github/workflows/`
- Check GitHub Actions enabled for repository
- Verify branch name matches trigger (`main`)
- Check for syntax errors in workflow YAML

### Build Fails

**Symptoms:** Build job fails in CI/CD

**Checks:**
```bash
# Test build locally
npm run build:production

# Check for:
- Missing environment variables
- TypeScript errors
- Linting errors
- Missing dependencies
```

### Deployment Succeeds but App Broken

**Symptoms:** Deployment completes but application not working

**Checks:**
- Check browser console for errors
- Verify environment variables in deployment platform
- Check API endpoints are accessible
- Verify CORS settings
- Check security headers not blocking resources

### High Error Rate After Deployment

**Symptoms:** Sentry showing increased errors

**Action:**
1. Identify error type and frequency
2. If affecting > 10% users: ROLLBACK IMMEDIATELY
3. If < 10% users: Monitor for 15 minutes
4. Create hotfix branch if needed
5. Deploy fix or rollback

---

## 📞 Escalation

### On-Call Rotation
- **Primary:** Check team calendar
- **Secondary:** Check team calendar
- **Manager:** [Name] - [Contact]

### Escalation Path
1. **L1 (0-15 min):** On-call engineer investigates
2. **L2 (15-30 min):** Senior engineer involved
3. **L3 (30+ min):** Manager and stakeholders notified

### Emergency Contacts
- **DevOps Team:** #devops-alerts (Slack)
- **Backend Team:** #backend-team (Slack)
- **Manager:** [Email/Phone]

---

## ✅ Post-Deployment Tasks

Within 24 hours:
- [ ] Update changelog
- [ ] Create release notes
- [ ] Notify stakeholders
- [ ] Update documentation (if applicable)
- [ ] Review deployment metrics
- [ ] Create postmortem (if issues occurred)

---

**Last Updated:** [Date]
**Owner:** DevOps Team
**Review Frequency:** Monthly

