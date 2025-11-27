// chapter9_questions_answers.js
// Part III – Section 4: Performance & Best Practices
// Chapter 9 — Page Speed and Optimization
// Questions AND Answers

const chapter9QA = [
  {
    question: "1) What are Core Web Vitals and why do they matter?",
    answer: `Core Web Vitals are user-centric performance metrics (currently LCP, CLS, INP). They affect UX and SEO—better scores improve discoverability and conversion. Aim for LCP <2.5s, CLS <0.1, INP <200ms.`
  },
  {
    question: "2) How do you configure responsive images in HTML?",
    answer: `Use srcset + sizes to deliver the right resolution. Example: <img src='img-800.jpg' srcset='img-480.jpg 480w, img-800.jpg 800w, img-1200.jpg 1200w' sizes='(max-width: 600px) 480px, 800px' alt='...'>. Prefer modern formats (AVIF/WebP) with <picture> for fallbacks.`
  },
  {
    question: "3) Code splitting vs. lazy loading—what’s the difference?",
    answer: `Code splitting divides your bundle into chunks; lazy loading defers loading a chunk until it’s needed (e.g., route or on-demand). You can split without laziness (preloaded) and you can lazy-load split chunks at interaction time.`
  },
  {
    question: "4) Two strategies to cache static assets effectively?",
    answer: `a) Immutable caching with hashed filenames (Cache-Control: public, max-age=31536000, immutable). b) Serve via CDN close to the user and set long-lived cache headers for JS/CSS/images.`
  },
  {
    question: "5) How do you identify and reduce large bundles?",
    answer: `Use bundle analyzers (webpack-bundle-analyzer, vite-bundle-visualizer) to find heavy deps; remove unused libs, enable tree-shaking, split vendor chunks, and replace heavy packages with lighter alternatives.`
  },
  {
    question: "6) How do you prevent render-blocking CSS and JS?",
    answer: `Inline critical CSS for above-the-fold, load the rest asynchronously (rel='preload' + onload rel=stylesheet). Defer JS with type='module' or defer attribute; avoid synchronous scripts in <head>.`
  }
];

// Utility: print to console if run directly
if (typeof require !== 'undefined' && require.main === module) {
  chapter9QA.forEach((qa) => {
    console.log(qa.question);
    console.log(qa.answer);
    console.log('---');
  });
}

export default chapter9QA;
