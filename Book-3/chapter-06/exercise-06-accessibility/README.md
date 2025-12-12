# Exercise 6: Accessibility Audit & Fix

## Learning Objectives

By the end of this exercise, you will:

- ✅ Identify common accessibility issues in customized component libraries
- ✅ Fix accessibility problems without removing customizations
- ✅ Test with keyboard navigation and screen readers
- ✅ Understand WCAG compliance
- ✅ Preserve accessibility while customizing

**Time:** 60-90 minutes
**Difficulty:** Intermediate

---

## The Problem

**Customization often breaks accessibility.**

Common issues when customizing:
- ❌ Removing focus indicators
- ❌ Insufficient color contrast
- ❌ Breaking keyboard navigation
- ❌ Removing ARIA labels
- ❌ Custom components without accessibility

**Your mission:** Find and fix these issues!

---

## Scenario

You've inherited **"DataHub"**, a dashboard built with a component library. The previous developer heavily customized the UI, and it looks great... but it's broken for users with disabilities.

Your task: **Audit and fix all accessibility issues** while preserving the custom design.

---

## The Broken App

### **Issues Present (find them!):**

1. **Focus Indicators**
   - Buttons have `outline: none`
   - No visible focus state
   - Tab navigation is confusing

2. **Color Contrast**
   - Light gray text on white background
   - Colored buttons don't meet WCAG AA
   - Link colors too light

3. **Keyboard Navigation**
   - Modal can't be closed with Escape
   - Dropdown requires mouse
   - Form can't be submitted with Enter

4. **ARIA Labels**
   - Icon buttons have no labels
   - Form errors not announced
   - Loading states not announced

5. **Semantic HTML**
   - Divs instead of buttons
   - No heading hierarchy
   - Missing landmarks

6. **Screen Reader Issues**
   - Images without alt text
   - Form labels not associated
   - Status messages not announced

---

## Part 1: Audit Process (20 min)

### **Tools to Use:**

1. **Browser DevTools**
   - Lighthouse accessibility audit
   - Accessibility panel

2. **Keyboard Only**
   - Unplug your mouse!
   - Try to complete all tasks

3. **Screen Reader**
   - Mac: VoiceOver (Cmd+F5)
   - Windows: NVDA (free)
   - Test critical flows

4. **Color Contrast Checker**
   - [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
   - Check all text/background combinations

---

### **Audit Checklist:**

Create a document with these findings:

```markdown
## Accessibility Audit Report

### Critical Issues (WCAG A - Must Fix)
- [ ] Issue 1: Description, Location, Severity
- [ ] Issue 2: ...

### Important Issues (WCAG AA - Should Fix)
- [ ] Issue 1: ...

### Enhancement Issues (WCAG AAA - Nice to Have)
- [ ] Issue 1: ...

### Testing Notes
- Keyboard navigation: [Pass/Fail] - Notes
- Screen reader: [Pass/Fail] - Notes
- Color contrast: [Pass/Fail] - Notes
```

---

## Part 2: Fix Focus Indicators (15 min)

### **Problem:**
```css
/* BAD - removes all focus indicators */
* {
  outline: none !important;
}

button:focus {
  outline: none;
}
```

### **Solution:**
```tsx
// MUI
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: '3px solid #FF6B9D',
            outlineOffset: '2px',
          },
        },
      },
    },
  },
})

// Chakra
const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        _focusVisible: {
          boxShadow: '0 0 0 3px rgba(255, 107, 157, 0.6)',
          outline: 'none',
        },
      },
    },
  },
})
```

**Key principle:** Use `:focus-visible` (not `:focus`) to show indicators only for keyboard navigation.

---

## Part 3: Fix Color Contrast (15 min)

### **Problem:**
```tsx
// BAD - 2.1:1 contrast ratio (needs 4.5:1)
<Text color="gray.400" fontSize="sm">
  This text is too light
</Text>
```

### **Solution:**
```tsx
// Calculate contrast ratio
// Foreground: #A0AEC0 (gray.400)
// Background: #FFFFFF (white)
// Ratio: 2.32:1 ❌ Fails WCAG AA

// FIX: Use darker color
<Text color="gray.700" fontSize="sm">
  This text has sufficient contrast
</Text>
// Ratio: 7.54:1 ✅ Passes WCAG AA
```

**Tool:** Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) for every color combination.

**WCAG Requirements:**
- **AA (minimum):** 4.5:1 for normal text, 3:1 for large text
- **AAA (enhanced):** 7:1 for normal text, 4.5:1 for large text

---

## Part 4: Fix Keyboard Navigation (15 min)

### **Problem 1: Modal**
```tsx
// BAD - modal can't be closed with Escape
<Dialog open={open} onClose={handleClose}>
  {/* content */}
</Dialog>

// User must click X button (no keyboard option)
```

### **Solution:**
```tsx
// GOOD - supports Escape key
<Dialog
  open={open}
  onClose={handleClose}
  onKeyDown={(e) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }}
>
  {/* content */}
</Dialog>

// Even better - most library modals support this by default!
// Just ensure you're not blocking it
```

### **Problem 2: Custom Dropdown**
```tsx
// BAD - requires mouse click
<div onClick={handleToggle}>
  <div>Select an option</div>
</div>
```

### **Solution:**
```tsx
// GOOD - keyboard accessible
<button
  onClick={handleToggle}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleToggle()
    }
  }}
  aria-haspopup="listbox"
  aria-expanded={isOpen}
>
  Select an option
</button>

// Better - use library component
<Select>
  {/* Built-in keyboard support */}
</Select>
```

---

## Part 5: Fix ARIA Labels (15 min)

### **Problem 1: Icon Buttons**
```tsx
// BAD - screen reader says "button" with no context
<IconButton onClick={handleDelete}>
  <DeleteIcon />
</IconButton>
```

### **Solution:**
```tsx
// GOOD - screen reader announces "Delete button"
<IconButton
  onClick={handleDelete}
  aria-label="Delete item"
>
  <DeleteIcon />
</IconButton>
```

### **Problem 2: Form Errors**
```tsx
// BAD - error message not announced
<TextField
  label="Email"
  value={email}
  error={!!emailError}
/>
{emailError && <span>{emailError}</span>}
```

### **Solution:**
```tsx
// GOOD - error linked and announced
<TextField
  label="Email"
  value={email}
  error={!!emailError}
  helperText={emailError}
  inputProps={{
    'aria-describedby': emailError ? 'email-error' : undefined,
    'aria-invalid': !!emailError,
  }}
/>
```

### **Problem 3: Loading States**
```tsx
// BAD - loading state not announced
{isLoading && <Spinner />}
```

### **Solution:**
```tsx
// GOOD - loading announced to screen readers
{isLoading && (
  <Box role="status" aria-live="polite">
    <Spinner />
    <VisuallyHidden>Loading...</VisuallyHidden>
  </Box>
)}
```

---

## Part 6: Test Everything (10 min)

### **Keyboard Navigation Test:**
1. Tab through entire app
2. Activate all buttons with Enter/Space
3. Close modals with Escape
4. Submit forms with Enter
5. Navigate menus with arrow keys

### **Screen Reader Test:**
1. Turn on screen reader
2. Navigate through page
3. Fill out a form
4. Trigger an error
5. Complete a critical action

### **Lighthouse Audit:**
```bash
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select "Accessibility"
4. Run audit
5. Fix all issues
6. Re-run until 100 score
```

---

## Deliverables

- [ ] Complete audit report documenting all issues
- [ ] All critical issues fixed (WCAG A)
- [ ] All important issues fixed (WCAG AA)
- [ ] App is fully keyboard navigable
- [ ] All color contrast meets WCAG AA
- [ ] All interactive elements have focus indicators
- [ ] All icon buttons have aria-labels
- [ ] Form errors are announced
- [ ] Lighthouse accessibility score: 90+
- [ ] Documentation of fixes made

---

## Success Criteria

**Before fixes:**
- ❌ Lighthouse score: < 60
- ❌ Keyboard navigation broken
- ❌ Screen reader unusable
- ❌ Color contrast fails

**After fixes:**
- ✅ Lighthouse score: 90-100
- ✅ Full keyboard navigation
- ✅ Screen reader friendly
- ✅ WCAG AA compliant
- ✅ Custom styles preserved!

---

## Common Pitfalls

### **Pitfall 1: Fighting Browser Defaults**
```css
/* DON'T */
* { outline: none; }

/* DO */
button:focus-visible {
  outline: 2px solid blue;
}
```

### **Pitfall 2: Div Buttons**
```tsx
/* DON'T */
<div onClick={handleClick}>Click me</div>

/* DO */
<button onClick={handleClick}>Click me</button>
```

### **Pitfall 3: Color Only**
```tsx
/* DON'T - relies only on color */
<Text color="red">Error message</Text>

/* DO - includes icon and text */
<Box>
  <ErrorIcon color="red" />
  <Text color="red">Error: Invalid input</Text>
</Box>
```

---

## WCAG Quick Reference

### **Level A (Must Have):**
- ✅ Keyboard accessible
- ✅ Alt text for images
- ✅ Proper heading hierarchy
- ✅ Form labels

### **Level AA (Should Have):**
- ✅ 4.5:1 contrast ratio
- ✅ Focus indicators
- ✅ ARIA labels
- ✅ Error identification

### **Level AAA (Nice to Have):**
- ✅ 7:1 contrast ratio
- ✅ No time limits
- ✅ Multiple ways to navigate

---

## Key Learnings

- ✅ How to audit for accessibility
- ✅ Common issues when customizing
- ✅ How to fix issues without removing customization
- ✅ Using screen readers for testing
- ✅ WCAG compliance requirements
- ✅ Accessible component patterns

**Accessibility is not optional - it's essential!** ♿✨

---

## Resources

- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [Deque Axe DevTools](https://www.deque.com/axe/devtools/)

---

**Make the web accessible for everyone!** 🌍♿

