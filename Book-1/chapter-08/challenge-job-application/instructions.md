# Challenge Project: Job Application Form

## 🎯 Objective

Create a comprehensive, professional job application form that demonstrates mastery of HTML tables and forms. This is your capstone project for Chapter 8!

This challenge combines everything you've learned:
- Complex form structures
- Multiple input types
- File uploads
- Validation
- Accessibility
- Professional UX

## 📋 Requirements

Build a complete job application form with the following sections:

### Section 1: Position Details
- **Job Position** (dropdown, required) with options:
  - Front-End Developer
  - Back-End Developer
  - Full-Stack Developer
  - UI/UX Designer
  - DevOps Engineer
- **Department** (dropdown, required):
  - Engineering
  - Design
  - Product
  - Marketing
- **Expected Start Date** (date input, required)
- **Employment Type** (radio buttons, required):
  - Full-time
  - Part-time
  - Contract
  - Internship

### Section 2: Personal Information
- **First Name** (required)
- **Last Name** (required)
- **Email** (required, validated)
- **Phone** (required, formatted)
- **Current Address** (textarea, optional)
- **LinkedIn Profile** (URL input, optional)
- **Portfolio Website** (URL input, optional)
- **Date of Birth** (date input, must be 18+)

### Section 3: Professional Experience
Create a **table** that allows listing work experience with columns:
- **Company Name**
- **Job Title**
- **Start Date**
- **End Date**
- **Still Employed** (checkbox)

**Note:** For this exercise, create a fixed table with 3 rows for 3 previous jobs.

### Section 4: Education
- **Highest Degree** (dropdown, required):
  - High School
  - Associate's
  - Bachelor's
  - Master's
  - PhD
  - Bootcamp/Certificate
- **Field of Study** (text, required)
- **Institution Name** (text, required)
- **Graduation Year** (number input, 1950-2024)
- **GPA** (number input, 0.0-4.0, optional)

### Section 5: Skills & Qualifications
- **Technical Skills** (checkboxes, select all that apply):
  - HTML/CSS
  - JavaScript
  - React
  - Node.js
  - Python
  - Git/GitHub
  - SQL
  - Other
- **Years of Experience** (radio buttons, required):
  - Less than 1 year
  - 1-3 years
  - 3-5 years
  - 5-10 years
  - 10+ years
- **Availability to Start** (dropdown, required):
  - Immediately
  - 2 weeks notice
  - 1 month
  - 2+ months

### Section 6: Documents & Additional Info
- **Resume Upload** (file input, required, accept PDF/DOC/DOCX only)
- **Cover Letter Upload** (file input, optional, accept PDF/DOC/DOCX only)
- **How did you hear about this position?** (dropdown with options)
- **Salary Expectation** (number input with min, optional)
- **Additional Comments** (textarea, maxlength 1000, optional)

### Section 7: Eligibility & Consent
- **Are you legally authorized to work in [Country]?** (radio: Yes/No, required)
- **Do you require visa sponsorship?** (radio: Yes/No, required)
- **Have you ever worked for this company before?** (radio: Yes/No, required)
- **Consent to background check** (checkbox, required)
- **Agree to terms and conditions** (checkbox, required)

## ✅ Technical Requirements

Your form must have:

**Structure:**
- ✅ Proper HTML5 DOCTYPE and structure
- ✅ Semantic fieldsets with legends
- ✅ Organized sections
- ✅ Professional styling (even basic CSS helps!)

**Forms:**
- ✅ All inputs connected to labels
- ✅ Appropriate input types for each field
- ✅ Validation attributes (required, pattern, min, max, etc.)
- ✅ Autocomplete attributes where applicable
- ✅ Placeholder text for guidance
- ✅ Clear indication of required vs optional fields

**Tables:**
- ✅ Semantic table structure for work experience
- ✅ Proper thead/tbody
- ✅ Column headers with scope attributes
- ✅ Clean, readable layout

**Validation:**
- ✅ Email format validation
- ✅ Phone number pattern validation
- ✅ Date validation (18+ years old check conceptually)
- ✅ File type restrictions
- ✅ Number ranges where appropriate

**Accessibility:**
- ✅ Keyboard navigable
- ✅ Screen reader friendly
- ✅ Clear focus indicators
- ✅ Logical tab order

**UX:**
- ✅ Clear section headings
- ✅ Helpful hints and placeholders
- ✅ Visual indication of required fields
- ✅ Submit and reset buttons
- ✅ Professional appearance

## 💡 Tips

1. **Start with structure:** Plan your fieldsets first
2. **Build incrementally:** Complete one section at a time
3. **Test frequently:** Open in browser after each section
4. **Think like an applicant:** Would you want to fill out this form?
5. **Polish the UX:** Small touches make a big difference
6. **Use CSS:** Even basic styling improves the experience

## 🚀 Bonus Challenges

Take it to the next level:

1. **Add dynamic elements** (with JavaScript):
   - Add "Add Another Job" button for work experience
   - Character counter for textarea
   - Form progress indicator
   - Show/hide fields based on selections

2. **Enhanced styling:**
   - Multi-step form wizard
   - Progress bar
   - Conditional field highlighting
   - Responsive design for mobile

3. **Extra features:**
   - Print-friendly version
   - Save draft functionality (with localStorage)
   - Form validation summery at top
   - Success message after submission

4. **Create a separate page:**
   - Build a "Thank You" page
   - Build a form submission confirmation page

## ✅ Testing Checklist

Before submitting:

- [ ] All sections present and complete
- [ ] All required fields validated
- [ ] Can navigate entire form with Tab key
- [ ] All labels clickable and connected
- [ ] File uploads restricted to correct types
- [ ] Email and phone validation working
- [ ] Date fields use appropriate min/max
- [ ] Radio buttons allow only one selection per group
- [ ] Checkboxes allow multiple selections
- [ ] Table is semantic and accessible
- [ ] Form looks professional
- [ ] No console errors in browser
- [ ] Tested in multiple browsers

## 📁 Files

- **Starter:** `starter/application.html` (basic skeleton with hints)
- **Solution:** `solution/application.html` (complete professional form)

## 🎓 Learning Outcomes

By completing this challenge, you will have:
- ✅ Built a complex, real-world form
- ✅ Combined tables and forms effectively
- ✅ Implemented comprehensive validation
- ✅ Created an accessible user experience
- ✅ Demonstrated professional-level HTML skills
- ✅ A portfolio piece you can show employers!

**This is your chance to shine! Build something you're proud of!** 🌟

**Good luck, and take your time to do this right!** 💪

