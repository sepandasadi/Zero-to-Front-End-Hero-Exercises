// Exercise 7: Constructor + Prototype Method - SOLUTION

console.log("=== Exercise 7: Constructor + Prototype ===\n");

// Basic Solution
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  return `Hello, my name is ${this.name}`;
};

Person.prototype.introduce = function() {
  return `I'm ${this.name} and I'm ${this.age} years old`;
};

console.log("--- Creating People ---");
const alice = new Person('Alice', 25);
const bob = new Person('Bob', 30);

console.log(alice.greet());      // "Hello, my name is Alice"
console.log(bob.greet());        // "Hello, my name is Bob"
console.log(alice.introduce());  // "I'm Alice and I'm 25 years old"

console.log("\n--- Prototype Sharing ---");
console.log("Same method?", alice.greet === bob.greet);  // true
console.log("This saves memory - one method for all instances!");

console.log("\n=== Bonus Challenges ===\n");

// Bonus 1: Add haveBirthday method
console.log("--- Bonus 1: Birthday Method ---");

Person.prototype.haveBirthday = function() {
  this.age++;
  return `Happy birthday! ${this.name} is now ${this.age}`;
};

console.log(alice.haveBirthday());  // "Happy birthday! Alice is now 26"
console.log(alice.age);             // 26

// Bonus 2: Static method
console.log("\n--- Bonus 2: Static Method ---");

Person.species = function() {
  return "Homo Sapiens";
};

console.log(Person.species());  // "Homo Sapiens"
// Static methods are called on the constructor, not instances

// Bonus 3: BankAccount
console.log("\n--- Bonus 3: BankAccount ---");

function BankAccount(owner, balance = 0) {
  this.owner = owner;
  this.balance = balance;
  this.transactions = [];
}

BankAccount.prototype.deposit = function(amount) {
  if (amount <= 0) {
    return "Amount must be positive";
  }
  this.balance += amount;
  this.transactions.push({ type: 'deposit', amount, date: new Date() });
  return `Deposited $${amount}. New balance: $${this.balance}`;
};

BankAccount.prototype.withdraw = function(amount) {
  if (amount <= 0) {
    return "Amount must be positive";
  }
  if (amount > this.balance) {
    return "Insufficient funds";
  }
  this.balance -= amount;
  this.transactions.push({ type: 'withdrawal', amount, date: new Date() });
  return `Withdrew $${amount}. New balance: $${this.balance}`;
};

BankAccount.prototype.getBalance = function() {
  return `${this.owner}'s balance: $${this.balance}`;
};

BankAccount.prototype.getStatement = function() {
  console.log(`\nAccount Statement for ${this.owner}:`);
  console.log(`Current Balance: $${this.balance}`);
  console.log('\nRecent Transactions:');
  this.transactions.slice(-5).forEach((tx, i) => {
    console.log(`  ${i + 1}. ${tx.type}: $${tx.amount}`);
  });
};

const account1 = new BankAccount('Alice', 1000);
const account2 = new BankAccount('Bob', 500);

console.log(account1.deposit(500));    // "Deposited $500. New balance: $1500"
console.log(account1.withdraw(200));   // "Withdrew $200. New balance: $1300"
console.log(account1.withdraw(2000));  // "Insufficient funds"
console.log(account1.getBalance());    // "Alice's balance: $1300"

console.log('\n' + account2.deposit(100));   // "Deposited $100. New balance: $600"
console.log(account2.withdraw(50));    // "Withdrew $50. New balance: $550"

account1.getStatement();

// Extra: Inheritance example
console.log("\n--- Extra: Inheritance Pattern ---");

function SavingsAccount(owner, balance, interestRate) {
  BankAccount.call(this, owner, balance);  // Call parent constructor
  this.interestRate = interestRate;
}

// Set up inheritance
SavingsAccount.prototype = Object.create(BankAccount.prototype);
SavingsAccount.prototype.constructor = SavingsAccount;

SavingsAccount.prototype.addInterest = function() {
  const interest = this.balance * (this.interestRate / 100);
  this.balance += interest;
  this.transactions.push({ type: 'interest', amount: interest, date: new Date() });
  return `Added $${interest.toFixed(2)} interest. New balance: $${this.balance.toFixed(2)}`;
};

const savings = new SavingsAccount('Charlie', 10000, 5);
console.log(savings.deposit(500));     // Inherited method works!
console.log(savings.addInterest());    // "Added $525.00 interest..."
console.log(savings.getBalance());     // "Charlie's balance: $11025.00"

console.log("\n✅ Exercise Complete!");
console.log("\n📚 Key Takeaways:");
console.log("• Constructor functions create objects with `new`");
console.log("• Properties go in the constructor");
console.log("• Methods go on the prototype (shared, memory efficient)");
console.log("• Each instance has its own properties but shares methods");
console.log("• This is how JavaScript worked before ES6 classes!");

