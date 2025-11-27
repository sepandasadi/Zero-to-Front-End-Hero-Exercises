# Solutions (Guidance)

- Use a bundle analyzer to find heavy deps (date-fns subpath imports, remove moment locales).
- Add `aspect-ratio` or explicit `width/height` to images; preload `woff2` with `font-display: swap`.
- Split routes and heavy widgets with dynamic import; memoize lists and use virtualization.
- Capture Web Vitals via the provided snippet and print aggregated results.
