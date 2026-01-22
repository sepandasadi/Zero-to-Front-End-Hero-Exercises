# Exercise 05: DOM Testing - Solution

## 🎯 Demonstrated

- ✅ Testing DOM with @testing-library/dom
- ✅ Simulating user events with userEvent
- ✅ Querying elements by role (accessibility-first)
- ✅ Setup/teardown patterns
- ✅ Testing user interactions
- ✅ Accessibility testing

## 🚀 Run

```bash
npm install
npm test
```

## 📚 Key Concepts

### Query Priority
1. **getByRole** - Most accessible
2. **getByLabelText** - Forms
3. **getByPlaceholderText** - Forms
4. **getByText** - Non-interactive
5. **getByTestId** - Last resort

### User Events
```javascript
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()
await user.click(button)
await user.type(input, 'text')
```

## 💡 Best Practices

1. Query by role for accessibility
2. Use userEvent over fireEvent
3. Clean up DOM after each test
4. Test user behavior, not implementation
