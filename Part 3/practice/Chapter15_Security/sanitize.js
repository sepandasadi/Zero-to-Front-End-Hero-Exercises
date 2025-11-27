// Minimal, opinionated wrappers for safe rendering
// In production prefer a vetted sanitizer (e.g., DOMPurify configured for your needs)
export function setText(el, value) {
  el.textContent = value == null ? '' : String(value)
}

export function setHTML(el, html, sanitizer) {
  const clean = sanitizer ? sanitizer(html) : String(html)
  // Better: use Trusted Types policy where available
  el.innerHTML = clean
}

export function safeURL(str, base = location.origin) {
  const url = new URL(str, base)
  if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new Error('Blocked URL scheme')
  return url
}
