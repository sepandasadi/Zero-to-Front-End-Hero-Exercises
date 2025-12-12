# Chapter 8: Creating a Design System - Quiz

Test your understanding of design systems with these 15 comprehensive questions.

---

##  **Question 1**

What is the difference between a component library and a design system?

A) They are the same thing
B) A design system is just the Figma files
C) A design system includes tokens, components, documentation, guidelines, and governance
D) A component library is more comprehensive

<details>
<summary>Show Answer</summary>

**Answer:** C

**Explanation:** A component library is just the code. A design system is the complete package: design tokens, component library, documentation, usage guidelines, design principles, and governance model. It's the single source of truth for both design and development.

</details>

---

## **Question 2**

What are design tokens?

A) Cryptocurrency for designers
B) Named variables storing design decisions (colors, spacing, etc.)
C) Premium Figma features
D) Authentication tokens for design tools

<details>
<summary>Show Answer</summary>

**Answer:** B

**Explanation:** Design tokens are named variables that store design decisions. Instead of hardcoding `#3B82F6`, you use `--color-primary-500`. This creates a single source of truth, makes theming easy, and ensures consistency.

</details>

---

## **Question 3**

Why did Airbnb invest in building a design system?

A) They had 400 shades of gray and 92 button sizes (chaos!)
B) Their CEO likes design
C) It was a fun side project
D) Their competitors had one

<details>
<summary>Show Answer</summary>

**Answer:** A

**Explanation:** Airbnb had massive inconsistency: over 400 shades of gray, 92 button sizes, 42 font sizes. Their design system (DLS) standardized everything, reduced development time by 3x, and cut bugs by 40%. The ROI was massive.

</details>

---

## **Question 4**

What is the correct order of layers in a design system (foundation to top)?

A) Components → Tokens → Documentation
B) Tokens → Components → Documentation → Governance
C) Documentation → Components → Tokens
D) Governance → Documentation → Components

<details>
<summary>Show Answer</summary>

**Answer:** B

**Explanation:** You build from the foundation up: 1) Design Tokens (foundation), 2) Components (primitives, then composites), 3) Documentation (how to use everything), 4) Guidelines (design principles), 5) Governance (how it evolves).

</details>

---

## **Question 5**

What is the recommended spacing scale for design systems?

A) Random values as needed
B) Increments of 4px or 8px
C) Only use 10px increments
D) Fibonacci sequence

<details>
<summary>Show Answer</summary>

**Answer:** B

**Explanation:** Most design systems use 4px or 8px increments for visual harmony and consistency: 4px, 8px, 12px, 16px, 24px, 32px, etc. This creates a systematic scale that feels cohesive.

</details>

---

## **Question 6**

Which tool is the industry standard for component documentation?

A) Google Docs
B) Notion
C) Storybook
D) Confluence

<details>
<summary>Show Answer</summary>

**Answer:** C

**Explanation:** Storybook is the industry standard for documenting component libraries. It provides an interactive playground, visual testing, accessibility testing, and serves as the hub of your design system documentation.

</details>

---

## **Question 7**

What's the problem with this color token naming?

```css
--color-blue: #3B82F6;
```

A) Nothing wrong with it
B) Should be `--blue` not `--color-blue`
C) Not semantic (what if you change blue to green?)
D) Too long

<details>
<summary>Show Answer</summary>

**Answer:** C

**Explanation:** `--color-blue` describes the appearance, not the purpose. Better: `--color-primary` (semantic). If you change your brand from blue to green, you don't want to have `--color-blue: green` (confusing!). Semantic names are future-proof.

</details>

---

## **Question 8**

When building a design system, you should:

A) Build all 50 components before anyone uses it
B) Start small (5-10 core components) and iterate
C) Copy Material Design exactly
D) Focus on aesthetics, ignore accessibility

<details>
<summary>Show Answer</summary>

**Answer:** B

**Explanation:** Start small! Build only what you need today (5-10 components), get feedback, measure adoption, and iterate. Building 50 unused components wastes time. Let real usage drive what you build next.

</details>

---

## **Question 9**

What is a "primitive" component?

A) An old, outdated component
B) A basic building block (Button, Input, Checkbox)
C) A component without styling
D) A component that doesn't use JavaScript

<details>
<summary>Show Answer</summary>

**Answer:** B

**Explanation:** Primitives are basic building blocks: Button, Input, Checkbox, Radio, etc. They can't be broken down further. Composite components (Modal, Dropdown, DatePicker) are built by combining primitives.

</details>

---

## **Question 10**

What is the purpose of semantic versioning (semver) in design systems?

A) To make version numbers look professional
B) To communicate the impact of changes (breaking, features, fixes)
C) It's required by npm
D) No real purpose

<details>
<summary>Show Answer</summary>

**Answer:** B

**Explanation:** Semver (MAJOR.MINOR.PATCH) communicates impact:
- MAJOR (2.0.0): Breaking changes (renamed props, removed components)
- MINOR (1.1.0): New features (backward compatible)
- PATCH (1.0.1): Bug fixes

This helps users understand the risk of upgrading.

</details>

---

## **Question 11**

Which design system is known for powering Shopify?

A) Material Design
B) Polaris
C) Carbon
D) Fluent

<details>
<summary>Show Answer</summary>

**Answer:** B

**Explanation:** Polaris is Shopify's design system. It's excellent for e-commerce interfaces, has comprehensive data table patterns, great accessibility, and is open source so you can learn from their code.

</details>

---

## **Question 12**

What's wrong with this button component API?

```jsx
<Button
  variant="primary"
  size="medium"
  leftIcon="save"
  rightIcon="arrow"
  iconColor="blue"
  iconSize="16px"
  loading={true}
  loadingText="Saving..."
  loadingSpinnerColor="white"
  // ... 20 more props
/>
```

A) Nothing, it's very flexible
B) Over-engineered (too many props, use composition instead)
C) Not enough props
D) Should have even more customization

<details>
<summary>Show Answer</summary>

**Answer:** B

**Explanation:** Over-engineered components with 30+ props are hard to maintain and use. Better: Use composition. Provide escape hatches for customization but keep the core API simple. "Configuration over composition" is a common mistake.

</details>

---

## **Question 13**

What is "design drift"?

A) When designers change jobs
B) When design and code become out of sync over time
C) CSS animation technique
D) A Figma feature

<details>
<summary>Show Answer</summary>

**Answer:** B

**Explanation:** Design drift is when design (Figma) and code gradually become out of sync. The button in Figma is 40px tall, but in code it's 44px. The card shadow in Figma is different from production. This creates confusion and inconsistency.

</details>

---

## **Question 14**

What is the main benefit of design tokens?

A) They make your CSS file larger
B) They create a single source of truth that can update everywhere at once
C) They're required for React
D) They make your code slower

<details>
<summary>Show Answer</summary>

**Answer:** B

**Explanation:** Design tokens create a single source of truth. Change `--color-primary: blue` to `--color-primary: green` in one place, and every component using that token updates automatically. No find-and-replace needed!

</details>

---

## **Question 15**

How should you handle deprecating a component in your design system?

A) Delete it immediately (rip the band-aid off!)
B) Leave it forever (backward compatibility!)
C) Mark as deprecated, show warnings, provide migration guide, remove after 6-12 months
D) Just rename it

<details>
<summary>Show Answer</summary>

**Answer:** C

**Explanation:** Gradual deprecation: 1) Mark as deprecated (console warnings), 2) Update docs with migration guide, 3) Wait 6-12 months for teams to migrate, 4) Remove in next major version. Don't break things overnight!

</details>

---

## 🎉 Quiz Complete!

**Scoring:**
- **13-15 correct:** Design System Expert! 🏆
- **10-12 correct:** Strong understanding! ⭐
- **7-9 correct:** Good foundation, review key concepts
- **< 7 correct:** Re-read the chapter, focus on core concepts

---

## 📚 Review Topics

If you missed questions, review these sections:

**Questions 1-3:** What are design systems and why they matter
**Questions 4-7:** Design tokens and architecture
**Questions 8-12:** Building and organizing components
**Questions 13-15:** Governance and maintenance

---

**Great job completing the quiz!** 🎉

Now move on to the exercises to apply what you've learned!

