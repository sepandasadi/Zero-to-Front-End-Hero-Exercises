/**
 * Validates URLs to prevent XSS attacks via javascript: and data: URLs
 * Only allows http: and https: protocols
 */
export function isValidURL(url) {
  if (!url || url.trim() === '') {
    return false;
  }

  try {
    const parsed = new URL(url);

    // Only allow http and https protocols
    const allowedProtocols = ['http:', 'https:'];

    return allowedProtocols.includes(parsed.protocol);
  } catch (error) {
    // Invalid URL format
    return false;
  }
}

/**
 * Sanitizes a URL by validating it and returning safe version or empty string
 */
export function sanitizeURL(url) {
  return isValidURL(url) ? url : '';
}

