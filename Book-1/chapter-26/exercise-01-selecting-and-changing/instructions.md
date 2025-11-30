# Exercise 01: Selecting and Changing Elements

## 🎯 Objective

Master the fundamentals of DOM manipulation: finding elements, reading content, changing content, modifying styles, and toggling classes.

## 📚 What You'll Learn

- Using querySelector and querySelectorAll
- Reading and changing text content
- Modifying element attributes
- Adding, removing, and toggling classes
- Changing inline styles
- Working with user input

## 📋 Tasks

### Setup

1. Open `index.html` in your browser
2. Open the browser console (F12 or Cmd+Option+I)
3. Edit `script.js` to complete the tasks
4. Refresh the page to see changes

### Task 1: Selecting Elements

The HTML has several elements. Your job is to select them!

**In `script.js`, select these elements:**

1. The main heading (`<h1>`)
2. The paragraph with class `description`
3. The button with id `magic-button`
4. ALL elements with class `color-box`
5. The input field with id `name-input`

**Log each selection to the console** to verify you found them.

**Hints:**
```js
// Select by tag
const heading = document.querySelector("h1");

// Select by class
const description = document.querySelector(".description");

// Select by ID
const button = document.querySelector("#magic-button");

// Select ALL matching elements
const boxes = document.querySelectorAll(".color-box");
```

---

### Task 2: Reading Content

Now that you've selected elements, read their content!

**Read and log:**
1. The text content of the heading
2. The text content of the description
3. The value of the input field (hint: use `.value`)
4. The number of color boxes (hint: `.length` on NodeList)

Expected console output:
```
Heading: DOM Manipulation Practice
Description: Learn to select and modify elements!
Input value: (whatever is in the input)
Number of boxes: 3
```

---

### Task 3: Changing Content

Let's make the page dynamic!

**Change these elements:**

1. **Change the heading text** to "I Can Control the DOM!"
2. **Change the description text** to "This is amazing! I'm changing content with JavaScript!"
3. **Change the button text** to "Click Me!"

**After your changes, refresh the page** - you should see new text!

---

### Task 4: Working with Classes

Classes control styling. Let's toggle them!

**Tasks:**

1. **Add the class `highlight`** to the heading
   - It should turn yellow (CSS is already written)

2. **Remove the class `hidden`** from the element with id `secret-message`
   - A hidden message should appear!

3. **Toggle the class `active`** on the magic button when clicked
   - Add an event listener to the button
   - On click, toggle the `active` class
   - The button should change color

**Hint:**
```js
// Add class
element.classList.add("highlight");

// Remove class
element.classList.remove("hidden");

// Toggle class (add if missing, remove if present)
element.classList.toggle("active");

// Event listener
button.addEventListener("click", () => {
  // Your code here
});
```

---

### Task 5: Changing Styles Directly

Sometimes you need to change styles directly (though classes are usually better!).

**Change these inline styles:**

1. Change the **heading color** to "rebeccapurple"
2. Change the **description font size** to "20px"
3. Change the **first color box background color** to "coral"

**Remember:** CSS properties in JavaScript use camelCase:
- `background-color` → `backgroundColor`
- `font-size` → `fontSize`
- `border-radius` → `borderRadius`

**Hint:**
```js
element.style.color = "rebeccapurple";
element.style.fontSize = "20px";
```

---

### Task 6: Interactive Greeting

Build your first interactive feature!

**The goal:** When user types their name and clicks the button, show a personalized greeting.

**Steps:**

1. Select the name input and button
2. Select the element with id `greeting-output`
3. Add a click event listener to the button
4. Inside the event listener:
   - Get the value from the input
   - Set the greeting-output text to "Hello, [name]!"
   - If input is empty, show "Hello, Guest!"

**Hint:**
```js
button.addEventListener("click", () => {
  const name = input.value.trim();

  if (name) {
    output.textContent = `Hello, ${name}!`;
  } else {
    output.textContent = "Hello, Guest!";
  }
});
```

**Test it:** Type your name, click the button, see the greeting!

---

### Task 7: Color Box Interaction

Let's make all three color boxes interactive!

**The goal:** When you click a color box, it should toggle the `selected` class.

**Steps:**

1. Select all color boxes (querySelectorAll)
2. Loop through them with forEach
3. Add a click listener to each
4. Toggle the `selected` class on click

**Hint:**
```js
boxes.forEach(box => {
  box.addEventListener("click", () => {
    box.classList.toggle("selected");
  });
});
```

**Test it:** Click boxes to see them grow and change color!

---

### Task 8: Counter

Build a simple counter!

**The goal:**
- Clicking "Increase" button increases counter
- Clicking "Decrease" button decreases counter
- Update the display

**Steps:**

1. Select both buttons and the counter display
2. Create a variable to track the count (start at 0)
3. Add click listeners to both buttons
4. Update the counter variable
5. Update the display text

**Hint:**
```js
let count = 0;
const display = document.querySelector("#counter-display");

increaseBtn.addEventListener("click", () => {
  count++;
  display.textContent = count;
});
```

---

## ✅ Success Criteria

Your solution should:

1. ✅ Select all required elements correctly
2. ✅ Change content dynamically
3. ✅ Toggle classes on interaction
4. ✅ Handle user input
5. ✅ Update the page in response to clicks
6. ✅ Show all changes in the browser

## 💡 Testing

Open `index.html` in your browser and:

1. Check that heading and description changed
2. The secret message should be visible
3. Click the magic button - it should change color
4. Type your name and click - greeting should appear
5. Click color boxes - they should grow
6. Counter should increase/decrease

**Everything should be interactive!**

## ⏱️ Estimated Time

**30-40 minutes**

- 10 minutes: Tasks 1-3 (Selection and changing content)
- 10 minutes: Tasks 4-5 (Classes and styles)
- 10 minutes: Tasks 6-7 (Interactive features)
- 10 minutes: Task 8 (Counter)

## 🎯 Bonus Challenges

### Bonus 1: Theme Toggle

Add a theme toggle button that switches between light and dark mode:
- Add a class `dark` to the body
- Create CSS for `.dark` theme
- Toggle on button click

### Bonus 2: Input Validation

Enhance the greeting:
- Show error message if name has numbers
- Show character count as user types
- Disable button if input is empty

### Bonus 3: Reset Button

Add a reset button that:
- Clears the input
- Resets the greeting
- Resets the counter to 0
- Removes all `selected` classes

### Bonus 4: Keyboard Support

Make the greeting work when pressing Enter key:
```js
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    // Trigger greeting
  }
});
```

## 📖 Resources

- [MDN: querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- [MDN: classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
- [MDN: addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- Chapter 26: Part 1-3

---

**Ready to make your first interactive page?** Open `index.html` in your browser and start coding in `script.js`!

**Remember:** Changes won't appear until you refresh the page! 🔄

**This is where it gets fun!** 🚀

