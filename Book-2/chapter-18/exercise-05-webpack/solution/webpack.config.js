const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Entry point - where Webpack starts bundling
  entry: './src/index.js',
  
  // Output configuration
  output: {
    filename: 'bundle.[contenthash].js', // Hashed filename for caching
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Clean dist folder before each build
  },
  
  // Loaders - transform files before bundling
  module: {
    rules: [
      {
        test: /\.css$/, // Match .css files
        use: ['style-loader', 'css-loader'], // Apply loaders right to left
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource', // Built-in asset handling
      },
    ]
  },
  
  // Plugins - extend Webpack functionality
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Use this as template
      filename: 'index.html',
      inject: 'body', // Inject scripts at end of body
    }),
  ],
  
  // Dev server configuration
  devServer: {
    static: './dist',
    port: 3000,
    hot: true, // Hot Module Replacement
    open: true, // Open browser automatically
  },
  
  // Development tools
  devtool: 'source-map', // Generate source maps for debugging
};
