#!/bin/bash

set -e

echo "======================================="
echo "  Cloud Resource Cleanup Script"
echo "======================================="
echo ""

echo "⚠️  WARNING: This script will DELETE resources!"
echo "Make sure you know what you're doing."
read -p "Continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
  echo "Cancelled."
  exit 1
fi

echo ""
echo "🧹 Starting cleanup..."
echo ""

# AWS Cleanup
echo "=== AWS Cleanup ==="

echo "Finding stopped EC2 instances..."
STOPPED_INSTANCES=$(aws ec2 describe-instances \
  --filters "Name=instance-state-name,Values=stopped" \
  --query 'Reservations[*].Instances[*].InstanceId' \
  --output text)

if [ -n "$STOPPED_INSTANCES" ]; then
  echo "Stopped instances found: $STOPPED_INSTANCES"
  echo "Terminating stopped instances..."
  aws ec2 terminate-instances --instance-ids $STOPPED_INSTANCES
else
  echo "No stopped instances found"
fi

echo ""
echo "Finding unused EBS volumes..."
UNUSED_VOLUMES=$(aws ec2 describe-volumes \
  --filters "Name=status,Values=available" \
  --query 'Volumes[*].VolumeId' \
  --output text)

if [ -n "$UNUSED_VOLUMES" ]; then
  echo "Unused volumes found: $UNUSED_VOLUMES"
  for volume in $UNUSED_VOLUMES; do
    echo "Deleting volume: $volume"
    aws ec2 delete-volume --volume-id $volume
  done
else
  echo "No unused volumes found"
fi

echo ""
echo "Finding old S3 bucket versions..."
# List buckets and check for versioning
for bucket in $(aws s3 ls | awk '{print $3}'); do
  VERSION_STATUS=$(aws s3api get-bucket-versioning --bucket $bucket --query 'Status' --output text 2>/dev/null || echo "None")
  if [ "$VERSION_STATUS" = "Enabled" ]; then
    echo "Bucket $bucket has versioning enabled. Consider cleaning old versions."
  fi
done

# GCP Cleanup
echo ""
echo "=== GCP Cleanup ==="

echo "Finding stopped Compute Engine instances..."
gcloud compute instances list --filter="status=TERMINATED" --format="value(name,zone)" | while read name zone; do
  if [ -n "$name" ]; then
    echo "Deleting stopped instance: $name in $zone"
    gcloud compute instances delete $name --zone=$zone --quiet
  fi
done

echo ""
echo "Finding unused persistent disks..."
gcloud compute disks list --filter="NOT users:*" --format="value(name,zone)" | while read name zone; do
  if [ -n "$name" ]; then
    echo "Deleting unused disk: $name in $zone"
    gcloud compute disks delete $name --zone=$zone --quiet
  fi
done

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "💰 Cost Impact:"
echo "- Deleted stopped instances"
echo "- Removed unused storage"
echo "- Freed up resources"
echo ""
echo "📊 Check your billing dashboard in 24-48 hours to see savings."

