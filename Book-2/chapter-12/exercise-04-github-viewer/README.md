# Exercise 4: GitHub Profile Viewer ⭐⭐

## 🎯 Objective

Build a GitHub profile viewer that fetches and displays user information and repositories using the GitHub API.

## 📝 Instructions

Create an app that searches for GitHub users and displays their profile and repositories.

### Requirements

1. **Search for GitHub users** by username
2. **Display user profile:**
   - Avatar
   - Name and username
   - Bio
   - Followers/Following count
   - Public repos count
   - Location, company, website
3. **List user's repositories:**
   - Repository name
   - Description
   - Stars, forks, language
   - Link to repository
4. **Sort repositories** by stars, forks, or updated date
5. **Error handling** for user not found

### API Information

**No API key required** for basic use (60 requests/hour)

**Endpoints:**
```javascript
// Get user
https://api.github.com/users/username

// Get user's repos
https://api.github.com/users/username/repos?sort=stars&per_page=10
```

**Response structure:**
```javascript
// User
{
  login: "octocat",
  name: "The Octocat",
  avatar_url: "https://...",
  bio: "GitHub mascot",
  public_repos: 8,
  followers: 100,
  following: 50
}

// Repos
[{
  name: "Hello-World",
  description: "My first repository",
  stargazers_count: 100,
  forks_count: 50,
  language: "JavaScript",
  html_url: "https://github.com/..."
}]
```

## 🎯 Tasks

1. Create HTML structure (search, profile, repos list)
2. Fetch user data
3. Display user profile
4. Fetch and display repositories
5. Add repository sorting
6. Implement pagination for repos
7. Handle errors gracefully

## 🎁 Bonus Challenges

1. Show user's recent activity
2. Display contribution graph (requires additional API)
3. Search repositories by language filter
4. Show gists
5. Compare two users side-by-side
6. Add dark mode
7. Show organization memberships
8. Display pinned repositories

## ✅ Success Criteria

- Search works for any GitHub user
- Displays profile information
- Shows repositories with details
- Sorting works correctly
- Handles "user not found" error
- Links to GitHub are clickable
- Responsive design

## ⏱️ Estimated Time

1-2 hours

## 💡 Tips

- No API key needed for public data
- Rate limit: 60 requests/hour (unauthenticated)
- Use authenticated requests for higher limit (5000/hour)
- Cache results to reduce API calls
- Use `per_page` and `page` for pagination

## 📚 API Documentation

- https://docs.github.com/en/rest/users/users
- https://docs.github.com/en/rest/repos/repos

