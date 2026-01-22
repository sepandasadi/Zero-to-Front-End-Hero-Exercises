# Movie Search Application - Detailed Requirements

Build a movie search app that integrates with a movie database API to search, display, and manage a watchlist.

---

## 🎯 Project Goal

Create a movie search application that demonstrates mastery of API integration, async JavaScript, data management, and advanced UI patterns.

---

## 📋 Core Features (MVP)

### 1. Movie Search
**Requirements:**
- Search bar for movie titles
- Search button (and Enter key support)
- Display search results as grid of movie cards
- Show poster, title, year, rating
- Minimum 3-character search validation
- Loading state while fetching
- "No results" message
- Clear search functionality

**Search Results Display:**
- Movie poster image (or placeholder)
- Movie title
- Release year
- IMDb/TMDb rating (stars or numeric)
- Brief overview (truncated)
- "More Info" button
- "Add to Watchlist" button

### 2. Movie Details Modal
**Requirements:**
- Click movie card to open modal
- Display full movie information:
  - Large poster
  - Title
  - Release date
  - Runtime
  - Genres
  - Rating
  - Plot/Overview
  - Director (if available)
  - Cast (top actors)
  - Trailer link (bonus)
- Close button (X or outside click)
- Add/Remove from watchlist button
- Share button (bonus)

### 3. Watchlist Management
**Requirements:**
- Add movies to watchlist
- Remove movies from watchlist
- View watchlist (separate section/page)
- Persist watchlist (localStorage)
- Show watchlist count
- Visual indicator for movies in watchlist (star/heart icon)
- Clear all watchlist option

**Watchlist Display:**
- Same grid layout as search results
- Show all saved movies
- Remove from watchlist button
- Click to view details
- Empty state message

### 4. Filtering & Sorting
**Requirements:**
- Filter by genre (if API supports)
- Filter by year range
- Sort by:
  - Relevance (default)
  - Rating (high to low)
  - Year (newest first)
  - Title (A-Z)
- Apply filters to search results

### 5. Pagination
**Requirements:**
- Display results in pages (20 per page)
- Page numbers
- Next/Previous buttons
- Jump to page number
- Show current page / total pages
- Disable buttons appropriately

### 6. Error Handling
**Required Error States:**
- Network error (no internet)
- API error (invalid response)
- Rate limit exceeded
- Movie not found
- Invalid API key
- Search too short (< 3 characters)
- No results found

**Display:**
- Clear error messages
- Retry button
- Helpful suggestions
- Fallback UI

### 7. Loading States
**Requirements:**
- Show loading indicator during API calls
- Skeleton screens for movie cards (bonus)
- Disable interactions during load
- Smooth transitions

---

## 🎨 UI/UX Requirements

### Visual Design
- Modern, Netflix/IMDb inspired design
- Movie poster grid layout
- Modal overlay for details
- Smooth animations
- Responsive cards
- Professional color scheme

### Search Experience
- Auto-focus search input
- Clear button
- Search suggestions (bonus)
- Recent searches (bonus)
- Debounced search (optional)

### Responsive Design
- **Mobile (320px+):** 1-2 columns
- **Tablet (768px+):** 3-4 columns
- **Desktop (1024px+):** 4-6 columns
- Touch-friendly buttons
- Responsive modal

### Accessibility
- Keyboard navigation
- ARIA labels
- Alt text for posters
- Focus indicators
- Screen reader friendly
- Escape key to close modal

---

## 💻 Technical Requirements

### API Options

**Option 1: OMDb API** (Recommended for beginners)
- Free tier: 1000 requests/day
- Simple response format
- URL: `https://www.omdbapi.com/`
- Get API key: http://www.omdbapi.com/apikey.aspx

**Option 2: TMDb API** (More features)
- Free tier: generous limits
- Rich data (cast, crew, videos)
- URL: `https://api.themoviedb.org/3`
- Get API key: https://www.themoviedb.org/settings/api

### API Calls Required

**OMDb API:**
```javascript
// Search movies
GET http://www.omdbapi.com/?s={title}&apikey={API_KEY}&page={page}

// Get movie details
GET http://www.omdbapi.com/?i={imdbID}&apikey={API_KEY}&plot=full
```

**TMDb API:**
```javascript
// Search movies
GET https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&query={query}&page={page}

// Get movie details
GET https://api.themoviedb.org/3/movie/{movie_id}?api_key={API_KEY}

// Get movie credits (cast)
GET https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key={API_KEY}
```

### Async JavaScript Patterns

**Fetch with Error Handling:**
```javascript
async function searchMovies(query, page = 1) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();

    if (data.Response === 'False') {
      throw new Error(data.Error);
    }

    return data;
  } catch (error) {
    handleError(error);
  }
}
```

**Multiple API Calls:**
```javascript
async function getMovieDetails(movieId) {
  const [details, credits] = await Promise.all([
    fetchMovieDetails(movieId),
    fetchMovieCredits(movieId)
  ]);

  return { ...details, ...credits };
}
```

### localStorage

**Watchlist Management:**
```javascript
const Watchlist = {
  get() {
    return JSON.parse(localStorage.getItem('watchlist')) || [];
  },

  add(movie) {
    const watchlist = this.get();
    watchlist.push(movie);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  },

  remove(movieId) {
    let watchlist = this.get();
    watchlist = watchlist.filter(m => m.id !== movieId);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  },

  has(movieId) {
    return this.get().some(m => m.id === movieId);
  }
};
```

---

## 📊 Data Structure

### Movie Object (from API)
```javascript
{
  id: "tt0111161",
  title: "The Shawshank Redemption",
  year: "1994",
  poster: "https://...",
  rating: "9.3",
  plot: "Two imprisoned men...",
  runtime: "142 min",
  genre: "Drama",
  director: "Frank Darabont",
  actors: "Tim Robbins, Morgan Freeman",
  imdbID: "tt0111161"
}
```

### Watchlist Storage
```javascript
[
  {
    id: "tt0111161",
    title: "The Shawshank Redemption",
    poster: "https://...",
    year: "1994",
    rating: "9.3",
    addedDate: "2025-12-19T..."
  },
  // ... more movies
]
```

---

## ✅ Acceptance Criteria

### Minimum Pass (60%):
- Can search movies
- Display search results
- Show movie details
- Basic watchlist (add/remove)
- localStorage persistence
- Basic error handling

### Portfolio-Ready (85%):
- All features work
- Modal with full details
- Complete watchlist management
- Pagination
- Filtering/sorting
- Professional UI
- Fully responsive
- Good error handling

### Exceptional (95%):
- All features + bonuses
- Excellent UI/UX
- Skeleton screens
- Advanced filtering
- Search suggestions
- Smooth animations
- Perfect responsive
- Comprehensive error handling

---

## 🐛 Edge Cases to Handle

1. **Empty search** - Validation message
2. **Search < 3 characters** - Show hint
3. **No results** - Clear message
4. **Network offline** - Offline message
5. **API rate limit** - Explain limit
6. **Invalid API key** - Setup instructions
7. **Movie without poster** - Placeholder image
8. **Long movie titles** - Truncate or wrap
9. **Large watchlist** - Performance optimization
10. **localStorage full** - Handle quota error

---

## 🎯 Bonus Features (Optional)

1. **Search History** - Recent searches (localStorage)
2. **Trending Movies** - Show popular on load
3. **Genre Filtering** - Filter by genre chips
4. **Advanced Search** - Year, rating filters
5. **Movie Trailers** - Embed YouTube trailer
6. **Share Movie** - Share URL or social media
7. **Dark/Light Mode** - Theme toggle
8. **Infinite Scroll** - Instead of pagination
9. **Movie Recommendations** - Similar movies
10. **Export Watchlist** - Download as JSON/CSV
11. **Search Suggestions** - Autocomplete
12. **Keyboard Shortcuts** - Quick actions
13. **Movie Ratings** - User can rate movies
14. **Notes** - Add personal notes to watchlist

---

## 📚 Skills Assessment

This project tests:
- ✅ API integration
- ✅ Async/await
- ✅ Error handling
- ✅ Data transformation
- ✅ localStorage
- ✅ Modal patterns
- ✅ Pagination logic
- ✅ Dynamic UI updates
- ✅ Search & filtering
- ✅ Responsive design

---

## 🚀 Recommended Approach

### Phase 1: Setup & Search (Week 1)
1. Get API key
2. Create HTML structure
3. Build search functionality
4. Display results grid
5. Basic styling

### Phase 2: Details & Watchlist (Week 2)
6. Implement modal
7. Fetch movie details
8. Add watchlist functionality
9. localStorage persistence
10. Improve UI

### Phase 3: Features & Polish (Week 3)
11. Add pagination
12. Implement filtering/sorting
13. Error handling
14. Loading states
15. Responsive design

### Phase 4: Advanced Features (Week 4)
16. Skeleton screens
17. Search history
18. Trending movies
19. Animations
20. Final polish

---

## 🔑 API Key Setup

### Getting Started:

**OMDb:**
1. Visit http://www.omdbapi.com/apikey.aspx
2. Select free plan
3. Verify email
4. Get API key

**TMDb:**
1. Visit https://www.themoviedb.org/signup
2. Sign up for account
3. Go to Settings > API
4. Request API key (instant approval)

**Security:**
- Never commit API keys to GitHub!
- Use config file (add to .gitignore)
- For production, use environment variables

---

## 💡 Implementation Tips

### Debounce Search (Optional)
```javascript
let searchTimeout;

function handleSearchInput(e) {
  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() => {
    searchMovies(e.target.value);
  }, 500);
}
```

### Placeholder Image
```javascript
const PLACEHOLDER = 'https://via.placeholder.com/300x450?text=No+Poster';

function getMoviePoster(movie) {
  return movie.poster !== 'N/A' ? movie.poster : PLACEHOLDER;
}
```

### Pagination Helper
```javascript
function generatePageNumbers(currentPage, totalPages) {
  const pages = [];
  const maxVisible = 5;

  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + maxVisible - 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
}
```

---

**Target:** Build a movie app that's actually fun to use! 🎬✨

