# Chapter 19 Quiz: CSS Animations & Transitions

Test your understanding of CSS animations and transitions! This quiz covers transitions, transforms, keyframes, animation properties, performance, and accessibility.

---

## Questions

### 1. What's the main difference between CSS transitions and CSS animations?

**A)** Transitions are faster than animations
**B)** Transitions animate between two states (like hover), animations can have multiple keyframes
**C)** Animations are more performant than transitions
**D)** There is no difference, they're interchangeable

<details>
<summary>Show Answer</summary>

**Answer: B**

**Transitions** animate property changes between two states (like hover → not hover). They're simple and automatic.

**Animations** (@keyframes) can have multiple states (0%, 25%, 50%, 100%) and more control over timing, direction, and behavior.

Example:
```css
/* Transition: Two states */
.button {
  background: blue;
  transition: background 0.3s;
}
.button:hover {
  background: darkblue;
}

/* Animation: Multiple states */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
.button {
  animation: pulse 2s infinite;
}
```

</details>

---

### 2. Which CSS properties should you primarily animate for best performance?

**A)** width and height
**B)** transform and opacity
**C)** margin and padding
**D)** background-color and border

<details>
<summary>Show Answer</summary>

**Answer: B**

`transform` and `opacity` are hardware-accelerated and don't cause repaints or reflows. They're the fastest properties to animate.

**Good (60fps):**
```css
.box {
  transition: transform 0.3s, opacity 0.3s;
}
.box:hover {
  transform: scale(1.1);
  opacity: 0.9;
}
```

**Bad (janky):**
```css
.box {
  transition: width 0.3s, height 0.3s;
}
.box:hover {
  width: 110%;
  height: 110%;
}
```

Use DevTools Performance panel to verify 60fps!

</details>

---

### 3. What does this CSS do?

```css
.button {
  transition: all 0.3s ease-in-out;
}
```

**A)** Animates only the background color
**B)** Animates all changing properties with a 0.3s duration
**C)** Makes all elements on the page transition
**D)** Creates a keyframe animation

<details>
<summary>Show Answer</summary>

**Answer: B**

`transition: all` animates **every property that changes** on the element. While convenient, it's better to be specific in production:

```css
/* Better: Be specific */
.button {
  transition: background 0.3s ease, transform 0.3s ease;
}
```

This is more performant and predictable.

</details>

---

### 4. Which transform function would you use to make an element larger?

**A)** `translate()`
**B)** `scale()`
**C)** `rotate()`
**D)** `skew()`

<details>
<summary>Show Answer</summary>

**Answer: B**

```css
/* Make element 1.5x larger */
.box {
  transform: scale(1.5);
}

/* Scale width and height differently */
.box {
  transform: scale(1.5, 0.8);
}

/* Or individually */
.box {
  transform: scaleX(1.5);
  transform: scaleY(0.8);
}
```

Other functions:
- `translate()` - Move
- `rotate()` - Rotate
- `skew()` - Slant

</details>

---

### 5. What's wrong with this animation?

```css
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal {
  animation: fade-in 0.5s;
}
```

**A)** Nothing, it's correct
**B)** The modal will disappear after the animation ends
**C)** The animation won't start
**D)** The duration is too short

<details>
<summary>Show Answer</summary>

**Answer: B**

Without `animation-fill-mode: forwards`, the element reverts to its original state (opacity might go back to 0 or its default value) after the animation ends.

**Fix:**
```css
.modal {
  animation: fade-in 0.5s forwards;
  /* Or using longhand: */
  animation-fill-mode: forwards;
}
```

This keeps the final keyframe styles (opacity: 1) after the animation completes.

</details>

---

### 6. What does `transform-origin: top left` do?

**A)** Moves the element to the top left corner
**B)** Sets the point around which transforms (rotate, scale) happen
**C)** Changes the element's position to top left
**D)** Makes the element appear in the top left

<details>
<summary>Show Answer</summary>

**Answer: B**

`transform-origin` sets the point around which transforms occur. By default, it's `center center`.

```css
/* Rotate from the left edge (like a door) */
.door {
  transform-origin: left center;
  transform: rotateY(90deg);
}

/* Scale from top-left corner */
.box {
  transform-origin: top left;
  transform: scale(0.5);
}

/* Default: center */
.box {
  transform-origin: center center; /* default */
  transform: rotate(45deg);
}
```

</details>

---

### 7. How do you make an animation run forever?

**A)** `animation-duration: infinite;`
**B)** `animation-iteration-count: infinite;`
**C)** `animation-repeat: infinite;`
**D)** `animation-loop: infinite;`

<details>
<summary>Show Answer</summary>

**Answer: B**

```css
.spinner {
  animation: spin 1s linear infinite;
  /*                          ^^^^^^^^ */
  /* Or using longhand: */
  animation-iteration-count: infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

Other values:
- `1` - Once (default)
- `3` - Three times
- `infinite` - Forever

</details>

---

### 8. What timing function creates constant speed (no acceleration)?

**A)** `ease`
**B)** `ease-in-out`
**C)** `linear`
**D)** `cubic-bezier(0.42, 0, 0.58, 1)`

<details>
<summary>Show Answer</summary>

**Answer: C**

```css
/* Constant speed - good for spinners */
.spinner {
  animation: spin 1s linear infinite;
}

/* Other timing functions: */
ease           /* Slow start, fast middle, slow end (default) */
ease-in        /* Slow start, fast end */
ease-out       /* Fast start, slow end */
ease-in-out    /* Slow start and end */
linear         /* Constant speed */
cubic-bezier() /* Custom curve */
```

Use `linear` for:
- Spinners/loaders
- Progress bars
- Anything that should move at constant speed

</details>

---

### 9. What does `animation-direction: alternate` do?

**A)** Plays the animation backwards
**B)** Alternates between playing forwards and backwards
**C)** Changes the animation every other time
**D)** Reverses the keyframes

<details>
<summary>Show Answer</summary>

**Answer: B**

```css
.box {
  animation: slide 2s ease-in-out infinite alternate;
}

@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}
```

**Result:** 0→100px (forward), 100px→0 (backward), 0→100px (forward), etc.

**All direction values:**
- `normal` - Always 0% → 100%
- `reverse` - Always 100% → 0%
- `alternate` - 0%→100%, 100%→0%, 0%→100%...
- `alternate-reverse` - 100%→0%, 0%→100%, 100%→0%...

</details>

---

### 10. How do you delay an animation by 500ms?

**A)** `animation-wait: 500ms;`
**B)** `animation-delay: 500ms;`
**C)** `animation-start: 500ms;`
**D)** `transition-delay: 500ms;`

<details>
<summary>Show Answer</summary>

**Answer: B**

```css
.element {
  animation: fade-in 1s ease-out 500ms;
  /*         name  duration easing delay */

  /* Or using longhand: */
  animation-delay: 500ms;
}
```

**Negative delays** start the animation partway through:
```css
.element {
  animation: spin 2s linear infinite -1s;
  /* Starts as if it's already been running for 1s */
}
```

</details>

---

### 11. What's the purpose of `@media (prefers-reduced-motion: reduce)`?

**A)** Makes animations run slower
**B)** Reduces file size of animations
**C)** Respects user preferences for less motion (accessibility)
**D)** Improves animation performance

<details>
<summary>Show Answer</summary>

**Answer: C**

Some users experience motion sickness or have vestibular disorders. This media query respects their OS-level preference for reduced motion.

```css
/* Default: Animations enabled */
.card {
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-4px);
}

/* User prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }

  .card:hover {
    transform: none;
    /* Keep non-motion feedback */
    opacity: 0.9;
  }
}
```

**Always include reduced motion support!** It's an accessibility requirement.

</details>

---

### 12. Which combination creates a smooth lift effect on hover?

**A)** `transform: translateY(10px);`
**B)** `transform: translateY(-10px);`
**C)** `transform: translateX(-10px);`
**D)** `transform: scaleY(1.1);`

<details>
<summary>Show Answer</summary>

**Answer: B**

**Negative Y translation** moves the element up (lifts it):

```css
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px); /* Lift up */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Enhance shadow */
}
```

**Direction guide:**
- `translateY(-10px)` - Move up ⬆️
- `translateY(10px)` - Move down ⬇️
- `translateX(-10px)` - Move left ⬅️
- `translateX(10px)` - Move right ➡️

</details>

---

### 13. What does the `forwards` value of `animation-fill-mode` do?

**A)** Makes the animation play forwards
**B)** Keeps the styles from the final keyframe after animation ends
**C)** Applies the first keyframe styles immediately
**D)** Makes the animation run faster

<details>
<summary>Show Answer</summary>

**Answer: B**

```css
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.element {
  animation: slide-in 0.5s ease-out forwards;
  /* forwards keeps opacity: 1 and translateX(0) */
}
```

**All fill-mode values:**
- `none` - No styles applied before/after (default)
- `forwards` - Keep final keyframe styles
- `backwards` - Apply first keyframe immediately
- `both` - Both forwards and backwards

</details>

---

### 14. How do you combine multiple transforms?

**A)** Write multiple `transform` properties
**B)** Put all transforms in one `transform` property
**C)** Use `transform-list`
**D)** Use `transform-combine`

<details>
<summary>Show Answer</summary>

**Answer: B**

```css
/* ✅ CORRECT: All in one declaration */
.box {
  transform: translateX(50px) rotate(45deg) scale(1.2);
}

/* ❌ WRONG: Last one wins (only scale applies) */
.box {
  transform: translateX(50px);
  transform: rotate(45deg);
  transform: scale(1.2); /* Only this applies */
}
```

**Order matters!**
```css
/* Rotate first, THEN move */
transform: rotate(45deg) translateX(100px);

/* Move first, THEN rotate (different result!) */
transform: translateX(100px) rotate(45deg);
```

</details>

---

### 15. What's the shorthand order for the `animation` property?

**A)** `duration name timing-function`
**B)** `name duration timing-function delay iteration-count direction fill-mode`
**C)** `name timing-function duration`
**D)** `timing-function duration name`

<details>
<summary>Show Answer</summary>

**Answer: B**

```css
animation: name duration timing-function delay iteration-count direction fill-mode play-state;

/* Example: */
animation: bounce 2s ease-in-out 0.5s infinite alternate forwards running;
/*         name  dur  easing    delay count   direction fill-mode state */
```

**Minimum required:**
```css
animation: bounce 1s;
/*         name  duration */
```

**Common usage:**
```css
animation: fade-in 0.5s ease-out forwards;
animation: spin 1s linear infinite;
animation: bounce 2s ease-in-out infinite alternate;
```

</details>

---

### 16. What does this code create?

```css
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loader {
  animation: spin 1s linear infinite;
}
```

**A)** A one-time spin
**B)** A continuously spinning loader
**C)** A back-and-forth rotation
**D)** A delayed spin

<details>
<summary>Show Answer</summary>

**Answer: B**

This creates a continuously spinning element (common for loading spinners):

- `spin` - Animation name
- `1s` - One rotation per second
- `linear` - Constant speed (no easing)
- `infinite` - Never stops

**Common use case:**
```css
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top-color: #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

</details>

---

### 17. Which is the best timing function for an element entering the screen?

**A)** `ease-in`
**B)** `ease-out`
**C)** `linear`
**D)** `ease-in-out`

<details>
<summary>Show Answer</summary>

**Answer: B**

`ease-out` starts fast and slows down at the end, which feels natural for elements entering:

```css
/* Element entering */
.modal-enter {
  animation: slide-in 0.3s ease-out;
}

/* Element exiting */
.modal-exit {
  animation: slide-out 0.3s ease-in;
}

/* Continuous motion */
.pulse {
  animation: pulse 2s ease-in-out infinite;
}
```

**Rule of thumb:**
- **Entering:** `ease-out` (fast→slow)
- **Exiting:** `ease-in` (slow→fast)
- **Looping:** `ease-in-out` (smooth)

</details>

---

### 18. How long should most UI animations be?

**A)** 50-100ms
**B)** 200-500ms
**C)** 1-2 seconds
**D)** 3+ seconds

<details>
<summary>Show Answer</summary>

**Answer: B**

**Ideal UI animation durations:**
- **Instant feedback:** 100-150ms (button press)
- **Fast transitions:** 200-300ms (hover effects)
- **Medium transitions:** 300-500ms (modals, dropdowns)
- **Large movements:** 500-800ms (page transitions)
- **Never exceed:** 1 second for UI

```css
/* Button hover: Quick */
.button {
  transition: transform 0.2s;
}

/* Modal entrance: Medium */
.modal {
  animation: fade-in 0.3s;
}

/* ❌ Too slow! */
.dropdown {
  transition: all 2s; /* Users will get impatient */
}
```

</details>

---

### 19. What's the difference between `transition-delay` and `animation-delay`?

**A)** They're the same thing
**B)** `transition-delay` is for transitions, `animation-delay` is for @keyframes
**C)** One is in seconds, one is in milliseconds
**D)** `animation-delay` doesn't exist

<details>
<summary>Show Answer</summary>

**Answer: B**

```css
/* Transition delay */
.button {
  transition: background 0.3s ease 0.1s;
  /*                            ^^^^^ delay */
}

.button:hover {
  background: blue;
  /* Waits 0.1s before transitioning */
}

/* Animation delay */
.box {
  animation: fade-in 1s ease 0.5s;
  /*                         ^^^^ delay */
  /* Waits 0.5s before starting */
}
```

Both use the same units (seconds or milliseconds).

</details>

---

### 20. What happens if you animate `width` instead of using `transform: scaleX()`?

**A)** Nothing, they're the same
**B)** Animating `width` causes reflows and is less performant
**C)** `width` is faster than `scaleX`
**D)** `scaleX` doesn't work

<details>
<summary>Show Answer</summary>

**Answer: B**

Animating `width` forces the browser to recalculate layout (reflow), which is slow. `transform: scaleX()` is hardware-accelerated and doesn't affect layout.

```css
/* ❌ BAD: Causes reflow, janky animation */
.box {
  transition: width 0.3s;
}
.box:hover {
  width: 200px;
}

/* ✅ GOOD: Hardware-accelerated, smooth 60fps */
.box {
  transition: transform 0.3s;
}
.box:hover {
  transform: scaleX(1.5);
}
```

**Performance hierarchy:**
1. **Best:** `transform`, `opacity`
2. **Okay:** `background-color`
3. **Avoid:** `width`, `height`, `top`, `left`, `margin`, `padding`

Use Chrome DevTools Performance panel to verify!

</details>

---

## Scoring Guide

- **18-20 correct**: 🏆 Animation Master! You're ready to create stunning, performant animations.
- **15-17 correct**: 🌟 Excellent! You have a solid grasp of CSS animations.
- **12-14 correct**: 📚 Good foundation! Review the areas you struggled with.
- **9-11 correct**: 💪 You're getting there! Re-read the chapter and practice more.
- **Below 9**: 📖 Keep learning! Review the chapter carefully and try the exercises.

---

## Key Takeaways

After this quiz, remember:

✅ Use **transitions** for simple state changes (hover, focus)
✅ Use **@keyframes** for complex, multi-step animations
✅ Animate **`transform` and `opacity`** for best performance
✅ Avoid animating `width`, `height`, `top`, `left`
✅ Keep UI animations **200-500ms** for optimal feel
✅ Use **`ease-out`** for entrances, **`ease-in`** for exits
✅ Always respect **`prefers-reduced-motion`**
✅ Use `animation-fill-mode: forwards` to keep final state
✅ Test animations in DevTools Performance panel
✅ Keep animations **subtle and purposeful**

---

**Ready for more practice?** Head back to the exercises and build some smooth, engaging animations! 🎬✨

