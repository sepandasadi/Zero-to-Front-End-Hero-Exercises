# Exercise 3 Starter: Google Cloud Run Deployment

## 🎯 Your Task

Deploy a containerized Node.js API to Google Cloud Run with automatic scaling and global distribution.

## 📋 Setup Instructions

1. **Install Google Cloud SDK**
```bash
# macOS
brew install google-cloud-sdk

# Initialize gcloud
gcloud init
gcloud auth login
```

2. **Set Up Project**
```bash
# Create new project or select existing
gcloud projects create YOUR-PROJECT-ID
gcloud config set project YOUR-PROJECT-ID

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

3. **Install Dependencies**
```bash
npm install
```

## ✅ What You Need to Do

1. **Complete the Express API**
   - Add routes for tasks CRUD
   - Implement error handling
   - Add request logging

2. **Create Dockerfile**
   - Use multi-stage build
   - Optimize for Cloud Run
   - Configure proper port binding

3. **Deploy to Cloud Run**
   - Build Docker image
   - Push to Google Container Registry
   - Deploy to Cloud Run
   - Configure scaling settings

4. **Test the Deployment**
   - Test all API endpoints
   - Verify auto-scaling
   - Monitor logs

## 📁 Files to Complete

- `src/server.js` - Express server (add routes)
- `Dockerfile` - Container configuration
- `deploy.sh` - Deployment script

## 💡 Tips

- Cloud Run requires port from $PORT environment variable
- Use .dockerignore to exclude node_modules
- Implement health check endpoint
- Configure min/max instances for auto-scaling
- Monitor with Cloud Logging

## 🎓 Learning Goals

- Containerize Node.js applications
- Deploy to serverless container platform
- Configure auto-scaling
- Manage environment variables
- Monitor cloud deployments

Good luck! 🚀

