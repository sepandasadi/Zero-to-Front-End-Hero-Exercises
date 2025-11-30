# Exercise 2: Understanding Nesting

## 🎯 Goal

Practice proper HTML element nesting with emphasis tags.

## 📋 Requirements

Create a file called `nesting-practice.html` with:

### Structure:
- [ ] Complete HTML5 document structure
- [ ] Proper DOCTYPE, html, head, and body tags

### Content Requirements:
1. **Main heading** (`<h1>`): "My Favorite Books"

2. **First paragraph** containing:
   - [ ] Regular text
   - [ ] **Bold text** using `<strong>` tag
   - [ ] *Italic text* using `<em>` tag
   - [ ] A word that is **both bold and italic** (nest tags properly!)

3. **Second paragraph** with:
   - [ ] A sentence about your favorite book
   - [ ] A link to the book on Amazon or Goodreads
   - [ ] The link should open in a new tab

## 💡 Key Concepts to Practice

**Proper nesting order matters!**

✅ Correct:
```html
<p>This is <strong>bold</strong> text.</p>
```

❌ Incorrect:
```html
<p>This is <strong>bold</p></strong>
```

**Combining bold and italic:**
```html
<strong><em>Bold and italic</em></strong>
or
<em><strong>Italic and bold</strong></em>
```

Both work! Just make sure tags close in reverse order.

## ✅ Success Criteria

- All tags are properly nested (no overlapping)
- Bold and italic text display correctly
- Link works and opens in new tab
- HTML validates with no errors
- Code is properly indented

## 🔍 Test Your Work

1. Open the page in your browser
2. Right-click → "View Page Source"
3. Check if your HTML looks clean and organized
4. Click the link to make sure it works
5. Verify bold and italic text renders correctly

## 🚀 Bonus Challenges

- [ ] Add a third paragraph with a nested list inside it
- [ ] Add more books with links
- [ ] Use comments to label each section
- [ ] Add a subheading (`<h2>`) for "Why I Love Reading"

## 📊 Estimated Time

15 minutes

---

**Remember**: Proper nesting is like parentheses in math or nesting dolls — they must close in reverse order!

