# Exercise 3: Accessible Modal Dialog

**Difficulty:** ⭐⭐⭐ Advanced
**Time Estimate:** 2-3 hours

## 🎯 Goal

Build an accessible modal dialog from scratch with focus management, keyboard support, and proper ARIA.

## 📝 Tasks

1. Implement `role="dialog"` and `aria-modal="true"`
2. Add `aria-labelledby` to reference title
3. Implement focus trap (Tab cycles within modal)
4. Return focus to trigger button on close
5. Close on Escape key
6. Prevent body scroll when open
7. Ensure proper focus indicators

## ✅ Success Criteria

- ✅ Focus trapped inside modal
- ✅ Focus returns to trigger on close
- ✅ Escape key closes modal
- ✅ Screen reader announces "Dialog: [title]"
- ✅ Full keyboard navigation
- ✅ Zero axe violations
- ✅ Passes screen reader testing

## 📚 Resources

- [ARIA: Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [React Focus Trap](https://github.com/focus-trap/focus-trap-react)

