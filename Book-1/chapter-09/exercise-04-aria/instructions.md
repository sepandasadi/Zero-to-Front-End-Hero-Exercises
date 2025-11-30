# Exercise 4: Add ARIA Where Needed

**Difficulty**: ⭐⭐⭐ Advanced
**Time**: 30 minutes
**Concepts**: ARIA roles, states, properties, live regions

---

## 🎯 Goal

Add appropriate ARIA attributes to custom interactive components. You'll learn:
- When ARIA is actually needed
- How to use ARIA roles, states, and properties
- How to make dynamic content accessible
- How to create accessible custom widgets
- When NOT to use ARIA

---

## 📋 Instructions

### Step 1: Examine the Components

Open `starter/needs-aria.html` and find components that need ARIA:
- Custom tab interface
- Accordion/collapsible sections
- Live status notifications
- Alert messages
- Custom tooltip

### Step 2: Add Appropriate ARIA

**For tabs:**
- `role="tablist"`, `role="tab"`, `role="tabpanel"`
- `aria-selected`, `aria-controls`, `aria-labelledby`

**For accordion:**
- `aria-expanded` on toggle buttons
- `aria-controls` to link button to content
- `aria-labelledby` on panels

**For live regions:**
- `aria-live="polite"` for status updates
- `aria-live="assertive"` for urgent alerts
- `role="status"` or `role="alert"`

**For tooltips:**
- `aria-describedby` to associate tooltip with trigger

### Step 3: Test with Screen Reader

**Critical**: Test with an actual screen reader!
- Mac: VoiceOver (Cmd+F5)
- Windows: NVDA (free download)

Navigate through components and verify announcements.

---

## ✅ Acceptance Criteria

Your ARIA-enhanced version should:
- [ ] Tabs announce selected state and content
- [ ] Accordion buttons announce expanded/collapsed state
- [ ] Live regions announce updates automatically
- [ ] Alerts announced immediately
- [ ] Tooltips associated with their triggers
- [ ] All custom widgets keyboard accessible
- [ ] Pass screen reader test
- [ ] No unnecessary ARIA (semantic HTML used where possible)

---

## 🧪 Testing Checklist

**Screen Reader Test (REQUIRED):**

1. **Tabs**: Do they announce "selected" state and tab content?
2. **Accordion**: Does it announce "expanded" or "collapsed"?
3. **Live Regions**: Do status updates get announced automatically?
4. **Alerts**: Are urgent messages announced immediately?
5. **Tooltips**: Is tooltip content announced when hovering/focusing?

---

## 💡 Hints

**ARIA Patterns:**

```html
<!-- Tabs pattern -->
<div role="tablist" aria-label="Content sections">
  <button role="tab" aria-selected="true" aria-controls="panel1" id="tab1">
    Tab 1
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel2" id="tab2">
    Tab 2
  </button>
</div>
<div role="tabpanel" id="panel1" aria-labelledby="tab1">
  Panel 1 content
</div>

<!-- Accordion pattern -->
<button aria-expanded="false" aria-controls="content1">
  Section 1
</button>
<div id="content1" hidden>
  Content here
</div>

<!-- Live region -->
<div aria-live="polite" role="status">
  <!-- Dynamically updated content -->
</div>

<!-- Alert -->
<div role="alert">
  Error: Something went wrong!
</div>

<!-- Tooltip -->
<button aria-describedby="tooltip1">
  Help
</button>
<div id="tooltip1" role="tooltip">
  This is helpful information
</div>
```

---

## 📚 Resources

- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [MDN: ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [WebAIM: Using ARIA](https://webaim.org/techniques/aria/)

---

## 🚀 Next Steps

Once you've added ARIA and passed screen reader testing:
1. Compare with `solution/needs-aria.html`
2. Move on to Exercise 5: Screen Reader Test

You're becoming an accessibility expert! 🌟

