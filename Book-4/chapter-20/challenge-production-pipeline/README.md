# Challenge: Complete Production Pipeline

**Difficulty:** ⭐⭐⭐⭐ Expert
**Duration:** 8-12 hours

## 🎯 Overview

Build a complete production pipeline from code to deployment. This challenge combines everything you learned in Chapter 20:

1. **Docker** - Multi-stage builds and optimization
2. **Docker Compose** - Local development environment
3. **GitHub Actions** - Automated CI/CD
4. **Kubernetes** - Production deployment
5. **Security** - Vulnerability scanning and hardening
6. **Monitoring** - Health checks and observability

## 📋 Project Requirements

Create a full-stack task management application with:
- **Frontend:** React application
- **Backend:** Node.js API
- **Database:** PostgreSQL
- **Cache:** Redis
- **Complete DevOps pipeline**

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      GitHub Repository                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                 GitHub Actions CI/CD                  │   │
│  │  ┌────────┐  ┌────────┐  ┌──────────┐  ┌──────────┐ │   │
│  │  │  Test  │→ │ Build  │→ │   Scan   │→ │   Push   │ │   │
│  │  └────────┘  └────────┘  └──────────┘  └──────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              Local Development (Docker Compose)              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ Frontend │ │ Backend  │ │PostgreSQL│ │  Redis   │       │
│  │  :3000   │ │  :5000   │ │  :5432   │ │  :6379   │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              Production (Kubernetes Cluster)                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Frontend Deployment (3 replicas)                    │   │
│  │  Backend Deployment (3 replicas)                     │   │
│  │  PostgreSQL StatefulSet                              │   │
│  │  Redis Deployment                                    │   │
│  │  Ingress → Services → Pods                           │   │
│  │  HPA (Auto-scaling)                                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 📝 Phases

### Phase 1: Application Development (2-3 hours)
Build the application:
- ✅ React frontend with task CRUD operations
- ✅ Node.js backend with REST API
- ✅ PostgreSQL integration
- ✅ Redis caching
- ✅ Tests for frontend and backend

### Phase 2: Docker Setup (1-2 hours)
Containerize everything:
- ✅ Multi-stage Dockerfile for frontend (< 30 MB)
- ✅ Optimized Dockerfile for backend
- ✅ docker-compose.yml for local development
- ✅ Hot reload for development
- ✅ Health checks

### Phase 3: CI/CD Pipeline (2-3 hours)
Automate builds and deployments:
- ✅ GitHub Actions workflow
- ✅ Run tests on every push
- ✅ Build Docker images
- ✅ Push to container registry
- ✅ Security scanning with Trivy
- ✅ Multi-platform builds
- ✅ Automated deployments

### Phase 4: Kubernetes Deployment (2-3 hours)
Deploy to production:
- ✅ Deployment manifests for all services
- ✅ Services and networking
- ✅ ConfigMaps and Secrets
- ✅ Persistent volumes for database
- ✅ Horizontal Pod Autoscaler
- ✅ Ingress configuration
- ✅ Rolling updates

### Phase 5: Production Optimization (1-2 hours)
Harden for production:
- ✅ Optimize image sizes
- ✅ Run as non-root users
- ✅ Resource limits
- ✅ Network policies
- ✅ Backup strategy
- ✅ Monitoring setup

## ✅ Success Criteria

### Application
- [ ] Frontend loads and displays tasks
- [ ] Can create, read, update, delete tasks
- [ ] Tasks persist in PostgreSQL
- [ ] Redis caching works
- [ ] Tests pass (frontend + backend)

### Docker
- [ ] All services run in Docker containers
- [ ] docker-compose up starts everything
- [ ] Hot reload works in development
- [ ] Production images < 30 MB (frontend)
- [ ] Health checks implemented

### CI/CD
- [ ] GitHub Actions workflow runs on push
- [ ] Tests run automatically
- [ ] Images build successfully
- [ ] Images pushed to registry
- [ ] Security scan passes (no critical CVEs)
- [ ] Workflow badge is green

### Kubernetes
- [ ] All services deployed to Kubernetes
- [ ] At least 3 frontend replicas running
- [ ] At least 3 backend replicas running
- [ ] Database data persists
- [ ] Auto-scaling works
- [ ] Rolling updates work without downtime
- [ ] Application accessible via Ingress

### Production
- [ ] All images run as non-root
- [ ] Resource limits set
- [ ] Zero critical vulnerabilities
- [ ] Health checks functional
- [ ] Logs accessible
- [ ] Can roll back deployments

## 🚀 Getting Started

### 1. Create Repository

```bash
mkdir production-pipeline-challenge
cd production-pipeline-challenge
git init
```

### 2. Create Project Structure

```
production-pipeline-challenge/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── frontend/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── package.json
│   ├── public/
│   └── src/
├── backend/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── package.json
│   └── src/
├── k8s/
│   ├── frontend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── hpa.yaml
│   ├── backend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── hpa.yaml
│   ├── database/
│   │   ├── statefulset.yaml
│   │   ├── service.yaml
│   │   └── pvc.yaml
│   ├── redis/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   ├── configmap.yaml
│   ├── secret.yaml
│   └── ingress.yaml
├── docker-compose.yml
├── docker-compose.prod.yml
├── .dockerignore
├── .gitignore
└── README.md
```

### 3. Development Workflow

```bash
# Local development
docker-compose up

# Run tests
docker-compose exec frontend npm test
docker-compose exec backend npm test

# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to Kubernetes
kubectl apply -f k8s/
```

## 💡 Tips

### Docker Best Practices
- Use multi-stage builds
- Leverage layer caching
- Create effective .dockerignore
- Use specific image tags, not :latest

### Kubernetes Best Practices
- Always set resource limits
- Use health checks (liveness + readiness)
- Use Secrets for sensitive data
- Enable HPA for auto-scaling
- Use StatefulSets for databases

### CI/CD Best Practices
- Test before building
- Scan for vulnerabilities
- Tag images with commit SHA
- Use caching to speed up builds
- Only deploy on main branch

### Security Best Practices
- Run as non-root user
- Scan regularly for CVEs
- Use minimal base images
- Don't commit secrets
- Use network policies

## 📚 Resources

- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Twelve-Factor App](https://12factor.net/)

## 🎉 Completion

Once you complete all phases:

1. **Demo your pipeline:**
   - Show GitHub Actions running
   - Show Kubernetes deployment
   - Demo the application
   - Show monitoring/logs

2. **Document your work:**
   - Architecture diagram
   - Setup instructions
   - Deployment guide
   - Troubleshooting tips

3. **Celebrate!** 🎊
   You've built a production-ready deployment pipeline!

## 🏆 Bonus Challenges

Want to go further?

- [ ] Add Prometheus + Grafana monitoring
- [ ] Implement blue-green deployments
- [ ] Add automated database backups
- [ ] Implement canary deployments
- [ ] Add end-to-end tests
- [ ] Set up centralized logging (ELK stack)
- [ ] Implement GitOps with ArgoCD
- [ ] Add performance testing
- [ ] Implement disaster recovery

## 💬 Need Help?

- Review individual exercises 1-6
- Check the solution folder for reference
- Read Docker/Kubernetes documentation
- Test locally before deploying to K8s

**You've got this!** 💪 This is the culmination of everything you learned. Take your time, and build something you're proud of!

---

[Back to Chapter 20](../README.md)

