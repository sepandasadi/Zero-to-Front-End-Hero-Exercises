// Simple test runner for JavaScript exercises

export class TestResult {
  constructor(name, passed, error = null, duration = 0) {
    this.name = name;
    this.passed = passed;
    this.error = error;
    this.duration = duration;
  }
}

export class TestRunner {
  constructor() {
    this.tests = [];
    this.results = [];
  }

  describe(suiteName, callback) {
    this.currentSuite = suiteName;
    callback();
  }

  it(testName, callback) {
    this.tests.push({
      suite: this.currentSuite,
      name: testName,
      callback,
    });
  }

  expect(actual) {
    const matchers = {
      // Strict equality
      toBe: (expected) => {
        if (actual !== expected) {
          throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
        }
      },

      // Deep equality
      toEqual: (expected) => {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
          throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
        }
      },

      // Truthiness
      toBeTruthy: () => {
        if (!actual) {
          throw new Error(`Expected truthy value but got ${JSON.stringify(actual)}`);
        }
      },
      toBeFalsy: () => {
        if (actual) {
          throw new Error(`Expected falsy value but got ${JSON.stringify(actual)}`);
        }
      },

      // Null/Undefined
      toBeNull: () => {
        if (actual !== null) {
          throw new Error(`Expected null but got ${JSON.stringify(actual)}`);
        }
      },
      toBeUndefined: () => {
        if (actual !== undefined) {
          throw new Error(`Expected undefined but got ${JSON.stringify(actual)}`);
        }
      },
      toBeDefined: () => {
        if (actual === undefined) {
          throw new Error('Expected value to be defined');
        }
      },

      // Arrays and Strings
      toContain: (expected) => {
        if (!actual || !actual.includes(expected)) {
          throw new Error(`Expected to contain ${JSON.stringify(expected)} in ${JSON.stringify(actual)}`);
        }
      },
      toHaveLength: (expected) => {
        if (!actual || actual.length !== expected) {
          throw new Error(`Expected length ${expected} but got ${actual?.length}`);
        }
      },

      // Numbers
      toBeGreaterThan: (expected) => {
        if (actual <= expected) {
          throw new Error(`Expected ${actual} to be greater than ${expected}`);
        }
      },
      toBeLessThan: (expected) => {
        if (actual >= expected) {
          throw new Error(`Expected ${actual} to be less than ${expected}`);
        }
      },
      toBeGreaterThanOrEqual: (expected) => {
        if (actual < expected) {
          throw new Error(`Expected ${actual} to be greater than or equal to ${expected}`);
        }
      },
      toBeLessThanOrEqual: (expected) => {
        if (actual > expected) {
          throw new Error(`Expected ${actual} to be less than or equal to ${expected}`);
        }
      },
      toBeCloseTo: (expected, precision = 2) => {
        const diff = Math.abs(actual - expected);
        const threshold = Math.pow(10, -precision) / 2;
        if (diff >= threshold) {
          throw new Error(`Expected ${actual} to be close to ${expected} (precision: ${precision})`);
        }
      },

      // Objects
      toHaveProperty: (key, value) => {
        if (!actual || !(key in actual)) {
          throw new Error(`Expected object to have property "${key}"`);
        }
        if (value !== undefined && actual[key] !== value) {
          throw new Error(`Expected property "${key}" to be ${JSON.stringify(value)} but got ${JSON.stringify(actual[key])}`);
        }
      },
      toMatchObject: (expected) => {
        for (const key in expected) {
          if (actual[key] !== expected[key]) {
            throw new Error(`Expected object to match. Property "${key}" is ${JSON.stringify(actual[key])} but expected ${JSON.stringify(expected[key])}`);
          }
        }
      },

      // Functions
      toThrow: (expectedError) => {
        let thrown = false;
        let error = null;
        try {
          actual();
        } catch (e) {
          thrown = true;
          error = e;
        }
        if (!thrown) {
          throw new Error('Expected function to throw an error');
        }
        if (expectedError && !error.message.includes(expectedError)) {
          throw new Error(`Expected error message to include "${expectedError}" but got "${error.message}"`);
        }
      },

      // Type checking
      toBeInstanceOf: (expected) => {
        if (!(actual instanceof expected)) {
          throw new Error(`Expected ${actual} to be instance of ${expected.name}`);
        }
      },

      // Promises (async)
      resolves: {
        toBe: async (expected) => {
          const resolved = await actual;
          if (resolved !== expected) {
            throw new Error(`Expected promise to resolve to ${JSON.stringify(expected)} but got ${JSON.stringify(resolved)}`);
          }
        },
        toEqual: async (expected) => {
          const resolved = await actual;
          if (JSON.stringify(resolved) !== JSON.stringify(expected)) {
            throw new Error(`Expected promise to resolve to ${JSON.stringify(expected)} but got ${JSON.stringify(resolved)}`);
          }
        },
      },
      rejects: {
        toThrow: async (expectedError) => {
          let thrown = false;
          let error = null;
          try {
            await actual;
          } catch (e) {
            thrown = true;
            error = e;
          }
          if (!thrown) {
            throw new Error('Expected promise to reject');
          }
          if (expectedError && !error.message.includes(expectedError)) {
            throw new Error(`Expected error message to include "${expectedError}" but got "${error.message}"`);
          }
        },
      },
    };

    // Add .not modifier
    const not = {};
    for (const [key, matcher] of Object.entries(matchers)) {
      if (typeof matcher === 'object') continue; // Skip resolves/rejects for .not
      not[key] = (...args) => {
        try {
          matcher(...args);
          throw new Error(`Expected assertion to fail`);
        } catch (e) {
          if (e.message.includes('Expected assertion to fail')) {
            throw e;
          }
          // Assertion failed as expected, so .not passes
        }
      };
    }

    matchers.not = not;
    return matchers;
  }

  async run(code) {
    this.tests = [];
    this.results = [];

    try {
      // Create a sandboxed environment
      const sandbox = {
        console: {
          log: (...args) => console.log('[Test]', ...args),
          error: (...args) => console.error('[Test]', ...args),
        },
        describe: this.describe.bind(this),
        it: this.it.bind(this),
        expect: this.expect.bind(this),
      };

      // Execute user code
      const userFunc = new Function(...Object.keys(sandbox), code);
      userFunc(...Object.values(sandbox));

      // Run all collected tests
      for (const test of this.tests) {
        const startTime = performance.now();
        try {
          await test.callback();
          const duration = performance.now() - startTime;
          this.results.push(
            new TestResult(`${test.suite} > ${test.name}`, true, null, duration)
          );
        } catch (error) {
          const duration = performance.now() - startTime;
          this.results.push(
            new TestResult(`${test.suite} > ${test.name}`, false, error.message, duration)
          );
        }
      }

      return {
        passed: this.results.every(r => r.passed),
        results: this.results,
        total: this.results.length,
        passed: this.results.filter(r => r.passed).length,
        failed: this.results.filter(r => !r.passed).length,
      };
    } catch (error) {
      return {
        passed: false,
        results: [new TestResult('Code Execution', false, error.message)],
        total: 1,
        passed: 0,
        failed: 1,
        error: error.message,
      };
    }
  }
}

// Simple output comparison for exercises without formal tests
export function compareOutput(code, expectedOutput) {
  const capturedLogs = [];

  const mockConsole = {
    log: (...args) => {
      capturedLogs.push(args.map(arg => String(arg)).join(' '));
    },
  };

  try {
    const func = new Function('console', code);
    func(mockConsole);

    const actualOutput = capturedLogs.join('\n');
    const passed = actualOutput.trim() === expectedOutput.trim();

    return {
      passed,
      results: [
        new TestResult(
          'Output Comparison',
          passed,
          passed ? null : `Expected:\n${expectedOutput}\n\nGot:\n${actualOutput}`
        ),
      ],
      total: 1,
      passed: passed ? 1 : 0,
      failed: passed ? 0 : 1,
    };
  } catch (error) {
    return {
      passed: false,
      results: [new TestResult('Code Execution', false, error.message)],
      total: 1,
      passed: 0,
      failed: 1,
      error: error.message,
    };
  }
}
