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
    return {
      toBe: (expected) => {
        if (actual !== expected) {
          throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
        }
      },
      toEqual: (expected) => {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
          throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
        }
      },
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
      toContain: (expected) => {
        if (!actual.includes(expected)) {
          throw new Error(`Expected to contain ${JSON.stringify(expected)}`);
        }
      },
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
      toThrow: () => {
        try {
          actual();
          throw new Error('Expected function to throw an error');
        } catch (e) {
          // Expected behavior
        }
      },
    };
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
