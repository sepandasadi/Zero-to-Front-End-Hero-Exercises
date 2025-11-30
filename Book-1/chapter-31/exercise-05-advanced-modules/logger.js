// logger.js - Default export example

class Logger {
  constructor(prefix = '') {
    this.prefix = prefix;
  }

  log(message) {
    console.log(`${this.prefix}[LOG] ${message}`);
  }

  info(message) {
    console.log(`${this.prefix}[INFO] ℹ️ ${message}`);
  }

  success(message) {
    console.log(`${this.prefix}[SUCCESS] ✅ ${message}`);
  }

  warning(message) {
    console.warn(`${this.prefix}[WARNING] ⚠️ ${message}`);
  }

  error(message) {
    console.error(`${this.prefix}[ERROR] ❌ ${message}`);
  }

  group(title, callback) {
    console.group(this.prefix + title);
    callback();
    console.groupEnd();
  }
}

export default Logger;

console.log('✓ Logger module loaded (default export)');

