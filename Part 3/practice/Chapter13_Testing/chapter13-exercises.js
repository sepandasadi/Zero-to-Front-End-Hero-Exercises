/* Write tests for the following utilities and component. Keep the AAA structure. */

export function isEmail(str) {
  if (typeof str !== 'string') return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim())
}

export async function fetchItems(fetchImpl = fetch) {
  const r = await fetchImpl('/api/items')
  if (!r.ok) throw new Error('HTTP ' + r.status)
  return r.json()
}
