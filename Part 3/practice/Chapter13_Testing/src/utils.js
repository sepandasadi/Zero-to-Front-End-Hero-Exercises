export function formatPrice(cents) {
  const n = Number(cents)
  if (!Number.isFinite(n)) throw new TypeError('cents must be a number')
  return `$${(n / 100).toFixed(2)}`
}

export function clamp(n, min, max) {
  const x = Number(n); const a = Number(min); const b = Number(max);
  if (![x,a,b].every(Number.isFinite)) throw new TypeError('clamp expects numbers')
  if (a > b) throw new RangeError('min must be <= max')
  return Math.min(b, Math.max(a, x))
}

export function slugify(str) {
  if (typeof str !== 'string') throw new TypeError('slugify expects a string')
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}
