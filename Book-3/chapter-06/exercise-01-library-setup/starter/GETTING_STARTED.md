# Exercise 01: Library Setup - Getting Started

## Your Task

Build the **same page** in all 4 component libraries (MUI, Chakra UI, Bootstrap, Ant Design) to compare their developer experience.

## Step-by-Step Instructions

### 1. Create 4 separate projects

```bash
# Material UI
npm create vite@latest mui-demo -- --template react
cd mui-demo
npm install
npm install @mui/material @emotion/react @emotion/styled

# Chakra UI
npm create vite@latest chakra-demo -- --template react
cd chakra-demo
npm install
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion

# Bootstrap
npm create vite@latest bootstrap-demo -- --template react
cd bootstrap-demo
npm install
npm install bootstrap react-bootstrap

# Ant Design
npm create vite@latest antd-demo -- --template react
cd antd-demo
npm install
npm install antd
```

### 2. Set up each library

Follow the setup instructions in the main README.md for each library.

### 3. Build the required page

Each implementation must include:

**Header:**
- Logo (text)
- Navigation links (Home, About, Contact)
- Primary action button

**Main Content:**
- Page heading
- Description paragraph
- Card with title, body text, and button

**Form:**
- Text input (Name)
- Email input
- Select dropdown (Country with 4+ options)
- Checkbox (Terms and conditions)
- Submit button

### 4. Compare the libraries

After building all 4, fill out the comparison table in a file called `COMPARISON.md`:

```markdown
# Library Comparison

| Criteria | MUI | Chakra | Bootstrap | Ant Design |
|----------|-----|--------|-----------|------------|
| Setup Difficulty (1-5) | | | | |
| Code Required (lines) | | | | |
| Developer Experience (1-5) | | | | |
| Documentation Quality (1-5) | | | | |
| API Intuition (1-5) | | | | |
| Would Use Again? (Yes/No) | | | | |

## My Recommendation

[Write which library you'd choose and why]
```

## Tips

- Start with the library that looks most familiar
- Copy-paste from documentation is OK for this exercise
- Focus on comparing, not perfecting
- Take notes as you build
- Time how long each takes

## Need Help?

Check the `hints/` folder for:
- Complete MUI example
- Complete Chakra example
- Comparison guide

## Success Criteria

- [ ] 4 working applications
- [ ] All required components in each
- [ ] Comparison table filled out
- [ ] Personal recommendation written

Good luck! 🚀

