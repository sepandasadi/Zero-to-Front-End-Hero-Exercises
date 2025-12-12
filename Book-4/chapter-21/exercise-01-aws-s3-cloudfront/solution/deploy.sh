#!/bin/bash

set -e

# Configuration - Update these values
BUCKET_NAME="your-portfolio-app-unique-name"
DISTRIBUTION_ID="YOUR_CLOUDFRONT_ID"

echo "🏗️  Building application..."
npm run build

echo "📦 Uploading to S3..."
# Upload all files except index.html with long-term caching
aws s3 sync dist/ s3://$BUCKET_NAME \
  --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "index.html"

# Upload index.html with no-cache to ensure users always get latest version
aws s3 cp dist/index.html s3://$BUCKET_NAME/index.html \
  --cache-control "no-cache,no-store,must-revalidate" \
  --metadata-directive REPLACE

echo "🔄 Invalidating CloudFront cache..."
INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*" \
  --query 'Invalidation.Id' \
  --output text)

echo "⏳ Waiting for invalidation to complete..."
aws cloudfront wait invalidation-completed \
  --distribution-id $DISTRIBUTION_ID \
  --id $INVALIDATION_ID

echo "✅ Deployment complete!"
echo "🌐 Your site is live at: https://$BUCKET_NAME.s3-website-us-east-1.amazonaws.com"
echo "🚀 CloudFront URL: https://[your-cf-domain].cloudfront.net"

