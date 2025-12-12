# Deployment Guide

## Prerequisites

### Required Accounts
- [ ] AWS account (Free Tier)
- [ ] Google Cloud Platform account
- [ ] Firebase project
- [ ] GitHub account

### Required Tools
```bash
# Node.js
node --version  # v18+

# AWS CLI
aws --version

# Google Cloud CLI
gcloud --version

# Firebase CLI
firebase --version

# Docker
docker --version
```

## Setup

### 1. Clone Repository
```bash
git clone <your-repo>
cd task-manager
```

### 2. Install Dependencies
```bash
# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install

# Functions
cd ../functions && npm install
```

### 3. Configure Environment Variables

**Frontend (.env):**
```bash
cp frontend/.env.example frontend/.env
# Edit with your Firebase config
```

**Backend (.env):**
```bash
cp backend/.env.example backend/.env
# Add Firebase service account credentials
```

### 4. Firebase Setup
```bash
firebase login
firebase init
# Select: Firestore, Storage, Functions
```

## Local Development

### Run Frontend
```bash
cd frontend
npm run dev
# Open http://localhost:5173
```

### Run Backend
```bash
cd backend
npm run dev
# API at http://localhost:8080
```

### Firebase Emulators
```bash
firebase emulators:start
# Firestore: localhost:8080
# Auth: localhost:9099
# Storage: localhost:9199
```

## Deploy to Production

### Deploy Frontend (AWS)

1. Build:
```bash
cd frontend
npm run build
```

2. Create S3 bucket:
```bash
aws s3 mb s3://your-bucket-name
aws s3 website s3://your-bucket-name \
  --index-document index.html \
  --error-document index.html
```

3. Upload:
```bash
aws s3 sync dist/ s3://your-bucket-name
```

4. Create CloudFront distribution:
```bash
# See AWS Console or use Terraform
```

### Deploy Backend (GCP)

1. Build Docker image:
```bash
cd backend
gcloud builds submit --tag gcr.io/YOUR-PROJECT/task-api
```

2. Deploy to Cloud Run:
```bash
gcloud run deploy task-api \
  --image gcr.io/YOUR-PROJECT/task-api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Deploy Firebase

```bash
firebase deploy --only firestore:rules,storage:rules,functions
```

## CI/CD Setup

### GitHub Secrets
Add these secrets to your repository:

**AWS:**
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET`
- `CF_DISTRIBUTION_ID`

**GCP:**
- `GCP_PROJECT_ID`
- `GCP_SA_KEY` (service account JSON)

**Firebase:**
- `FIREBASE_TOKEN`

### Trigger Deployment
```bash
git push origin main
# GitHub Actions will deploy automatically
```

## Verification

### Check Frontend
```bash
curl https://your-domain.com
```

### Check Backend
```bash
curl https://your-cloud-run-url.run.app/health
```

### Check Firebase
- Open Firebase Console
- Verify rules deployed
- Check functions logs

## Troubleshooting

### Frontend Issues
- Check CloudFront cache
- Verify S3 bucket policy
- Check CORS configuration

### Backend Issues
- Check Cloud Run logs: `gcloud run services logs read task-api`
- Verify environment variables
- Check Firebase connection

### Database Issues
- Test Firestore rules in Firebase Console
- Check security rules
- Verify indexes

## Rollback

### Frontend
```bash
# Restore previous S3 version
aws s3 sync s3://your-bucket-backup s3://your-bucket
aws cloudfront create-invalidation --distribution-id ID --paths "/*"
```

### Backend
```bash
# Rollback to previous revision
gcloud run services update-traffic task-api --to-revisions=REVISION-ID=100
```

## Monitoring

### AWS CloudWatch
- Frontend metrics
- Lambda logs
- Cost tracking

### GCP Cloud Monitoring
- Cloud Run metrics
- Error rates
- Performance

### Firebase Console
- Auth users
- Firestore usage
- Function executions

## TODO
Document your specific deployment steps and configurations.

