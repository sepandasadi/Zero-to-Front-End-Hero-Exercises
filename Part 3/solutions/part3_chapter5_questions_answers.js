// chapter5_questions_answers.js
// Part III – Section 3: Styling at Scale
// Chapter 5 — Utility-First CSS (Tailwind)
// Questions AND Answers

const chapter5QA = [
  {
    question: "1) How do you set up tokens (colors, spacing) so Tailwind and theming work together?",
    answer: `Define CSS variables for semantic tokens (e.g., --primary, --surface, --text) on :root (and .dark). In tailwind.config.js, map theme.colors to those CSS variables. Utilities like bg-primary and text-surface then read from the variables, so switching the root class toggles the whole theme without rebuilds.`
  },
  {
    question: "2) When should you extract styles with @apply instead of composing utilities inline?",
    answer: `Compose utilities inline by default for clarity and local reasoning. Use @apply when a cluster repeats across the app (e.g., buttons, chips) or when you need a semantic primitive. Avoid turning Tailwind into a parallel BEM library—extract sparingly and only for true reuse.`
  },
  {
    question: "3) Show two ways to implement dark mode and explain trade-offs.",
    answer: `Option A: darkMode: 'class' + .dark on <html>. Pros: explicit control, per-user toggle. Option B: darkMode: 'media' respects prefers-color-scheme. Pros: automatic. Trade-off: 'class' requires toggle logic; 'media' updates based on system setting and is harder to override globally.`
  },
  {
    question: "4) What pitfalls bloat Tailwind bundles, and how do you avoid them?",
    answer: `Pitfalls: dynamic class names built at runtime (JIT can't see them), incorrect content globs, overuse of arbitrary values, excessive @apply blocks. Solutions: keep class names static, ensure content globs cover all sources, prefer token scales, extract only essential primitives, and rely on JIT for dead-code removal.`
  }
];

// Utility: print to console if run directly
if (typeof require !== 'undefined' && require.main === module) {
  chapter5QA.forEach((qa) => {
    console.log(qa.question);
    console.log(qa.answer);
    console.log('---');
  });
}

export default chapter5QA;
