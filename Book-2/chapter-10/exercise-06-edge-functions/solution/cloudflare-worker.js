// Cloudflare Worker - Complete Solution
// Deploy with: wrangler publish

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cache = caches.default;

    // Try cache first
    let response = await cache.match(request);

    if (response) {
      // Add cache hit header
      const headers = new Headers(response.headers);
      headers.set('X-Cache', 'HIT');
      return new Response(response.body, {
        status: response.status,
        headers
      });
    }

    // Get geolocation data from Cloudflare
    const cf = request.cf || {};
    const country = cf.country || 'Unknown';
    const city = cf.city || 'Unknown';
    const colo = cf.colo || 'Unknown';
    const latitude = cf.latitude || 'Unknown';
    const longitude = cf.longitude || 'Unknown';

    // Generate HTML response
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Edge Function - Cloudflare</title>
        <style>
          body {
            font-family: system-ui, sans-serif;
            max-width: 800px;
            margin: 2rem auto;
            padding: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
          .card {
            background: rgba(255, 255, 255, 0.1);
            padding: 2rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            backdrop-filter: blur(10px);
          }
          h1 {
            font-size: 2.5rem;
            margin-bottom: 2rem;
          }
          code {
            background: rgba(0, 0, 0, 0.3);
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
          }
          .badge {
            background: #4caf50;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            display: inline-block;
            margin-bottom: 1rem;
          }
        </style>
      </head>
      <body>
        <h1>⚡ Edge Function Demo</h1>
        <div class="badge">✅ Running on Cloudflare Edge</div>

        <div class="card">
          <h2>🌍 Your Location</h2>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Coordinates:</strong> ${latitude}, ${longitude}</p>
          <p><strong>Edge Location:</strong> ${colo}</p>
        </div>

        <div class="card">
          <h2>📡 Request Information</h2>
          <p><strong>URL:</strong> ${url.pathname}</p>
          <p><strong>Method:</strong> ${request.method}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        </div>

        <div class="card">
          <h2>⚡ Performance Benefits</h2>
          <ul>
            <li>Served from nearest edge location</li>
            <li>Low latency (typically &lt; 50ms)</li>
            <li>Cached at the edge for instant delivery</li>
            <li>No origin server round trip</li>
          </ul>
        </div>

        <div class="card">
          <h2>🧪 Test It</h2>
          <p>Test from different locations:</p>
          <ol>
            <li>Use <code>webpagetest.org</code></li>
            <li>Test from multiple regions</li>
            <li>Verify low latency everywhere</li>
          </ol>
        </div>
      </body>
      </html>
    `;

    response = new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'cache-control': 'public, max-age=3600',
        'x-cache': 'MISS',
        'x-edge-location': colo
      }
    });

    // Store in cache (don't await)
    ctx.waitUntil(cache.put(request, response.clone()));

    return response;
  }
};

