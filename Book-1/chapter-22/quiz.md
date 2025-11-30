# Chapter 22: CSS Methodologies - Quiz

Test your understanding of CSS methodologies with this comprehensive quiz. This quiz covers BEM, OOCSS, SMACSS, ITCSS, and Utility-First approaches.

**Instructions:**
- Answer each question to the best of your ability
- Some questions have multiple correct answers
- Answers are provided at the bottom
- Don't peek at the answers until you've attempted all questions!

---

## Questions

### 1. What is the primary purpose of CSS methodologies?

A) To make CSS files smaller
B) To provide structured approaches to naming, organizing, and scaling styles
C) To replace CSS with JavaScript
D) To make websites load faster

---

### 2. In BEM, what does the "B" stand for, and what does it represent?

A) Block - a standalone component
B) Base - the foundation styles
C) Button - a clickable element
D) Border - styling for edges

---

### 3. Which of the following is the correct BEM naming pattern?

A) `.card_title_primary`
B) `.card__title--primary`
C) `.card-title-primary`
D) `.card.title.primary`

---

### 4. What is wrong with this BEM class name: `.card__image__caption`?

A) It uses double underscores incorrectly
B) It has nested elements (element within element)
C) It should use single underscores
D) Nothing is wrong with it

---

### 5. In OOCSS, what does "separate structure from skin" mean?

A) Keep HTML and CSS in separate files
B) Separate layout properties from visual/appearance properties
C) Use different stylesheets for mobile and desktop
D) Never mix colors with spacing

---

### 6. Which OOCSS principle does this violate?
```css
.sidebar .widget {
  padding: 1rem;
}
```

A) Separate structure from skin
B) Separate container from content
C) Use semantic class names
D) Keep specificity low

---

### 7. In SMACSS, which category would `.is-active` belong to?

A) Base
B) Layout
C) Module
D) State
E) Theme

---

### 8. SMACSS recommends using the `l-` prefix for which category?

A) Links
B) Layout
C) Lists
D) Large elements

---

### 9. What are the five categories in SMACSS? (Select all that apply)

A) Base
B) Layout
C) Module
D) State
E) Theme
F) Components
G) Utilities

---

### 10. In ITCSS, layers are arranged from:

A) Specific to generic
B) Generic to specific
C) Alphabetically
D) Random order

---

### 11. Which ITCSS layer should contain CSS variables and configuration?

A) Tools
B) Settings
C) Generic
D) Elements

---

### 12. In ITCSS, what prefix is commonly used for Object layer classes?

A) `c-`
B) `u-`
C) `o-`
D) `l-`

---

### 13. What is the correct order of these ITCSS layers (from top to bottom of the triangle)?

1. Components
2. Settings
3. Elements
4. Utilities

A) 2, 3, 1, 4
B) 1, 2, 3, 4
C) 4, 3, 2, 1
D) 2, 4, 3, 1

---

### 14. In Utility-First CSS, each class typically:

A) Handles all styling for a component
B) Does one specific thing
C) Contains multiple properties
D) Replaces semantic HTML

---

### 15. Which is an example of utility-first CSS?

A) `.product-card { background: white; padding: 1rem; border-radius: 8px; }`
B) `.bg-white.p-4.rounded-lg`
C) `.card__content { padding: 1rem; }`
D) `.l-container { max-width: 1200px; }`

---

### 16. What is a common criticism of utility-first CSS?

A) It's too slow
B) HTML becomes verbose with many classes
C) It doesn't work with modern browsers
D) It requires too much custom CSS

---

### 17. Which methodology would be best for a large enterprise application with many developers?

A) No methodology - just write CSS as needed
B) BEM + ITCSS combination
C) Only inline styles
D) Utility-first only

---

### 18. Can you combine different CSS methodologies in one project?

A) No, you must choose only one
B) Yes, for example BEM naming with ITCSS organization
C) Only if using a preprocessor
D) Only with utility-first approaches

---

### 19. What is a universal best practice across all CSS methodologies?

A) Always use IDs for styling
B) Keep selector specificity low
C) Use deep nesting for organization
D) Avoid using classes

---

### 20. According to the chapter, where will you find comprehensive, advanced coverage of CSS methodologies?

A) Chapter 18
B) Chapter 25
C) Part 3, Chapter 38
D) The appendix

---

## Bonus Questions

### 21. Match each methodology to its creator/organization:

BEM: ________
OOCSS: ________
SMACSS: ________
ITCSS: ________

Options: Yandex, Nicole Sullivan, Jonathan Snook, Harry Roberts

---

### 22. What does this BEM modifier apply to?
```html
<button class="button button--large button--primary">
```

A) The button has two modifiers: large and primary
B) The button is incorrectly marked up
C) The button should only have one modifier
D) The button is nested inside another button

---

### 23. Which methodology emphasizes avoiding location-dependent styling?

A) BEM
B) OOCSS
C) SMACSS
D) ITCSS

---

### 24. In a utility-first approach like Tailwind, how do you typically handle repeated patterns?

A) Copy and paste the classes everywhere
B) Extract components in your framework (React, Vue, etc.)
C) Never repeat patterns
D) Write custom CSS instead

---

### 25. True or False: CSS methodologies change what CSS can do.

A) True
B) False

---

## Answer Key

### Basic Questions

**1. B** - To provide structured approaches to naming, organizing, and scaling styles

CSS methodologies don't make files smaller or websites faster directly, but they help organize CSS for better maintainability.

---

**2. A** - Block - a standalone component

In BEM, "Block" represents an independent, reusable component like a card, button, or navigation menu.

---

**3. B** - `.card__title--primary`

BEM uses double underscores (`__`) for elements and double dashes (`--`) for modifiers.

---

**4. B** - It has nested elements (element within element)

In BEM, elements should be flat. Instead of `.card__image__caption`, use `.card__image` and `.card__caption`.

---

**5. B** - Separate layout properties from visual/appearance properties

OOCSS separates structure (width, padding, margin) from skin (colors, borders, shadows) to maximize reusability.

---

**6. B** - Separate container from content

The `.widget` should have the same padding regardless of whether it's in a sidebar or elsewhere. This violates the "separate container from content" principle.

---

**7. D** - State

State classes like `.is-active`, `.is-hidden`, or `.is-disabled` represent different states of modules or layouts.

---

**8. B** - Layout

SMACSS recommends the `l-` prefix for layout classes (e.g., `.l-container`, `.l-sidebar`, `.l-header`).

---

**9. A, B, C, D, E** - Base, Layout, Module, State, Theme

SMACSS has exactly five categories. Components and Utilities are from other methodologies.

---

**10. B** - Generic to specific

ITCSS arranges styles in an inverted triangle from generic (Settings, Tools, Generic) to specific (Components, Utilities).

---

**11. B** - Settings

The Settings layer contains CSS variables, configuration, and design tokens.

---

**12. C** - `o-`

Objects use the `o-` prefix (e.g., `.o-container`, `.o-grid`), Components use `c-`, Utilities use `u-`.

---

**13. A** - 2, 3, 1, 4 (Settings, Elements, Components, Utilities)

The correct ITCSS order is: Settings → Tools → Generic → Elements → Objects → Components → Utilities.

---

**14. B** - Does one specific thing

Utility classes are single-purpose: `.bg-blue` only sets background, `.p-4` only sets padding.

---

**15. B** - `.bg-white.p-4.rounded-lg`

This shows multiple utility classes, each doing one thing (background, padding, border-radius).

---

**16. B** - HTML becomes verbose with many classes

Utility-first approaches can lead to many classes per element, making HTML more verbose.

---

**17. B** - BEM + ITCSS combination

For large enterprise apps, combining BEM naming with ITCSS organization provides structure, scalability, and clear conventions.

---

**18. B** - Yes, for example BEM naming with ITCSS organization

Methodologies can be combined! Many projects use BEM naming within an ITCSS file structure, or utility classes alongside custom components.

---

**19. B** - Keep selector specificity low

Low specificity makes CSS easier to override and maintain, regardless of which methodology you use.

---

**20. C** - Part 3, Chapter 38

The chapter explicitly mentions that comprehensive, advanced coverage of CSS methodologies will be in Part 3, Chapter 38.

---

### Bonus Answers

**21. Matches:**
- BEM: Yandex
- OOCSS: Nicole Sullivan
- SMACSS: Jonathan Snook
- ITCSS: Harry Roberts

---

**22. A** - The button has two modifiers: large and primary

BEM allows multiple modifiers on the same block. This button is both large AND primary styled.

---

**23. B** - OOCSS

OOCSS's "separate container from content" principle specifically emphasizes that components should look the same regardless of where they're placed.

---

**24. B** - Extract components in your framework (React, Vue, etc.)

When using utility-first with component frameworks, you extract repeated patterns into reusable components.

---

**25. B** - False

CSS methodologies don't change what CSS can do—they provide conventions for organizing and writing CSS more effectively.

---

## Scoring

- **23-25 correct**: Excellent! You have a strong understanding of CSS methodologies.
- **19-22 correct**: Great job! You understand the core concepts well.
- **15-18 correct**: Good! Review the areas you missed and try the exercises.
- **11-14 correct**: Decent foundation. Revisit the chapter and practice more.
- **Below 11**: Review Chapter 22 and the README quick references, then retake the quiz.

---

## Key Takeaways to Remember

1. **BEM** uses `.block__element--modifier` pattern for clear component relationships
2. **OOCSS** separates structure from skin and container from content for reusability
3. **SMACSS** organizes CSS into five categories: Base, Layout, Module, State, Theme
4. **ITCSS** layers styles from generic to specific to manage specificity
5. **Utility-First** uses single-purpose classes for rapid development
6. **Methodologies can be combined** for the best of multiple approaches
7. **Low specificity and consistency** are important across all methodologies
8. **Part 3, Chapter 38** will cover these topics in greater depth

---

## Next Steps

1. ✅ Review any questions you got wrong
2. 📚 Revisit the relevant sections in Chapter 22
3. 💻 Practice with the exercises
4. 🚀 Try building a small project with one methodology
5. 🔄 Experiment with combining methodologies

Great work completing the quiz! Keep practicing and you'll master CSS methodologies in no time! 🎉

