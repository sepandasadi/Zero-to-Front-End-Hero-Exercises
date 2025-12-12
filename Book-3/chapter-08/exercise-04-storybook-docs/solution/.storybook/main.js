// Storybook Configuration - main.js

module.exports = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],

  framework: {
    name: '@storybook/html-vite', // or '@storybook/react-vite' for React
    options: {},
  },

  docs: {
    autodocs: 'tag',
  },

  staticDirs: ['../public'],
};

