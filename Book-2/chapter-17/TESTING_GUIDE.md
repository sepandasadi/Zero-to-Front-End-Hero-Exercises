# Accessibility Testing Guide

This guide will help you test the accessibility of your implementations for Chapter 17 exercises.

---

## 🛠️ Testing Tools Setup

### Browser Extensions

1. **axe DevTools** (Chrome/Firefox)
   - [Chrome](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/)

2. **WAVE** (Chrome/Firefox)
   - [Chrome](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/wave-accessibility-tool/)

3. **Lighthouse** (Built into Chrome DevTools)
   - Press F12 → Lighthouse tab

### Screen Readers

- **Windows:** [NVDA](https://www.nvaccess.org/download/) (Free)
- **macOS:** VoiceOver (Built-in, press Cmd+F5)
- **Linux:** Orca (Usually pre-installed)

---

## ✅ Exercise 1: Semantic HTML Audit

### Automated Testing

1. **Open the solution in Chrome**
2. **Run Lighthouse:**
   - F12 → Lighthouse tab
   - Select "Accessibility"
   - Click "Analyze page load"
   - **Target:** 100/100

3. **Run axe DevTools:**
   - F12 → axe DevTools tab
   - Click "Scan All of My Page"
   - **Target:** 0 violations

### Manual Testing

#### Keyboard Navigation
```
Test: Navigate with Tab key
✓ Skip link appears on first Tab
✓ All links and buttons are reachable
✓ Focus indicators are visible
✓ Tab order is logical (top to bottom, left to right)
✓ No keyboard traps
```

#### Heading Structure
```
Test: Use a heading navigation tool (axe DevTools → Headings)
✓ One h1 per page
✓ No skipped heading levels (h1 → h2 → h3, not h1 → h3)
✓ Headings describe content sections
```

#### Screen Reader Test (VoiceOver on Mac)
```bash
# Enable VoiceOver
Cmd + F5

# Navigate landmarks
Ctrl + Option + U → Landmarks

Expected announcements:
✓ "header, navigation"
✓ "navigation, Main navigation"
✓ "main"
✓ "complementary, Sidebar"
✓ "contentinfo, Site footer"
```

### Success Criteria Checklist
- [ ] Lighthouse Accessibility: 100/100
- [ ] axe DevTools: 0 violations
- [ ] All landmarks present (header, nav, main, aside, footer)
- [ ] Proper heading hierarchy
- [ ] Skip link functional
- [ ] All interactive elements are buttons or links

---

## ✅ Exercise 2: Accessible Form

### Automated Testing

Same as Exercise 1, plus:

#### Form Label Validation
```
Test: Check all inputs have labels
1. Open axe DevTools
2. Look for "Form elements must have labels"
✓ Should be 0 violations
```

### Manual Testing

#### Keyboard Navigation
```
Test: Fill form using keyboard only
✓ Tab moves to next field
✓ Shift+Tab moves to previous field
✓ Enter submits form
✓ Space toggles checkboxes
✓ Arrow keys navigate between radio buttons
```

#### Error Handling
```
Test: Submit form with empty required fields
✓ Error messages appear
✓ aria-invalid="true" on invalid fields
✓ Error messages have role="alert"
✓ Errors announced by screen reader
✓ Focus moves to first error
```

#### Screen Reader Test
```bash
# Test with VoiceOver
1. Focus on email input
   Expected: "Email, required, edit text"

2. Navigate to helper text
   Expected: "We'll never share your email"

3. Trigger validation error
   Expected: "Invalid, Please enter a valid email address"
```

### Success Criteria Checklist
- [ ] All inputs have associated labels
- [ ] Required fields marked with aria-required
- [ ] Error messages use role="alert"
- [ ] aria-invalid updates based on validation
- [ ] aria-describedby links to helper text
- [ ] Focus management between steps
- [ ] Screen reader announcements work

---

## ✅ Exercise 3: Accessible Modal Dialog

### Automated Testing

Run standard Lighthouse and axe tests, plus:

#### ARIA Validation
```
Check for:
✓ role="dialog" on modal
✓ aria-modal="true"
✓ aria-labelledby points to title
✓ aria-describedby points to description (if present)
```

### Manual Testing

#### Focus Management
```
Test: Open modal
✓ Focus moves into modal immediately
✓ Tab cycles within modal (focus trap)
✓ Shift+Tab cycles backward within modal
✓ Cannot tab outside modal

Test: Close modal
✓ Escape key closes modal
✓ Close button closes modal
✓ Click overlay closes modal
✓ Focus returns to trigger button
```

#### Body Scroll Prevention
```
Test: Open modal and try scrolling
✓ Background doesn't scroll when modal is open
✓ Background scrolls normally when modal is closed
```

#### Screen Reader Test
```bash
# Test with VoiceOver
1. Open modal
   Expected: "Dialog, Contact Us"

2. Navigate modal content
   Expected: All content inside modal is announced

3. Try navigating to background
   Expected: Cannot reach background content

4. Close modal
   Expected: Focus returns to trigger, "Open Contact Form, button"
```

### Success Criteria Checklist
- [ ] role="dialog" and aria-modal="true"
- [ ] Focus trapped inside modal
- [ ] Escape closes modal
- [ ] Focus returns to trigger on close
- [ ] Body scroll prevented
- [ ] All focusable elements reachable
- [ ] Screen reader announces as dialog

---

## ✅ Challenge: E-commerce Accessibility Audit

### Phase 1: Automated Testing (30 minutes)

#### Lighthouse Audit
```bash
1. Open starter.html in Chrome
2. F12 → Lighthouse
3. Run accessibility audit
4. Document score: ___/100
5. Note all issues found

6. Open solution.html
7. Run Lighthouse again
8. Document score: ___/100 (Target: 100)
```

#### axe DevTools Full Scan
```bash
1. F12 → axe DevTools
2. Click "Scan all of my page"
3. Document violations by severity:
   - Critical: ___
   - Serious: ___
   - Moderate: ___
   - Minor: ___

4. Export results (JSON)
5. Create remediation plan
```

#### WAVE Evaluation
```bash
1. Open WAVE extension
2. Note errors: ___
3. Note contrast errors: ___
4. Review structure (headings, landmarks)
```

### Phase 2: Keyboard Testing (45 minutes)

#### Navigation Test
```
Test: Navigate entire site with keyboard only
✓ Can reach all interactive elements
✓ Tab order is logical
✓ Focus indicators always visible
✓ No keyboard traps
✓ Skip links work
```

#### Cart Functionality
```
Test: Add items and checkout using keyboard only
✓ Can add items to cart
✓ Can open cart sidebar
✓ Can remove items
✓ Can navigate cart
✓ Escape closes cart
✓ Focus returns after closing
```

#### Modal Testing
```
Test: Open and interact with modal
✓ Modal opens on Enter/Space
✓ Focus trapped in modal
✓ Escape closes modal
✓ Can submit form with keyboard
```

#### Filter Testing
```
Test: Filter products
✓ Can activate filters with Enter/Space
✓ Active filter indicated
✓ Focus visible on all filters
```

### Phase 3: Screen Reader Testing (1 hour)

#### VoiceOver Testing (macOS)
```bash
# Start VoiceOver
Cmd + F5

Test 1: Page Structure
Ctrl + Option + U → Landmarks
✓ Header announced
✓ Navigation announced
✓ Main content announced
✓ Footer announced

Test 2: Product Cards
Navigate to product grid
✓ "Article" or "group" announced
✓ Product name announced as heading
✓ Price announced
✓ Rating announced with number (e.g., "Rated 5 out of 5 stars")
✓ Add to Cart button announced

Test 3: Cart
Open cart sidebar
✓ "Dialog" announced
✓ Cart title announced
✓ Cart items announced
✓ Total announced
✓ Can navigate all items

Test 4: Forms
Navigate to newsletter form
✓ Label announced before input
✓ Required status announced
✓ Helper text announced
✓ Error messages announced
```

#### NVDA Testing (Windows)
```
Similar tests as VoiceOver, using:
- Insert + F7 → Elements list
- H → Navigate headings
- B → Navigate buttons
- F → Navigate forms
```

### Phase 4: Color Contrast (30 minutes)

#### Automated Contrast Check
```bash
Using axe DevTools:
1. Look for "Elements must have sufficient color contrast"
2. Check each flagged element
3. Use color picker to get exact colors
4. Verify ratios:
   - Normal text: 4.5:1 minimum
   - Large text: 3:1 minimum
   - UI components: 3:1 minimum
```

#### Manual Contrast Testing
```
Test common combinations:
✓ Text on background
✓ Links on background
✓ Button text on button background
✓ Placeholder text
✓ Disabled state (informational only, not required)
```

### Phase 5: Verification (30 minutes)

After fixing all issues:

```bash
☐ Re-run Lighthouse → Target: 100/100
☐ Re-run axe DevTools → Target: 0 violations
☐ Re-run WAVE → Target: 0 errors
☐ Keyboard test all functionality
☐ Screen reader test critical paths
☐ Verify color contrast
☐ Document all changes made
```

---

## 📊 Audit Report Template

Use this checklist for your audit:

### Severity Definitions

- **Critical:** Blocks access for users with disabilities
- **Serious:** Significantly impacts users with disabilities
- **Moderate:** Some impact, workarounds may exist
- **Minor:** Minor inconvenience, doesn't block access

### Issue Template

```markdown
## Issue #[N]: [Title]

**Severity:** [Critical/Serious/Moderate/Minor]
**WCAG:** [e.g., 2.4.7 Focus Visible]
**Location:** [e.g., Product cards, line 123]

**Problem:**
[What's wrong]

**Impact:**
[How it affects users]

**Solution:**
[How to fix it]

**Code:**
```html
<!-- Before -->
<div onclick="...">Click me</div>

<!-- After -->
<button type="button" onclick="...">Click me</button>
```

---

## 🎯 Success Metrics

### Target Scores

| Tool | Target | Exercise 1 | Exercise 2 | Exercise 3 | Challenge |
|------|--------|------------|------------|------------|-----------|
| Lighthouse | 100 | ___ | ___ | ___ | ___ |
| axe Violations | 0 | ___ | ___ | ___ | ___ |
| WAVE Errors | 0 | ___ | ___ | ___ | ___ |

### WCAG 2.1 Level AA Compliance

- [ ] All Level A criteria met
- [ ] All Level AA criteria met
- [ ] No automated test failures
- [ ] Keyboard navigation fully functional
- [ ] Screen reader compatible
- [ ] Color contrast meets minimums

---

## 🆘 Common Issues and Fixes

### Issue: "Form elements must have labels"
```html
<!-- ❌ Bad -->
<input type="text" placeholder="Name">

<!-- ✅ Good -->
<label for="name">Name</label>
<input type="text" id="name" placeholder="Name">
```

### Issue: "Buttons must have discernible text"
```html
<!-- ❌ Bad -->
<button>×</button>

<!-- ✅ Good -->
<button aria-label="Close dialog">×</button>
```

### Issue: "Images must have alt text"
```html
<!-- ❌ Bad -->
<img src="product.jpg">

<!-- ✅ Good -->
<img src="product.jpg" alt="Laptop Pro - High performance laptop">

<!-- Decorative images -->
<img src="decoration.jpg" alt="" aria-hidden="true">
```

### Issue: "Insufficient color contrast"
```css
/* ❌ Bad - 2.5:1 ratio */
.text {
  color: #777;
  background: #fff;
}

/* ✅ Good - 4.6:1 ratio */
.text {
  color: #595959;
  background: #fff;
}
```

### Issue: "Interactive element not keyboard accessible"
```html
<!-- ❌ Bad -->
<div onclick="handleClick()">Click me</div>

<!-- ✅ Good -->
<button type="button" onclick="handleClick()">Click me</button>
```

---

## 📚 Resources

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

### Screen Readers
- [NVDA Download](https://www.nvaccess.org/download/)
- [VoiceOver User Guide](https://support.apple.com/guide/voiceover/welcome/mac)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) (Commercial)

### Guidelines
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Articles](https://webaim.org/articles/)

### Checklists
- [WebAIM WCAG 2 Checklist](https://webaim.org/standards/wcag/checklist)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

---

## 💡 Pro Tips

1. **Test early and often** - Don't wait until the end to test accessibility
2. **Use real screen readers** - Browser extensions can't replicate the full experience
3. **Test with keyboard only** - Unplug your mouse for 30 minutes
4. **Check mobile** - Test with mobile screen readers (VoiceOver on iOS, TalkBack on Android)
5. **Get real user feedback** - Nothing beats testing with actual users who have disabilities

---

## ✅ Final Checklist

Before submitting your work:

- [ ] All automated tests pass (Lighthouse, axe, WAVE)
- [ ] Full keyboard navigation works
- [ ] Screen reader testing completed
- [ ] Color contrast verified
- [ ] Focus indicators visible
- [ ] No keyboard traps
- [ ] Error messages accessible
- [ ] Forms properly labeled
- [ ] Headings logical
- [ ] Landmarks present
- [ ] ARIA used correctly (not over-used)
- [ ] Documentation complete

**Remember:** Accessibility is not optional—it's essential! 🌍♿

