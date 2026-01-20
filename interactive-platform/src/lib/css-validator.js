// CSS Validator - checks syntax, best practices, and common issues

export class CSSValidationResult {
  constructor(type, message, severity = 'info', line = null) {
    this.type = type; // 'syntax', 'best-practice', 'performance', 'compatibility'
    this.message = message;
    this.severity = severity; // 'error', 'warning', 'info', 'success'
    this.line = line;
  }
}

export class CSSValidator {
  constructor() {
    this.results = [];
    this.score = 100;
  }

  validate(css) {
    this.results = [];
    this.score = 100;

    if (!css || css.trim() === '') {
      this.results.push(
        new CSSValidationResult(
          'syntax',
          'No CSS content to validate',
          'info'
        )
      );
      return this.getReport();
    }

    // Run all validation checks
    this.checkSyntax(css);
    this.checkBestPractices(css);
    this.checkPerformance(css);
    this.checkDeprecated(css);
    this.checkColors(css);

    return this.getReport();
  }

  checkSyntax(css) {
    // Check for basic syntax errors
    const openBraces = (css.match(/\{/g) || []).length;
    const closeBraces = (css.match(/\}/g) || []).length;

    if (openBraces !== closeBraces) {
      this.results.push(
        new CSSValidationResult(
          'syntax',
          `Mismatched braces: ${openBraces} opening, ${closeBraces} closing`,
          'error'
        )
      );
      this.score -= 20;
      return; // Don't continue if syntax is broken
    }

    // Check for unclosed strings
    const singleQuotes = (css.match(/'/g) || []).length;
    const doubleQuotes = (css.match(/"/g) || []).length;

    if (singleQuotes % 2 !== 0) {
      this.results.push(
        new CSSValidationResult(
          'syntax',
          'Unclosed single quote found',
          'error'
        )
      );
      this.score -= 15;
    }

    if (doubleQuotes % 2 !== 0) {
      this.results.push(
        new CSSValidationResult(
          'syntax',
          'Unclosed double quote found',
          'error'
        )
      );
      this.score -= 15;
    }

    // Check for missing semicolons (common issue)
    const lines = css.split('\n');
    let missingSemicolons = 0;
    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      // Property lines should end with semicolon or be a closing brace
      if (
        trimmed &&
        !trimmed.startsWith('/*') &&
        !trimmed.startsWith('//') &&
        !trimmed.endsWith(';') &&
        !trimmed.endsWith('{') &&
        !trimmed.endsWith('}') &&
        trimmed.includes(':') &&
        !trimmed.startsWith('@')
      ) {
        missingSemicolons++;
      }
    });

    if (missingSemicolons > 0) {
      this.results.push(
        new CSSValidationResult(
          'syntax',
          `${missingSemicolons} properties may be missing semicolons`,
          'warning'
        )
      );
      this.score -= Math.min(10, missingSemicolons * 2);
    }

    if (this.results.filter(r => r.type === 'syntax' && r.severity === 'error').length === 0) {
      this.results.push(
        new CSSValidationResult(
          'syntax',
          'No syntax errors detected',
          'success'
        )
      );
    }
  }

  checkBestPractices(css) {
    // Check for !important overuse
    const importantCount = (css.match(/!important/g) || []).length;
    if (importantCount > 3) {
      this.results.push(
        new CSSValidationResult(
          'best-practice',
          `${importantCount} uses of !important - consider improving specificity instead`,
          'warning'
        )
      );
      this.score -= 5;
    }

    // Check for ID selectors (bad for reusability)
    const idSelectors = (css.match(/#[\w-]+/g) || []).filter(
      id => !id.includes(':') // Exclude pseudo-elements
    );
    if (idSelectors.length > 5) {
      this.results.push(
        new CSSValidationResult(
          'best-practice',
          `${idSelectors.length} ID selectors found - prefer classes for styling`,
          'info'
        )
      );
    }

    // Check for universal selector
    if (css.includes('* {') || css.includes('*{')) {
      this.results.push(
        new CSSValidationResult(
          'best-practice',
          'Universal selector (*) found - may impact performance',
          'info'
        )
      );
    }

    // Check for color units
    const hasColors = /color:|background-color:|border-color:/i.test(css);
    if (hasColors) {
      this.results.push(
        new CSSValidationResult(
          'best-practice',
          'Using colors - ensure sufficient contrast for accessibility',
          'info'
        )
      );
    }

    // Check for relative units (good practice)
    const hasRelativeUnits = /\d+(?:em|rem|%|vh|vw)/.test(css);
    const hasPixels = /\d+px/.test(css);

    if (hasPixels && !hasRelativeUnits) {
      this.results.push(
        new CSSValidationResult(
          'best-practice',
          'Only using pixel units - consider relative units (em, rem, %) for responsiveness',
          'info'
        )
      );
    }
  }

  checkPerformance(css) {
    // Check for expensive selectors
    const complexSelectors = css.match(/[^\{]+\{/g) || [];
    const expensive = complexSelectors.filter(sel => {
      // Descendant selectors with multiple levels
      const spaces = (sel.match(/\s+/g) || []).length;
      return spaces > 3;
    });

    if (expensive.length > 0) {
      this.results.push(
        new CSSValidationResult(
          'performance',
          `${expensive.length} deeply nested selectors found - may impact performance`,
          'info'
        )
      );
    }

    // Check for animations without will-change
    if (css.includes('animation:') || css.includes('@keyframes')) {
      if (!css.includes('will-change')) {
        this.results.push(
          new CSSValidationResult(
            'performance',
            'Animations detected - consider adding will-change for better performance',
            'info'
          )
        );
      } else {
        this.results.push(
          new CSSValidationResult(
            'performance',
            'Animations using will-change optimization',
            'success'
          )
        );
      }
    }

    // Check for duplicate properties
    const rules = css.split('}');
    rules.forEach(rule => {
      const props = rule.split(';').map(p => p.split(':')[0]?.trim()).filter(Boolean);
      const duplicates = props.filter((p, idx) => props.indexOf(p) !== idx);
      if (duplicates.length > 0) {
        this.results.push(
          new CSSValidationResult(
            'performance',
            `Duplicate properties found: ${duplicates.join(', ')}`,
            'warning'
          )
        );
        this.score -= 3;
      }
    });
  }

  checkDeprecated(css) {
    const deprecated = [
      { prop: '-webkit-', message: 'Webkit prefix - check if still needed' },
      { prop: '-moz-', message: 'Mozilla prefix - check if still needed' },
      { prop: '-ms-', message: 'Microsoft prefix - check if still needed' },
      { prop: '-o-', message: 'Opera prefix - check if still needed' },
    ];

    deprecated.forEach(({ prop, message }) => {
      if (css.includes(prop)) {
        this.results.push(
          new CSSValidationResult(
            'compatibility',
            message,
            'info'
          )
        );
      }
    });
  }

  checkColors(css) {
    // Check for hardcoded colors vs CSS variables
    const hexColors = (css.match(/#[0-9A-Fa-f]{3,6}/g) || []).length;
    const rgbColors = (css.match(/rgba?\([^)]+\)/g) || []).length;
    const namedColors = (css.match(/\b(red|blue|green|yellow|white|black|gray|grey)\b/gi) || []).length;
    const cssVars = (css.match(/var\(--[^)]+\)/g) || []).length;

    const totalColors = hexColors + rgbColors + namedColors;

    if (totalColors > 5 && cssVars === 0) {
      this.results.push(
        new CSSValidationResult(
          'best-practice',
          `${totalColors} hardcoded colors - consider using CSS custom properties (variables)`,
          'info'
        )
      );
    } else if (cssVars > 0) {
      this.results.push(
        new CSSValidationResult(
          'best-practice',
          'Using CSS custom properties for colors - great for maintainability!',
          'success'
        )
      );
    }

    // Check for named colors (less precise)
    if (namedColors > 3) {
      this.results.push(
        new CSSValidationResult(
          'best-practice',
          `${namedColors} named colors found - consider using hex/rgb for precision`,
          'info'
        )
      );
    }
  }

  getReport() {
    // Ensure score doesn't go below 0
    this.score = Math.max(0, this.score);

    return {
      score: this.score,
      results: this.results,
      summary: this.getSummary(),
    };
  }

  getSummary() {
    const errors = this.results.filter(r => r.severity === 'error').length;
    const warnings = this.results.filter(r => r.severity === 'warning').length;
    const info = this.results.filter(r => r.severity === 'info').length;
    const success = this.results.filter(r => r.severity === 'success').length;

    let level = 'Excellent';
    if (this.score < 50) level = 'Poor';
    else if (this.score < 70) level = 'Fair';
    else if (this.score < 85) level = 'Good';

    return {
      level,
      errors,
      warnings,
      info,
      success,
      total: this.results.length,
    };
  }
}
