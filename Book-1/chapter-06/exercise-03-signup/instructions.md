# Exercise 3: User Registration Form

## 🎯 Objective

Build a complete user registration (sign-up) form with multiple sections, advanced validation, and professional UX. This is a more complex exercise that combines everything you've learned!

## 📋 Requirements

Create a sign-up form with the following sections:

### Section 1: Account Information
- **Username** (required, text, 3-20 characters, pattern: letters, numbers, underscores only)
- **Email** (required, email validation)
- **Password** (required, password type, minimum 8 characters)
- **Confirm Password** (required, password type, minimum 8 characters)
  - Add help text: "Password must be at least 8 characters"

### Section 2: Personal Information
- **First Name** (required, text)
- **Last Name** (required, text)
- **Date of Birth** (required, date input, must be 18+ years old)
- **Gender** (optional, radio buttons):
  - Male
  - Female
  - Other
  - Prefer not to say

### Section 3: Address (Optional)
- **Street Address** (text)
- **City** (text)
- **State/Province** (dropdown with at least 5 options)
- **ZIP/Postal Code** (text, pattern for 5 digits or format: 12345-6789)
- **Country** (dropdown with at least 5 countries)

### Section 4: Preferences
- **Programming Interests** (checkboxes, multiple allowed):
  - HTML/CSS
  - JavaScript
  - Python
  - Java
  - Other
- **Experience Level** (radio buttons, required):
  - Complete Beginner
  - Some Experience
  - Intermediate
  - Advanced
- **Newsletter Subscription** (checkbox, checked by default)

### Section 5: Terms & Conditions
- **Agree to Terms** (checkbox, required)
  - Link text to actual terms page
- **Agree to Privacy Policy** (checkbox, required)

### Submit
- Submit button: "Create My Account"
- Clear button: "Reset Form"

## ✅ Form Requirements

- ✅ Use semantic HTML with proper fieldsets
- ✅ All inputs must have connected labels
- ✅ Use appropriate input types
- ✅ Implement all validation requirements
- ✅ Add helpful placeholder text
- ✅ Use autocomplete attributes where appropriate
- ✅ Indicate required vs optional fields clearly
- ✅ Add a note about password requirements
- ✅ Professional styling (even basic CSS helps!)

## 💡 Tips

1. **Start with structure:** Outline all fieldsets first
2. **One section at a time:** Complete account info, then personal, etc.
3. **Test as you go:** Open in browser after each section
4. **Think about UX:** Is it clear what's required? Are error messages helpful?
5. **Accessibility matters:** Every input needs a label!

## ✅ Testing Checklist

Thoroughly test your form:

- [ ] All required fields prevent empty submission
- [ ] Email field validates email format
- [ ] Password field enforces 8+ character minimum
- [ ] Username pattern works (try entering special characters - should fail)
- [ ] Date field opens a date picker
- [ ] ZIP code pattern validates format
- [ ] Only one radio button selected per group
- [ ] Multiple checkboxes can be selected
- [ ] Terms checkboxes are required for submission
- [ ] Tab navigation works through entire form
- [ ] All labels are clickable

## 🚀 Bonus Challenges

1. **Add password strength indicator:** Weak, Medium, Strong
2. **Add "Show Password" toggle:** Checkbox to reveal password
3. **Add profile picture upload:** File input accepting images only
4. **Add bio/about section:** Textarea with character limit
5. **Add referral source:** "How did you hear about us?" dropdown
6. **Make it responsive:** Add mobile-friendly styling

## 📁 Files

- **Starter:** `starter/signup.html` (basic skeleton)
- **Solution:** `solution/signup.html` (complete implementation)

**This is a comprehensive exercise - take your time and build something professional!** 💪

