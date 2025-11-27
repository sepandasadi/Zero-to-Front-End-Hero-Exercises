# Solutions (Guidance)

- See `aria-examples-solution.html` for the semantic structure and skip link.
- See `keyboard-trap-solution.html` for focus trap and `Esc` handling + focus restore.
- `focus-visible.css` provides a compliant outline; ensure color contrast against backgrounds.
- `contrast-check.js` logs ratios; choose pairs meeting WCAG AA (4.5:1 normal text).
- Integrate axe in CI as a smoke test; keep manual/screen-reader checks in your release checklist.
