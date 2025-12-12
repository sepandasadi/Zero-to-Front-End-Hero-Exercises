/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  // TODO: Configure stories location
  stories: [
    // Add paths to your story files here
    // Example: '../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx)'
  ],

  // TODO: Add addons
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    // Add a11y addon for accessibility testing
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {
    autodocs: 'tag',
  },
};

export default config;

