// chapter10_exercise_solutions.js
// Part III – Section 4: Performance & Best Practices
// Chapter 10 — Lazy Loading & Caching (Deep Dive)
// Exercise Solutions: Lazy-hydrated island + HTTP caching + SW runtime cache.

const files = [
  // 1) Index with above-the-fold content and deferred assets
  {
    filename: "lazy-cache/index.html",
    language: "html",
    contents: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Lazy + Cache</title>

    <style>
      :root{--primary:#2563eb;--surface:#fff;--text:#111827}
      html{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif}
      body{margin:0;background:var(--surface);color:var(--text)}
      .shell{max-width:960px;margin:0 auto;padding:1rem}
      .hero{padding:2rem 0}
      .btn{display:inline-flex;align-items:center;gap:.5rem;padding:.5rem 1rem;border-radius:.75rem;font-weight:600}
      .btn-primary{background:var(--primary);color:#fff}
    </style>

    <link rel="preload" href="/lazy-cache/theme-caa1.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="/lazy-cache/theme-caa1.css"></noscript>

    <link rel="preload" as="image" href="/lazy-cache/img/hero-1200.avif">
  </head>
  <body>
    <main class="shell">
      <section class="hero">
        <h1>Instant shell, deeper features on demand</h1>
        <p>Hydrate islands when visible and cache static assets aggressively.</p>
        <button id="reveal" class="btn btn-primary">Show Analytics</button>
      </section>

      <section id="analyticsIsland" style="min-height:220px">
        <!-- server-rendered placeholder; client hydration deferred -->
        <noscript>Enable JavaScript for analytics.</noscript>
      </section>
    </main>

    <script type="module" src="/lazy-cache/entry-9af2.js"></script>
  </body>
</html>`
  },

  // 2) Non-critical theme CSS
  {
    filename: "lazy-cache/theme-caa1.css",
    language: "css",
    contents: `.card{background:#fff;border:1px solid #e5e7eb;border-radius:.75rem;padding:1rem;box-shadow:0 4px 12px rgba(0,0,0,.06)}
.grid{display:grid;gap:1rem}
@media(min-width:768px){.grid{grid-template-columns:repeat(3,1fr)}}`
  },

  // 3) Entry JS: hydrate when visible or on intent
  {
    filename: "lazy-cache/entry-9af2.js",
    language: "js",
    contents: `const target = document.getElementById("analyticsIsland");
const revealBtn = document.getElementById("reveal");

const loadAnalytics = async () => {
  const { mountAnalytics } = await import("./analytics-chunk-22bb.js");
  mountAnalytics(target);
};

// Hydrate island when it becomes visible
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) {
    loadAnalytics();
    io.unobserve(e.target);
  }
});
io.observe(target);

// Or hydrate immediately on user intent
revealBtn?.addEventListener("click", loadAnalytics);

// Register a basic service worker for runtime caching
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/lazy-cache/sw.js");
}`
  },

  // 4) Lazy chunk: analytics island
  {
    filename: "lazy-cache/analytics-chunk-22bb.js",
    language: "js",
    contents: `export function mountAnalytics(host){
  host.innerHTML = \`
    <div class="card">
      <h2>Traffic (last 24h)</h2>
      <p>Loaded on demand and hydrated only when visible.</p>
    </div>\`;
}`
  },

  // 5) Service Worker with cautious runtime caching
  {
    filename: "lazy-cache/sw.js",
    language: "js",
    contents: `self.addEventListener("install", (e) => {
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  clients.claim();
});
self.addEventListener("fetch", (event) => {
  const req = event.request;
  // Only cache GET and successful same-origin responses
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open("runtime-v1");
    const cached = await cache.match(req);
    if (cached) return cached;
    const res = await fetch(req);
    const ct = res.headers.get("content-type") || "";
    if (res.ok && (ct.includes("text/") || ct.includes("image/") || ct.includes("application/javascript") || ct.includes("text/css"))) {
      cache.put(req, res.clone());
    }
    return res;
  })());
});`
  },

  // 6) Example server cache headers (Express-like)
  {
    filename: "lazy-cache/server-cache.js",
    language: "js",
    contents: `import express from "express";
const app = express();
app.use("/lazy-cache", express.static("lazy-cache", {
  setHeaders(res, path) {
    if (/\\.(?:avif|webp|png|jpg|jpeg|svg|js|css)$/.test(path) && /-[a-f0-9]{4,}\\.(?:js|css|avif|webp|png|jpg|jpeg|svg)$/.test(path)) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    } else {
      res.setHeader("Cache-Control", "public, max-age=300");
    }
  }
}));
app.listen(3000);`
  }
];

// Utility to print files if run directly
if (typeof require !== 'undefined' && require.main === module) {
  files.forEach(f => {
    console.log("---- " + f.filename + " ----");
    console.log(f.contents);
    console.log();
  });
}

export default files;
