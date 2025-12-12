# Challenge: Interactive FAQ Accordion ⭐⭐⭐⭐

## 🎯 Objective

Build a complete FAQ accordion with animations, keyboard navigation, and search functionality.

## 📋 Requirements

### Core Features:
- 5+ FAQ items with questions and answers
- Click a question to expand/collapse the answer
- Only one answer visible at a time (accordion behavior)
- Smooth expand/collapse animations
- Arrow indicator that rotates when expanded

### Advanced Features:
- "Expand All" and "Collapse All" buttons
- Keyboard navigation:
  - Arrow keys to move between questions
  - Enter to toggle the focused question
  - Tab to cycle through questions
- Search box to filter FAQs
- Highlight search terms in results
- URL hash support (e.g., `#faq-3` opens question 3)

## 🎁 Bonus Challenges

- Add categories/sections to organize FAQs
- Add a "Most Popular" indicator to frequently accessed items
- Animate the height transition smoothly
- Make it fully accessible with ARIA attributes
- Add smooth scroll to question when opened from URL hash
- Store expanded/collapsed state in localStorage

## 💡 Hints

- Use event delegation for all FAQ item clicks
- Use CSS transitions for smooth animations
- Track which item is currently open in a variable
- Use `filter()` to search through FAQ data
- Use `scrollIntoView()` for smooth scrolling
- Use `window.location.hash` for URL support

## 🚀 Getting Started

1. Open `index.html` in your browser
2. Read the instructions on the page
3. Start with the basic accordion functionality
4. Gradually add advanced features
5. Test thoroughly with keyboard and mouse

## ✅ Success Criteria

### Core (Must Have):
- All FAQ items can be expanded/collapsed
- Only one item open at a time
- Smooth animations
- Visual indicators for open/closed state

### Advanced (Should Have):
- Expand All / Collapse All works
- Keyboard navigation functional
- Search filters FAQs correctly
- URL hash opens correct question

### Bonus (Nice to Have):
- Categories organize content well
- Accessibility features complete
- localStorage persists state
- Smooth scrolling to opened items

## 📚 Concepts Practiced

- Event delegation
- DOM manipulation
- CSS animations
- Keyboard events
- Array methods (filter, map)
- State management
- URL manipulation
- localStorage
- Accessibility (ARIA)

## ⏱️ Estimated Time

1-2 hours

---

## 💭 Planning Tips

1. **Start simple** - Get basic open/close working first
2. **Data-driven** - Store FAQ content in an array of objects
3. **Test incrementally** - Add one feature at a time
4. **Use event delegation** - One listener for all items
5. **Think accessibility** - Add ARIA from the start

**This is a professional-level project!** Take your time and build it step by step. The solution shows one approach, but there are many ways to solve this.

Good luck! 🚀

