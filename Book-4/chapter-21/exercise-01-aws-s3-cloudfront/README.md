# Exercise 1: Deploy React App to AWS S3 + CloudFront

**Difficulty:** ⭐⭐ Intermediate
**Time Required:** 60-90 minutes
**Prerequisites:** AWS account (Free Tier eligible), AWS CLI installed

---

## 📚 Learning Objectives

By completing this exercise, you will:
- Deploy a React application to AWS S3 as a static website
- Configure CloudFront CDN for global content delivery
- Set up custom domain with SSL certificate
- Implement cache invalidation strategies
- Understand AWS S3 pricing and optimization

---

## 🎯 Exercise Overview

You'll deploy a production-ready React application to AWS using S3 for hosting and CloudFront for global CDN distribution, achieving fast load times worldwide.

---

## 📋 Requirements

### Part 1: AWS Setup
1. **Create AWS Account**
   - Sign up at https://aws.amazon.com
   - Verify email and payment method
   - Enable Free Tier benefits

2. **Install and Configure AWS CLI**
   ```bash
   # Install AWS CLI
   # macOS:
   brew install awscli

   # Windows:
   choco install awscli

   # Linux:
   curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
   unzip awscliv2.zip
   sudo ./aws/install

   # Configure AWS CLI
   aws configure
   # AWS Access Key ID: [Your Key]
   # AWS Secret Access Key: [Your Secret]
   # Default region name: us-east-1
   # Default output format: json
   ```

3. **Create IAM User with S3 Permissions**
   - Navigate to IAM in AWS Console
   - Create user with programmatic access
   - Attach policies: `AmazonS3FullAccess`, `CloudFrontFullAccess`
   - Save access keys securely

---

### Part 2: Build React Application

Create a production-optimized React app:

```bash
# Create React app with Vite
npm create vite@latest aws-portfolio-app -- --template react

cd aws-portfolio-app
npm install

# Add routing
npm install react-router-dom

# Add some styling
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Create a Portfolio App:**

`src/App.jsx`:
```jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex space-x-8">
                <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
                <Link to="/projects" className="text-gray-700 hover:text-blue-600">Projects</Link>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
```

`src/pages/Home.jsx`:
```jsx
export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
      <p className="text-xl text-gray-600 mb-8">
        Deployed on AWS S3 + CloudFront
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Deployment Info</h2>
        <ul className="text-left space-y-2">
          <li>✅ Hosted on AWS S3</li>
          <li>✅ Distributed via CloudFront CDN</li>
          <li>✅ Global edge locations</li>
          <li>✅ HTTPS enabled</li>
          <li>✅ Fast loading worldwide</li>
        </ul>
      </div>
    </div>
  );
}
```

`src/pages/About.jsx`:
```jsx
export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">About This Project</h1>
      <div className="prose lg:prose-xl">
        <p>
          This portfolio website demonstrates cloud deployment best practices
          using AWS services.
        </p>
        <h2>Technologies Used</h2>
        <ul>
          <li>React with Vite</li>
          <li>Tailwind CSS</li>
          <li>AWS S3 for hosting</li>
          <li>AWS CloudFront for CDN</li>
          <li>AWS Certificate Manager for SSL</li>
        </ul>
      </div>
    </div>
  );
}
```

`src/pages/Projects.jsx`:
```jsx
export default function Projects() {
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'Full-stack React + Node.js application',
      tech: ['React', 'Node.js', 'MongoDB', 'AWS'],
    },
    {
      title: 'Task Management App',
      description: 'Real-time collaboration tool',
      tech: ['React', 'Firebase', 'Tailwind CSS'],
    },
    {
      title: 'Weather Dashboard',
      description: 'Weather forecasting with API integration',
      tech: ['React', 'OpenWeather API', 'Chart.js'],
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

`src/pages/Contact.jsx`:
```jsx
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! (In production, this would send to a backend API)');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Contact Me</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="5"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
```

**Configure Tailwind** (`tailwind.config.js`):
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Add Tailwind directives** (`src/index.css`):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Build the application:**
```bash
npm run build
```

---

### Part 3: Deploy to AWS S3

1. **Create S3 Bucket**
```bash
# Choose a unique bucket name
BUCKET_NAME="your-portfolio-app-$(date +%s)"

# Create bucket
aws s3 mb s3://$BUCKET_NAME

# Enable static website hosting
aws s3 website s3://$BUCKET_NAME \
  --index-document index.html \
  --error-document index.html
```

2. **Configure Bucket Policy for Public Access**

Create `bucket-policy.json`:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

Apply policy:
```bash
# Replace YOUR-BUCKET-NAME with your actual bucket name
sed -i "s/YOUR-BUCKET-NAME/$BUCKET_NAME/g" bucket-policy.json

aws s3api put-bucket-policy \
  --bucket $BUCKET_NAME \
  --policy file://bucket-policy.json
```

3. **Upload Built Files**
```bash
# Upload with optimal cache headers
aws s3 sync dist/ s3://$BUCKET_NAME \
  --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "index.html"

# Upload index.html with no-cache
aws s3 cp dist/index.html s3://$BUCKET_NAME/index.html \
  --cache-control "no-cache"

echo "Website URL: http://$BUCKET_NAME.s3-website-us-east-1.amazonaws.com"
```

4. **Test the Deployment**
```bash
# Get the website endpoint
aws s3api get-bucket-website --bucket $BUCKET_NAME

# Visit in browser or use curl
curl http://$BUCKET_NAME.s3-website-us-east-1.amazonaws.com
```

---

### Part 4: Configure CloudFront CDN

1. **Create CloudFront Distribution**

Create `cloudfront-config.json`:
```json
{
  "CallerReference": "portfolio-cf-$(date +%s)",
  "Comment": "CloudFront distribution for portfolio app",
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-Portfolio",
        "DomainName": "YOUR-BUCKET-NAME.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-Portfolio",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"]
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": { "Forward": "none" }
    },
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000,
    "Compress": true
  },
  "Enabled": true
}
```

Create distribution:
```bash
aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json

# Note: Distribution creation takes 15-20 minutes
```

2. **Get CloudFront Domain**
```bash
# List distributions
aws cloudfront list-distributions \
  --query "DistributionList.Items[0].DomainName" \
  --output text

# Example output: d1234567890abc.cloudfront.net
```

3. **Configure Custom Error Pages for SPA Routing**

Update distribution to redirect 404 errors to index.html:
```bash
# Get distribution ID
DISTRIBUTION_ID=$(aws cloudfront list-distributions \
  --query "DistributionList.Items[0].Id" \
  --output text)

# Get current config
aws cloudfront get-distribution-config \
  --id $DISTRIBUTION_ID \
  > distribution-config.json

# Edit config to add custom error response
# (Manual step - edit distribution-config.json)
```

Add to `CustomErrorResponses`:
```json
"CustomErrorResponses": {
  "Quantity": 1,
  "Items": [
    {
      "ErrorCode": 404,
      "ResponsePagePath": "/index.html",
      "ResponseCode": "200",
      "ErrorCachingMinTTL": 300
    }
  ]
}
```

Update distribution:
```bash
aws cloudfront update-distribution \
  --id $DISTRIBUTION_ID \
  --distribution-config file://distribution-config.json \
  --if-match [ETAG from get-distribution-config]
```

---

### Part 5: SSL Certificate (Optional but Recommended)

1. **Request Certificate in ACM**
```bash
# Request certificate (must be in us-east-1 for CloudFront)
aws acm request-certificate \
  --domain-name yourdomain.com \
  --subject-alternative-names www.yourdomain.com \
  --validation-method DNS \
  --region us-east-1
```

2. **Validate Certificate**
- AWS will provide DNS records
- Add CNAME records to your domain's DNS
- Wait for validation (5-30 minutes)

3. **Update CloudFront with Custom Domain**
```bash
# Update distribution config to include:
# - Aliases: [yourdomain.com, www.yourdomain.com]
# - ViewerCertificate: ACM certificate ARN
```

---

### Part 6: Cache Invalidation

When you update your app:

```bash
# Build new version
npm run build

# Upload to S3
aws s3 sync dist/ s3://$BUCKET_NAME --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"

# Check invalidation status
aws cloudfront get-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --id [INVALIDATION-ID]
```

---

### Part 7: Automation Script

Create `deploy.sh`:
```bash
#!/bin/bash

set -e

BUCKET_NAME="your-portfolio-app-unique-name"
DISTRIBUTION_ID="YOUR_CLOUDFRONT_ID"

echo "Building application..."
npm run build

echo "Uploading to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME \
  --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "index.html"

aws s3 cp dist/index.html s3://$BUCKET_NAME/index.html \
  --cache-control "no-cache"

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"

echo "Deployment complete!"
echo "URL: https://d1234567890abc.cloudfront.net"
```

Make executable and run:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## ✅ Acceptance Criteria

Your deployment is complete when:

1. **S3 Hosting Works**
   - [ ] Website accessible via S3 endpoint
   - [ ] All pages load correctly
   - [ ] Images and assets load
   - [ ] SPA routing works (direct URL access)

2. **CloudFront Distribution Active**
   - [ ] Website accessible via CloudFront domain
   - [ ] HTTPS works
   - [ ] Assets served from edge locations
   - [ ] Compression enabled (check response headers)

3. **Performance Optimized**
   - [ ] Lighthouse score > 90
   - [ ] Time to First Byte < 200ms (via CloudFront)
   - [ ] Assets properly cached
   - [ ] Gzip/Brotli compression active

4. **Deployment Automation**
   - [ ] Deploy script works reliably
   - [ ] Cache invalidation completes successfully
   - [ ] Zero downtime during updates

---

## 🎓 Bonus Challenges

1. **Add CI/CD with GitHub Actions**
```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - run: aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} --delete
      - run: aws cloudfront create-invalidation --distribution-id ${{ secrets.CF_DISTRIBUTION_ID }} --paths "/*"
```

2. **Add CloudWatch Monitoring**
   - Set up CloudWatch alarms for 4xx/5xx errors
   - Monitor CloudFront requests
   - Track data transfer costs

3. **Implement Blue-Green Deployment**
   - Create two S3 buckets (blue/green)
   - Switch CloudFront origin between them
   - Zero-downtime deployments

4. **Add Security Headers**
   - Configure CloudFront to add security headers
   - Content-Security-Policy
   - X-Content-Type-Options
   - X-Frame-Options

---

## 📊 Cost Estimate

**Free Tier (First 12 months):**
- S3: 5GB storage, 20,000 GET requests
- CloudFront: 1TB data transfer, 10,000,000 requests
- Certificate Manager: Free

**After Free Tier:**
- S3: ~$0.023/GB/month storage
- S3: ~$0.0004/1000 GET requests
- CloudFront: ~$0.085/GB data transfer
- Total monthly cost for small site: **$1-5**

---

## 🐛 Common Issues & Solutions

**Issue: 404 on page refresh**
- Solution: Configure CloudFront custom error response to return index.html for 404s

**Issue: Updates not showing**
- Solution: Invalidate CloudFront cache after deployment

**Issue: CORS errors**
- Solution: Configure S3 bucket CORS policy

**Issue: Slow first load**
- Solution: Enable CloudFront compression and optimize asset sizes

---

## 📚 Learning Resources

- [AWS S3 Static Hosting Docs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [CloudFront Developer Guide](https://docs.aws.amazon.com/cloudfront/)
- [AWS CLI S3 Commands](https://docs.aws.amazon.com/cli/latest/reference/s3/)

---

## 🎯 Key Takeaways

- S3 provides cost-effective static website hosting
- CloudFront dramatically improves global performance
- Proper caching strategy is crucial for performance
- Automation makes deployments reliable and fast
- AWS Free Tier makes learning affordable

---

**Estimated Completion Time:** 60-90 minutes
**Next Exercise:** Exercise 2 - Serverless Functions with AWS Lambda

