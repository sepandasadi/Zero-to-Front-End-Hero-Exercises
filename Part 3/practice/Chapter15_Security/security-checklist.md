# Front-End Security Checklist (PR Ready)

- [ ] No `innerHTML` / `dangerouslySetInnerHTML` for untrusted content
- [ ] URL allowlist for any navigation/redirect parameters
- [ ] Cookies: `HttpOnly`, `Secure`, `SameSite=Lax/Strict` as appropriate
- [ ] CSP present (no inline/eval unless with nonces/hashes)
- [ ] No secrets in source or localStorage; short-lived tokens only
- [ ] CORS locked down; no wildcard with credentials
- [ ] Dependencies scanned (audit) and pinned for critical libs
- [ ] Forms and inputs validated; errors don’t leak internals
- [ ] iFrame/embed origins restricted via `frame-ancestors`
- [ ] Logs avoid sensitive data; analytics scrubbed
