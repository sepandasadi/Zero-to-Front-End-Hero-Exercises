#!/bin/bash

set -e

echo "==============================================="
echo "  Multi-Cloud Resource Inventory & Cost Audit"
echo "==============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== AWS Resources ===${NC}"
echo ""

echo "EC2 Instances:"
aws ec2 describe-instances \
  --query 'Reservations[*].Instances[*].[InstanceId,InstanceType,State.Name,Tags[?Key==`Name`].Value|[0]]' \
  --output table

echo ""
echo "S3 Buckets:"
aws s3 ls | wc -l
aws s3 ls

echo ""
echo "Lambda Functions:"
aws lambda list-functions --query 'Functions[*].[FunctionName,Runtime,MemorySize]' --output table

echo ""
echo "RDS Databases:"
aws rds describe-db-instances \
  --query 'DBInstances[*].[DBInstanceIdentifier,DBInstanceClass,Engine,DBInstanceStatus]' \
  --output table

echo ""
echo -e "${BLUE}=== GCP Resources ===${NC}"
echo ""

echo "Compute Engine Instances:"
gcloud compute instances list --format="table(name,zone,machineType,status)"

echo ""
echo "Cloud Storage Buckets:"
gsutil ls

echo ""
echo "Cloud Run Services:"
gcloud run services list --platform managed --format="table(SERVICE,REGION,URL)"

echo ""
echo "Cloud SQL Instances:"
gcloud sql instances list --format="table(name,databaseVersion,tier,state)"

echo ""
echo -e "${GREEN}=== Cost Estimates ===${NC}"
echo ""

echo "Fetching AWS cost data (last 30 days)..."
aws ce get-cost-and-usage \
  --time-period Start=$(date -u -d '30 days ago' +%Y-%m-%d),End=$(date -u +%Y-%m-%d) \
  --granularity MONTHLY \
  --metrics BlendedCost \
  --query 'ResultsByTime[*].[TimePeriod.Start,Total.BlendedCost.Amount]' \
  --output table

echo ""
echo "For detailed GCP costs, visit:"
echo "https://console.cloud.google.com/billing"

echo ""
echo "=== Summary ==="
echo "Run 'npm run analyze' to generate detailed cost report"

