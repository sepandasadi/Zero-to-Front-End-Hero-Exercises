# Kubernetes Deployment - Solution

This is the complete solution for Exercise 5: Kubernetes Deployment.

## What's Included

- **deployment.yaml** - Application deployment with 3 replicas, health checks, resource limits
- **service.yaml** - LoadBalancer service to expose the app
- **configmap.yaml** - Configuration data
- **secret.yaml** - Sensitive data (base64 encoded)
- **hpa.yaml** - Horizontal Pod Autoscaler for auto-scaling
- **ingress.yaml** - Ingress for external access (optional)

## Quick Start

### 1. Apply All Manifests

```bash
# Create resources in order
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f hpa.yaml

# Or apply all at once
kubectl apply -f .
```

### 2. Verify Deployment

```bash
# Check deployment
kubectl get deployments

# Check pods (should see 3 running)
kubectl get pods

# Check service
kubectl get services

# Check HPA
kubectl get hpa
```

### 3. Access the Application

**For minikube:**
```bash
minikube service react-app-service
```

**For other clusters:**
```bash
kubectl port-forward service/react-app-service 8080:80
```

Visit http://localhost:8080

## Testing the Solution

### 1. Test Pod Health

```bash
# All pods should be Running and Ready
kubectl get pods

# Check pod details
kubectl describe pod POD_NAME

# View logs
kubectl logs -f deployment/react-app
```

### 2. Test Service Connectivity

```bash
# Get service details
kubectl describe service react-app-service

# Test from within cluster
kubectl run test-pod --image=busybox:1.28 --rm -it --restart=Never -- wget -qO- http://react-app-service
```

### 3. Test ConfigMap and Secret

```bash
# Exec into pod
kubectl exec -it POD_NAME -- sh

# Inside pod, check environment variables
env | grep APP_
env | grep API_KEY
```

### 4. Test Auto-Scaling

```bash
# Generate load
kubectl run load-generator --image=busybox:1.28 --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://react-app-service; done"

# Watch HPA (pods should scale up)
kubectl get hpa react-app-hpa --watch

# Stop load and watch scale down
kubectl delete pod load-generator
kubectl get hpa react-app-hpa --watch
```

### 5. Test Rolling Update

```bash
# Update image
kubectl set image deployment/react-app react-app=nginx:1.25-alpine

# Watch rollout status
kubectl rollout status deployment/react-app

# Check history
kubectl rollout history deployment/react-app

# Rollback if needed
kubectl rollout undo deployment/react-app
```

### 6. Test Pod Restart

```bash
# Delete a pod (deployment will recreate it)
kubectl delete pod POD_NAME

# Watch pods
kubectl get pods -w
```

## Key Concepts

### Deployment
Manages ReplicaSets and provides declarative updates for Pods.

**Features:**
- Rolling updates
- Rollbacks
- Scaling
- Self-healing

### Service
Exposes Pods as a network service with a stable IP.

**Types:**
- ClusterIP (default) - Internal only
- NodePort - Accessible via node IP
- LoadBalancer - Cloud provider load balancer
- ExternalName - DNS alias

### ConfigMap
Non-confidential configuration data.

**Use for:**
- Application config
- Environment variables
- Command-line arguments
- Config files

### Secret
Confidential data (base64 encoded, not encrypted by default).

**Use for:**
- Passwords
- API keys
- Certificates
- Tokens

### HPA
Automatically scales pods based on CPU/memory usage.

**How it works:**
1. Monitors metrics
2. Calculates desired replicas
3. Updates deployment
4. Waits for stabilization

### Health Checks

**Liveness Probe:**
- Is the container alive?
- Restart if fails

**Readiness Probe:**
- Is the container ready to serve traffic?
- Remove from service if fails

## Common Commands

```bash
# View resources
kubectl get all
kubectl get pods
kubectl get deployments
kubectl get services
kubectl get hpa

# Describe resources
kubectl describe deployment react-app
kubectl describe pod POD_NAME
kubectl describe service react-app-service

# Logs
kubectl logs POD_NAME
kubectl logs -f deployment/react-app
kubectl logs --tail=100 POD_NAME

# Execute commands
kubectl exec -it POD_NAME -- sh
kubectl exec POD_NAME -- env

# Scale manually
kubectl scale deployment react-app --replicas=5

# Update
kubectl set image deployment/react-app react-app=nginx:latest
kubectl rollout restart deployment/react-app

# Rollback
kubectl rollout undo deployment/react-app
kubectl rollout undo deployment/react-app --to-revision=2

# Delete
kubectl delete -f .
kubectl delete deployment react-app
kubectl delete service react-app-service
```

## Troubleshooting

### Pods not starting

```bash
# Check events
kubectl describe pod POD_NAME

# Common issues:
# - ImagePullBackOff: Wrong image name/tag
# - CrashLoopBackOff: Container keeps crashing
# - Pending: Not enough resources
```

### Service not accessible

```bash
# Check endpoints
kubectl get endpoints react-app-service

# Should show pod IPs
# If empty, check selector matches pod labels
```

### HPA not scaling

```bash
# Check metrics server is installed
kubectl get apiservice v1beta1.metrics.k8s.io

# Install if needed (minikube)
minikube addons enable metrics-server

# Check HPA events
kubectl describe hpa react-app-hpa
```

### ConfigMap/Secret not loading

```bash
# Check they exist
kubectl get configmap
kubectl get secret

# Check pod events
kubectl describe pod POD_NAME
```

## Production Best Practices

1. **Resource Limits:** Always set requests and limits
2. **Health Checks:** Implement both liveness and readiness probes
3. **Multiple Replicas:** At least 3 for high availability
4. **Rolling Updates:** Use maxSurge and maxUnavailable
5. **HPA:** Enable auto-scaling for traffic spikes
6. **Monitoring:** Use Prometheus + Grafana
7. **Logging:** Centralized logging (ELK, Datadog)
8. **Security:** Use NetworkPolicies, PodSecurityPolicies
9. **Secrets:** Use external secret management (Vault, Sealed Secrets)
10. **Namespaces:** Isolate environments

## What You Learned

1. ✅ Creating Kubernetes deployments
2. ✅ Exposing apps with services
3. ✅ Using ConfigMaps and Secrets
4. ✅ Implementing health checks
5. ✅ Auto-scaling with HPA
6. ✅ Rolling updates and rollbacks
7. ✅ Resource management
8. ✅ kubectl commands

## Next Steps

Move on to [Exercise 6: Production Optimization](../exercise-06-production-optimization/README.md) to learn about:
- Image size optimization
- Distroless images
- Vulnerability scanning
- Performance tuning

Excellent work! You can now deploy production applications to Kubernetes! 🎉

