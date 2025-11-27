// chapter2_questions_answers.js
// Part III – Chapter 2: State Management
// Questions AND Answers

const chapter2QA = [
  {
    question: "1) When is local component state sufficient, and when should you lift or globalize it?",
    answer: `Use local state when data is only used by a single component or a small, tightly-coupled subtree (e.g., form inputs, modals, toggles). Lift or globalize state when multiple distant components need the same data or need to coordinate updates (auth user, theme, locale, cart contents). Smells that suggest globalizing: repeated prop drilling across many levels, siblings coordinating, or many components subscribing to the same remote resource.`
  },
  {
    question: "2) What problems does React Context solve, and what are its performance trade-offs?",
    answer: `Context solves prop drilling by providing a value to any descendant without passing props manually. Trade-offs: changing the context value re-renders all consumers; large/rapidly-changing objects in a single context can cause unnecessary work. Mitigate with multiple smaller contexts, stable/memoized provider values, and selective subscriptions where possible.`
  },
  {
    question: "3) Compare Redux Toolkit with a lightweight store like Zustand or Jotai. When would you choose each?",
    answer: `Redux Toolkit (RTK) is great for complex apps that need predictable updates, middleware, time-travel debugging, and strong tooling. Zustand/Jotai shine when you want minimal boilerplate, selective subscriptions, and fast iteration. Choose RTK for multi-team or enterprise-scale coordination; choose Zustand/Jotai for feature-centric slices, dashboards, or when you want small, composable state without ceremony.`
  },
  {
    question: "4) Why should server/cache state generally be handled by a data-fetching library instead of your UI store?",
    answer: `Server state is asynchronous, remote, and becomes stale; it benefits from caching, deduplication, background refetching, and invalidation—features provided by libraries like RTK Query or TanStack Query. UI stores should hold only UI-specific state (like currently selected item or open/close flags), not attempt to re-implement server cache logic.`
  }
];

// Utility: print to console if run directly
if (typeof require !== 'undefined' && require.main === module) {
  chapter2QA.forEach((qa, i) => {
    console.log(`${qa.question}\n${qa.answer}\n---`);
  });
}

export default chapter2QA;
