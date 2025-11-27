# CSS Practice Problems

This folder contains additional practice problems to strengthen your CSS skills. Each problem builds on fundamental concepts while introducing new challenges.

## How to Approach These Problems

1. Read the problem description and view any reference images
2. Create an HTML file and a CSS file for your solution
3. Start with HTML structure, then add CSS styling
4. Test your solution in multiple browsers if possible
5. Use the validation checklist to verify your work
6. Compare with the solution when you're done

## Problems

### Beginner Level

#### 1. Typography Showcase
**Goal**: Style a page with various text elements using CSS typography properties

**Requirements**:
- Style headings with different font sizes, weights, and colors
- Set line-height and letter-spacing for paragraphs
- Style a blockquote with custom formatting
- Create a styled list with custom bullet points
- Use at least 2 different font families (use Google Fonts)

**Skills Practiced**: Typography, font properties, text styling

---

#### 2. Button Collection
**Goal**: Create 6 different button styles

**Requirements**:
- Primary button (filled)
- Secondary button (outlined)
- Danger button (red theme)
- Success button (green theme)
- Disabled button (grayed out)
- Large call-to-action button
- Add hover and active states for all buttons
- Ensure consistent sizing and spacing

**Skills Practiced**: Buttons, hover effects, color, spacing

---

#### 3. Card Component
**Goal**: Style a card component with image, text, and button

**Requirements**:
- Card container with border and shadow
- Image at the top of the card
- Title and description text
- Button at the bottom
- Proper spacing and alignment
- Add hover effect to lift the card slightly

**Skills Practiced**: Box model, shadows, spacing, hover effects

---

### Intermediate Level

#### 4. Responsive Navigation Bar
**Goal**: Create a horizontal navigation bar that's responsive

**Requirements**:
- Horizontal menu for desktop
- Proper spacing between menu items
- Hover effects on links
- Active state styling
- Use Flexbox for layout
- Add a background color and adjust text color for contrast

**Skills Practiced**: Flexbox, navigation styling, hover states, responsive design

---

#### 5. Photo Grid Layout
**Goal**: Create a responsive image grid using CSS Grid

**Requirements**:
- 3 columns on desktop
- 2 columns on tablet
- 1 column on mobile
- Equal height rows
- Consistent gap between images
- Images should cover their containers
- Add a hover effect (zoom or overlay)

**Skills Practiced**: CSS Grid, responsive design, image styling, hover effects

---

#### 6. Pricing Table
**Goal**: Build a 3-column pricing table with different tiers

**Requirements**:
- 3 pricing cards side by side
- Highlight the "popular" middle card
- Each card includes: title, price, feature list, and button
- Use Flexbox or Grid for layout
- Different colors for each tier
- Add hover effects
- Make it stack vertically on mobile

**Skills Practiced**: Layout, cards, responsive design, visual hierarchy

---

#### 7. Form Styling
**Goal**: Create a beautifully styled form

**Requirements**:
- Style all input types (text, email, select, textarea, checkbox, radio)
- Custom focus states
- Proper spacing and alignment
- Labels positioned consistently
- Error state styling (red border)
- Success state styling (green border)
- Styled submit button
- Use CSS Grid or Flexbox for layout

**Skills Practiced**: Form styling, states, layout, color

---

### Advanced Level

#### 8. Landing Page Hero Section
**Goal**: Create a full-width hero section with overlay text

**Requirements**:
- Full viewport height
- Background image with overlay
- Centered content with heading, subheading, and CTA button
- Use Flexbox for centering
- Add a subtle animation on page load
- Fully responsive on all screen sizes

**Skills Practiced**: Layout, positioning, overlays, animations, responsive design

---

#### 9. Dashboard Layout
**Goal**: Build a dashboard layout with sidebar and content area

**Requirements**:
- Fixed sidebar on the left
- Main content area on the right
- Header bar across the top
- Use CSS Grid for main layout
- Sidebar should be collapsible on mobile
- Content area should contain cards in a grid
- Proper spacing throughout

**Skills Practiced**: CSS Grid, complex layouts, responsive design

---

#### 10. Animated Loading Spinner
**Goal**: Create custom loading animations using CSS

**Requirements**:
- Create 3 different loading animations
- Spinner/circle animation
- Pulsing dots animation
- Progress bar animation
- Use CSS animations and keyframes
- No JavaScript required

**Skills Practiced**: CSS animations, keyframes, transforms

---

#### 11. Magazine-Style Article Layout
**Goal**: Create a multi-column article layout with images

**Requirements**:
- Two-column text layout for large screens
- Images that span across columns
- Pull quotes styled distinctively
- Drop cap on first paragraph
- Proper typography hierarchy
- Responsive single column on mobile

**Skills Practiced**: Multi-column layout, advanced typography, responsive design

---

## Validation Checklist

Use this checklist for each exercise:

- [ ] CSS validates (use [W3C CSS Validator](https://jigsaw.w3.org/css-validator/))
- [ ] Responsive on mobile, tablet, and desktop
- [ ] Consistent spacing and alignment
- [ ] Proper color contrast for accessibility
- [ ] Hover and focus states work correctly
- [ ] No broken layouts at different screen sizes
- [ ] Clean, organized CSS with comments

## Tips for Success

1. **Mobile First**: Start with mobile styles, then add breakpoints
2. **Use CSS Variables**: Define colors and spacing as variables
3. **Box Model**: Master padding, margin, and border
4. **DevTools**: Use browser DevTools to debug and experiment
5. **Naming**: Use clear, consistent class names (consider BEM methodology)
6. **Don't Repeat**: Use classes to avoid repeating styles

## Recommended Breakpoints

```css
/* Mobile: default styles */

/* Tablet */
@media (min-width: 768px) {
  /* styles */
}

/* Desktop */
@media (min-width: 1024px) {
  /* styles */
}

/* Large Desktop */
@media (min-width: 1280px) {
  /* styles */
}
```

## Need Help?

- Check the solutions folder for reference implementations
- Review the corresponding chapter in the book
- Use browser DevTools to inspect and debug
- Reference [MDN Web Docs](https://developer.mozilla.org/) for CSS properties
- Ask questions in the community discussions
