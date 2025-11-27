# Chapter 14: Working with Images in CSS — Exercises

Master CSS image techniques with these hands-on exercises!

## 📚 What You'll Practice

- Background images with size, position, and repeat
- `object-fit` for controlling image display
- CSS filters for visual effects
- Multiple backgrounds and layering
- Responsive image techniques
- Real-world image patterns

---

## 🎯 Exercises Overview

### Exercise 1: Hero Section ⭐ Beginner
**Time:** 20-25 minutes
**Focus:** Background images basics

Create a full-screen hero section with a background image, dark overlay, and centered content.

**Skills:**
- Using `background-image` with gradients
- `background-size: cover` for full coverage
- Centering content over backgrounds
- Creating readable text with overlays

📁 **Folder:** `exercise-01-hero/`

---

### Exercise 2: Profile Card ⭐⭐ Intermediate
**Time:** 25-30 minutes
**Focus:** `object-fit` and circular images

Build a profile card with a circular photo using `object-fit: cover`.

**Skills:**
- Using `object-fit` to control image display
- Creating circular images with `border-radius`
- Combining background patterns with content
- Card layout with images

📁 **Folder:** `exercise-02-profile-card/`

---

### Exercise 3: Image Gallery with Filters ⭐⭐ Intermediate
**Time:** 30-40 minutes
**Focus:** CSS filters and hover effects

Create an image gallery with hover effects using CSS filters.

**Skills:**
- Applying CSS filters (grayscale, blur, brightness)
- Combining multiple filters
- Creating smooth hover transitions
- Using `object-fit` for consistent image sizing

📁 **Folder:** `exercise-03-gallery/`

---

### Exercise 4: Parallax Scrolling ⭐⭐⭐ Advanced
**Time:** 40-50 minutes
**Focus:** Background attachment and layering

Build a multi-section page with fixed parallax backgrounds.

**Skills:**
- `background-attachment: fixed` for parallax
- Multiple background layers
- Creating section-based layouts
- Optimizing background positioning

📁 **Folder:** `exercise-04-parallax/`

---

## 🚀 Challenge Project: Photo Portfolio

**Difficulty:** ⭐⭐⭐⭐ Expert
**Time:** 90-120 minutes

Build a complete photographer portfolio page with advanced image techniques.

**Features to Implement:**
- Full-screen hero with parallax effect and overlay
- Image gallery with multiple hover effects
- Filter buttons (All, Black & White, Vintage, etc.)
- Circular profile photo with decorative border
- Multiple background layers throughout
- Responsive images for different screen sizes
- Performance optimizations

📁 **Folder:** `challenge-portfolio/`

---

## 📝 Quiz

Test your understanding of CSS image techniques!

📄 **File:** `quiz.md`

---

## ✅ Completion Checklist

Track your progress:

- [ ] Exercise 1: Hero Section
- [ ] Exercise 2: Profile Card
- [ ] Exercise 3: Image Gallery with Filters
- [ ] Exercise 4: Parallax Scrolling
- [ ] Challenge Project: Photo Portfolio
- [ ] Quiz completed

---

## 🎓 Learning Path

**Recommended Order:**

1. **Start with Exercise 1** - Learn background image basics
2. **Move to Exercise 2** - Master `object-fit` for content images
3. **Try Exercise 3** - Explore CSS filters and effects
4. **Challenge yourself with Exercise 4** - Create parallax effects
5. **Test with the Quiz** - Verify your understanding
6. **Build the Challenge Project** - Combine everything

---

## 💡 Tips for Success

1. **Test with real images** - Use placeholder images or your own photos
2. **Experiment with filters** - Try different combinations
3. **Check responsiveness** - Test background images on mobile
4. **Use DevTools** - Inspect background properties to understand them
5. **Optimize images** - Use appropriate file sizes and formats

---

## 📖 Reference

Key concepts from Chapter 14:

**Background Properties:**
- `background-image: url('image.jpg')`
- `background-size: cover | contain | auto`
- `background-position: center | top | bottom | left | right`
- `background-repeat: no-repeat | repeat | repeat-x | repeat-y`
- `background-attachment: scroll | fixed`

**Object-Fit (for `<img>`):**
- `object-fit: cover` - Fill container, crop if needed
- `object-fit: contain` - Show entire image
- `object-fit: fill` - Stretch to fit (default)

**Common Filters:**
- `filter: grayscale(100%)`
- `filter: blur(5px)`
- `filter: brightness(1.2)`
- `filter: contrast(150%)`
- `filter: saturate(200%)`

**Common Patterns:**
```css
/* Hero with overlay */
background:
  linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
  url('hero.jpg') center/cover no-repeat;

/* Circular profile */
border-radius: 50%;
object-fit: cover;

/* Parallax */
background-attachment: fixed;
```

---

## 🆘 Need Help?

- Review Chapter 14 for detailed explanations
- Check the solution files (but try first!)
- Use placeholder images: `https://via.placeholder.com/WIDTHxHEIGHT`
- Test in browser DevTools to see what's happening

---

**Happy image styling!** 📸

