// Vercel Edge Function Example
// Place in: pages/api/edge.js

export const config = {
  runtime: 'edge'
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name') || 'World';

  // TODO: Add geolocation
  // const country = req.geo?.country || 'Unknown';
  // const city = req.geo?.city || 'Unknown';

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
        code {
          background: #222;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          color: #0f0;
        }
      </style>
    </head>
    <body>
      <h1>⚡ Vercel Edge Function</h1>

      <div class="card">
        <h2>Hello, ${name}!</h2>
        <p>This response was generated at the edge.</p>
      </div>

      <div class="card">
        <h2>Request Details</h2>
        <p><strong>URL:</strong> ${req.url}</p>
        <p><strong>Method:</strong> ${req.method}</p>
      </div>

      <div class="card">
        <h2>Try It</h2>
        <p>Add <code>?name=YourName</code> to the URL</p>
      </div>

      <!-- TODO: Add geolocation card -->
    </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
      'cache-control': 'public, max-age=60'
    }
  });
}

