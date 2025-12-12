/**
 * Validates URLs to prevent XSS attacks via javascript: and data: URLs
 * Only allows http: and https: protocols
 *
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if URL is safe, false otherwise
 */
export function isValidURL(url) {
  // Empty URLs are valid (optional field)
  if (!url || url.trim() === '') {
    return true;
  }

  try {
    const parsed = new URL(url);

    // Only allow http and https protocols
    // This blocks javascript:, data:, file:, etc.
    const allowedProtocols = ['http:', 'https:'];

    return allowedProtocols.includes(parsed.protocol);
  } catch (error) {
    // Invalid URL format
    return false;
  }
}

/**
 * Sanitizes a URL by validating it and returning safe version or empty string
 *
 * @param {string} url - The URL to sanitize
 * @returns {string} - Safe URL or empty string
 */
export function sanitizeURL(url) {
  return isValidURL(url) ? url : '';
}

/**
 * Examples of URLs and their validation results:
 *
 * isValidURL('https://example.com') // ✅ true
 * isValidURL('http://example.com')  // ✅ true
 * isValidURL('javascript:alert(1)') // ❌ false - XSS attempt
 * isValidURL('data:text/html,...')  // ❌ false - XSS attempt
 * isValidURL('file:///etc/passwd')  // ❌ false - Security risk
 * isValidURL('')                    // ✅ true - Empty is ok
 * isValidURL('not-a-url')          // ❌ false - Invalid format
 */

