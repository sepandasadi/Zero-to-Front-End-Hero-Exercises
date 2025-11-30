# Exercise 1: Box Dimension Calculator

**Difficulty**: ⭐ Beginner
**Concepts**: Box model calculations, box-sizing differences

---

## 🎯 Goal

Practice calculating total box dimensions with different `box-sizing` values. Understanding the math behind the box model is crucial for predicting and controlling layout.

---

## 📝 Instructions

For each scenario below, calculate the **total rendered width and height** of the element.

### Scenario 1: content-box (default)

```css
.box {
  width: 300px;
  height: 200px;
  padding: 25px;
  border: 3px solid black;
  margin: 15px;
}
```

**Calculate:**
1. Total content width
2. Total rendered width (including padding and border)
3. Total space taken on page (including margin)
4. Same for height

---

### Scenario 2: border-box

```css
.box {
  box-sizing: border-box;
  width: 300px;
  height: 200px;
  padding: 25px;
  border: 3px solid black;
  margin: 15px;
}
```

**Calculate:**
1. Total box width
2. Actual content width
3. Total space taken on page (including margin)
4. Same for height

---

### Scenario 3: Asymmetric padding (content-box)

```css
.box {
  width: 400px;
  height: 150px;
  padding: 10px 30px;  /* vertical | horizontal */
  border: 2px solid black;
  margin: 20px 10px;   /* vertical | horizontal */
}
```

**Calculate total dimensions**

---

### Scenario 4: Different borders (border-box)

```css
.box {
  box-sizing: border-box;
  width: 250px;
  height: 100px;
  padding: 15px;
  border-top: 5px solid red;
  border-right: 2px solid blue;
  border-bottom: 5px solid red;
  border-left: 2px solid blue;
  margin: 10px;
}
```

**Calculate total dimensions**

---

## ✅ What to Submit

Create a document (text file, markdown, or paper) with:

1. Your calculations for each scenario
2. Step-by-step math showing your work
3. Final answers for:
   - Content dimensions
   - Total box dimensions
   - Total space on page

---

## 💡 Tips

- Draw boxes on paper to visualize
- Remember: content-box adds padding/border to width
- Remember: border-box includes padding/border in width
- Margin is always added outside (both box-sizing values)
- For asymmetric values, calculate left+right separately from top+bottom

---

## 🎓 Formula Reference

### content-box (default)

```
Total Width = width + padding-left + padding-right + border-left + border-right
Total Height = height + padding-top + padding-bottom + border-top + border-bottom

Space on page = Total Width + margin-left + margin-right
```

### border-box

```
Total Width = width (always)
Total Height = height (always)

Content Width = width - padding-left - padding-right - border-left - border-right
Content Height = height - padding-top - padding-bottom - border-top - border-bottom

Space on page = Total Width + margin-left + margin-right
```

---

**Check your answers in the `solution/` file when done!**

