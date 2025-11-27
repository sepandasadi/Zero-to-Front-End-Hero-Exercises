// chapter8_questions_answers.js
// Part III – Section 3: Styling at Scale
// Chapter 8 — Creating a Design System
// Questions AND Answers

const chapter8QA = [
  {
    question: "1) Why are semantic tokens better than raw tokens for theming?",
    answer: `Semantic tokens (e.g., color-primary, surface, text-muted) describe intent, not hex values. Components bind to intent, so rebranding or dark mode is just swapping token values (CSS variables, theme provider) instead of refactoring component styles.`
  },
  {
    question: "2) What belongs in foundations, and how should components depend on them?",
    answer: `Foundations define cross-cutting rules: type scale, spacing, grid, breakpoints, elevation, radius, motion. Components consume these via tokens (CSS vars, Tailwind theme, Sass maps) and never hard-code values.`
  },
  {
    question: "3) Two approaches to dark mode and their trade-offs?",
    answer: `CSS variables: toggle a data-theme/class on <html> and swap variable values at runtime—no rebuild. Library providers (MUI/Chakra/AntD): switch the theme object; great integration but may require JS state. Many teams combine both (provider drives variables).`
  },
  {
    question: "4) How do you keep accessibility baked in across the system?",
    answer: `Tokenize focus ring color/offset, require visible focus, ensure WCAG contrast for text and states, respect prefers-reduced-motion, document ARIA patterns (dialogs, menus), and test keyboard-only and with screen readers.`
  },
  {
    question: "5) What governance helps a design system scale?",
    answer: `Version tokens/components (SemVer), deprecate with migration notes, add codemods for API changes, run visual regression tests, and use a lightweight review process for new components/variants.`
  },
  {
    question: "6) How do you align Tailwind, Sass, and a component library?",
    answer: `Drive all three from the same semantic tokens. Expose tokens as CSS variables, mirror them into Tailwind's theme, and use them inside Sass maps. Library theme providers (MUI/Chakra/AntD) should point to the same values.`
  }
];

// Utility: print to console if run directly
if (typeof require !== 'undefined' && require.main === module) {
  chapter8QA.forEach((qa) => {
    console.log(qa.question);
    console.log(qa.answer);
    console.log('---');
  });
}

export default chapter8QA;
