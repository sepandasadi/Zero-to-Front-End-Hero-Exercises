# GitHub Secrets Setup Guide

## 🔐 Required Secrets

Configure these secrets in your GitHub repository settings:
**Settings → Secrets and variables → Actions → New repository secret**

### Vercel Deployment Secrets

```bash
# Vercel Authentication Token
VERCEL_TOKEN=your_vercel_token_here

# Vercel Organization ID
VERCEL_ORG_ID=your_org_id_here

# Vercel Project ID
VERCEL_PROJECT_ID=your_project_id_here
```

**How to get these values:**
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Link your project
cd your-project
vercel link

# 4. Get the IDs from .vercel/project.json
cat .vercel/project.json
```

### Environment-Specific API URLs

```bash
# Staging API URL
VITE_API_URL_STAGING=https://api.staging.example.com

# Production API URL
VITE_API_URL_PRODUCTION=https://api.example.com
```

### Monitoring & Analytics

```bash
# Sentry Configuration
VITE_SENTRY_DSN=https://abc123@o123.ingest.sentry.io/456
SENTRY_AUTH_TOKEN=your_sentry_auth_token
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project

# Google Analytics
VITE_GOOGLE_ANALYTICS_ID=UA-123456789-1
```

### Notifications

```bash
# Slack Webhook URL (optional)
SLACK_WEBHOOK=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

## 🚀 Quick Setup Script

Run this in your repository settings or use GitHub CLI:

```bash
# Using GitHub CLI (gh)
gh secret set VERCEL_TOKEN
gh secret set VERCEL_ORG_ID
gh secret set VERCEL_PROJECT_ID
gh secret set VITE_API_URL_STAGING
gh secret set VITE_API_URL_PRODUCTION
gh secret set VITE_SENTRY_DSN
gh secret set SENTRY_AUTH_TOKEN
gh secret set SENTRY_ORG
gh secret set SENTRY_PROJECT
gh secret set SLACK_WEBHOOK
```

## 🌍 Environment Configuration

### Create GitHub Environments

**Settings → Environments → New environment**

#### Staging Environment
- Name: `staging`
- No protection rules needed (auto-deploy)

#### Production Environment
- Name: `production`
- Protection rules:
  - ✅ Required reviewers (add team members)
  - ✅ Wait timer: 5 minutes (optional)
  - ✅ Deployment branches: `main` only

## ✅ Verification

After setting up secrets, verify they're configured:

```bash
# List all secrets (names only, not values)
gh secret list

# Expected output:
# VERCEL_TOKEN
# VERCEL_ORG_ID
# VERCEL_PROJECT_ID
# VITE_API_URL_STAGING
# VITE_API_URL_PRODUCTION
# VITE_SENTRY_DSN
# ...
```

## 🔒 Security Best Practices

- ✅ **Never commit secrets** to code
- ✅ **Rotate secrets** periodically (every 90 days)
- ✅ **Use least privilege** (only necessary permissions)
- ✅ **Environment-specific secrets** for staging vs production
- ❌ **Don't share secrets** in Slack, email, etc.
- ❌ **Don't log secrets** in GitHub Actions output

## 💡 Testing Secrets

Test that secrets are working in workflows:

```yaml
# Add this to a workflow job (temporary, for testing)
steps:
  - name: Test Secrets
    run: |
      echo "Vercel Token: ${VERCEL_TOKEN:0:10}..." # Only show first 10 chars
      echo "API URL: ${{ secrets.VITE_API_URL_STAGING }}"
```

**Remember to remove test steps after verification!**

## 🆘 Troubleshooting

### Error: "Secret not found"
- Check secret name spelling (case-sensitive)
- Verify secret is set in repository settings
- Check if using organization vs repository secret

### Error: "Deployment failed"
- Verify all Vercel secrets are correct
- Check Vercel CLI is installed locally
- Test deployment manually first: `vercel --prod`

### Error: "Unauthorized"
- Token may be expired - regenerate in Vercel
- Check token has correct permissions
- Verify organization ID matches

## 📚 Additional Resources

- [GitHub Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Vercel GitHub Integration](https://vercel.com/docs/concepts/git/vercel-for-github)
- [Sentry Source Maps](https://docs.sentry.io/platforms/javascript/sourcemaps/)

