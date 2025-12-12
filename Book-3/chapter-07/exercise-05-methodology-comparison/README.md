# Exercise 5: Methodology Comparison

## Difficulty
⭐⭐ Intermediate

## Time Estimate
2-3 hours

## Learning Objectives
- Understand trade-offs between methodologies
- Practice all three: BEM, SMACSS, and ITCSS
- Make informed decisions
- Compare implementation complexity
- Choose the right tool for the job

---

## The Challenge

Build the **same component** using three different methodologies, then compare the results.

### Component: User Profile Card

**Features:**
- Avatar image (circular)
- Name and role/title
- Bio text (2-3 lines)
- Contact button
- Featured variant (highlight important profiles)

---

## Requirements

### Build Three Versions

#### Version 1: Pure BEM
- Only BEM naming
- Flat file structure
- Single component file

**Structure:**
```
bem/
├── user-profile.scss
└── index.html
```

**Classes:**
```scss
.user-profile { }
.user-profile__avatar { }
.user-profile__name { }
.user-profile__role { }
.user-profile__bio { }
.user-profile__button { }
.user-profile--featured { }
```

---

#### Version 2: SMACSS + BEM
- SMACSS file organization
- BEM naming within modules
- 5-category structure

**Structure:**
```
smacss/
├── base/
│   └── _typography.scss
├── layout/
│   └── _container.scss
├── modules/
│   └── _user-profile.scss
├── state/
│   └── _states.scss
├── main.scss
└── index.html
```

**Classes:**
```scss
.l-container { }  // Layout
.user-profile { }  // Module (with BEM inside)
.is-featured { }   // State
```

---

#### Version 3: ITCSS + BEM
- 7-layer ITCSS structure
- BEM naming in components
- Full architecture

**Structure:**
```
itcss/
├── 01-settings/
│   └── _colors.scss
├── 02-tools/
│   └── _mixins.scss
├── 03-generic/
│   └── _reset.scss
├── 04-elements/
│   └── _typography.scss
├── 05-objects/
│   └── _media.scss
├── 06-components/
│   └── _user-profile.scss
├── 07-utilities/
│   └── _text.scss
├── main.scss
└── index.html
```

**Classes:**
```scss
.o-media { }           // Object
.c-user-profile { }    // Component
.u-text-center { }     // Utility
```

---

## Comparison Criteria

After building all three, compare:

### 1. **Setup Complexity**
- How many files needed?
- How complex is the structure?
- Time to set up?

### 2. **Maintainability**
- Easy to find styles?
- Clear where new styles go?
- Team-friendly?

### 3. **Specificity**
- How flat is it?
- Any conflicts?
- Easy to override?

### 4. **Scalability**
- Would this work for 100+ components?
- Can new devs contribute easily?
- File organization clear?

### 5. **Flexibility**
- Easy to add variants?
- Easy to compose with other components?
- Reusable?

---

## Deliverables

### 1. Three Working Implementations
All three versions should look identical but use different methodologies.

### 2. Comparison Document
Create `COMPARISON.md` with:

```markdown
# Methodology Comparison

## Setup Complexity
- BEM: ⭐⭐ (simple)
- SMACSS: ⭐⭐⭐ (moderate)
- ITCSS: ⭐⭐⭐⭐ (complex)

## Maintainability
- BEM: [Your analysis]
- SMACSS: [Your analysis]
- ITCSS: [Your analysis]

... (continue for all criteria)

## Winner for This Use Case
[Which methodology worked best and why?]

## When to Use Each
- Use BEM when...
- Use SMACSS when...
- Use ITCSS when...
```

### 3. Personal Recommendation
Which do YOU prefer and why?

---

## Success Criteria

✅ All three versions work correctly
✅ Visual appearance is identical
✅ Each uses its methodology properly
✅ Thoughtful comparison written
✅ Trade-offs clearly understood

---

## Key Questions to Answer

1. Which was fastest to build?
2. Which is easiest to understand?
3. Which scales best?
4. Which would you use for:
   - A small project (5 components)?
   - A large project (50+ components)?
   - A design system?
5. Can you mix methodologies? How?

---

## Going Further

### Bonus: Add a Fourth Version

**Version 4: Tailwind + Component Wrapper**

Build the same card using only Tailwind utility classes, then compare:
- How many classes in HTML?
- Maintenance differences?
- When is utility-first better/worse?

---

**Build, compare, and decide!** 🔬

