# Exercise 1: Your First Stylesheet

**Difficulty**: ⭐ Beginner
**Concepts**: External CSS, linking stylesheets, basic styling

---

## 🎯 Goal

Create your first external CSS file and link it to an HTML document. Learn the proper workflow for separating content (HTML) from presentation (CSS).

---

## 📝 Instructions

### Step 1: Create the HTML File

Create an `index.html` file with the following content:

- A header with a main title
- A navigation menu with at least 3 links
- A main content area with:
  - A heading
  - 2-3 paragraphs
  - At least one image
  - A button or call-to-action link
- A footer

**Use semantic HTML**: `<header>`, `<nav>`, `<main>`, `<footer>`, etc.

---

### Step 2: Create the CSS File

Create a `styles.css` file in the same folder as your HTML.

---

### Step 3: Link the CSS to HTML

Add the `<link>` tag in your HTML's `<head>` section:

```html
<link rel="stylesheet" href="styles.css">
```

---

### Step 4: Add CSS Styles

In your `styles.css` file, add styles for:

1. **Body**: Set a background color, font family, and text color
2. **Header**: Style with a different background, centered text
3. **Navigation links**: Remove underlines, add hover effects
4. **Headings**: Choose a color and font size
5. **Paragraphs**: Set line-height and font size
6. **Images**: Add border-radius or other styling
7. **Buttons/Links**: Style with colors, padding, hover effects
8. **Footer**: Different background, centered text

---

## ✅ Requirements

- [ ] HTML file uses semantic elements
- [ ] CSS file is external and properly linked
- [ ] Body has background color and font set
- [ ] Header is styled distinctly from content
- [ ] Navigation links have hover effects
- [ ] Headings use custom colors
- [ ] Paragraphs have proper line-height (1.5-1.6)
- [ ] At least one image is styled
- [ ] Button/link has styled hover state
- [ ] Footer is visually distinct
- [ ] Page looks cohesive and professional

---

## 💡 Tips

- Start with body styles (font, color, background) that apply site-wide
- Use hex colors or RGB—try a color palette generator like [Coolors](https://coolors.co/)
- Test hover effects by moving your mouse over links
- Open the page in your browser and refresh after each CSS change
- Use browser DevTools (F12) to inspect and test styles

---

## 🎓 Bonus Challenges

1. **Add more sections**: Create an "About" or "Services" section with unique styling
2. **Use a web font**: Link to Google Fonts and use a custom font
3. **Add subtle effects**: Box shadows, border-radius, text shadows
4. **Create a color theme**: Use 3-5 colors consistently throughout
5. **Style different heading levels**: Make h1, h2, h3 progressively smaller

---

## 📚 Example Structure

Your files should look like this:

```
exercise-01/
├── index.html
└── styles.css
```

---

**Open `starter/` folder to begin, then compare with `solution/` when done!**

