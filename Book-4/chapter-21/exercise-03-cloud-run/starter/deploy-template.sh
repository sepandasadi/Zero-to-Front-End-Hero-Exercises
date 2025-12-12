#!/bin/bash

# Configuration
PROJECT_ID="your-gcp-project-id"
SERVICE_NAME="task-api"
REGION="us-central1"

echo "🏗️  Building Docker image..."
# TODO: Build Docker image with proper tag

echo "📤 Pushing to Container Registry..."
# TODO: Push image to Google Container Registry

echo "🚀 Deploying to Cloud Run..."
# TODO: Deploy to Cloud Run with proper configuration

echo "✅ Deployment complete!"
# TODO: Print service URL

