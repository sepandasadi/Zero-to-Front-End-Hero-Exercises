# Challenge Hints: Accessible Portfolio

## Page Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Name - Web Developer</title>
</head>
<body>
  <a href="#main" class="skip-link">Skip to main content</a>

  <header role="banner">
    <nav aria-label="Main navigation">
      <!-- Navigation -->
    </nav>
  </header>

  <main id="main" role="main">
    <section id="hero" aria-label="Introduction">
      <!-- Hero section -->
    </section>

    <section id="about" aria-labelledby="about-heading">
      <h2 id="about-heading">About Me</h2>
      <!-- About content -->
    </section>

    <section id="portfolio" aria-labelledby="portfolio-heading">
      <h2 id="portfolio-heading">My Work</h2>
      <!-- Projects -->
    </section>

    <section id="contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Get In Touch</h2>
      <!-- Contact form -->
    </section>
  </main>

  <footer role="contentinfo">
    <!-- Footer -->
  </footer>
</body>
</html>
```

## Testing Checklist

- ✓ Keyboard navigation (Tab, Shift+Tab, Enter, Escape)
- ✓ Screen reader (NVDA, VoiceOver, JAWS)
- ✓ WAVE accessibility check
- ✓ Lighthouse accessibility audit
- ✓ Color contrast checker
- ✓ Browser zoom (200%, 400%)
- ✓ Responsive on mobile, tablet, desktop
- ✓ Works without JavaScript

## WCAG 2.1 Quick Checklist

**Perceivable:**
- [ ] Alt text for images
- [ ] Color contrast ≥ 4.5:1
- [ ] Text resizable to 200%

**Operable:**
- [ ] Keyboard accessible
- [ ] No keyboard traps
- [ ] Skip links present

**Understandable:**
- [ ] Clear labels
- [ ] Error messages clear
- [ ] Consistent navigation

**Robust:**
- [ ] Valid HTML
- [ ] ARIA used correctly
- [ ] Works in all browsers

---

**Build something you're proud to share!** 🌟

