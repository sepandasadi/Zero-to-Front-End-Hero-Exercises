# Exercise 2 Starter: AWS Lambda Serverless API

## 🎯 Your Task

Create a serverless contact form backend using AWS Lambda, API Gateway, DynamoDB, and SES.

## 📋 Setup Instructions

1. **Install Dependencies**
```bash
npm install
```

2. **Configure AWS Credentials**
```bash
aws configure
```

3. **Complete the Lambda Function**
   - Implement validation logic
   - Add DynamoDB integration
   - Set up SES email sending
   - Add proper error handling

4. **Deploy the Function**
```bash
./deploy.sh
```

## ✅ What You Need to Do

1. **Complete Lambda Handler**
   - Parse and validate request data
   - Save to DynamoDB
   - Send email notification
   - Return proper responses with CORS

2. **Set Up AWS Resources**
   - Create DynamoDB table
   - Configure IAM role with permissions
   - Verify email addresses in SES
   - Create API Gateway endpoint

3. **Configure API Gateway**
   - Create REST API
   - Set up POST method
   - Enable CORS
   - Deploy to prod stage

4. **Test the API**
   - Test with curl or Postman
   - Verify data in DynamoDB
   - Check email delivery
   - Test error scenarios

## 📁 Files to Complete

- `lambda/index.js` - Main Lambda handler (fill in TODOs)
- `deploy.sh` - Deployment script
- `test-api.sh` - API testing script

## 💡 Tips

- Use environment variables for configuration
- Add proper error logging
- Implement input validation
- Test locally with SAM CLI before deploying
- Monitor with CloudWatch Logs

## 🎓 Learning Goals

- Understand serverless architecture
- Learn Lambda function development
- Configure API Gateway
- Integrate AWS services (DynamoDB, SES)
- Implement CORS for browser requests

Good luck! 🚀

