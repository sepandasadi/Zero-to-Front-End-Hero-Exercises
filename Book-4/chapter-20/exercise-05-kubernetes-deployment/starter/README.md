# Kubernetes Deployment - Starter

This is the starter code for Exercise 5: Deploy to Kubernetes Cluster.

## Prerequisites

You need a Kubernetes cluster. Options:
- **minikube** (recommended for local development)
- **kind** (Kubernetes in Docker)
- **Docker Desktop** (includes Kubernetes)
- **Cloud provider** (GKE, EKS, AKS)

### Install minikube

```bash
# macOS
brew install minikube

# Start cluster
minikube start
```

## Your Task

Create Kubernetes manifests to deploy a React application:

### Files to Create

1. **deployment.yaml** - Application deployment with 3 replicas
2. **service.yaml** - Service to expose the application
3. **configmap.yaml** - Configuration data
4. **secret.yaml** - Sensitive data (base64 encoded)
5. **hpa.yaml** - Horizontal Pod Autoscaler
6. **ingress.yaml** (optional) - Ingress for external access

## Deployment Requirements

### Deployment (deployment.yaml)
- **Name:** react-app
- **Replicas:** 3
- **Image:** Your Docker image from previous exercise
- **Port:** 80
- **Resources:**
  - Requests: cpu=100m, memory=128Mi
  - Limits: cpu=200m, memory=256Mi
- **Liveness probe:** HTTP GET /
- **Readiness probe:** HTTP GET /
- **Environment:** Load from ConfigMap and Secret

### Service (service.yaml)
- **Name:** react-app-service
- **Type:** LoadBalancer (or NodePort for local)
- **Port:** 80
- **Target Port:** 80
- **Selector:** app=react-app

### ConfigMap (configmap.yaml)
- **Name:** react-app-config
- **Data:**
  - APP_NAME: "React App"
  - APP_VERSION: "1.0.0"

### Secret (secret.yaml)
- **Name:** react-app-secret
- **Data:**
  - API_KEY: (base64 encoded value)

### HPA (hpa.yaml)
- **Name:** react-app-hpa
- **Min replicas:** 3
- **Max replicas:** 10
- **Target CPU:** 70%

## Commands to Run

```bash
# Apply all manifests
kubectl apply -f .

# Check deployments
kubectl get deployments

# Check pods
kubectl get pods

# Check services
kubectl get services

# Check HPA
kubectl get hpa

# Get service URL (minikube)
minikube service react-app-service --url

# View logs
kubectl logs -f deployment/react-app

# Scale manually
kubectl scale deployment react-app --replicas=5

# Rolling update
kubectl set image deployment/react-app react-app=NEW_IMAGE:TAG

# Rollback
kubectl rollout undo deployment/react-app
```

## Success Criteria

- [ ] Deployment creates 3 pods
- [ ] All pods are running
- [ ] Service is accessible
- [ ] ConfigMap loaded into pods
- [ ] Secret loaded into pods
- [ ] HPA is active
- [ ] Can scale up/down
- [ ] Rolling updates work

## Testing

### 1. Check Deployment
```bash
kubectl get deployments
kubectl describe deployment react-app
```

### 2. Check Pods
```bash
kubectl get pods
kubectl describe pod POD_NAME
```

### 3. Test Service
```bash
# For minikube
minikube service react-app-service

# For other clusters
kubectl port-forward service/react-app-service 8080:80
# Visit http://localhost:8080
```

### 4. Test Auto-Scaling
```bash
# Generate load
kubectl run -i --tty load-generator --rm --image=busybox --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://react-app-service; done"

# Watch HPA
kubectl get hpa react-app-hpa --watch
```

### 5. Test Rolling Update
```bash
# Update image
kubectl set image deployment/react-app react-app=nginx:alpine

# Watch rollout
kubectl rollout status deployment/react-app
```

## Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [minikube Documentation](https://minikube.sigs.k8s.io/docs/)

Good luck! 🚀

See the [Exercise README](../README.md) for detailed instructions.

