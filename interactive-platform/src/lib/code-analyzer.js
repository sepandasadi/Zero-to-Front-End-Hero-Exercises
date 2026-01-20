// Code Quality Analyzer - ESLint-style checking for JavaScript

export class CodeIssue {
  constructor(type, message, severity = 'warning', line = null, column = null, fixable = false) {
    this.type = type; // 'style', 'best-practice', 'potential-bug', 'complexity'
    this.message = message;
    this.severity = severity; // 'error', 'warning', 'info'
    this.line = line;
    this.column = column;
    this.fixable = fixable;
  }
}

export class CodeAnalyzer {
  constructor() {
    this.issues = [];
    this.score = 100;
  }

  analyze(code) {
    this.issues = [];
    this.score = 100;

    if (!code || code.trim() === '') {
      return this.getReport();
    }

    // Run all checks
    this.checkVariableDeclarations(code);
    this.checkConsoleLogs(code);
    this.checkUnusedVariables(code);
    this.checkFunctionComplexity(code);
    this.checkArrowFunctions(code);
    this.checkSemicolons(code);
    this.checkComparisons(code);
    this.checkNamingConventions(code);
    this.checkComments(code);
    this.checkAsyncPatterns(code);

    return this.getReport();
  }

  checkVariableDeclarations(code) {
    // Check for var usage
    const varMatches = code.match(/\bvar\s+\w+/g);
    if (varMatches) {
      this.issues.push(
        new CodeIssue(
          'best-practice',
          `Found ${varMatches.length} var declarations - use let or const instead`,
          'warning',
          null,
          null,
          true
        )
      );
      this.score -= Math.min(10, varMatches.length * 2);
    }

    // Check for undeclared variables (simple heuristic)
    const assignmentPattern = /(\w+)\s*=\s*[^=]/g;
    const matches = [...code.matchAll(assignmentPattern)];
    const potentialUndeclared = matches.filter(match => {
      const varName = match[1];
      const before = code.substring(0, match.index);
      // Check if it was declared with let, const, or var
      const isDeclared = new RegExp(`\\b(let|const|var)\\s+${varName}\\b`).test(before);
      return !isDeclared && !['this', 'window', 'document', 'console'].includes(varName);
    });

    if (potentialUndeclared.length > 0) {
      this.issues.push(
        new CodeIssue(
          'potential-bug',
          `Possible undeclared variables: ${potentialUndeclared.slice(0, 3).map(m => m[1]).join(', ')}`,
          'warning'
        )
      );
      this.score -= 8;
    }
  }

  checkConsoleLogs(code) {
    const consoleLogs = (code.match(/console\.(log|warn|error|info|debug)/g) || []).length;

    if (consoleLogs > 0) {
      this.issues.push(
        new CodeIssue(
          'best-practice',
          `${consoleLogs} console statement(s) found - remove before production`,
          'info',
          null,
          null,
          true
        )
      );
    }

    // Check for debugger statements
    if (code.includes('debugger')) {
      this.issues.push(
        new CodeIssue(
          'best-practice',
          'debugger statement found - remove before production',
          'warning',
          null,
          null,
          true
        )
      );
      this.score -= 5;
    }
  }

  checkUnusedVariables(code) {
    // Simple check for declared but potentially unused variables
    const declarations = code.match(/(?:let|const|var)\s+(\w+)/g);
    if (!declarations) return;

    const variables = declarations.map(d => d.split(/\s+/)[1]);
    const unused = variables.filter(varName => {
      // Count occurrences (declaration + usages)
      const occurrences = (code.match(new RegExp(`\\b${varName}\\b`, 'g')) || []).length;
      return occurrences === 1; // Only the declaration itself
    });

    if (unused.length > 0) {
      this.issues.push(
        new CodeIssue(
          'best-practice',
          `Potentially unused variables: ${unused.slice(0, 3).join(', ')}`,
          'warning'
        )
      );
      this.score -= Math.min(8, unused.length * 2);
    }
  }

  checkFunctionComplexity(code) {
    // Check for deeply nested code
    const lines = code.split('\n');
    let maxNesting = 0;
    let currentNesting = 0;
    let complexLines = 0;

    lines.forEach((line, idx) => {
      const openBraces = (line.match(/\{/g) || []).length;
      const closeBraces = (line.match(/\}/g) || []).length;
      currentNesting += openBraces - closeBraces;
      maxNesting = Math.max(maxNesting, currentNesting);

      if (currentNesting > 3) {
        complexLines++;
      }
    });

    if (maxNesting > 4) {
      this.issues.push(
        new CodeIssue(
          'complexity',
          `Deep nesting detected (${maxNesting} levels) - consider refactoring`,
          'warning'
        )
      );
      this.score -= 10;
    }

    // Check for long functions
    const functionMatches = code.match(/function\s+\w+\s*\([^)]*\)\s*\{/g);
    if (functionMatches) {
      const avgFunctionLength = Math.floor(lines.length / functionMatches.length);
      if (avgFunctionLength > 50) {
        this.issues.push(
          new CodeIssue(
            'complexity',
            'Functions are very long - consider breaking them into smaller functions',
            'info'
          )
        );
      }
    }
  }

  checkArrowFunctions(code) {
    // Check for traditional functions that could be arrow functions
    const traditionalFunctions = code.match(/function\s*\([^)]*\)\s*\{/g);
    const arrowFunctions = code.match(/\([^)]*\)\s*=>/g);

    if (traditionalFunctions && traditionalFunctions.length > 3 && !arrowFunctions) {
      this.issues.push(
        new CodeIssue(
          'style',
          'Consider using arrow functions for cleaner syntax',
          'info',
          null,
          null,
          false
        )
      );
    }
  }

  checkSemicolons(code) {
    const lines = code.split('\n').filter(line => {
      const trimmed = line.trim();
      return trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('/*');
    });

    let missingSemicolons = 0;
    lines.forEach(line => {
      const trimmed = line.trim();
      // Lines that should probably end with semicolons
      if (
        trimmed &&
        !trimmed.endsWith(';') &&
        !trimmed.endsWith('{') &&
        !trimmed.endsWith('}') &&
        !trimmed.endsWith(',') &&
        !trimmed.startsWith('if') &&
        !trimmed.startsWith('for') &&
        !trimmed.startsWith('while') &&
        !trimmed.startsWith('function') &&
        !trimmed.startsWith('class') &&
        !trimmed.includes('=>') &&
        (trimmed.includes('=') || trimmed.includes('return') || trimmed.includes('const') || trimmed.includes('let'))
      ) {
        missingSemicolons++;
      }
    });

    if (missingSemicolons > 2) {
      this.issues.push(
        new CodeIssue(
          'style',
          `${missingSemicolons} statements may be missing semicolons`,
          'info',
          null,
          null,
          true
        )
      );
    }
  }

  checkComparisons(code) {
    // Check for == instead of ===
    const looseEquality = (code.match(/[^=!]==(?!=)/g) || []).length;
    if (looseEquality > 0) {
      this.issues.push(
        new CodeIssue(
          'best-practice',
          `Found ${looseEquality} loose equality comparisons (==) - use strict equality (===)`,
          'warning',
          null,
          null,
          true
        )
      );
      this.score -= Math.min(8, looseEquality * 2);
    }

    // Check for != instead of !==
    const looseInequality = (code.match(/!=(?!=)/g) || []).length;
    if (looseInequality > 0) {
      this.issues.push(
        new CodeIssue(
          'best-practice',
          `Found ${looseInequality} loose inequality comparisons (!=) - use strict inequality (!==)`,
          'warning',
          null,
          null,
          true
        )
      );
      this.score -= Math.min(8, looseInequality * 2);
    }
  }

  checkNamingConventions(code) {
    // Check for camelCase in variable names
    const declarations = code.match(/(?:let|const|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g);
    if (!declarations) return;

    const variables = declarations.map(d => d.split(/\s+/)[1]);
    const badNames = variables.filter(name => {
      // Check for snake_case or inconsistent naming
      return name.includes('_') && !name.startsWith('_') && !name.toUpperCase() === name;
    });

    if (badNames.length > 0) {
      this.issues.push(
        new CodeIssue(
          'style',
          `Use camelCase for variables: ${badNames.slice(0, 3).join(', ')}`,
          'info'
        )
      );
    }

    // Check for single-letter variable names (except i, j, k in loops)
    const singleLetter = variables.filter(name => name.length === 1 && !['i', 'j', 'k', 'x', 'y'].includes(name));
    if (singleLetter.length > 0) {
      this.issues.push(
        new CodeIssue(
          'style',
          `Use descriptive variable names instead of: ${singleLetter.join(', ')}`,
          'info'
        )
      );
    }
  }

  checkComments(code) {
    const lines = code.split('\n');
    const commentLines = lines.filter(line => line.trim().startsWith('//') || line.trim().startsWith('/*'));
    const codeLines = lines.filter(line => {
      const trimmed = line.trim();
      return trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('/*');
    });

    const commentRatio = commentLines.length / (codeLines.length || 1);

    if (commentRatio < 0.05 && codeLines.length > 20) {
      this.issues.push(
        new CodeIssue(
          'style',
          'Consider adding comments to explain complex logic',
          'info'
        )
      );
    }

    if (commentRatio > 0.5) {
      this.issues.push(
        new CodeIssue(
          'style',
          'Too many comments - code should be self-documenting',
          'info'
        )
      );
    }
  }

  checkAsyncPatterns(code) {
    // Check for Promise without catch
    if (code.includes('.then(') && !code.includes('.catch(')) {
      this.issues.push(
        new CodeIssue(
          'potential-bug',
          'Promise without .catch() - handle errors properly',
          'warning'
        )
      );
      this.score -= 8;
    }

    // Check for async/await without try-catch
    if (code.includes('await ') && !code.includes('try {')) {
      this.issues.push(
        new CodeIssue(
          'potential-bug',
          'async/await without try-catch - errors may go unhandled',
          'warning'
        )
      );
      this.score -= 8;
    }

    // Check for callback hell
    const callbackNesting = (code.match(/function\s*\([^)]*\)\s*\{[^}]*function\s*\([^)]*\)\s*\{/g) || []).length;
    if (callbackNesting > 2) {
      this.issues.push(
        new CodeIssue(
          'complexity',
          'Deeply nested callbacks detected - consider using async/await or Promises',
          'warning'
        )
      );
      this.score -= 10;
    }
  }

  getReport() {
    // Ensure score doesn't go below 0
    this.score = Math.max(0, this.score);

    return {
      score: this.score,
      issues: this.issues,
      summary: this.getSummary(),
    };
  }

  getSummary() {
    const errors = this.issues.filter(i => i.severity === 'error').length;
    const warnings = this.issues.filter(i => i.severity === 'warning').length;
    const info = this.issues.filter(i => i.severity === 'info').length;
    const fixable = this.issues.filter(i => i.fixable).length;

    let level = 'Excellent';
    if (this.score < 50) level = 'Poor';
    else if (this.score < 70) level = 'Fair';
    else if (this.score < 85) level = 'Good';

    return {
      level,
      errors,
      warnings,
      info,
      fixable,
      total: this.issues.length,
    };
  }

  // Get grouped issues by type
  getGroupedIssues() {
    const grouped = {
      'potential-bug': [],
      'best-practice': [],
      'complexity': [],
      'style': [],
    };

    this.issues.forEach(issue => {
      if (grouped[issue.type]) {
        grouped[issue.type].push(issue);
      }
    });

    return grouped;
  }
}
