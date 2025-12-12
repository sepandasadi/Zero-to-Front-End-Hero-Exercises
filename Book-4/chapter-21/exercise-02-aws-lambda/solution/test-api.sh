#!/bin/bash

# Replace with your actual API endpoint
API_ENDPOINT="https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/prod/submit"

echo "Testing Contact Form API..."
echo ""

# Test 1: Valid submission
echo "Test 1: Valid submission"
curl -X POST $API_ENDPOINT \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "This is a test message from the contact form."
  }'
echo -e "\n"

# Test 2: Missing fields
echo "Test 2: Missing required fields (should return 400)"
curl -X POST $API_ENDPOINT \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe"
  }'
echo -e "\n"

# Test 3: Invalid email
echo "Test 3: Invalid email format (should return 400)"
curl -X POST $API_ENDPOINT \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "invalid-email",
    "message": "Test message"
  }'
echo -e "\n"

echo "Tests complete!"

