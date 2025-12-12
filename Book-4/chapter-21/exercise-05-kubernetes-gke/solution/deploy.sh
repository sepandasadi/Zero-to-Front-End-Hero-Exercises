#!/bin/bash

set -e

PROJECT_ID=${GCP_PROJECT_ID:-"your-gcp-project-id"}
CLUSTER_NAME="web-app-cluster"
ZONE="us-central1-a"
IMAGE_NAME="gcr.io/$PROJECT_ID/web-app"

echo "🔧 Setting up GKE cluster..."
# Check if cluster exists
if ! gcloud container clusters describe $CLUSTER_NAME --zone $ZONE &>/dev/null; then
  echo "Creating cluster..."
  gcloud container clusters create $CLUSTER_NAME \
    --zone $ZONE \
    --num-nodes 3 \
    --machine-type n1-standard-1 \
    --enable-autoscaling \
    --min-nodes 3 \
    --max-nodes 10 \
    --enable-autorepair \
    --enable-autoupgrade \
    --project $PROJECT_ID
else
  echo "Cluster already exists"
fi

echo "📦 Getting cluster credentials..."
gcloud container clusters get-credentials $CLUSTER_NAME --zone $ZONE --project $PROJECT_ID

echo "🏗️  Building and pushing Docker image..."
gcloud builds submit --tag $IMAGE_NAME

echo "☸️  Applying Kubernetes manifests..."
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/hpa.yaml

echo "⏳ Waiting for deployment to be ready..."
kubectl rollout status deployment/web-app

echo "📊 Deployment status:"
kubectl get deployments
kubectl get pods
kubectl get services
kubectl get hpa

echo ""
echo "✅ Deployment complete!"
echo ""

# Get service external IP (may take a few minutes)
echo "⏳ Waiting for external IP..."
for i in {1..30}; do
  EXTERNAL_IP=$(kubectl get service web-app-service -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null)
  if [ -n "$EXTERNAL_IP" ]; then
    break
  fi
  echo "Waiting for external IP... ($i/30)"
  sleep 10
done

if [ -n "$EXTERNAL_IP" ]; then
  echo "🌐 Application URL: http://$EXTERNAL_IP"
  echo ""
  echo "🧪 Test the app:"
  echo "  curl http://$EXTERNAL_IP/health"
else
  echo "⚠️  External IP not ready yet. Run this command to check:"
  echo "  kubectl get service web-app-service"
fi

echo ""
echo "📈 Useful commands:"
echo "  kubectl get pods                          # View pods"
echo "  kubectl logs -l app=web-app              # View logs"
echo "  kubectl get hpa -w                       # Watch auto-scaling"
echo "  kubectl scale deployment web-app --replicas=5  # Manual scaling"
echo "  kubectl delete -f k8s/                   # Clean up"

