// functions.test.js - SOLUTION

const {
  capitalize,
  reverseString,
  isPalindrome,
  countVowels,
  getUniqueValues,
  groupByProperty
} = require('./functions');

describe('String Functions', () => {
  describe('capitalize', () => {
    test('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });
    
    test('handles empty string', () => {
      expect(capitalize('')).toBe('');
    });
    
    test('handles single character', () => {
      expect(capitalize('a')).toBe('A');
    });
    
    test('lowercases rest of string', () => {
      expect(capitalize('hELLO')).toBe('Hello');
    });
  });
  
  describe('reverseString', () => {
    test('reverses string', () => {
      expect(reverseString('hello')).toBe('olleh');
    });
    
    test('handles palindrome', () => {
      expect(reverseString('racecar')).toBe('racecar');
    });
    
    test('handles empty string', () => {
      expect(reverseString('')).toBe('');
    });
  });
  
  describe('isPalindrome', () => {
    test('detects palindrome', () => {
      expect(isPalindrome('racecar')).toBe(true);
      expect(isPalindrome('A man a plan a canal Panama')).toBe(true);
    });
    
    test('detects non-palindrome', () => {
      expect(isPalindrome('hello')).toBe(false);
    });
    
    test('handles empty string', () => {
      expect(isPalindrome('')).toBe(true);
    });
  });
  
  describe('countVowels', () => {
    test('counts vowels correctly', () => {
      expect(countVowels('hello')).toBe(2);
      expect(countVowels('AEIOU')).toBe(5);
    });
    
    test('handles no vowels', () => {
      expect(countVowels('xyz')).toBe(0);
    });
    
    test('handles empty string', () => {
      expect(countVowels('')).toBe(0);
    });
  });
});

describe('Array Functions', () => {
  describe('getUniqueValues', () => {
    test('removes duplicates', () => {
      expect(getUniqueValues([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
    });
    
    test('handles empty array', () => {
      expect(getUniqueValues([])).toEqual([]);
    });
    
    test('handles all unique', () => {
      expect(getUniqueValues([1, 2, 3])).toEqual([1, 2, 3]);
    });
  });
  
  describe('groupByProperty', () => {
    const users = [
      { name: 'Alice', role: 'admin' },
      { name: 'Bob', role: 'user' },
      { name: 'Charlie', role: 'admin' }
    ];
    
    test('groups by property', () => {
      const result = groupByProperty(users, 'role');
      expect(result).toEqual({
        admin: [
          { name: 'Alice', role: 'admin' },
          { name: 'Charlie', role: 'admin' }
        ],
        user: [
          { name: 'Bob', role: 'user' }
        ]
      });
    });
    
    test('handles empty array', () => {
      expect(groupByProperty([], 'role')).toEqual({});
    });
  });
});

// Parameterized tests
describe('Parameterized Tests', () => {
  test.each([
    ['hello', 'Hello'],
    ['world', 'World'],
    ['', '']
  ])('capitalize(%s) returns %s', (input, expected) => {
    expect(capitalize(input)).toBe(expected);
  });
  
  test.each([
    [[1, 2, 2, 3], [1, 2, 3]],
    [[1, 1, 1], [1]],
    [[], []]
  ])('getUniqueValues(%j) returns %j', (input, expected) => {
    expect(getUniqueValues(input)).toEqual(expected);
  });
});
