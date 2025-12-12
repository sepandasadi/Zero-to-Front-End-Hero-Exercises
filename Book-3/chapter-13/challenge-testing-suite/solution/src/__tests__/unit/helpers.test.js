import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  formatDate,
  generateId,
  debounce,
  filterTodos,
  getTodoStats,
} from '../../utils/helpers';

describe('Helper Utils - Unit Tests', () => {
  describe('formatDate', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-01-15T12:00:00.000Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('returns "just now" for very recent dates', () => {
      const now = new Date();
      expect(formatDate(now)).toBe('just now');
    });

    it('returns minutes for recent dates', () => {
      const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
      expect(formatDate(fiveMinsAgo)).toBe('5 minutes ago');
    });

    it('returns hours for dates within 24 hours', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
      expect(formatDate(twoHoursAgo)).toBe('2 hours ago');
    });

    it('returns days for dates within a week', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
      expect(formatDate(threeDaysAgo)).toBe('3 days ago');
    });

    it('returns formatted date for older dates', () => {
      const longAgo = new Date('2023-01-01T12:00:00.000Z');
      const formatted = formatDate(longAgo);
      expect(formatted).toContain('2023');
    });

    it('handles string dates', () => {
      const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      expect(formatDate(fiveMinsAgo)).toBe('5 minutes ago');
    });

    it('returns empty string for invalid dates', () => {
      expect(formatDate('')).toBe('');
      expect(formatDate(null)).toBe('');
      expect(formatDate('invalid')).toBe('');
    });

    it('handles singular time units correctly', () => {
      const oneMinAgo = new Date(Date.now() - 1 * 60 * 1000);
      expect(formatDate(oneMinAgo)).toBe('1 minute ago');

      const oneHourAgo = new Date(Date.now() - 1 * 60 * 60 * 1000);
      expect(formatDate(oneHourAgo)).toBe('1 hour ago');

      const oneDayAgo = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
      expect(formatDate(oneDayAgo)).toBe('1 day ago');
    });
  });

  describe('generateId', () => {
    it('generates a unique ID', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });

    it('returns a number', () => {
      const id = generateId();
      expect(typeof id).toBe('number');
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('delays function execution', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 300);

      debouncedFunc();
      expect(func).not.toHaveBeenCalled();

      vi.advanceTimersByTime(300);
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('only executes once for multiple rapid calls', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 300);

      debouncedFunc();
      debouncedFunc();
      debouncedFunc();

      vi.advanceTimersByTime(300);
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('passes arguments to debounced function', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 300);

      debouncedFunc('arg1', 'arg2');
      vi.advanceTimersByTime(300);

      expect(func).toHaveBeenCalledWith('arg1', 'arg2');
    });
  });

  describe('filterTodos', () => {
    const mockTodos = [
      { id: 1, text: 'Buy milk', completed: false },
      { id: 2, text: 'Walk dog', completed: true },
      { id: 3, text: 'Buy groceries', completed: false },
    ];

    it('returns all todos with "all" filter', () => {
      const result = filterTodos(mockTodos, 'all', '');
      expect(result).toHaveLength(3);
    });

    it('returns only active todos with "active" filter', () => {
      const result = filterTodos(mockTodos, 'active', '');
      expect(result).toHaveLength(2);
      expect(result.every(todo => !todo.completed)).toBe(true);
    });

    it('returns only completed todos with "completed" filter', () => {
      const result = filterTodos(mockTodos, 'completed', '');
      expect(result).toHaveLength(1);
      expect(result.every(todo => todo.completed)).toBe(true);
    });

    it('filters by search query', () => {
      const result = filterTodos(mockTodos, 'all', 'buy');
      expect(result).toHaveLength(2);
    });

    it('combines filter and search', () => {
      const result = filterTodos(mockTodos, 'active', 'buy');
      expect(result).toHaveLength(2);
      expect(result.every(todo => !todo.completed)).toBe(true);
    });

    it('is case-insensitive for search', () => {
      const result = filterTodos(mockTodos, 'all', 'BUY');
      expect(result).toHaveLength(2);
    });

    it('handles empty todos array', () => {
      const result = filterTodos([], 'all', '');
      expect(result).toEqual([]);
    });

    it('handles invalid input gracefully', () => {
      expect(filterTodos(null, 'all', '')).toEqual([]);
      expect(filterTodos(undefined, 'all', '')).toEqual([]);
    });
  });

  describe('getTodoStats', () => {
    it('calculates correct stats', () => {
      const todos = [
        { id: 1, completed: false },
        { id: 2, completed: true },
        { id: 3, completed: false },
      ];

      const stats = getTodoStats(todos);
      expect(stats.total).toBe(3);
      expect(stats.active).toBe(2);
      expect(stats.completed).toBe(1);
    });

    it('handles empty array', () => {
      const stats = getTodoStats([]);
      expect(stats.total).toBe(0);
      expect(stats.active).toBe(0);
      expect(stats.completed).toBe(0);
    });

    it('handles all completed todos', () => {
      const todos = [
        { id: 1, completed: true },
        { id: 2, completed: true },
      ];

      const stats = getTodoStats(todos);
      expect(stats.total).toBe(2);
      expect(stats.active).toBe(0);
      expect(stats.completed).toBe(2);
    });

    it('handles invalid input', () => {
      expect(getTodoStats(null)).toEqual({ total: 0, active: 0, completed: 0 });
      expect(getTodoStats(undefined)).toEqual({ total: 0, active: 0, completed: 0 });
    });
  });
});

