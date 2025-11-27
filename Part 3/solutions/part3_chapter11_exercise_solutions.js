// chapter11_exercise_solutions.js
// Part III – Section 4: Performance & Best Practices
// Chapter 11 — Code Organization & Clean Code
// Exercise Solutions: Feature-sliced scaffold with typed services, hooks, and tests.

const files = [
  // 1) Folder structure (README)
  {
    filename: "org/README.md",
    language: "md",
    contents: `# Feature-Sliced Scaffold

app/               # app shell (providers, routing)
pages/             # route-level components
features/          # reusable feature units (search, auth, payment)
entities/          # domain entities (user, product)
shared/            # ui primitives, lib, config, api, styles

Each slice exposes a public API via index.ts. Cross-slice imports only go through public APIs.`
  },

  // 2) Shared API client (typed fetch wrapper)
  {
    filename: "shared/api/client.ts",
    language: "ts",
    contents: `export type Result<T> = { ok: true; data: T } | { ok: false; error: Error };

async function request<T>(input: RequestInfo, init?: RequestInit): Promise<Result<T>> {
  try {
    const res = await fetch(input, { headers: { 'Content-Type': 'application/json' }, ...init });
    if (!res.ok) return { ok: false, error: new Error(\`HTTP \${res.status}\`) };
    const json = (await res.json()) as unknown;
    return { ok: true, data: json as T };
  } catch (e) {
    return { ok: false, error: e as Error };
  }
}
export const api = { request };`
  },

  // 3) Entity: user (types + selectors)
  {
    filename: "entities/user/model.ts",
    language: "ts",
    contents: `export type User = { id: string; name: string; email: string };
export const selectUserName = (u: User) => u.name;`
  },

  // 4) Feature: auth (service + hook + UI)
  {
    filename: "features/auth/service.ts",
    language: "ts",
    contents: `import { api, Result } from "../../shared/api/client";
import type { User } from "../../entities/user/model";

export async function login(email: string, password: string): Promise<Result<User>> {
  return api.request<User>("/api/login", { method: "POST", body: JSON.stringify({ email, password }) });
}`
  },
  {
    filename: "features/auth/useAuth.ts",
    language: "ts",
    contents: `import { useCallback, useState } from "react";
import { login } from "./service";
import type { User } from "../../entities/user/model";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true); setError(null);
    const res = await login(email, password);
    if (res.ok) setUser(res.data); else setError(res.error.message);
    setLoading(false);
  }, []);

  return { user, loading, error, signIn };
}`
  },
  {
    filename: "features/auth/ui/LoginForm.tsx",
    language: "tsx",
    contents: `import * as React from "react";
import { useAuth } from "../useAuth";

export function LoginForm() {
  const { signIn, loading, error } = useAuth();
  const [email, setEmail] = React.useState(""); const [password, setPassword] = React.useState("");

  return (
    <form onSubmit={(e) => { e.preventDefault(); signIn(email, password); }}>
      <label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} /></label>
      <button disabled={loading}>{loading ? "Signing in…" : "Sign In"}</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}`
  },

  // 5) Page wiring
  {
    filename: "pages/LoginPage.tsx",
    language: "tsx",
    contents: `import * as React from "react";
import { LoginForm } from "../features/auth/ui/LoginForm";

export default function LoginPage() {
  return (
    <main style={{ maxWidth: 480, margin: "2rem auto", padding: "1rem" }}>
      <h1>Welcome back</h1>
      <LoginForm />
    </main>
  );
}`
  },

  // 6) ESLint + Prettier + tsconfig
  {
    filename: "package.json",
    language: "json",
    contents: `{
  "name": "org-clean-code",
  "type": "module",
  "scripts": {
    "build": "tsc -p tsconfig.json --noEmit",
    "lint": "eslint .",
    "format": "prettier -w .",
    "test": "vitest run"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "eslint": "^9.0.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "prettier": "^3.2.0",
    "typescript": "^5.0.0",
    "vitest": "^2.0.0"
  }
}`
  },
  {
    filename: ".eslintrc.json",
    language: "json",
    contents: `{
  "env": { "es2022": true, "browser": true },
  "extends": ["eslint:recommended"],
  "plugins": ["react-hooks"],
  "parserOptions": { "ecmaVersion": 2022, "sourceType": "module" },
  "rules": {
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  "ignorePatterns": ["dist/"]
}`
  },
  {
    filename: "tsconfig.json",
    language: "json",
    contents: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "jsx": "react-jsx",
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noEmit": true,
    "moduleResolution": "bundler",
    "types": ["vitest/globals"]
  },
  "include": ["**/*.ts", "**/*.tsx"]
}`
  },

  // 7) Unit test example (Vitest or Jest style)
  {
    filename: "features/auth/service.test.ts",
    language: "ts",
    contents: `import { login } from "./service";

global.fetch = vi.fn(async () => ({
  ok: true,
  json: async () => ({ id: "1", name: "Ada", email: "ada@ex.com" })
})) as any;

it("returns user on success", async () => {
  const res = await login("a@b.c", "pw");
  expect(res.ok).toBe(true);
  if (res.ok) expect(res.data.email).toBe("ada@ex.com");
});`
  }
];

// Utility to print files if run directly
if (typeof require !== 'undefined' && require.main === module) {
  files.forEach(f => {
    console.log("---- " + f.filename + " ----");
    console.log(f.contents);
    console.log();
  });
}

export default files;
