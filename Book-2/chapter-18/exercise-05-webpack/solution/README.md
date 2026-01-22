# Exercise 05: Webpack Basics - Solution

## 🎯 What You'll Learn

- ✅ Webpack core concepts (entry, output, loaders, plugins)
- ✅ Configuring webpack.config.js
- ✅ Using loaders for CSS
- ✅ Using plugins (HtmlWebpackPlugin)
- ✅ Hot Module Replacement (HMR)
- ✅ Development vs production builds
- ✅ Webpack vs Vite comparison

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   Opens browser at http://localhost:3000

3. **Build for production:**
   ```bash
   npm run build
   ```
   Output in `dist/` folder

4. **Watch mode (rebuild on changes):**
   ```bash
   npm run watch
   ```

## 📚 Webpack Core Concepts

### 1. Entry
The starting point of your application:
```javascript
entry: './src/index.js'
```

### 2. Output
Where bundles are emitted:
```javascript
output: {
  filename: 'bundle.[contenthash].js',
  path: path.resolve(__dirname, 'dist')
}
```

### 3. Loaders
Transform files before bundling:
```javascript
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
  ]
}
```

**Loaders execute right-to-left:**
1. `css-loader` - reads CSS files
2. `style-loader` - injects CSS into DOM

### 4. Plugins
Extend Webpack functionality:
```javascript
plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html'
  })
]
```

## 🔧 Configuration Explained

### webpack.config.js Breakdown

```javascript
// 1. Entry Point
entry: './src/index.js'
// Webpack starts here and builds dependency graph

// 2. Output
output: {
  filename: 'bundle.[contenthash].js',
  // [contenthash] = cache busting
  path: path.resolve(__dirname, 'dist'),
  clean: true // Cleans dist/ before each build
}

// 3. Module Rules (Loaders)
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
  ]
}

// 4. Plugins
plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html'
  })
]

// 5. Dev Server
devServer: {
  port: 3000,
  hot: true // HMR enabled
}
```

## 📊 Webpack vs Vite

| Feature | Webpack | Vite |
|---------|---------|------|
| **Speed** | Slower (bundles everything) | Very fast (ES modules) |
| **Config** | More complex | Minimal |
| **HMR** | Good | Excellent |
| **Ecosystem** | Huge | Growing |
| **Learning Curve** | Steeper | Gentler |
| **Best For** | Complex apps, legacy projects | Modern apps, quick start |

## 🎯 When to Use Webpack

- ✅ Complex build requirements
- ✅ Need specific loader/plugin
- ✅ Legacy browser support critical
- ✅ Migrating from Webpack already
- ✅ Enterprise projects with established Webpack setups

## 🎯 When to Use Vite

- ✅ Modern browsers (ES6+ support)
- ✅ Fast development experience priority
- ✅ New projects
- ✅ Simpler configuration preferred
- ✅ Smaller to medium applications

## 💡 Key Takeaways

1. **Webpack is powerful but complex** - Requires configuration
2. **Loaders transform files** - CSS, images, TypeScript, etc.
3. **Plugins extend functionality** - HTML generation, optimization, etc.
4. **Dev server provides HMR** - Fast development workflow
5. **Production builds optimize** - Minification, tree shaking, etc.

## 🔗 Further Learning

- [Webpack Documentation](https://webpack.js.org/)
- [Webpack Loaders](https://webpack.js.org/loaders/)
- [Webpack Plugins](https://webpack.js.org/plugins/)
- [Webpack Guides](https://webpack.js.org/guides/)

## 🚀 Next Steps

After understanding Webpack basics:
1. Try adding Babel loader for JS transpilation
2. Add image optimization loaders
3. Configure code splitting
4. Set up separate dev/prod configs
5. Explore advanced plugins

Remember: Vite is often better for new projects, but Webpack knowledge is valuable for understanding build processes and working with existing projects!
