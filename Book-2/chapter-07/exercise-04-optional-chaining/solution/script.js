// Exercise 04: Optional Chaining & Nullish Coalescing - SOLUTION

console.log("=== Exercise 4: Optional Chaining & Nullish Coalescing ===\n");

// Task 1: Basic Optional Chaining
console.log("--- Task 1: Safe Property Access ---");
const user1 = { name: 'Alice', address: { city: 'NYC', zip: '10001' } };
const user2 = { name: 'Bob' };
const user3 = null;

// ?. stops evaluation if left side is null/undefined
console.log(user1?.address?.city); // 'NYC'
console.log(user2?.address?.city); // undefined (address doesn't exist)
console.log(user3?.address?.city); // undefined (user3 is null)

// Task 2: Optional Method Calls
console.log("\n--- Task 2: Safe Method Calls ---");
const userA = {
  name: 'Alice',
  getGreeting() { return `Hello, ${this.name}!`; }
};
const userB = { name: 'Bob' };

// ?.() calls method only if it exists
console.log(userA.getGreeting?.()); // 'Hello, Alice!'
console.log(userB.getGreeting?.()); // undefined (method doesn't exist)

// Task 3: Nullish Coalescing
console.log("\n--- Task 3: Nullish Coalescing ---");
const config = {
  host: 'localhost',
  port: null,
  debug: false
};

// ?? only returns right side if left is null/undefined
const host = config.host ?? '0.0.0.0';
const port = config.port ?? 3000;
const debug = config.debug ?? true;

console.log(`Host: ${host}`); // 'localhost' (exists)
console.log(`Port: ${port}`); // 3000 (null becomes default)
console.log(`Debug: ${debug}`); // false (exists, even though falsy!)

// Task 4: ?? vs ||
console.log("\n--- Task 4: ?? vs || ---");
const value1 = 0;
const value2 = '';
const value3 = false;
const value4 = null;

console.log("Using ||:");
console.log(value1 || 'default'); // 'default' (0 is falsy)
console.log(value2 || 'default'); // 'default' ('' is falsy)
console.log(value3 || 'default'); // 'default' (false is falsy)
console.log(value4 || 'default'); // 'default' (null is falsy)

console.log("\nUsing ??:");
console.log(value1 ?? 'default'); // 0 (not null/undefined)
console.log(value2 ?? 'default'); // '' (not null/undefined)
console.log(value3 ?? 'default'); // false (not null/undefined)
console.log(value4 ?? 'default'); // 'default' (null!)

// Real-World Example
console.log("\n--- Real-World: API Response ---");
const apiResponse = {
  user: {
    profile: {
      name: 'Alice',
      settings: { theme: 'dark' }
    }
  }
};

const theme = apiResponse?.user?.profile?.settings?.theme ?? 'light';
console.log(`Theme: ${theme}`); // 'dark'

const emptyResponse = {};
const fallbackTheme = emptyResponse?.user?.profile?.settings?.theme ?? 'light';
console.log(`Fallback theme: ${fallbackTheme}`); // 'light'

console.log("\n✅ Exercise complete!");
console.log("\n💡 Key Takeaways:");
console.log("- ?. prevents crashes from null/undefined");
console.log("- ?.() for safe method calls");
console.log("- ?? only considers null/undefined as 'missing'");
console.log("- || considers all falsy values as 'missing'");
console.log("- Combine both for bulletproof code!");
