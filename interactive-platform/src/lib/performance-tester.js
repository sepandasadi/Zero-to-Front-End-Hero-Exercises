// Performance Testing and Big-O Analysis for Algorithm Exercises

export class PerformanceResult {
  constructor(runs, avgTime, minTime, maxTime, memoryUsed, score) {
    this.runs = runs;
    this.avgTime = avgTime;
    this.minTime = minTime;
    this.maxTime = maxTime;
    this.memoryUsed = memoryUsed;
    this.score = score;
  }
}

export class PerformanceTester {
  constructor() {
    this.warmupRuns = 3;
    this.benchmarkRuns = 100;
  }

  async benchmark(func, input, options = {}) {
    const runs = options.runs || this.benchmarkRuns;
    const times = [];

    // Warmup
    for (let i = 0; i < this.warmupRuns; i++) {
      try {
        func(...input);
      } catch (e) {
        // Ignore warmup errors
      }
    }

    // Actual benchmarking
    for (let i = 0; i < runs; i++) {
      const startTime = performance.now();

      try {
        func(...input);
      } catch (error) {
        return {
          error: error.message,
          times: [],
        };
      }

      const endTime = performance.now();
      times.push(endTime - startTime);
    }

    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);

    // Calculate performance score (lower time = higher score)
    let score = 100;
    if (avgTime > 100) score = 20;
    else if (avgTime > 50) score = 40;
    else if (avgTime > 10) score = 60;
    else if (avgTime > 1) score = 80;

    return new PerformanceResult(runs, avgTime, minTime, maxTime, 0, score);
  }

  async compareImplementations(studentFunc, referenceFunc, testCases) {
    const results = [];

    for (const testCase of testCases) {
      const studentResult = await this.benchmark(studentFunc, testCase.input);
      const referenceResult = await this.benchmark(referenceFunc, testCase.input);

      results.push({
        input: testCase.description || `Input size: ${testCase.input[0]?.length || testCase.input.length}`,
        student: studentResult,
        reference: referenceResult,
        comparison: this.comparePerformance(studentResult, referenceResult),
      });
    }

    return {
      results,
      overall: this.calculateOverallComparison(results),
    };
  }

  comparePerformance(studentResult, referenceResult) {
    if (studentResult.error) {
      return {
        status: 'error',
        message: studentResult.error,
      };
    }

    const ratio = studentResult.avgTime / referenceResult.avgTime;

    if (ratio < 1.2) {
      return {
        status: 'excellent',
        message: 'Your solution is as fast as the optimal solution!',
        ratio: ratio.toFixed(2),
      };
    } else if (ratio < 2) {
      return {
        status: 'good',
        message: 'Your solution is reasonably efficient',
        ratio: ratio.toFixed(2),
      };
    } else if (ratio < 5) {
      return {
        status: 'acceptable',
        message: 'Your solution works but could be optimized',
        ratio: ratio.toFixed(2),
      };
    } else {
      return {
        status: 'slow',
        message: 'Consider a more efficient algorithm',
        ratio: ratio.toFixed(2),
      };
    }
  }

  calculateOverallComparison(results) {
    const avgRatio = results.reduce((sum, r) => {
      if (r.comparison.status === 'error') return sum;
      return sum + parseFloat(r.comparison.ratio);
    }, 0) / results.length;

    let rating = 'excellent';
    if (avgRatio > 5) rating = 'slow';
    else if (avgRatio > 2) rating = 'acceptable';
    else if (avgRatio > 1.2) rating = 'good';

    return {
      avgRatio: avgRatio.toFixed(2),
      rating,
    };
  }

  // Analyze Big-O complexity based on execution time growth
  analyzeBigO(func, getSizesInput) {
    const sizes = [10, 50, 100, 500, 1000];
    const measurements = [];

    for (const size of sizes) {
      const input = getSizesInput(size);
      const startTime = performance.now();

      try {
        func(input);
      } catch (e) {
        return {
          error: 'Function execution failed',
          complexity: 'unknown',
        };
      }

      const endTime = performance.now();
      measurements.push({
        size,
        time: endTime - startTime,
      });
    }

    // Analyze growth pattern
    const complexity = this.estimateComplexity(measurements);

    return {
      measurements,
      complexity: complexity.notation,
      explanation: complexity.explanation,
      recommendation: complexity.recommendation,
    };
  }

  estimateComplexity(measurements) {
    if (measurements.length < 3) {
      return {
        notation: 'Unknown',
        explanation: 'Not enough data points',
        recommendation: '',
      };
    }

    // Calculate ratios between consecutive measurements
    const timeRatios = [];
    const sizeRatios = [];

    for (let i = 1; i < measurements.length; i++) {
      const timeRatio = measurements[i].time / measurements[i - 1].time;
      const sizeRatio = measurements[i].size / measurements[i - 1].size;
      timeRatios.push(timeRatio);
      sizeRatios.push(sizeRatio);
    }

    const avgTimeRatio = timeRatios.reduce((a, b) => a + b, 0) / timeRatios.length;
    const avgSizeRatio = sizeRatios[0]; // Should be consistent

    // Determine complexity based on growth pattern
    if (avgTimeRatio < avgSizeRatio * 0.3) {
      return {
        notation: 'O(log n)',
        explanation: 'Logarithmic time - very efficient! Time grows slowly as input increases.',
        recommendation: 'Excellent algorithmic complexity',
      };
    } else if (avgTimeRatio < avgSizeRatio * 1.2) {
      return {
        notation: 'O(n)',
        explanation: 'Linear time - time grows proportionally with input size.',
        recommendation: 'Good algorithmic complexity for most cases',
      };
    } else if (avgTimeRatio < avgSizeRatio * avgSizeRatio * 0.8) {
      return {
        notation: 'O(n log n)',
        explanation: 'Linearithmic time - efficient for sorting and divide-and-conquer algorithms.',
        recommendation: 'Good complexity for sorting algorithms',
      };
    } else if (avgTimeRatio < avgSizeRatio * avgSizeRatio * 1.5) {
      return {
        notation: 'O(n²)',
        explanation: 'Quadratic time - time grows with the square of input size. Consider optimization for large inputs.',
        recommendation: 'Acceptable for small inputs, but may be slow for large datasets',
      };
    } else if (avgTimeRatio < avgSizeRatio * avgSizeRatio * avgSizeRatio) {
      return {
        notation: 'O(n³)',
        explanation: 'Cubic time - time grows very quickly. Definitely needs optimization.',
        recommendation: 'Poor complexity - look for a more efficient algorithm',
      };
    } else {
      return {
        notation: 'O(2^n) or worse',
        explanation: 'Exponential time - extremely slow for larger inputs.',
        recommendation: 'Critical - this algorithm will not scale. Use dynamic programming or memoization.',
      };
    }
  }

  // Performance optimization suggestions
  getOptimizationHints(code, performanceResult) {
    const hints = [];

    if (performanceResult.score < 60) {
      // Analyze code for common performance issues

      if (code.includes('.sort()')) {
        hints.push({
          issue: 'Sorting detected',
          suggestion: 'Sorting is O(n log n). If you need to sort multiple times, consider doing it once.',
          severity: 'medium',
        });
      }

      if (code.match(/for.*for/s)) {
        hints.push({
          issue: 'Nested loops detected',
          suggestion: 'Nested loops can be O(n²) or worse. Consider using a Map or Set for O(1) lookups.',
          severity: 'high',
        });
      }

      if (code.includes('.includes(') && code.includes('for')) {
        hints.push({
          issue: 'Array.includes() in a loop',
          suggestion: 'includes() is O(n), making your loop O(n²). Use a Set for O(1) lookups instead.',
          severity: 'high',
        });
      }

      if (code.includes('.push(') && code.includes('.shift(')) {
        hints.push({
          issue: 'Using shift() in a loop',
          suggestion: 'shift() is O(n) because it reindexes the array. Consider using an index pointer instead.',
          severity: 'medium',
        });
      }

      if (code.match(/\.\w+\(.*\)\..*\(/)) {
        hints.push({
          issue: 'Chaining multiple array methods',
          suggestion: 'Multiple passes over an array can be combined into one for better performance.',
          severity: 'low',
        });
      }

      // Check for recursion without memoization
      if (code.includes('function') && code.match(/function\s+(\w+).*\1\(/)) {
        if (!code.includes('memo') && !code.includes('cache')) {
          hints.push({
            issue: 'Recursion without memoization',
            suggestion: 'Recursive functions can benefit from memoization to avoid redundant calculations.',
            severity: 'high',
          });
        }
      }
    }

    if (hints.length === 0 && performanceResult.score >= 80) {
      hints.push({
        issue: 'None',
        suggestion: 'Your code is performing well! No obvious optimizations needed.',
        severity: 'none',
      });
    }

    return hints;
  }
}

// Export singleton instance
export const performanceTester = new PerformanceTester();
