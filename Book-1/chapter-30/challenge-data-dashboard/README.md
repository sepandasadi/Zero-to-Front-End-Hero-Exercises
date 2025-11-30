# Challenge: Data Dashboard

## 🎯 Objective
Build a complete data dashboard that combines all Chapter 30 concepts.

## 📝 Requirements

Create a dashboard that:

1. **Loads Multiple Data Sources in Parallel:**
   - User profile
   - Recent posts
   - Notifications
   - Analytics data
   - Use `Promise.all()` and async/await

2. **Handles Errors Gracefully:**
   - Try/catch for error handling
   - Display error messages to user
   - Continue loading other data if one source fails

3. **Uses Destructuring:**
   - Destructure API responses
   - Extract only needed fields

4. **Safe Property Access:**
   - Use optional chaining for nested data
   - Nullish coalescing for defaults

5. **Data Processing:**
   - Use Map to cache API responses
   - Use Set to track unique data
   - Apply currying for data transformers

## ✅ Success Criteria

- All data loads in parallel (< 2 seconds total)
- Errors don't crash the app
- Uses all modern JavaScript features from this chapter
- Clean, readable code with proper destructuring
- Cache prevents duplicate API calls

## 💡 Bonus Points

- Add loading states for each section
- Implement retry logic for failed requests
- Show timestamps using curried formatters
- Animate data as it loads

## 🚀 Getting Started

1. Review all exercises from this chapter
2. Plan your data structure
3. Build incrementally
4. Test each feature

