# Exercise 3 Solution: Google Cloud Run Deployment

## ✅ Solution Overview

Complete REST API deployed on Google Cloud Run with Docker containerization and auto-scaling.

## 🏗️ Architecture

```
Client → Cloud Load Balancer → Cloud Run Service → Container Instance(s)
```

## 📁 Key Features

### Express API
- Full CRUD operations for tasks
- In-memory data store
- Error handling middleware
- Health check endpoint
- CORS enabled

### Docker Configuration
- Multi-stage build for optimization
- Node.js 18 Alpine base image
- Production dependencies only
- Proper port binding from $PORT

### Cloud Run Configuration
- Auto-scaling: 0-10 instances
- Memory: 512MB
- CPU: 1
- Request timeout: 60s
- Public access enabled

## 🚀 Deployment

Run the deployment script:
```bash
chmod +x deploy.sh
./deploy.sh
```

Or deploy manually:
```bash
# Build and tag
gcloud builds submit --tag gcr.io/YOUR-PROJECT/task-api

# Deploy
gcloud run deploy task-api \
  --image gcr.io/YOUR-PROJECT/task-api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --max-instances 10
```

## 🧪 Testing

Get service URL:
```bash
SERVICE_URL=$(gcloud run services describe task-api --region us-central1 --format 'value(status.url)')
```

Test endpoints:
```bash
# Health check
curl $SERVICE_URL/health

# Create task
curl -X POST $SERVICE_URL/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","completed":false}'

# Get all tasks
curl $SERVICE_URL/api/tasks

# Get specific task
curl $SERVICE_URL/api/tasks/1

# Update task
curl -X PUT $SERVICE_URL/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete task
curl -X DELETE $SERVICE_URL/api/tasks/1
```

## 💡 Key Learning Points

✅ Serverless containers auto-scale from 0
✅ Pay only for actual request processing time
✅ No infrastructure management required
✅ HTTPS endpoints provided automatically
✅ Global deployment in multiple regions
✅ Built-in load balancing

## 📊 Performance

- **Cold Start:** 1-3 seconds
- **Warm Requests:** 10-50ms
- **Max Concurrency:** 1000 requests/instance
- **Auto-scaling:** Instant based on traffic

Great job! 🎉

