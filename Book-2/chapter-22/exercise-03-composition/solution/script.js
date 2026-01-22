// Exercise 03: Function Composition - SOLUTION

console.log("=== Exercise 3: Function Composition ===\n");

// Task 1: Manual Composition
console.log("--- Task 1: Manual Composition ---");

const add5 = x => x + 5;
const multiply2 = x => x * 2;
const square = x => x ** 2;

// Compose manually (right to left)
const result1 = multiply2(add5(10)); // (10 + 5) * 2 = 30
console.log('multiply2(add5(10)):', result1);

// Multiple levels
const result2 = square(multiply2(add5(3))); // ((3 + 5) * 2)^2 = 256
console.log('square(multiply2(add5(3))):', result2);

// Task 2: Build compose() Utility
console.log("\n--- Task 2: compose() Utility ---");

// Compose applies functions right-to-left
// compose(f, g, h)(x) = f(g(h(x)))
const compose = (...fns) => x => fns.reduceRight((value, fn) => fn(value), x);

const process1 = compose(multiply2, add5);
console.log('compose(multiply2, add5)(10):', process1(10)); // 30

const process2 = compose(square, multiply2, add5);
console.log('compose(square, multiply2, add5)(3):', process2(3)); // 256

// Task 3: Build pipe() Utility
console.log("\n--- Task 3: pipe() Utility ---");

// Pipe applies functions left-to-right (more intuitive!)
// pipe(f, g, h)(x) = h(g(f(x)))
const pipe = (...fns) => x => fns.reduce((value, fn) => fn(value), x);

const process3 = pipe(add5, multiply2);
console.log('pipe(add5, multiply2)(10):', process3(10)); // 30

const process4 = pipe(add5, multiply2, square);
console.log('pipe(add5, multiply2, square)(3):', process4(3)); // 256

// Task 4: Point-Free Style
console.log("\n--- Task 4: Point-Free Style ---");

// With arguments (pointed)
const getNames = users => users.map(u => u.name);

// Point-free (no mention of arguments)
const map = fn => arr => arr.map(fn);
const prop = key => obj => obj[key];
const getNamesPointFree = map(prop('name'));

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 }
];

console.log('With arguments:', getNames(users));
console.log('Point-free:', getNamesPointFree(users));

// Task 5: Data Pipeline
console.log("\n--- Task 5: Data Pipeline ---");

const products = [
  { name: 'Laptop', price: 1000, category: 'electronics' },
  { name: 'Phone', price: 500, category: 'electronics' },
  { name: 'Desk', price: 300, category: 'furniture' },
  { name: 'Chair', price: 200, category: 'furniture' }
];

// Pipeline: filter electronics → map prices → sum
const calculateElectronicsTotal = pipe(
  arr => arr.filter(p => p.category === 'electronics'),
  arr => arr.map(p => p.price),
  arr => arr.reduce((sum, price) => sum + price, 0)
);

console.log('Electronics total:', calculateElectronicsTotal(products));

// Reusable pipeline functions
const filterByCategory = category => arr => arr.filter(p => p.category === category);
const mapPrices = arr => arr.map(p => p.price);
const sum = arr => arr.reduce((a, b) => a + b, 0);

const getFurnitureTotal = pipe(
  filterByCategory('furniture'),
  mapPrices,
  sum
);

console.log('Furniture total:', getFurnitureTotal(products));

// Task 6: Currying
console.log("\n--- Task 6: Currying ---");

// Curried function: takes arguments one at a time
const multiply = a => b => a * b;
const double = multiply(2);
const triple = multiply(3);

console.log('double(5):', double(5)); // 10
console.log('triple(5):', triple(5)); // 15

// Practical curry example
const createGreeting = greeting => name => `${greeting}, ${name}!`;
const sayHello = createGreeting('Hello');
const sayHi = createGreeting('Hi');

console.log(sayHello('Alice')); // "Hello, Alice!"
console.log(sayHi('Bob')); // "Hi, Bob!"

// Generic curry function
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log('curriedAdd(1)(2)(3):', curriedAdd(1)(2)(3)); // 6
console.log('curriedAdd(1, 2)(3):', curriedAdd(1, 2)(3)); // 6

// BONUS: Real-World Example
console.log("\n--- Bonus: Real-World Pipeline ---");

// Process user data
const processUsers = pipe(
  users => users.filter(u => u.age >= 18),  // Filter adults
  users => users.map(u => ({                 // Transform
    ...u,
    fullName: `${u.firstName} ${u.lastName}`
  })),
  users => users.sort((a, b) => a.age - b.age) // Sort
);

const rawUsers = [
  { firstName: 'Alice', lastName: 'Johnson', age: 25 },
  { firstName: 'Bob', lastName: 'Smith', age: 17 },
  { firstName: 'Charlie', lastName: 'Brown', age: 30 }
];

console.log('Processed users:', processUsers(rawUsers));

console.log("\n✅ Exercise complete!");
console.log("\n💡 Key Takeaways:");
console.log("- compose/pipe combine functions elegantly");
console.log("- Build complex operations from simple functions");
console.log("- Reuse small functions in different combinations");
console.log("- Point-free style reduces boilerplate");
console.log("- Currying enables partial application");
console.log("- Immutability + composition = powerful pattern");
