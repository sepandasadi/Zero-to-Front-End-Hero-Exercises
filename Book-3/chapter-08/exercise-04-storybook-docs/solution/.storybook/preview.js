// Storybook Configuration - preview.js

import '../src/tokens/tokens.css'; // Import your design tokens

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    toc: true, // Enable table of contents
  },
  a11y: {
    config: {
      rules: [
        {
          // Disable color contrast check for specific stories if needed
          id: 'color-contrast',
          enabled: true,
        },
      ],
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#ffffff',
      },
      {
        name: 'dark',
        value: '#1f2937',
      },
      {
        name: 'gray',
        value: '#f3f4f6',
      },
    ],
  },
};

// Global decorators
export const decorators = [
  (Story) => `
    <div style="padding: 20px;">
      ${Story()}
    </div>
  `,
];

