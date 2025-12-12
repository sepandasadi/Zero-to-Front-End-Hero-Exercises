// config.js - Mixed exports example

// Named exports
export const API_URL = 'https://jsonplaceholder.typicode.com';
export const TIMEOUT = 5000;
export const MAX_RETRIES = 3;

export const COLORS = {
  primary: '#667eea',
  secondary: '#764ba2',
  success: '#48bb78',
  error: '#f56565'
};

// Default export
const config = {
  api: {
    baseUrl: API_URL,
    timeout: TIMEOUT,
    retries: MAX_RETRIES
  },
  theme: COLORS,
  features: {
    darkMode: true,
    notifications: true,
    analytics: false
  }
};

export default config;

console.log('✓ Config module loaded (mixed exports)');

