// Exercise 06: Enhanced Object Literals - SOLUTION

console.log("=== Exercise 6: Enhanced Object Literals ===\n");

// Task 1: Default Parameters
console.log("--- Task 1: Default Parameters ---");

// Defaults are evaluated at call time
function greet(name = 'Guest', greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}

function createUser(username, role = 'user', isActive = true) {
  return { username, role, isActive };
}

console.log(greet()); // Uses both defaults
console.log(greet('Alice')); // Uses greeting default
console.log(greet('Bob', 'Hi')); // Uses no defaults
console.log(createUser('bob')); // Uses role and isActive defaults

// Task 2: Property Shorthand
console.log("\n--- Task 2: Property Shorthand ---");
const name = 'Alice';
const age = 25;
const city = 'NYC';

// When variable name matches property name, use shorthand
const user = { name, age, city };
// Equivalent to: { name: name, age: age, city: city }
console.log(user);

// Task 3: Method Shorthand
console.log("\n--- Task 3: Method Shorthand ---");

const calculator = {
  // New shorthand syntax (no 'function' keyword)
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
  multiply(a, b) {
    return a * b;
  }
};

console.log('10 + 5 =', calculator.add(10, 5));
console.log('10 - 5 =', calculator.subtract(10, 5));
console.log('10 * 5 =', calculator.multiply(10, 5));

// Task 4: Computed Properties
console.log("\n--- Task 4: Computed Properties ---");
const fieldName = 'email';

// Property name computed at runtime
const userObj = {
  [fieldName]: 'alice@example.com',
  [`${fieldName}Verified`]: true,
  [`get${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`]() {
    return this[fieldName];
  }
};

console.log(userObj);
console.log('Get email:', userObj.getEmail());

// Task 5: Combining All Features
console.log("\n--- Task 5: All Together ---");

let idCounter = 0;
function createProduct(name, price, category = 'General') {
  const id = ++idCounter;
  const created = Date.now();
  
  return {
    id,                    // Property shorthand
    name,
    price,
    category,
    created,
    
    // Method shorthand
    getPrice() {
      return `$${this.price}`;
    },
    
    applyDiscount(percent = 10) {  // Default parameter
      this.price = this.price * (1 - percent / 100);
      return this;
    },
    
    // Computed property
    [category.toLowerCase()]: true,
    
    // Computed method name
    [`is${category}`]() {
      return this.category === category;
    }
  };
}

const laptop = createProduct('Laptop', 999, 'Electronics');
console.log(laptop);
console.log('Price:', laptop.getPrice());
console.log('After 20% discount:', laptop.applyDiscount(20).getPrice());
console.log('Is Electronics?', laptop.isElectronics());

// Real-World Example
console.log("\n--- Real-World: API Response Builder ---");

function formatResponse(data, status = 200, message = 'Success') {
  const timestamp = Date.now();
  const success = status >= 200 && status < 300;
  
  return {
    success,
    status,
    message,
    data,
    timestamp,
    
    // Method shorthand
    toJSON() {
      return JSON.stringify(this, null, 2);
    },
    
    // Computed properties for HTTP status categories
    [status >= 200 && status < 300 ? 'ok' : 'error']: true
  };
}

const response = formatResponse({ users: ['Alice', 'Bob'] });
console.log(response);
console.log('JSON:', response.toJSON());

console.log("\n✅ Exercise complete!");
console.log("\n💡 Key Takeaways:");
console.log("- Default parameters provide fallback values");
console.log("- Property shorthand: { name } instead of { name: name }");
console.log("- Method shorthand: method() {} instead of method: function() {}");
console.log("- Computed properties: [expression] for dynamic keys");
console.log("- Combine them all for concise, elegant code");
