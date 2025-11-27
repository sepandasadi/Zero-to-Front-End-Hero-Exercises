# Part III – Section 3: Styling at Scale  
## Chapter 6 — Component Libraries  
### Exercise and Solutions

**Exercise: Settings Form + Activity Table**  
Build a settings page using a component library of your choice (MUI, Chakra, Bootstrap, or AntD).

**Requirements**  
- Profile card with name/email inputs and a newsletter toggle  
- Buttons: “Save” (primary) and “Cancel” (secondary/ghost)  
- Recent activity table (2–3 rows)  
- Theme tokens wired (brand color, radius, font family)  
- Optional: Dark mode toggle

**Deliverables**  
- Library‑specific theme setup (MUI `ThemeProvider`, Chakra `extendTheme`, Bootstrap Sass variables, or AntD `ConfigProvider`)  
- A single page implementing the profile form + table, using the theme tokens  
- Minimal overrides; prefer official theming mechanisms

**Included Solutions**  
- MUI: `mui/theme.tsx`, `mui/Settings.tsx`  
- Chakra: `chakra/theme.tsx`, `chakra/Settings.tsx`  
- Bootstrap: `bootstrap/index.html`, `bootstrap/_custom.scss`  
- AntD: `antd/App.tsx`
