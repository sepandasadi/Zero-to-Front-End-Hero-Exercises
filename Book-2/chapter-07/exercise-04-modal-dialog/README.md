# Exercise 4: Modal Dialog ⭐⭐⭐

## 🎯 Objective

Build a professional modal component with multiple close methods.

## 📋 Requirements

- A button to open the modal
- Modal with a header, body content, and footer
- Close modal by clicking the X button
- Close modal by clicking outside the modal (on the overlay)
- Close modal by pressing the Escape key
- Prevent background scrolling when modal is open (bonus)

## 🎁 Bonus Challenges

- Add smooth open/close animations
- Make the modal accessible with ARIA attributes
- Add a confirmation action that triggers when clicking "Confirm"
- Trap focus inside the modal (Tab key cycles only through modal elements)

## 💡 Hints

- Use `event.target === overlay` to detect clicks outside
- Listen for `keydown` and check if `e.key === 'Escape'`
- Add/remove a CSS class to show/hide the modal
- Use `document.body.style.overflow = 'hidden'` to prevent scrolling
- Use `display: flex` to center the modal

## 🚀 Getting Started

1. Open `index.html` in your browser
2. Read the instructions on the page
3. Write your code in the designated areas
4. Test all the different ways to close the modal

## ✅ Success Criteria

- Modal opens when button is clicked
- Closes with X button
- Closes when clicking outside
- Closes with Escape key
- Background doesn't scroll when modal is open (bonus)
- Smooth animations (bonus)

## 📚 Concepts Practiced

- Multiple event types
- Event target detection
- Keyboard events
- Preventing default behaviors
- Accessibility
- CSS animations

## ⏱️ Estimated Time

30-45 minutes

---

**Good luck!** Remember, the solution is at the bottom of `script.js` if you get stuck.

