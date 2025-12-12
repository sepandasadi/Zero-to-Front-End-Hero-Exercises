// index.js - Barrel pattern (re-exports)

// Re-export everything from math
export * from './math.js';

// Re-export default as named export
export { default as Logger } from './logger.js';

// Re-export from config
export * from './config.js';
export { default as config } from './config.js';

// You could also do:
// export { add, subtract, PI } from './math.js';

console.log('✓ Barrel (index.js) loaded - all utilities available');

