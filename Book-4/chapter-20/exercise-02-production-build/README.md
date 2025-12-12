# Exercise 2: Production Build - Multi-Stage Dockerfile

**Difficulty:** Intermediate  
**Time:** 45-60 minutes  

## 🎯 Learning Objectives
- Create production-ready Docker images with nginx
- Use multi-stage builds to minimize image size
- Configure nginx for SPAs (routing, caching, security headers)
- Implement health checks

## 📋 Instructions

See **Chapter 20 Exercises** document for complete step-by-step instructions.

**Key Tasks:**
1. Create multi-stage Dockerfile (builder + nginx)
2. Configure nginx for SPA routing
3. Add security headers
4. Implement health checks
5. Compare development vs production image sizes

**Success Criteria:**
- ✅ Production image < 30 MB (vs 450+ MB development)
- ✅ Health check endpoint works
- ✅ SPA routing works (refresh on any route)
- ✅ Static assets are cached

[Back to Chapter 20](../README.md)
