import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Function Mocking with Vitest', () => {
  describe('vi.fn() - Mock Functions', () => {
    it('creates a mock function', () => {
      const mockFn = vi.fn();
      mockFn();

      expect(mockFn).toHaveBeenCalled();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('tracks function calls with arguments', () => {
      const mockFn = vi.fn();

      mockFn('hello', 'world');
      mockFn(42);

      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenCalledWith('hello', 'world');
      expect(mockFn).toHaveBeenNthCalledWith(2, 42);
    });

    it('can return specific values', () => {
      const mockFn = vi.fn().mockReturnValue('mocked value');

      const result = mockFn();

      expect(result).toBe('mocked value');
    });

    it('can return different values on subsequent calls', () => {
      const mockFn = vi
        .fn()
        .mockReturnValueOnce('first')
        .mockReturnValueOnce('second')
        .mockReturnValue('default');

      expect(mockFn()).toBe('first');
      expect(mockFn()).toBe('second');
      expect(mockFn()).toBe('default');
      expect(mockFn()).toBe('default');
    });

    it('can mock async functions', async () => {
      const mockFn = vi.fn().mockResolvedValue('async result');

      const result = await mockFn();

      expect(result).toBe('async result');
    });

    it('can mock rejected promises', async () => {
      const mockFn = vi.fn().mockRejectedValue(new Error('Async error'));

      await expect(mockFn()).rejects.toThrow('Async error');
    });

    it('can implement custom logic', () => {
      const mockFn = vi.fn((a, b) => a + b);

      expect(mockFn(2, 3)).toBe(5);
      expect(mockFn).toHaveBeenCalledWith(2, 3);
    });

    it('tracks all calls', () => {
      const mockFn = vi.fn();

      mockFn(1);
      mockFn(2, 3);
      mockFn(4, 5, 6);

      expect(mockFn.mock.calls).toEqual([
        [1],
        [2, 3],
        [4, 5, 6],
      ]);
    });
  });

  describe('vi.spyOn() - Spy on Methods', () => {
    let consoleLogSpy;

    beforeEach(() => {
      consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleLogSpy.mockRestore();
    });

    it('spies on console.log calls', () => {
      console.log('test message');

      expect(consoleLogSpy).toHaveBeenCalledWith('test message');
    });

    it('can spy on object methods', () => {
      const obj = {
        greet(name) {
          return `Hello, ${name}!`;
        },
      };

      const greetSpy = vi.spyOn(obj, 'greet');

      obj.greet('John');

      expect(greetSpy).toHaveBeenCalledWith('John');
      expect(greetSpy).toHaveReturnedWith('Hello, John!');

      greetSpy.mockRestore();
    });

    it('can override return values while spying', () => {
      const obj = {
        getValue() {
          return 'original';
        },
      };

      const spy = vi.spyOn(obj, 'getValue').mockReturnValue('mocked');

      expect(obj.getValue()).toBe('mocked');
      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
    });
  });

  describe('vi.useFakeTimers() - Timer Mocks', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('mocks setTimeout', () => {
      const callback = vi.fn();

      setTimeout(callback, 1000);

      expect(callback).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1000);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('mocks setInterval', () => {
      const callback = vi.fn();

      setInterval(callback, 100);

      vi.advanceTimersByTime(350);

      expect(callback).toHaveBeenCalledTimes(3);
    });

    it('can run all timers', () => {
      const callback = vi.fn();

      setTimeout(callback, 1000);
      setTimeout(callback, 2000);
      setTimeout(callback, 3000);

      vi.runAllTimers();

      expect(callback).toHaveBeenCalledTimes(3);
    });

    it('can run only pending timers', () => {
      const callback = vi.fn();

      setTimeout(() => {
        callback('first');
        setTimeout(() => callback('nested'), 100);
      }, 100);

      vi.runOnlyPendingTimers();

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('first');
    });
  });

  describe('Module Mocking', () => {
    it('can mock entire modules', async () => {
      // Mock a module
      vi.mock('./utils', () => ({
        add: vi.fn((a, b) => a + b),
        subtract: vi.fn((a, b) => a - b),
      }));

      // Would import and use the mocked module
      // const { add } = await import('./utils');
      // expect(add(2, 3)).toBe(5);
    });
  });

  describe('Date Mocking', () => {
    it('can set system time', () => {
      const mockDate = new Date('2024-01-01T00:00:00.000Z');
      vi.setSystemTime(mockDate);

      expect(new Date().toISOString()).toBe('2024-01-01T00:00:00.000Z');

      vi.useRealTimers();
    });
  });

  describe('localStorage Mocking', () => {
    let localStorageMock;

    beforeEach(() => {
      localStorageMock = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      };

      global.localStorage = localStorageMock;
    });

    it('mocks localStorage.setItem', () => {
      localStorage.setItem('key', 'value');

      expect(localStorageMock.setItem).toHaveBeenCalledWith('key', 'value');
    });

    it('mocks localStorage.getItem', () => {
      localStorageMock.getItem.mockReturnValue('stored value');

      const value = localStorage.getItem('key');

      expect(value).toBe('stored value');
      expect(localStorageMock.getItem).toHaveBeenCalledWith('key');
    });
  });

  describe('Mock Restoration', () => {
    it('restores mocks after each test', () => {
      const mockFn = vi.fn();
      mockFn();

      expect(mockFn).toHaveBeenCalledTimes(1);

      mockFn.mockClear();

      expect(mockFn).toHaveBeenCalledTimes(0);
    });

    it('resets mock return values', () => {
      const mockFn = vi.fn().mockReturnValue('first');
      expect(mockFn()).toBe('first');

      mockFn.mockReturnValue('second');
      expect(mockFn()).toBe('second');

      mockFn.mockReset();
      expect(mockFn()).toBeUndefined();
    });
  });
});

