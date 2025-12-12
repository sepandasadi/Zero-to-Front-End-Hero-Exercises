# Chapter 18 Quiz: Design Systems & Component Architecture

**Time Limit:** 30 minutes
**Passing Score:** 80% (12/15 correct)
**Format:** Multiple choice

---

## Questions

### 1. What are design tokens?

A) React components that can be styled
B) Named variables for design decisions (colors, spacing, typography)
C) Authentication tokens for design tools
D) CSS class names

<details>
<summary>Answer</summary>

**B) Named variables for design decisions (colors, spacing, typography)**

Design tokens are the single source of truth for design decisions. Instead of hardcoding values like `#3b82f6` or `16px` everywhere, you define them once as tokens (`--color-primary`, `--space-4`) and reference them throughout your application.
</details>

---

### 2. What is the variant pattern in component design?

A) Using different file extensions for components
B) Providing predefined style variations (e.g., primary, secondary, outline)
C) Creating multiple versions of the same component
D) A testing pattern

<details>
<summary>Answer</summary>

**B) Providing predefined style variations (e.g., primary, secondary, outline)**

The variant pattern allows users to choose from predefined style options:
```jsx
<Button variant="primary">Primary</Button>
<Button variant="outline">Outline</Button>
```
</details>

---

### 3. What is Storybook used for?

A) Writing user stories for agile development
B) Developing and documenting UI components in isolation
C) Creating animated storyboards
D) Backend API documentation

<details>
<summary>Answer</summary>

**B) Developing and documenting UI components in isolation**

Storybook provides a visual component gallery where you can develop, test, and document components independently from your main application.
</details>

---

### 4. In semantic versioning (SemVer), what does a MAJOR version change indicate?

A) Minor bug fixes
B) New features (backwards compatible)
C) Breaking changes (incompatible API changes)
D) Documentation updates

<details>
<summary>Answer</summary>

**C) Breaking changes (incompatible API changes)**

SemVer format: `MAJOR.MINOR.PATCH`
- MAJOR: Breaking changes
- MINOR: New features (backwards compatible)
- PATCH: Bug fixes (backwards compatible)
</details>

---

### 5. What is a compound component pattern?

A) Components that use multiple files
B) Components with subcomponents that work together (e.g., Card.Header, Card.Body)
C) Components that are very complex
D) Components that combine multiple libraries

<details>
<summary>Answer</summary>

**B) Components with subcomponents that work together (e.g., Card.Header, Card.Body)**

```jsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```
</details>

---

### 6. Which approach is best for implementing runtime theme switching?

A) Separate CSS files for each theme
B) Inline styles
C) CSS variables (custom properties)
D) Hardcoded color values

<details>
<summary>Answer</summary>

**C) CSS variables (custom properties)**

CSS variables can be changed at runtime:
```css
:root { --color-bg: white; }
[data-theme='dark'] { --color-bg: black; }
```
</details>

---

### 7. What should be included in the `files` field of package.json when publishing?

A) Source code (src/)
B) Node modules
C) Built/compiled code (dist/)
D) Test files

<details>
<summary>Answer</summary>

**C) Built/compiled code (dist/)**

Only publish the built distribution files, not source code:
```json
{
  "files": ["dist"],
  "main": "dist/index.js"
}
```
</details>

---

### 8. What is the "as" prop pattern used for?

A) Aliasing imports
B) Making components polymorphic (render as different elements)
C) Asynchronous components
D) TypeScript type assertions

<details>
<summary>Answer</summary>

**B) Making components polymorphic (render as different elements)**

```jsx
<Button as="a" href="/link">Link styled as button</Button>
<Button as={Link} to="/route">React Router Link</Button>
```
</details>

---

### 9. Which design system is known for being "headless" (unstyled)?

A) Material-UI
B) Bootstrap
C) Radix UI
D) Ant Design

<details>
<summary>Answer</summary>

**C) Radix UI**

Radix UI provides accessible components without any styles, allowing you to style them however you want while keeping the accessibility and behavior.
</details>

---

### 10. What is the recommended spacing scale approach?

A) Random pixel values
B) Consistent mathematical scale (4px, 8px, 12px, 16px, etc.)
C) Always use percentages
D) Use em units exclusively

<details>
<summary>Answer</summary>

**B) Consistent mathematical scale (4px, 8px, 12px, 16px, etc.)**

Use a consistent scale (often based on 4px or 8px):
```js
spacing: {
  1: '0.25rem', // 4px
  2: '0.5rem',  // 8px
  3: '0.75rem', // 12px
  4: '1rem',    // 16px
}
```
</details>

---

### 11. What is the purpose of peerDependencies in a component library?

A) Dependencies that are nice to have
B) Dependencies that the consuming application must provide
C) Development dependencies
D) Optional dependencies

<details>
<summary>Answer</summary>

**B) Dependencies that the consuming application must provide**

For a React component library:
```json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

This prevents duplicate React installations.
</details>

---

### 12. Which Storybook addon helps with accessibility testing?

A) @storybook/addon-controls
B) @storybook/addon-a11y
C) @storybook/addon-docs
D) @storybook/addon-viewport

<details>
<summary>Answer</summary>

**B) @storybook/addon-a11y**

The a11y addon runs automated accessibility tests on your components and displays violations in Storybook.
</details>

---

### 13. What is the "forwardRef" pattern used for in React components?

A) Forwarding props to child components
B) Allowing parent components to access child DOM nodes via refs
C) Component navigation
D) State forwarding

<details>
<summary>Answer</summary>

**B) Allowing parent components to access child DOM nodes via refs**

```jsx
const Button = forwardRef((props, ref) => {
  return <button ref={ref} {...props} />;
});

// Parent can now ref the button element
const buttonRef = useRef();
<Button ref={buttonRef}>Click</Button>
```
</details>

---

### 14. What is the purpose of a design system documentation site?

A) Store source code
B) Provide guidelines, examples, and best practices for using the system
C) Host the production application
D) Manage user authentication

<details>
<summary>Answer</summary>

**B) Provide guidelines, examples, and best practices for using the system**

Documentation sites (like Storybook deployments) show:
- Component examples
- Props/API documentation
- Usage guidelines
- Accessibility notes
- Code snippets
</details>

---

### 15. What should you do before making a breaking change to a component?

A) Just make the change immediately
B) Deprecate the old API, warn users, provide migration guide
C) Delete the old component
D) Create a completely new package

<details>
<summary>Answer</summary>

**B) Deprecate the old API, warn users, provide migration guide**

Best practice:
1. Add deprecation warning in current version
2. Update documentation with migration guide
3. Bump MAJOR version when removing deprecated API
4. Give users time to migrate

```jsx
if (oldProp) {
  console.warn('oldProp is deprecated. Use newProp instead.');
}
```
</details>

---

## Scoring

- **15/15 (100%)**: Design System Expert! 🎨
- **13-14 (87-93%)**: Excellent understanding
- **12 (80%)**: Passing - Good foundation
- **10-11 (67-73%)**: Review key concepts
- **< 10 (< 67%)**: Re-read chapter and practice exercises

---

## What's Next?

- **Scored 80%+**: Move on to Part IV: Backend Basics!
- **Scored < 80%**: Review chapter sections and retry quiz

---

**Keep building scalable design systems!** 🎨🚀

