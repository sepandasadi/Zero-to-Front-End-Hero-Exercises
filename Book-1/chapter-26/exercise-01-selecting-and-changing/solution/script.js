/**
 * Exercise 01: Selecting and Changing Elements - SOLUTION
 *
 * Complete DOM manipulation practice
 */

console.log("JavaScript loaded! 🚀");

// ======================
// TASK 1: SELECTING ELEMENTS
// ======================

console.log("=== TASK 1: SELECTING ELEMENTS ===");

// Select the main heading
const heading = document.querySelector("h1");

// Select the description paragraph
const description = document.querySelector(".description");

// Select the magic button
const magicButton = document.querySelector("#magic-button");

// Select ALL color boxes
const colorBoxes = document.querySelectorAll(".color-box");

// Select the name input
const nameInput = document.querySelector("#name-input");

// Log selections to verify
console.log("Heading:", heading);
console.log("Description:", description);
console.log("Magic Button:", magicButton);
console.log("Color Boxes:", colorBoxes);
console.log("Name Input:", nameInput);


// ======================
// TASK 2: READING CONTENT
// ======================

console.log("\n=== TASK 2: READING CONTENT ===");

// Read heading text
console.log("Heading text:", heading.textContent);

// Read description text
console.log("Description text:", description.textContent);

// Read input value
console.log("Input value:", nameInput.value);

// Count color boxes
console.log("Number of color boxes:", colorBoxes.length);


// ======================
// TASK 3: CHANGING CONTENT
// ======================

console.log("\n=== TASK 3: CHANGING CONTENT ===");

// Change heading text
heading.textContent = "I Can Control the DOM!";

// Change description text
description.textContent = "This is amazing! I'm changing content with JavaScript!";

// Change button text
magicButton.textContent = "Click Me!";

console.log("Content changed! 🎉");


// ======================
// TASK 4: WORKING WITH CLASSES
// ======================

console.log("\n=== TASK 4: WORKING WITH CLASSES ===");

// Add highlight class to heading
heading.classList.add("highlight");

// Remove hidden class from secret message
const secretMessage = document.querySelector("#secret-message");
secretMessage.classList.remove("hidden");

// Toggle active class on magic button when clicked
magicButton.addEventListener("click", () => {
  magicButton.classList.toggle("active");
  console.log("Magic button toggled!");
});

console.log("Classes manipulated! ✨");


// ======================
// TASK 5: CHANGING STYLES DIRECTLY
// ======================

console.log("\n=== TASK 5: CHANGING STYLES ===");

// Change heading color
heading.style.color = "rebeccapurple";

// Change description font size
description.style.fontSize = "20px";

// Change first color box background
colorBoxes[0].style.backgroundColor = "coral";

console.log("Styles changed! 🎨");


// ======================
// TASK 6: INTERACTIVE GREETING
// ======================

console.log("\n=== TASK 6: INTERACTIVE GREETING ===");

// Select elements
const greetingButton = document.querySelector("#greeting-button");
const greetingOutput = document.querySelector("#greeting-output");

// Add click listener
greetingButton.addEventListener("click", () => {
  const name = nameInput.value.trim();

  if (name) {
    greetingOutput.textContent = `Hello, ${name}!`;
  } else {
    greetingOutput.textContent = "Hello, Guest!";
  }

  console.log("Greeting updated!");
});

// Bonus: Make it work with Enter key
nameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    greetingButton.click();  // Trigger the button click
  }
});

console.log("Greeting system ready! 👋");


// ======================
// TASK 7: COLOR BOX INTERACTION
// ======================

console.log("\n=== TASK 7: COLOR BOX INTERACTION ===");

// Add click listeners to all color boxes
colorBoxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    box.classList.toggle("selected");
    console.log(`Color box ${index + 1} toggled!`);
  });
});

console.log("Color boxes are interactive! 🎨");


// ======================
// TASK 8: COUNTER
// ======================

console.log("\n=== TASK 8: COUNTER ===");

// Create counter variable
let count = 0;

// Select elements
const counterDisplay = document.querySelector("#counter-display");
const increaseBtn = document.querySelector("#increase-btn");
const decreaseBtn = document.querySelector("#decrease-btn");

// Increase button
increaseBtn.addEventListener("click", () => {
  count++;
  counterDisplay.textContent = count;
  console.log("Counter increased:", count);
});

// Decrease button
decreaseBtn.addEventListener("click", () => {
  count--;
  counterDisplay.textContent = count;
  console.log("Counter decreased:", count);
});

console.log("Counter ready! 🔢");


// ======================
// BONUS CHALLENGES
// ======================

console.log("\n=== BONUS CHALLENGES ===");

// Bonus 1: Theme Toggle
// (Uncomment to enable)
/*
const themeToggle = document.createElement("button");
themeToggle.textContent = "Toggle Dark Mode";
themeToggle.style.marginTop = "20px";
document.querySelector(".container").append(themeToggle);

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Add dark mode styles
const style = document.createElement("style");
style.textContent = `
  body.dark {
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
  }
  body.dark .container {
    background: #2d3748;
    color: #fff;
  }
  body.dark h1,
  body.dark h2 {
    color: #fff;
  }
  body.dark .description {
    color: #cbd5e0;
  }
`;
document.head.append(style);
*/

// Bonus 2: Input Validation
nameInput.addEventListener("input", () => {
  const hasNumbers = /\d/.test(nameInput.value);

  if (hasNumbers) {
    nameInput.style.borderColor = "red";
    greetingOutput.textContent = "Name should not contain numbers!";
    greetingOutput.style.color = "red";
  } else {
    nameInput.style.borderColor = "#ddd";
    greetingOutput.style.color = "#667eea";
  }
});

// Bonus 3: Reset Button
const resetBtn = document.createElement("button");
resetBtn.textContent = "Reset Everything";
resetBtn.style.marginTop = "20px";
resetBtn.style.background = "#6c757d";
document.querySelector(".container").append(resetBtn);

resetBtn.addEventListener("click", () => {
  // Reset input
  nameInput.value = "Guest";

  // Reset greeting
  greetingOutput.textContent = "Your greeting will appear here...";

  // Reset counter
  count = 0;
  counterDisplay.textContent = count;

  // Remove selected from all boxes
  colorBoxes.forEach(box => box.classList.remove("selected"));

  console.log("Everything reset! 🔄");
});


// ======================
// KEY TAKEAWAYS
// ======================

console.log("\n=== KEY TAKEAWAYS ===");

/*
 * DOM MANIPULATION BASICS:
 *
 * 1. SELECTING:
 *    querySelector()     - first match
 *    querySelectorAll()  - all matches (NodeList)
 *
 * 2. READING CONTENT:
 *    element.textContent - plain text
 *    element.innerHTML   - HTML (careful!)
 *    input.value         - input field value
 *
 * 3. CHANGING CONTENT:
 *    element.textContent = "new text"
 *    input.value = "new value"
 *
 * 4. CLASSES:
 *    element.classList.add("class")
 *    element.classList.remove("class")
 *    element.classList.toggle("class")
 *    element.classList.contains("class")
 *
 * 5. INLINE STYLES:
 *    element.style.property = "value"
 *    Use camelCase: backgroundColor, fontSize, etc.
 *
 * 6. EVENTS:
 *    element.addEventListener("event", callback)
 *    Common events: "click", "input", "keypress"
 *
 * 7. EVENT OBJECT:
 *    event.target    - what was interacted with
 *    event.key       - which key was pressed
 *    event.preventDefault() - stop default behavior
 *
 * BEST PRACTICES:
 *   - Use classes over inline styles
 *   - Validate user input
 *   - Check if elements exist before using them
 *   - Use meaningful variable names
 *   - Add console.logs for debugging
 */

console.log("\n✅ All tasks completed!");
console.log("You've mastered the basics of DOM manipulation! 🚀");
console.log("Try interacting with the page now!");

