/**
 * Design Tokens - JavaScript Export
 * These tokens match the CSS variables defined in styles.css
 * Use these when you need to access tokens in JavaScript
 */

const tokens = {
  colors: {
    brand: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
    },
    semantic: {
      success: {
        light: '#10b981',
        dark: '#34d399'
      },
      warning: {
        light: '#f59e0b',
        dark: '#fbbf24'
      },
      error: {
        light: '#ef4444',
        dark: '#f87171'
      },
      info: {
        light: '#3b82f6',
        dark: '#60a5fa'
      }
    },
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    }
  },

  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
  },

  typography: {
    fontFamily: {
      sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      serif: "Georgia, Cambria, 'Times New Roman', Times, serif",
      mono: "'Courier New', Courier, monospace"
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    }
  },

  effects: {
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',   // 2px
      base: '0.25rem',  // 4px
      md: '0.375rem',   // 6px
      lg: '0.5rem',     // 8px
      xl: '0.75rem',    // 12px
      '2xl': '1rem',    // 16px
      full: '9999px',
    },
    transitions: {
      fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
      base: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
      slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
    }
  }
};

/**
 * Get a token value by path
 * @param {string} path - Dot-notation path to token (e.g., 'colors.brand.500')
 * @returns {*} Token value
 */
function getToken(path) {
  return path.split('.').reduce((obj, key) => obj?.[key], tokens);
}

/**
 * Export tokens as CSS variables format
 * @returns {string} CSS variables string
 */
function exportAsCSS() {
  const lines = [':root {'];

  // Colors
  Object.entries(tokens.colors.brand).forEach(([key, value]) => {
    lines.push(`  --color-brand-${key}: ${value};`);
  });

  Object.entries(tokens.colors.neutral).forEach(([key, value]) => {
    lines.push(`  --color-neutral-${key}: ${value};`);
  });

  Object.entries(tokens.colors.semantic).forEach(([name, colors]) => {
    lines.push(`  --color-${name}: ${colors.light};`);
  });

  // Spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    lines.push(`  --space-${key}: ${value};`);
  });

  // Typography
  lines.push(`  --font-sans: ${tokens.typography.fontFamily.sans};`);
  lines.push(`  --font-serif: ${tokens.typography.fontFamily.serif};`);
  lines.push(`  --font-mono: ${tokens.typography.fontFamily.mono};`);

  Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
    lines.push(`  --text-${key}: ${value};`);
  });

  Object.entries(tokens.typography.fontWeight).forEach(([key, value]) => {
    lines.push(`  --font-${key}: ${value};`);
  });

  // Effects
  Object.entries(tokens.effects.shadows).forEach(([key, value]) => {
    lines.push(`  --shadow-${key}: ${value};`);
  });

  Object.entries(tokens.effects.borderRadius).forEach(([key, value]) => {
    lines.push(`  --radius-${key}: ${value};`);
  });

  lines.push('}');
  return lines.join('\n');
}

/**
 * Export tokens as JSON
 * @returns {string} JSON string
 */
function exportAsJSON() {
  return JSON.stringify(tokens, null, 2);
}

/**
 * Export tokens as JavaScript module
 * @returns {string} JavaScript module string
 */
function exportAsModule() {
  return `export const tokens = ${JSON.stringify(tokens, null, 2)};`;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    tokens,
    getToken,
    exportAsCSS,
    exportAsJSON,
    exportAsModule
  };
}

