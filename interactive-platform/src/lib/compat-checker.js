// Browser Compatibility Checker for CSS and JavaScript features

export class CompatibilityIssue {
  constructor(feature, type, support, alternatives = []) {
    this.feature = feature;
    this.type = type; // 'css' or 'js'
    this.support = support; // { chrome, firefox, safari, edge }
    this.alternatives = alternatives;
  }
}

export class CompatibilityChecker {
  constructor() {
    this.cssFeatures = this.initializeCSSFeatures();
    this.jsFeatures = this.initializeJSFeatures();
  }

  initializeCSSFeatures() {
    return {
      'display: grid': {
        name: 'CSS Grid',
        support: { chrome: 57, firefox: 52, safari: 10.1, edge: 16 },
        alternatives: ['Use Flexbox for simpler layouts', 'Use float-based layouts for older browsers'],
      },
      'display: flex': {
        name: 'Flexbox',
        support: { chrome: 29, firefox: 28, safari: 9, edge: 12 },
        alternatives: ['Use inline-block with vertical-align', 'Use table display for alignment'],
      },
      'var(--': {
        name: 'CSS Custom Properties',
        support: { chrome: 49, firefox: 31, safari: 9.1, edge: 15 },
        alternatives: ['Use preprocessor variables (SASS/LESS)', 'Use JavaScript to set values'],
      },
      '@supports': {
        name: 'CSS Feature Queries',
        support: { chrome: 28, firefox: 22, safari: 9, edge: 12 },
        alternatives: ['Use Modernizr for feature detection', 'Provide fallback styles'],
      },
      'backdrop-filter': {
        name: 'Backdrop Filter',
        support: { chrome: 76, firefox: 103, safari: 9, edge: 79 },
        alternatives: ['Use pseudo-elements with filters', 'Use solid backgrounds'],
        partial: true,
      },
      'position: sticky': {
        name: 'Sticky Positioning',
        support: { chrome: 56, firefox: 32, safari: 13, edge: 16 },
        alternatives: ['Use JavaScript scroll listeners', 'Use fixed positioning'],
      },
      ':has(': {
        name: 'CSS :has() Selector',
        support: { chrome: 105, firefox: 121, safari: 15.4, edge: 105 },
        alternatives: ['Use JavaScript for parent selection', 'Restructure HTML'],
        experimental: true,
      },
      'aspect-ratio': {
        name: 'Aspect Ratio',
        support: { chrome: 88, firefox: 89, safari: 15, edge: 88 },
        alternatives: ['Use padding-bottom percentage trick', 'Use JavaScript to calculate'],
      },
      'gap': {
        name: 'Gap (Flexbox/Grid)',
        support: { chrome: 84, firefox: 63, safari: 14.1, edge: 84 },
        alternatives: ['Use margin on child elements', 'Use padding on parent'],
      },
      'clamp(': {
        name: 'CSS Clamp()',
        support: { chrome: 79, firefox: 75, safari: 13.1, edge: 79 },
        alternatives: ['Use media queries', 'Use calc() with max/min'],
      },
    };
  }

  initializeJSFeatures() {
    return {
      'const ': {
        name: 'const declaration',
        support: { chrome: 49, firefox: 36, safari: 10, edge: 14 },
        alternatives: ['Use var instead', 'Use Babel transpiler'],
      },
      'let ': {
        name: 'let declaration',
        support: { chrome: 49, firefox: 44, safari: 10, edge: 14 },
        alternatives: ['Use var instead', 'Use Babel transpiler'],
      },
      '=>': {
        name: 'Arrow Functions',
        support: { chrome: 45, firefox: 22, safari: 10, edge: 12 },
        alternatives: ['Use function expressions', 'Use Babel transpiler'],
      },
      '...': {
        name: 'Spread Operator',
        support: { chrome: 46, firefox: 16, safari: 8, edge: 12 },
        alternatives: ['Use Array.prototype.concat()', 'Use apply()'],
      },
      'async ': {
        name: 'Async/Await',
        support: { chrome: 55, firefox: 52, safari: 11, edge: 15 },
        alternatives: ['Use Promises with .then()', 'Use generators with co library'],
      },
      'Promise': {
        name: 'Promises',
        support: { chrome: 32, firefox: 29, safari: 8, edge: 12 },
        alternatives: ['Use callback functions', 'Use Promise polyfill'],
      },
      '?.': {
        name: 'Optional Chaining',
        support: { chrome: 80, firefox: 74, safari: 13.1, edge: 80 },
        alternatives: ['Use && checks', 'Use lodash get()'],
      },
      '??': {
        name: 'Nullish Coalescing',
        support: { chrome: 80, firefox: 72, safari: 13.1, edge: 80 },
        alternatives: ['Use || operator', 'Use ternary operator'],
      },
      'BigInt': {
        name: 'BigInt',
        support: { chrome: 67, firefox: 68, safari: 14, edge: 79 },
        alternatives: ['Use Number for smaller values', 'Use big integer libraries'],
      },
      '.at(': {
        name: 'Array.at()',
        support: { chrome: 92, firefox: 90, safari: 15.4, edge: 92 },
        alternatives: ['Use array[index] or array[array.length - 1]', 'Use slice()'],
      },
      '.replaceAll(': {
        name: 'String.replaceAll()',
        support: { chrome: 85, firefox: 77, safari: 13.1, edge: 85 },
        alternatives: ['Use replace() with regex /g flag', 'Use split().join()'],
      },
      'fetch(': {
        name: 'Fetch API',
        support: { chrome: 42, firefox: 39, safari: 10.1, edge: 14 },
        alternatives: ['Use XMLHttpRequest', 'Use axios library'],
      },
    };
  }

  checkCSS(css) {
    const issues = [];

    for (const [pattern, info] of Object.entries(this.cssFeatures)) {
      if (css.includes(pattern)) {
        const support = this.analyzeBrowserSupport(info.support);

        if (support.needsPolyfill) {
          issues.push(
            new CompatibilityIssue(
              info.name,
              'css',
              info.support,
              info.alternatives
            )
          );
        }
      }
    }

    return issues;
  }

  checkJS(code) {
    const issues = [];

    for (const [pattern, info] of Object.entries(this.jsFeatures)) {
      if (code.includes(pattern)) {
        const support = this.analyzeBrowserSupport(info.support);

        if (support.needsPolyfill) {
          issues.push(
            new CompatibilityIssue(
              info.name,
              'js',
              info.support,
              info.alternatives
            )
          );
        }
      }
    }

    return issues;
  }

  analyzeBrowserSupport(support) {
    // Determine if feature needs polyfill based on "reasonable" browser support
    // We consider a feature "safe" if it works in:
    // - Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
    const modernVersions = {
      chrome: 90,
      firefox: 88,
      safari: 14,
      edge: 90,
    };

    const needsPolyfill = Object.keys(support).some(
      browser => support[browser] > modernVersions[browser]
    );

    return {
      needsPolyfill,
      minVersions: support,
    };
  }

  getReport(html, css, js) {
    const cssIssues = css ? this.checkCSS(css) : [];
    const jsIssues = js ? this.checkJS(js) : [];

    const allIssues = [...cssIssues, ...jsIssues];

    return {
      issues: allIssues,
      summary: {
        total: allIssues.length,
        css: cssIssues.length,
        js: jsIssues.length,
      },
      recommendations: this.generateRecommendations(allIssues),
    };
  }

  generateRecommendations(issues) {
    const recommendations = [];

    if (issues.length === 0) {
      recommendations.push({
        type: 'success',
        message: 'Great! Your code uses well-supported features.',
      });
      return recommendations;
    }

    const hasModernCSS = issues.some(i => i.type === 'css');
    const hasModernJS = issues.some(i => i.type === 'js');

    if (hasModernCSS) {
      recommendations.push({
        type: 'info',
        message: 'Consider using Autoprefixer to add vendor prefixes automatically.',
      });
    }

    if (hasModernJS) {
      recommendations.push({
        type: 'info',
        message: 'Consider using Babel to transpile modern JavaScript for older browsers.',
      });
    }

    const criticalFeatures = issues.filter(i =>
      i.support.chrome > 70 || i.support.safari > 13
    );

    if (criticalFeatures.length > 0) {
      recommendations.push({
        type: 'warning',
        message: `${criticalFeatures.length} features may not work in slightly older browsers. Provide fallbacks or test thoroughly.`,
      });
    }

    return recommendations;
  }

  // Get "Can I Use" link for a feature
  getCanIUseLink(featureName) {
    const slugs = {
      'CSS Grid': 'css-grid',
      'Flexbox': 'flexbox',
      'CSS Custom Properties': 'css-variables',
      'Arrow Functions': 'arrow-functions',
      'Async/Await': 'async-functions',
      'Optional Chaining': 'mdn-javascript_operators_optional_chaining',
      'Fetch API': 'fetch',
    };

    const slug = slugs[featureName] || featureName.toLowerCase().replace(/ /g, '-');
    return `https://caniuse.com/${slug}`;
  }
}
