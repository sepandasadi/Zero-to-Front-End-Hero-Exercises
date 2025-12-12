# Exercise 4: Fix Broken HTML

## 🎯 Goal

Debug common HTML mistakes and develop your error-spotting skills.

## 📋 Task

The HTML below has **10 errors**. Copy it into a file called `fix-me.html` and correct all the mistakes:

```html
<!DOCTYPE HTML>
<HTML>
<head>
  <meta charset="UTF-8">
  <title>My Broken Page
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
<body>
  <h1>Welcome to My Site</h2>
  <p>This is a paragraph with <strong>bold text</p></strong>

  <img src="photo.jpg">

  <a href="https://google.com">Visit Google

  <p>Another paragraph with <em>italic and <strong>bold</p></strong></em>

</body>
```

## 🔍 How to Approach This

1. **Copy the broken code** to `fix-me.html`
2. **Open it in a browser** - does it look right?
3. **Check the browser console** (F12) for errors
4. **Fix one error at a time** and test after each fix
5. **Use the HTML validator** - https://validator.w3.org/
6. **Compare with solution** only after you've tried!

## 💡 Hints (Don't Look Until You've Tried!)

<details>
<summary>Hint 1: What types of errors to look for</summary>

- DOCTYPE formatting
- Tag case (uppercase vs lowercase)
- Missing closing tags
- Wrong closing tags
- Improper nesting
- Missing required attributes
</details>

<details>
<summary>Hint 2: Specific areas with errors</summary>

- Line 1: DOCTYPE syntax
- Line 2: Case convention
- Line 5: Missing closing tag
- Line 6: Missing closing tag
- Line 8: Wrong closing tag type
- Line 9: Improper nesting
- Line 11: Missing required attribute
- Line 13: Missing closing tag
- Line 15: Triple nested tags with improper closing order
- Line 17: Missing closing tag at end
</details>

## ✅ Success Criteria

- [ ] All 10 errors are fixed
- [ ] Page displays correctly in browser
- [ ] No console errors (press F12 to check)
- [ ] HTML validates at https://validator.w3.org/
- [ ] All tags are properly nested
- [ ] All required attributes are present

## 🚀 Bonus Challenges

After fixing all errors:
- [ ] Add comments explaining what each error was
- [ ] Add proper lang attribute to html tag
- [ ] Add a meta description
- [ ] Improve the content and structure
- [ ] Make sure all images have descriptive alt text

## 📊 Common HTML Errors You Should Know

**1. Missing closing tags**
```html
❌ <p>Text
✅ <p>Text</p>
```

**2. Wrong closing tag**
```html
❌ <h1>Title</h2>
✅ <h1>Title</h1>
```

**3. Improper nesting**
```html
❌ <p><strong>Bold</p></strong>
✅ <p><strong>Bold</strong></p>
```

**4. Missing required attributes**
```html
❌ <img src="photo.jpg">
✅ <img src="photo.jpg" alt="Description">
```

**5. Case inconsistency (though HTML is case-insensitive, lowercase is the convention)**
```html
❌ <HTML><HEAD>
✅ <html><head>
```

## 📊 Estimated Time

20 minutes

---

**Remember**: Debugging is a critical developer skill! Don't get frustrated—every bug you fix makes you better at spotting them in the future. 🐛→✨

