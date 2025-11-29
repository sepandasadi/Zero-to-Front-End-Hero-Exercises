/**
 * Exercise 04: Event Delegation
 *
 * Master the professional pattern for handling events
 */

console.log("=== Exercise 04: Event Delegation ===\n");

// ======================
// TASK 1: BASIC DELEGATION
// ======================

// TODO: Add ONE click listener to the #basic-list (not to each <li>)
// When any item is clicked:
// - Log the item's text to console
// - Display it in #basic-output

const basicList = document.getElementById('basic-list');
const basicOutput = document.getElementById('basic-output');

// Your code here


// ======================
// TASK 2: DYNAMIC LIST WITH DELETE
// ======================

// TODO: Create a dynamic list where you can add items
// Each item should have a delete button
// Use ONE click listener on #dynamic-list to handle all deletes

const dynamicInput = document.getElementById('dynamic-input');
const addDynamicBtn = document.getElementById('add-dynamic-btn');
const dynamicList = document.getElementById('dynamic-list');

// TODO: Function to add item to list
function addDynamicItem() {
  // Your code here
}

// TODO: Add event listener for add button


// TODO: Add ONE delegated click listener to handle all delete buttons


// ======================
// TASK 3: PRODUCT LIST (MULTIPLE ACTIONS)
// ======================

// TODO: Create product items with edit, delete, and favorite buttons
// Use ONE listener to handle ALL actions

const products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Mouse' },
  { id: 3, name: 'Keyboard' }
];

const productList = document.getElementById('product-list');

// TODO: Function to create product element
function createProductElement(product) {
  // Your code here
}

// TODO: Render all products


// TODO: Add ONE delegated listener to handle edit, delete, and favorite


// ======================
// TASK 4: CARDS WITH NESTED ELEMENTS
// ======================

// TODO: Create cards where clicking the card selects it
// But clicking the button does NOT select the card (stop propagation)

const cardData = [
  { id: 1, title: 'Card 1', badge: 'New', content: 'This is card 1' },
  { id: 2, title: 'Card 2', badge: 'Hot', content: 'This is card 2' },
  { id: 3, title: 'Card 3', badge: 'Sale', content: 'This is card 3' }
];

const cardContainer = document.getElementById('card-container');

// TODO: Function to create card element
function createCardElement(card) {
  // Your code here
}

// TODO: Render all cards


// TODO: Add delegated listener for card selection


// TODO: Add delegated listener for button clicks (stop propagation!)


// ======================
// TASK 5: PERFORMANCE TEST
// ======================

// TODO: Compare performance of individual listeners vs delegation

const testIndividualBtn = document.getElementById('test-individual-btn');
const testDelegationBtn = document.getElementById('test-delegation-btn');
const performanceOutput = document.getElementById('performance-output');

// TODO: Test 1 - Individual listeners (slow)
function testIndividualListeners() {
  // Your code here
  // Create 1000 items
  // Add individual listener to each
  // Measure time
}

// TODO: Test 2 - Delegation (fast)
function testDelegation() {
  // Your code here
  // Create 1000 items
  // Add ONE listener to parent
  // Measure time
}


// ======================
// HELPER FUNCTIONS
// ======================

// Helper: Show output
function showOutput(element, message) {
  element.textContent = message;
  element.style.display = 'block';
}

console.log("\n✅ Event delegation initialized!");
console.log("💡 Open dev tools and interact with each task");
console.log("📊 Notice how ONE listener handles multiple elements");

