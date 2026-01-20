// WCAG 2.1 Accessibility Checker - comprehensive a11y auditing

export class AccessibilityIssue {
  constructor(rule, message, severity = 'warning', wcagLevel = 'A', element = null) {
    this.rule = rule; // WCAG rule ID
    this.message = message;
    this.severity = severity; // 'error', 'warning', 'info'
    this.wcagLevel = wcagLevel; // 'A', 'AA', 'AAA'
    this.element = element;
  }
}

export class AccessibilityChecker {
  constructor() {
    this.issues = [];
    this.score = 100;
    this.wcagLevels = { A: true, AA: true, AAA: true };
  }

  check(html) {
    this.issues = [];
    this.score = 100;
    this.wcagLevels = { A: true, AA: true, AAA: true };

    if (!html || html.trim() === '') {
      return this.getReport();
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Run all WCAG checks
    this.checkPerceivable(doc);
    this.checkOperable(doc);
    this.checkUnderstandable(doc);
    this.checkRobust(doc);

    return this.getReport();
  }

  // WCAG Principle 1: Perceivable
  checkPerceivable(doc) {
    this.checkTextAlternatives(doc);
    this.checkColorContrast(doc);
    this.checkAdaptable(doc);
  }

  checkTextAlternatives(doc) {
    // 1.1.1 Non-text Content (Level A)
    const images = doc.querySelectorAll('img');
    images.forEach((img, idx) => {
      if (!img.hasAttribute('alt')) {
        this.issues.push(
          new AccessibilityIssue(
            '1.1.1',
            `Image ${idx + 1} missing alt attribute`,
            'error',
            'A',
            'img'
          )
        );
        this.score -= 5;
        this.wcagLevels.A = false;
      } else if (img.getAttribute('alt').trim() === '' && !img.hasAttribute('role')) {
        // Empty alt is okay for decorative images, but check if it should be decorative
        const src = img.getAttribute('src');
        if (src && !src.includes('icon') && !src.includes('decoration')) {
          this.issues.push(
            new AccessibilityIssue(
              '1.1.1',
              `Image ${idx + 1} has empty alt text - ensure it's decorative`,
              'warning',
              'A'
            )
          );
          this.score -= 2;
        }
      }
    });

    // Check for aria-label on interactive elements without text
    const buttons = doc.querySelectorAll('button');
    buttons.forEach((btn, idx) => {
      if (!btn.textContent.trim() && !btn.hasAttribute('aria-label') && !btn.querySelector('img[alt]')) {
        this.issues.push(
          new AccessibilityIssue(
            '1.1.1',
            `Button ${idx + 1} has no text or aria-label`,
            'error',
            'A'
          )
        );
        this.score -= 5;
        this.wcagLevels.A = false;
      }
    });

    // Check input buttons
    const inputButtons = doc.querySelectorAll('input[type="image"]');
    inputButtons.forEach((input, idx) => {
      if (!input.hasAttribute('alt')) {
        this.issues.push(
          new AccessibilityIssue(
            '1.1.1',
            `Image button ${idx + 1} missing alt attribute`,
            'error',
            'A'
          )
        );
        this.score -= 5;
        this.wcagLevels.A = false;
      }
    });
  }

  checkColorContrast(doc) {
    // 1.4.3 Contrast (Level AA) - simplified check
    // Note: Real contrast checking requires computed styles
    const elements = doc.querySelectorAll('*');
    let hasInlineColors = false;

    elements.forEach(el => {
      const style = el.getAttribute('style');
      if (style && (style.includes('color:') || style.includes('background'))) {
        hasInlineColors = true;
      }
    });

    if (hasInlineColors) {
      this.issues.push(
        new AccessibilityIssue(
          '1.4.3',
          'Inline colors detected - verify contrast ratios meet WCAG AA (4.5:1 for normal text)',
          'warning',
          'AA'
        )
      );
    }

    // Check for color-only information
    const styles = doc.querySelectorAll('style');
    styles.forEach(style => {
      if (style.textContent.includes('color:') && !style.textContent.includes('text-decoration')) {
        this.issues.push(
          new AccessibilityIssue(
            '1.4.1',
            'Ensure color is not the only means of conveying information',
            'info',
            'A'
          )
        );
      }
    });
  }

  checkAdaptable(doc) {
    // 1.3.1 Info and Relationships (Level A)
    const tables = doc.querySelectorAll('table');
    tables.forEach((table, idx) => {
      const hasCaption = table.querySelector('caption');
      const hasTh = table.querySelector('th');

      if (!hasCaption) {
        this.issues.push(
          new AccessibilityIssue(
            '1.3.1',
            `Table ${idx + 1} missing caption - add table description`,
            'warning',
            'A'
          )
        );
        this.score -= 3;
      }

      if (!hasTh) {
        this.issues.push(
          new AccessibilityIssue(
            '1.3.1',
            `Table ${idx + 1} missing header cells (<th>) - define column/row headers`,
            'warning',
            'A'
          )
        );
        this.score -= 3;
      }
    });

    // 1.3.2 Meaningful Sequence (Level A)
    const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    if (headings.length > 0) {
      const levels = headings.map(h => parseInt(h.tagName.substring(1)));
      for (let i = 1; i < levels.length; i++) {
        if (levels[i] - levels[i - 1] > 1) {
          this.issues.push(
            new AccessibilityIssue(
              '1.3.2',
              `Heading hierarchy skip: h${levels[i - 1]} → h${levels[i]}`,
              'warning',
              'A'
            )
          );
          this.score -= 3;
          break;
        }
      }
    }

    // 1.3.5 Identify Input Purpose (Level AA)
    const inputs = doc.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
    inputs.forEach((input, idx) => {
      if (!input.hasAttribute('autocomplete') && input.getAttribute('name')) {
        const name = input.getAttribute('name').toLowerCase();
        if (['email', 'name', 'phone', 'address'].some(term => name.includes(term))) {
          this.issues.push(
            new AccessibilityIssue(
              '1.3.5',
              `Input ${idx + 1} (${name}) should have autocomplete attribute`,
              'info',
              'AA'
            )
          );
        }
      }
    });
  }

  // WCAG Principle 2: Operable
  checkOperable(doc) {
    this.checkKeyboardAccessible(doc);
    this.checkNavigable(doc);
    this.checkInputModalities(doc);
  }

  checkKeyboardAccessible(doc) {
    // 2.1.1 Keyboard (Level A)
    const interactiveElements = doc.querySelectorAll('a, button, input, select, textarea, [onclick], [tabindex]');

    interactiveElements.forEach((el, idx) => {
      // Check for onclick without keyboard equivalent
      if (el.hasAttribute('onclick') && el.tagName.toLowerCase() !== 'button' && el.tagName.toLowerCase() !== 'a') {
        const hasKeyEvents = el.hasAttribute('onkeydown') || el.hasAttribute('onkeypress') || el.hasAttribute('onkeyup');
        if (!hasKeyEvents) {
          this.issues.push(
            new AccessibilityIssue(
              '2.1.1',
              `Element with onclick (${el.tagName.toLowerCase()}) missing keyboard event handlers`,
              'error',
              'A'
            )
          );
          this.score -= 5;
          this.wcagLevels.A = false;
        }
      }

      // Check for negative tabindex
      const tabindex = el.getAttribute('tabindex');
      if (tabindex && parseInt(tabindex) < 0 && el.tagName.toLowerCase() !== 'div') {
        this.issues.push(
          new AccessibilityIssue(
            '2.1.1',
            `Element with tabindex="-1" may not be keyboard accessible`,
            'warning',
            'A'
          )
        );
        this.score -= 3;
      }
    });
  }

  checkNavigable(doc) {
    // 2.4.1 Bypass Blocks (Level A)
    const hasSkipLink = doc.querySelector('a[href^="#"]');
    const hasMain = doc.querySelector('main');
    if (!hasSkipLink && !hasMain) {
      this.issues.push(
        new AccessibilityIssue(
          '2.4.1',
          'No skip link or <main> element - add way to bypass repeated content',
          'warning',
          'A'
        )
      );
      this.score -= 3;
    }

    // 2.4.2 Page Titled (Level A)
    const title = doc.querySelector('title');
    if (!title || !title.textContent.trim()) {
      this.issues.push(
        new AccessibilityIssue(
          '2.4.2',
          'Missing or empty <title> element',
          'error',
          'A'
        )
      );
      this.score -= 5;
      this.wcagLevels.A = false;
    }

    // 2.4.3 Focus Order (Level A)
    const customTabIndexes = doc.querySelectorAll('[tabindex]:not([tabindex="0"]):not([tabindex="-1"])');
    if (customTabIndexes.length > 0) {
      this.issues.push(
        new AccessibilityIssue(
          '2.4.3',
          'Custom tabindex values may create confusing focus order',
          'warning',
          'A'
        )
      );
      this.score -= 3;
    }

    // 2.4.4 Link Purpose (Level A)
    const links = doc.querySelectorAll('a[href]');
    links.forEach((link, idx) => {
      const text = link.textContent.trim().toLowerCase();
      const genericTexts = ['click here', 'here', 'link', 'read more', 'more'];

      if (genericTexts.includes(text)) {
        this.issues.push(
          new AccessibilityIssue(
            '2.4.4',
            `Link ${idx + 1} has generic text "${text}" - use descriptive link text`,
            'warning',
            'A'
          )
        );
        this.score -= 2;
      }

      if (!text && !link.hasAttribute('aria-label') && !link.querySelector('img[alt]')) {
        this.issues.push(
          new AccessibilityIssue(
            '2.4.4',
            `Link ${idx + 1} has no text content or aria-label`,
            'error',
            'A'
          )
        );
        this.score -= 5;
        this.wcagLevels.A = false;
      }
    });

    // 2.4.6 Headings and Labels (Level AA)
    const forms = doc.querySelectorAll('form');
    forms.forEach((form, idx) => {
      const inputs = form.querySelectorAll('input:not([type="hidden"]), textarea, select');
      inputs.forEach((input, inputIdx) => {
        const id = input.getAttribute('id');
        const label = id ? form.querySelector(`label[for="${id}"]`) : input.closest('label');

        if (!label && !input.hasAttribute('aria-label') && !input.hasAttribute('aria-labelledby')) {
          this.issues.push(
            new AccessibilityIssue(
              '2.4.6',
              `Form ${idx + 1}, input ${inputIdx + 1} has no associated label`,
              'error',
              'AA'
            )
          );
          this.score -= 5;
          this.wcagLevels.AA = false;
        }
      });
    });
  }

  checkInputModalities(doc) {
    // 2.5.3 Label in Name (Level A)
    const labeledElements = doc.querySelectorAll('[aria-label]');
    labeledElements.forEach(el => {
      const ariaLabel = el.getAttribute('aria-label');
      const visibleText = el.textContent.trim();

      if (visibleText && ariaLabel && !ariaLabel.includes(visibleText)) {
        this.issues.push(
          new AccessibilityIssue(
            '2.5.3',
            'aria-label should include visible text for better voice recognition',
            'info',
            'A'
          )
        );
      }
    });
  }

  // WCAG Principle 3: Understandable
  checkUnderstandable(doc) {
    // 3.1.1 Language of Page (Level A)
    const html = doc.documentElement;
    if (!html.hasAttribute('lang')) {
      this.issues.push(
        new AccessibilityIssue(
          '3.1.1',
          'Missing lang attribute on <html> element',
          'error',
          'A'
        )
      );
      this.score -= 5;
      this.wcagLevels.A = false;
    }

    // 3.2.2 On Input (Level A)
    const inputs = doc.querySelectorAll('input, select');
    inputs.forEach(input => {
      if (input.hasAttribute('onchange') || input.hasAttribute('oninput')) {
        this.issues.push(
          new AccessibilityIssue(
            '3.2.2',
            'Form with onchange/oninput - ensure context changes are predictable',
            'info',
            'A'
          )
        );
      }
    });

    // 3.3.1 Error Identification (Level A)
    const requiredFields = doc.querySelectorAll('[required], [aria-required="true"]');
    if (requiredFields.length > 0) {
      const hasErrorMessages = doc.querySelector('[role="alert"], .error, [aria-live="polite"]');
      if (!hasErrorMessages) {
        this.issues.push(
          new AccessibilityIssue(
            '3.3.1',
            'Required fields present but no error message mechanism detected',
            'warning',
            'A'
          )
        );
        this.score -= 3;
      }
    }

    // 3.3.2 Labels or Instructions (Level A)
    const textInputs = doc.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea');
    textInputs.forEach((input, idx) => {
      const hasLabel = input.hasAttribute('aria-label') ||
                      input.hasAttribute('aria-labelledby') ||
                      input.closest('label') ||
                      doc.querySelector(`label[for="${input.id}"]`);

      if (!hasLabel) {
        this.issues.push(
          new AccessibilityIssue(
            '3.3.2',
            `Input ${idx + 1} missing label or instructions`,
            'error',
            'A'
          )
        );
        this.score -= 5;
        this.wcagLevels.A = false;
      }
    });
  }

  // WCAG Principle 4: Robust
  checkRobust(doc) {
    // 4.1.1 Parsing (Level A) - basic check
    const parserErrors = doc.querySelectorAll('parsererror');
    if (parserErrors.length > 0) {
      this.issues.push(
        new AccessibilityIssue(
          '4.1.1',
          'HTML parsing errors detected',
          'error',
          'A'
        )
      );
      this.score -= 10;
      this.wcagLevels.A = false;
    }

    // 4.1.2 Name, Role, Value (Level A)
    const customComponents = doc.querySelectorAll('[role]');
    customComponents.forEach((el, idx) => {
      const role = el.getAttribute('role');

      // Check for accessible name
      const hasName = el.hasAttribute('aria-label') ||
                     el.hasAttribute('aria-labelledby') ||
                     el.textContent.trim();

      if (['button', 'link', 'checkbox', 'radio'].includes(role) && !hasName) {
        this.issues.push(
          new AccessibilityIssue(
            '4.1.2',
            `Element with role="${role}" missing accessible name`,
            'error',
            'A'
          )
        );
        this.score -= 5;
        this.wcagLevels.A = false;
      }
    });

    // Check for duplicate IDs
    const ids = {};
    doc.querySelectorAll('[id]').forEach(el => {
      const id = el.getAttribute('id');
      if (ids[id]) {
        this.issues.push(
          new AccessibilityIssue(
            '4.1.1',
            `Duplicate ID found: "${id}" - IDs must be unique`,
            'error',
            'A'
          )
        );
        this.score -= 5;
        this.wcagLevels.A = false;
      }
      ids[id] = true;
    });
  }

  getReport() {
    this.score = Math.max(0, this.score);

    // Determine WCAG compliance level
    let complianceLevel = 'AAA';
    if (!this.wcagLevels.A) complianceLevel = 'Not Compliant';
    else if (!this.wcagLevels.AA) complianceLevel = 'A';
    else if (!this.wcagLevels.AAA) complianceLevel = 'AA';

    return {
      score: this.score,
      complianceLevel,
      issues: this.issues,
      summary: this.getSummary(),
    };
  }

  getSummary() {
    const errors = this.issues.filter(i => i.severity === 'error').length;
    const warnings = this.issues.filter(i => i.severity === 'warning').length;
    const info = this.issues.filter(i => i.severity === 'info').length;

    const byLevel = {
      A: this.issues.filter(i => i.wcagLevel === 'A').length,
      AA: this.issues.filter(i => i.wcagLevel === 'AA').length,
      AAA: this.issues.filter(i => i.wcagLevel === 'AAA').length,
    };

    return {
      errors,
      warnings,
      info,
      total: this.issues.length,
      byLevel,
    };
  }
}
