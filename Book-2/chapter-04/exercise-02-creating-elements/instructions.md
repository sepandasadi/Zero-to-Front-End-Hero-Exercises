# Exercise 02: Creating Elements

## 🎯 Objective

Master creating HTML elements dynamically with JavaScript. Learn to build complex structures, cards, and lists entirely from code—no hardcoded HTML required!

## 📚 What You'll Learn

- Creating elements with `document.createElement()`
- Setting element properties and content
- Adding classes and attributes
- Appending elements to the DOM
- Building complex element structures
- Using DocumentFragment for performance

## 📋 Tasks

### Task 1: Create Single Elements

Create individual elements and add them to the page.

**Your tasks:**

1. Create an `<h2>` element with text "Dynamic Heading"
2. Create a `<p>` element with text "This paragraph was created with JavaScript"
3. Append both to a container on the page
4. Create a button with text "Click Me" and add it to the page

**Expected result:**
```html
<div id="container">
  <h2>Dynamic Heading</h2>
  <p>This paragraph was created with JavaScript</p>
  <button>Click Me</button>
</div>
```

---

### Task 2: Create Card Component

Build a card component dynamically.

**Given structure:**
```html
<div class="card">
  <img src="image.jpg" alt="Product">
  <h3>Product Name</h3>
  <p>Product description goes here</p>
  <button>Add to Cart</button>
</div>
```

**Your tasks:**

1. Create a function `createCard(title, description, imageUrl)`
2. Function should return a complete card element
3. Create 3 different cards and append to page

---

### Task 3: Create a List

Build an unordered list dynamically.

**Your tasks:**

1. Create a function `createList(items)` that takes an array of strings
2. Function should create a `<ul>` with `<li>` elements for each item
3. Test with: `["HTML", "CSS", "JavaScript", "React"]`
4. Append the list to the page

**Expected result:**
```html
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
  <li>React</li>
</ul>
```

---

### Task 4: Create Product Grid

Build multiple product cards in a grid.

**Given data:**
```js
const products = [
  { id: 1, name: "Laptop", price: 999, image: "laptop.jpg" },
  { id: 2, name: "Mouse", price: 25, image: "mouse.jpg" },
  { id: 3, name: "Keyboard", price: 75, image: "keyboard.jpg" }
];
```

**Your tasks:**

1. Create a function `createProductGrid(products)`
2. For each product, create a card with:
   - Image
   - Product name
   - Price (formatted as $XX.XX)
   - "Add to Cart" button
3. Add all cards to a grid container
4. Style the grid with CSS Grid (3 columns)

---

### Task 5: Build User Profile

Create a complex nested structure.

**Given data:**
```js
const user = {
  name: "Alice Johnson",
  avatar: "avatar.jpg",
  bio: "Web Developer | Coffee Enthusiast",
  stats: {
    followers: 1234,
    following: 567,
    posts: 89
  }
};
```

**Your tasks:**

1. Create a function `createUserProfile(user)`
2. Build this structure:
   ```html
   <div class="profile">
     <img class="avatar" src="avatar.jpg">
     <h2 class="name">Alice Johnson</h2>
     <p class="bio">Web Developer | Coffee Enthusiast</p>
     <div class="stats">
       <div class="stat">
         <span class="count">1234</span>
         <span class="label">Followers</span>
       </div>
       <!-- Similar for following and posts -->
     </div>
   </div>
   ```
3. Append to the page

---

### Task 6: Create Table from Data

Build a data table dynamically.

**Given data:**
```js
const employees = [
  { name: "Alice", role: "Developer", salary: 90000 },
  { name: "Bob", role: "Designer", salary: 80000 },
  { name: "Charlie", role: "Manager", salary: 100000 }
];
```

**Your tasks:**

1. Create a function `createTable(data)`
2. Build a `<table>` with:
   - Header row (`<thead>`)
   - Body rows (`<tbody>`)
3. Format salary with commas ($90,000)
4. Add zebra striping with CSS

---

### Task 7: Using DocumentFragment

Optimize element creation for large lists.

**Your tasks:**

1. Create 1000 list items
2. First, append them one by one (slow)
3. Then, use DocumentFragment (fast)
4. Measure and compare the performance with `console.time()`

**Example:**
```js
console.time('Without Fragment');
// ... append items one by one
console.timeEnd('Without Fragment');

console.time('With Fragment');
// ... use DocumentFragment
console.timeEnd('With Fragment');
```

---

### Task 8: Build Comment Section

Create a nested comment structure.

**Given data:**
```js
const comments = [
  {
    id: 1,
    author: "Alice",
    text: "Great article!",
    replies: [
      { id: 2, author: "Bob", text: "I agree!" }
    ]
  },
  {
    id: 3,
    author: "Charlie",
    text: "Thanks for sharing",
    replies: []
  }
];
```

**Your tasks:**

1. Create function `createCommentSection(comments)`
2. Build nested structure with replies indented
3. Include author, text, and reply button
4. Style with proper indentation

---

## ✅ Success Criteria

Your solution should:

1. ✅ Create elements programmatically
2. ✅ Set properties (textContent, classList, attributes) correctly
3. ✅ Build complex nested structures
4. ✅ Use proper semantic HTML
5. ✅ Apply CSS classes for styling
6. ✅ Organize code into reusable functions
7. ✅ Use DocumentFragment for performance when needed

## 💡 Hints

### Hint 1: Basic Element Creation

```js
// Create element
const heading = document.createElement('h2');

// Set content
heading.textContent = "Hello World";

// Add classes
heading.classList.add('title', 'large');

// Set attributes
heading.setAttribute('id', 'main-title');

// Append to page
document.body.appendChild(heading);
```

### Hint 2: Building Complex Structures

```js
function createCard(title, description) {
  const card = document.createElement('div');
  card.classList.add('card');

  const heading = document.createElement('h3');
  heading.textContent = title;

  const para = document.createElement('p');
  para.textContent = description;

  card.appendChild(heading);
  card.appendChild(para);

  return card;
}
```

### Hint 3: Creating Multiple Elements

```js
const items = ['Apple', 'Banana', 'Orange'];
const list = document.createElement('ul');

items.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  list.appendChild(li);
});

document.body.appendChild(list);
```

### Hint 4: Using DocumentFragment

```js
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  const item = document.createElement('li');
  item.textContent = `Item ${i}`;
  fragment.appendChild(item);
}

// Single reflow - much faster!
list.appendChild(fragment);
```

### Hint 5: Setting Multiple Properties

```js
function createElement(tag, props, children = []) {
  const element = document.createElement(tag);

  // Set properties
  if (props.text) element.textContent = props.text;
  if (props.classes) element.classList.add(...props.classes);
  if (props.attrs) {
    Object.entries(props.attrs).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  // Append children
  children.forEach(child => element.appendChild(child));

  return element;
}
```

## 🧪 Testing

Create test HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Exercise 02</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Creating Elements</h1>
  <div id="container"></div>
  <script src="script.js"></script>
</body>
</html>
```

Test each function:
```js
// Test createCard
const card = createCard("Product", "Description", "image.jpg");
console.log(card);  // Should be complete card element

// Test createList
const list = createList(["Item 1", "Item 2"]);
console.log(list.children.length);  // Should be 2
```

## ⏱️ Estimated Time

**40-50 minutes**

- 5 minutes: Task 1 (Single elements)
- 10 minutes: Task 2 (Card component)
- 5 minutes: Task 3 (List)
- 10 minutes: Task 4 (Product grid)
- 10 minutes: Task 5 (User profile)
- 5 minutes: Task 6 (Table)
- 5 minutes: Task 7 (DocumentFragment)
- 10 minutes: Task 8 (Comments)

## 🎯 Bonus Challenges

### Bonus 1: Element Factory

Create a helper function that simplifies element creation:

```js
const h = (tag, props, ...children) => {
  // Create element with props and children
};

// Usage:
const card = h('div', { class: 'card' },
  h('h3', {}, 'Title'),
  h('p', {}, 'Description')
);
```

### Bonus 2: Template System

Create a simple template system:

```js
function template(html, data) {
  // Replace {{key}} with data[key]
  // Return element
}

const html = `
  <div class="card">
    <h3>{{title}}</h3>
    <p>{{description}}</p>
  </div>
`;

const card = template(html, {
  title: "Product",
  description: "Description"
});
```

### Bonus 3: Component System

Build a reusable component system:

```js
class Component {
  constructor(props) {
    this.props = props;
  }

  render() {
    // Return element
  }

  mount(target) {
    target.appendChild(this.render());
  }
}

class Card extends Component {
  render() {
    // Create and return card
  }
}
```

### Bonus 4: Virtual DOM Diff

Implement a simple virtual DOM:

```js
function diff(oldTree, newTree) {
  // Compare and return changes needed
}

function patch(element, changes) {
  // Apply changes to real DOM
}
```

## 📖 Resources

- [MDN: document.createElement()](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
- [MDN: Node.appendChild()](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)
- [MDN: DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment)
- Chapter 26: Creating Elements section

---

## 🎓 Why This Matters

**Dynamic element creation is fundamental because:**

1. **Single Page Apps** - React, Vue, Angular all create elements dynamically
2. **API Data** - Display data fetched from servers
3. **Interactive UIs** - Add/remove content based on user actions
4. **Performance** - Only create what you need, when you need it
5. **Templates** - Build reusable component systems

**This is how modern web apps work!** 🚀

---

**Ready to build from JavaScript?** No more static HTML—create dynamic, data-driven interfaces! Let's code! 💪

