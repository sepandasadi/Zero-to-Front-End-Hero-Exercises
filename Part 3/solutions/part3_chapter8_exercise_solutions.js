// chapter8_exercise_solutions.js
// Part III – Section 3: Styling at Scale
// Chapter 8 — Creating a Design System
// Exercise Solutions: minimal token set, CSS variables, Tailwind bridge, and React primitives + Storybook docs.

const files = [
  // 1) Tokens (JSON) and built CSS variables
  {
    filename: "design-system/tokens/tokens.json",
    language: "json",
    contents: `{
  "color": {
    "primary":   { "value": "#2563eb" },
    "surface":   { "value": "#ffffff" },
    "text":      { "value": "#111827" }
  },
  "space": {
    "2": { "value": "0.5rem" },
    "4": { "value": "1rem" }
  },
  "radius": {
    "md": { "value": "12px" }
  },
  "shadow": {
    "card": { "value": "0 4px 12px rgba(0,0,0,.1)" }
  }
}`
  },
  {
    filename: "design-system/tokens/build.css",
    language: "css",
    contents: `:root{
  --color-primary:#2563eb;
  --color-surface:#ffffff;
  --color-text:#111827;
  --space-2:0.5rem;
  --space-4:1rem;
  --radius-md:12px;
  --shadow-card:0 4px 12px rgba(0,0,0,.1);
}
:root[data-theme="dark"]{
  --color-primary:#60a5fa;
  --color-surface:#0f172a;
  --color-text:#e5e7eb;
}`
  },

  // 2) Tailwind bridge and config
  {
    filename: "design-system/tokens/build.tailwind.js",
    language: "js",
    contents: `export default {
  colors: {
    primary: "var(--color-primary)",
    surface: "var(--color-surface)",
    text: "var(--color-text)"
  },
  boxShadow: {
    card: "var(--shadow-card)"
  },
  borderRadius: {
    md: "var(--radius-md)"
  },
  spacing: {
    2: "var(--space-2)",
    4: "var(--space-4)"
  }
};`
  },
  {
    filename: "tailwind.config.js",
    language: "js",
    contents: `import tokenTheme from "./design-system/tokens/build.tailwind.js";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    ...tokenTheme,
    extend: {}
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography")
  ]
};`
  },

  // 3) Global CSS and @apply primitives
  {
    filename: "src/index.css",
    language: "css",
    contents: `@tailwind base;
@tailwind components;
@tailwind utilities;

@import "../design-system/tokens/build.css";

/* Typography foundation */
:root {
  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
}

@layer base {
  html { font-family: var(--font-sans); background: var(--color-surface); color: var(--color-text); }
}

/* Component primitives */
@layer components {
  .btn { @apply inline-flex items-center gap-2 font-semibold rounded-md focus-visible:outline-none focus-visible:ring-2; }
  .btn-primary { @apply bg-primary text-surface focus-visible:ring-primary hover:opacity-90 px-4 py-2; }
  .btn-ghost { @apply text-primary border border-current bg-transparent px-4 py-2; }

  .card { @apply rounded-md shadow-card bg-surface; }
  .card-header { @apply px-4 py-3 font-semibold; }
  .card-body { @apply px-4 py-4; }
  .card-footer { @apply px-4 py-3 border-t; }
}`
  },

  // 4) React primitives (Button, Card) consuming tokens
  {
    filename: "src/components/Button.tsx",
    language: "tsx",
    contents: `import React from "react";

type ButtonProps = {
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const base = "btn focus-visible:ring-primary";
const variants = {
  primary: "btn-primary",
  ghost: "btn-ghost"
} as const;
const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2"
} as const;

export function Button({ variant="primary", size="md", className="", ...props }: ButtonProps) {
  return <button {...props} className={[base, variants[variant], sizes[size], className].join(" ").trim()} />;
}`
  },
  {
    filename: "src/components/Card.tsx",
    language: "tsx",
    contents: `import React from "react";

export function Card({ className="", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={["card", className].join(" ").trim()} />;
}
export function CardHeader({ className="", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={["card-header", className].join(" ").trim()} />;
}
export function CardBody({ className="", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={["card-body", className].join(" ").trim()} />;
}
export function CardFooter({ className="", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={["card-footer", className].join(" ").trim()} />;
}`
  },

  // 5) Demo screen
  {
    filename: "src/App.tsx",
    language: "tsx",
    contents: `import React from "react";
import { Button } from "./components/Button";
import { Card, CardBody, CardHeader, CardFooter } from "./components/Card";
import "./index.css";

export default function App() {
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Design System Demo</h1>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => setDark(d => !d)}>
            Toggle {dark ? "Light" : "Dark"}
          </Button>
          <Button>New</Button>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Revenue", body: "$24,500" },
          { title: "Active Users", body: "1,240" },
          { title: "Conversion", body: "3.4%" }
        ].map((c, i) => (
          <Card key={i}>
            <CardHeader>{c.title}</CardHeader>
            <CardBody><div className="text-2xl font-semibold">{c.body}</div></CardBody>
            <CardFooter><Button size="sm" variant="ghost">Details</Button></CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}`
  },

  // 6) Storybook MDX samples
  {
    filename: "src/components/Button.stories.mdx",
    language: "mdx",
    contents: `import { Meta, Story, Controls } from "@storybook/blocks";
import { Button } from "./Button";

<Meta title="Primitives/Button" of={Button} />

# Button
Use for primary actions. Sizes: \`sm\`, \`md\`. Variants: \`primary\`, \`ghost\`.

<Story name="Playground">
  <Button>Continue</Button>
</Story>

<Controls />`
  },
  {
    filename: "src/components/Card.stories.mdx",
    language: "mdx",
    contents: `import { Meta, Story } from "@storybook/blocks";
import { Card, CardBody, CardHeader, CardFooter } from "./Card";

<Meta title="Primitives/Card" of={Card} />

# Card
Card with header/body/footer regions.

<Story name="Default">
  <Card>
    <CardHeader>Title</CardHeader>
    <CardBody>Body content</CardBody>
    <CardFooter>Footer</CardFooter>
  </Card>
</Story>`
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
