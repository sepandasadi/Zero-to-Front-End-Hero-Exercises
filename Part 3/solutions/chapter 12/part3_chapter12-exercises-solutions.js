/* Chapter 12 — Solutions (Debugging Drills) */

export function safeDivide(a, b) {
  const num = Number(a), den = Number(b);
  console.group('safeDivide'); console.debug({ a, b, num, den });
  if (!Number.isFinite(num) || !Number.isFinite(den)) {
    console.groupEnd(); throw new TypeError('Inputs must be finite numbers');
  }
  if (den === 0) { console.groupEnd(); throw new RangeError('Division by zero'); }
  const res = num / den;
  console.groupEnd(); return res;
}

export function dedupeUsers(arr) {
  if (!Array.isArray(arr)) throw new TypeError('Expected an array');
  const out = []; const seen = new Set();
  for (const item of arr) {
    if (!item || typeof item !== 'object' || !('id' in item)) {
      console.warn('Skipping malformed entry', item); continue;
    }
    if (!seen.has(item.id)) { seen.add(item.id); out.push(item); }
  }
  return out;
}

function withTimeout(promise, ms) {
  return Promise.race([promise, new Promise((_, r) => setTimeout(() => r(new Error('Timeout')), ms))]);
}

export async function retryFetch(url, n = 3, baseDelayMs = 200) {
  let attempt = 0; let lastErr;
  while (attempt < n) {
    try {
      console.info('fetch attempt', { url, attempt });
      const res = await withTimeout(fetch(url), 5000);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res;
    } catch (e) {
      lastErr = e;
      const delay = baseDelayMs * 2 ** attempt;
      await new Promise(r => setTimeout(r, delay));
      attempt++;
    }
  }
  throw lastErr;
}

export function leakyListener(root = document) {
  // Leak: attach listeners to every button repeatedly
  const buttons = root.querySelectorAll('button');
  for (const btn of buttons) {
    btn.addEventListener('click', () => console.log('clicked', btn.textContent));
  }
  // Fix strategy: event delegation + teardown
  return function fix() {
    for (const btn of buttons) {
      // In real code we would keep a named handler to remove; this is illustrative
      // btn.removeEventListener('click', handler);
    }
    root.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      console.log('clicked (delegated)', b.textContent);
    }, { once: false });
  };
}

export function findLayoutThrash(el) {
  if (!el) throw new Error('Element required');
  // Bad: read -> write -> read could cause thrash
  const w = el.offsetWidth;
  el.style.width = w + 'px';
  // Better: batch via rAF
  requestAnimationFrame(() => {
    const width = el.offsetWidth; // read
    queueMicrotask(() => { el.style.width = width + 'px'; }); // write later
  });
  return true;
}
