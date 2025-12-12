const fs = require('fs');
const path = require('path');

// TODO: Read tokens.json file
const tokensPath = path.join(__dirname, 'tokens.json');
// const tokens = ...

// TODO: Create a function to recursively generate CSS variables
function generateCSS(obj, prefix = '') {
  let css = '';

  // Hint: Loop through object entries
  // If the entry has a 'value' property, it's a token
  // If not, it's a nested object - recurse deeper

  return css;
}

// TODO: Create a function to generate Sass variables
function generateSCSS(obj, prefix = '') {
  let scss = '';

  // Similar to CSS, but use $ instead of --

  return scss;
}

// TODO: Generate CSS output
// const cssContent = `:root {\n${generateCSS(tokens)}}`;

// TODO: Add dark mode support (optional for starter)
// const darkModeCSS = `[data-theme="dark"] {\n  /* Add dark mode overrides */\n}`;

// TODO: Write build.css file
// fs.writeFileSync(path.join(__dirname, 'build.css'), cssContent);

// TODO: Write build.scss file
// fs.writeFileSync(path.join(__dirname, 'build.scss'), generateSCSS(tokens));

// TODO: Write build.js file (JavaScript export)
// const jsContent = `export const tokens = ${JSON.stringify(tokens, null, 2)};`;
// fs.writeFileSync(path.join(__dirname, 'build.js'), jsContent);

console.log('🚧 Build script incomplete - finish the TODOs above!');
console.log('Once complete, this will generate:');
console.log('  - build.css (CSS variables)');
console.log('  - build.scss (Sass variables)');
console.log('  - build.js (JavaScript export)');

