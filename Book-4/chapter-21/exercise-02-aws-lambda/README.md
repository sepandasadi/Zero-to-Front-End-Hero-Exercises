# Exercise 2: Serverless Functions with AWS Lambda

**Difficulty:** ⭐⭐ Intermediate
**Time Required:** 45-60 minutes
**Prerequisites:** Exercise 1 completed, Node.js, AWS account

---

## 📚 Overview

Create serverless backend APIs using AWS Lambda and API Gateway to handle form submissions, data processing, and third-party API integrations.

---

## 🎯 What You'll Build

A serverless contact form backend that:
- Receives form submissions via API Gateway
- Validates and processes data with Lambda
- Sends emails using AWS SES
- Stores submissions in DynamoDB
- Returns JSON responses

---

## 📋 Requirements

### Part 1: Create Lambda Function

**Setup:**
```bash
# Create project
mkdir serverless-contact-api
cd serverless-contact-api
npm init -y

# Install dependencies
npm install aws-sdk nodemailer
```

**Lambda Function** (`index.js`):
```javascript
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    // Parse request body
    const body = JSON.parse(event.body);
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Save to DynamoDB
    await dynamodb.put({
      TableName: 'ContactSubmissions',
      Item: {
        id: Date.now().toString(),
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      }
    }).promise();

    // Send email notification
    await ses.sendEmail({
      Source: 'noreply@yourdomain.com',
      Destination: { ToAddresses: ['admin@yourdomain.com'] },
      Message: {
        Subject: { Data: `New contact from ${name}` },
        Body: {
          Text: { Data: `Name: ${name}\nEmail: ${email}\n\n${message}` }
        }
      }
    }).promise();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: 'Form submitted successfully' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
```

---

### Part 2: Deploy with AWS CLI

```bash
# Package function
zip -r function.zip index.js node_modules/

# Create Lambda function
aws lambda create-function \
  --function-name ContactFormHandler \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-execution-role \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --timeout 30 \
  --memory-size 256

# Create DynamoDB table
aws dynamodb create-table \
  --table-name ContactSubmissions \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST
```

---

### Part 3: Configure API Gateway

```bash
# Create REST API
aws apigateway create-rest-api \
  --name ContactFormAPI \
  --description "API for contact form"

# Create resource
aws apigateway create-resource \
  --rest-api-id API_ID \
  --parent-id ROOT_RESOURCE_ID \
  --path-part submit

# Create POST method
aws apigateway put-method \
  --rest-api-id API_ID \
  --resource-id RESOURCE_ID \
  --http-method POST \
  --authorization-type NONE

# Integrate with Lambda
aws apigateway put-integration \
  --rest-api-id API_ID \
  --resource-id RESOURCE_ID \
  --http-method POST \
  --type AWS_PROXY \
  --integration-http-method POST \
  --uri arn:aws:apigateway:REGION:lambda:path/2015-03-31/functions/LAMBDA_ARN/invocations

# Enable CORS
aws apigateway put-method-response \
  --rest-api-id API_ID \
  --resource-id RESOURCE_ID \
  --http-method POST \
  --status-code 200 \
  --response-parameters "method.response.header.Access-Control-Allow-Origin=true"

# Deploy API
aws apigateway create-deployment \
  --rest-api-id API_ID \
  --stage-name prod
```

---

### Part 4: Update React App

```jsx
// src/pages/Contact.jsx
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('https://API_ID.execute-api.us-east-1.amazonaws.com/prod/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Error: ' + data.error);
    }
  } catch (error) {
    alert('Failed to send message');
  }
};
```

---

## ✅ Acceptance Criteria

- [ ] Lambda function processes form submissions
- [ ] Data stored in DynamoDB
- [ ] Email notifications sent via SES
- [ ] API Gateway endpoint accessible via HTTPS
- [ ] CORS properly configured
- [ ] Error handling works
- [ ] Frontend integrates successfully

---

## 🎓 Bonus Challenges

1. **Add Input Validation with Joi**
2. **Implement Rate Limiting**
3. **Add reCAPTCHA Verification**
4. **Set Up CloudWatch Logs Dashboard**
5. **Create Lambda Layers for Shared Code**

---

## 📊 Cost Estimate

**Free Tier:**
- Lambda: 1M requests/month, 400,000 GB-seconds
- API Gateway: 1M API calls/month
- DynamoDB: 25GB storage, 25 write/read capacity units
- **Total: FREE for small apps**

---

**Estimated Completion Time:** 45-60 minutes
**Next Exercise:** Exercise 3 - Deploy Container to Google Cloud Run

