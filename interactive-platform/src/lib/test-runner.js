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
  constructor(options = {}) {
    this.tests = [];
    this.results = [];
    this.timeout = options.timeout || 5000; // Default 5 second timeout
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

  // Alias for it() - Jest compatibility
  test(testName, callback) {
    this.it(testName, callback);
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
      // Create test.each for parameterized tests
      const testEach = (cases) => {
        return (testName, callback) => {
          cases.forEach((testCase, index) => {
            const args = Array.isArray(testCase) ? testCase : [testCase];
            const formattedName = testName.replace(/%s|%d|%j|%o/g, (match) => {
              const arg = args.shift();
              if (match === '%j' || match === '%o') {
                return JSON.stringify(arg);
              }
              return String(arg);
            });
            this.it(`${formattedName} [case ${index + 1}]`, () => callback(...(Array.isArray(testCase) ? testCase : [testCase])));
          });
        };
      };

      const test = this.test.bind(this);
      test.each = testEach;

      // Create a sandboxed environment
      const sandbox = {
        console: {
          log: (...args) => console.log('[Test]', ...args),
          error: (...args) => console.error('[Test]', ...args),
        },
        describe: this.describe.bind(this),
        it: this.it.bind(this),
        test: test,
        expect: this.expect.bind(this),
        // Add require mock for module-based exercises
        require: (path) => {
          // For browser environment, modules should be passed via context
          throw new Error('require() not available in browser. Use ES modules or pass functions via context.');
        },
      };

      // Execute user code
      const userFunc = new Function(...Object.keys(sandbox), code);
      userFunc(...Object.values(sandbox));

      // Run all collected tests with timeout
      for (const test of this.tests) {
        const startTime = performance.now();
        try {
          // Add timeout wrapper
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error(`Test timeout: exceeded ${this.timeout}ms`)), this.timeout);
          });
          const testPromise = Promise.resolve(test.callback());
          
          await Promise.race([testPromise, timeoutPromise]);
          
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
