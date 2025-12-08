# Rollback Procedure

## 🎯 Overview

This document outlines the procedures for rolling back a deployment when issues are detected in production.

**Golden Rule:** When in doubt, roll back. It's better to revert and fix properly than to leave users with a broken experience.

---

## ⚠️ When to Rollback

### Immediate Rollback Required

These situations require immediate rollback without discussion:

- ❌ **Critical functionality broken** (can't checkout, can't login, can't access main features)
- ❌ **Data corruption** detected (user data being modified incorrectly)
- ❌ **Security vulnerability** discovered (XSS, authentication bypass, data leak)
- ❌ **Error rate > 5x baseline** (massive spike in errors affecting users)
- ❌ **Performance degradation > 50%** (pages taking 2x longer to load)
- ❌ **Crash loop** (application repeatedly crashing)

### Consider Rollback

These situations warrant discussion but may not require immediate rollback:

- ⚠️ Error rate 2-5x baseline (moderate increase)
- ⚠️ Performance degradation 20-50% (noticeable slowdown)
- ⚠️ Non-critical feature broken (minor features not working)
- ⚠️ UI issues (layout broken, styles missing)
- ⚠️ New errors affecting < 5% of users

**Decision:** Monitor for 15 minutes. If not improving, rollback.

### Do NOT Rollback

- ✅ Minor CSS issues that don't affect functionality
- ✅ Cosmetic bugs (typos, wrong colors)
- ✅ Known issues with workarounds
- ✅ Issues only in non-production environments

---

## 🚀 Rollback Methods

### Method 1: Automatic Rollback (Fastest)

**When:** Deployment job fails in GitHub Actions

**What happens:**
- Rollback job automatically triggered
- Previous version promoted to production
- Team notified via Slack
- **No manual intervention needed**

**Timeline:** 1-2 minutes

**Verification:**
```bash
# Check Slack for rollback notification
# Visit production URL
curl https://example.com/health

# Verify version rolled back
# Check git commit hash in footer or API
```

---

### Method 2: Vercel Dashboard (Recommended for Manual Rollback)

**When:** Issues detected after successful deployment

**Steps:**

1. **Access Vercel Dashboard**
   ```
   https://vercel.com/YOUR_ORG/YOUR_PROJECT
   ```

2. **Navigate to Deployments**
   - Click "Deployments" tab
   - View list of all deployments

3. **Identify Previous Stable Version**
   - Look for deployment before the problematic one
   - Verify it has "Production" badge
   - Check timestamp and commit hash

4. **Promote Previous Deployment**
   - Click three dots (•••) next to deployment
   - Select "Promote to Production"
   - Confirm the promotion

5. **Verify Rollback**
   ```bash
   # Check health
   curl https://example.com/health

   # Check version
   curl https://example.com/api/version

   # Test critical paths
   npm run test:e2e:smoke
   ```

**Timeline:** 1-3 minutes

**Screenshot locations to click:**
```
Dashboard → Deployments → Previous Deployment → ••• → Promote to Production
```

---

### Method 3: GitHub Actions Workflow (Automated)

**When:** Prefer automated process with audit trail

**Steps:**

1. **Navigate to Actions Tab**
   ```
   https://github.com/YOUR_ORG/YOUR_REPO/actions
   ```

2. **Run Rollback Workflow** (if configured)
   - Click "Deploy" workflow
   - Click "Run workflow" dropdown
   - Select "production" environment
   - Check "Rollback" option
   - Click "Run workflow"

3. **Monitor Rollback**
   - Watch workflow execution
   - Wait for completion (2-3 minutes)

4. **Verify Rollback**
   ```bash
   curl https://example.com/health
   ```

**Timeline:** 3-5 minutes

---

### Method 4: Git Revert (For Future Deploys)

**When:** Need to permanently revert code changes

**Steps:**

1. **Identify Problematic Commit**
   ```bash
   git log --oneline
   # Find the commit hash that caused issues
   ```

2. **Create Revert Commit**
   ```bash
   # Revert the specific commit
   git revert abc123

   # Or revert multiple commits
   git revert abc123..def456
   ```

3. **Push and Deploy**
   ```bash
   git push origin main
   # This triggers CI/CD pipeline
   # New deployment with reverted changes
   ```

**Timeline:** 10-15 minutes (includes full CI/CD)

**Note:** This creates a new deployment, not an instant rollback. Use for planned reverts, not emergencies.

---

## 📋 Rollback Checklist

### Pre-Rollback (30 seconds)

- [ ] Confirm rollback is necessary (see "When to Rollback")
- [ ] Notify team in Slack (#deployments channel)
- [ ] Note current time and issue
- [ ] Screenshot error dashboards (Sentry, Analytics)

### During Rollback (1-3 minutes)

- [ ] Execute rollback (Method 1, 2, or 3)
- [ ] Monitor rollback progress
- [ ] Do NOT make other changes during rollback
- [ ] Keep team updated

### Post-Rollback (5-10 minutes)

- [ ] Verify application is working
- [ ] Check error rates have stabilized
- [ ] Confirm critical functionality works
- [ ] Update status page (if public)
- [ ] Notify stakeholders

### Follow-Up (Within 1 hour)

- [ ] Create incident report
- [ ] Document what went wrong
- [ ] Plan fix strategy
- [ ] Schedule postmortem (if major incident)

---

## 🔍 Rollback Verification

### Quick Verification (1 minute)

```bash
# 1. Health check
curl -f https://example.com/health || echo "FAILED"

# 2. Status code
curl -I https://example.com | grep "200 OK"

# 3. Critical endpoint
curl https://example.com/api/products | jq '.[0].id'
```

### Full Verification (5 minutes)

**Functional:**
- [ ] Home page loads
- [ ] Login works
- [ ] Main features accessible
- [ ] Forms submit successfully
- [ ] Search works
- [ ] Checkout process completes (if e-commerce)

**Technical:**
- [ ] No console errors
- [ ] Assets loading correctly
- [ ] API responses normal
- [ ] Performance acceptable

**Monitoring:**
- [ ] Sentry error rate < baseline
- [ ] Response times normal
- [ ] User sessions stable
- [ ] No new critical errors

---

## 📊 Monitoring After Rollback

### First 15 Minutes

**Watch closely:**
- Error rate (should drop immediately)
- User sessions (should stabilize)
- Performance metrics (should return to normal)
- New error types (shouldn't appear)

**Check every 5 minutes:**
```bash
# Sentry dashboard
# Expected: Error count decreasing

# Google Analytics
# Expected: Active users stable

# Server metrics
# Expected: CPU/memory normal
```

### Next 45 Minutes

**Monitor periodically:**
- Continue checking error rates
- Watch for any unusual patterns
- Monitor user feedback channels
- Review server logs

**If issues persist after rollback:**
1. Verify rollback completed successfully
2. Check for infrastructure issues
3. Review recent configuration changes
4. Escalate to senior engineer

---

## 📝 Rollback Communication Template

### Internal (Slack)

```
🚨 ROLLBACK INITIATED

Deployment: v1.2.3 → v1.2.2
Reason: [High error rate / Critical bug / Performance issue]
Started: [Time]
Expected completion: [Time + 5 min]

Current status: In progress
Monitor: https://sentry.io/...

Will update when complete.
```

### Update After Rollback

```
✅ ROLLBACK COMPLETE

Previous version (v1.2.2) restored
Duration: [X] minutes
Status: Application stable

Error rate: ✅ Normal
Performance: ✅ Normal
Critical paths: ✅ Working

Next steps:
- Root cause analysis: [Assignee]
- Fix development: [Assignee]
- Postmortem: [Date/Time]
```

### External (Status Page) - If Needed

```
[Resolved] Brief service degradation

We detected and quickly resolved a service issue affecting
some users. The issue lasted approximately [X] minutes and
has been fully resolved.

We apologize for any inconvenience.

Time detected: [Time]
Time resolved: [Time]
Duration: [X] minutes
```

---

## 🎓 Rollback Scenarios & Examples

### Scenario 1: High Error Rate

**Detection:**
- Sentry alert: Error rate 10x normal
- New error: "Cannot read property 'map' of undefined"
- Affecting 30% of users

**Action:**
1. ✅ Immediate rollback (Method 2: Vercel Dashboard)
2. ✅ Notify team
3. ✅ Verify rollback (error rate drops)
4. ✅ Post-incident: Fix null check, add tests, redeploy

**Timeline:** 2 minutes to rollback, errors stopped immediately

---

### Scenario 2: Performance Degradation

**Detection:**
- Page load time: 2s → 8s (4x slower)
- Lighthouse score: 95 → 60
- Users complaining on social media

**Action:**
1. ✅ Immediate rollback (Method 2: Vercel Dashboard)
2. ✅ Notify stakeholders
3. ✅ Verify performance restored
4. ✅ Post-incident: Profile bundle, optimize large dependency

**Timeline:** 3 minutes to rollback, performance restored

---

### Scenario 3: Minor UI Issue

**Detection:**
- Button color wrong on checkout page
- Functionality works fine
- Only visual issue

**Action:**
1. ❌ Do NOT rollback
2. ✅ Create hotfix branch
3. ✅ Fix and deploy (10-15 minutes)
4. ✅ No user impact on functionality

**Rationale:** Rollback overhead not worth it for cosmetic issue

---

## 🔧 Troubleshooting Rollback Issues

### Rollback Not Working

**Problem:** Rolled back but issues persist

**Checks:**
- Verify rollback actually completed (check deployment ID)
- Clear CDN cache (may be serving old version)
- Check for infrastructure issues unrelated to deployment
- Verify database migrations haven't run (can't rollback DB easily)

**Solution:**
```bash
# Force clear CDN cache
# Vercel: Automatic
# Cloudflare: Purge cache manually

# Check deployment ID matches expected
curl https://example.com/api/version
```

### Multiple Failed Rollback Attempts

**Problem:** Tried rollback 2-3 times, still broken

**Action:**
1. Stop attempting rollbacks
2. Check if infrastructure issue (not deployment)
3. Review recent configuration changes
4. Escalate immediately to senior engineer
5. Consider maintenance mode if critical

---

## 📞 Escalation

### When to Escalate

- Rollback failed after 2 attempts
- Issues persist after successful rollback
- Infrastructure issues suspected
- Database corruption detected
- Security incident

### Who to Contact

**Level 1: On-call Engineer**
- Slack: @oncall-engineer
- First responder for all issues

**Level 2: Senior Engineer**
- Escalate if: Can't resolve in 15 minutes
- Slack: @senior-engineer-oncall

**Level 3: Engineering Manager**
- Escalate if: Major outage, security issue
- Slack: @engineering-manager
- Phone: [Number]

---

## ✅ Post-Rollback Actions

### Immediate (Within 1 Hour)

- [ ] Create incident ticket
- [ ] Document timeline of events
- [ ] Capture screenshots/logs
- [ ] Notify all stakeholders
- [ ] Update status page (if applicable)

### Short-term (Within 24 Hours)

- [ ] Identify root cause
- [ ] Create fix branch
- [ ] Write additional tests
- [ ] Code review fix
- [ ] Deploy fix (with extra caution)

### Long-term (Within 1 Week)

- [ ] Hold postmortem meeting
- [ ] Document lessons learned
- [ ] Update runbooks/procedures
- [ ] Improve monitoring/alerts
- [ ] Share learnings with team

---

## 📚 Postmortem Template

```markdown
# Incident Postmortem: [Date]

## Summary
Brief description of the incident.

## Timeline
- [Time]: Deployment completed
- [Time]: Issues detected
- [Time]: Rollback initiated
- [Time]: Rollback completed
- [Time]: Service restored

## Impact
- Duration: [X] minutes
- Users affected: [%]
- Features impacted: [List]

## Root Cause
Technical explanation of what went wrong.

## Resolution
How the issue was resolved.

## Action Items
- [ ] Add test for [specific case]
- [ ] Improve monitoring for [metric]
- [ ] Update deployment checklist
- [ ] Train team on [topic]

## Lessons Learned
What we learned and how we'll prevent this in future.
```

---

**Last Updated:** [Date]
**Owner:** DevOps Team
**Review Frequency:** After each rollback incident

