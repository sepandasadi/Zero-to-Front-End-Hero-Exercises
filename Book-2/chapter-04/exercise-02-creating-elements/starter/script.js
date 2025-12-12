/**
 * Exercise 02: Creating Elements
 *
 * Complete each task by creating elements dynamically
 */

console.log("=== Exercise 02: Creating Elements ===\n");

// ======================
// TASK 1: CREATE SINGLE ELEMENTS
// ======================

// TODO: Create an <h2> element with text "Dynamic Heading"
// TODO: Create a <p> element with text "This paragraph was created with JavaScript"
// TODO: Create a button with text "Click Me"
// TODO: Append all three to #task1-container


// ======================
// TASK 2: CREATE CARD COMPONENT
// ======================

// TODO: Create a function createCard(title, description, imageUrl)
// Function should:
// - Create a div with class "card"
// - Add an img element
// - Add an h3 with the title
// - Add a p with the description
// - Add a button with text "Add to Cart"
// - Return the complete card element

function createCard(title, description, imageUrl) {
  // Your code here
}

// TODO: Create 3 cards with different data
// TODO: Append them to #task2-container

// Example data:
// createCard("Laptop", "High performance laptop", "https://via.placeholder.com/300x200")


// ======================
// TASK 3: CREATE A LIST
// ======================

// TODO: Create a function createList(items)
// Function should:
// - Create a <ul> element
// - For each item in the array, create an <li> and append to the ul
// - Return the complete list

function createList(items) {
  // Your code here
}

// TODO: Test with ["HTML", "CSS", "JavaScript", "React"]
// TODO: Append to #task3-container


// ======================
// TASK 4: CREATE PRODUCT GRID
// ======================

const products = [
  { id: 1, name: "Laptop", price: 999, image: "https://via.placeholder.com/300x200/667eea/white?text=Laptop" },
  { id: 2, name: "Mouse", price: 25, image: "https://via.placeholder.com/300x200/764ba2/white?text=Mouse" },
  { id: 3, name: "Keyboard", price: 75, image: "https://via.placeholder.com/300x200/667eea/white?text=Keyboard" },
  { id: 4, name: "Monitor", price: 350, image: "https://via.placeholder.com/300x200/764ba2/white?text=Monitor" }
];

// TODO: Create a function createProductGrid(products)
// For each product, create a card with:
// - Image
// - Product name
// - Price formatted as $XX.XX
// - "Add to Cart" button

function createProductGrid(products) {
  // Your code here
}

// TODO: Call createProductGrid and append to #task4-container


// ======================
// TASK 5: BUILD USER PROFILE
// ======================

const user = {
  name: "Alice Johnson",
  avatar: "https://via.placeholder.com/120/667eea/white?text=AJ",
  bio: "Web Developer | Coffee Enthusiast ☕",
  stats: {
    followers: 1234,
    following: 567,
    posts: 89
  }
};

// TODO: Create a function createUserProfile(user)
// Build this structure:
// div.profile
//   img.avatar
//   h2.name
//   p.bio
//   div.stats
//     div.stat (for each stat)
//       span.count
//       span.label

function createUserProfile(user) {
  // Your code here
}

// TODO: Call createUserProfile and append to #task5-container


// ======================
// TASK 6: CREATE TABLE FROM DATA
// ======================

const employees = [
  { name: "Alice", role: "Developer", salary: 90000 },
  { name: "Bob", role: "Designer", salary: 80000 },
  { name: "Charlie", role: "Manager", salary: 100000 },
  { name: "Diana", role: "Developer", salary: 95000 }
];

// TODO: Create a function createTable(data)
// Build a table with:
// - <thead> with column headers
// - <tbody> with data rows
// - Format salary with commas: $90,000

function createTable(data) {
  // Your code here
}

// TODO: Call createTable and append to #task6-container


// ======================
// TASK 7: USING DOCUMENTFRAGMENT
// ======================

// TODO: Create 1000 list items WITHOUT DocumentFragment
// Measure time with console.time()

// TODO: Create 1000 list items WITH DocumentFragment
// Measure time and compare


// ======================
// TASK 8: BUILD COMMENT SECTION
// ======================

const comments = [
  {
    id: 1,
    author: "Alice",
    text: "Great article! Very helpful.",
    replies: [
      { id: 2, author: "Bob", text: "I agree! Thanks for sharing." },
      { id: 3, author: "Charlie", text: "Learned a lot from this." }
    ]
  },
  {
    id: 4,
    author: "Diana",
    text: "Thanks for the detailed explanation!",
    replies: []
  },
  {
    id: 5,
    author: "Eve",
    text: "Can you cover more advanced topics?",
    replies: [
      { id: 6, author: "Alice", text: "Sure! What would you like to see?" }
    ]
  }
];

// TODO: Create a function createCommentSection(comments)
// For each comment, create:
// - div.comment
//   - div.author
//   - div.text
//   - button.reply-btn "Reply"
//   - div.replies (if there are replies)
//     - Recursively add reply comments with indentation

function createCommentSection(comments) {
  // Your code here
}

// TODO: Call createCommentSection and append to #task8-container


// ======================
// BONUS: HELPER FUNCTIONS
// ======================

// Bonus: Create a helper function to simplify element creation
function createElement(tag, classNames = [], textContent = "") {
  const element = document.createElement(tag);
  if (classNames.length) element.classList.add(...classNames);
  if (textContent) element.textContent = textContent;
  return element;
}

// You can use this helper in your functions above!


console.log("\n✅ Check the page to see your created elements!");

