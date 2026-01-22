# Movie Search Application - Implementation Hints

Common challenges and solutions for building a movie search app.

---

## 🎯 Challenge 1: Fetching Movie Data from API

### The Problem
Making API calls and handling movie data.

### The Solution

**Using OMDb API:**
```javascript
const API_KEY = 'your_api_key_here';
const BASE_URL = 'http://www.omdbapi.com/';

async function searchMovies(searchTerm, page = 1) {
  try {
    const url = `${BASE_URL}?s=${encodeURIComponent(searchTerm)}&apikey=${API_KEY}&page=${page}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // OMDb returns Response: "False" if no results
    if (data.Response === 'False') {
      throw new Error(data.Error || 'No movies found');
    }

    return {
      movies: data.Search,
      totalResults: parseInt(data.totalResults),
      currentPage: page
    };

  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
}

async function getMovieDetails(imdbID) {
  try {
    const url = `${BASE_URL}?i=${imdbID}&apikey=${API_KEY}&plot=full`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }

    const data = await response.json();

    if (data.Response === 'False') {
      throw new Error('Movie not found');
    }

    return data;

  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}
```

---

## 🎯 Challenge 2: Displaying Movie Results

### The Problem
Rendering movie cards dynamically.

### The Solution

```javascript
function displayMovies(movies) {
  const container = document.getElementById('results-container');

  // Clear previous results
  container.innerHTML = '';

  if (movies.length === 0) {
    container.innerHTML = '<p class="no-results">No movies found. Try a different search!</p>';
    return;
  }

  movies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    container.appendChild(movieCard);
  });
}

function createMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.dataset.imdbId = movie.imdbID;

  // Handle missing poster
  const poster = movie.Poster !== 'N/A'
    ? movie.Poster
    : 'https://via.placeholder.com/300x450?text=No+Poster';

  card.innerHTML = `
    <img src="${poster}" alt="${movie.Title}" class="movie-poster">
    <div class="movie-info">
      <h3 class="movie-title">${movie.Title}</h3>
      <p class="movie-year">${movie.Year}</p>
      <div class="movie-actions">
        <button class="btn btn-details" onclick="showMovieDetails('${movie.imdbID}')">
          Details
        </button>
        <button class="btn btn-watchlist" onclick="toggleWatchlist('${movie.imdbID}')">
          ${Watchlist.has(movie.imdbID) ? '★' : '☆'}
        </button>
      </div>
    </div>
  `;

  return card;
}
```

---

## 🎯 Challenge 3: Modal for Movie Details

### The Problem
Creating a modal to show detailed movie information.

### The Solution

**HTML Structure:**
```html
<div id="modal" class="modal" style="display: none;">
  <div class="modal-overlay" onclick="closeModal()"></div>
  <div class="modal-content">
    <button class="modal-close" onclick="closeModal()">&times;</button>
    <div id="modal-body">
      <!-- Movie details will be inserted here -->
    </div>
  </div>
</div>
```

**JavaScript:**
```javascript
async function showMovieDetails(imdbID) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');

  // Show modal with loading
  modal.style.display = 'flex';
  modalBody.innerHTML = '<div class="loading">Loading...</div>';

  try {
    const movie = await getMovieDetails(imdbID);

    const poster = movie.Poster !== 'N/A'
      ? movie.Poster
      : 'https://via.placeholder.com/300x450?text=No+Poster';

    modalBody.innerHTML = `
      <div class="movie-details">
        <img src="${poster}" alt="${movie.Title}" class="details-poster">
        <div class="details-info">
          <h2>${movie.Title} (${movie.Year})</h2>
          <p class="rating">⭐ ${movie.imdbRating}/10</p>
          <p class="runtime">${movie.Runtime} | ${movie.Genre}</p>
          <p class="plot">${movie.Plot}</p>
          <p><strong>Director:</strong> ${movie.Director}</p>
          <p><strong>Cast:</strong> ${movie.Actors}</p>
          <button class="btn btn-primary" onclick="toggleWatchlist('${movie.imdbID}')">
            ${Watchlist.has(movie.imdbID) ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </button>
        </div>
      </div>
    `;

  } catch (error) {
    modalBody.innerHTML = `<div class="error">Failed to load movie details: ${error.message}</div>`;
  }
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
```

---

## 🎯 Challenge 4: Watchlist Management

### The Problem
Adding, removing, and persisting watchlist.

### The Solution

```javascript
const Watchlist = {
  STORAGE_KEY: 'movieWatchlist',

  get() {
    try {
      const watchlist = localStorage.getItem(this.STORAGE_KEY);
      return watchlist ? JSON.parse(watchlist) : [];
    } catch (error) {
      console.error('Error loading watchlist:', error);
      return [];
    }
  },

  save(watchlist) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(watchlist));
    } catch (error) {
      console.error('Error saving watchlist:', error);
      alert('Failed to save to watchlist. Storage may be full.');
    }
  },

  add(movie) {
    const watchlist = this.get();

    // Check if already in watchlist
    if (this.has(movie.imdbID)) {
      return false;
    }

    // Add movie with metadata
    watchlist.push({
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      imdbRating: movie.imdbRating || 'N/A',
      addedDate: new Date().toISOString()
    });

    this.save(watchlist);
    return true;
  },

  remove(imdbID) {
    let watchlist = this.get();
    watchlist = watchlist.filter(m => m.imdbID !== imdbID);
    this.save(watchlist);
  },

  has(imdbID) {
    return this.get().some(m => m.imdbID === imdbID);
  },

  clear() {
    if (confirm('Are you sure you want to clear your entire watchlist?')) {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    }
    return false;
  },

  count() {
    return this.get().length;
  }
};

// Usage
async function toggleWatchlist(imdbID) {
  if (Watchlist.has(imdbID)) {
    Watchlist.remove(imdbID);
    showMessage('Removed from watchlist', 'success');
  } else {
    // Fetch movie details to save complete info
    const movie = await getMovieDetails(imdbID);
    Watchlist.add(movie);
    showMessage('Added to watchlist', 'success');
  }

  // Update UI
  updateWatchlistButtons();
  updateWatchlistCount();
}

function updateWatchlistCount() {
  const countEl = document.getElementById('watchlist-count');
  if (countEl) {
    countEl.textContent = Watchlist.count();
  }
}
```

---

## 🎯 Challenge 5: Pagination

### The Problem
Handling multiple pages of search results.

### The Solution

```javascript
let currentPage = 1;
let totalPages = 1;
let currentSearch = '';

async function searchMovies(searchTerm, page = 1) {
  currentSearch = searchTerm;
  currentPage = page;

  // Fetch results
  const data = await fetchMovies(searchTerm, page);

  // Calculate total pages (OMDb returns total results)
  totalPages = Math.ceil(data.totalResults / 10); // OMDb returns 10 per page

  // Display movies
  displayMovies(data.movies);

  // Update pagination
  updatePagination();
}

function updatePagination() {
  const paginationContainer = document.getElementById('pagination');

  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }

  let html = '';

  // Previous button
  html += `
    <button
      class="page-btn"
      onclick="searchMovies('${currentSearch}', ${currentPage - 1})"
      ${currentPage === 1 ? 'disabled' : ''}
    >
      « Previous
    </button>
  `;

  // Page numbers
  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  pageNumbers.forEach(pageNum => {
    html += `
      <button
        class="page-btn ${pageNum === currentPage ? 'active' : ''}"
        onclick="searchMovies('${currentSearch}', ${pageNum})"
      >
        ${pageNum}
      </button>
    `;
  });

  // Next button
  html += `
    <button
      class="page-btn"
      onclick="searchMovies('${currentSearch}', ${currentPage + 1})"
      ${currentPage === totalPages ? 'disabled' : ''}
    >
      Next »
    </button>
  `;

  paginationContainer.innerHTML = html;
}

function generatePageNumbers(current, total) {
  const pages = [];
  const maxVisible = 5;

  // Show first page
  pages.push(1);

  // Calculate range around current page
  let start = Math.max(2, current - 1);
  let end = Math.min(total - 1, current + 1);

  // Add ellipsis if needed
  if (start > 2) {
    pages.push('...');
  }

  // Add middle pages
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Add ellipsis if needed
  if (end < total - 1) {
    pages.push('...');
  }

  // Show last page
  if (total > 1) {
    pages.push(total);
  }

  return pages;
}
```

---

## 🎯 Challenge 6: Search Validation

### The Problem
Validating search input before API call.

### The Solution

```javascript
function handleSearch() {
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.trim();

  // Validate search term
  if (searchTerm === '') {
    showError('Please enter a movie title');
    return;
  }

  if (searchTerm.length < 3) {
    showError('Please enter at least 3 characters');
    return;
  }

  // Clear any previous errors
  clearError();

  // Perform search
  searchMovies(searchTerm, 1);
}

// Debounced search (optional - for search-as-you-type)
let searchTimeout;

function handleSearchInput(e) {
  clearTimeout(searchTimeout);

  const searchTerm = e.target.value.trim();

  if (searchTerm.length >= 3) {
    searchTimeout = setTimeout(() => {
      searchMovies(searchTerm, 1);
    }, 500); // Wait 500ms after user stops typing
  }
}
```

---

## 🎯 Challenge 7: Error Handling

### The Problem
Displaying user-friendly error messages.

### The Solution

```javascript
function showError(message) {
  const errorContainer = document.getElementById('error-message');
  errorContainer.textContent = message;
  errorContainer.style.display = 'block';

  // Auto-hide after 5 seconds
  setTimeout(() => {
    errorContainer.style.display = 'none';
  }, 5000);
}

function clearError() {
  document.getElementById('error-message').style.display = 'none';
}

// Comprehensive error handling
async function searchMoviesWithErrorHandling(searchTerm, page) {
  const loadingEl = document.getElementById('loading');
  const resultsEl = document.getElementById('results-container');

  try {
    // Show loading
    loadingEl.style.display = 'block';
    resultsEl.innerHTML = '';

    // Fetch data
    const data = await searchMovies(searchTerm, page);

    // Display results
    displayMovies(data.movies);
    updatePagination();

  } catch (error) {
    // Handle different error types
    if (error.message.includes('Failed to fetch')) {
      showError('Network error. Please check your internet connection.');
    } else if (error.message.includes('Movie not found')) {
      resultsEl.innerHTML = '<p class="no-results">No movies found. Try a different search!</p>';
    } else if (error.message.includes('Request limit')) {
      showError('API request limit reached. Please try again later.');
    } else {
      showError(`Error: ${error.message}`);
    }
  } finally {
    // Hide loading
    loadingEl.style.display = 'none';
  }
}
```

---

## 💡 General Tips

### Placeholder Image
```javascript
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300x450?text=No+Poster';

function getMoviePoster(posterUrl) {
  return posterUrl && posterUrl !== 'N/A' ? posterUrl : PLACEHOLDER_IMAGE;
}
```

### Format Rating
```javascript
function formatRating(rating) {
  if (rating === 'N/A') return 'Not Rated';
  const numRating = parseFloat(rating);
  return `⭐ ${numRating.toFixed(1)}/10`;
}
```

### Truncate Text
```javascript
function truncate(text, maxLength = 150) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}
```

### Loading States
```javascript
function showLoading() {
  document.getElementById('loading').style.display = 'flex';
}

function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

// Skeleton screen (bonus)
function showSkeletonScreen() {
  const container = document.getElementById('results-container');
  container.innerHTML = Array(10).fill(0).map(() => `
    <div class="skeleton-card">
      <div class="skeleton-poster"></div>
      <div class="skeleton-title"></div>
      <div class="skeleton-year"></div>
    </div>
  `).join('');
}
```

---

**You've got the patterns! Now build your movie search app!** 🎬✨

