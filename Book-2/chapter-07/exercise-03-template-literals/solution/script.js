// Exercise 03: Template Literals - SOLUTION

console.log("=== Exercise 3: Template Literals ===\n");

// Task 1: Basic Template Literals
console.log("--- Task 1: Basic Template Literals ---");
const name = 'Alice';
const age = 25;

// Backticks with ${} for interpolation
const greeting = `Hello, ${name}!`;
console.log(greeting);

const ageMessage = `${name} is ${age} years old`;
console.log(ageMessage);

const futureAge = `In 5 years, ${name} will be ${age + 5}`;
console.log(futureAge);

// Expressions can be any valid JavaScript
const mathExpression = `2 + 2 = ${2 + 2}`;
console.log(mathExpression);

const methodCall = `HELLO in lowercase is ${'HELLO'.toLowerCase()}`;
console.log(methodCall);

// Task 2: Multi-line Strings
console.log("\n--- Task 2: Multi-line Address ---");
const userName = 'Sarah Johnson';
const street = '123 Main St';
const city = 'Springfield';
const state = 'IL';
const zip = '62701';

// Template literals preserve line breaks!
const addressLabel = `${userName}
${street}
${city}, ${state} ${zip}`;
console.log(addressLabel);

// Task 3: Building HTML Templates
console.log("\n--- Task 3: HTML Templates ---");
const product = {
  name: 'Laptop',
  price: 999,
  description: 'Powerful laptop for developers',
  inStock: true
};

// Perfect for generating HTML dynamically
const productCard = `<div class="product-card">
  <h2>${product.name}</h2>
  <p>${product.description}</p>
  <p class="price">$${product.price}</p>
  <span class="badge">${product.inStock ? 'In Stock' : 'Out of Stock'}</span>
</div>`;
console.log(productCard);

// Task 4: Conditional Content
console.log("\n--- Task 4: Conditional Content ---");

function getUserGreeting(user) {
  // Ternary operator for conditional content
  const premiumBadge = user.isPremium ? ' ⭐ Premium Member' : '';
  
  return `Welcome back, ${user.name}!${premiumBadge}
You have ${user.points} points`;
}

const user1 = { name: 'Alice', isPremium: true, points: 150 };
const user2 = { name: 'Bob', isPremium: false, points: 50 };

console.log(getUserGreeting(user1));
console.log(getUserGreeting(user2));

// Task 5: Dynamic List Generation
console.log("\n--- Task 5: Dynamic Lists ---");
const tasks = [
  { id: 1, text: 'Learn JavaScript', completed: true },
  { id: 2, text: 'Build a project', completed: false },
  { id: 3, text: 'Deploy to production', completed: false }
];

// Map array to HTML strings
const taskListHTML = tasks.map(task => {
  const completedClass = task.completed ? 'completed' : '';
  return `<li class="${completedClass}" data-id="${task.id}">
    <input type="checkbox" ${task.completed ? 'checked' : ''}>
    <span>${task.text}</span>
  </li>`;
}).join('\n');

console.log(taskListHTML);

// Task 6: Tagged Template (Advanced)
console.log("\n--- Task 6: Tagged Template ---");

// Tagged templates let you process template strings with a function
// strings: array of literal strings
// values: array of interpolated values
function highlight(strings, ...values) {
  let result = '';
  strings.forEach((str, i) => {
    result += str;
    if (i < values.length) {
      result += `<mark>${values[i]}</mark>`;
    }
  });
  return result;
}

const studentName = 'Alice';
const score = 95;
const result = highlight`Student ${studentName} scored ${score} points`;
console.log(result);

// BONUS: More Tagged Template Examples
console.log("\n--- Bonus: More Tagged Templates ---");

// CSS-in-JS style tagged template
function css(strings, ...values) {
  let result = strings[0];
  for (let i = 0; i < values.length; i++) {
    result += values[i] + strings[i + 1];
  }
  return result;
}

const primaryColor = 'blue';
const styles = css`
  .button {
    color: ${primaryColor};
    padding: 10px;
  }
`;
console.log(styles);

console.log("\n✅ Exercise complete! Template literals make string handling elegant!");
console.log("\n💡 Key Takeaways:");
console.log("- Use backticks for template literals");
console.log("- ${} can contain any expression");
console.log("- Multi-line strings are natural");
console.log("- Perfect for HTML generation");
console.log("- Tagged templates for custom processing");
