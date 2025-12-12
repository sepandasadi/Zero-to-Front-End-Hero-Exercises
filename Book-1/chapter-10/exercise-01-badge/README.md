# Exercise 1: Positioned Badge

**Difficulty:** ⭐ Beginner
**Time:** 15-20 minutes

## 🎯 Objective

Create a product card with absolutely positioned badges in the corners.

## 📚 Concepts Practiced

- Creating positioning contexts with `position: relative`
- Using `position: absolute` with directional properties
- Understanding how absolute positioning relates to ancestors
- Basic z-index usage

## 📋 Requirements

Create a product card that includes:

1. **Card container** - With proper positioning context
2. **"NEW" badge** - Positioned in the top-left corner
3. **"50% OFF" badge** - Positioned in the top-right corner
4. **Heart/wishlist icon** - Positioned in the bottom-right corner
5. **Product image** - Takes full width of card
6. **Product details** - Title and price below image

## ✅ Success Criteria

- [ ] Badges appear in correct corners
- [ ] Badges don't affect layout of other elements
- [ ] Card maintains proper structure
- [ ] Badges stay positioned even if card size changes
- [ ] All elements are properly layered (badges on top)

## 💡 Hints

<details>
<summary>Click for hints</summary>

1. The card itself needs `position: relative` to be the positioning context
2. Badges need `position: absolute` with top/right/bottom/left values
3. Use specific pixel values (like `10px`) for positioning from edges
4. Add `z-index` to badges to ensure they appear on top of the image

</details>

## 🎨 Design Specifications

```
Card:
- Width: 300px
- Border: 1px solid #ddd
- Border-radius: 8px
- Padding: 0 (image should be full-width)

NEW Badge:
- Position: top-left (10px from top, 10px from left)
- Background: #27ae60 (green)
- Color: white
- Padding: 5px 10px
- Border-radius: 3px

50% OFF Badge:
- Position: top-right (10px from top, 10px from right)
- Background: #e74c3c (red)
- Color: white
- Padding: 5px 10px
- Border-radius: 3px

Wishlist Icon:
- Position: bottom-right (10px from bottom, 10px from right)
- Background: white
- Width/Height: 40px
- Border-radius: 50% (circle)
- Box-shadow: 0 2px 4px rgba(0,0,0,0.2)
```

## 📁 Files

- `starter/index.html` - HTML structure (complete)
- `starter/styles.css` - Your CSS goes here (starter code provided)
- `solution/` - Complete solution files

## 🚀 Getting Started

1. Open `starter/index.html` in your browser
2. Add CSS in `starter/styles.css`
3. Refresh to see your changes
4. Compare with solution when done

## 🎓 Learning Goals

After completing this exercise, you should understand:

- How to create a positioning context
- How absolute positioning works relative to ancestors
- How to position elements in specific corners
- Basic z-index layering

---

**Good luck!** 🎯

