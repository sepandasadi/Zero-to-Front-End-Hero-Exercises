const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    // TODO: Parse request body from event.body
    const body = null; // Parse JSON from event.body

    // TODO: Extract name, email, and message from body
    const { name, email, message } = {};

    // TODO: Validate input - check if all required fields are present
    // Return 400 error if validation fails

    // TODO: Save to DynamoDB
    // Use table name: 'ContactSubmissions'
    // Store: id, name, email, message, timestamp

    // TODO: Send email notification using SES
    // Send to: admin@yourdomain.com
    // From: noreply@yourdomain.com

    // TODO: Return success response with proper headers
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Enable CORS
      },
      body: JSON.stringify({ message: 'Form submitted successfully' })
    };
  } catch (error) {
    console.error('Error:', error);

    // TODO: Return proper error response
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

