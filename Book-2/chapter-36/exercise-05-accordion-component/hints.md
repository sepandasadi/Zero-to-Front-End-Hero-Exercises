# Exercise 5: Accordion Component System - Hints

## Overview

This exercise teaches you the **compound component pattern** using React Context API. It's an advanced pattern used in professional component libraries.

---

## Key Concepts

### What is the Compound Component Pattern?

It allows multiple components to work together and share state implicitly:

```jsx
<Accordion>
  <AccordionItem title="Item 1">Content 1</AccordionItem>
  <AccordionItem title="Item 2">Content 2</AccordionItem>
</Accordion>
```

The `Accordion` manages state, and `AccordionItem` children access it via Context.

---

## Implementation Hints

### Hint 1: Create Context

```javascript
const AccordionContext = createContext();
```

This creates a "channel" for sharing data between parent and children.

---

### Hint 2: State for Open Items

```javascript
const [openItems, setOpenItems] = useState([]);
```

Use an array of indices to track which items are open. This allows multiple items open in "allowMultiple" mode.

---

### Hint 3: Toggle Logic

```javascript
function toggleItem(index) {
  if (allowMultiple) {
    // If already open, remove it; otherwise add it
    setOpenItems(openItems.includes(index)
      ? openItems.filter(i => i !== index)
      : [...openItems, index]
    );
  } else {
    // Only one open at a time
    setOpenItems(openItems.includes(index) ? [] : [index]);
  }
}
```

---

### Hint 4: Provide Context Value

```javascript
const value = {
  openItems,
  toggleItem
};

return (
  <AccordionContext.Provider value={value}>
    {children}
  </AccordionContext.Provider>
);
```

---

### Hint 5: Consume Context in AccordionItem

```javascript
function AccordionItem({ title, children, index }) {
  const { openItems, toggleItem } = useContext(AccordionContext);
  const isOpen = openItems.includes(index);

  // ...
}
```

---

### Hint 6: Unique IDs with useId

```javascript
const id = useId(); // Generates unique ID like ":r1:"

<button
  id={`header-${id}`}
  aria-controls={`panel-${id}`}
>
```

This ensures ARIA relationships work even with multiple accordions on the page.

---

### Hint 7: ARIA Attributes for Accessibility

```jsx
<button
  aria-expanded={isOpen}     // "true" or "false"
  aria-controls={`panel-${id}`}  // Links to panel
  id={`header-${id}`}
>
  {title}
</button>

<div
  id={`panel-${id}`}
  role="region"
  aria-labelledby={`header-${id}`}  // Links back to button
  hidden={!isOpen}
>
  {children}
</div>
```

**Why?** Screen readers announce the state and relationships.

---

### Hint 8: Dynamic Classes

```javascript
className={`accordion-content ${isOpen ? 'open' : 'closed'}`}
```

This lets CSS handle the animation smoothly.

---

## Common Mistakes

### ❌ Mistake 1: Passing State as Props

```jsx
// DON'T DO THIS (defeats the purpose):
<Accordion>
  <AccordionItem title="Item 1" isOpen={openItems[0]} onToggle={...}>
</Accordion>
```

**Use Context instead!** The whole point is implicit state sharing.

---

### ❌ Mistake 2: Using Boolean for Single Open Item

```javascript
// WRONG (only works for one item):
const [isOpen, setIsOpen] = useState(false);

// CORRECT (works for multiple):
const [openItems, setOpenItems] = useState([]);
```

---

### ❌ Mistake 3: Forgetting to Check Context

```javascript
function AccordionItem({ title, children, index }) {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error('AccordionItem must be used within Accordion');
  }

  // ... rest of component
}
```

Always validate context exists!

---

### ❌ Mistake 4: Not Using Unique IDs

```jsx
// WRONG (IDs conflict with multiple accordions):
<button id="header-0" aria-controls="panel-0">

// CORRECT (unique per accordion):
const id = useId();
<button id={`header-${id}`} aria-controls={`panel-${id}`}>
```

---

## Step-by-Step Checklist

### Accordion Component:
- [ ] Import `createContext`
- [ ] Create `AccordionContext`
- [ ] Add `openItems` state (array)
- [ ] Create `toggleItem` function
- [ ] Handle `allowMultiple` prop
- [ ] Create context value object
- [ ] Wrap children in `Provider`

### AccordionItem Component:
- [ ] Import `useContext` and `useId`
- [ ] Get context with `useContext(AccordionContext)`
- [ ] Calculate `isOpen` from context
- [ ] Generate unique ID with `useId()`
- [ ] Add button with onClick
- [ ] Add ARIA attributes
- [ ] Add dynamic icon (► or ▼)
- [ ] Add content div with dynamic className
- [ ] Add `hidden` attribute

---

## Testing Your Component

### Test 1: Single Mode (Default)
```jsx
<Accordion>
  <AccordionItem title="Item 1" index={0}>Content 1</AccordionItem>
  <AccordionItem title="Item 2" index={1}>Content 2</AccordionItem>
</Accordion>
```

- Click Item 1 → opens
- Click Item 2 → Item 1 closes, Item 2 opens
- Only one open at a time ✓

### Test 2: Multiple Mode
```jsx
<Accordion allowMultiple>
  <AccordionItem title="Item 1" index={0}>Content 1</AccordionItem>
  <AccordionItem title="Item 2" index={1}>Content 2</AccordionItem>
</Accordion>
```

- Click Item 1 → opens
- Click Item 2 → Item 1 stays open, Item 2 also opens
- Multiple can be open ✓

### Test 3: Accessibility
1. Tab to each button → should focus
2. Press Space or Enter → should toggle
3. Use screen reader → should announce expanded/collapsed state

---

## Debugging Tips

### Problem: "Cannot read properties of undefined"
**Cause:** AccordionItem is not inside Accordion (missing context)

**Fix:** Make sure AccordionItem is a child of Accordion

### Problem: All items open/close together
**Cause:** Not using unique indices

**Fix:** Pass different `index` prop to each AccordionItem

### Problem: Clicking doesn't do anything
**Check:**
- Is `toggleItem` function defined?
- Is it being passed in context value?
- Is onClick handler calling it?

---

## Bonus Challenges

### Bonus 1: Default Open Items
```jsx
const [openItems, setOpenItems] = useState(defaultOpen || []);

<Accordion defaultOpen={[0, 2]}>
  {/* Items 0 and 2 start open */}
</Accordion>
```

### Bonus 2: Controlled Mode
```jsx
export function Accordion({ activeIndex, onActiveChange, children }) {
  const openItems = activeIndex !== undefined ? activeIndex : internalOpenItems;

  function toggleItem(index) {
    if (onActiveChange) {
      onActiveChange(index);
    } else {
      // Use internal state
    }
  }
}
```

### Bonus 3: Keyboard Navigation
```jsx
function handleKeyDown(e) {
  if (e.key === 'ArrowDown') {
    // Focus next item
  } else if (e.key === 'ArrowUp') {
    // Focus previous item
  } else if (e.key === 'Home') {
    // Focus first item
  } else if (e.key === 'End') {
    // Focus last item
  }
}
```

### Bonus 4: Smooth Height Transitions
```css
.accordion-content {
  max-height: 0;
  transition: max-height 0.3s ease;
  overflow: hidden;
}

.accordion-content.open {
  max-height: 1000px; /* Large enough for content */
}
```

---

## Why This Pattern Matters

This compound component pattern is used in:
- **Radix UI** - Accessible components
- **Chakra UI** - Component library
- **Headless UI** - Unstyled components
- **React Spectrum** - Adobe's component library

Learning it makes you understand how professional libraries work!

---

## What You're Learning

1. **Context API** - Share state without prop drilling
2. **Compound components** - Coordinated component systems
3. **Accessibility** - ARIA attributes and roles
4. **useId hook** - Generate unique IDs
5. **Advanced patterns** - Production-quality components

---

## Next Steps

1. Complete the basic version
2. Add CSS animations
3. Try the bonus challenges
4. Use your accordion in a real project
5. Move on to Exercise 6 (Vue composable)

**Congratulations! You've learned an advanced React pattern used in every major component library!** 🚀

