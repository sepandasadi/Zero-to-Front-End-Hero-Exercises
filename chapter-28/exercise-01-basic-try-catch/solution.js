// Exercise 1: Basic Try/Catch - SOLUTION

function safeJSONParse(jsonString) {
  try {
    // Try to parse the JSON
    const result = JSON.parse(jsonString);
    return result;
  } catch (error) {
    // If parsing fails, handle the error gracefully
    console.error('Failed to parse JSON:', error.message);
    return null;
  }
}

// Test cases
console.log('=== Test 1: Valid JSON ===');
const test1 = safeJSONParse('{"name": "Alice", "age": 25}');
console.log('Result:', test1);
// Expected: { name: 'Alice', age: 25 }

console.log('\n=== Test 2: Invalid JSON ===');
const test2 = safeJSONParse('invalid json');
console.log('Result:', test2);
// Expected: null (with error logged)

console.log('\n=== Test 3: JSON Array ===');
const test3 = safeJSONParse('[1, 2, 3, 4, 5]');
console.log('Result:', test3);
// Expected: [1, 2, 3, 4, 5]

console.log('\n=== Test 4: Malformed JSON ===');
const test4 = safeJSONParse('{"name": "Bob"');
console.log('Result:', test4);
// Expected: null (with error logged)

// ========================================
// BONUS 1: With default value
// ========================================

function safeJSONParseWithDefault(jsonString, defaultValue = null) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to parse JSON:', error.message);
    return defaultValue;
  }
}

console.log('\n=== Bonus 1: With Default Value ===');
const bonus1 = safeJSONParseWithDefault('invalid', { error: true });
console.log('Result:', bonus1);
// Expected: { error: true }

// ========================================
// BONUS 2: With finally block
// ========================================

function safeJSONParseWithFinally(jsonString) {
  let result = null;

  try {
    result = JSON.parse(jsonString);
    console.log('✅ Parsing successful');
  } catch (error) {
    console.error('❌ Parsing failed:', error.message);
  } finally {
    console.log('🔍 Parsing attempt complete');
  }

  return result;
}

console.log('\n=== Bonus 2: With Finally Block ===');
safeJSONParseWithFinally('{"test": true}');
safeJSONParseWithFinally('invalid');

// ========================================
// BONUS 3: Safe JSON stringify (handles circular references)
// ========================================

function safeJSONStringify(obj, indent = 2) {
  try {
    return JSON.stringify(obj, null, indent);
  } catch (error) {
    if (error.message.includes('circular')) {
      console.error('Cannot stringify: Circular reference detected');

      // Remove circular references
      const seen = new WeakSet();
      return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return '[Circular Reference]';
          }
          seen.add(value);
        }
        return value;
      }, indent);
    }

    console.error('Failed to stringify:', error.message);
    return null;
  }
}

console.log('\n=== Bonus 3: Safe Stringify ===');
const circularObj = { name: 'Test' };
circularObj.self = circularObj; // Create circular reference

const stringified = safeJSONStringify(circularObj);
console.log('Result:', stringified);
// Handles circular reference gracefully


