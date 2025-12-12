#!/bin/bash

set -e

echo "🚀 Multi-Cloud Deployment Script"
echo "================================="
echo ""

# Configuration
FRONTEND_BUCKET="task-manager-frontend-$(date +%s)"
GCP_PROJECT_ID=${GCP_PROJECT_ID:-"your-project-id"}
DISTRIBUTION_ID=${DISTRIBUTION_ID:-""}

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Phase 1: Building Applications${NC}"
echo "-----------------------------------"

echo "📦 Building frontend..."
cd frontend
npm install
npm run build
cd ..

echo "📦 Building backend..."
cd backend
npm install
npm run build
cd ..

echo ""
echo -e "${BLUE}Phase 2: AWS Deployment (Frontend)${NC}"
echo "-----------------------------------"

echo "Creating S3 bucket..."
aws s3 mb s3://$FRONTEND_BUCKET || echo "Bucket may already exist"

echo "Enabling static website hosting..."
aws s3 website s3://$FRONTEND_BUCKET \
  --index-document index.html \
  --error-document index.html

echo "Uploading frontend files..."
aws s3 sync frontend/dist/ s3://$FRONTEND_BUCKET --delete

if [ -n "$DISTRIBUTION_ID" ]; then
  echo "Invalidating CloudFront cache..."
  aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*"
fi

echo ""
echo -e "${BLUE}Phase 3: GCP Deployment (Backend)${NC}"
echo "-----------------------------------"

echo "Building Docker image..."
cd backend
gcloud builds submit --tag gcr.io/$GCP_PROJECT_ID/task-api

echo "Deploying to Cloud Run..."
gcloud run deploy task-api \
  --image gcr.io/$GCP_PROJECT_ID/task-api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --max-instances 10 \
  --memory 512Mi

cd ..

echo ""
echo -e "${BLUE}Phase 4: Firebase Deployment${NC}"
echo "-----------------------------------"

echo "Deploying Firestore rules..."
firebase deploy --only firestore:rules

echo "Deploying Storage rules..."
firebase deploy --only storage:rules

echo "Deploying Cloud Functions..."
firebase deploy --only functions

echo ""
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo "================================="
echo ""

# Get URLs
BACKEND_URL=$(gcloud run services describe task-api --region us-central1 --format 'value(status.url)')
FRONTEND_URL="http://$FRONTEND_BUCKET.s3-website-$AWS_REGION.amazonaws.com"

echo "🌐 URLs:"
echo "  Frontend: $FRONTEND_URL"
echo "  Backend:  $BACKEND_URL"
echo ""
echo "📊 Next Steps:"
echo "  1. Test the frontend URL"
echo "  2. Verify API endpoints"
echo "  3. Check Firebase Console"
echo "  4. Monitor logs and metrics"
echo ""
echo "💰 Cost Estimate: ~\$30-50/month for 1000 users"

