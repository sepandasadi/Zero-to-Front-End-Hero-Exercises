# Exercise 1: CSS Problem Detective 🔍

**Time:** 30-45 minutes
**Difficulty:** Beginner
**Focus:** Identifying the 6 core CSS problems

---

## Learning Objectives

By the end of this exercise, you will:

- ✅ Recognize CSS bloat and dead code
- ✅ Identify naming collisions
- ✅ Spot specificity wars
- ✅ Find inconsistent values
- ✅ Detect hardcoded colors
- ✅ Discover accessibility issues

---

## The Scenario

You've been hired to audit the CSS of "ShopFast," an e-commerce site that's been in development for 2 years. The team has been complaining about styling bugs, but they're not sure what's wrong.

Your job: **Analyze the codebase and identify specific instances of each of the 6 core problems.**

---

## The Codebase

You'll find a sample `styles.css` file in the `starter/` folder. It represents a typical messy codebase.

---

## Your Task

### **Part 1: Problem Identification (20 minutes)**

For each of the 6 problems, find and document **at least 2 specific examples** from the codebase:

#### **1. CSS Bloat**
Find styles that appear to be unused or outdated.

**Example format:**
```
Line 47: `.promo-banner-2022` - likely outdated (it's 2025!)
Line 89: `.old-header-v1` - "old" in the name suggests it's replaced
```

#### **2. Naming Collisions**
Find class names that are too generic or likely to conflict.

**Example format:**
```
Line 23: `.button` - too generic, will conflict
Line 156: `.card` - multiple definitions with different purposes
```

#### **3. Specificity Wars**
Find selectors with unnecessarily high specificity or `!important`.

**Example format:**
```
Line 34: `#header .nav ul li a span` - specificity (1,0,5)
Line 67: `background: red !important;` - !important abuse
```

#### **4. Inconsistent UI**
Find hardcoded values that should be tokens.

**Example format:**
```
Line 12: `padding: 13px` - non-standard spacing
Line 45: `color: #3b82f6` - hardcoded blue
Line 78: `color: #3b83f5` - almost same blue, should be identical
```

#### **5. Hard to Theme**
Find repeated color values that would make dark mode difficult.

**Example format:**
```
Lines 12, 45, 67, 89: `#ffffff` repeated 4 times
No variables or custom properties defined
```

#### **6. Accessibility Issues**
Find missing focus states, poor contrast, or tiny text.

**Example format:**
```
Line 90: `outline: none` - removes focus indicator!
Line 112: `font-size: 10px` - too small for accessibility
Line 145: yellow text on white background - poor contrast
```

---

### **Part 2: Metrics (10 minutes)**

Calculate these metrics for the codebase:

1. **Total lines of CSS:** ______
2. **Number of unique color values:** ______
3. **Number of `!important` declarations:** ______
4. **Highest specificity score:** ______
5. **Number of ID selectors:** ______
6. **Estimated % of dead code:** ______%

**Tools to help:**
- [CSS Stats](https://cssstats.com/) (paste your CSS)
- [Specificity Calculator](https://specificity.keegan.st/)
- Manual counting (good practice!)

---

### **Part 3: Impact Analysis (10 minutes)**

For each problem type, estimate the impact:

**Impact Scale:**
- 🔴 Critical (must fix immediately)
- 🟡 Moderate (fix soon)
- 🟢 Minor (fix when convenient)

**Example:**

| Problem | Impact | Reasoning |
|---------|--------|-----------|
| CSS Bloat | 🟡 Moderate | 40% unused code slows downloads, but site still works |
| Naming Collisions | 🔴 Critical | `.button` conflicts cause broken UI |
| Specificity Wars | 🔴 Critical | `!important` makes maintenance impossible |
| Inconsistent UI | 🟡 Moderate | Looks unprofessional, but functional |
| Hard to Theme | 🔴 Critical | Dark mode is business requirement |
| Accessibility | 🔴 Critical | Legal compliance issue |

---

### **Part 4: Recommendations (5 minutes)**

Prioritize the top 3 problems to fix first and briefly explain why.

**Example:**

1. **Accessibility** - Legal requirement, affects users immediately
2. **Specificity Wars** - Blocking all new development
3. **Hard to Theme** - Required for Q1 dark mode launch

---

## Deliverables

Submit a document (Markdown, Google Doc, or text file) with:

- [ ] **Problem Identification:** 2+ examples per problem (6 problems × 2 = 12 examples minimum)
- [ ] **Metrics:** All 6 metrics calculated
- [ ] **Impact Analysis:** Impact rating for each problem with reasoning
- [ ] **Recommendations:** Top 3 priorities with justification

---

## Evaluation Criteria

- **Accuracy (40%):** Did you correctly identify problems?
- **Completeness (30%):** Did you find examples for all 6 problems?
- **Analysis (20%):** Are your impact ratings reasonable?
- **Communication (10%):** Is your report clear and organized?

---

## Tips

1. **Use DevTools:** Open the starter HTML in a browser and inspect styles
2. **Look for patterns:** Dead code often has dates or version numbers in names
3. **Calculate specificity:** Use an online calculator or count manually
4. **Think long-term:** Consider maintainability, not just current functionality
5. **Be specific:** "Line 45: problem X because Y" is better than "lots of problems"

---

## Extension Challenges

If you finish early:

1. **Create a heat map:** Annotate the CSS file with color-coded comments for each problem type
2. **Write a refactoring plan:** How would you fix the top 3 problems?
3. **Tool research:** Find automated tools that could detect these problems

---

## Next Steps

After completing this exercise:

- **Check your work** against the solution (if available)
- **Move to Exercise 2:** Specificity Wars Debugger
- **Reflect:** Which problems were easiest/hardest to spot?

---

**Good luck, detective!** 🕵️‍♀️

