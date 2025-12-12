/**
 * Exercise 02: Creating Elements - SOLUTION
 *
 * Complete solutions for creating elements dynamically
 */

console.log("=== Exercise 02: Creating Elements - SOLUTION ===\n");

// ======================
// TASK 1: CREATE SINGLE ELEMENTS
// ======================

console.log("TASK 1: Creating Single Elements");

// Create h2
const heading = document.createElement('h2');
heading.textContent = "Dynamic Heading";

// Create paragraph
const paragraph = document.createElement('p');
paragraph.textContent = "This paragraph was created with JavaScript";

// Create button
const button = document.createElement('button');
button.textContent = "Click Me";
button.addEventListener('click', () => alert('Button clicked!'));

// Append to container
const task1Container = document.getElementById('task1-container');
task1Container.appendChild(heading);
task1Container.appendChild(paragraph);
task1Container.appendChild(button);

console.log("✓ Single elements created");

// ======================
// TASK 2: CREATE CARD COMPONENT
// ======================

console.log("TASK 2: Creating Card Component");

function createCard(title, description, imageUrl) {
  // Create card container
  const card = document.createElement('div');
  card.classList.add('card');

  // Create and add image
  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = title;

  // Create and add heading
  const h3 = document.createElement('h3');
  h3.textContent = title;

  // Create and add description
  const p = document.createElement('p');
  p.textContent = description;

  // Create and add button
  const btn = document.createElement('button');
  btn.textContent = "Add to Cart";
  btn.addEventListener('click', () => {
    alert(`Added ${title} to cart!`);
  });

  // Assemble card
  card.appendChild(img);
  card.appendChild(h3);
  card.appendChild(p);
  card.appendChild(btn);

  return card;
}

// Create 3 cards
const task2Container = document.getElementById('task2-container');
const card1 = createCard(
  "Premium Laptop",
  "High-performance laptop for professionals",
  "https://via.placeholder.com/300x200/667eea/white?text=Laptop"
);
const card2 = createCard(
  "Wireless Mouse",
  "Ergonomic wireless mouse with precision tracking",
  "https://via.placeholder.com/300x200/764ba2/white?text=Mouse"
);
const card3 = createCard(
  "Mechanical Keyboard",
  "RGB mechanical keyboard for gaming and coding",
  "https://via.placeholder.com/300x200/667eea/white?text=Keyboard"
);

task2Container.appendChild(card1);
task2Container.appendChild(card2);
task2Container.appendChild(card3);

console.log("✓ Card components created");

// ======================
// TASK 3: CREATE A LIST
// ======================

console.log("TASK 3: Creating List");

function createList(items) {
  const ul = document.createElement('ul');

  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });

  return ul;
}

// Create and append list
const task3Container = document.getElementById('task3-container');
const techList = createList(["HTML", "CSS", "JavaScript", "React"]);
task3Container.appendChild(techList);

console.log("✓ List created");

// ======================
// TASK 4: CREATE PRODUCT GRID
// ======================

console.log("TASK 4: Creating Product Grid");

const products = [
  { id: 1, name: "Laptop", price: 999, image: "https://via.placeholder.com/300x200/667eea/white?text=Laptop" },
  { id: 2, name: "Mouse", price: 25, image: "https://via.placeholder.com/300x200/764ba2/white?text=Mouse" },
  { id: 3, name: "Keyboard", price: 75, image: "https://via.placeholder.com/300x200/667eea/white?text=Keyboard" },
  { id: 4, name: "Monitor", price: 350, image: "https://via.placeholder.com/300x200/764ba2/white?text=Monitor" }
];

function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.productId = product.id;

  const img = document.createElement('img');
  img.src = product.image;
  img.alt = product.name;

  const h3 = document.createElement('h3');
  h3.textContent = product.name;

  const price = document.createElement('p');
  price.textContent = `Price: $${product.price.toFixed(2)}`;
  price.style.fontSize = '1.2rem';
  price.style.fontWeight = 'bold';
  price.style.color = '#667eea';

  const btn = document.createElement('button');
  btn.textContent = "Add to Cart";
  btn.addEventListener('click', () => {
    console.log(`Added ${product.name} to cart!`);
    alert(`${product.name} added to cart!`);
  });

  card.appendChild(img);
  card.appendChild(h3);
  card.appendChild(price);
  card.appendChild(btn);

  return card;
}

function createProductGrid(products) {
  const fragment = document.createDocumentFragment();

  products.forEach(product => {
    const card = createProductCard(product);
    fragment.appendChild(card);
  });

  return fragment;
}

// Create and append product grid
const task4Container = document.getElementById('task4-container');
task4Container.appendChild(createProductGrid(products));

console.log("✓ Product grid created");

// ======================
// TASK 5: BUILD USER PROFILE
// ======================

console.log("TASK 5: Building User Profile");

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

function createUserProfile(user) {
  // Create profile container
  const profile = document.createElement('div');
  profile.classList.add('profile');

  // Create avatar
  const avatar = document.createElement('img');
  avatar.src = user.avatar;
  avatar.alt = user.name;
  avatar.classList.add('avatar');

  // Create name
  const name = document.createElement('h2');
  name.textContent = user.name;
  name.classList.add('name');

  // Create bio
  const bio = document.createElement('p');
  bio.textContent = user.bio;
  bio.classList.add('bio');

  // Create stats container
  const statsContainer = document.createElement('div');
  statsContainer.classList.add('stats');

  // Create each stat
  Object.entries(user.stats).forEach(([key, value]) => {
    const stat = document.createElement('div');
    stat.classList.add('stat');

    const count = document.createElement('span');
    count.textContent = value.toLocaleString();
    count.classList.add('count');

    const label = document.createElement('span');
    label.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    label.classList.add('label');

    stat.appendChild(count);
    stat.appendChild(label);
    statsContainer.appendChild(stat);
  });

  // Assemble profile
  profile.appendChild(avatar);
  profile.appendChild(name);
  profile.appendChild(bio);
  profile.appendChild(statsContainer);

  return profile;
}

// Create and append profile
const task5Container = document.getElementById('task5-container');
task5Container.appendChild(createUserProfile(user));

console.log("✓ User profile created");

// ======================
// TASK 6: CREATE TABLE FROM DATA
// ======================

console.log("TASK 6: Creating Data Table");

const employees = [
  { name: "Alice", role: "Developer", salary: 90000 },
  { name: "Bob", role: "Designer", salary: 80000 },
  { name: "Charlie", role: "Manager", salary: 100000 },
  { name: "Diana", role: "Developer", salary: 95000 }
];

function createTable(data) {
  // Create table
  const table = document.createElement('table');

  // Create thead
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  ['Name', 'Role', 'Salary'].forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create tbody
  const tbody = document.createElement('tbody');

  data.forEach(employee => {
    const row = document.createElement('tr');

    const nameTd = document.createElement('td');
    nameTd.textContent = employee.name;

    const roleTd = document.createElement('td');
    roleTd.textContent = employee.role;

    const salaryTd = document.createElement('td');
    salaryTd.textContent = `$${employee.salary.toLocaleString()}`;

    row.appendChild(nameTd);
    row.appendChild(roleTd);
    row.appendChild(salaryTd);
    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  return table;
}

// Create and append table
const task6Container = document.getElementById('task6-container');
task6Container.appendChild(createTable(employees));

console.log("✓ Table created");

// ======================
// TASK 7: USING DOCUMENTFRAGMENT
// ======================

console.log("\nTASK 7: DocumentFragment Performance Test");

// Test WITHOUT DocumentFragment
console.time('Without Fragment');
const list1 = document.createElement('ul');
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  list1.appendChild(li);  // Each append causes a reflow!
}
console.timeEnd('Without Fragment');

// Test WITH DocumentFragment
console.time('With Fragment');
const list2 = document.createElement('ul');
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);  // Append to fragment (in memory)
}
list2.appendChild(fragment);  // Single append to DOM!
console.timeEnd('With Fragment');

console.log("✓ Performance test complete - check console times");

// ======================
// TASK 8: BUILD COMMENT SECTION
// ======================

console.log("TASK 8: Creating Comment Section");

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

function createComment(comment) {
  // Create comment container
  const commentDiv = document.createElement('div');
  commentDiv.classList.add('comment');
  commentDiv.dataset.commentId = comment.id;

  // Create author
  const author = document.createElement('div');
  author.classList.add('author');
  author.textContent = comment.author;

  // Create text
  const text = document.createElement('div');
  text.classList.add('text');
  text.textContent = comment.text;

  // Create reply button
  const replyBtn = document.createElement('button');
  replyBtn.classList.add('reply-btn');
  replyBtn.textContent = "Reply";
  replyBtn.addEventListener('click', () => {
    alert(`Replying to ${comment.author}...`);
  });

  // Assemble comment
  commentDiv.appendChild(author);
  commentDiv.appendChild(text);
  commentDiv.appendChild(replyBtn);

  // Add replies if they exist
  if (comment.replies && comment.replies.length > 0) {
    const repliesDiv = document.createElement('div');
    repliesDiv.classList.add('replies');

    comment.replies.forEach(reply => {
      const replyElement = createComment(reply);  // Recursive!
      repliesDiv.appendChild(replyElement);
    });

    commentDiv.appendChild(repliesDiv);
  }

  return commentDiv;
}

function createCommentSection(comments) {
  const section = document.createElement('div');
  section.classList.add('comments-section');

  comments.forEach(comment => {
    const commentElement = createComment(comment);
    section.appendChild(commentElement);
  });

  return section;
}

// Create and append comment section
const task8Container = document.getElementById('task8-container');
task8Container.appendChild(createCommentSection(comments));

console.log("✓ Comment section created");

// ======================
// BONUS: HELPER FUNCTION
// ======================

console.log("\nBONUS: Element Creation Helper");

/**
 * Helper function to create elements more easily
 * @param {string} tag - HTML tag name
 * @param {object} props - Properties to set
 * @param {array} children - Child elements or text
 * @returns {HTMLElement}
 */
function createElement(tag, props = {}, children = []) {
  const element = document.createElement(tag);

  // Set text content
  if (props.text) {
    element.textContent = props.text;
  }

  // Set classes
  if (props.classes) {
    element.classList.add(...props.classes);
  }

  // Set attributes
  if (props.attrs) {
    Object.entries(props.attrs).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  // Set styles
  if (props.styles) {
    Object.assign(element.style, props.styles);
  }

  // Add event listeners
  if (props.events) {
    Object.entries(props.events).forEach(([event, handler]) => {
      element.addEventListener(event, handler);
    });
  }

  // Append children
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });

  return element;
}

// Example usage of helper
const exampleCard = createElement('div', { classes: ['card'] }, [
  createElement('h3', { text: 'Card Title' }),
  createElement('p', { text: 'Card description' }),
  createElement('button', {
    text: 'Click Me',
    events: { click: () => console.log('Clicked!') }
  })
]);

console.log("✓ Helper function demonstrated");

console.log("\n✅ All tasks complete!");
console.log("\n📚 Key Takeaways:");
console.log("• document.createElement() creates new elements");
console.log("• Set properties: textContent, classList, attributes");
console.log("• appendChild() adds elements to the DOM");
console.log("• DocumentFragment improves performance");
console.log("• Build reusable component functions");
console.log("• Real apps create elements dynamically!");

