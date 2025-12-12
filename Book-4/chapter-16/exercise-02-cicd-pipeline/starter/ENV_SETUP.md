# Environment Variable Setup

## 📋 Overview

This project uses environment-specific configuration files for development, staging, and production.

## 🔧 Setup Instructions

### Step 1: Create Environment Files

Create three files in the project root:

#### `.env.development`
```bash
# Development Environment Configuration
VITE_API_URL=http://localhost:8000/api
VITE_ENV=development
VITE_ENABLE_DEBUG=true
VITE_SENTRY_DSN=
VITE_GOOGLE_ANALYTICS_ID=
VITE_ENABLE_ANALYTICS=false
```

#### `.env.staging`
```bash
# Staging Environment Configuration
VITE_API_URL=https://api.staging.example.com
VITE_ENV=staging
VITE_ENABLE_DEBUG=true
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/staging-project
VITE_GOOGLE_ANALYTICS_ID=UA-123456-2
VITE_ENABLE_ANALYTICS=true
```

#### `.env.production`
```bash
# Production Environment Configuration
VITE_API_URL=https://api.example.com
VITE_ENV=production
VITE_ENABLE_DEBUG=false
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/production-project
VITE_GOOGLE_ANALYTICS_ID=UA-123456-1
VITE_ENABLE_ANALYTICS=true
```

### Step 2: Verify Setup

Run the app to ensure variables are loaded:

```bash
npm run dev
```

Check the footer - it should display the current environment configuration.

## 🔒 Security Notes

- ✅ Only `VITE_` prefixed variables are exposed to the browser
- ❌ Never commit `.env` files (they're in `.gitignore`)
- ❌ Never put secrets in `VITE_` variables (they're public!)
- ✅ Use `.env.local` for local development secrets

## 💡 Quick Setup Script

Run this to create all three files:

```bash
cat > .env.development << 'EOF'
VITE_API_URL=http://localhost:8000/api
VITE_ENV=development
VITE_ENABLE_DEBUG=true
VITE_SENTRY_DSN=
VITE_GOOGLE_ANALYTICS_ID=
VITE_ENABLE_ANALYTICS=false
EOF

cat > .env.staging << 'EOF'
VITE_API_URL=https://api.staging.example.com
VITE_ENV=staging
VITE_ENABLE_DEBUG=true
VITE_SENTRY_DSN=
VITE_GOOGLE_ANALYTICS_ID=
VITE_ENABLE_ANALYTICS=true
EOF

cat > .env.production << 'EOF'
VITE_API_URL=https://api.example.com
VITE_ENV=production
VITE_ENABLE_DEBUG=false
VITE_SENTRY_DSN=
VITE_GOOGLE_ANALYTICS_ID=
VITE_ENABLE_ANALYTICS=true
EOF

echo "✅ Environment files created!"
```

## 📚 Learn More

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Environment Variable Security](https://12factor.net/config)

