# Exercise 06: Accessibility Audit & Fix - Getting Started

## Your Task

Audit a **broken component library app** for accessibility issues, then fix them while preserving the custom design.

## Scenario

You've inherited "DataHub", a customized dashboard. It looks great but has **broken accessibility**. Your job: find and fix all issues!

## Step-by-Step Instructions

### Phase 1: Setup Broken App (15 min)

Create a dashboard with intentional accessibility problems:

```bash
npm create vite@latest datahub-audit -- --template react-ts
cd datahub-audit
npm install
npm install @mui/material @emotion/react @emotion/styled
# OR your preferred library
```

Build a dashboard with these **intentional problems**:

1. **Remove focus indicators:**
```css
* {
  outline: none !important;
}
```

2. **Low contrast text:**
```typescript
<Typography sx={{ color: '#a0aec0' }}>
  This text is too light
</Typography>
```

3. **Icon buttons without labels:**
```typescript
<IconButton onClick={handleDelete}>
  <DeleteIcon />
</IconButton>
```

4. **Divs as buttons:**
```typescript
<div onClick={handleClick}>Click me</div>
```

5. **Form errors not announced:**
```typescript
{error && <span style={{color: 'red'}}>{error}</span>}
```

6. **Modal without Escape key:**
```typescript
<Dialog open={open} onClose={handleClose}>
  {/* No keyboard close */}
</Dialog>
```

### Phase 2: Audit Process (30 min)

Use these tools to find issues:

**1. Lighthouse Audit**
```
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select "Accessibility" only
4. Run audit
5. Document all failures
```

**2. Keyboard-Only Test**
```
1. Unplug your mouse (seriously!)
2. Use only Tab, Enter, Space, Escape
3. Try to:
   - Navigate entire app
   - Submit form
   - Close modal
   - Activate all buttons
4. Note where you get stuck
```

**3. Screen Reader Test**
```
Mac: Cmd+F5 (VoiceOver)
Windows: Download NVDA (free)

Navigate the app and note:
- What's announced?
- What's NOT announced?
- Is it confusing?
```

**4. Color Contrast Check**
```
Use: https://webaim.org/resources/contrastchecker/

Test every text/background combination:
- Body text
- Headings
- Button text
- Links
- Disabled states
```

### Phase 3: Create Audit Report (30 min)

Create `AUDIT_REPORT.md`:

```markdown
# Accessibility Audit Report - DataHub

## Critical Issues (WCAG A - Must Fix)

### 1. No Focus Indicators
**Location:** All interactive elements
**Issue:** `outline: none` removes all focus indicators
**Impact:** Keyboard users can't see where they are
**WCAG:** 2.4.7 Focus Visible (Level AA)
**Fix Priority:** CRITICAL

### 2. Icon Buttons Missing Labels
**Location:** Header actions, table actions
**Issue:** IconButton has no aria-label
**Impact:** Screen readers announce only "button"
**WCAG:** 4.1.2 Name, Role, Value (Level A)
**Fix Priority:** CRITICAL

[Continue for all issues...]

## Important Issues (WCAG AA - Should Fix)

[Continue...]

## Testing Results

- **Lighthouse Score:** 45/100
- **Keyboard Navigation:** FAIL - can't close modal
- **Screen Reader:** FAIL - missing labels everywhere
- **Color Contrast:** FAIL - 12 instances below 4.5:1

## Estimated Fix Time: 2-3 hours
```

### Phase 4: Fix Issues (60-90 min)

Fix each issue systematically:

**Fix 1: Focus Indicators**
```typescript
// REMOVE:
* { outline: none !important; }

// ADD to theme:
components: {
  MuiButton: {
    styleOverrides: {
      root: {
        '&:focus-visible': {
          outline: '3px solid #6366f1',
          outlineOffset: '2px',
        },
      },
    },
  },
}
```

**Fix 2: Color Contrast**
```typescript
// BEFORE (2.1:1 ratio - FAIL)
<Text color="gray.400">This text</Text>

// AFTER (7.5:1 ratio - PASS)
<Text color="gray.700">This text</Text>

// Test every change at:
// https://webaim.org/resources/contrastchecker/
```

**Fix 3: Icon Button Labels**
```typescript
// BEFORE:
<IconButton onClick={handleDelete}>
  <DeleteIcon />
</IconButton>

// AFTER:
<IconButton
  onClick={handleDelete}
  aria-label="Delete item"
>
  <DeleteIcon />
</IconButton>
```

**Fix 4: Form Error Announcements**
```typescript
// BEFORE:
{error && <span className="error">{error}</span>}

// AFTER:
<TextField
  error={!!error}
  helperText={error}
  inputProps={{
    'aria-describedby': error ? 'email-error' : undefined,
    'aria-invalid': !!error,
  }}
/>
```

**Fix 5: Modal Keyboard Escape**
```typescript
// BEFORE:
<Dialog open={open} onClose={handleClose}>

// AFTER:
<Dialog
  open={open}
  onClose={handleClose}
  onKeyDown={(e) => {
    if (e.key === 'Escape') handleClose()
  }}
>
```

**Fix 6: Semantic HTML**
```typescript
// BEFORE:
<div onClick={handleClick}>Click me</div>

// AFTER:
<button onClick={handleClick}>Click me</button>
```

**Fix 7: Loading State Announcements**
```typescript
// BEFORE:
{loading && <Spinner />}

// AFTER:
{loading && (
  <Box role="status" aria-live="polite">
    <Spinner />
    <VisuallyHidden>Loading...</VisuallyHidden>
  </Box>
)}
```

### Phase 5: Re-Test (20 min)

Run all tests again:

- [ ] Lighthouse score 90+
- [ ] Full keyboard navigation works
- [ ] Screen reader announces everything correctly
- [ ] All contrast ratios meet WCAG AA (4.5:1)
- [ ] No console warnings

### Phase 6: Document Fixes (15 min)

Create `FIXES_APPLIED.md`:

```markdown
# Accessibility Fixes Applied

## Summary
- Issues found: 15
- Issues fixed: 15
- Lighthouse score: 45 → 98
- Time taken: 2.5 hours

## Fixes by Category

### Focus Management
1. Removed global `outline: none`
2. Added `:focus-visible` styles to all interactive elements
3. Ensured tab order is logical

### Color Contrast
1. Changed gray.400 → gray.700 (12 instances)
2. Updated disabled button contrast
3. Fixed link colors

[Continue...]

## Before/After Comparison

| Metric | Before | After |
|--------|--------|-------|
| Lighthouse | 45 | 98 |
| Keyboard Nav | Broken | Working |
| Screen Reader | Unusable | Fully functional |
| Contrast Fails | 12 | 0 |
```

## Requirements Checklist

- [ ] Audit report created (15+ issues documented)
- [ ] All critical issues fixed
- [ ] All important issues fixed
- [ ] Lighthouse score 90+
- [ ] Full keyboard navigation works
- [ ] Screen reader tested and working
- [ ] All contrast ratios meet WCAG AA
- [ ] Fixes documented
- [ ] Custom design preserved

## Common Issues to Look For

**Focus Management:**
- [ ] Removed outlines
- [ ] Invisible focus states
- [ ] Wrong tab order

**Color Contrast:**
- [ ] Light gray text
- [ ] Low contrast buttons
- [ ] Disabled state contrast

**ARIA:**
- [ ] Missing aria-labels
- [ ] Wrong ARIA roles
- [ ] No live regions

**Semantic HTML:**
- [ ] Div buttons
- [ ] Missing headings
- [ ] No landmarks

**Keyboard:**
- [ ] Can't close modals
- [ ] Can't submit forms
- [ ] Can't activate dropdowns

## Success Criteria

Your fixed app should:
- ✅ Score 90+ on Lighthouse accessibility
- ✅ Be fully keyboard navigable
- ✅ Announce everything correctly to screen readers
- ✅ Meet WCAG AA color contrast (4.5:1)
- ✅ Maintain custom design (no visual regression)

## Time Estimate

- Build broken app: 30 min
- Audit: 30 min
- Fix issues: 90 min
- Re-test: 20 min
- Document: 15 min
- **Total:** 3 hours

## Need Help?

Check the exercise README for:
- Complete audit checklist
- Fix patterns for each issue type
- WCAG guidelines quick reference
- Testing tools and techniques

## Resources

- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [A11y Project](https://www.a11yproject.com/)

Good luck fixing accessibility! ♿✨

