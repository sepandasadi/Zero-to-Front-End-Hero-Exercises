// Chapter 29 Exercises: Advanced Concepts (Answers)

// === Closures ===

// Exercise 1: Closure Counter
function makeCounter() {
  let count = 0;
  return function () {
    count += 1;
    console.log(count);
    return count;
  };
}
const counterA = makeCounter();
counterA(); // 1
counterA(); // 2
counterA(); // 3

// Exercise 2: Closure Factory
function makePrefixer(prefix) {
  return function (str) {
    return prefix + str;
  };
}
const pre = makePrefixer("dev-");
console.log(pre("tools")); // "dev-tools"

// Exercise 3: Closures with Timers
for (let i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Alternative using IIFE and var:
for (var j = 1; j <= 3; j++) {
  (function(n) {
    setTimeout(() => console.log(n), 0);
  })(j);
}

// === Higher-Order Functions ===

// Exercise 4: Function as Argument
function runNTimes(fn, n) {
  for (let i = 0; i < n; i++) fn(i);
}
runNTimes((i) => console.log("run", i), 3);

// Exercise 5: Return a Function
function powerOf(exp) {
  return function (n) {
    return n ** exp;
  };
}
const square = powerOf(2);
console.log(square(5)); // 25

// Exercise 6: Array HOFs
const nums = [1, 2, 3, 4, 5];
const squares = nums.map(n => n * n);
const evens = nums.filter(n => n % 2 === 0);
const sum = nums.reduce((acc, n) => acc + n, 0);
console.log("squares:", squares);
console.log("evens:", evens);
console.log("sum:", sum);

// === Prototypes and Inheritance ===

// Exercise 7: Constructor + Prototype Method
function Book(title, author) {
  this.title = title;
  this.author = author;
}
Book.prototype.describe = function () {
  console.log(this.title + " by " + this.author);
};
const b1 = new Book("Eloquent JavaScript", "Marijn Haverbeke");
b1.describe();

// Exercise 8: Prototype Chain Check
const b2 = new Book("You Don't Know JS", "Kyle Simpson");
console.log(Object.getPrototypeOf(b1) === Book.prototype); // true
console.log(Object.getPrototypeOf(b2) === Book.prototype); // true
console.log(Object.getPrototypeOf(Book.prototype) === Object.prototype); // true

// Exercise 9: ES6 Class Inheritance
class Shape {
  area() { return 0; }
}
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  area() {
    return this.width * this.height;
  }
}
const rect = new Rectangle(5, 4);
console.log(rect.area()); // 20

// === The `this` Keyword in Different Contexts ===

// Exercise 10: Method vs Loose Function
const user = {
  name: "Lily",
  show() {
    console.log(this.name);
  }
};
user.show(); // "Lily"
const loose = user.show;
loose(); // undefined (or window.name in non-strict; often undefined)
const boundShow = user.show.bind(user);
boundShow(); // "Lily"

// Exercise 11: call/apply/bind
function introduce() {
  console.log("I am " + this.name);
}
introduce.call({ name: "Ali" });           // "I am Ali"
introduce.apply({ name: "Sara" });         // "I am Sara"
const introTom = introduce.bind({ name: "Tom" });
introTom();                                // "I am Tom"

// Exercise 12: Arrow Functions and `this`
const timer = {
  label: "FastTimer",
  startWithBind() {
    setTimeout(function () {
      console.log(this.label);
    }.bind(this), 0);
  },
  startWithArrow() {
    setTimeout(() => {
      console.log(this.label);
    }, 0);
  }
};
timer.startWithBind();  // "FastTimer"
timer.startWithArrow(); // "FastTimer"

// === Lexical Scope and Hoisting ===

// Exercise 13: Lexical Scope
function outerMost() {
  const secret = "token-123";
  function mid() {
    function inner() {
      console.log(secret);
    }
    inner();
  }
  mid();
}
outerMost(); // "token-123"

// Exercise 14: Hoisting Comparison
try {
  console.log(v); // undefined (var is hoisted, initialized to undefined)
} catch (e) {
  console.log("unexpected:", e.message);
}
var v = 42;

try {
  console.log(l); // ReferenceError (let is hoisted but in TDZ)
} catch (e) {
  console.log("ReferenceError as expected");
}
let l = 7;

// Exercise 15: Function Declaration vs Expression Hoisting
hoistedDecl(); // works
function hoistedDecl() {
  console.log("declaration ok");
}

try {
  notHoistedExpr(); // TypeError or ReferenceError depending on environment
} catch (e) {
  console.log("cannot call function expression before initialization");
}
var notHoistedExpr = function () {
  console.log("expression later");
};
