const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // TODO: Configure entry point
  entry: './src/index.js',
  
  // TODO: Configure output
  output: {
    // filename: ?
    // path: ?
  },
  
  // TODO: Configure loaders
  module: {
    rules: [
      // Add CSS loader rules
    ]
  },
  
  // TODO: Configure plugins
  plugins: [
    // Add HtmlWebpackPlugin
  ],
  
  // Dev server configuration
  devServer: {
    port: 3000,
    hot: true,
  }
};
