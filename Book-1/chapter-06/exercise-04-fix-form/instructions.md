# Exercise 4: Fix Broken Forms

## 🎯 Objective

Debug and fix a broken survey form that has multiple accessibility and validation issues. This exercise will help you:
- Identify common form mistakes
- Fix accessibility issues
- Add proper validation
- Improve user experience

## 🐛 The Problem

You've been given a survey form that was quickly thrown together. It works... sort of. But it has numerous issues that make it hard to use and inaccessible to many users.

## 📋 Issues to Fix

The broken form has at least **10 issues**. Can you find and fix them all?

**Hints about what's wrong:**

### Accessibility Issues:
1. Missing labels (some inputs have no labels at all!)
2. Labels not properly connected to inputs
3. No fieldsets to group related fields
4. Missing form legends
5. No indication of required fields

### Validation Issues:
6. Missing validation attributes (required fields not marked)
7. Wrong input types (using text instead of email, number, etc.)
8. No placeholder hints for users
9. Missing patterns for formatted inputs (like phone numbers)

### Structure Issues:
10. Poor semantic structure
11. Missing autocomplete attributes
12. No submit button type specified

## ✅ Your Task

1. **Open the broken file:** `broken/survey.html`
2. **Identify all issues:** Use browser DevTools to help
3. **Fix each issue:** Make systematic improvements
4. **Test thoroughly:** Ensure accessibility and validation work
5. **Compare with solution:** Check `solution/survey.html` when done

## 💡 Testing Tips

**To find accessibility issues:**
- Try using Tab to navigate (does it work smoothly?)
- Try clicking on label text (does it focus the input?)
- Look for unlabeled inputs
- Check if fieldsets group related content

**To find validation issues:**
- Try submitting without filling fields (does it prevent submission?)
- Enter invalid email format (does it show an error?)
- Enter letters in number fields (does it validate?)

## ✅ Checklist

Mark off each category as you fix it:

- [ ] All inputs have proper labels
- [ ] Labels are connected to inputs (for/id match)
- [ ] Fieldsets group related fields
- [ ] Legends describe each fieldset
- [ ] Required fields are marked with `required` attribute
- [ ] Correct input types used (email, tel, number, date, etc.)
- [ ] Validation patterns added where needed
- [ ] Helpful placeholder text added
- [ ] Autocomplete attributes added
- [ ] Submit button has proper type
- [ ] Form is keyboard accessible
- [ ] Required fields visually indicated

## 🚀 Bonus Challenges

After fixing all issues:

1. **Add more validation:** Min/max values, character limits
2. **Improve visual design:** Add CSS styling
3. **Add help text:** Explain validation requirements
4. **Create a "fixed issues" list:** Document what you changed

## 📁 Files

- **Broken:** `broken/survey.html` (intentionally broken - fix this!)
- **Solution:** `solution/survey.html` (correct implementation)

**Ready to debug? Open the broken file and start fixing!** 🔧

