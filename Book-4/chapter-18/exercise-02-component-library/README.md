# Exercise 2: Component Library

**Difficulty:** ⭐⭐⭐ Advanced
**Time Estimate:** 4-5 hours

## 🎯 Goal

Build a small component library with Button, Input, and Card components with multiple variants and consistent APIs.

## 📝 Tasks

### Button Component
1. Create Button with variants: primary, secondary, outline, ghost, danger
2. Add sizes: sm, md, lg
3. Support leftIcon and rightIcon props
4. Add isLoading and isDisabled states
5. Use forwardRef for ref forwarding
6. Write unit tests

### Input Component
1. Create Input with variants: outline, filled, flushed
2. Add sizes: sm, md, lg
3. Support label, helperText, errorMessage props
4. Add isInvalid, isDisabled, isRequired states
5. Use forwardRef
6. Write unit tests

### Card Component (Compound)
1. Create Card with Card.Header, Card.Body, Card.Footer
2. Add variants: elevated, outline, filled
3. Support padding sizes
4. Write unit tests

## ✅ Success Criteria

- ✅ All components have consistent API (variant, size props)
- ✅ Components use design tokens from Exercise 1
- ✅ Full TypeScript support (or PropTypes)
- ✅ forwardRef implemented for all components
- ✅ Comprehensive unit tests (80%+ coverage)
- ✅ Accessible (ARIA attributes, keyboard support)
- ✅ Components work together harmoniously

## 📚 Resources

- [React forwardRef](https://react.dev/reference/react/forwardRef)
- [Compound Components Pattern](https://kentcdodds.com/blog/compound-components-with-react-hooks)

