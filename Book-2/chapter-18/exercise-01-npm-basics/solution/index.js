// npm Basics - Complete Solution
const _ = require('lodash');

console.log('🚀 npm Basics Exercise - Solution\n');

// Using lodash from dependencies
const numbers = [1, 2, 3, 4, 5];
const doubled = _.map(numbers, n => n * 2);

console.log('Original numbers:', numbers);
console.log('Doubled with lodash:', doubled);

// Demonstrating semantic versioning understanding
console.log('\n📦 Semantic Versioning:');
console.log('  ^1.2.3  - Compatible with 1.x.x (minor & patch updates)');
console.log('  ~1.2.3  - Patch updates only (1.2.x)');
console.log('  1.2.3   - Exact version');

// Shuffle array using lodash
const shuffled = _.shuffle(numbers);
console.log('\n🎲 Shuffled array:', shuffled);

// Get unique values
const withDuplicates = [1, 2, 2, 3, 3, 3, 4, 5];
const unique = _.uniq(withDuplicates);
console.log('\n✨ Unique values:', unique);

console.log('\n✅ Exercise completed successfully!');
console.log('Run "npm test" to test Jest integration');
