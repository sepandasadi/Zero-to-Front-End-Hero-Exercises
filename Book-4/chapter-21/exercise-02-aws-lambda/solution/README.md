# Exercise 2 Solution: AWS Lambda Serverless API

## ✅ Solution Overview

Complete serverless contact form backend using AWS Lambda, API Gateway, DynamoDB, and SES.

## 🏗️ Architecture

```
Browser → API Gateway → Lambda Function → DynamoDB + SES
```

## 📁 Key Implementation Details

### Lambda Handler
- Parses JSON request body
- Validates required fields
- Stores data in DynamoDB
- Sends email via SES
- Returns JSON responses with CORS headers

### DynamoDB Schema
```
{
  id: String (primary key),
  name: String,
  email: String,
  message: String,
  timestamp: ISO String
}
```

### API Gateway Configuration
- REST API with POST /submit endpoint
- CORS enabled for browser requests
- Lambda proxy integration
- Production stage deployment

## 🚀 Deployment

Run the deployment script:
```bash
chmod +x deploy.sh
./deploy.sh
```

This will:
1. Install npm dependencies
2. Create DynamoDB table
3. Create IAM role with permissions
4. Package and deploy Lambda function
5. Create and configure API Gateway
6. Output the API endpoint URL

## 🧪 Testing

Test with curl:
```bash
curl -X POST https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/prod/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","message":"Hello!"}'
```

Expected response:
```json
{"message":"Form submitted successfully"}
```

## 💡 Key Learning Points

✅ Serverless functions scale automatically
✅ Pay only for actual usage
✅ API Gateway provides HTTPS endpoint
✅ DynamoDB offers fast, scalable storage
✅ SES enables transactional emails
✅ CloudWatch provides logging and monitoring

## 📊 Performance & Cost

- **Latency:** 50-200ms per request
- **Concurrency:** Up to 1000 concurrent executions
- **Cost:** $0 for first 1M requests/month (Free Tier)
- **Scaling:** Automatic, no configuration needed

Great job! 🎉

