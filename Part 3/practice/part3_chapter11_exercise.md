# Part III – Section 4: Performance & Best Practices  
## Chapter 11 — Code Organization & Clean Code  
### Exercise and Solutions

**Exercise: Feature‑Sliced Login**  
Create a feature‑sliced scaffold with:
- Shared `api` client (typed wrapper)
- `entities/user` types + selectors
- `features/auth` with `service`, `useAuth` hook, and `LoginForm` UI
- `pages/LoginPage` wiring
- ESLint/Prettier/tsconfig and one unit test

**Included Solutions**  
- `shared/api/client.ts` – typed fetch helper  
- `entities/user/model.ts` – User type + selector  
- `features/auth/service.ts`, `useAuth.ts`, `ui/LoginForm.tsx`  
- `pages/LoginPage.tsx` – route‑level page  
- Lint/format/type/test configs: `.eslintrc.json`, `package.json` scripts, `tsconfig.json`, `features/auth/service.test.ts`

**Goal**  
Encapsulate concerns by feature, expose minimal public APIs, and enforce quality gates (lint, type check, test) to keep the codebase clean as it scales.
