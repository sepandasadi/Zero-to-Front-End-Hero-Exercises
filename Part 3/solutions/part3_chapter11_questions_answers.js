// chapter11_questions_answers.js
// Part III – Section 4: Performance & Best Practices
// Chapter 11 — Code Organization & Clean Code
// Questions AND Answers

const chapter11QA = [
  {
    question: "1) How do you choose good module boundaries in a front-end app?",
    answer: `Organize by features/domains (e.g., auth, billing, dashboard) rather than technical layers (components, utils). Each feature owns UI, hooks, services, and tests. Keep boundaries explicit with index files that export a minimal public API and avoid deep cross-imports.`
  },
  {
    question: "2) What is Feature-Sliced Design (FSD) and why use it?",
    answer: `FSD groups code into layers (app, processes, pages, features, entities, shared) and slices by domain. It scales as teams add features without entangling internals. Public APIs (index.ts) expose just what other slices can use.`
  },
  {
    question: "3) What are best practices for custom React hooks?",
    answer: `Keep hooks pure and composable; return stable shapes; prefix with use*; hide implementation details; handle effects cautiously; never conditionally call hooks; surface typed inputs/outputs; and colocate with the feature using them.`
  },
  {
    question: "4) TypeScript: when to use 'unknown' vs 'any'?",
    answer: `'unknown' is safe—forces narrowing before use. 'any' disables type checking and leaks into consumers. Prefer unknown for untrusted data (API/JSON) and narrow via type guards or zod/valibot.`
  },
  {
    question: "5) What keeps repos clean and consistent over time?",
    answer: `Automated formatting (Prettier), linting (ESLint + plugins), type checks (tsc --noEmit), unit/integration tests, commit hooks (lint-staged), and CI gates (build, test, type, lint). Add enforceable conventions in docs and templates.`
  },
  {
    question: "6) What are common code smells in React apps?",
    answer: `Global state used for local concerns; giant components with mixed concerns; deep prop drilling; implicit effects; async logic in components instead of services; ambiguous names; duplicated utilities; and missing error boundaries.`
  }
];

// Utility: print to console if run directly
if (typeof require !== 'undefined' && require.main === module) {
  chapter11QA.forEach((qa) => {
    console.log(qa.question);
    console.log(qa.answer);
    console.log('---');
  });
}

export default chapter11QA;
