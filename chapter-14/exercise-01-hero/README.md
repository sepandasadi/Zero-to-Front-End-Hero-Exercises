# Exercise 1: Hero Section

**Difficulty:** ⭐ Beginner
**Time:** 20-25 minutes

## 🎯 Objective

Create a full-screen hero section with a background image, dark overlay for text readability, and centered content.

## 📚 Concepts Practiced

- Using `background-image` property
- Combining gradients with background images
- `background-size: cover` for full coverage
- Centering content over backgrounds
- Making text readable with overlays

## 📋 Requirements

1. Full-height hero section (100vh)
2. Background image covering entire section
3. Semi-transparent dark overlay (so text is readable)
4. Centered content (heading, paragraph, button)
5. Responsive on mobile devices

## ✅ Success Criteria

- [ ] Hero fills viewport height
- [ ] Background image covers entire section without distortion
- [ ] Text is easily readable over the image
- [ ] Content is centered both horizontally and vertically
- [ ] Looks good on mobile, tablet, and desktop

## 💡 Hints

<details>
<summary>Click for hints</summary>

1. Use `min-height: 100vh` for full viewport height
2. Layer gradient over image: `background-image: linear-gradient(...), url(...)`
3. Use rgba colors for semi-transparent overlay
4. Flexbox helps center content
5. Add `background-position: center` and `background-size: cover`

</details>

## 🎨 Design Specifications

```
Hero Section:
- Min-height: 100vh
- Background: Your chosen image with dark overlay
- Overlay: rgba(0, 0, 0, 0.5) to rgba(0, 0, 0, 0.5) gradient

Content:
- Heading (h1): White, 48px, bold
- Paragraph: White, 18px, max-width 600px
- Button: White background, dark text, padding 15px 40px
- All centered

Background Image:
- Size: cover
- Position: center
- Repeat: no-repeat
```

---

**See `starter/` folder for exercise files. Solution in `solution/` folder.**

