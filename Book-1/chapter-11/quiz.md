# Chapter 14: Working with Images in CSS — Quiz

Test your understanding of CSS image techniques!

---

## 📝 Instructions

- Answer each question before checking the solution
- Each question has one correct answer unless otherwise stated
- Try to answer without looking at the chapter first

**Passing Score:** 12/15 (80%)

---

## Questions

### 1. When should you use CSS `background-image` instead of HTML `<img>`?

A) When the image needs alt text
B) When the image is decorative or part of the design
C) When you need SEO for the image
D) When the image is important content

<details>
<summary>Show Answer</summary>

**B) When the image is decorative or part of the design**

Background images are for decoration. Content images (with meaning) should use `<img>` with alt text for accessibility.

</details>

---

### 2. What does `background-size: cover` do?

A) Shows the entire image without cropping
B) Fills the container completely, cropping if necessary
C) Repeats the image to cover the space
D) Sets the image to its original size

<details>
<summary>Show Answer</summary>

**B) Fills the container completely, cropping if necessary**

`cover` ensures the entire container is filled while maintaining aspect ratio, which might crop parts of the image.

</details>

---

### 3. What does `background-size: contain` do?

A) Fills the container completely
B) Shows the entire image, possibly leaving empty space
C) Crops the image to fit
D) Stretches the image

<details>
<summary>Show Answer</summary>

**B) Shows the entire image, possibly leaving empty space**

`contain` ensures the entire image is visible while maintaining aspect ratio, which might leave empty space in the container.

</details>

---

### 4. Which property creates a parallax scrolling effect?

A) `background-position: fixed`
B) `background-attachment: fixed`
C) `position: fixed`
D) `background-repeat: fixed`

<details>
<summary>Show Answer</summary>

**B) `background-attachment: fixed`**

This makes the background stay fixed relative to the viewport while content scrolls, creating the parallax effect.

</details>

---

### 5. In the background shorthand, what does the `/` separate?

A) Image and position
B) Position and size
C) Size and repeat
D) Repeat and attachment

<details>
<summary>Show Answer</summary>

**B) Position and size**

Example: `background: url(img.jpg) center/cover` — position is `center`, size is `cover`.

</details>

---

### 6. When layering multiple background images, which appears on top?

A) The last one listed
B) The first one listed
C) The one with highest z-index
D) They blend together equally

<details>
<summary>Show Answer</summary>

**B) The first one listed**

In `background-image: url(top.png), url(bottom.jpg)`, `top.png` appears on top.

</details>

---

### 7. What property controls how an `<img>` element fits within its container?

A) `background-fit`
B) `image-fit`
C) `object-fit`
D) `content-fit`

<details>
<summary>Show Answer</summary>

**C) `object-fit`**

`object-fit` controls how `<img>` elements (and videos) fit their containers, similar to `background-size` for backgrounds.

</details>

---

### 8. Which `object-fit` value is best for creating circular profile photos?

A) `fill`
B) `contain`
C) `cover`
D) `scale-down`

<details>
<summary>Show Answer</summary>

**C) `cover`**

Combined with `border-radius: 50%`, `object-fit: cover` fills the circle completely while maintaining aspect ratio.

</details>

---

### 9. Which filter makes an image black and white?

A) `filter: blackwhite(100%)`
B) `filter: grayscale(100%)`
C) `filter: monochrome(100%)`
D) `filter: desaturate(100%)`

<details>
<summary>Show Answer</summary>

**B) `filter: grayscale(100%)`**

`grayscale(100%)` removes all color. `grayscale(0%)` is full color, `grayscale(50%)` is half gray.

</details>

---

### 10. Can you combine multiple CSS filters on one element?

A) No, only one filter allowed
B) Yes, by listing them space-separated
C) Yes, but only two maximum
D) Yes, but they must be in separate CSS rules

<details>
<summary>Show Answer</summary>

**B) Yes, by listing them space-separated**

Example: `filter: grayscale(50%) brightness(1.2) contrast(110%);`

</details>

---

### 11. What's the main advantage of using WebP image format?

A) Better color accuracy
B) Smaller file sizes than JPEG/PNG
C) Animated images
D) Supported by all browsers

<details>
<summary>Show Answer</summary>

**B) Smaller file sizes than JPEG/PNG**

WebP typically achieves 25-35% smaller file sizes while maintaining quality, improving page load performance.

</details>

---

### 12. How do you create a dark overlay on a background image?

A) Use Photoshop to darken it
B) Set `background-color: black`
C) Layer a semi-transparent gradient over the image
D) Use `filter: darken()`

<details>
<summary>Show Answer</summary>

**C) Layer a semi-transparent gradient over the image**

```css
background-image:
  linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
  url('image.jpg');
```

</details>

---

### 13. What does `background-repeat: space` do?

A) Repeats with spacing between tiles
B) Adds space around the entire background
C) Prevents the background from repeating
D) Makes the background transparent

<details>
<summary>Show Answer</summary>

**A) Repeats with spacing between tiles**

It repeats the image with even spacing between tiles to fill the container without cropping tiles.

</details>

---

### 14. Which is the best practice for hero background images on mobile?

A) Use the same large image as desktop
B) Use smaller images for mobile via media queries
C) Don't use background images on mobile
D) Always use `background-size: contain`

<details>
<summary>Show Answer</summary>

**B) Use smaller images for mobile via media queries**

Serve appropriately sized images for each device to improve performance:

```css
.hero { background-image: url('hero-mobile.jpg'); }
@media (min-width: 768px) {
  .hero { background-image: url('hero-desktop.jpg'); }
}
```

</details>

---

### 15. What happens if you set `background-image` but forget to set height on the element?

A) The image displays at full size
B) The browser automatically calculates height
C) The background might not be visible
D) The page crashes

<details>
<summary>Show Answer</summary>

**C) The background might not be visible**

Unlike `<img>` elements, backgrounds don't have intrinsic dimensions. If the container has no height (from content or CSS), the background won't show.

</details>

---

## 📊 Scoring

Count your correct answers:

- **13-15 correct (87-100%):** 🌟 Excellent! You're an image styling pro!
- **10-12 correct (67-83%):** 👍 Good! Review the topics you missed.
- **7-9 correct (47-60%):** 📚 You're getting there! Revisit the chapter.
- **0-6 correct (0-40%):** 🎯 Time to review! Go through Chapter 14 again.

---

## 🎯 Key Concepts to Review

If you struggled with certain questions, focus on these areas:

**Questions 1-3:** Background image basics and sizing
**Questions 4-6:** Advanced background properties
**Questions 7-8:** Object-fit for content images
**Questions 9-10:** CSS filters
**Questions 11-14:** Performance and responsive images
**Question 15:** Common mistakes

---

## 📚 Next Steps

1. Review any concepts you missed
2. Complete the practice exercises
3. Build the challenge project
4. Experiment with images in your own projects!

---

**Great job taking the quiz!** 🎉

