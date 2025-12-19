# Exercise 2: Post Manager ⭐⭐

## 🎯 Objective

Build a full CRUD (Create, Read, Update, Delete) application for managing blog posts using JSONPlaceholder API.

## 📝 Instructions

Create a post management system that allows users to view, create, edit, and delete posts.

### Requirements

1. **Display all posts** (GET request)
   - Fetch from `/posts` endpoint
   - Show title, body, and user ID
   - Implement pagination or infinite scroll

2. **Create new post** (POST request)
   - Form with title and body fields
   - Submit to API
   - Show success message
   - Add to UI optimistically

3. **Edit existing post** (PUT request)
   - Click edit button on post
   - Load post data into form
   - Update via API
   - Reflect changes in UI

4. **Delete post** (DELETE request)
   - Delete button on each post
   - Confirm before deleting
   - Remove from UI

5. **Error handling and loading states**
   - Show loaders during requests
   - Handle API errors gracefully
   - User-friendly error messages

### API Information

**Base URL:**
```
https://jsonplaceholder.typicode.com
```

**Endpoints:**
- `GET /posts` - Get all posts (100 posts)
- `GET /posts/1` - Get single post
- `POST /posts` - Create new post
- `PUT /posts/1` - Update post
- `DELETE /posts/1` - Delete post

**Post structure:**
```javascript
{
  id: 1,
  title: "Post title",
  body: "Post content",
  userId: 1
}
```

**Note:** JSONPlaceholder is a fake API. POST, PUT, DELETE will return success but won't actually modify the database.

## 🎯 Tasks

1. Set up HTML structure (posts list, form, modal)
2. Fetch and display all posts (GET)
3. Create new post form (POST)
4. Edit post functionality (PUT)
5. Delete post with confirmation (DELETE)
6. Implement loading states
7. Add error handling
8. Add pagination or "Load More"

## 🎁 Bonus Challenges

1. Search posts by title
2. Filter by user ID
3. View single post in modal
4. Add local storage cache
5. Implement optimistic updates
6. Add post count and statistics
7. Implement sorting (newest first, etc.)

## ✅ Success Criteria

- Displays all posts in a clean layout
- Can create new posts via form
- Can edit existing posts
- Can delete posts with confirmation
- All CRUD operations work smoothly
- Shows appropriate loading states
- Handles errors gracefully
- Responsive design

## ⏱️ Estimated Time

1-2 hours

## 💡 Tips

- Use `async/await` for all API calls
- JSONPlaceholder doesn't persist changes, so manage UI state
- For real apps, you'd need backend validation
- Optimistic updates improve UX
- Always show feedback to users

