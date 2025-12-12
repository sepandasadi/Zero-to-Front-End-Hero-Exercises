# Exercise 5 Starter: Kubernetes on Google Kubernetes Engine

## 🎯 Your Task

Deploy a containerized application to Google Kubernetes Engine (GKE) with auto-scaling, load balancing, and production-ready configuration.

## 📋 Setup Instructions

1. **Install kubectl and gcloud**
```bash
# Install kubectl
gcloud components install kubectl

# Authenticate
gcloud auth login
gcloud config set project YOUR-PROJECT-ID
```

2. **Create GKE Cluster**
```bash
gcloud container clusters create my-cluster \
  --zone us-central1-a \
  --num-nodes 3
```

3. **Get Cluster Credentials**
```bash
gcloud container clusters get-credentials my-cluster --zone us-central1-a
```

## ✅ What You Need to Do

1. **Create Kubernetes Manifests**
   - Deployment configuration
   - Service (LoadBalancer)
   - ConfigMap for environment variables
   - Secret for sensitive data
   - HorizontalPodAutoscaler

2. **Deploy to GKE**
   - Apply all manifests
   - Verify deployment
   - Test auto-scaling
   - Monitor with Kubernetes Dashboard

3. **Configure Ingress**
   - Set up Ingress controller
   - Configure SSL/TLS
   - Set up domain routing

## 📁 Files to Complete

- `k8s/deployment.yaml` - Pod deployment config
- `k8s/service.yaml` - Service configuration
- `k8s/configmap.yaml` - Environment variables
- `k8s/hpa.yaml` - Auto-scaling configuration
- `k8s/ingress.yaml` - Ingress routing

## 💡 Tips

- Use namespaces for organization
- Set resource limits and requests
- Implement health checks (liveness/readiness probes)
- Use secrets for sensitive data
- Enable logging and monitoring

## 🎓 Learning Goals

- Kubernetes fundamentals
- GKE cluster management
- Pod orchestration
- Auto-scaling configuration
- Production deployment best practices

Good luck! 🚀

