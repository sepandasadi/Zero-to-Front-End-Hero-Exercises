// TODO: Import your design tokens CSS
// import '../styles/design-tokens.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // TODO: Configure backgrounds for light/dark mode testing
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
      ],
    },
  },

  // TODO: Add theme switcher to toolbar
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },

  // TODO: Add decorator to apply theme
  decorators: [
    // Add theme decorator here
  ],
};

export default preview;

