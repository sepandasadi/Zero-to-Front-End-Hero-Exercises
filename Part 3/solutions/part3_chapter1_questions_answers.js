// chapter1_questions_answers.js

const chapter1QA = [
  {
    question: "1. Why did frameworks become necessary as web applications evolved?",
    answer: `
As web apps grew more complex, vanilla JavaScript became harder to scale and manage.
Frameworks solve issues like:

- Reusable UI components
- Performance optimization (virtual DOM, change detection)
- State management
- Cross-browser inconsistencies
- Organized architecture
- Faster development with tooling and ecosystems
`
  },
  {
    question: "2. Compare React, Angular, and Vue in terms of architecture and syntax.",
    answer: `
React:
- Library focused on UI
- JSX syntax (HTML in JS)
- Uses hooks for state and effects
- Virtual DOM

Angular:
- Full framework using TypeScript
- Uses decorators, modules, DI, and templates
- Class-based components
- Strong structure and tooling

Vue:
- Progressive framework
- HTML-based templates with reactivity
- Simple data() and methods structure
- Easy onboarding and lightweight
`
  },
  {
    question: "3. What are the key differences between React components and Angular components?",
    answer: `
React Components:
- Functional (or older class) components
- JSX for rendering
- Hooks for state and lifecycle
- No decorators or modules required

Angular Components:
- Class-based with TypeScript
- Uses @Component decorator
- HTML templates and metadata
- Requires modules and DI structure
`
  },
  {
    question: "4. How does Vue handle reactivity and templating?",
    answer: `
Vue uses:
- HTML templates with expressions like {{ message }}
- Reactive data via a data() function
- Methods for interaction
- Directives (v-if, v-for, v-model)
- Automatically updates the DOM when data changes
`
  }
];

// You can log them or export them depending on usage
chapter1QA.forEach((item) => {
  console.log(item.question);
  console.log(item.answer);
  console.log('---');
});

export default chapter1QA;
