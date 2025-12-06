// Cloudflare Worker - Edge Function Example
// Deploy with: wrangler publish

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // TODO: Implement edge caching
    // const cache = caches.default;
    // let response = await cache.match(request);
    // if (response) {
    //   return response;
    // }

    // Basic response
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Edge Function Demo</title>
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
          }
          code {
            background: rgba(0, 0, 0, 0.3);
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <h1>⚡ Edge Function Demo</h1>

        <div class="card">
          <h2>Request Information</h2>
          <p><strong>URL:</strong> ${url.pathname}</p>
          <p><strong>Method:</strong> ${request.method}</p>
          <p><strong>User Agent:</strong> ${request.headers.get('user-agent')}</p>
        </div>

        <!-- TODO: Add geolocation information -->
        <!-- <div class="card">
          <h2>Your Location</h2>
          <p><strong>Country:</strong> ${request.cf?.country}</p>
          <p><strong>City:</strong> ${request.cf?.city}</p>
          <p><strong>Edge Location:</strong> ${request.cf?.colo}</p>
        </div> -->

        <div class="card">
          <h2>Next Steps</h2>
          <ol>
            <li>Uncomment the geolocation code above</li>
            <li>Implement edge caching</li>
            <li>Deploy with <code>wrangler publish</code></li>
          </ol>
        </div>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        // TODO: Add cache headers
      }
    });
  }
};

