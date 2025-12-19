# Exercise 2: DevTools Element Inspector

**Difficulty**: Beginner
**Time**: 30-45 minutes

## 🎯 Goal

Learn to reverse-engineer websites using Chrome DevTools. You'll inspect elements, understand CSS, and make live edits like a pro.

## 📋 Requirements

1. Chrome, Firefox, or Edge browser
2. Internet connection
3. Notepad for recording findings

## 🔨 Tasks

### Part 1: Element Investigation

**Choose one of these popular websites:**
- GitHub.com
- Twitter.com / X.com
- Stripe.com
- Airbnb.com
- Your favorite website

**Tasks - Find these using DevTools:**

1. **Typography Investigation**
   - [ ] What `font-family` is used for headings?
   - [ ] What `font-family` is used for body text?
   - [ ] What is the `font-size` of the main heading (H1)?
   - [ ] What `font-weight` is used for headings?
   - [ ] What `line-height` is used for paragraphs?

2. **Color Palette**
   - [ ] Primary background color (hex code)
   - [ ] Main text color (hex code)
   - [ ] Primary button background color
   - [ ] Primary button text color
   - [ ] Link color and hover color

3. **Spacing System**
   - [ ] What padding is used on the primary button?
   - [ ] What margin is used between sections?
   - [ ] What is the max-width of the main container?
   - [ ] What gap/spacing is used in the navigation menu?

4. **Layout Detective**
   - [ ] Is the navigation using Flexbox or Grid?
   - [ ] What display property is used for the main container?
   - [ ] Are there any CSS variables being used? (look for `--` in styles)
   - [ ] What CSS framework or library is being used? (check `<link>` tags)

**How to find this information:**
1. Right-click element → Inspect
2. Check the **Styles** panel on the right
3. Look at **Computed** tab for final values
4. Check `<head>` section for CSS files and frameworks

### Part 2: Live Editing Challenge

**Go to any website and make these changes using DevTools:**

1. **Text Changes**
   - [ ] Change the main heading text to your name
   - [ ] Change navigation link text to silly alternatives
   - [ ] Change a button's text to "Click Me!"

2. **Style Changes**
   - [ ] Change primary button color to bright pink
   - [ ] Change all headings to Comic Sans (go wild!)
   - [ ] Change background color to dark mode colors
   - [ ] Add a thick border to all images
   - [ ] Change link colors to rainbow colors

3. **Layout Changes**
   - [ ] Hide the navigation bar entirely
   - [ ] Change a Grid layout to Flexbox
   - [ ] Center an element that isn't centered
   - [ ] Add 100px of padding to the main container

**Take screenshots of:**
- Original site
- Your modified version
- Compare the difference!

### Part 3: CSS Debugging Practice

**Visit this CodePen:**
https://codepen.io/pen/ (create a new pen)

**Add this broken CSS:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    .container {
      width: 1200px;
      margin: 0 auto;
      background: #f0f0f0;
      padding: 20px;
    }

    .button {
      background: blue;
      color: white;
      padding: 10px 20px;
      text-align: center;
      display: inline;
      margin: 0 auto; /* This won't work! Why? */
    }

    .box {
      width: 200px;
      height: 200px;
      background: red;
      margin: 0 auto; /* This won't work either! Why? */
    }

    .text {
      font-size: 16px;
      color: blue;
      color: red; /* Which color will show? */
      font-size: 20px; /* Which size will show? */
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="button">Button</div>
    <div class="box"></div>
    <p class="text">This is text</p>
  </div>
</body>
</html>
```

**Use DevTools to answer:**
1. Why isn't the button centered?
2. Why isn't the box centered?
3. What color is the text? Why?
4. What font-size is the text? Why?
5. Fix all issues using DevTools
6. Copy the working CSS

### Part 4: The "Computed" Tab Challenge

**Visit any website with complex styling:**

**Tasks:**
1. Find an element with multiple CSS rules applying to it
2. Open the **Computed** tab
3. Answer these questions:
   - What's the final `display` value?
   - What's the total `width` including padding and border?
   - Which file/line number is the background-color coming from?
   - What inherited properties are being used?

**Screenshot the Computed tab with annotations**

### Part 5: Responsive Testing

**Visit your favorite website:**

**Tasks:**
1. Open DevTools responsive mode (`Ctrl/Cmd + Shift + M`)
2. Test these device sizes:
   - [ ] iPhone SE (375x667)
   - [ ] iPhone 14 Pro Max (430x932)
   - [ ] iPad (768x1024)
   - [ ] iPad Pro (1024x1366)
   - [ ] Desktop (1920x1080)

**For each size, note:**
- Does navigation change?
- Are images responsive?
- Does text remain readable?
- Any layout breaks or overflow?

**Take screenshots of the same page at:**
- Mobile (375px)
- Tablet (768px)
- Desktop (1920px)

## ✅ Success Criteria

- [ ] Successfully inspected and documented typography, colors, and spacing
- [ ] Made creative live edits to a website
- [ ] Debugged CSS issues using Computed tab
- [ ] Tested responsive design across multiple devices
- [ ] Understand how to use Elements panel professionally

## 🎓 What You Learned

- How to inspect HTML and CSS
- Understanding the Computed tab
- Making live edits for testing
- Debugging CSS issues
- Responsive design testing
- Reading browser DevTools like a pro

## 💡 Pro Tips

**Shortcut to inspect specific element:**
- Click the "Select element" icon in DevTools
- Or use `Ctrl/Cmd + Shift + C`
- Then click any element on the page

**Force element state:**
- Right-click element in Elements panel
- Choose "Force State"
- Select `:hover`, `:active`, `:focus`, etc.
- Test CSS for different states!

**Screenshot tricks:**
- `Ctrl/Cmd + Shift + P` → Type "screenshot"
- Options: Full page, visible area, or specific element

**Edit HTML directly:**
- Right-click element → "Edit as HTML"
- Make complex structural changes
- Perfect for testing layouts

## 📚 Additional Challenge

**Reverse Engineer a Component:**

Pick a beautiful component from a website you admire:
- Navigation bar
- Card layout
- Footer
- Hero section

**Using DevTools:**
1. Inspect all styles
2. Record all CSS properties
3. Recreate it from scratch in a CodePen
4. Make it pixel-perfect

**This is how you learn professional design patterns!**

---

**You're now equipped to learn from any website on the internet. Every beautiful design is now your teacher!** 🎨

