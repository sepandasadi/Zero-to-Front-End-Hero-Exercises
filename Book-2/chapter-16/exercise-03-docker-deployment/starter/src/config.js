/**
 * Application Configuration
 *
 * Validates and exports environment variables.
 * Fails fast if required variables are missing.
 */

// List of required environment variables
const requiredEnvVars = [
  'VITE_API_URL',
  'VITE_ENV',
];

// Validate that all required variables are present
requiredEnvVars.forEach((varName) => {
  if (!import.meta.env[varName]) {
    throw new Error(
      `Missing required environment variable: ${varName}\n` +
      `Please create a .env file based on .env.example`
    );
  }
});

// Export validated configuration
export const config = {
  // API Configuration
  apiUrl: import.meta.env.VITE_API_URL,
  environment: import.meta.env.VITE_ENV,

  // Debug mode (only in development/staging)
  debug: import.meta.env.VITE_ENABLE_DEBUG === 'true',

  // External Services
  sentryDsn: import.meta.env.VITE_SENTRY_DSN || '',
  googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || '',

  // Feature Flags
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',

  // Build Information
  mode: import.meta.env.MODE,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Log configuration in development
if (config.debug) {
  console.log('🔧 Application Configuration:', config);
}

// Freeze config to prevent modifications
Object.freeze(config);

export default config;

