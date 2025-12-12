const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: process.env.AWS_REGION || 'us-east-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.TABLE_NAME || 'ContactSubmissions';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@yourdomain.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@yourdomain.com';

exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

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
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({
          error: 'Missing required fields',
          required: ['name', 'email', 'message']
        })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    const submissionId = Date.now().toString();
    const timestamp = new Date().toISOString();

    // Save to DynamoDB
    await dynamodb.put({
      TableName: TABLE_NAME,
      Item: {
        id: submissionId,
        name,
        email,
        message,
        timestamp,
        status: 'new'
      }
    }).promise();

    console.log('Saved to DynamoDB:', submissionId);

    // Send email notification via SES
    try {
      await ses.sendEmail({
        Source: FROM_EMAIL,
        Destination: {
          ToAddresses: [ADMIN_EMAIL]
        },
        Message: {
          Subject: {
            Data: `New contact form submission from ${name}`
          },
          Body: {
            Text: {
              Data: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Timestamp: ${timestamp}

Message:
${message}

---
Submission ID: ${submissionId}
              `.trim()
            }
          }
        }
      }).promise();

      console.log('Email sent successfully');
    } catch (emailError) {
      // Log but don't fail the request if email fails
      console.error('Email sending failed:', emailError);
    }

    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        message: 'Form submitted successfully',
        submissionId
      })
    };

  } catch (error) {
    console.error('Error processing request:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};

