// Utility module to demonstrate module bundling

export function greet(name) {
  return `Hello, ${name}! Welcome to Webpack bundling.`;
}

export function getCurrentTime() {
  return new Date().toLocaleTimeString();
}

export const APP_VERSION = '1.0.0';
