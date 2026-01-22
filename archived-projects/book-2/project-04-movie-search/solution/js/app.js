/**
 * app.js - Main Application
 * Coordinates all modules and handles user interactions
 */

// Application state
let currentSearchTerm = '';
let currentPage = 1;
let totalPages = 1;

/**
 * Initialize application
 */
function init() {
  setupEventListeners();
  UI.updateWatchlistCount();

  // Focus search input
  document.getElementById('search-input').focus();

  console.log('Movie Search initialized');
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
  // Search button
  document.getElementById('search-btn').addEventListener('click', handleSearch);

  // Enter key in search input
  document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });

  // Clear button
  document.getElementById('clear-btn').addEventListener('click', clearSearch);

  // Navigation buttons
  document.getElementById('home-btn').addEventListener('click', showSearchView);
  document.getElementById('watchlist-btn').addEventListener('click', showWatchlistView);

  // Clear watchlist button
  document.getElementById('clear-watchlist-btn').addEventListener('click', () => {
    if (Watchlist.clear()) {
      showWatchlistView();
    }
  });

  // Modal close
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.querySelector('.modal-overlay').addEventListener('click', closeModal);

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

/**
 * Handle search button click
 */
function handleSearch() {
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.trim();

  // Validate search term
  if (searchTerm === '') {
    UI.showError('Please enter a movie title');
    return;
  }

  if (searchTerm.length < 3) {
    UI.showError('Please enter at least 3 characters');
    return;
  }

  // Perform search
  searchMovies(searchTerm, 1);
}

/**
 * Search movies
 */
async function searchMovies(searchTerm, page = 1) {
  currentSearchTerm = searchTerm;
  currentPage = page;

  // Show loading
  UI.showLoading();
  UI.showResultsSection();

  // Show clear button
  document.getElementById('clear-btn').style.display = 'inline-block';

  try {
    const data = await API.searchMovies(searchTerm, page);

    // Calculate total pages
    totalPages = Math.ceil(data.totalResults / CONFIG.RESULTS_PER_PAGE);

    // Update UI
    document.getElementById('results-title').textContent = `Search Results for "${searchTerm}"`;
    document.getElementById('results-info').textContent =
      `Found ${data.totalResults} results (Page ${page} of ${totalPages})`;

    // Display movies
    UI.displayMovies(data.movies);

    // Update pagination
    UI.updatePagination(currentPage, totalPages, searchTerm);

    // Scroll to results
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });

  } catch (error) {
    console.error('Error searching movies:', error);

    // Handle different error types
    if (error.message.includes('Failed to fetch')) {
      UI.showError('Network error. Please check your internet connection.');
    } else if (error.message.includes('Movie not found')) {
      document.getElementById('results-container').innerHTML =
        '<p class="no-results">No movies found. Try a different search!</p>';
    } else {
      UI.showError(`Error: ${error.message}`);
    }
  } finally {
    UI.hideLoading();
  }
}

/**
 * Quick search (from example buttons)
 */
function quickSearch(searchTerm) {
  document.getElementById('search-input').value = searchTerm;
  searchMovies(searchTerm, 1);
}

/**
 * Clear search
 */
function clearSearch() {
  document.getElementById('search-input').value = '';
  document.getElementById('clear-btn').style.display = 'none';
  UI.showWelcomeState();
  currentSearchTerm = '';
  currentPage = 1;
}

/**
 * Show movie details in modal
 */
async function showMovieDetails(imdbID) {
  await UI.displayMovieDetails(imdbID);
}

/**
 * Close modal
 */
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

/**
 * Toggle watchlist (add/remove)
 */
async function toggleWatchlist(imdbID) {
  if (Watchlist.has(imdbID)) {
    Watchlist.remove(imdbID);
  } else {
    await Watchlist.add(imdbID);
  }

  // Refresh current view
  if (document.getElementById('search-view').style.display !== 'none') {
    // Refresh search results to update watchlist buttons
    if (currentSearchTerm) {
      const resultsContainer = document.getElementById('results-container');
      if (resultsContainer.children.length > 0) {
        // Re-render current page
        searchMovies(currentSearchTerm, currentPage);
      }
    }
  } else {
    // Refresh watchlist view
    showWatchlistView();
  }

  // Update modal if open
  const modal = document.getElementById('modal');
  if (modal.style.display === 'flex') {
    showMovieDetails(imdbID);
  }
}

/**
 * Show search view
 */
function showSearchView() {
  document.getElementById('search-view').style.display = 'block';
  document.getElementById('watchlist-view').style.display = 'none';

  // Update nav buttons
  document.getElementById('home-btn').classList.add('active');
  document.getElementById('watchlist-btn').classList.remove('active');
}

/**
 * Show watchlist view
 */
function showWatchlistView() {
  const watchlist = Watchlist.get();

  document.getElementById('search-view').style.display = 'none';
  document.getElementById('watchlist-view').style.display = 'block';

  // Update nav buttons
  document.getElementById('home-btn').classList.remove('active');
  document.getElementById('watchlist-btn').classList.add('active');

  // Display watchlist
  if (watchlist.length === 0) {
    document.getElementById('empty-watchlist').style.display = 'block';
    document.getElementById('watchlist-container').style.display = 'none';
  } else {
    document.getElementById('empty-watchlist').style.display = 'none';
    document.getElementById('watchlist-container').style.display = 'grid';
    UI.displayMovies(watchlist, 'watchlist-container');
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

