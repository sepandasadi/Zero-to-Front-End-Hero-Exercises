# JavaScript Practice Problems

This folder contains practice problems to build your JavaScript skills from fundamentals to DOM manipulation and beyond.

## How to Approach These Problems

1. Read the problem description carefully
2. Plan your solution before coding
3. Write your code in a `.js` file
4. Test thoroughly with different inputs
5. Use console.log() to debug
6. Check the validation checklist
7. Compare with the solution when done

## Problems

### Beginner Level (Fundamentals)

#### 1. Temperature Converter
**Goal**: Create functions to convert between Fahrenheit and Celsius

**Requirements**:
- Function to convert F to C
- Function to convert C to F
- Both should return rounded values
- Handle edge cases (very hot/cold temperatures)

**Skills Practiced**: Functions, math operations, return values

---

#### 2. Array Manipulation
**Goal**: Practice common array operations

**Requirements**:
- Find the largest number in an array
- Calculate the average of an array
- Remove duplicates from an array
- Reverse an array without using .reverse()
- Check if an array contains a specific value

**Skills Practiced**: Arrays, loops, conditionals, logic

---

#### 3. String Utilities
**Goal**: Create utility functions for string manipulation

**Requirements**:
- Count vowels in a string
- Capitalize the first letter of each word
- Check if a string is a palindrome
- Reverse a string
- Remove all spaces from a string

**Skills Practiced**: Strings, loops, conditionals, methods

---

#### 4. Simple Calculator
**Goal**: Build a calculator object with methods

**Requirements**:
- Methods for add, subtract, multiply, divide
- Keep track of the current value
- Method to clear/reset
- Handle division by zero
- Chain operations

**Skills Practiced**: Objects, methods, this keyword, error handling

---

### Intermediate Level (DOM & Events)

#### 5. Interactive Counter
**Goal**: Create a counter with increment/decrement buttons

**Requirements**:
- Display current count
- Increment button (+1)
- Decrement button (-1)
- Reset button
- Count cannot go below 0
- Update display in real-time

**Skills Practiced**: DOM manipulation, event listeners, state management

---

#### 6. Todo List
**Goal**: Build a functional todo list application

**Requirements**:
- Add new todos
- Mark todos as complete (toggle)
- Delete todos
- Display remaining todos count
- Clear all completed todos
- Persist data in localStorage

**Skills Practiced**: DOM manipulation, events, arrays, localStorage

---

#### 7. Form Validation
**Goal**: Validate a registration form with JavaScript

**Requirements**:
- Validate email format
- Password must be at least 8 characters
- Password confirmation must match
- Display error messages below fields
- Disable submit until form is valid
- Show success message on valid submission

**Skills Practiced**: Forms, validation, regular expressions, DOM manipulation

---

#### 8. Image Carousel/Slider
**Goal**: Create a functioning image carousel

**Requirements**:
- Display one image at a time
- Next and previous buttons
- Auto-advance every 3 seconds
- Pause auto-advance on hover
- Indicator dots showing current image
- Clicking dots jumps to that image

**Skills Practiced**: DOM manipulation, timers, events, arrays

---

### Advanced Level

#### 9. Async Data Fetcher
**Goal**: Fetch and display data from a public API

**Requirements**:
- Fetch data from a public API (e.g., JSONPlaceholder)
- Display loading state while fetching
- Handle errors gracefully
- Display data in cards or table
- Add search/filter functionality
- Implement pagination

**Skills Practiced**: Fetch API, async/await, promises, error handling

---

#### 10. Modal Component
**Goal**: Create a reusable modal component

**Requirements**:
- Open modal with button click
- Close modal with X button, overlay click, or Esc key
- Prevent body scroll when modal is open
- Trap focus inside modal (accessibility)
- Smooth open/close animations
- Pass custom content to modal

**Skills Practiced**: DOM manipulation, events, accessibility, closures

---

#### 11. Drag and Drop Task Board
**Goal**: Build a Kanban-style drag-and-drop board

**Requirements**:
- Multiple columns (To Do, In Progress, Done)
- Drag tasks between columns
- Add new tasks to any column
- Delete tasks
- Persist state in localStorage
- Visual feedback during drag

**Skills Practiced**: Drag and Drop API, DOM manipulation, state management, localStorage

---

#### 12. Debounce Search
**Goal**: Implement a search with debounced API calls

**Requirements**:
- Search input field
- Debounce function (wait for user to stop typing)
- Fetch search results from API
- Display results dynamically
- Show "no results" message when appropriate
- Loading indicator while searching

**Skills Practiced**: Debouncing, async, DOM manipulation, optimization

---

## Validation Checklist

Use this checklist for each exercise:

- [ ] Code runs without errors
- [ ] All requirements met
- [ ] Edge cases handled
- [ ] Code is readable and well-organized
- [ ] Variables have descriptive names
- [ ] Functions are small and focused
- [ ] Comments explain complex logic
- [ ] Tested with different inputs

## Tips for Success

1. **Console First**: Use console.log() to understand what's happening
2. **Break It Down**: Solve one small piece at a time
3. **Read Errors**: Error messages tell you what's wrong
4. **Use DevTools**: Browser DevTools are your friend
5. **Google It**: Looking up solutions is part of learning
6. **Refactor**: Make it work, then make it better
7. **Name Things Well**: Clear names make code self-documenting

## Common Debugging Steps

1. Check the console for errors
2. Use console.log() to inspect values
3. Use debugger statement or breakpoints
4. Verify your selectors are targeting the right elements
5. Check that event listeners are attached
6. Ensure functions are being called

## Useful Resources

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [JavaScript.info](https://javascript.info/)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Free fake API

## Need Help?

- Check the solutions folder for reference implementations
- Review the corresponding chapter in the book
- Use console.log() and debugger to understand the flow
- Search MDN for method documentation
- Ask questions in the community discussions
