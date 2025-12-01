# Chapter 7 Quiz: CSS Methodologies

Test your understanding of BEM, OOCSS, SMACSS, and ITCSS!

---

## Question 1
**Which methodology uses the `.o-`, `.c-`, and `.u-` prefixes?**

A) BEM
B) OOCSS
C) SMACSS
D) ITCSS

<details>
<summary>Show Answer</summary>

### Answer: D) ITCSS

**Explanation:**

ITCSS uses prefixes to indicate which layer a class belongs to:
- `.o-` for **Objects** (layout primitives like `.o-grid`, `.o-container`)
- `.c-` for **Components** (UI modules like `.c-button`, `.c-card`)
- `.u-` for **Utilities** (overrides like `.u-text-center`, `.u-hidden`)

**Example:**
```html
<div class="o-container">
  <div class="c-card c-card--featured">
    <h3 class="u-text-center">Title</h3>
  </div>
</div>
```

**Why it matters:** Prefixes make it immediately clear what purpose a class serves and which layer it belongs to.

</details>

---

## Question 2
**In BEM, what is `.button__icon--large`?**

A) Valid BEM class name
B) Invalid - too many separators
C) Valid but discouraged
D) Should use `.button--large__icon`

<details>
<summary>Show Answer</summary>

### Answer: A) Valid BEM class name

**Explanation:**

This represents:
- **Block:** `button`
- **Element:** `icon` (part of button)
- **Modifier:** `large` (variant of the icon)

**Format:** `.block__element--modifier` ✅

**HTML usage:**
```html
<button class="button">
  <span class="button__icon button__icon--large">★</span>
  Save
</button>
```

**In Sass:**
```scss
.button {
  &__icon {
    width: 16px;

    &--large {
      width: 24px;  // Larger icon variant
    }
  }
}
```

**Why it matters:** Understanding BEM naming lets you represent complex component hierarchies clearly.

</details>

---

## Question 3
**Which methodology separates "structure" from "skin"?**

A) BEM
B) OOCSS
C) SMACSS
D) ITCSS

<details>
<summary>Show Answer</summary>

### Answer: B) OOCSS

**Explanation:**

OOCSS's first core principle is **separating structure from skin**:

**Structure** = Layout, positioning, box model
```css
.button {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 8px;
}
```

**Skin** = Visual appearance (colors, backgrounds, borders)
```css
.button-primary {
  background: #3b82f6;
  color: white;
}

.button-secondary {
  background: #f3f4f6;
  color: #111827;
}
```

**Usage:**
```html
<button class="button button-primary">Primary</button>
<button class="button button-secondary">Secondary</button>
```

**Why it matters:** Separation allows you to reuse structure with different skins, reducing duplication.

</details>

---

## Question 4
**Where should a `.is-loading` state class live in SMACSS?**

A) Base
B) Layout
C) Module
D) State

<details>
<summary>Show Answer</summary>

### Answer: D) State

**Explanation:**

SMACSS **State** category holds temporary conditions toggled by JavaScript:
- `.is-active`
- `.is-hidden`
- `.is-loading`
- `.is-disabled`
- `.has-error`

**File location:** `state/_states.scss`

**Example:**
```scss
/* state/_states.scss */
.is-loading {
  position: relative;
  color: transparent !important;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
}
```

**Usage with JavaScript:**
```javascript
button.classList.add('is-loading');
// ... after async operation
button.classList.remove('is-loading');
```

**Why it matters:** Centralizing state classes makes them reusable and easier to maintain.

</details>

---

## Question 5
**What's the correct ITCSS import order?**

A) Components → Objects → Utilities
B) Settings → Tools → Generic → Elements → Objects → Components → Utilities
C) Generic → Settings → Tools → Elements
D) Utilities → Components → Objects

<details>
<summary>Show Answer</summary>

### Answer: B) Settings → Tools → Generic → Elements → Objects → Components → Utilities

**Explanation:**

ITCSS is all about **specificity progression** from low to high:

```scss
// main.scss - MUST import in this exact order!

// 1. Settings (variables, no CSS output)
@import '01-settings/colors';
@import '01-settings/spacing';

// 2. Tools (mixins/functions, no CSS output)
@import '02-tools/mixins';

// 3. Generic (resets, very low specificity)
@import '03-generic/normalize';

// 4. Elements (HTML elements only)
@import '04-elements/typography';

// 5. Objects (layout primitives, low specificity)
@import '05-objects/container';

// 6. Components (UI modules, higher specificity)
@import '06-components/button';

// 7. Utilities (overrides, highest specificity)
@import '07-utilities/text';
```

**Why this order:**
- Lower layers never depend on higher layers
- Specificity increases gradually
- Utilities win "last-mile" conflicts
- **No specificity wars!**

**Why it matters:** Wrong order = specificity chaos. Right order = predictable cascade.

</details>

---

## Question 6
**Which is NOT a valid BEM practice?**

A) `.card__header { }`
B) `.card--featured { }`
C) `.card .button { }`
D) `.card__title--large { }`

<details>
<summary>Show Answer</summary>

### Answer: C) `.card .button { }`

**Explanation:**

BEM **avoids descendant selectors**! Each component should be independent.

**Why it's wrong:**
```scss
// ❌ BAD - Creates location dependency
.card .button {
  margin-top: 16px;
}
// Now button MUST be inside card to get this style
```

**Better approaches:**

**Option 1:** If the button is part of the card component:
```scss
// ✅ GOOD - BEM element
.card__button {
  margin-top: 16px;
}
```
```html
<div class="card">
  <button class="card__button">Click</button>
</div>
```

**Option 2:** If button is its own component:
```scss
// ✅ GOOD - Independent components
.card { }
.button { }
.button--card-spacing {
  margin-top: 16px;
}
```
```html
<div class="card">
  <button class="button button--card-spacing">Click</button>
</div>
```

**Why it matters:** Avoiding descendants keeps specificity flat and components reusable.

</details>

---

## Question 7
**What's the "Media Object" in OOCSS?**

A) Images and videos
B) A reusable pattern for image + content
C) CSS media queries
D) Object-fit for media

<details>
<summary>Show Answer</summary>

### Answer: B) A reusable pattern for image + content

**Explanation:**

The **Media Object** is OOCSS's most famous pattern, created by Nicole Sullivan. It's a layout pattern for image/avatar + content.

**Structure:**
```html
<div class="media">
  <div class="media-figure">
    <img src="avatar.jpg" alt="User">
  </div>
  <div class="media-body">
    <h4>Username</h4>
    <p>This is a comment or post text...</p>
  </div>
</div>
```

**CSS:**
```css
.media {
  display: flex;
  gap: 16px;
}

.media-figure {
  flex-shrink: 0;  /* Image doesn't shrink */
}

.media-body {
  flex: 1;  /* Content takes remaining space */
}

/* Variations */
.media-reverse {
  flex-direction: row-reverse;
}

.media-stack {
  flex-direction: column;
}
```

**Use cases:**
- Comment sections
- User profiles
- Notifications
- Product listings
- Social media posts

**Why it's famous:** This simple pattern solves a common layout problem elegantly and can be reused everywhere!

**Why it matters:** Understanding OOCSS patterns teaches you to think in reusable components.

</details>

---

## Question 8
**Which combination is most popular for production apps?**

A) BEM only
B) OOCSS only
C) ITCSS + BEM
D) SMACSS + OOCSS

<details>
<summary>Show Answer</summary>

### Answer: C) ITCSS + BEM

**Explanation:**

**ITCSS + BEM** is the winning combination used by:
- Shopify Polaris
- BBC GEL (Global Experience Language)
- GOV.UK Design System
- Financial Times
- Many other enterprise applications

**Why this combination works:**

**ITCSS answers:** "Where does this file go?"
```
scss/
├── 01-settings/
├── 02-tools/
├── 03-generic/
├── 04-elements/
├── 05-objects/
├── 06-components/     ← Your components go here
└── 07-utilities/
```

**BEM answers:** "How do I name my classes?"
```scss
// 06-components/_button.scss
.button { }              // Block
.button__icon { }        // Element
.button--primary { }     // Modifier
```

**Together:**
- ✅ ITCSS prevents specificity wars
- ✅ BEM makes components self-documenting
- ✅ Easy to understand and maintain
- ✅ Scales to any size project

**Why it matters:** Don't reinvent the wheel - use proven patterns!

</details>

---

## Question 9
**In SMACSS, where should `.l-header` live?**

A) Base
B) Layout
C) Module
D) State

<details>
<summary>Show Answer</summary>

### Answer: B) Layout

**Explanation:**

The `l-` prefix indicates a **Layout** component. SMACSS Layout category contains major page regions:

**File:** `layout/_header.scss`

```scss
.l-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 16px 0;
}
```

**Other Layout examples:**
- `.l-container` - Main content wrapper
- `.l-sidebar` - Sidebar region
- `.l-main` - Main content area
- `.l-footer` - Footer region
- `.l-grid` - Grid system

**SMACSS Categories:**
1. **Base** - Element defaults (`h1`, `a`, `button`)
2. **Layout** - Page regions (`.l-*`)
3. **Module** - Components (`.card`, `.button`)
4. **State** - Conditions (`.is-active`, `.is-hidden`)
5. **Theme** - Visual variations

**Why it matters:** Proper categorization makes large codebases navigable.

</details>

---

## Question 10
**What's wrong with this BEM code?**

```css
.card {
  .card__title {
    font-size: 20px;
  }
}
```

A) Nothing wrong
B) Should use `&__title`
C) Title should be a modifier
D) BEM doesn't allow nesting

<details>
<summary>Show Answer</summary>

### Answer: B) Should use `&__title`

**Explanation:**

In Sass, use the `&` **parent selector** for BEM:

**❌ Wrong:**
```scss
.card {
  /* card styles */

  .card__title {  // Compiles to ".card .card__title"
    font-size: 20px;
  }
}
```

This compiles to:
```css
.card .card__title {  /* Descendant selector! */
  font-size: 20px;
}
```

**Specificity:** `0,2,0` (two classes) - Higher than needed!

**✅ Correct:**
```scss
.card {
  /* card styles */

  &__title {  // Compiles to ".card__title"
    font-size: 20px;
  }

  &--featured {  // Compiles to ".card--featured"
    border: 2px solid blue;
  }
}
```

This compiles to:
```css
.card__title {  /* Single class! */
  font-size: 20px;
}

.card--featured {
  border: 2px solid blue;
}
```

**Specificity:** `0,1,0` (one class) - Perfect!

**Complete BEM + Sass example:**
```scss
.card {
  background: white;
  border-radius: 12px;
  padding: 16px;

  &__header {
    margin-bottom: 16px;
    border-bottom: 1px solid #e5e7eb;
  }

  &__title {
    font-size: 20px;
    font-weight: 700;
  }

  &__body {
    margin-bottom: 16px;
  }

  &__footer {
    display: flex;
    gap: 8px;
  }

  &--featured {
    border: 2px solid #3b82f6;
  }

  &--large {
    padding: 24px;
  }
}
```

**Why it matters:** Using `&` correctly keeps specificity flat and maintains BEM's benefits!

</details>

---

## Scoring Guide

**10/10** - CSS Methodology Master! 🏆
You deeply understand all four methodologies and when to use them.

**8-9/10** - Excellent! ⭐
You have a strong grasp of CSS methodologies. Review the questions you missed.

**6-7/10** - Good progress! 💪
You understand the basics. Study the explanations and try the exercises.

**4-5/10** - Keep learning! 📚
Review the chapter and complete some exercises to reinforce concepts.

**0-3/10** - Start with the basics 🎯
Read the chapter carefully and work through Exercise 1 (BEM Refactoring).

---

## Next Steps

1. **Review** any questions you got wrong
2. **Complete the exercises** to apply what you learned
3. **Build the challenge project** for real-world practice
4. **Join the community** to discuss with other learners

---

## Additional Practice

Want more practice? Try these challenges:

1. **Audit a real website:** Inspect a popular site and identify what methodologies they use
2. **Refactor old code:** Take an old project and apply BEM naming
3. **Mix methodologies:** Build a component using ITCSS + BEM
4. **Teach someone:** Explain one methodology to a friend or colleague

---

**Great job taking the quiz! Now let's apply these concepts in the exercises.** 🚀

