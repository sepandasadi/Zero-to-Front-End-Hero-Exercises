#!/bin/bash

set -e

# Configuration
PROJECT_ID=${GCP_PROJECT_ID:-"your-gcp-project-id"}
SERVICE_NAME="task-api"
REGION="us-central1"
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"

echo "🔧 Configuring Google Cloud..."
gcloud config set project $PROJECT_ID

echo "🏗️  Building Docker image..."
gcloud builds submit --tag $IMAGE_NAME

echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --timeout 60s \
  --max-instances 10 \
  --min-instances 0 \
  --set-env-vars NODE_ENV=production

echo ""
echo "✅ Deployment complete!"
echo ""

# Get service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME \
  --region $REGION \
  --format 'value(status.url)')

echo "🌐 Service URL: $SERVICE_URL"
echo ""
echo "🧪 Test the API:"
echo "  Health check: curl $SERVICE_URL/health"
echo "  Get tasks:    curl $SERVICE_URL/api/tasks"
echo "  Create task:  curl -X POST $SERVICE_URL/api/tasks -H 'Content-Type: application/json' -d '{\"title\":\"New Task\"}'"
echo ""
echo "📊 View logs:"
echo "  gcloud run services logs read $SERVICE_NAME --region $REGION --limit 50"
echo ""
echo "📈 Monitor service:"
echo "  https://console.cloud.google.com/run/detail/$REGION/$SERVICE_NAME"

