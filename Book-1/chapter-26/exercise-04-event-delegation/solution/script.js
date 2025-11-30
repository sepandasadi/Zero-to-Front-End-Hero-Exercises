/**
 * Exercise 04: Event Delegation - SOLUTION
 *
 * Complete solution demonstrating event delegation patterns
 */

console.log("=== Exercise 04: Event Delegation - SOLUTION ===\n");

// ======================
// TASK 1: BASIC DELEGATION
// ======================

const basicList = document.getElementById('basic-list');
const basicOutput = document.getElementById('basic-output');

// ONE listener on the parent handles ALL items
basicList.addEventListener('click', (e) => {
  // Check if clicked element is an item
  if (e.target.classList.contains('item')) {
    const text = e.target.textContent;
    console.log(`✓ Clicked: ${text}`);
    showOutput(basicOutput, `You clicked: ${text}`);
  }
});

console.log("✓ Task 1: Basic delegation setup");

// ======================
// TASK 2: DYNAMIC LIST WITH DELETE
// ======================

const dynamicInput = document.getElementById('dynamic-input');
const addDynamicBtn = document.getElementById('add-dynamic-btn');
const dynamicList = document.getElementById('dynamic-list');

let itemId = 1;

// Add item function
function addDynamicItem() {
  const text = dynamicInput.value.trim();

  if (!text) {
    alert('Please enter some text');
    return;
  }

  // Create item
  const li = document.createElement('li');
  li.classList.add('item');
  li.dataset.id = itemId++;

  const span = document.createElement('span');
  span.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = '×';

  li.appendChild(span);
  li.appendChild(deleteBtn);
  dynamicList.appendChild(li);

  dynamicInput.value = '';
  dynamicInput.focus();

  console.log(`✓ Added: ${text}`);
}

// Add button listener
addDynamicBtn.addEventListener('click', addDynamicItem);

// Enter key listener
dynamicInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addDynamicItem();
  }
});

// ONE delegated listener handles ALL delete buttons
dynamicList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const item = e.target.closest('.item');
    const text = item.querySelector('span').textContent;
    item.remove();
    console.log(`✓ Deleted: ${text}`);
  }
});

console.log("✓ Task 2: Dynamic list with delegation");

// ======================
// TASK 3: PRODUCT LIST (MULTIPLE ACTIONS)
// ======================

const products = [
  { id: 1, name: 'Laptop', favorite: false },
  { id: 2, name: 'Mouse', favorite: false },
  { id: 3, name: 'Keyboard', favorite: false }
];

const productList = document.getElementById('product-list');

// Create product element
function createProductElement(product) {
  const div = document.createElement('div');
  div.classList.add('product-item');
  div.dataset.productId = product.id;

  const name = document.createElement('div');
  name.classList.add('product-name');
  name.textContent = product.name;

  const actions = document.createElement('div');
  actions.classList.add('product-actions');

  // Edit button
  const editBtn = document.createElement('button');
  editBtn.classList.add('action-btn', 'edit-btn');
  editBtn.dataset.action = 'edit';
  editBtn.textContent = 'Edit';

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('action-btn', 'delete-btn');
  deleteBtn.dataset.action = 'delete';
  deleteBtn.textContent = 'Delete';

  // Favorite button
  const favoriteBtn = document.createElement('button');
  favoriteBtn.classList.add('action-btn', 'favorite-btn');
  favoriteBtn.dataset.action = 'favorite';
  favoriteBtn.textContent = product.favorite ? '★' : '☆';
  if (product.favorite) favoriteBtn.classList.add('active');

  actions.appendChild(editBtn);
  actions.appendChild(favoriteBtn);
  actions.appendChild(deleteBtn);

  div.appendChild(name);
  div.appendChild(actions);

  return div;
}

// Render products
function renderProducts() {
  productList.innerHTML = '';
  products.forEach(product => {
    productList.appendChild(createProductElement(product));
  });
}

renderProducts();

// ONE listener handles ALL actions for ALL products
productList.addEventListener('click', (e) => {
  const target = e.target;
  const action = target.dataset.action;

  if (!action) return;

  const productItem = target.closest('.product-item');
  const productId = parseInt(productItem.dataset.productId);
  const product = products.find(p => p.id === productId);

  switch (action) {
    case 'edit':
      const newName = prompt('Edit product name:', product.name);
      if (newName && newName.trim()) {
        product.name = newName.trim();
        renderProducts();
        console.log(`✓ Edited product ${productId}: ${product.name}`);
      }
      break;

    case 'delete':
      if (confirm(`Delete ${product.name}?`)) {
        const index = products.findIndex(p => p.id === productId);
        products.splice(index, 1);
        renderProducts();
        console.log(`✓ Deleted product: ${product.name}`);
      }
      break;

    case 'favorite':
      product.favorite = !product.favorite;
      renderProducts();
      console.log(`✓ ${product.favorite ? 'Favorited' : 'Unfavorited'}: ${product.name}`);
      break;
  }
});

console.log("✓ Task 3: Product list with multiple actions");

// ======================
// TASK 4: CARDS WITH NESTED ELEMENTS
// ======================

const cardData = [
  { id: 1, title: 'Card 1', badge: 'New', content: 'This is card 1' },
  { id: 2, title: 'Card 2', badge: 'Hot', content: 'This is card 2' },
  { id: 3, title: 'Card 3', badge: 'Sale', content: 'This is card 3' }
];

const cardContainer = document.getElementById('card-container');

// Create card element
function createCardElement(card) {
  const div = document.createElement('div');
  div.classList.add('card');
  div.dataset.cardId = card.id;

  // Header
  const header = document.createElement('div');
  header.classList.add('card-header');

  const title = document.createElement('h3');
  title.textContent = card.title;

  const badge = document.createElement('span');
  badge.classList.add('badge');
  badge.textContent = card.badge;

  header.appendChild(title);
  header.appendChild(badge);

  // Body
  const body = document.createElement('div');
  body.classList.add('card-body');

  const content = document.createElement('p');
  content.textContent = card.content;
  body.appendChild(content);

  // Footer
  const footer = document.createElement('div');
  footer.classList.add('card-footer');

  const button = document.createElement('button');
  button.textContent = 'Action';
  button.dataset.cardAction = 'true';
  footer.appendChild(button);

  // Assemble
  div.appendChild(header);
  div.appendChild(body);
  div.appendChild(footer);

  return div;
}

// Render cards
cardData.forEach(card => {
  cardContainer.appendChild(createCardElement(card));
});

// Card selection (click anywhere on card)
cardContainer.addEventListener('click', (e) => {
  // Don't select if clicking button
  if (e.target.dataset.cardAction === 'true') {
    return;
  }

  // Find the card
  const card = e.target.closest('.card');
  if (card) {
    // Deselect all cards
    document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));

    // Select this card
    card.classList.add('selected');
    console.log(`✓ Selected: ${card.querySelector('h3').textContent}`);
  }
});

// Button clicks (separate handler with stopPropagation)
cardContainer.addEventListener('click', (e) => {
  if (e.target.dataset.cardAction === 'true') {
    e.stopPropagation(); // Don't select card!
    const card = e.target.closest('.card');
    const cardTitle = card.querySelector('h3').textContent;
    alert(`Button clicked on ${cardTitle}!`);
    console.log(`✓ Button clicked on ${cardTitle}`);
  }
});

console.log("✓ Task 4: Cards with nested elements");

// ======================
// TASK 5: PERFORMANCE TEST
// ======================

const testIndividualBtn = document.getElementById('test-individual-btn');
const testDelegationBtn = document.getElementById('test-delegation-btn');
const performanceOutput = document.getElementById('performance-output');

// Test individual listeners
testIndividualBtn.addEventListener('click', () => {
  console.log("\n=== Testing Individual Listeners ===");
  const container = document.createElement('div');
  container.style.display = 'none';
  document.body.appendChild(container);

  console.time('Individual Listeners Setup');

  // Create 1000 items with individual listeners
  for (let i = 0; i < 1000; i++) {
    const item = document.createElement('div');
    item.textContent = `Item ${i}`;
    item.classList.add('perf-item');

    // Individual listener for each item (1000 listeners!)
    item.addEventListener('click', () => {
      console.log(`Clicked ${i}`);
    });

    container.appendChild(item);
  }

  console.timeEnd('Individual Listeners Setup');

  showOutput(performanceOutput,
    `Individual: Created 1000 items with 1000 listeners. Check console for time.`);

  // Clean up
  setTimeout(() => container.remove(), 100);
});

// Test delegation
testDelegationBtn.addEventListener('click', () => {
  console.log("\n=== Testing Event Delegation ===");
  const container = document.createElement('div');
  container.style.display = 'none';
  document.body.appendChild(container);

  console.time('Delegation Setup');

  // Create 1000 items
  for (let i = 0; i < 1000; i++) {
    const item = document.createElement('div');
    item.textContent = `Item ${i}`;
    item.classList.add('perf-item');
    item.dataset.index = i;
    container.appendChild(item);
  }

  // ONE listener handles all 1000 items!
  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('perf-item')) {
      console.log(`Clicked ${e.target.dataset.index}`);
    }
  });

  console.timeEnd('Delegation Setup');

  showOutput(performanceOutput,
    `Delegation: Created 1000 items with 1 listener. Check console for time.`);

  // Clean up
  setTimeout(() => container.remove(), 100);
});

console.log("✓ Task 5: Performance tests ready");

// ======================
// HELPER FUNCTIONS
// ======================

function showOutput(element, message) {
  element.textContent = message;
  element.style.display = 'block';
}

// ======================
// SUMMARY
// ======================

console.log("\n✅ Event Delegation - All Tasks Complete!");
console.log("\n📊 Key Benefits:");
console.log("   ✓ ONE listener instead of many");
console.log("   ✓ Works with dynamic content");
console.log("   ✓ Better performance");
console.log("   ✓ Less memory usage");
console.log("   ✓ Easier to maintain");
console.log("\n🎯 Pattern Used By:");
console.log("   • React (synthetic events)");
console.log("   • Vue.js");
console.log("   • jQuery (.on())");
console.log("   • Every major framework!");
console.log("\n💡 This is how professionals handle events!");

