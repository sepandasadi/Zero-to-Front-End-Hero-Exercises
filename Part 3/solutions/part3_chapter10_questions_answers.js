// chapter10_questions_answers.js
// Part III – Section 4: Performance & Best Practices
// Chapter 10 — Lazy Loading & Caching (Deep Dive)
// Questions AND Answers

const chapter10QA = [
  {
    question: "1) What should be lazy-loaded versus shipped on the critical path?",
    answer: `Ship shell/layout, navigation, hero, first controls, critical CSS, and the hero image. Lazy-load route chunks, rarely visited pages, heavy widgets (charts/maps/editors), below-the-fold images, and non-essential third-party scripts.`
  },
  {
    question: "2) How do dynamic import() and React.lazy differ from basic bundling?",
    answer: `Basic bundling ships everything up front. dynamic import() creates separate chunks fetched on demand; React.lazy wraps this for components and shows a fallback via <Suspense>. Keep import paths static so bundlers can split.`
  },
  {
    question: "3) How do you prioritize images and fonts correctly?",
    answer: `Preload critical fonts with as="font" and font-display: swap. Preload the hero image or mark it fetchpriority="high". Use <picture> with AVIF/WebP + srcset/sizes; lazy-load non-critical images with loading="lazy".`
  },
  {
    question: "4) Which HTTP cache headers should I use for static assets vs. HTML?",
    answer: `Static assets: Cache-Control: public, max-age=31536000, immutable (with content-hash filenames). HTML: Cache-Control: no-store, must-revalidate (or very short TTL) to avoid staleness.`
  },
  {
    question: "5) What is stale-while-revalidate and when is it useful?",
    answer: `SWR serves a cached (stale) response immediately and revalidates in the background, updating the cache for the next request. Useful for APIs with semi-static data where freshness isn't critical.`
  },
  {
    question: "6) What are common pitfalls when lazy-loading and how to avoid them?",
    answer: `Blank initial screens (lazy too much), priority inversion from overusing preload, caching HTML aggressively causing stale pages, dynamic import paths that block code-splitting, and unbounded runtime caches. Keep a meaningful above-the-fold shell, preload only critical, cache HTML cautiously, keep import paths static, and enforce TTLs.`
  }
];

// Utility: print to console if run directly
if (typeof require !== 'undefined' && require.main === module) {
  chapter10QA.forEach((qa) => {
    console.log(qa.question);
    console.log(qa.answer);
    console.log('---');
  });
}

export default chapter10QA;
