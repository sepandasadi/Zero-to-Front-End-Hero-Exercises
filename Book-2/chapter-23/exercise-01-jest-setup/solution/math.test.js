// math.test.js - SOLUTION

const { add, subtract, multiply, divide } = require('./math');

// Organized tests using describe blocks
describe('Calculator', () => {
  
  describe('add', () => {
    test('adds positive numbers', () => {
      expect(add(2, 3)).toBe(5);
      expect(add(10, 20)).toBe(30);
    });
    
    test('adds negative numbers', () => {
      expect(add(-1, -1)).toBe(-2);
      expect(add(-5, 3)).toBe(-2);
    });
    
    test('adds with zero', () => {
      expect(add(0, 5)).toBe(5);
      expect(add(5, 0)).toBe(5);
      expect(add(0, 0)).toBe(0);
    });
    
    test('adds decimal numbers', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3); // Use toBeCloseTo for floats
      expect(add(1.5, 2.5)).toBe(4);
    });
  });
  
  describe('subtract', () => {
    test('subtracts positive numbers', () => {
      expect(subtract(10, 3)).toBe(7);
      expect(subtract(5, 2)).toBe(3);
    });
    
    test('subtracts negative numbers', () => {
      expect(subtract(-5, -3)).toBe(-2);
      expect(subtract(-10, 5)).toBe(-15);
    });
    
    test('subtracts with zero', () => {
      expect(subtract(5, 0)).toBe(5);
      expect(subtract(0, 5)).toBe(-5);
    });
  });
  
  describe('multiply', () => {
    test('multiplies positive numbers', () => {
      expect(multiply(2, 3)).toBe(6);
      expect(multiply(5, 4)).toBe(20);
    });
    
    test('multiplies with zero', () => {
      expect(multiply(5, 0)).toBe(0);
      expect(multiply(0, 10)).toBe(0);
    });
    
    test('multiplies negative numbers', () => {
      expect(multiply(-2, 3)).toBe(-6);
      expect(multiply(-2, -3)).toBe(6);
    });
  });
  
  describe('divide', () => {
    test('divides positive numbers', () => {
      expect(divide(10, 2)).toBe(5);
      expect(divide(15, 3)).toBe(5);
    });
    
    test('divides with decimals', () => {
      expect(divide(10, 4)).toBe(2.5);
      expect(divide(7, 2)).toBe(3.5);
    });
    
    test('divides negative numbers', () => {
      expect(divide(-10, 2)).toBe(-5);
      expect(divide(-10, -2)).toBe(5);
    });
    
    test('throws error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow();
      expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
    });
  });
});

// Alternative: Simple tests without describe blocks
test('calculator adds correctly', () => {
  expect(add(1, 1)).toBe(2);
});

test('calculator subtracts correctly', () => {
  expect(subtract(5, 3)).toBe(2);
});

// Common matchers demonstration
describe('Jest Matchers', () => {
  test('toBe for primitives', () => {
    expect(2 + 2).toBe(4);
    expect('hello').toBe('hello');
  });
  
  test('toEqual for objects/arrays', () => {
    const obj = { name: 'Alice', age: 25 };
    expect(obj).toEqual({ name: 'Alice', age: 25 });
    expect([1, 2, 3]).toEqual([1, 2, 3]);
  });
  
  test('truthiness', () => {
    expect(true).toBeTruthy();
    expect(1).toBeTruthy();
    expect('hello').toBeTruthy();
    
    expect(false).toBeFalsy();
    expect(0).toBeFalsy();
    expect('').toBeFalsy();
    expect(null).toBeFalsy();
  });
  
  test('numbers', () => {
    expect(10).toBeGreaterThan(5);
    expect(5).toBeLessThan(10);
    expect(5).toBeGreaterThanOrEqual(5);
    expect(5).toBeLessThanOrEqual(5);
  });
  
  test('arrays', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toContain(3);
    expect(numbers).toHaveLength(5);
  });
  
  test('strings', () => {
    expect('Hello World').toMatch(/World/);
    expect('JavaScript').toContain('Script');
  });
});

// Edge cases
describe('Edge Cases', () => {
  test('handles very large numbers', () => {
    expect(add(1000000, 2000000)).toBe(3000000);
  });
  
  test('handles very small numbers', () => {
    expect(add(0.0001, 0.0002)).toBeCloseTo(0.0003);
  });
  
  test('handles negative zero', () => {
    expect(add(-0, 0)).toBe(0);
  });
});
