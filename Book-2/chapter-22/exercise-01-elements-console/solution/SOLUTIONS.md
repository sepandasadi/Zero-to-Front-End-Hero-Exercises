# Exercise 1 Solutions - Elements & Console Mastery

## Verification Task Solutions

### Task 1: Hide the Subtitle
```css
/* In DevTools Elements panel, add: */
.subtitle {
  display: none;
}

/* Or use the H key shortcut when .subtitle is selected */
```

### Task 2: Change Button Colors
```css
#btn1 {
  background: #28a745; /* Green */
}

#btn2 {
  background: #fd7e14; /* Orange */
}

#btn3 {
  background: #dc3545; /* Red */
}
```

### Task 3: Reveal the Secret
```javascript
// In Console, type:
window.revealSecret();
```

### Task 4: Box Model Mastery
```css
.container {
  padding: 60px;
  background: #f0f0f0;
}
```

### Task 5: Console DOM Manipulation

```javascript
// Change h1 text
$('h1').textContent = 'DevTools Master!';

// Make all cards lightblue
$$('.card').forEach(card => card.style.background = 'lightblue');

// Copy all card headings
copy($$('.card h2').map(h => h.textContent));

// Create table of button texts
console.table(
  $$('button').map(btn => ({
    id: btn.id,
    text: btn.textContent
  }))
);
```

## Console Utilities Reference

### Selection
```javascript
$('selector')           // querySelector
$$('selector')          // querySelectorAll (as array)
$0                      // Currently selected element
$1, $2, $3, $4         // Previously selected elements
$x('xpath')            // Select by XPath
```

### Inspection
```javascript
dir(object)            // Show object properties
keys(object)           // Show object keys
values(object)         // Show object values
monitor(function)      // Log function calls
unmonitor(function)    // Stop monitoring
```

### Events
```javascript
monitorEvents(element, 'click')           // Monitor click events
monitorEvents(element, ['click', 'key'])  // Monitor multiple
unmonitorEvents(element)                   // Stop monitoring
getEventListeners(element)                 // List all listeners
```

### Utility
```javascript
copy(anything)         // Copy to clipboard
clear()                // Clear console
table(array)           // Show as table
```

## Common Keyboard Shortcuts

### Elements Panel
- `H` - Hide/show element
- `Delete` - Delete element
- `Ctrl+Z` - Undo
- `Up/Down` - Navigate DOM tree
- `Right` - Expand element
- `Left` - Collapse element

### General
- `F12` or `Ctrl+Shift+I` - Open DevTools
- `Ctrl+Shift+C` - Inspect element mode
- `Ctrl+]` - Next panel
- `Ctrl+[` - Previous panel
- `Ctrl+Shift+P` - Command menu
- `Esc` - Toggle drawer

### Console
- `Ctrl+L` - Clear console
- `Up/Down` - Previous/next command
- `Tab` - Autocomplete

## Tips & Tricks

1. **Search in Elements**
   - `Ctrl+F` in Elements panel
   - Search by text, selector, or XPath

2. **Force Element State**
   - Click `:hov` button in Styles pane
   - Check :hover, :active, :focus, etc.

3. **Color Contrast Checker**
   - Click any color swatch
   - See AA/AAA compliance indicators

4. **Box Model Editor**
   - Click any value in box model diagram
   - Edit padding/margin/border directly

5. **Screenshot Element**
   - Right-click element
   - "Capture node screenshot"

## Practice Exercises

### Exercise A: Modify GitHub
1. Visit https://github.com
2. Change logo color using Elements panel
3. Edit main heading text
4. Find hidden elements

### Exercise B: Console Challenges
```javascript
// Count all images on page
$$('img').length

// Get all external links
$$('a[href^="http"]').filter(a => !a.href.includes(location.host))

// Total page statistics
console.table([
  { type: 'Images', count: $$('img').length },
  { type: 'Links', count: $$('a').length },
  { type: 'Scripts', count: $$('script').length },
  { type: 'Stylesheets', count: $$('link[rel="stylesheet"]').length }
]);

// Copy all image URLs
copy($$('img').map(img => img.src));
```

### Exercise C: Accessibility Audit
1. Check all text colors for contrast
2. Find elements with low contrast (below 4.5:1)
3. Fix contrast issues using color picker
4. Verify AA compliance

## Additional Resources

- [Chrome DevTools Docs](https://developer.chrome.com/docs/devtools/)
- [Console Utilities API](https://developer.chrome.com/docs/devtools/console/utilities/)
- [Keyboard Shortcuts](https://developer.chrome.com/docs/devtools/shortcuts/)

---

**Great job completing Exercise 1!** 🎉

You've mastered:
✅ Elements panel navigation
✅ Real-time CSS editing
✅ Box model visualization
✅ Console utilities
✅ DOM manipulation via Console

**Next:** Exercise 2 - Debugging with Sources Panel

