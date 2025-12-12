# Exercise 6: Production Optimization - Image Size and Security

**Difficulty:** Advanced  
**Time:** 60-90 minutes  

## 🎯 Learning Objectives
- Optimize Docker images for production
- Use distroless images
- Scan for vulnerabilities
- Implement advanced layer caching

## 📋 Instructions

See **Chapter 20 Exercises** document for complete step-by-step instructions.

**Key Tasks:**
1. Create optimized Dockerfile with distroless base
2. Compare image sizes (baseline vs optimized)
3. Scan images for vulnerabilities (Trivy, Docker Scout)
4. Optimize layer caching
5. Run as non-root user

**Success Criteria:**
- ✅ Final image < 30 MB (nginx version)
- ✅ Zero critical vulnerabilities
- ✅ Runs as non-root user
- ✅ Startup time < 2 seconds
- ✅ 50%+ size reduction from baseline

[Back to Chapter 20](../README.md)
