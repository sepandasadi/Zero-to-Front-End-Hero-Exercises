// Exercise 05: Map and Set - SOLUTION

console.log("=== Exercise 5: Map and Set ===\n");

// Task 1: Basic Map Operations
console.log("--- Task 1: Map Operations ---");
const users = new Map();

// set(key, value) adds or updates
users.set(1, { id: 1, name: 'Alice' });
users.set(2, { id: 2, name: 'Bob' });
users.set(3, { id: 3, name: 'Charlie' });

// get(key) retrieves value
console.log('User 1:', users.get(1));

// has(key) checks existence
console.log('Has user 2?', users.has(2));
console.log('Has user 99?', users.has(99));

// delete(key) removes entry
users.delete(3);
console.log('After delete, has user 3?', users.has(3));

// size property
console.log('Map size:', users.size);

// Task 2: Map vs Object Keys
console.log("\n--- Task 2: Any Type as Key ---");
const specialMap = new Map();

// Objects can use ANY type as key!
const objKey = { id: 1 };
const numKey = 42;
const funcKey = () => 'hello';

specialMap.set(objKey, 'Value for object key');
specialMap.set(numKey, 'Value for number key');
specialMap.set(funcKey, 'Value for function key');

console.log('Using object as key:', specialMap.get(objKey));
console.log('Using number as key:', specialMap.get(numKey));
console.log('Using function as key:', specialMap.get(funcKey));

// Objects convert all keys to strings!
const regularObj = {};
regularObj[objKey] = 'test'; // key becomes "[object Object]"
console.log('Object keys are stringified:', Object.keys(regularObj));

// Task 3: Basic Set Operations
console.log("\n--- Task 3: Set Operations ---");
const tags = new Set();

// add() adds values
tags.add('javascript');
tags.add('web');
tags.add('tutorial');
tags.add('javascript'); // Duplicate - ignored!

console.log('Set size:', tags.size); // 3, not 4!
console.log('Has "web"?', tags.has('web'));
console.log('Set contents:', [...tags]);

// delete() removes value
tags.delete('tutorial');
console.log('After delete:', [...tags]);

// Task 4: Array Deduplication
console.log("\n--- Task 4: Deduplication ---");
const numbers = [1, 2, 2, 3, 4, 4, 5, 1];

// Set constructor accepts iterable (array)
// Spread converts Set back to array
const unique = [...new Set(numbers)];
console.log('Original:', numbers);
console.log('Unique:', unique);

// Task 5: Set Operations
console.log("\n--- Task 5: Set Math Operations ---");
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Union: all values from both
const union = new Set([...setA, ...setB]);
console.log('Union:', [...union]); // [1, 2, 3, 4, 5, 6]

// Intersection: values in both
const intersection = new Set(
  [...setA].filter(x => setB.has(x))
);
console.log('Intersection:', [...intersection]); // [3, 4]

// Difference: in A but not in B
const difference = new Set(
  [...setA].filter(x => !setB.has(x))
);
console.log('Difference:', [...difference]); // [1, 2]

// Real-World Example
console.log("\n--- Real-World: Shopping Cart ---");
class Cart {
  constructor() {
    this.items = new Map(); // productId -> {product, quantity}
    this.favorites = new Set();
  }
  
  addItem(product, quantity = 1) {
    if (this.items.has(product.id)) {
      const existing = this.items.get(product.id);
      existing.quantity += quantity;
    } else {
      this.items.set(product.id, { product, quantity });
    }
  }
  
  getTotal() {
    let total = 0;
    for (const { product, quantity } of this.items.values()) {
      total += product.price * quantity;
    }
    return total;
  }
  
  toggleFavorite(productId) {
    if (this.favorites.has(productId)) {
      this.favorites.delete(productId);
    } else {
      this.favorites.add(productId);
    }
  }
}

const cart = new Cart();
cart.addItem({ id: 1, name: 'Laptop', price: 999 }, 1);
cart.addItem({ id: 2, name: 'Mouse', price: 29 }, 2);
cart.toggleFavorite(1);

console.log('Cart total: $' + cart.getTotal());
console.log('Favorites:', [...cart.favorites]);

console.log("\n✅ Exercise complete!");
console.log("\n💡 Key Takeaways:");
console.log("- Maps: any key type, guaranteed order");
console.log("- Use Maps when you need non-string keys");
console.log("- Sets: automatic uniqueness");
console.log("- Sets perfect for deduplication");
console.log("- Both are iterable with for...of");
