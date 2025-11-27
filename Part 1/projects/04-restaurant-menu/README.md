# Project 4: Restaurant Menu Website

**Difficulty**: Beginner-Intermediate
**Estimated Time**: 4-6 hours

## Project Description

Create a restaurant website with a filterable menu. Practice working with data, filtering arrays, and creating dynamic UI components.

## Learning Objectives

- Work with JavaScript objects and arrays
- Filter and search data
- Create dynamic HTML from data
- Implement category filtering
- Build responsive layouts
- Practice grid/flexbox

## Requirements

### HTML Structure

- Hero section with restaurant name and tagline
- About section
- Menu section with categories
- Filter buttons (All, Breakfast, Lunch, Dinner, Drinks)
- Search functionality
- Hours and location section
- Contact information

### Menu Data Structure

```javascript
const menu = [
  {
    id: 1,
    title: "Pancakes",
    category: "breakfast",
    price: 12.99,
    img: "./images/item-1.jpg",
    desc: "Fluffy buttermilk pancakes served with maple syrup and butter"
  },
  // More items...
];
```

### CSS Requirements

- Appetizing food-themed design
- Menu items in grid layout
- High-quality food imagery
- Fully responsive
- Hover effects on menu items
- Smooth transitions when filtering

### JavaScript Functionality

- Display all menu items on page load
- Filter menu by category
- Search dishes by name or description
- Smooth animations when filtering
- Reset to show all items
- Count items in each category (optional)

## Starter Files

Create your own files based on the requirements. Include:
- `index.html` - Page structure
- `styles.css` - Styling
- `script.js` - Functionality
- `data.js` - Menu data (array of objects)

## Sample Menu Items

Include at least 12-15 items across categories:
- **Breakfast**: Pancakes, Omelette, French Toast, Breakfast Burrito
- **Lunch**: Burger, Caesar Salad, Sandwich, Pasta
- **Dinner**: Steak, Salmon, Pizza, Risotto
- **Drinks**: Coffee, Smoothie, Cocktails, Fresh Juice

## Bonus Challenges

- [ ] Add a reservation form with date/time picker
- [ ] Implement a photo gallery
- [ ] Add customer reviews section
- [ ] Highlight special/featured items
- [ ] Add dietary filters (vegan, gluten-free, etc.)
- [ ] Shopping cart for online ordering
- [ ] Sort by price (low to high, high to low)
- [ ] Dark mode toggle
- [ ] Print menu button

## Features to Implement

1. **Category Filtering**
   - Click button to show only items from that category
   - Smooth fade/slide animations
   - Update active button state

2. **Search Functionality**
   - Real-time search as user types
   - Search in item name and description
   - Show "No results" message when needed

3. **Responsive Grid**
   - 3 columns on desktop
   - 2 columns on tablet
   - 1 column on mobile
   - Equal height cards

## Resources

- [Array Filter Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

## Success Criteria

- [ ] All menu items display correctly
- [ ] Category filtering works
- [ ] Search functionality works
- [ ] Animations are smooth
- [ ] Responsive on all devices
- [ ] Images load properly
- [ ] No console errors
- [ ] Professional appearance

## Design Tips

- Use warm, appetizing colors (oranges, reds, browns)
- Choose food photography carefully (use Unsplash for free images)
- Ensure good readability for menu text
- Add subtle shadows to menu cards
- Use consistent spacing throughout
- Consider adding food emojis for visual interest

## Image Resources

- [Unsplash Food Category](https://unsplash.com/s/photos/food)
- [Pexels Food](https://www.pexels.com/search/food/)
- Use placeholder services: `https://via.placeholder.com/400x300`
