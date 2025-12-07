import { describe, it, expect } from 'vitest';
import { sum, average, clamp, percentage } from '../utils/math-utils.js';

describe('Math Utilities', () => {
  describe('sum', () => {
    it('sums an array of positive numbers', () => {
      expect(sum([1, 2, 3, 4, 5])).toBe(15);
      expect(sum([10, 20, 30])).toBe(60);
    });

    it('sums negative numbers', () => {
      expect(sum([-1, -2, -3])).toBe(-6);
      expect(sum([-10, -20])).toBe(-30);
    });

    it('handles empty array', () => {
      expect(sum([])).toBe(0);
    });

    it('handles single element', () => {
      expect(sum([5])).toBe(5);
      expect(sum([42])).toBe(42);
    });

    it('handles mixed positive and negative numbers', () => {
      expect(sum([10, -5, 3])).toBe(8);
      expect(sum([100, -50, -25, 25])).toBe(50);
    });

    it('handles zero values', () => {
      expect(sum([0, 0, 0])).toBe(0);
      expect(sum([1, 0, -1])).toBe(0);
    });

    it('handles floating point numbers', () => {
      expect(sum([1.5, 2.5, 3.5])).toBeCloseTo(7.5);
    });

    it('handles non-array input', () => {
      expect(sum(null)).toBe(0);
      expect(sum(undefined)).toBe(0);
      expect(sum('not an array')).toBe(0);
    });
  });

  describe('average', () => {
    it('calculates average of integers', () => {
      expect(average([1, 2, 3])).toBe(2);
      expect(average([10, 20, 30])).toBe(20);
    });

    it('calculates average with floating point', () => {
      expect(average([1, 2, 3, 4])).toBeCloseTo(2.5);
      expect(average([1.5, 2.5, 3.5])).toBeCloseTo(2.5);
    });

    it('handles empty array', () => {
      expect(average([])).toBe(0);
    });

    it('handles single element', () => {
      expect(average([5])).toBe(5);
      expect(average([42])).toBe(42);
    });

    it('handles negative numbers', () => {
      expect(average([-1, -2, -3])).toBe(-2);
      expect(average([-10, 10])).toBe(0);
    });

    it('handles large numbers', () => {
      expect(average([1000, 2000, 3000])).toBe(2000);
    });

    it('handles non-array input', () => {
      expect(average(null)).toBe(0);
      expect(average(undefined)).toBe(0);
    });

    it('calculates correct average for mixed values', () => {
      expect(average([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(5.5);
    });
  });

  describe('clamp', () => {
    it('returns value when within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(7, 1, 20)).toBe(7);
    });

    it('returns min when value is below range', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(1, 5, 20)).toBe(5);
    });

    it('returns max when value is above range', () => {
      expect(clamp(15, 0, 10)).toBe(10);
      expect(clamp(100, 0, 50)).toBe(50);
    });

    it('handles value equal to min', () => {
      expect(clamp(0, 0, 10)).toBe(0);
      expect(clamp(5, 5, 10)).toBe(5);
    });

    it('handles value equal to max', () => {
      expect(clamp(10, 0, 10)).toBe(10);
      expect(clamp(20, 5, 20)).toBe(20);
    });

    it('handles negative ranges', () => {
      expect(clamp(-5, -10, -1)).toBe(-5);
      expect(clamp(-15, -10, -1)).toBe(-10);
      expect(clamp(0, -10, -1)).toBe(-1);
    });

    it('handles floating point values', () => {
      expect(clamp(5.5, 0, 10)).toBeCloseTo(5.5);
      expect(clamp(10.5, 0, 10)).toBeCloseTo(10);
    });

    it('handles edge case where min equals max', () => {
      expect(clamp(5, 10, 10)).toBe(10);
      expect(clamp(15, 10, 10)).toBe(10);
    });
  });

  describe('percentage', () => {
    it('calculates percentage correctly', () => {
      expect(percentage(25, 100)).toBe(25);
      expect(percentage(50, 200)).toBe(25);
    });

    it('handles division by zero', () => {
      expect(percentage(10, 0)).toBe(0);
      expect(percentage(100, 0)).toBe(0);
    });

    it('handles zero value', () => {
      expect(percentage(0, 100)).toBe(0);
    });

    it('handles floating point results', () => {
      expect(percentage(1, 3)).toBeCloseTo(33.333333);
      expect(percentage(2, 3)).toBeCloseTo(66.666666);
    });

    it('handles values greater than total', () => {
      expect(percentage(150, 100)).toBe(150);
      expect(percentage(200, 50)).toBe(400);
    });

    it('handles negative values', () => {
      expect(percentage(-25, 100)).toBe(-25);
      expect(percentage(25, -100)).toBe(-25);
    });

    it('handles 100 percent', () => {
      expect(percentage(100, 100)).toBe(100);
    });

    it('handles small percentages', () => {
      expect(percentage(1, 1000)).toBeCloseTo(0.1);
    });
  });
});

