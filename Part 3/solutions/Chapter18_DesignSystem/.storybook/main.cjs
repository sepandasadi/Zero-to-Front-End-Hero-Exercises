// .storybook/main.cjs
module.exports = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-essentials'],
  framework: { name: '@storybook/react-vite', options: {} },
}
