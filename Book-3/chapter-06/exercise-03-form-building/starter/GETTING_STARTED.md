# Exercise 03: Form Building - Getting Started

## Your Task

Build a **complex registration form** in **2 component libraries** of your choice and compare their form handling approaches.

## Form Requirements

### Fields (11 total):

1. **Username** (text)
   - Required
   - Min 3, max 20 characters
   - Alphanumeric + underscores only
   - Check availability (simulate async API call)
   - Show loading spinner while checking
   - Show ✓ if available, ❌ if taken

2. **Email** (email)
   - Required
   - Valid email format
   - Real-time validation

3. **Password** (password)
   - Required
   - Min 8 characters
   - Must contain: uppercase, lowercase, number, special char
   - Show strength meter (weak/medium/strong)
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
   - At least 10 options

7. **Bio** (textarea)
   - Optional
   - Max 200 characters
   - Show character count

8. **Role** (radio buttons)
   - Required
   - Options: Developer, Designer, Product Manager, Other

9. **Skills** (checkboxes)
   - At least 1 required
   - Options: React, Vue, Angular, Node.js, Python, etc.

10. **Terms** (checkbox)
    - Required
    - Link to terms page

11. **Newsletter** (checkbox)
    - Optional

## Step-by-Step Instructions

### 1. Choose 2 Libraries

Pick any 2:
- Material UI
- Chakra UI
- Ant Design
- React Hook Form + any UI library

### 2. Create Projects

```bash
# Project 1
npm create vite@latest form-library1 -- --template react-ts
cd form-library1
npm install
# Install your chosen library

# Project 2
npm create vite@latest form-library2 -- --template react-ts
cd form-library2
npm install
# Install your other library
```

### 3. Implement Form (Each Library)

Create `src/components/RegistrationForm.tsx`:

```typescript
interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  fullName: string
  country: string
  bio: string
  role: string
  skills: string[]
  terms: boolean
  newsletter: boolean
}
```

### 4. Validation Logic

```typescript
// Username availability check (simulate API)
const checkUsernameAvailability = async (username: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const taken = ['admin', 'test', 'user', 'demo']
  return !taken.includes(username.toLowerCase())
}

// Password strength calculator
const calculatePasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  let strength = 0
  if (password.length >= 8) strength++
  if (/[a-z]/.test(password)) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^a-zA-Z0-9]/.test(password)) strength++

  if (strength <= 2) return 'weak'
  if (strength <= 4) return 'medium'
  return 'strong'
}

// Email validation
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
```

### 5. Form Submission

```typescript
const handleSubmit = async (data: FormData) => {
  // Show loading
  setIsSubmitting(true)

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Show success
  alert('Registration successful!')

  // Reset form
  resetForm()
  setIsSubmitting(false)
}
```

### 6. UX Requirements

- [ ] Show errors only after field is touched (on blur)
- [ ] Show all errors on submit attempt
- [ ] Disable submit button until form is valid
- [ ] Show loading state during submission
- [ ] Clear form after successful submission
- [ ] Password strength indicator with colors
- [ ] Character count for bio
- [ ] Smooth error message transitions

## Comparison Checklist

After building both, compare:

| Criteria | Library 1: ___ | Library 2: ___ |
|----------|----------------|----------------|
| **Setup Difficulty** | | |
| **Validation API** | | |
| **Built-in Validation?** | Yes/No | Yes/No |
| **Async Validation** | Easy/Hard | Easy/Hard |
| **Error Display** | | |
| **Code Required** (lines) | | |
| **Developer Experience** (1-5) | | |
| **Would Use for Real Project?** | Yes/No | Yes/No |

## File Structure

```
src/
├── App.tsx
├── components/
│   └── RegistrationForm.tsx
├── utils/
│   ├── validation.ts       # Validation functions
│   └── passwordStrength.ts # Password strength logic
└── types/
    └── form.ts             # FormData interface
```

## Testing Scenarios

Test each form:
1. Try to submit empty form (should show all errors)
2. Enter invalid email (should show error)
3. Enter weak password (should show strength)
4. Mismatch passwords (should show error)
5. Check username "admin" (should show taken)
6. Check username "myusername" (should show available)
7. Leave required checkbox unchecked (should show error)
8. Fill everything correctly and submit (should succeed)

## Accessibility Requirements

- [ ] All inputs have labels
- [ ] Error messages linked with aria-describedby
- [ ] Form is keyboard navigable
- [ ] Focus management works
- [ ] Screen reader announces errors
- [ ] Required fields marked with *

## Success Criteria

- [ ] Both forms have all 11 fields
- [ ] All validation rules work
- [ ] Async username check works
- [ ] Password strength shows correctly
- [ ] Form submission works
- [ ] Loading states implemented
- [ ] Fully keyboard accessible
- [ ] Comparison table filled out

## Time Estimate

- Form 1: 2 hours
- Form 2: 1.5 hours (faster the second time!)
- Comparison: 30 minutes
- **Total:** 4 hours

## Tips

1. Start with the simplest field (name)
2. Add validation incrementally
3. Test each field as you build
4. Use console.log to debug validation
5. Reference the exercise README for more examples

## Need Help?

The exercise README includes:
- Complete validation examples for each library
- Async validation patterns
- Password strength implementation
- Form submission handling

Good luck building your forms! 📋

