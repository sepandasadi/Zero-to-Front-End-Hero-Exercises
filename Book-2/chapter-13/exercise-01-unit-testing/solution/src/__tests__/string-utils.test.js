import { describe, it, expect } from 'vitest';
import { capitalize, slugify, truncate, reverseString } from '../utils/string-utils.js';

describe('String Utilities', () => {
  describe('capitalize', () => {
    it('capitalizes the first letter of a lowercase string', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
    });

    it('preserves already capitalized strings', () => {
      expect(capitalize('Hello')).toBe('Hello');
      expect(capitalize('World')).toBe('World');
    });

    it('handles empty strings', () => {
      expect(capitalize('')).toBe('');
    });

    it('handles single character strings', () => {
      expect(capitalize('a')).toBe('A');
      expect(capitalize('Z')).toBe('Z');
    });

    it('handles strings with numbers', () => {
      expect(capitalize('123abc')).toBe('123abc');
    });

    it('handles null and undefined', () => {
      expect(capitalize(null)).toBe('');
      expect(capitalize(undefined)).toBe('');
    });

    it('only capitalizes the first letter', () => {
      expect(capitalize('hello world')).toBe('Hello world');
    });
  });

  describe('slugify', () => {
    it('converts spaces to hyphens', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('removes special characters', () => {
      expect(slugify('Hello@World!')).toBe('helloworld');
      expect(slugify('Test#123$')).toBe('test123');
    });

    it('converts to lowercase', () => {
      expect(slugify('HELLO')).toBe('hello');
      expect(slugify('HeLLo WoRLd')).toBe('hello-world');
    });

    it('handles multiple consecutive spaces', () => {
      expect(slugify('hello   world')).toBe('hello-world');
      expect(slugify('a  b  c')).toBe('a-b-c');
    });

    it('removes leading and trailing hyphens', () => {
      expect(slugify(' hello world ')).toBe('hello-world');
      expect(slugify('   test   ')).toBe('test');
    });

    it('handles empty strings', () => {
      expect(slugify('')).toBe('');
    });

    it('handles underscores', () => {
      expect(slugify('hello_world')).toBe('hello-world');
    });

    it('handles mixed special characters and spaces', () => {
      expect(slugify('My Awesome Post!')).toBe('my-awesome-post');
      expect(slugify('React.js & Vue.js')).toBe('reactjs-vuejs');
    });
  });

  describe('truncate', () => {
    it('does not truncate short strings', () => {
      expect(truncate('Hello', 10)).toBe('Hello');
      expect(truncate('Test', 20)).toBe('Test');
    });

    it('truncates long strings and adds ellipsis', () => {
      expect(truncate('Hello World', 8)).toBe('Hello Wo...');
      expect(truncate('This is a long string', 10)).toBe('This is a ...');
    });

    it('handles exact length strings', () => {
      expect(truncate('Hello', 5)).toBe('Hello');
      expect(truncate('Test', 4)).toBe('Test');
    });

    it('handles maxLength of 0', () => {
      expect(truncate('Hello', 0)).toBe('...');
    });

    it('handles empty strings', () => {
      expect(truncate('', 10)).toBe('');
    });

    it('handles null and undefined', () => {
      expect(truncate(null, 10)).toBe('');
      expect(truncate(undefined, 10)).toBe('');
    });

    it('adds ellipsis correctly', () => {
      const result = truncate('1234567890', 5);
      expect(result).toBe('12345...');
      expect(result.length).toBe(8); // 5 chars + '...'
    });
  });

  describe('reverseString', () => {
    it('reverses a simple string', () => {
      expect(reverseString('hello')).toBe('olleh');
      expect(reverseString('world')).toBe('dlrow');
    });

    it('handles empty strings', () => {
      expect(reverseString('')).toBe('');
    });

    it('handles single character strings', () => {
      expect(reverseString('a')).toBe('a');
    });

    it('handles palindromes', () => {
      expect(reverseString('racecar')).toBe('racecar');
      expect(reverseString('noon')).toBe('noon');
    });

    it('handles strings with spaces', () => {
      expect(reverseString('hello world')).toBe('dlrow olleh');
    });

    it('handles strings with numbers', () => {
      expect(reverseString('abc123')).toBe('321cba');
    });

    it('handles null and undefined', () => {
      expect(reverseString(null)).toBe('');
      expect(reverseString(undefined)).toBe('');
    });
  });
});

