#!/bin/bash

# Auto-shutdown script for dev/test environments
# Schedule with cron: 0 18 * * 1-5 (6 PM on weekdays)

set -e

echo "🌙 Auto-shutdown script starting..."

# Shutdown dev EC2 instances
echo "Stopping dev EC2 instances..."
aws ec2 describe-instances \
  --filters "Name=tag:Environment,Values=dev" "Name=instance-state-name,Values=running" \
  --query 'Reservations[*].Instances[*].InstanceId' \
  --output text | xargs -r aws ec2 stop-instances --instance-ids

# Shutdown test GCE instances
echo "Stopping test GCE instances..."
gcloud compute instances list \
  --filter="labels.environment=test AND status=RUNNING" \
  --format="value(name,zone)" | while read name zone; do
  if [ -n "$name" ]; then
    gcloud compute instances stop $name --zone=$zone --quiet
  fi
done

# Scale down dev Cloud Run services to 0
echo "Scaling down dev Cloud Run services..."
for service in $(gcloud run services list --filter="metadata.labels.environment=dev" --format="value(SERVICE,REGION)"); do
  SERVICE_NAME=$(echo $service | awk '{print $1}')
  REGION=$(echo $service | awk '{print $2}')
  if [ -n "$SERVICE_NAME" ]; then
    gcloud run services update $SERVICE_NAME --region=$REGION --min-instances=0 --quiet
  fi
done

echo "✅ Auto-shutdown complete!"
echo "💰 Estimated savings: \$50-100 per day"

