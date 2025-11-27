// chapter4_questions_answers.js
// Part III – Section 3: Styling at Scale
// Chapter 4 — Sass and Preprocessors
// Questions AND Answers

const chapter4QA = [
  {
    question: "1) When should I choose Sass over plain CSS or utility-first CSS?",
    answer: `Choose Sass when you need strong authoring ergonomics (mixins, functions, modules), a modular folder architecture, or when you're building a design-system layer with tokens and generated utilities. Plain CSS is fine for small projects; utility-first CSS is great for speed and consistency but you can still pair it with Sass for tokens/helpers.`
  },
  {
    question: "2) What is the difference between Sass variables and CSS custom properties?",
    answer: `Sass variables are resolved at build time; CSS custom properties (variables) are resolved at runtime. Use Sass variables/maps for structure and compile-time logic; use CSS variables for live theming (dark mode, brand overrides) and values you want to change without recompiling.`
  },
  {
    question: "3) Why prefer @use/@forward over @import?",
    answer: `The modern module system (@use/@forward) avoids duplication, supports true modules with namespaces, and prevents the global scope pollution common with @import. Create 'index' files that @forward tokens/mixins, then @use them with a namespace where needed.`
  },
  {
    question: "4) When should I use mixins vs @extend with placeholders?",
    answer: `Use mixins for predictable CSS output and parameterized reuse. @extend with placeholders merges selector sets and can create unexpected cascade/specificity; it's okay for tightly controlled bases but avoid it in large, dynamic codebases.`
  },
  {
    question: "5) How do I prevent deep nesting and specificity problems in Sass?",
    answer: `Limit nesting to 1–2 levels, prefer BEM-style classes over descendant chains, and avoid IDs in selectors. Keep specificity low and consistent to make overrides predictable.`
  },
  {
    question: "6) How can I generate utility classes (spacing, elevation) with Sass?",
    answer: `Store tokens in maps (e.g., $spacing), then use @each/@for loops to output consistent utilities (.p-sm, .m-md, .elevation-2). This keeps your scale centralized and prevents one-off values.`
  },
  {
    question: "7) How do I combine Sass with CSS variables for theming?",
    answer: `Author structure and components in Sass, but read colors/semantic values from CSS variables (e.g., var(--primary)). Toggle themes by switching a class on <html> or :root (e.g., .dark), which sets different variable values without recompiling.`
  }
];

// Utility: print to console if run directly
if (typeof require !== 'undefined' && require.main === module) {
  chapter4QA.forEach((qa) => {
    console.log(qa.question);
    console.log(qa.answer);
    console.log('---');
  });
}

export default chapter4QA;
