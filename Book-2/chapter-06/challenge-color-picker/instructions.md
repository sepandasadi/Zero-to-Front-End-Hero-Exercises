# 🚀 Challenge Project: Interactive Color Picker

**Difficulty**: ⭐⭐⭐ Advanced
**Concepts**: All DOM manipulation concepts combined

---

## 🎯 Project Goal

Build a fully functional **Interactive Color Picker** application that lets users change the page background by clicking colored boxes. This project combines everything you've learned about DOM selection, manipulation, creation, and events!

---

## ✅ Core Features (Required)

### Feature 1: Color Palette Display

Create a grid of at least **8 colored boxes** with different colors.

**Requirements:**
- Each box should be clearly visible and clickable
- Use a variety of colors (reds, blues, greens, purples, etc.)
- Boxes should have good visual design (rounded corners, shadows, etc.)

**Suggested colors:**
- `#e74c3c` (Red)
- `#3498db` (Blue)
- `#2ecc71` (Green)
- `#f39c12` (Orange)
- `#9b59b6` (Purple)
- `#1abc9c` (Teal)
- `#34495e` (Dark Gray)
- `#ecf0f1` (Light Gray)

---

### Feature 2: Click to Change Background

When a user clicks a color box:
- The page background changes to that color
- Provide visual feedback (e.g., box border or scale effect)

---

### Feature 3: Display Selected Color

Show the currently selected color information:
- Display the color name or hex code
- Update this display every time a new color is selected

Example: "Current color: #3498db"

---

### Feature 4: Reset Button

Add a button that resets the background to the default color (white or light gray).

---

## 🎁 Bonus Features (Optional)

### Bonus 1: Custom Color Input

Add an text input where users can type a custom hex color (e.g., `#ff6b6b`) and apply it by clicking a button.

**Validation:** Check if the input is a valid hex color before applying.

---

### Bonus 2: Random Color Generator

Add a button that generates and applies a completely random color to the background.

**Hint:** Generate random RGB values: `rgb(r, g, b)` where r, g, b are random numbers 0-255.

---

### Bonus 3: Color History

Keep track of the last 3-5 colors selected and display them as small preview boxes.

Users should be able to click these history boxes to quickly return to a previous color.

---

### Bonus 4: Smooth Transitions

Add CSS transitions so the background color change is smooth and animated.

---

### Bonus 5: Accessibility

- Add keyboard navigation support (tab through colors, press Enter to select)
- Add ARIA labels for screen readers
- Ensure text remains readable on all backgrounds (auto-adjust text color)

---

## 💻 Technical Requirements

### DOM Manipulation You'll Use:

✅ `document.createElement()` - Create color boxes dynamically
✅ `appendChild()` / `append()` - Add boxes to the DOM
✅ `addEventListener()` - Handle click events
✅ `element.style.backgroundColor` - Change background color
✅ `textContent` / `innerHTML` - Update displayed information
✅ `classList.add/remove()` - Visual feedback on selection

---

## 🎨 Suggested Layout

```
┌─────────────────────────────────────────┐
│        Interactive Color Picker         │
│                                         │
│  Current Color: #3498db                 │
│                                         │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐          │
│  │ 🔴 │ │ 🔵 │ │ 🟢 │ │ 🟠 │   ...    │
│  └────┘ └────┘ └────┘ └────┘          │
│                                         │
│  [Reset] [Random Color]                 │
│                                         │
│  Custom: [______] [Apply]               │
│                                         │
│  History: ▪️ ▪️ ▪️                        │
└─────────────────────────────────────────┘
```

---

## 📋 Implementation Steps

### Step 1: HTML Structure

Create the basic HTML:
- Container for color boxes
- Display area for selected color
- Reset button
- (Optional) Custom input and history section

---

### Step 2: CSS Styling

Style your application:
- Color box grid layout (use Flexbox or Grid)
- Hover effects on boxes
- Active/selected state styling
- Responsive design

---

### Step 3: JavaScript - Core Functionality

1. **Create color data**
   ```javascript
   const colors = [
     { name: "Red", hex: "#e74c3c" },
     { name: "Blue", hex: "#3498db" },
     // ... more colors
   ];
   ```

2. **Generate color boxes**
   - Loop through colors array
   - Create a div for each color
   - Set background color
   - Append to container

3. **Add click handlers**
   - Listen for clicks on each box
   - Change page background
   - Update display text

4. **Implement reset**
   - Button to restore default color

---

### Step 4: Bonus Features (Optional)

Add custom color input, random generator, history tracking, etc.

---

## ✔️ Completion Checklist

### Core Features:
- [ ] Grid of colored boxes created dynamically
- [ ] Clicking a box changes page background
- [ ] Selected color is displayed
- [ ] Reset button works correctly
- [ ] Clean, organized code with comments

### Bonus Features (Optional):
- [ ] Custom color input with validation
- [ ] Random color generator
- [ ] Color history tracker
- [ ] Smooth color transitions
- [ ] Accessibility features

---

## 🎓 Learning Outcomes

By completing this project, you will have:

✅ Created multiple DOM elements programmatically
✅ Handled user events (clicks, input)
✅ Modified element styles dynamically
✅ Managed application state (current color, history)
✅ Validated user input
✅ Built a complete, functional web application

---

## 🚀 Ready to Build?

1. Start with the starter files for guidance
2. Build the core features first
3. Test thoroughly in the browser
4. Add bonus features if you want an extra challenge
5. Compare with the solution when done

**This is your chance to build something real!** Take your time, experiment, and have fun. You're creating an interactive web application from scratch using pure DOM manipulation!

**Good luck!** 🎨✨

