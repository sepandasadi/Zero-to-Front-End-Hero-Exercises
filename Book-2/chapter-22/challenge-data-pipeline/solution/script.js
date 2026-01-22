// Challenge: Functional Data Pipeline Library - SOLUTION

console.log("=== Functional Data Pipeline Library ===\n");

// Core Transformers (curried for composition)
const map = fn => arr => arr.map(fn);
const filter = predicate => arr => arr.filter(predicate);
const reduce = (reducer, initial) => arr => arr.reduce(reducer, initial);
const take = n => arr => arr.slice(0, n);
const skip = n => arr => arr.slice(n);
const uniq = () => arr => [...new Set(arr)];
const sortBy = key => arr => [...arr].sort((a, b) => {
  if (a[key] < b[key]) return -1;
  if (a[key] > b[key]) return 1;
  return 0;
});

// Combinators
const pipe = (...fns) => x => fns.reduce((value, fn) => fn(value), x);
const compose = (...fns) => x => fns.reduceRight((value, fn) => fn(value), x);

// Utilities
const prop = key => obj => obj[key];
const pluck = key => arr => arr.map(item => item[key]);
const groupBy = key => arr => arr.reduce((acc, item) => {
  const group = item[key];
  if (!acc[group]) acc[group] = [];
  acc[group].push(item);
  return acc;
}, {});
const keyBy = key => arr => arr.reduce((acc, item) => {
  acc[item[key]] = item;
  return acc;
}, {});

// Demo Data
const users = [
  { name: 'Alice', age: 25, city: 'NYC', active: true, score: 85 },
  { name: 'Bob', age: 30, city: 'LA', active: false, score: 92 },
  { name: 'Charlie', age: 25, city: 'NYC', active: true, score: 78 },
  { name: 'Diana', age: 28, city: 'NYC', active: true, score: 95 },
  { name: 'Eve', age: 22, city: 'LA', active: false, score: 80 }
];

// Example 1: Active users from NYC
console.log("--- Example 1: Active NYC Users ---");
const activeNYCUsers = pipe(
  filter(u => u.active),
  filter(u => u.city === 'NYC'),
  sortBy('name'),
  pluck('name')
)(users);
console.log(activeNYCUsers);

// Example 2: Top 3 scores
console.log("\n--- Example 2: Top 3 Scores ---");
const top3 = pipe(
  sortBy('score'),
  arr => [...arr].reverse(),
  take(3),
  pluck('name')
)(users);
console.log(top3);

// Example 3: Average age by city
console.log("\n--- Example 3: Average Age by City ---");
const avgAgeByCity = pipe(
  groupBy('city'),
  groups => Object.entries(groups).map(([city, users]) => ({
    city,
    avgAge: users.reduce((sum, u) => sum + u.age, 0) / users.length
  }))
)(users);
console.log(avgAgeByCity);

// Example 4: Complex pipeline
console.log("\n--- Example 4: Complex Pipeline ---");
const result = pipe(
  filter(u => u.active),
  filter(u => u.score >= 80),
  sortBy('score'),
  arr => [...arr].reverse(),
  map(u => ({ ...u, grade: u.score >= 90 ? 'A' : 'B' })),
  take(2)
)(users);
console.log(result);

// Example 5: Unique cities
console.log("\n--- Example 5: Unique Cities ---");
const cities = pipe(
  pluck('city'),
  uniq()
)(users);
console.log(cities);

// Example 6: Index by name
console.log("\n--- Example 6: Index by Name ---");
const usersByName = keyBy('name')(users);
console.log('Alice:', usersByName['Alice']);

// Bonus: Transducer pattern (advanced)
console.log("\n--- Bonus: Performance ---");

const largeData = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  value: Math.random() * 100,
  active: Math.random() > 0.5
}));

console.time('Pipeline');
const processed = pipe(
  filter(item => item.active),
  filter(item => item.value > 50),
  map(item => ({ ...item, doubled: item.value * 2 })),
  take(10)
)(largeData);
console.timeEnd('Pipeline');
console.log('Processed:', processed.length, 'items');

console.log("\n✅ Challenge complete!");
console.log("\n🏆 Library Features:");
console.log("- ✅ All functions are pure");
console.log("- ✅ Curried for easy composition");
console.log("- ✅ Reusable and composable");
console.log("- ✅ Works with pipe/compose");
console.log("- ✅ Real-world examples");
console.log("\n💡 This pattern is used in libraries like:");
console.log("- Ramda, Lodash/FP, RxJS, etc.");
