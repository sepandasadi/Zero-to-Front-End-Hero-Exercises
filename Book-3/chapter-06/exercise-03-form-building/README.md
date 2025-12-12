# Exercise 3: Form Building Comparison

## Learning Objectives

By the end of this exercise, you will:

- ✅ Build complex forms with validation
- ✅ Handle form state management
- ✅ Implement async validation
- ✅ Compare form handling across libraries
- ✅ Understand which library has the best form experience

**Time:** 75-90 minutes
**Difficulty:** Intermediate

---

## Scenario

You're building a **user registration form** for "TechHub", a developer community platform. The form needs robust validation, great UX, and accessibility. Build the form in **2 libraries** of your choice to compare approaches.

---

## Requirements

Build a registration form with these fields:

### **Form Fields:**

1. **Username** (text)
   - Required
   - Min 3 characters
   - Max 20 characters
   - Alphanumeric + underscores only
   - Async validation (check availability)
   - Show loading spinner while checking
   - Show checkmark if available

2. **Email** (email)
   - Required
   - Valid email format
   - Real-time validation

3. **Password** (password)
   - Required
   - Min 8 characters
   - Must contain: uppercase, lowercase, number, special char
   - Show strength indicator (weak/medium/strong)
   - Toggle visibility (eye icon)

4. **Confirm Password** (password)
   - Required
   - Must match password
   - Real-time validation

5. **Full Name** (text)
   - Required
   - Min 2 characters

6. **Country** (select)
   - Required
   - List of 10+ countries

7. **Bio** (textarea)
   - Optional
   - Max 200 characters
   - Show character count

8. **Role** (radio buttons)
   - Required
   - Options: Developer, Designer, Product Manager, Other

9. **Skills** (checkbox group)
   - At least 1 required
   - Options: React, Vue, Angular, Node.js, Python, etc.

10. **Terms** (checkbox)
    - Required
    - Link to terms page

11. **Newsletter** (checkbox)
    - Optional

---

## Functional Requirements

### **Validation Rules:**
- All validations run on blur and on submit
- Show errors below each field
- Disable submit button until form is valid
- Required fields marked with *

### **UX Requirements:**
- Show loading state during async validation
- Show success states for valid fields
- Smooth transitions for error messages
- Clear error messages (not "Invalid input")
- Password strength indicator with colors

### **Submission:**
- On submit, show loading spinner on button
- Simulate API call (2 second delay)
- On success, show success message and clear form
- On error, show error alert

### **Accessibility:**
- All inputs have labels
- Error messages linked to inputs (aria-describedby)
- Form is keyboard navigable
- Screen reader friendly
- Focus management

---

## Implementation Guide

### **Part 1: Choose 2 Libraries** (5 min)

Pick 2 from:
- Material UI (excellent form components)
- Chakra UI (great DX)
- Ant Design (Form component with validation)
- React Hook Form + Library (hybrid approach)

---

### **Part 2: Build Form #1** (35-40 min)

1. Create all form fields
2. Implement validation logic
3. Add error handling
4. Implement async username check
5. Add password strength indicator
6. Handle form submission
7. Add loading and success states

---

### **Part 3: Build Form #2** (35-40 min)

Repeat in your second library choice.

---

### **Part 4: Comparison** (10 min)

Fill out comparison table (see below).

---

## Username Availability Check (Async)

Simulate checking username availability:

```jsx
const checkUsernameAvailability = async (username) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Simulate taken usernames
  const taken = ['admin', 'test', 'user', 'demo']
  return !taken.includes(username.toLowerCase())
}
```

Usage:
```jsx
const [checkingUsername, setCheckingUsername] = useState(false)
const [usernameAvailable, setUsernameAvailable] = useState(null)

const handleUsernameBlur = async (username) => {
  if (username.length >= 3) {
    setCheckingUsername(true)
    const available = await checkUsernameAvailability(username)
    setUsernameAvailable(available)
    setCheckingUsername(false)
  }
}
```

---

## Password Strength Indicator

```jsx
const calculatePasswordStrength = (password) => {
  let strength = 0

  if (password.length >= 8) strength++
  if (/[a-z]/.test(password)) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^a-zA-Z0-9]/.test(password)) strength++

  if (strength <= 2) return { label: 'Weak', color: 'red' }
  if (strength <= 4) return { label: 'Medium', color: 'orange' }
  return { label: 'Strong', color: 'green' }
}
```

---

## Form Validation Hints

### Material UI Approach
```jsx
import { TextField, Button } from '@mui/material'
import { useState } from 'react'

const [errors, setErrors] = useState({})
const [values, setValues] = useState({ username: '', email: '' })

const validate = () => {
  const newErrors = {}
  if (!values.username) newErrors.username = 'Required'
  if (values.username.length < 3) newErrors.username = 'Too short'
  // ... more validation
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

<TextField
  label="Username"
  value={values.username}
  onChange={(e) => setValues({...values, username: e.target.value})}
  error={!!errors.username}
  helperText={errors.username}
/>
```

### Chakra UI Approach
```jsx
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react'

<FormControl isInvalid={!!errors.username}>
  <FormLabel>Username</FormLabel>
  <Input value={values.username} onChange={handleChange} />
  <FormErrorMessage>{errors.username}</FormErrorMessage>
</FormControl>
```

### Ant Design Approach
```jsx
import { Form, Input, Button } from 'antd'

<Form onFinish={handleSubmit}>
  <Form.Item
    label="Username"
    name="username"
    rules={[
      { required: true, message: 'Please input your username!' },
      { min: 3, message: 'Username must be at least 3 characters!' },
    ]}
  >
    <Input />
  </Form.Item>
</Form>
```

---

## Deliverables

- [ ] 2 complete registration forms (different libraries)
- [ ] All 11 fields implemented
- [ ] All validation rules working
- [ ] Async username check working
- [ ] Password strength indicator
- [ ] Form submission with loading/success states
- [ ] Fully accessible
- [ ] Comparison table filled out

---

## Comparison Table

| Criteria | Library 1: ___ | Library 2: ___ |
|----------|----------------|----------------|
| **Validation API** | | |
| **Error Handling** | | |
| **Code Required** (lines) | | |
| **Developer Experience** (1-5) | | |
| **Built-in Validation** (Yes/No) | | |
| **Custom Validation** (Easy/Hard) | | |
| **Async Validation** (Easy/Hard) | | |
| **Would Use for Complex Forms?** | | |

**Questions to answer:**
- Which library made forms easier?
- Which had better validation support?
- Which had better TypeScript support?
- Which would you choose for a real project?

---

## Success Criteria

- [ ] All fields validate correctly
- [ ] Username availability check works
- [ ] Password strength shows correctly
- [ ] Form submission works
- [ ] All error messages are clear
- [ ] Form is fully keyboard accessible
- [ ] Comparison is thoughtful and detailed

---

## Extension Challenges

1. **Add Multi-Step Form**
   - Split into 3 steps (Account, Profile, Preferences)
   - Progress indicator
   - Back/Next buttons
   - Validate each step

2. **Add File Upload**
   - Profile picture upload
   - Image preview
   - File size validation

3. **Add Auto-Save**
   - Save draft to localStorage
   - Restore on page load
   - Show "saved" indicator

4. **Add Form Analytics**
   - Track field completion time
   - Track validation errors
   - Report UX issues

---

## Key Learnings

After completing this exercise, you understand:

- ✅ How each library handles form state
- ✅ Which libraries have built-in validation
- ✅ How to handle async validation
- ✅ Form accessibility best practices
- ✅ Which library is best for complex forms

**Forms are crucial to most apps - mastering them is essential!** 📋✨

---

## Recommended Library for Forms

**My recommendation:**
- **Ant Design** - Best built-in form validation
- **React Hook Form + any UI library** - Most flexible
- **Chakra UI** - Best DX for simpler forms

Try them all and decide for yourself! 🚀

