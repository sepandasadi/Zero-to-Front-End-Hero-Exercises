// chapter9_exercise_solutions.js
// Part III – Section 4: Performance & Best Practices
// Chapter 9 — Page Speed and Optimization
// Exercise Solutions: performance-optimized landing page (responsive images, lazy chunks, caching, critical CSS).

const files = [
  // 1) index.html with responsive images, critical CSS inline, and deferred scripts
  {
    filename: "perf/index.html",
    language: "html",
    contents: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Perf Landing</title>

    <!-- Critical CSS -->
    <style>
      :root{--surface:#fff;--text:#111827;--primary:#2563eb}
      html{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif}
      body{margin:0;background:var(--surface);color:var(--text)}
      .container{max-width:960px;margin:0 auto;padding:1rem}
      .hero{display:grid;gap:1rem;align-items:center;padding:2rem 0}
      .btn{display:inline-flex;align-items:center;gap:.5rem;padding:.5rem 1rem;border-radius:.75rem;font-weight:600}
      .btn-primary{background:var(--primary);color:#fff}
      .grid{display:grid;gap:1rem}
      @media(min-width:768px){.grid{grid-template-columns:repeat(3,1fr)}}
    </style>

    <!-- Preload non-critical CSS, then apply -->
    <link rel="preload" href="/perf/theme-hash123.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="/perf/theme-hash123.css"></noscript>

    <!-- Preconnect to CDN -->
    <link rel="preconnect" href="https://cdn.example.com" crossorigin>

    <!-- Preload hero image -->
    <link rel="preload" as="image" imagesrcset="/perf/img/hero-800.avif 800w, /perf/img/hero-1200.avif 1200w" imagesizes="(max-width: 700px) 800px, 1200px">
  </head>
  <body>
    <main class="container">
      <section class="hero">
        <h1>Fast by default</h1>
        <p>Optimized images, lazy loaded JS, and cache-friendly assets.</p>

        <!-- Responsive image with modern formats and fallback -->
        <picture>
          <source type="image/avif" srcset="/perf/img/hero-800.avif 800w, /perf/img/hero-1200.avif 1200w" sizes="(max-width: 700px) 800px, 1200px">
          <source type="image/webp" srcset="/perf/img/hero-800.webp 800w, /perf/img/hero-1200.webp 1200w" sizes="(max-width: 700px) 800px, 1200px">
          <img src="/perf/img/hero-800.jpg" srcset="/perf/img/hero-800.jpg 800w, /perf/img/hero-1200.jpg 1200w" sizes="(max-width:700px) 800px, 1200px" alt="Hero image" width="1200" height="675" loading="eager" fetchpriority="high">
        </picture>

        <button class="btn btn-primary" id="loadFeature">Load Feature</button>
      </section>

      <section class="grid" id="features">
        <!-- Cards -->
        <article class="card"><h3>Images</h3><p>AVIF/WebP + responsive sizes.</p></article>
        <article class="card"><h3>Code Split</h3><p>Lazy routes & components.</p></article>
        <article class="card"><h3>Cache</h3><p>Immutable hashed assets.</p></article>
      </section>
    </main>

    <!-- Module script; defer by default -->
    <script type="module" src="/perf/main-hash456.js"></script>
  </body>
</html>`
  },

  // 2) Non-critical theme CSS
  {
    filename: "perf/theme-hash123.css",
    language: "css",
    contents: `.card{background:#fff;border:1px solid #e5e7eb;border-radius:.75rem;padding:1rem;box-shadow:0 4px 12px rgba(0,0,0,.06)}
.card h3{margin:.25rem 0 .5rem 0;font-weight:700}`
  },

  // 3) Entry JS with lazy-loaded feature chunk
  {
    filename: "perf/main-hash456.js",
    language: "js",
    contents: `const btn = document.getElementById("loadFeature");
btn?.addEventListener("click", async () => {
  const { mountFeature } = await import("./feature-chunk-hash789.js");
  mountFeature();
});`
  },

  // 4) Lazy chunk for the feature section
  {
    filename: "perf/feature-chunk-hash789.js",
    language: "js",
    contents: `export function mountFeature(){
  const el = document.createElement("section");
  el.className = "container";
  el.innerHTML = \`<h2>Loaded on demand</h2><p>This chunk was fetched only when needed.</p>\`;
  document.body.appendChild(el);
}`
  },

  // 5) Example cache headers (for reference) - express.js style
  {
    filename: "perf/server-cache-example.js",
    language: "js",
    contents: `import express from "express";
const app = express();
// Serve hashed assets with long-lived immutable cache
app.use("/perf", express.static("perf", {
  setHeaders: (res, path) => {
    if (path.match(/-hash\\w+\\.(js|css|png|jpg|webp|avif)$/)) {
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
