# Exercise 4: POST Requests ⭐⭐

## 🎯 Objective

Learn how to send data to a server using POST requests with the Fetch API.

## 📝 Instructions

Build a user registration form that sends data to a mock API.

### Tasks

1. **Create a form** with these fields:
   - Username (required, min 3 characters)
   - Email (required, valid email)
   - Password (required, min 6 characters)
   - Bio (optional)

2. **Validate the form** before sending

3. **Send POST request** to: `https://jsonplaceholder.typicode.com/users`
   - Set proper headers (`Content-Type: application/json`)
   - Convert form data to JSON
   - Handle loading state

4. **Handle the response**
   - Show success message with returned data
   - Show error message if request fails
   - Reset form on success

### POST Request Template

```javascript
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

## 🎁 Bonus Challenges

1. Add PUT request to update user
2. Add DELETE request to remove user
3. Add file upload (image)
4. Add progress indicator
5. Add form field validation with visual feedback

## 💡 Tips

- JSONPlaceholder is a fake API for testing
- It won't actually save data, but returns what you sent
- Check Network tab in DevTools to see requests
- Always validate data before sending

## ✅ Success Criteria

- Form validates input correctly
- POST request sends proper JSON
- Response is displayed to user
- Errors are handled gracefully
- Loading state is shown during request

## ⏱️ Estimated Time

25-35 minutes

