# Exercise 1 Starter: AWS S3 + CloudFront Deployment

## 🎯 Your Task

Deploy a React portfolio application to AWS using S3 for hosting and CloudFront for global CDN distribution.

## 📋 Setup Instructions

1. **Install Dependencies**
```bash
npm install
```

2. **Configure AWS CLI**
```bash
aws configure
# Enter your AWS credentials
```

3. **Build the Application**
```bash
npm run build
```

4. **Deploy to AWS**
Follow the main exercise README for detailed deployment steps.

## ✅ What You Need to Do

1. **Complete the Portfolio App**
   - Add missing components in `src/pages/`
   - Implement routing
   - Style with Tailwind CSS

2. **Create AWS Resources**
   - Create S3 bucket
   - Configure bucket for static hosting
   - Set up bucket policy

3. **Deploy to S3**
   - Upload built files
   - Configure proper cache headers

4. **Set Up CloudFront**
   - Create CloudFront distribution
   - Configure custom error pages for SPA routing
   - Test global distribution

5. **Create Deployment Script**
   - Complete the `deploy.sh` script
   - Implement cache invalidation

## 📁 Files to Create/Complete

- `src/pages/About.jsx` - About page component
- `src/pages/Projects.jsx` - Projects page component
- `src/pages/Contact.jsx` - Contact page component
- `bucket-policy.json` - S3 bucket policy
- `deploy.sh` - Automated deployment script

## 💡 Tips

- Make sure your bucket name is globally unique
- Use proper cache-control headers for assets
- Configure CloudFront to handle SPA routing (404 -> index.html)
- Test in multiple regions to verify CDN performance

## 🎓 Learning Goals

- Understand S3 static website hosting
- Learn CloudFront CDN configuration
- Implement proper caching strategies
- Automate deployment processes

Good luck! 🚀

