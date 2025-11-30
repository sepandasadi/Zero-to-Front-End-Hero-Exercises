# Chapter 9: Accessibility (A11y) Exercises

Welcome to the Accessibility exercises! These hands-on activities will help you master the art of building websites that work for everyone—regardless of their abilities or the technologies they use.

## 🎯 Learning Objectives

By completing these exercises, you will:
- Understand how screen readers interpret HTML
- Fix common accessibility issues in real code
- Implement proper keyboard navigation
- Use ARIA attributes correctly (and sparingly!)
- Test with actual assistive technologies
- Build fully accessible UI components

## 📚 Exercise Overview

### Quick Review Questions
Test your understanding of key concepts from the chapter.
- **File**: Answers in this README below
- **Time**: 5 minutes

### Knowledge Check Quiz
15 multiple-choice questions covering all chapter topics.
- **File**: `quiz.md`
- **Time**: 15 minutes

### Exercise 1: Fix Inaccessible Images ⭐
Fix a page with broken image accessibility.
- **Folder**: `exercise-01-images/`
- **Time**: 15 minutes
- **Skills**: Alt text, decorative images, context

### Exercise 2: Make Forms Accessible ⭐⭐
Transform an inaccessible form with proper labels and ARIA.
- **Folder**: `exercise-02-forms/`
- **Time**: 20 minutes
- **Skills**: Labels, fieldsets, error messages, validation

### Exercise 3: Keyboard Navigation Fix ⭐⭐
Fix broken keyboard navigation and focus management.
- **Folder**: `exercise-03-keyboard/`
- **Time**: 25 minutes
- **Skills**: Keyboard accessibility, focus styles, tab order

### Exercise 4: Add ARIA Where Needed ⭐⭐⭐
Implement ARIA for custom interactive components.
- **Folder**: `exercise-04-aria/`
- **Time**: 30 minutes
- **Skills**: ARIA roles, states, live regions

### Exercise 5: Screen Reader Test ⭐⭐⭐
Use a real screen reader to test and document issues.
- **Folder**: `exercise-05-screen-reader-test/`
- **Time**: 30 minutes
- **Skills**: Screen reader usage, accessibility auditing

### Challenge: Accessible Component Library ⭐⭐⭐⭐
Build a library of fully accessible UI components.
- **Folder**: `challenge-component-library/`
- **Time**: 2-3 hours
- **Skills**: Everything from the chapter!

---

## 📝 Quick Review Answers

### 1. What does "a11y" stand for and why is it abbreviated that way?
**Answer**: "Accessibility" — the "11" represents the 11 letters between "A" and "Y" (ccessibilit). This is called a "numeronym" and is commonly used in web development communities.

### 2. Name 3 types of disabilities accessibility helps with
**Answer**: Any three of:
- **Visual**: Blindness, low vision, color blindness
- **Auditory**: Deafness, hard of hearing
- **Motor**: Limited mobility, can't use a mouse, tremors
- **Cognitive**: Dyslexia, autism, ADHD, learning disabilities
- **Situational**: Temporary disabilities like broken arm, bright sunlight, noisy environment

### 3. What's the minimum contrast ratio for normal-sized text?
**Answer**: **4.5:1** for WCAG AA compliance. For enhanced AAA compliance, it's 7:1. Large text (24px+) only needs 3:1 for AA.

### 4. Why should you avoid using `<div>` with `onclick` instead of `<button>`?
**Answer**: Because `<div>` elements:
- Are not keyboard accessible (can't tab to them)
- Don't respond to Enter/Space key presses
- Aren't announced as interactive by screen readers
- Don't have built-in focus management
- Don't work with assistive technologies

Using semantic `<button>` elements provides all these features automatically!

### 5. What's the purpose of the `alt` attribute on images?
**Answer**: The `alt` attribute provides:
- **Text alternative** for screen readers to describe the image
- **Fallback content** if the image fails to load
- **Context** for search engines (SEO benefit)
- **Meaning** in text-only browsers

For decorative images, use `alt=""` (empty) to hide them from screen readers.

---

## 🧪 Testing Tools You'll Need

### Built-in Tools (Free!)
- **Mac**: VoiceOver (Cmd+F5)
- **Windows**: NVDA ([download free](https://www.nvaccess.org/))
- **Chrome DevTools**: Lighthouse audit (Built-in)
- **Firefox**: Accessibility Inspector (Built-in)

### Browser Extensions
- [axe DevTools](https://www.deque.com/axe/devtools/) — Automated testing
- [WAVE](https://wave.webaim.org/extension/) — Visual feedback
- [Accessibility Insights](https://accessibilityinsights.io/) — Guided testing

### Online Tools
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/)

---

## 📖 Recommended Approach

1. **Read the chapter first** — Make sure you understand the concepts
2. **Do exercises in order** — They build on each other
3. **Use real assistive tech** — Actually try screen readers!
4. **Test your solutions** — Run automated audits AND manual tests
5. **Take your time** — Accessibility is best learned by doing

---

## 🆘 Getting Help

**Stuck on an exercise?**
1. Re-read the relevant chapter section
2. Check the [WebAIM](https://webaim.org/) resources
3. Review the solution files (but try first!)
4. Test with a screen reader to understand the issue
5. Ask in developer communities (mention you're learning!)

**Remember**: Making mistakes is part of learning. Every accessibility issue you fix makes the web better for millions of people! 🌟

---

## ✅ Completion Checklist

Track your progress:

- [ ] Completed Quick Review Questions
- [ ] Passed Knowledge Check Quiz
- [ ] Exercise 1: Fix Inaccessible Images
- [ ] Exercise 2: Make Forms Accessible
- [ ] Exercise 3: Keyboard Navigation Fix
- [ ] Exercise 4: Add ARIA Where Needed
- [ ] Exercise 5: Screen Reader Test
- [ ] Challenge: Accessible Component Library

**When you've completed all exercises**, you'll have hands-on experience with:
- Real accessibility testing tools
- Common issues and how to fix them
- Building accessible components from scratch
- Using screen readers like a pro

You've got this! 🚀

