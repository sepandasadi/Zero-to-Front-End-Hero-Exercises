// Smart Hint System - Analyzes test failures and provides contextual guidance

export class HintGenerator {
  constructor() {
    this.patterns = this.initializePatterns();
  }

  initializePatterns() {
    return [
      // Common JavaScript errors
      {
        pattern: /is not defined/i,
        hints: [
          'This variable or function has not been declared. Check for typos in the name.',
          'Make sure you declared the variable with let, const, or var before using it.',
          'If it\'s a function, ensure it\'s defined before being called.'
        ],
        category: 'undefined-reference'
      },
      {
        pattern: /Cannot read property.*of undefined/i,
        hints: [
          'You\'re trying to access a property of something that is undefined.',
          'Add a check: if (object) { ... } before accessing properties.',
          'Use optional chaining: object?.property instead of object.property'
        ],
        category: 'undefined-property'
      },
      {
        pattern: /Unexpected token/i,
        hints: [
          'Syntax error detected. Check for missing or extra brackets, parentheses, or quotes.',
          'Make sure all opening brackets { [ ( have matching closing brackets } ] )',
          'Check if you\'re missing a comma in an object or array.'
        ],
        category: 'syntax-error'
      },
      {
        pattern: /is not a function/i,
        hints: [
          'You\'re calling something as a function that isn\'t one.',
          'Check if you spelled the function name correctly.',
          'Make sure the function is defined before you try to call it.'
        ],
        category: 'not-a-function'
      },

      // Array/Object specific
      {
        pattern: /Expected.*array.*but got/i,
        hints: [
          'Your function should return an array, but it\'s returning something else.',
          'Make sure you\'re using [] brackets to create an array.',
          'Check if you\'re returning the array at the end of your function.'
        ],
        category: 'type-mismatch-array'
      },
      {
        pattern: /filter.*method/i,
        hints: [
          'Try using the .filter() method to filter arrays.',
          'filter() creates a new array with elements that pass a test.',
          'Example: array.filter(item => item > 5)'
        ],
        category: 'array-filter'
      },
      {
        pattern: /map.*method/i,
        hints: [
          'The .map() method transforms each element in an array.',
          'It returns a new array with the transformed values.',
          'Example: array.map(item => item * 2)'
        ],
        category: 'array-map'
      },

      // Number/Math related
      {
        pattern: /Expected.*number.*but got.*string/i,
        hints: [
          'You need to convert a string to a number.',
          'Use parseInt() for integers or parseFloat() for decimals.',
          'Or use Number() to convert: Number("123") returns 123'
        ],
        category: 'type-conversion-number'
      },
      {
        pattern: /NaN/i,
        hints: [
          'NaN means "Not a Number" - you tried to do math with a non-number.',
          'Check if your variables actually contain numbers.',
          'Use Number.isNaN(value) to check if something is NaN.'
        ],
        category: 'nan-error'
      },

      // Logic errors
      {
        pattern: /Expected.*true.*but got.*false/i,
        hints: [
          'Your condition is returning false when it should return true.',
          'Check your comparison operators: === for equality, !== for not equal.',
          'Make sure you\'re testing the right condition.'
        ],
        category: 'boolean-logic'
      },
      {
        pattern: /off by one|Expected.*\d+.*but got.*\d+/i,
        hints: [
          'This might be an "off by one" error - check your loop boundaries.',
          'Remember: arrays start at index 0, not 1.',
          'For loops: use i < array.length, not i <= array.length'
        ],
        category: 'off-by-one'
      },

      // Async/Promise errors
      {
        pattern: /Promise/i,
        hints: [
          'This involves asynchronous code (Promises).',
          'Use .then() to handle Promise results: promise.then(result => ...)',
          'Or use async/await: await promise inside an async function.'
        ],
        category: 'promise-handling'
      },
      {
        pattern: /await.*not in async/i,
        hints: [
          'You can only use await inside an async function.',
          'Add async before function: async function myFunc() { ... }',
          'Or use .then() instead: promise.then(result => ...)'
        ],
        category: 'async-await'
      },

      // String operations
      {
        pattern: /split.*join/i,
        hints: [
          'Use .split() to break a string into an array.',
          'Use .join() to combine array elements into a string.',
          'Example: "hello".split("") splits into ["h","e","l","l","o"]'
        ],
        category: 'string-array'
      },
      {
        pattern: /Expected.*string.*but got/i,
        hints: [
          'You need to convert something to a string.',
          'Use .toString() or String(value) to convert to string.',
          'Or use template literals: `${value}` converts to string automatically.'
        ],
        category: 'type-conversion-string'
      },

      // DOM related
      {
        pattern: /querySelector|getElementById/i,
        hints: [
          'DOM selection: use document.querySelector(".class") or document.getElementById("id")',
          'querySelector returns the first match, querySelectorAll returns all matches.',
          'Remember: querySelector needs a CSS selector like ".class" or "#id"'
        ],
        category: 'dom-selection'
      },
      {
        pattern: /addEventListener/i,
        hints: [
          'Attach event listeners: element.addEventListener("click", function)',
          'Common events: "click", "submit", "change", "input", "keypress"',
          'Remember to remove listeners when done: element.removeEventListener()'
        ],
        category: 'event-listeners'
      },

      // General test patterns
      {
        pattern: /should return/i,
        hints: [
          'Make sure your function has a return statement.',
          'Check if you\'re returning the correct value.',
          'The return statement should be at the end of your function logic.'
        ],
        category: 'missing-return'
      },
      {
        pattern: /empty|contains nothing/i,
        hints: [
          'Your output is empty. Make sure you\'re actually creating/returning something.',
          'Check if your function is returning early before doing the work.',
          'Verify that your loops are executing and adding to the result.'
        ],
        category: 'empty-output'
      }
    ];
  }

  generateHints(testResult) {
    if (!testResult.error) {
      return [];
    }

    const errorMessage = testResult.error.toLowerCase();
    const testName = testResult.name.toLowerCase();
    const combinedText = `${errorMessage} ${testName}`;

    // Find matching patterns
    const matchedPatterns = this.patterns.filter(p =>
      p.pattern.test(errorMessage) || p.pattern.test(testName)
    );

    if (matchedPatterns.length === 0) {
      return this.getGenericHints(combinedText);
    }

    // Return hints from the first matched pattern
    const hints = matchedPatterns[0].hints;

    // Add relevant links based on category
    const hintsWithLinks = hints.map(hint => ({
      text: hint,
      type: 'suggestion'
    }));

    // Add a documentation link
    const docs = this.getRelevantDocs(matchedPatterns[0].category);
    if (docs) {
      hintsWithLinks.push({
        text: `Learn more: ${docs.title}`,
        link: docs.url,
        type: 'documentation'
      });
    }

    return hintsWithLinks;
  }

  getGenericHints(errorText) {
    // Generic hints based on error characteristics
    const hints = [];

    if (errorText.includes('expected') && errorText.includes('but got')) {
      hints.push({
        text: 'Your code produces a different result than expected.',
        type: 'observation'
      });
      hints.push({
        text: 'Compare what you\'re returning with what the test expects.',
        type: 'suggestion'
      });
    }

    if (errorText.includes('loop') || errorText.includes('iterate')) {
      hints.push({
        text: 'Try using a loop to process each element.',
        type: 'suggestion'
      });
      hints.push({
        text: 'Common loops: for, while, forEach, map, filter',
        type: 'suggestion'
      });
    }

    if (hints.length === 0) {
      hints.push({
        text: 'Read the error message carefully - it often tells you exactly what\'s wrong.',
        type: 'suggestion'
      });
      hints.push({
        text: 'Try console.log() to check intermediate values.',
        type: 'suggestion'
      });
      hints.push({
        text: 'Break the problem down into smaller steps.',
        type: 'suggestion'
      });
    }

    return hints;
  }

  getRelevantDocs(category) {
    const docLinks = {
      'undefined-reference': {
        title: 'Variable Declarations',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations'
      },
      'array-filter': {
        title: 'Array.filter() Method',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter'
      },
      'array-map': {
        title: 'Array.map() Method',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map'
      },
      'promise-handling': {
        title: 'Promises Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises'
      },
      'async-await': {
        title: 'Async/Await',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await'
      },
      'dom-selection': {
        title: 'DOM Selection',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector'
      },
      'event-listeners': {
        title: 'Event Listeners',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener'
      },
      'type-conversion-number': {
        title: 'Type Conversion',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number'
      },
      'string-array': {
        title: 'String Methods',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'
      }
    };

    return docLinks[category] || null;
  }

  // Generate progressive hints (easy → specific → detailed)
  generateProgressiveHints(testResult, level = 1) {
    const allHints = this.generateHints(testResult);

    // Return hints based on level
    if (level === 1) {
      // First hint: just observation
      return allHints.filter(h => h.type === 'observation').slice(0, 1);
    } else if (level === 2) {
      // Second hint: add suggestions
      return allHints.filter(h => h.type !== 'documentation').slice(0, 2);
    } else {
      // Full hints including documentation
      return allHints;
    }
  }

  // Get a quick fix suggestion if available
  getQuickFix(testResult) {
    const errorMessage = testResult.error.toLowerCase();

    // Pattern matching for auto-fixable issues
    if (errorMessage.includes('is not defined')) {
      const match = testResult.error.match(/(\w+)\s+is not defined/i);
      if (match) {
        return {
          issue: `Variable "${match[1]}" is not defined`,
          fix: `Add: const ${match[1]} = /* your value */;`,
          fixable: false // Would need more context to auto-fix
        };
      }
    }

    if (errorMessage.includes('missing return')) {
      return {
        issue: 'Function is missing a return statement',
        fix: 'Add: return /* your result */; at the end of your function',
        fixable: false
      };
    }

    return null;
  }
}

// Export singleton instance
export const hintGenerator = new HintGenerator();
