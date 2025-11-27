# Validation Checklists

Use these checklists to ensure your code meets professional standards. Check off each item as you complete it.

---

## HTML Validation Checklist

Use this checklist for every HTML file you create:

### Document Structure
- [ ] Includes `<!DOCTYPE html>` declaration
- [ ] Has `<html>` element with `lang` attribute (e.g., `lang="en"`)
- [ ] Contains `<head>` section with required meta tags
- [ ] Includes `<meta charset="utf-8" />`
- [ ] Has viewport meta tag for responsive design
- [ ] Contains descriptive `<title>` element
- [ ] Has `<body>` element containing all visible content

### Semantic HTML
- [ ] Uses semantic elements appropriately (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`)
- [ ] Only one `<h1>` per page
- [ ] Heading hierarchy is logical (h1 → h2 → h3, no skipping levels)
- [ ] Uses `<nav>` for navigation menus
- [ ] Uses `<main>` for primary content (only one per page)
- [ ] Uses `<article>` for self-contained content
- [ ] Uses `<section>` to group related content

### Accessibility
- [ ] All images have descriptive `alt` attributes
- [ ] Form inputs have associated `<label>` elements
- [ ] Labels use `for` attribute matching input `id`
- [ ] Links have descriptive text (not "click here")
- [ ] ARIA labels used where appropriate
- [ ] Skip link provided for keyboard navigation
- [ ] Tables use `<caption>`, `<thead>`, `<tbody>`, and `scope` attributes
- [ ] Color is not the only means of conveying information

### Forms
- [ ] Each input has a unique `id`
- [ ] Each input has a `name` attribute for form submission
- [ ] Appropriate input `type` used (email, tel, date, etc.)
- [ ] `autocomplete` attributes added for common fields
- [ ] `required` attribute on mandatory fields
- [ ] Submit button included with clear text

### Links and Navigation
- [ ] All links have valid `href` attributes
- [ ] External links use descriptive text
- [ ] Navigation is keyboard accessible
- [ ] Active page indicated in navigation

### Images and Media
- [ ] All images have `alt` text
- [ ] Decorative images have empty `alt` (`alt=""`)
- [ ] Images include `width` and `height` to prevent layout shift
- [ ] Large images use `loading="lazy"` for performance
- [ ] File paths are correct and images load

### Best Practices
- [ ] HTML validates with no errors ([W3C Validator](https://validator.w3.org/))
- [ ] Indentation is consistent (2 or 4 spaces)
- [ ] No inline styles (use external CSS)
- [ ] No deprecated elements (e.g., `<font>`, `<center>`)
- [ ] Special characters use HTML entities (`&amp;`, `&lt;`, `&copy;`)
- [ ] Code is readable and well-organized
- [ ] Comments explain complex sections

### Testing
- [ ] Page displays correctly in browser
- [ ] All links work (no 404 errors)
- [ ] Images load properly
- [ ] No console errors in browser DevTools
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Works with screen reader (test with browser extension)

---

## CSS Validation Checklist

Use this checklist for every CSS file you create:

### Organization
- [ ] CSS is in external stylesheet (not inline)
- [ ] Code is organized into logical sections
- [ ] Sections have clear comments
- [ ] Properties are grouped logically (positioning, box model, typography, visual, misc)
- [ ] Consistent indentation (2 or 4 spaces)

### Selectors
- [ ] Uses classes for styling (not IDs)
- [ ] Class names are descriptive and semantic
- [ ] Selectors are specific enough but not overly complex
- [ ] Avoids deep nesting (max 3 levels)
- [ ] No overly generic selectors (`div`, `span` without context)

### CSS Variables (Custom Properties)
- [ ] Defines colors as variables in `:root`
- [ ] Defines spacing values as variables
- [ ] Uses variables consistently throughout
- [ ] Variable names are descriptive (`--color-primary`, not `--blue`)

### Typography
- [ ] Sets base font size (typically 16px)
- [ ] Uses relative units (rem, em) for scalability
- [ ] Line-height set for readability (1.5-1.6 for body text)
- [ ] Heading hierarchy with appropriate sizes
- [ ] Font stack includes fallbacks
- [ ] Text has sufficient color contrast (4.5:1 minimum)

### Layout
- [ ] Uses modern layout methods (Flexbox or Grid)
- [ ] Avoids floats and absolute positioning for layout
- [ ] Box-sizing set to border-box
- [ ] Uses `max-width` instead of fixed `width` for containers
- [ ] Spacing is consistent (uses scale: 4px, 8px, 16px, etc.)

### Responsive Design
- [ ] Mobile-first approach used
- [ ] Media queries at appropriate breakpoints
- [ ] Layouts adapt to different screen sizes
- [ ] Text is readable on all devices
- [ ] Touch targets are at least 44x44px on mobile
- [ ] No horizontal scrolling on any screen size

### Colors and Contrast
- [ ] Color contrast meets WCAG AA standards (4.5:1 for text)
- [ ] Colors defined as variables for consistency
- [ ] Hover states clearly visible
- [ ] Focus states clearly visible
- [ ] Sufficient contrast between background and text

### Interactive Elements
- [ ] Links have hover states
- [ ] Links have focus-visible states
- [ ] Buttons have hover states
- [ ] Buttons have active states
- [ ] Form inputs have focus states
- [ ] Transitions are smooth (200-300ms)
- [ ] No flickering or jarring animations

### Accessibility
- [ ] Focus indicators are visible (outline or custom style)
- [ ] Uses `:focus-visible` instead of `:focus` when possible
- [ ] Respects `prefers-reduced-motion`
- [ ] Skip link styled to appear on focus
- [ ] Hidden content properly hidden (not just `visibility: hidden`)

### Performance
- [ ] Animates only `transform` and `opacity` when possible
- [ ] Avoids animating `width`, `height`, `top`, `left`
- [ ] No unnecessary repaints or reflows
- [ ] CSS file is reasonably sized
- [ ] No unused styles

### Cross-Browser
- [ ] Works in modern browsers (Chrome, Firefox, Safari, Edge)
- [ ] Includes vendor prefixes where needed
- [ ] Degrades gracefully in older browsers
- [ ] No browser-specific hacks

### Best Practices
- [ ] CSS validates with no errors ([W3C CSS Validator](https://jigsaw.w3.org/css-validator/))
- [ ] No `!important` unless absolutely necessary
- [ ] Comments explain complex or non-obvious code
- [ ] Consistent naming convention (BEM, camelCase, etc.)
- [ ] No magic numbers (uses variables instead)
- [ ] Alphabetical or logical property order

### Testing
- [ ] Displays correctly in browser
- [ ] Responsive on mobile, tablet, and desktop
- [ ] No layout issues at different screen sizes
- [ ] No horizontal scrolling
- [ ] Hover and focus states work
- [ ] Animations are smooth (60fps)
- [ ] No console warnings or errors

---

## JavaScript Validation Checklist

Use this checklist for every JavaScript file you create:

### Code Quality
- [ ] Code is well-organized and readable
- [ ] Consistent indentation (2 or 4 spaces)
- [ ] Meaningful variable and function names
- [ ] Functions are small and focused (single responsibility)
- [ ] No global variables (unless necessary)
- [ ] Uses `const` and `let` (not `var`)
- [ ] Uses strict equality (`===`) instead of loose (`==`)

### DOM Manipulation
- [ ] Checks if elements exist before manipulating them
- [ ] Uses `querySelector` or `getElementById` appropriately
- [ ] Caches DOM queries in variables (don't query repeatedly)
- [ ] Avoids layout thrashing (batch DOM reads/writes)
- [ ] Event listeners are properly attached
- [ ] Event listeners are removed when no longer needed

### Event Handling
- [ ] Event listeners use appropriate events
- [ ] Uses event delegation for dynamic elements
- [ ] Prevents default behavior when needed
- [ ] Stops propagation only when necessary
- [ ] Keyboard events handled for accessibility

### Functions
- [ ] Functions have clear, descriptive names
- [ ] Functions do one thing well
- [ ] Parameters are clearly named
- [ ] Returns values when appropriate
- [ ] No side effects unless intended
- [ ] Functions are reusable

### Error Handling
- [ ] Uses try-catch for operations that might fail
- [ ] Errors are logged or displayed to user
- [ ] Validates user input before processing
- [ ] Handles edge cases (empty strings, null, undefined)
- [ ] Provides fallbacks for unsupported features

### Async Code
- [ ] Uses async/await instead of callback hell
- [ ] Handles promise rejections
- [ ] Shows loading states during async operations
- [ ] Handles network errors gracefully
- [ ] Implements appropriate timeouts

### Data Management
- [ ] Uses appropriate data structures (arrays, objects, Maps, Sets)
- [ ] Validates data before use
- [ ] Immutable data patterns used where appropriate
- [ ] No data mutations unless intended
- [ ] localStorage/sessionStorage used correctly

### Performance
- [ ] Debounces or throttles frequent operations (scroll, resize, input)
- [ ] Avoids memory leaks (clears intervals, removes listeners)
- [ ] Minimizes repaints and reflows
- [ ] Uses efficient algorithms (avoid nested loops when possible)
- [ ] Lazy loads resources when appropriate

### Accessibility
- [ ] Dynamic content is announced to screen readers
- [ ] Focus is managed properly (modals, dynamic content)
- [ ] Keyboard navigation works (Tab, Enter, Esc, Arrow keys)
- [ ] ARIA attributes updated when state changes
- [ ] Skip to content functionality works

### Best Practices
- [ ] No errors in browser console
- [ ] No warnings in browser console
- [ ] Uses modern JavaScript (ES6+)
- [ ] Code is commented where necessary
- [ ] Magic numbers/strings are defined as constants
- [ ] Code follows DRY principle (Don't Repeat Yourself)
- [ ] Separation of concerns (logic, presentation, data)

### Security
- [ ] User input is sanitized
- [ ] No XSS vulnerabilities (sanitize innerHTML)
- [ ] No eval() or Function() constructor
- [ ] API keys not exposed in client code
- [ ] Proper CORS handling

### Testing
- [ ] Code runs without errors
- [ ] All features work as expected
- [ ] Edge cases handled properly
- [ ] Works across different browsers
- [ ] Performance is acceptable
- [ ] No memory leaks
- [ ] Works with JavaScript disabled (graceful degradation)

---

## Project Completion Checklist

Use this checklist when finishing a complete project:

### Functionality
- [ ] All requirements met
- [ ] All features working as intended
- [ ] No critical bugs
- [ ] Edge cases handled
- [ ] User feedback is clear (success/error messages)

### Code Quality
- [ ] HTML validates
- [ ] CSS validates
- [ ] No JavaScript errors
- [ ] Code is well-organized
- [ ] Code is commented appropriately
- [ ] No dead code or unused files

### Design
- [ ] Visually appealing
- [ ] Consistent styling throughout
- [ ] Proper use of whitespace
- [ ] Good color contrast
- [ ] Readable typography
- [ ] Responsive on all devices

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Sufficient color contrast
- [ ] Focus indicators visible
- [ ] Semantic HTML used
- [ ] ARIA attributes where needed

### Performance
- [ ] Pages load quickly
- [ ] Images optimized
- [ ] No unnecessary requests
- [ ] Smooth animations
- [ ] No performance warnings in DevTools

### Browser Testing
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge
- [ ] Works on mobile devices
- [ ] Degrades gracefully in older browsers

### Documentation
- [ ] README.md file included
- [ ] Installation instructions clear
- [ ] Usage instructions provided
- [ ] Dependencies documented
- [ ] License included (if applicable)

### Files and Organization
- [ ] Folder structure is logical
- [ ] File names are descriptive
- [ ] No unused files
- [ ] Assets organized properly
- [ ] Git repository clean (no unnecessary files)

### Final Polish
- [ ] Spell check completed
- [ ] Links tested and working
- [ ] Forms tested with validation
- [ ] Content is proofread
- [ ] Meta tags complete (title, description)
- [ ] Favicon included
- [ ] 404 page created (if multi-page site)

---

## Quick Reference: Common Validation Tools

### Online Validators
- [W3C HTML Validator](https://validator.w3.org/) - Validate HTML markup
- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) - Validate CSS
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluation

### Browser DevTools
- **Console**: Check for JavaScript errors
- **Network**: Monitor loading times and requests
- **Lighthouse**: Audit performance, accessibility, SEO
- **Responsive Design Mode**: Test different screen sizes

### Browser Extensions
- **axe DevTools**: Accessibility testing
- **WAVE**: Accessibility evaluation
- **Validity**: Real-time HTML validation
- **Web Developer**: Multiple web development tools

### Command Line Tools
- `npx prettier --write .` - Format code
- `npx eslint .` - Lint JavaScript
- `npx stylelint "**/*.css"` - Lint CSS

---

## Tips for Using These Checklists

1. **Print or Copy**: Keep a copy handy while working
2. **Check Often**: Don't wait until the end - validate as you go
3. **Prioritize**: Focus on critical items first (functionality, accessibility)
4. **Learn from Mistakes**: When you find issues, understand why
5. **Build Habits**: Eventually these will become automatic
6. **Update**: Add items specific to your project needs
7. **Share**: Use these with team members for consistency

Remember: These checklists are guidelines to help you build better websites. Not every item applies to every project, but most do!
