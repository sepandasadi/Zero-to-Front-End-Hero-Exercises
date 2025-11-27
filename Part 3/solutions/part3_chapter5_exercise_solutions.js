// chapter5_exercise_solutions.js
// Part III – Section 3: Styling at Scale
// Chapter 5 — Utility-First CSS (Tailwind)
// Exercise Solutions: minimal files to demonstrate tokens, theming, @apply, and a Dashboard layout.

const files = [
  {
    filename: "tailwind.config.js",
    language: "js",
    contents: `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      surface: "var(--surface)",
      text: "var(--text)",
      primary: "var(--primary)",
      slate: {
        50: "#f8fafc",
        300: "#cbd5e1",
        600: "#475569",
        900: "#0f172a"
      }
    },
    spacing: {
      px: "1px",
      0: "0",
      1: ".25rem",
      2: ".5rem",
      3: ".75rem",
      4: "1rem",
      6: "1.5rem",
      8: "2rem"
    },
    extend: {
      borderRadius: { xl: "0.75rem" },
      boxShadow: { card: "0 4px 12px rgba(0,0,0,.1)" }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio")
  ]
};`
  },
  {
    filename: "index.html",
    language: "html",
    contents: `<!doctype html>
<html class="light" lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tailwind Dashboard</title>
    <script type="module" src="/src/main.jsx"></script>
  </head>
  <body class="bg-surface text-text">
    <div id="root"></div>
  </body>
</html>`
  },
  {
    filename: "src/index.css",
    language: "css",
    contents: `@tailwind base;
@tailwind components;
@tailwind utilities;

/* CSS variables enable runtime theming */
:root {
  --surface: #ffffff;
  --text: #111827;
  --primary: #2563eb;
}
.dark {
  --surface: #0f172a;
  --text: #e5e7eb;
  --primary: #60a5fa;
}

/* Extract a few primitives with @apply for reuse */
@layer components {
  .btn { @apply inline-flex items-center gap-2 font-semibold rounded-lg focus-visible:outline-none focus-visible:ring-2; }
  .btn-primary { @apply bg-primary text-surface focus-visible:ring-primary hover:opacity-90 px-4 py-2; }
  .btn-ghost { @apply text-primary border border-current bg-transparent px-4 py-2; }
}
`
  },
  {
    filename: "src/Dashboard.jsx",
    language: "jsx",
    contents: `export function Dashboard({ onToggleTheme }) {
  const cards = [
    { id: 1, title: "Revenue", body: "$24,500" },
    { id: 2, title: "Active Users", body: "1,240" },
    { id: 3, title: "Conversion", body: "3.4%" }
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-text">Overview</h1>
        <div className="flex gap-2">
          <button className="btn btn-ghost" onClick={onToggleTheme}>Toggle Theme</button>
          <button className="btn btn-primary">New Report</button>
        </div>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(c => (
          <li key={c.id} className="rounded-xl bg-surface shadow-card p-4">
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">{c.title}</h3>
            <div className="mt-2 text-2xl font-semibold text-text">{c.body}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
`
  },
  {
    filename: "src/main.jsx",
    language: "jsx",
    contents: `import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Dashboard } from "./Dashboard";

function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return <Dashboard onToggleTheme={() => setDark(d => !d)} />;
}

createRoot(document.getElementById("root")).render(<App />);`
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
