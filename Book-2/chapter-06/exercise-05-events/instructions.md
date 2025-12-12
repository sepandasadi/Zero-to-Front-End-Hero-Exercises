# Exercise 5: Event Handling

**Difficulty**: ⭐⭐ Intermediate
**Concepts**: `addEventListener()`, event types, event objects, user interaction

---

## 🎯 Goal

Learn to handle different types of user interactions using event listeners. Make elements respond to clicks, keyboard input, and mouse movements!

---

## 📝 Instructions

Create three interactive components that demonstrate different event types.

---

## ✅ Tasks

### Task 1: Self-Updating Button

Create a button that changes its own text when clicked.

**Requirements:**
- Initial text: "Click Me!"
- After first click: "Clicked!"
- After second click: "Click Me Again!"
- After third click: "Clicked!"
- Continue alternating...

**Hint:** Use a boolean variable to track state, or check the current text content.

---

### Task 2: Character Counter

Create a text input that displays the number of characters as the user types.

**Requirements:**
- Show "Character count: 0" initially
- Update in real-time as user types
- Display format: "Character count: X"

**Events to use:** `input` event (fires every time the input changes)

---

### Task 3: Color-Changing Div

Create a div that changes color when the mouse enters and exits.

**Requirements:**
- Default background: gray
- On mouse enter (`mouseover`): Change to lightblue
- On mouse leave (`mouseout`): Change back to gray
- Also display "Hover Me!" text inside the div

---

## 🎓 Bonus Challenges

### Bonus 1: Click Counter

Add a display that shows how many times the button has been clicked total.

---

### Bonus 2: Keyboard Event

Add an input field that changes text color to red when the user presses the "Enter" key.

**Hint:** Use `keydown` or `keypress` event and check `event.key === "Enter"`

---

### Bonus 3: Double Click

Add an element that only responds to double-clicks (`dblclick` event).

---

### Bonus 4: Prevent Default

Create a form with a submit button that prevents the default form submission and instead displays a custom message.

**Hint:** Use `event.preventDefault()`

---

## 💡 Event Listener Template

```javascript
element.addEventListener("eventType", (event) => {
  // Your code here
  // Access event.target, event.key, event.type, etc.
});
```

---

## ✔️ Completion Checklist

- [ ] Button changes text when clicked
- [ ] Character counter updates in real-time
- [ ] Div changes color on hover
- [ ] All events work correctly
- [ ] Code is organized and readable
- [ ] Attempted at least one bonus challenge

---

## 🎯 Expected Behavior

### Task 1:
```
[Click Me!] → (click) → [Clicked!] → (click) → [Click Me Again!]
```

### Task 2:
```
Input: [_____]
Character count: 0

(User types "Hello")

Input: [Hello_]
Character count: 5
```

### Task 3:
```
(Hover mouse over)
[Hover Me!] → Background turns lightblue

(Move mouse away)
[Hover Me!] → Background turns gray
```

---

**Build your solution, then check against the provided solution!**

