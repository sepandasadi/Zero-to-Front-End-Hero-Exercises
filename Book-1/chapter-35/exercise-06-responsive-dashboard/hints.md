# Exercise 6 Hints: Responsive Dashboard

## CSS Grid Layout

```css
.dashboard {
  display: grid;
  grid-template-areas:
    "header"
    "main"
    "sidebar";
  gap: 1rem;
}

@media (min-width: 1024px) {
  .dashboard {
    grid-template-areas:
      "sidebar header header"
      "sidebar main main";
    grid-template-columns: 250px 1fr;
  }
}
```

## Collapsible Sidebar

```javascript
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');

sidebarToggle.addEventListener('click', () => {
  const isExpanded = sidebar.getAttribute('aria-expanded') === 'true';
  sidebar.setAttribute('aria-expanded', !isExpanded);
});
```

## Landmarks

```html
<header role="banner">
  <nav aria-label="Main navigation"></nav>
</header>

<aside aria-label="Sidebar">
  <!-- Sidebar content -->
</aside>

<main role="main">
  <!-- Main content -->
</main>
```

---

**Complex layouts need careful planning!** 📊

