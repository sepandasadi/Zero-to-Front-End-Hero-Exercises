# TODO: Implement Terraform infrastructure
#
# Resources to create:
# 1. AWS S3 bucket for frontend
# 2. AWS CloudFront distribution
# 3. GCP Cloud Run service
# 4. IAM roles and permissions

terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

# TODO: Add AWS provider configuration
# TODO: Add GCP provider configuration
# TODO: Add resources

