# Exercise 4: Component with BEM - Hints

## BEM Methodology Quick Reference

**BEM = Block Element Modifier**

- **Block:** Independent component (`.card`)
- **Element:** Part of a block (`.card__title`)
- **Modifier:** Variation of block/element (`.card--featured`)

### Naming Convention

```
.block { }
.block__element { }
.block--modifier { }
.block__element--modifier { }
```

---

## Sass Nesting with BEM

**Use `&` (ampersand) for BEM nesting:**

```scss
.card {
  padding: 1rem;

  // Element
  &__title {
    font-size: 1.5rem;
  }

  &__description {
    color: gray;
  }

  // Modifier
  &--featured {
    border: 2px solid blue;
  }
}
```

**Compiles to:**
```css
.card { padding: 1rem; }
.card__title { font-size: 1.5rem; }
.card__description { color: gray; }
.card--featured { border: 2px solid blue; }
```

---

## Best Practices

1. **Keep nesting shallow** (max 2-3 levels)
2. **One block per component**
3. **Elements belong to their block**
4. **Modifiers change appearance, not structure**
5. **Avoid nesting blocks inside blocks**

**Good:**
```scss
.card {
  &__header { }
  &__body { }
  &--compact { }
}
```

**Bad:**
```scss
.card {
  .card-header { // Not BEM!
    .title { // Too deep!
      span { // Way too deep!
      }
    }
  }
}
```

---

## Common Patterns

### Pattern 1: Element with Modifier

```scss
.button {
  &__icon {
    margin-right: 0.5rem;

    &--large {
      font-size: 1.5rem;
    }
  }
}
```

### Pattern 2: Multiple Modifiers

```scss
.card {
  &--featured { border-color: blue; }
  &--compact { padding: 0.5rem; }
  &--dark { background: black; }
}
```

### Pattern 3: Combined Modifiers

```html
<div class="card card--featured card--dark">
  <!-- Can combine modifiers! -->
</div>
```

---

**Remember:** BEM prevents naming collisions and makes CSS predictable!

