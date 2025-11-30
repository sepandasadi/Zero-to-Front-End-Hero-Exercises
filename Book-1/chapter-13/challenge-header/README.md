# Challenge Project: Complete Website Header

**Difficulty:** ⭐⭐⭐⭐ Expert
**Time:** 60-90 minutes

## 🎯 Objective

Build a full-featured, professional website header with multiple positioned elements, dropdowns, badges, and interactive components.

## 📚 Concepts Practiced

- Fixed positioning for persistent headers
- Absolute positioning for dropdowns and badges
- Z-index management for complex hierarchies
- Creating positioning contexts
- Building real-world UI patterns

## 📋 Requirements

### Header Structure
1. **Fixed header** - Stays at top when scrolling
2. **Logo** - Positioned on left side
3. **Navigation menu** - Centered horizontally
4. **Search icon** - With dropdown search bar
5. **Cart icon** - With positioned badge showing item count
6. **User profile** - With dropdown menu
7. **Mobile menu button** - Shows/hides on smaller screens

### Positioning Requirements
- Header uses fixed positioning
- Body has appropriate padding
- Dropdowns use absolute positioning relative to their parent
- Cart badge is positioned in top-right of cart icon
- All dropdowns appear above other content (proper z-index)
- Dropdowns don't overflow viewport

### Interaction Requirements
- Hover effects on all interactive elements
- Smooth transitions
- Dropdowns toggle on click (HTML/CSS only acceptable)
- Visual feedback for current page
- Focus styles for accessibility

## ✅ Success Criteria

- [ ] Header fixed at top with proper spacing
- [ ] Logo positioned correctly
- [ ] Navigation menu centered
- [ ] Search dropdown positioned relative to icon
- [ ] Cart badge positioned in correct corner
- [ ] User dropdown positioned below profile icon
- [ ] All dropdowns have proper z-index
- [ ] Smooth hover effects
- [ ] No layout shifts when dropdowns open
- [ ] Responsive behavior (mobile menu if bonus implemented)

## 🎨 Design Specifications

```
Header:
- Height: 70px
- Background: #2c3e50
- Fixed at top
- Z-index: 100

Navigation Links:
- Spacing: 20px between links
- Hover: Background rgba(255,255,255,0.1)
- Transition: 0.3s

Cart Badge:
- Position: Absolute, top-right of cart icon
- Offset: -8px from top, -8px from right
- Size: 20px circle
- Background: #e74c3c
- Z-index: 10

Dropdowns:
- Position: Absolute, below parent
- Background: white
- Box-shadow: 0 4px 12px rgba(0,0,0,0.15)
- Z-index: 1000
```

## 💡 Tips

1. Start with the basic fixed header structure
2. Add navigation next
3. Then add icons with positioning contexts
4. Add dropdowns one at a time
5. Implement z-index last
6. Test thoroughly with scrolling

## 🏆 Bonus Challenges

- Add keyboard navigation support
- Create responsive mobile menu
- Add search functionality animation
- Implement mega-menu for navigation
- Add notification badge to profile icon
- Create smooth slide-in animations for dropdowns

---

**See `starter/` folder for exercise files**

