# Exercise 04: Interactive Click Counter

## 🎯 Objective

Build your first interactive JavaScript application! Create a click counter that responds to user interactions, updates the page dynamically, and combines everything you've learned about variables, conditionals, and DOM manipulation.

## 📚 What You'll Learn

- Selecting HTML elements with JavaScript
- Adding event listeners to buttons
- Updating page content dynamically
- Using variables to track state
- Making decisions based on user actions
- Building interactive user interfaces

## 🎨 What You're Building

A click counter application with:
- A display showing the current count
- An "Increment" button to add 1
- A "Decrement" button to subtract 1
- A "Reset" button to go back to 0
- Visual feedback when count changes
- Bonus features to enhance the experience

## 📋 Tasks

### Task 1: Basic Counter Setup

Create the foundation:

1. Select the HTML elements you need:
   - The count display element
   - The increment button
   - The decrement button
   - The reset button

2. Create a variable to store the current count (start at 0)

3. Create a function to update the display

**Hints:**
```js
const countDisplay = document.getElementById('count-display');
let count = 0;

function updateDisplay() {
  countDisplay.textContent = count;
}
```

### Task 2: Increment Button

Make the increment button work:

1. Add a click event listener to the increment button
2. When clicked:
   - Increase count by 1
   - Update the display
   - Log to console for debugging

**Expected behavior:**
- Click button → count goes up by 1
- Display updates immediately
- Console logs the new value

### Task 3: Decrement Button

Make the decrement button work:

1. Add a click event listener to the decrement button
2. When clicked:
   - Decrease count by 1
   - Update the display
   - Optional: Prevent negative numbers

**Expected behavior:**
- Click button → count goes down by 1
- Display updates immediately
- Optional: Can't go below 0

### Task 4: Reset Button

Make the reset button work:

1. Add a click event listener to the reset button
2. When clicked:
   - Set count back to 0
   - Update the display
   - Log "Counter reset" to console

**Expected behavior:**
- Click button → count returns to 0
- Display shows 0
- Works no matter what the current count is

### Task 5: Visual Feedback

Add color changes based on count:

1. When count is positive → display text is green
2. When count is zero → display text is gray
3. When count is negative → display text is red

**Hints:**
```js
if (count > 0) {
  countDisplay.style.color = 'green';
} else if (count < 0) {
  countDisplay.style.color = 'red';
} else {
  countDisplay.style.color = 'gray';
}
```

### Task 6: Add Custom Increment

Add a way to increment by custom amounts:

1. Add an input field for custom increment value
2. Add a "Custom Add" button
3. When clicked, add the custom amount to count

**Expected behavior:**
- User enters "5" → clicks button → count increases by 5
- User enters "-3" → clicks button → count decreases by 3

### Task 7: Display Statistics

Show additional information:

1. Track total number of button clicks
2. Show highest count reached
3. Show lowest count reached
4. Display this info on the page

**Expected behavior:**
- Total clicks counter increases with any button
- Highest updates when count exceeds previous high
- Lowest updates when count goes below previous low

## ✅ Success Criteria

Your application should:

1. ✅ Display the current count
2. ✅ Increment, decrement, and reset correctly
3. ✅ Update the display immediately
4. ✅ Have no console errors
5. ✅ Provide visual feedback (color changes)
6. ✅ Handle edge cases (negative numbers, large numbers)
7. ✅ Be user-friendly and intuitive

## 💡 Hints

### Hint 1: Event Listeners

Add event listeners to buttons:
```js
button.addEventListener('click', function() {
  // Code here runs when button is clicked
  console.log('Button clicked!');
});
```

### Hint 2: Updating Text Content

Change what's displayed on the page:
```js
element.textContent = "New text";
element.textContent = count;  // Shows the number
```

### Hint 3: Changing Styles

Modify CSS with JavaScript:
```js
element.style.color = 'red';
element.style.fontSize = '24px';
element.classList.add('active');
element.classList.remove('inactive');
```

### Hint 4: Getting Input Values

Get user input from text fields:
```js
const input = document.getElementById('myInput');
const value = input.value;  // String
const number = parseInt(input.value);  // Convert to number
```

### Hint 5: Preventing Negative Numbers

```js
function decrement() {
  if (count > 0) {
    count--;
  }
  updateDisplay();
}
```

## 🧪 Testing Your Counter

Test these scenarios:

1. **Basic Functionality:**
   - [ ] Click increment 5 times → should show 5
   - [ ] Click decrement 2 times → should show 3
   - [ ] Click reset → should show 0

2. **Edge Cases:**
   - [ ] Decrement from 0 → should stay 0 or go negative (your choice)
   - [ ] Increment 100 times → should work fine
   - [ ] Reset from any number → should always go to 0

3. **Visual Feedback:**
   - [ ] Positive numbers are green
   - [ ] Zero is gray
   - [ ] Negative numbers are red

4. **Console:**
   - [ ] No errors in console
   - [ ] Logs show correct values

## 🎨 Styling Tips

Make it look professional:

```css
.counter-display {
  font-size: 48px;
  font-weight: bold;
  margin: 20px 0;
  transition: color 0.3s ease;  /* Smooth color changes */
}

button {
  padding: 10px 20px;
  margin: 5px;
  font-size: 16px;
  cursor: pointer;
  border: 2px solid #333;
  background: white;
  transition: all 0.2s;
}

button:hover {
  background: #333;
  color: white;
}

button:active {
  transform: scale(0.95);  /* Press effect */
}
```

## ⏱️ Estimated Time

**45-60 minutes**

- 10 minutes: Tasks 1-2 (Setup and increment)
- 10 minutes: Tasks 3-4 (Decrement and reset)
- 10 minutes: Task 5 (Visual feedback)
- 10 minutes: Task 6 (Custom increment)
- 10 minutes: Task 7 (Statistics)
- 10 minutes: Testing and refinement

## 🎯 Bonus Challenges

### Bonus 1: Double Click Feature

Make double-clicking increment/decrement by 2:
- Use `dblclick` event
- Add visual feedback for double clicks

### Bonus 2: Keyboard Controls

Add keyboard support:
- Arrow Up → increment
- Arrow Down → decrement
- R key → reset
- Use `keydown` event listener on document

```js
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowUp') {
    // Increment
  }
});
```

### Bonus 3: Local Storage

Save the count so it persists after refresh:
```js
// Save
localStorage.setItem('count', count);

// Load
const savedCount = localStorage.getItem('count');
if (savedCount !== null) {
  count = parseInt(savedCount);
}
```

### Bonus 4: Animation

Add animations when count changes:
- Fade in/out
- Scale up/down
- Shake effect
- Use CSS transitions or animations

### Bonus 5: Milestones

Show messages at milestones:
- Count reaches 10: "Double digits!"
- Count reaches 50: "Halfway to 100!"
- Count reaches 100: "Century!"
- Use conditionals to check milestones

### Bonus 6: Multiple Counters

Create multiple independent counters on the same page:
- Use classes instead of IDs
- Create a counter factory function
- Each counter works independently

## 📖 Resources

- [MDN: addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [MDN: Document.getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
- [MDN: Element.textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
- [MDN: HTMLElement.style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style)
- Chapter 23: DOM Manipulation section

---

## 🎓 Learning Notes

### Understanding the DOM

The DOM (Document Object Model) is how JavaScript sees your HTML:
- Every HTML element is an object
- JavaScript can read and modify these objects
- Changes happen in real-time

### Event-Driven Programming

Your counter is **event-driven**:
1. User does something (clicks button)
2. Event fires
3. Your code runs
4. Page updates

This is how modern web apps work!

### State Management

Your `count` variable is the **state** of your application:
- It stores the current status
- It changes over time
- The UI reflects the state
- This is the foundation of React, Vue, and other frameworks!

### Debugging Interactive Applications

**Open the console while testing:**
```js
function increment() {
  console.log('Before:', count);
  count++;
  console.log('After:', count);
  updateDisplay();
}
```

**Check if elements exist:**
```js
const button = document.getElementById('btn');
console.log(button);  // Should not be null/undefined
```

**Test event listeners:**
```js
button.addEventListener('click', function() {
  console.log('Click detected!');
});
```

---

## 🚀 Next Steps

After completing this exercise:

1. **Experiment:** Add your own features!
2. **Style it:** Make it look amazing
3. **Share it:** Show friends and family
4. **Build more:** Apply these concepts to new projects

**You're now building interactive web applications!** This is real web development. Everything you learn here applies to professional JavaScript development. 🎉

---

**Ready to start?** Open the starter files and build your counter! Remember: test frequently and use console.log() liberally! 💻

