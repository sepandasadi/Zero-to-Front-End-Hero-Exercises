// Vercel Edge Function - Complete Solution
// Place in: pages/api/edge.js

export const config = {
  runtime: 'edge'
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name') || 'World';

  // Get geolocation from Vercel
  const country = req.geo?.country || 'Unknown';
  const city = req.geo?.city || 'Unknown';
  const region = req.geo?.region || 'Unknown';
  const latitude = req.geo?.latitude || 'Unknown';
  const longitude = req.geo?.longitude || 'Unknown';

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Vercel Edge Function</title>
      <style>
        body {
          font-family: system-ui, sans-serif;
          max-width: 800px;
          margin: 2rem auto;
          padding: 2rem;
          background: #000;
          color: white;
        }
        .card {
          background: #111;
          padding: 2rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          border: 1px solid #333;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }
        code {
          background: #222;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          color: #0f0;
        }
        .badge {
          background: #0070f3;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          display: inline-block;
          margin-bottom: 1rem;
        }
        ul {
          margin-left: 1.5rem;
        }
        li {
          margin-bottom: 0.5rem;
        }
      </style>
    </head>
    <body>
      <h1>⚡ Vercel Edge Function</h1>
      <div class="badge">✅ Running on Vercel Edge Network</div>

      <div class="card">
        <h2>👋 Hello, ${name}!</h2>
        <p>This response was generated at the edge, close to you.</p>
      </div>

      <div class="card">
        <h2>🌍 Your Location</h2>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Region:</strong> ${region}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Coordinates:</strong> ${latitude}, ${longitude}</p>
      </div>

      <div class="card">
        <h2>📡 Request Details</h2>
        <p><strong>URL:</strong> ${req.url}</p>
        <p><strong>Method:</strong> ${req.method}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>User Agent:</strong> ${req.headers.get('user-agent')?.substring(0, 50)}...</p>
      </div>

      <div class="card">
        <h2>⚡ Edge Benefits</h2>
        <ul>
          <li>Ultra-low latency (&lt; 50ms globally)</li>
          <li>Runs on serverless infrastructure</li>
          <li>Automatic scaling</li>
          <li>Zero cold starts</li>
          <li>Globally distributed</li>
        </ul>
      </div>

      <div class="card">
        <h2>🧪 Try It</h2>
        <p>Add query parameters to customize:</p>
        <code>?name=YourName</code>
      </div>
    </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
      'cache-control': 'public, max-age=60, s-maxage=60',
      'x-edge-location': req.geo?.country || 'unknown'
    }
  });
}

