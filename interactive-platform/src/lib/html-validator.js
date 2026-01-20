// HTML Validator - checks semantic structure, accessibility, and best practices

export class HTMLValidationResult {
  constructor(type, message, severity = 'info', line = null) {
    this.type = type; // 'semantic', 'accessibility', 'structure', 'meta'
    this.message = message;
    this.severity = severity; // 'error', 'warning', 'info', 'success'
    this.line = line;
  }
}

export class HTMLValidator {
  constructor() {
    this.results = [];
    this.score = 100;
  }

  validate(html) {
    this.results = [];
    this.score = 100;

    if (!html || html.trim() === '') {
      this.results.push(
        new HTMLValidationResult(
          'structure',
          'No HTML content to validate',
          'error'
        )
      );
      this.score = 0;
      return this.getReport();
    }

    // Create a DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Check for parser errors
    const parserErrors = doc.querySelectorAll('parsererror');
    if (parserErrors.length > 0) {
      this.results.push(
        new HTMLValidationResult(
          'structure',
          'HTML parsing errors detected - check syntax',
          'error'
        )
      );
      this.score -= 20;
    }

    // Run all validation checks
    this.checkDoctype(html);
    this.checkLangAttribute(doc);
    this.checkMetaTags(doc);
    this.checkSemanticStructure(doc);
    this.checkAccessibility(doc);
    this.checkBestPractices(doc);

    return this.getReport();
  }

  checkDoctype(html) {
    const hasDoctype = html.trim().toLowerCase().startsWith('<!doctype');
    if (hasDoctype) {
      this.results.push(
        new HTMLValidationResult(
          'structure',
          'Document has proper DOCTYPE declaration',
          'success'
        )
      );
    } else {
      this.results.push(
        new HTMLValidationResult(
          'structure',
          'Missing DOCTYPE declaration - add <!DOCTYPE html>',
          'warning'
        )
      );
      this.score -= 5;
    }
  }

  checkLangAttribute(doc) {
    const html = doc.documentElement;
    if (html && html.hasAttribute('lang')) {
      this.results.push(
        new HTMLValidationResult(
          'accessibility',
          `Language attribute present: ${html.getAttribute('lang')}`,
          'success'
        )
      );
    } else {
      this.results.push(
        new HTMLValidationResult(
          'accessibility',
          'Missing lang attribute on <html> tag - important for screen readers',
          'warning'
        )
      );
      this.score -= 5;
    }
  }

  checkMetaTags(doc) {
    const metaCharset = doc.querySelector('meta[charset]');
    if (metaCharset) {
      this.results.push(
        new HTMLValidationResult(
          'meta',
          'Character encoding specified',
          'success'
        )
      );
    } else {
      this.results.push(
        new HTMLValidationResult(
          'meta',
          'Missing charset meta tag - add <meta charset="UTF-8">',
          'warning'
        )
      );
      this.score -= 3;
    }

    const metaViewport = doc.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      this.results.push(
        new HTMLValidationResult(
          'meta',
          'Viewport meta tag present (mobile-friendly)',
          'success'
        )
      );
    } else {
      this.results.push(
        new HTMLValidationResult(
          'meta',
          'Consider adding viewport meta tag for responsive design',
          'info'
        )
      );
    }

    const title = doc.querySelector('title');
    if (title && title.textContent.trim()) {
      this.results.push(
        new HTMLValidationResult(
          'meta',
          `Page title: "${title.textContent}"`,
          'success'
        )
      );
    } else {
      this.results.push(
        new HTMLValidationResult(
          'meta',
          'Missing or empty <title> tag',
          'warning'
        )
      );
      this.score -= 3;
    }
  }

  checkSemanticStructure(doc) {
    const semanticElements = {
      header: doc.querySelectorAll('header'),
      nav: doc.querySelectorAll('nav'),
      main: doc.querySelectorAll('main'),
      article: doc.querySelectorAll('article'),
      section: doc.querySelectorAll('section'),
      aside: doc.querySelectorAll('aside'),
      footer: doc.querySelectorAll('footer'),
    };

    const totalSemantic = Object.values(semanticElements).reduce(
      (sum, els) => sum + els.length,
      0
    );
    const totalDivs = doc.querySelectorAll('div').length;

    if (totalSemantic === 0 && totalDivs > 5) {
      this.results.push(
        new HTMLValidationResult(
          'semantic',
          `Only using <div> elements (${totalDivs} found) - consider semantic HTML`,
          'warning'
        )
      );
      this.score -= 15;
    } else if (totalSemantic > 0) {
      this.results.push(
        new HTMLValidationResult(
          'semantic',
          `Good use of semantic HTML (${totalSemantic} semantic elements)`,
          'success'
        )
      );
    }

    // Check for multiple <main> elements (should only have one)
    if (semanticElements.main.length > 1) {
      this.results.push(
        new HTMLValidationResult(
          'semantic',
          'Multiple <main> elements found - should only have one per page',
          'error'
        )
      );
      this.score -= 10;
    }

    // Check heading hierarchy
    this.checkHeadingHierarchy(doc);
  }

  checkHeadingHierarchy(doc) {
    const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));

    if (headings.length === 0) {
      this.results.push(
        new HTMLValidationResult(
          'semantic',
          'No headings found - consider adding heading structure',
          'info'
        )
      );
      return;
    }

    const h1Count = doc.querySelectorAll('h1').length;
    if (h1Count === 0) {
      this.results.push(
        new HTMLValidationResult(
          'semantic',
          'No <h1> element found - every page should have one main heading',
          'warning'
        )
      );
      this.score -= 5;
    } else if (h1Count > 1) {
      this.results.push(
        new HTMLValidationResult(
          'semantic',
          `Multiple <h1> elements found (${h1Count}) - best practice is one per page`,
          'warning'
        )
      );
      this.score -= 3;
    } else {
      this.results.push(
        new HTMLValidationResult(
          'semantic',
          'Proper use of <h1> heading',
          'success'
        )
      );
    }

    // Check for skipped heading levels
    const levels = headings.map(h => parseInt(h.tagName.substring(1)));
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] - levels[i - 1] > 1) {
        this.results.push(
          new HTMLValidationResult(
            'semantic',
            `Heading hierarchy skip detected: <h${levels[i - 1]}> → <h${levels[i]}>`,
            'warning'
          )
        );
        this.score -= 3;
        break;
      }
    }
  }

  checkAccessibility(doc) {
    // Check images for alt text
    const images = doc.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(
      img => !img.hasAttribute('alt')
    );

    if (images.length > 0) {
      if (imagesWithoutAlt.length === 0) {
        this.results.push(
          new HTMLValidationResult(
            'accessibility',
            `All ${images.length} images have alt text`,
            'success'
          )
        );
      } else {
        this.results.push(
          new HTMLValidationResult(
            'accessibility',
            `${imagesWithoutAlt.length} of ${images.length} images missing alt text`,
            'error'
          )
        );
        this.score -= 10;
      }
    }

    // Check form inputs for labels
    const inputs = doc.querySelectorAll('input:not([type="hidden"]), textarea, select');
    const inputsWithoutLabel = Array.from(inputs).filter(input => {
      const id = input.getAttribute('id');
      if (!id) return true;
      const label = doc.querySelector(`label[for="${id}"]`);
      return !label && !input.closest('label');
    });

    if (inputs.length > 0) {
      if (inputsWithoutLabel.length === 0) {
        this.results.push(
          new HTMLValidationResult(
            'accessibility',
            `All ${inputs.length} form inputs have labels`,
            'success'
          )
        );
      } else {
        this.results.push(
          new HTMLValidationResult(
            'accessibility',
            `${inputsWithoutLabel.length} form inputs missing labels`,
            'error'
          )
        );
        this.score -= 10;
      }
    }

    // Check for buttons with no text
    const buttons = doc.querySelectorAll('button');
    const emptyButtons = Array.from(buttons).filter(
      btn => !btn.textContent.trim() && !btn.getAttribute('aria-label')
    );

    if (emptyButtons.length > 0) {
      this.results.push(
        new HTMLValidationResult(
          'accessibility',
          `${emptyButtons.length} buttons have no text or aria-label`,
          'error'
        )
      );
      this.score -= 8;
    }

    // Check for links with generic text
    const links = doc.querySelectorAll('a[href]');
    const genericLinks = Array.from(links).filter(link => {
      const text = link.textContent.trim().toLowerCase();
      return ['click here', 'here', 'link', 'read more'].includes(text);
    });

    if (genericLinks.length > 0) {
      this.results.push(
        new HTMLValidationResult(
          'accessibility',
          `${genericLinks.length} links with generic text - use descriptive link text`,
          'warning'
        )
      );
      this.score -= 5;
    }
  }

  checkBestPractices(doc) {
    // Check for inline styles
    const elementsWithInlineStyles = doc.querySelectorAll('[style]');
    if (elementsWithInlineStyles.length > 5) {
      this.results.push(
        new HTMLValidationResult(
          'structure',
          `${elementsWithInlineStyles.length} elements with inline styles - consider using CSS classes`,
          'info'
        )
      );
    }

    // Check for deprecated elements
    const deprecated = ['font', 'center', 'marquee', 'blink'];
    deprecated.forEach(tag => {
      const elements = doc.querySelectorAll(tag);
      if (elements.length > 0) {
        this.results.push(
          new HTMLValidationResult(
            'structure',
            `Deprecated <${tag}> element found - use modern CSS instead`,
            'warning'
          )
        );
        this.score -= 5;
      }
    });

    // Check for empty elements
    const elementsToCheck = ['p', 'div', 'span', 'section', 'article'];
    elementsToCheck.forEach(tag => {
      const elements = doc.querySelectorAll(tag);
      const empty = Array.from(elements).filter(
        el => !el.textContent.trim() && el.children.length === 0
      );
      if (empty.length > 3) {
        this.results.push(
          new HTMLValidationResult(
            'structure',
            `${empty.length} empty <${tag}> elements found`,
            'info'
          )
        );
      }
    });
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
