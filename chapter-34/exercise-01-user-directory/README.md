# Exercise 1: User Directory ⭐

## 🎯 Objective

Fetch and display user data from the Random User API. Learn the basics of making API requests and rendering data.

## 📝 Instructions

Build a user directory that displays random users with their information.

### Requirements

1. **Fetch users** from Random User API
2. **Display user cards** showing:
   - Profile picture
   - Full name
   - Email
   - Phone
   - Location (city, country)
3. **Add "Load More" button** to fetch additional users
4. **Show loading state** while fetching
5. **Handle errors** gracefully

### API Information

**Endpoint:**
```
https://randomuser.me/api/?results=10
```

**Parameters:**
- `results=10` - Number of users to fetch (1-5000)
- `nat=us` - Nationality (optional)
- `gender=female` - Gender filter (optional)

**Response structure:**
```javascript
{
  results: [
    {
      name: { first: "John", last: "Doe" },
      email: "john.doe@example.com",
      phone: "123-456-7890",
      picture: { large: "url", medium: "url", thumbnail: "url" },
      location: { city: "New York", country: "USA" }
    }
  ]
}
```

## 🎯 Tasks

1. Create HTML structure for user cards
2. Implement `fetchUsers()` function
3. Implement `renderUsers()` function
4. Add loading state
5. Add error handling
6. Add "Load More" functionality

## 🎁 Bonus Challenges

1. Add search/filter by name
2. Add gender filter buttons
3. Add nationality selector
4. Show user count
5. Add infinite scroll instead of "Load More"
6. Add skeleton loading states

## ✅ Success Criteria

- Fetches 10 users on page load
- Displays user information in cards
- "Load More" adds 10 more users
- Shows loading spinner while fetching
- Shows error message if API fails
- Responsive design

## ⏱️ Estimated Time

45-60 minutes

