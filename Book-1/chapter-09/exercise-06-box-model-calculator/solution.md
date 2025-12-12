# Exercise 1 Solution: Box Dimension Calculator

Here are the complete solutions with step-by-step calculations.

---

## Scenario 1: content-box (default)

```css
.box {
  width: 300px;
  height: 200px;
  padding: 25px;
  border: 3px solid black;
  margin: 15px;
}
```

### Width Calculations

**Content width:** 300px (as specified)

**Total rendered width:**
```
= width + padding-left + padding-right + border-left + border-right
= 300 + 25 + 25 + 3 + 3
= 356px
```

**Total space on page:**
```
= total rendered width + margin-left + margin-right
= 356 + 15 + 15
= 386px
```

### Height Calculations

**Content height:** 200px (as specified)

**Total rendered height:**
```
= height + padding-top + padding-bottom + border-top + border-bottom
= 200 + 25 + 25 + 3 + 3
= 256px
```

**Total space on page:**
```
= total rendered height + margin-top + margin-bottom
= 256 + 15 + 15
= 286px
```

### Summary

| Measurement | Width | Height |
|-------------|-------|--------|
| Content | 300px | 200px |
| + Padding | +50px | +50px |
| + Border | +6px | +6px |
| **Box Total** | **356px** | **256px** |
| + Margin | +30px | +30px |
| **Space Total** | **386px** | **286px** |

---

## Scenario 2: border-box

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

### Width Calculations

**Total box width:** 300px (always with border-box!)

**Actual content width:**
```
= width - padding-left - padding-right - border-left - border-right
= 300 - 25 - 25 - 3 - 3
= 244px
```

**Total space on page:**
```
= total box width + margin-left + margin-right
= 300 + 15 + 15
= 330px
```

### Height Calculations

**Total box height:** 200px (always with border-box!)

**Actual content height:**
```
= height - padding-top - padding-bottom - border-top - border-bottom
= 200 - 25 - 25 - 3 - 3
= 144px
```

**Total space on page:**
```
= total box height + margin-top + margin-bottom
= 200 + 15 + 15
= 230px
```

### Summary

| Measurement | Width | Height |
|-------------|-------|--------|
| Specified | 300px | 200px |
| - Padding | -50px | -50px |
| - Border | -6px | -6px |
| **Content** | **244px** | **144px** |
| **Box Total** | **300px** | **200px** |
| + Margin | +30px | +30px |
| **Space Total** | **330px** | **230px** |

---

## Scenario 3: Asymmetric padding (content-box)

```css
.box {
  width: 400px;
  height: 150px;
  padding: 10px 30px;  /* vertical | horizontal */
  border: 2px solid black;
  margin: 20px 10px;   /* vertical | horizontal */
}
```

**Breaking down shorthand:**
- `padding: 10px 30px` = top/bottom: 10px, left/right: 30px
- `margin: 20px 10px` = top/bottom: 20px, left/right: 10px

### Width Calculations

```
Content width: 400px

Total box width:
= 400 + 30 (left pad) + 30 (right pad) + 2 (left border) + 2 (right border)
= 400 + 60 + 4
= 464px

Space on page:
= 464 + 10 (left margin) + 10 (right margin)
= 484px
```

### Height Calculations

```
Content height: 150px

Total box height:
= 150 + 10 (top pad) + 10 (bottom pad) + 2 (top border) + 2 (bottom border)
= 150 + 20 + 4
= 174px

Space on page:
= 174 + 20 (top margin) + 20 (bottom margin)
= 214px
```

### Summary

| Measurement | Width | Height |
|-------------|-------|--------|
| Content | 400px | 150px |
| + Padding | +60px (30+30) | +20px (10+10) |
| + Border | +4px (2+2) | +4px (2+2) |
| **Box Total** | **464px** | **174px** |
| + Margin | +20px (10+10) | +40px (20+20) |
| **Space Total** | **484px** | **214px** |

---

## Scenario 4: Different borders (border-box)

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

### Width Calculations

```
Total box width: 250px (always with border-box!)

Content width:
= 250 - 15 (left pad) - 15 (right pad) - 2 (left border) - 2 (right border)
= 250 - 30 - 4
= 216px

Space on page:
= 250 + 10 + 10
= 270px
```

### Height Calculations

```
Total box height: 100px (always with border-box!)

Content height:
= 100 - 15 (top pad) - 15 (bottom pad) - 5 (top border) - 5 (bottom border)
= 100 - 30 - 10
= 60px

Space on page:
= 100 + 10 + 10
= 120px
```

### Summary

| Measurement | Width | Height |
|-------------|-------|--------|
| Specified | 250px | 100px |
| - Padding | -30px (15+15) | -30px (15+15) |
| - Border | -4px (2+2) | -10px (5+5) |
| **Content** | **216px** | **60px** |
| **Box Total** | **250px** | **100px** |
| + Margin | +20px (10+10) | +20px (10+10) |
| **Space Total** | **270px** | **120px** |

---

## 🔑 Key Takeaways

### content-box (default)
- Width/height apply ONLY to content
- Padding and border are ADDED to dimensions
- Element gets LARGER than specified width

### border-box
- Width/height apply to the ENTIRE BOX
- Padding and border are INCLUDED in dimensions
- Element stays the SPECIFIED width
- Content area SHRINKS to make room

### Margin
- ALWAYS added outside the box
- Works the same for both box-sizing values
- Creates space between elements
- Transparent (no background)

---

## 💡 Why This Matters

Understanding these calculations is crucial because:

1. **Layout precision**: You need to know actual element sizes
2. **Responsive design**: Percentages and calc() depend on these rules
3. **Grid systems**: Column math relies on accurate dimension calculations
4. **Debugging**: When layouts break, knowing the math helps you fix them
5. **Professional code**: Understanding box-sizing prevents surprises

---

## 🎯 Practice More

Try calculating dimensions for:

1. Nested boxes (box inside a box)
2. Percentage widths with fixed padding
3. Flex items with padding and border
4. Grid items with gaps and padding

The more you practice, the more intuitive it becomes!

---

**Great job completing this exercise!** 📦✨

