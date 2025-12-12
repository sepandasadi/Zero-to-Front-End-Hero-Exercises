# Chapter 21 Quiz: Cloud Computing Essentials

**Total Questions:** 15
**Passing Score:** 12/15 (80%)
**Time Limit:** 20 minutes

---

## Instructions

- Choose the best answer for each question
- Some questions may have multiple correct answers
- Review the chapter content if unsure
- Check your answers at the end

---

## Questions

### 1. What is the primary advantage of cloud computing over traditional on-premises infrastructure?

A) Cloud providers offer free unlimited storage
B) You only pay for resources you actually use (pay-as-you-go)
C) Cloud servers are faster than physical servers
D) Cloud applications never crash

**Answer:** B

**Explanation:** The key advantage is the pay-as-you-go model, where you only pay for what you use, eliminating large upfront infrastructure costs.

---

### 2. Which cloud service model gives you the MOST control over the infrastructure?

A) SaaS (Software as a Service)
B) PaaS (Platform as a Service)
C) FaaS (Function as a Service)
D) IaaS (Infrastructure as a Service)

**Answer:** D

**Explanation:** IaaS provides virtual machines where you manage the OS, runtime, and applications. You have the most control but also the most responsibility.

---

### 3. What is AWS S3 primarily used for?

A) Running virtual machines
B) Object storage for files (images, videos, static websites)
C) Container orchestration
D) Database management

**Answer:** B

**Explanation:** S3 (Simple Storage Service) is object storage designed for storing and retrieving any amount of data, commonly used for static website hosting and file storage.

---

### 4. What is the purpose of AWS CloudFront?

A) To replace S3 for file storage
B) To provide a CDN (Content Delivery Network) for global distribution
C) To manage databases
D) To run serverless functions

**Answer:** B

**Explanation:** CloudFront is a CDN that caches content at edge locations worldwide, reducing latency for global users.

---

### 5. In AWS Lambda, when do you pay for compute time?

A) 24/7, regardless of usage
B) Only when your function is actually executing
C) Per month, flat rate
D) Based on the size of your code

**Answer:** B

**Explanation:** Lambda is serverless - you only pay for the compute time consumed during function execution, rounded to the nearest millisecond.

---

### 6. Which Firebase service provides real-time NoSQL database capabilities?

A) Firebase Hosting
B) Firebase Authentication
C) Cloud Firestore
D) Firebase Analytics

**Answer:** C

**Explanation:** Cloud Firestore is a flexible, scalable NoSQL database with real-time synchronization capabilities.

---

### 7. What is Google Cloud Run?

A) A virtual machine service
B) A managed Kubernetes service
C) A serverless platform for containerized applications
D) A CDN service

**Answer:** C

**Explanation:** Cloud Run is a fully managed serverless platform that automatically scales containerized applications.

---

### 8. What does "serverless" mean in cloud computing?

A) Applications run without any servers
B) You don't manage servers - the cloud provider does
C) It's always free
D) It can't scale

**Answer:** B

**Explanation:** "Serverless" means you don't manage the underlying servers - the cloud provider handles provisioning, scaling, and maintenance.

---

### 9. Which service would you use to manage user authentication in a Firebase app?

A) Firestore
B) Cloud Functions
C) Firebase Authentication
D) Firebase Hosting

**Answer:** C

**Explanation:** Firebase Authentication provides backend services, SDKs, and UI libraries to authenticate users with passwords, phone numbers, and federated identity providers.

---

### 10. What is the purpose of cache invalidation in CloudFront?

A) To reduce costs
B) To force CloudFront to fetch fresh content from the origin
C) To delete the CloudFront distribution
D) To improve security

**Answer:** B

**Explanation:** Cache invalidation tells CloudFront to remove cached objects and fetch fresh content from the origin, useful after deploying updates.

---

### 11. Which is typically the MOST expensive cloud service model for the provider?

A) SaaS - Software as a Service
B) PaaS - Platform as a Service
C) IaaS - Infrastructure as a Service
D) FaaS - Function as a Service

**Answer:** A

**Explanation:** SaaS requires the provider to manage everything from infrastructure to the application itself, making it the most comprehensive (and often most expensive to provide).

---

### 12. What is AWS Fargate?

A) A database service
B) A serverless compute engine for containers
C) A CDN service
D) A storage service

**Answer:** B

**Explanation:** AWS Fargate is a serverless compute engine for containers that works with ECS and EKS, eliminating the need to manage EC2 instances.

---

### 13. In a production environment, which practice is MOST important for cost optimization?

A) Always use the largest instance sizes
B) Monitor usage and right-size resources based on actual needs
C) Keep all resources running 24/7
D) Never use auto-scaling

**Answer:** B

**Explanation:** Monitoring actual usage and right-sizing resources ensures you're not paying for unused capacity while maintaining performance.

---

### 14. What does auto-scaling in Kubernetes do?

A) Automatically increases costs
B) Automatically adjusts the number of pods based on metrics like CPU usage
C) Manually scales applications
D) Deletes unused pods permanently

**Answer:** B

**Explanation:** The Horizontal Pod Autoscaler automatically scales the number of pods based on observed metrics like CPU or memory usage.

---

### 15. Which statement about multi-cloud architecture is TRUE?

A) It's always more expensive than single-cloud
B) It eliminates all vendor lock-in concerns
C) It can provide redundancy and leverage best services from each provider
D) It's required for all applications

**Answer:** C

**Explanation:** Multi-cloud architectures allow you to use the best services from multiple providers and provide redundancy, though they add complexity.

---

## Scoring Guide

**13-15 correct:** ⭐⭐⭐ Excellent! You have a strong understanding of cloud computing essentials.

**10-12 correct:** ⭐⭐ Good! Review the topics you missed to strengthen your knowledge.

**7-9 correct:** ⭐ Fair. Revisit the chapter and practice with the exercises.

**Below 7:** Review the chapter thoroughly and work through all exercises before retaking the quiz.

---

## Answer Key

1. B - Pay-as-you-go model
2. D - IaaS gives most control
3. B - S3 is object storage
4. B - CloudFront is a CDN
5. B - Lambda charges per execution
6. C - Firestore for real-time NoSQL
7. C - Cloud Run for serverless containers
8. B - Provider manages servers
9. C - Firebase Authentication
10. B - Invalidation fetches fresh content
11. A - SaaS requires most provider management
12. B - Fargate is serverless for containers
13. B - Monitor and right-size resources
14. B - Auto-adjusts pods based on metrics
15. C - Multi-cloud provides redundancy and best services

---

## Review Topics

If you missed questions on:

**Questions 1-3:** Review cloud computing fundamentals and service models
**Questions 4-7:** Study AWS services (S3, CloudFront, Lambda, Fargate)
**Questions 6, 9:** Review Firebase services
**Questions 8, 12:** Understand serverless computing concepts
**Questions 10, 13:** Focus on deployment and optimization strategies
**Questions 14-15:** Study Kubernetes and multi-cloud architecture

---

## Next Steps

✅ **Score 80%+?** You're ready to move forward!

📚 **Score below 80%?**
- Re-read relevant sections in Chapter 21
- Complete the exercises you haven't done
- Review cloud provider documentation
- Try building a small cloud project

---

**Want more practice?** Complete the Challenge Project to apply all these concepts in a real production scenario!

