# Exercise 5: Keyboard Shortcuts ⭐⭐

## 🎯 Objective

Add professional keyboard shortcuts to a page.

## 📋 Requirements

- **Ctrl/Cmd + K**: Open search box
- **Escape**: Close search box
- **Ctrl/Cmd + S**: Save (prevent browser save dialog)
- Display available shortcuts in a help section

## 🎁 Bonus Challenges

- Add **?** key to show keyboard shortcuts help modal
- Add visual feedback when a shortcut is used
- Make shortcuts work even when inputs are focused (where appropriate)
- Add a shortcuts indicator in the UI (e.g., "Press ? for help")

## 💡 Hints

- Use `keydown` event on `document`
- Check `e.ctrlKey` or `e.metaKey` for Ctrl/Cmd
- Check `e.key` for the specific key pressed
- Use `e.preventDefault()` to prevent browser defaults
- Use `document.activeElement` to check what's focused

## 🚀 Getting Started

1. Open `index.html` in your browser
2. Read the instructions on the page
3. Write your code in the designated areas
4. Test each keyboard shortcut

## ✅ Success Criteria

- Ctrl/Cmd + K opens search
- Escape closes search
- Ctrl/Cmd + S prevents browser save and triggers custom save
- All shortcuts work reliably
- Visual feedback provided (bonus)

## 📚 Concepts Practiced

- Keyboard events
- Event.key property
- Modifier keys (Ctrl, Cmd, Shift)
- Preventing default behaviors
- Focus management

## ⏱️ Estimated Time

20-30 minutes

---

**Good luck!** Remember, the solution is at the bottom of `script.js` if you get stuck.

