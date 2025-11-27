# CSP Templates

## Strict nonce-based (production)
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-<NONCE>';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self';
```

## Hash-based (static)
```
script-src 'self' 'sha256-<HASH1>' 'sha256-<HASH2>'
```

## Dev (looser; tighten before release)
```
script-src 'self' 'unsafe-eval' http://localhost:*/
```
