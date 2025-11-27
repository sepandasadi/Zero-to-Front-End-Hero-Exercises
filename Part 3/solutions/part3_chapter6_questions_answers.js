// chapter6_questions_answers.js
// Part III – Section 3: Styling at Scale
// Chapter 6 — Component Libraries (MUI, Bootstrap, Chakra, Ant Design)
// Questions AND Answers

const chapter6QA = [
  {
    question: "1) When should I pick a component library over custom CSS/Sass/Tailwind?",
    answer: `Choose a component library when you need accessible, production-ready primitives (menus, dialogs, selects, tables) quickly; when design needs to be consistent across many screens; and when team velocity or a11y guarantees matter. Build custom when your brand is highly bespoke, performance budgets are tight, or components deviate significantly from common patterns.`
  },
  {
    question: "2) How do I avoid the 'library look' while using MUI/Chakra/Bootstrap/AntD?",
    answer: `Align tokens first (colors, spacing, radius, typography), then theme the library via its theme provider (e.g., MUI's createTheme; Chakra's extendTheme; AntD's ConfigProvider tokens). Wrap common components (Button, Card) with project-level variants and sizes. Prefer theme overrides over ad-hoc style props.`
  },
  {
    question: "3) What are the main theming mechanisms across libraries?",
    answer: `MUI: ThemeProvider + createTheme, 'sx' prop, styled API, component slot/variants overrides. Chakra: extendTheme + ThemeProvider, style config, variants/sizes. Bootstrap: Sass variables and maps + utility APIs, CSS variables in v5 for runtime tweaks. AntD: ConfigProvider with 'theme' tokens, CSS variable support for dark/compact.`
  },
  {
    question: "4) How do I integrate Tailwind with a component library without fighting styles?",
    answer: `Use Tailwind primarily for layout and spacing. Keep component visuals driven by the library's theme tokens. Ensure design tokens match (Tailwind config colors/spacing mirror library theme). Avoid deep overrides that conflict with component internals; wrap components with small className additions for layout only.`
  },
  {
    question: "5) How do I ensure accessibility stays intact when customizing components?",
    answer: `Prefer official theming APIs (theme tokens, variants) instead of rewriting component internals. Preserve ARIA attributes, keyboard handlers, and focus traps. Test with keyboard-only and screen readers. Maintain visible focus states after theming and verify contrast meets WCAG guidelines.`
  },
  {
    question: "6) What performance pitfalls should I watch for?",
    answer: `Tree-shaking: import only used components (e.g., MUI's per-component imports). Avoid heavy global overrides that force large CSS bundles. Keep dynamic styling minimal inside hot render paths; memoize where needed. For tables/data grids, consider virtualization when lists are large.`
  }
];

// Utility to print to console if run directly
if (typeof require !== 'undefined' && require.main === module) {
  chapter6QA.forEach((qa) => {
    console.log(qa.question);
    console.log(qa.answer);
    console.log('---');
  });
}

export default chapter6QA;
