# Exercise 5: Screen Reader Testing

**Difficulty**: ⭐⭐⭐ Advanced
**Time**: 30 minutes
**Concepts**: Screen reader usage, accessibility auditing, real-world testing

---

## 🎯 Goal

Use a **real screen reader** to test a website and document accessibility issues. This is the most important accessibility skill you can learn—because automated tools only catch 30-40% of issues!

---

## 📋 Instructions

### Step 1: Set Up Your Screen Reader

**Mac Users:**
1. Enable VoiceOver: `Cmd + F5`
2. Quick tutorial: VoiceOver Utility > Quick Start
3. Basic navigation: `Ctrl + Option + Arrow Keys`
4. Read all: `Ctrl + Option + A`
5. Rotor (jump to headings/links): `Ctrl + Option + U`

**Windows Users:**
1. Download NVDA (free): https://www.nvaccess.org/
2. Install and launch
3. Browse mode navigation: `Arrow Keys`
4. Elements list (headings/links): `NVDA + F7`
5. Stop reading: `Ctrl`

### Step 2: Test the Provided Website

Open `test-site/index.html` in your browser and test it using **ONLY** the screen reader (no looking at the screen if you can!).

**Try to complete these tasks:**
1. Navigate to the main content
2. Find and click the "Contact Us" link
3. Fill out the signup form
4. Understand what the images show
5. Navigate between sections
6. Understand the data in the table
7. Complete a purchase in the shopping cart

### Step 3: Document Issues

As you encounter problems, document them in `accessibility-audit-report.md` using this format:

**For each issue:**
- Issue description
- Severity (Critical, High, Medium, Low)
- Location (where in the site)
- How it affects users
- How to fix it

### Step 4: Find at Least 10 Issues

**Common issues to look for:**
- Missing or unhelpful alt text
- Forms without proper labels
- Confusing navigation structure
- Missing skip link
- Bad heading hierarchy
- No focus indicators
- Div buttons that aren't announced
- Tables without proper structure
- Content that makes no sense out of context
- Interactive elements not reachable with keyboard

---

## ✅ Acceptance Criteria

Your accessibility audit should:
- [ ] Test performed with actual screen reader
- [ ] Document at least 10 accessibility issues
- [ ] Issues categorized by severity
- [ ] Clear descriptions of each problem
- [ ] Specific recommendations for fixes
- [ ] Screenshots or recordings (optional but helpful)
- [ ] Summary of overall accessibility status

---

## 🧪 Testing Checklist

**Screen Reader Tasks:**

1. [ ] Can you find the main navigation?
2. [ ] Can you skip to main content?
3. [ ] Do all images have meaningful descriptions?
4. [ ] Are all form fields labeled clearly?
5. [ ] Can you tell which fields are required?
6. [ ] Do error messages make sense?
7. [ ] Can you understand the table data?
8. [ ] Are all buttons/links clearly announced?
9. [ ] Is the heading hierarchy logical?
10. [ ] Can you complete key tasks blind?

---

## 💡 Hints

**VoiceOver Quick Commands:**
- `Ctrl + Option + A` — Read entire page
- `Ctrl + Option + U` — Open Rotor (navigate by headings, links, etc.)
- `Ctrl + Option + Cmd + H` — Next heading
- `Ctrl + Option + Space` — Click/activate
- `Cmd + F5` — Turn off VoiceOver

**NVDA Quick Commands:**
- `H` — Next heading
- `K` — Next link
- `F` — Next form field
- `T` — Next table
- `D` — Next landmark
- `Insert + F7` — Elements list
- `Insert + Q` — Quit NVDA

**What makes a good issue report:**
```markdown
### Issue #1: Missing Alt Text on Product Images

**Severity**: High
**Location**: Homepage, Products section
**User Impact**: Blind users can't understand what products are being shown
**Current behavior**: Screen reader says "image" with no description
**Recommended fix**: Add descriptive alt text: "Blue wireless headphones with noise cancellation"
```

---

## 📚 Resources

- [WebAIM: Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [VoiceOver User Guide](https://support.apple.com/guide/voiceover/welcome/mac)
- [NVDA User Guide](https://www.nvaccess.org/files/nvda/documentation/userGuide.html)
- [Screen Reader Basics (Video)](https://www.youtube.com/results?search_query=screen+reader+basics)

---

## 🚀 Next Steps

After completing your audit:
1. Review your findings
2. Compare with common accessibility issues list
3. Think about how you'd fix each issue
4. Move on to the Challenge Project!

**This exercise is eye-opening!** Most developers never use a screen reader. You're now ahead of 95% of developers because you understand how blind users experience the web.

Keep pushing forward! 🌟

