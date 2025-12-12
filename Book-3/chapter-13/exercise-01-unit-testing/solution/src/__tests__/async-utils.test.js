import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  fetchUser,
  delay,
  retryOperation,
  fetchWithTimeout,
} from '../utils/async-utils.js';

describe('Async Utilities', () => {
  describe('fetchUser', () => {
    it('fetches user successfully by ID', async () => {
      const user = await fetchUser(1);

      expect(user).toBeDefined();
      expect(user).toHaveProperty('id', 1);
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
    });

    it('returns correct user data', async () => {
      const user1 = await fetchUser(1);
      expect(user1.name).toBe('John Doe');
      expect(user1.email).toBe('john@example.com');

      const user2 = await fetchUser(2);
      expect(user2.name).toBe('Jane Smith');
      expect(user2.email).toBe('jane@example.com');
    });

    it('throws error for invalid user ID (negative)', async () => {
      await expect(fetchUser(-1)).rejects.toThrow('Invalid user ID');
      await expect(fetchUser(-999)).rejects.toThrow('Invalid user ID');
    });

    it('throws error for invalid user ID (zero)', async () => {
      await expect(fetchUser(0)).rejects.toThrow('Invalid user ID');
    });

    it('throws error for non-existent user', async () => {
      await expect(fetchUser(9999)).rejects.toThrow('User not found');
      await expect(fetchUser(100)).rejects.toThrow('User not found');
    });

    it('throws error for non-number ID', async () => {
      await expect(fetchUser('1')).rejects.toThrow('Invalid user ID');
      await expect(fetchUser(null)).rejects.toThrow('Invalid user ID');
    });

    it('fetches all available users', async () => {
      const user1 = await fetchUser(1);
      const user2 = await fetchUser(2);
      const user3 = await fetchUser(3);

      expect(user1.id).toBe(1);
      expect(user2.id).toBe(2);
      expect(user3.id).toBe(3);
    });
  });

  describe('delay', () => {
    it('resolves after specified time', async () => {
      const start = Date.now();
      await delay(100);
      const elapsed = Date.now() - start;

      expect(elapsed).toBeGreaterThanOrEqual(95); // Some tolerance for timing
      expect(elapsed).toBeLessThan(150);
    });

    it('resolves immediately for 0ms', async () => {
      const start = Date.now();
      await delay(0);
      const elapsed = Date.now() - start;

      expect(elapsed).toBeLessThan(20);
    });

    it('returns undefined', async () => {
      const result = await delay(10);
      expect(result).toBeUndefined();
    });

    it('handles different delay values', async () => {
      const start = Date.now();
      await delay(50);
      const elapsed = Date.now() - start;

      expect(elapsed).toBeGreaterThanOrEqual(45);
    });
  });

  describe('retryOperation', () => {
    it('succeeds on first try', async () => {
      const operation = vi.fn().mockResolvedValue('success');
      const result = await retryOperation(operation, 3);

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(1);
    });

    it('retries on failure and eventually succeeds', async () => {
      const operation = vi
        .fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValueOnce('success');

      const result = await retryOperation(operation, 3);

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(3);
    });

    it('throws after max retries exceeded', async () => {
      const operation = vi.fn().mockRejectedValue(new Error('persistent failure'));

      await expect(retryOperation(operation, 3)).rejects.toThrow('persistent failure');
      expect(operation).toHaveBeenCalledTimes(3);
    });

    it('retries correct number of times', async () => {
      const operation = vi
        .fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValueOnce('success');

      await retryOperation(operation, 5);
      expect(operation).toHaveBeenCalledTimes(2);
    });

    it('uses default max retries', async () => {
      const operation = vi.fn().mockRejectedValue(new Error('fail'));

      await expect(retryOperation(operation)).rejects.toThrow('fail');
      expect(operation).toHaveBeenCalledTimes(3); // Default is 3
    });

    it('returns the correct value on retry', async () => {
      const operation = vi
        .fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValueOnce({ data: 'success' });

      const result = await retryOperation(operation, 3);
      expect(result).toEqual({ data: 'success' });
    });
  });

  describe('fetchWithTimeout', () => {
    beforeEach(() => {
      // Mock global fetch
      global.fetch = vi.fn();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('fetches successfully within timeout', async () => {
      const mockResponse = { ok: true, data: 'test' };
      global.fetch.mockResolvedValue(mockResponse);

      const result = await fetchWithTimeout('https://api.example.com/data', 5000);

      expect(result).toBe(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/data',
        expect.objectContaining({ signal: expect.any(AbortSignal) })
      );
    });

    it('throws error when timeout exceeded', async () => {
      // Mock a slow fetch that never resolves
      global.fetch.mockImplementation(() =>
        new Promise((resolve) => setTimeout(resolve, 10000))
      );

      await expect(fetchWithTimeout('https://api.example.com/slow', 100))
        .rejects.toThrow('Request timeout');
    });

    it('uses default timeout', async () => {
      const mockResponse = { ok: true };
      global.fetch.mockResolvedValue(mockResponse);

      const result = await fetchWithTimeout('https://api.example.com/data');
      expect(result).toBe(mockResponse);
    });

    it('propagates fetch errors', async () => {
      global.fetch.mockRejectedValue(new Error('Network error'));

      await expect(fetchWithTimeout('https://api.example.com/data', 5000))
        .rejects.toThrow('Network error');
    });

    it('handles abort errors correctly', async () => {
      global.fetch.mockImplementation(() => {
        const error = new Error('Aborted');
        error.name = 'AbortError';
        return Promise.reject(error);
      });

      await expect(fetchWithTimeout('https://api.example.com/data', 100))
        .rejects.toThrow('Request timeout');
    });
  });
});

