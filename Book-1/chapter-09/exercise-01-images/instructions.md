# Exercise 1: Fix Inaccessible Images

**Difficulty**: ⭐ Beginner
**Time**: 15 minutes
**Concepts**: Alt text, decorative images, context, accessible images

---

## 🎯 Goal

Fix a web page with multiple image accessibility issues. You'll learn:
- When and how to write good alt text
- How to handle decorative images
- How to make linked images accessible
- How to provide context for complex images

---

## 📋 Instructions

### Step 1: Examine the Broken Code

Open `starter/broken-images.html` and look at all the image problems:
- Missing alt attributes
- Bad alt text (too vague or keyword stuffing)
- Decorative images not marked properly
- Functional images (in links) with wrong descriptions
- Complex images without adequate description

### Step 2: Fix Each Image

For each image, ask:
1. **Is it informative?** → Write descriptive alt text
2. **Is it decorative?** → Use `alt=""`
3. **Is it functional?** (in a link/button) → Describe the action/destination
4. **Is it complex?** (chart/diagram) → Add summary + longer description

### Step 3: Test Your Solution

**Manual test:**
1. Turn off images in your browser (or use a screen reader)
2. Can you still understand the page content?
3. Do all links make sense?

**Automated test:**
1. Run Lighthouse audit in Chrome DevTools
2. Check for "Image elements have [alt] attributes" pass
3. All images should pass accessibility checks

---

## ✅ Acceptance Criteria

Your solution should:
- [ ] All images have `alt` attributes
- [ ] Informative images have clear, descriptive alt text
- [ ] Decorative images use `alt=""`
- [ ] Linked images describe the link destination
- [ ] Complex images have both brief alt text and detailed descriptions
- [ ] No alt text says "image of" or "picture of"
- [ ] No keyword stuffing for SEO
- [ ] Pass Lighthouse accessibility audit

---

## 🧪 Testing Checklist

Test your fixed version:

1. **Visual Test**: Turn off images—does the page still make sense?
2. **Screen Reader Test**: Use VoiceOver (Mac) or NVDA (Windows) to read the page
3. **Automated Test**: Run Lighthouse audit
4. **Click Test**: Can you click linked images and understand where they go?

---

## 💡 Hints

- **Good alt text** answers: "What information would I miss if I couldn't see this?"
- **Too short**: "logo" → **Better**: "Acme Company logo"
- **Too long**: Full paragraph → **Better**: Brief summary + longer description nearby
- **Redundant**: "Image of a dog" → **Better**: "Golden retriever playing fetch in park"
- **Decorative**: Icons next to text, design flourishes → Use `alt=""`

---

## 📚 Resources

- [WebAIM: Alternative Text](https://webaim.org/techniques/alttext/)
- [W3C: Alt Decision Tree](https://www.w3.org/WAI/tutorials/images/decision-tree/)
- [MDN: img alt](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-alt)

---

## 🚀 Next Steps

When you've fixed all the images and passed testing:
1. Compare your solution with `solution/broken-images.html`
2. Move on to Exercise 2: Make Forms Accessible

Good luck! 🎉

