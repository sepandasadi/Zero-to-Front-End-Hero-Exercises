# Exercise 2: Contact Form

## 🎯 Objective

Build a professional contact form with proper validation and accessibility. This exercise will help you practice:
- Creating forms with various input types
- Connecting labels to inputs
- Using validation attributes
- Organizing fields with fieldsets
- Following form best practices

## 📋 Requirements

Create a contact form that includes:

**Personal Information:**
- Full Name (required, text input)
- Email Address (required, email input with validation)
- Phone Number (optional, tel input with pattern for format xxx-xxx-xxxx)

**Message Details:**
- Subject dropdown (required) with options:
  - "General Inquiry"
  - "Technical Support"
  - "Partnership Opportunity"
  - "Feedback"
- Message textarea (required, min 10 characters, max 500 characters)

**Preferences:**
- Best time to contact (radio buttons, required):
  - Morning (9 AM - 12 PM)
  - Afternoon (12 PM - 5 PM)
  - Evening (5 PM - 8 PM)
- Newsletter signup checkbox (optional, checked by default)

**Submit:**
- Submit button with text "Send Message"
- Clear/Reset button with text "Clear Form"

## ✅ Form Requirements

Your form must have:
- ✅ `action` attribute (use `"#"` for testing)
- ✅ `method="post"` attribute
- ✅ Proper fieldsets with legends for each section
- ✅ All inputs connected to labels
- ✅ Validation attributes (`required`, `minlength`, `maxlength`, `pattern`)
- ✅ Helpful placeholders
- ✅ Autocomplete attributes where appropriate

## 💡 Tips

1. Use semantic HTML elements
2. Group related fields with `<fieldset>` and `<legend>`
3. Always connect labels to inputs using `for` and `id`
4. Use the correct `type` for each input
5. Add helpful placeholder text
6. Indicate required fields (with asterisk *)

## ✅ Testing Checklist

Test your form thoroughly:

- [ ] All labels are clickable and focus their inputs
- [ ] Required fields prevent submission when empty
- [ ] Email field validates format (try entering "abc" - should error)
- [ ] Phone number accepts format xxx-xxx-xxxx
- [ ] Message textarea enforces character limits
- [ ] Only one radio button can be selected at a time
- [ ] Form has clear visual structure with fieldsets
- [ ] You can navigate the entire form using only Tab key
- [ ] Reset button clears all fields

## 🚀 Bonus Challenges

1. **Add a copy-yourself checkbox:** "Send me a copy of this message"
2. **Add priority dropdown:** Low, Medium, High, Urgent
3. **Add attachment field:** Allow file upload (accept PDF, DOC, DOCX)
4. **Add character counter:** Show "0 / 500" below the message textarea
5. **Improve UX:** Add helpful hints like "(123-456-7890)" for phone format

## 📁 Files

- **Starter:** `starter/contact.html` (basic HTML skeleton)
- **Solution:** `solution/contact.html` (check only after trying!)

**Ready? Start building!** 📝

