/* Chapter 12 — Debugging Drills
Implement each function, leaving helpful logs and guards.
Run in Node or the browser console.
*/

export function safeDivide(a, b) {
  // TODO: validate inputs; throw on divide-by-zero; log inputs
}

export function dedupeUsers(arr) {
  // TODO: accept array of {id, ...}; return unique by id; validate entries
}

export async function retryFetch(url, n = 3, baseDelayMs = 200) {
  // TODO: fetch with exponential backoff + timeout
}

export function leakyListener(root = document) {
  // TODO: intentionally add a leak (event listener on many nodes), then provide a fix strategy
}

export function findLayoutThrash(el) {
  // TODO: detect repeated read-write-read sequences; refactor to batch reads then writes
}
