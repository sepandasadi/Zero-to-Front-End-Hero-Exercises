# Exercise 5: Accordion Component System

**Difficulty:** Intermediate to Advanced
**Estimated Time:** 60-90 minutes
**Concepts:** Component composition, Context API, compound components, accessibility

---

## 🎯 Goal

Build a reusable, accessible Accordion component system using the compound component pattern.

---

## 📋 Requirements

1. Multiple accordion items in one component
2. Click to expand/collapse
3. Only one item open at a time (default)
4. Allow multiple items open (optional mode)
5. Smooth animations
6. Keyboard navigation
7. ARIA attributes for accessibility

---

## 💻 Desired API

```jsx
<Accordion>
  <AccordionItem title="What is React?">
    <p>React is a JavaScript library for building user interfaces...</p>
  </AccordionItem>

  <AccordionItem title="What is Vue?">
    <p>Vue is a progressive framework...</p>
  </AccordionItem>

  <AccordionItem title="What is Angular?">
    <p>Angular is a complete framework...</p>
  </AccordionItem>
</Accordion>

{/* Or with multiple open: */}
<Accordion allowMultiple>
  {/* items */}
</Accordion>

{/* Or controlled: */}
<Accordion activeIndex={activeIndex} onActiveChange={setActiveIndex}>
  {/* items */}
</Accordion>
```

---

## 💻 Implementation Starter

```jsx
import { useState, createContext, useContext, useId } from 'react';

const AccordionContext = createContext();

export function Accordion({ children, allowMultiple = false }) {
  const [openItems, setOpenItems] = useState([]);

  function toggleItem(index) {
    if (allowMultiple) {
      setOpenItems(openItems.includes(index)
        ? openItems.filter(i => i !== index)
        : [...openItems, index]
      );
    } else {
      setOpenItems(openItems.includes(index) ? [] : [index]);
    }
  }

  const value = {
    openItems,
    toggleItem
  };

  return (
    <AccordionContext.Provider value={value}>
      <div className="accordion">
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ title, children, index }) {
  const { openItems, toggleItem } = useContext(AccordionContext);
  const id = useId();
  const isOpen = openItems.includes(index);

  return (
    <div className="accordion-item">
      <button
        className="accordion-header"
        onClick={() => toggleItem(index)}
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
        id={`header-${id}`}
      >
        {title}
        <span className="icon">{isOpen ? '▼' : '►'}</span>
      </button>

      <div
        id={`panel-${id}`}
        role="region"
        aria-labelledby={`header-${id}`}
        className={`accordion-content ${isOpen ? 'open' : 'closed'}`}
        hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
}
```

---

## 🎨 Styling

```css
.accordion-item {
  border: 1px solid #ddd;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  overflow: hidden;
}

.accordion-header {
  width: 100%;
  padding: 1rem;
  background: #f5f5f5;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s;
}

.accordion-header:hover {
  background: #e5e5e5;
}

.accordion-content {
  transition: max-height 0.3s ease, padding 0.3s ease;
  overflow: hidden;
}

.accordion-content.open {
  padding: 1rem;
  max-height: 500px;
}

.accordion-content.closed {
  max-height: 0;
  padding: 0 1rem;
}
```

---

## 🌟 Bonus Challenges

1. **Keyboard navigation:**
   - Arrow Up/Down to move between items
   - Enter/Space to toggle
   - Home/End to jump to first/last

2. **Icons:** Custom expand/collapse icons

3. **Smooth animations:** Proper height transitions

4. **Nested accordions:** Accordions inside accordion items

5. **Default open:** Allow specifying which items start open

6. **Disabled state:** Support disabled items

---

## 🧪 Testing

- [ ] Opens/closes on click
- [ ] Only one open (single mode)
- [ ] Multiple open (allowMultiple mode)
- [ ] Proper ARIA attributes
- [ ] Smooth animations
- [ ] Keyboard accessible

---

## 💡 Key Learnings

- Compound component patterns
- Context API for component communication
- Controlled vs uncontrolled components
- Accessible interactive components
- Advanced React patterns

**This pattern is used in every component library!** 🚀

