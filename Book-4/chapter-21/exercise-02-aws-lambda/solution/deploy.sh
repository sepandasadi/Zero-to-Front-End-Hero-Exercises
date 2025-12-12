#!/bin/bash

set -e

# Configuration
FUNCTION_NAME="ContactFormHandler"
TABLE_NAME="ContactSubmissions"
ROLE_NAME="lambda-contact-form-role"
REGION="us-east-1"

echo "📦 Installing dependencies..."
npm install

echo "🗜️  Packaging function..."
cd lambda
zip -r ../function.zip index.js
cd ..
zip -r function.zip node_modules/

echo "📊 Creating DynamoDB table..."
aws dynamodb create-table \
  --table-name $TABLE_NAME \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region $REGION \
  2>/dev/null || echo "Table already exists"

echo "🔐 Creating IAM role..."
# Check if role exists
if ! aws iam get-role --role-name $ROLE_NAME 2>/dev/null; then
  # Create trust policy
  cat > trust-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

  aws iam create-role \
    --role-name $ROLE_NAME \
    --assume-role-policy-document file://trust-policy.json

  aws iam attach-role-policy \
    --role-name $ROLE_NAME \
    --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

  aws iam put-role-policy \
    --role-name $ROLE_NAME \
    --policy-name lambda-contact-form-policy \
    --policy-document file://iam-policy.json

  echo "⏳ Waiting for IAM role to propagate..."
  sleep 10
fi

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ROLE_ARN="arn:aws:iam::$ACCOUNT_ID:role/$ROLE_NAME"

echo "🚀 Deploying Lambda function..."
if aws lambda get-function --function-name $FUNCTION_NAME 2>/dev/null; then
  # Update existing function
  aws lambda update-function-code \
    --function-name $FUNCTION_NAME \
    --zip-file fileb://function.zip \
    --region $REGION

  aws lambda update-function-configuration \
    --function-name $FUNCTION_NAME \
    --environment "Variables={TABLE_NAME=$TABLE_NAME,AWS_REGION=$REGION}" \
    --region $REGION
else
  # Create new function
  aws lambda create-function \
    --function-name $FUNCTION_NAME \
    --runtime nodejs18.x \
    --role $ROLE_ARN \
    --handler index.handler \
    --zip-file fileb://function.zip \
    --timeout 30 \
    --memory-size 256 \
    --environment "Variables={TABLE_NAME=$TABLE_NAME,AWS_REGION=$REGION}" \
    --region $REGION
fi

echo "🌐 Setting up API Gateway..."
# Check if API exists
API_ID=$(aws apigateway get-rest-apis --query "items[?name=='ContactFormAPI'].id" --output text)

if [ -z "$API_ID" ]; then
  # Create new API
  API_ID=$(aws apigateway create-rest-api \
    --name ContactFormAPI \
    --description "API for contact form" \
    --query 'id' \
    --output text)
fi

# Get root resource
ROOT_ID=$(aws apigateway get-resources --rest-api-id $API_ID --query 'items[?path==`/`].id' --output text)

# Create /submit resource if it doesn't exist
RESOURCE_ID=$(aws apigateway get-resources --rest-api-id $API_ID --query 'items[?pathPart==`submit`].id' --output text)

if [ -z "$RESOURCE_ID" ]; then
  RESOURCE_ID=$(aws apigateway create-resource \
    --rest-api-id $API_ID \
    --parent-id $ROOT_ID \
    --path-part submit \
    --query 'id' \
    --output text)
fi

# Create POST method
aws apigateway put-method \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method POST \
  --authorization-type NONE \
  2>/dev/null || echo "Method already exists"

# Integrate with Lambda
LAMBDA_ARN="arn:aws:lambda:$REGION:$ACCOUNT_ID:function:$FUNCTION_NAME"
aws apigateway put-integration \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method POST \
  --type AWS_PROXY \
  --integration-http-method POST \
  --uri "arn:aws:apigateway:$REGION:lambda:path/2015-03-31/functions/$LAMBDA_ARN/invocations" \
  2>/dev/null || echo "Integration already exists"

# Add Lambda permission for API Gateway
aws lambda add-permission \
  --function-name $FUNCTION_NAME \
  --statement-id apigateway-invoke \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:$REGION:$ACCOUNT_ID:$API_ID/*/*" \
  2>/dev/null || echo "Permission already exists"

# Enable CORS
aws apigateway put-method \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method OPTIONS \
  --authorization-type NONE \
  2>/dev/null || echo "OPTIONS method already exists"

# Deploy API
aws apigateway create-deployment \
  --rest-api-id $API_ID \
  --stage-name prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📌 API Endpoint:"
echo "https://$API_ID.execute-api.$REGION.amazonaws.com/prod/submit"
echo ""
echo "🧪 Test with curl:"
echo "curl -X POST https://$API_ID.execute-api.$REGION.amazonaws.com/prod/submit \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"name\":\"Test User\",\"email\":\"test@example.com\",\"message\":\"Hello!\"}'"

