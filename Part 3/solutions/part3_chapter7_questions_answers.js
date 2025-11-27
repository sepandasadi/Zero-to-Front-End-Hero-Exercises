// chapter7_questions_answers.js
// Part III – Section 3: Styling at Scale
// Chapter 7 — CSS Methodologies & Scalable Architecture (BEM, OOCSS, SMACSS, ITCSS)
// Questions AND Answers

const chapter7QA = [
  {
    question: "1) What’s the core idea of BEM and how do you name classes?",
    answer: `BEM = Block, Element, Modifier. A Block is a standalone component (.card), an Element is a part of the block (.card__title), and a Modifier is a variant (.card--featured or .card__title--small). Keep names semantic and avoid location-dependent selectors.`
  },
  {
    question: "2) What are the two main principles of OOCSS?",
    answer: `Separate structure from skin, and separate container from content. Structure classes define layout/box model; skin classes define look (color, background). This encourages reuse and reduces duplication.`
  },
  {
    question: "3) What are the SMACSS categories and why do they help?",
    answer: `Base, Layout, Module, State, and Theme. Categorizing styles clarifies intent and helps you know where code belongs. Modules are reusable components; State classes (like .is-active) represent UI conditions; Themes adjust look without changing structure.`
  },
  {
    question: "4) How does ITCSS order CSS, and what problem does it solve?",
    answer: `ITCSS uses an inverted triangle: Settings → Tools → Generic → Elements → Objects → Components → Utilities. Low-specificity layers come first; higher-specificity layers last. This ordering minimizes collisions and makes overrides predictable.`
  },
  {
    question: "5) When is it helpful to mix Tailwind with a methodology like BEM?",
    answer: `Use Tailwind for layout, spacing, and quick composition; use BEM for naming semantic components that need custom CSS or long-lived variants. Keep tokens aligned so Tailwind utilities and component CSS share the same scales.`
  },
  {
    question: "6) How do you avoid specificity wars regardless of methodology?",
    answer: `Prefer single-class selectors, keep nesting shallow, avoid IDs, and rely on state/modifier classes (e.g., .is-open, .card--featured). Choose an architecture (SMACSS/ITCSS) to control where overrides live, and lint to prevent deep selectors.`
  }
];

// Utility: print to console if run directly
if (typeof require !== 'undefined' && require.main === module) {
  chapter7QA.forEach((qa) => {
    console.log(qa.question);
    console.log(qa.answer);
    console.log('---');
  });
}

export default chapter7QA;
