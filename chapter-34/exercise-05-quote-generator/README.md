# Exercise 5: Random Quote Generator ⭐

## 🎯 Objective

Build a random quote generator that fetches quotes from an API and allows sharing to social media.

## 📝 Instructions

Create a quote generator with random quotes and social sharing functionality.

### Requirements

1. **Display random quote** with author
2. **"New Quote" button** to fetch another quote
3. **Share buttons** for:
   - Twitter
   - Copy to clipboard
4. **Loading state** while fetching
5. **Error handling** for API failures
6. **Favorite quotes** (save to localStorage)

### API Information

**No API key required**

**Endpoint:**
```javascript
https://api.quotable.io/random
```

**Response:**
```javascript
{
  content: "The only way to do great work is to love what you do.",
  author: "Steve Jobs",
  tags: ["inspirational", "work"]
}
```

**Alternative APIs:**
- https://quotable.io/
- https://api.quotable.io/random?tags=technology
- https://api.quotable.io/random?maxLength=100

## 🎯 Tasks

1. Create HTML structure (quote display, buttons)
2. Fetch random quote on page load
3. Display quote and author
4. Add "New Quote" button
5. Implement Twitter share
6. Add copy to clipboard functionality
7. Save favorites to localStorage
8. Add smooth transitions

## 🎁 Bonus Challenges

1. Filter quotes by category/tag
2. Search quotes by author
3. Display quote of the day
4. Add background image from Unsplash API
5. Keyboard shortcuts (Space = new quote)
6. Speech synthesis (read quote aloud)
7. Share to multiple platforms
8. Export favorites as text file

## ✅ Success Criteria

- Displays random quote on load
- "New Quote" fetches different quote
- Twitter share works with pre-filled text
- Copy to clipboard works
- Favorites save and persist
- Smooth animations
- Handles API errors
- Mobile-friendly design

## ⏱️ Estimated Time

45-90 minutes

## 💡 Tips

**Twitter Share URL:**
```javascript
const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)} - ${author}`;
window.open(twitterUrl, '_blank');
```

**Copy to Clipboard:**
```javascript
navigator.clipboard.writeText(quote)
  .then(() => alert('Copied!'))
  .catch(err => console.error(err));
```

**Favorites in localStorage:**
```javascript
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
favorites.push({ quote, author });
localStorage.setItem('favorites', JSON.stringify(favorites));
```

## 📚 API Documentation

- https://github.com/lukePeavey/quotable

