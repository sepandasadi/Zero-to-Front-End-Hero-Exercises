/**
 * ui.js - User Interface / DOM Manipulation
 * All UI updates and rendering
 */

const UI = {
  /**
   * Display movie results
   */
  displayMovies(movies, container = 'results-container') {
    const resultsContainer = document.getElementById(container);

    if (movies.length === 0) {
      resultsContainer.innerHTML = '<p class="no-results">No movies found. Try a different search!</p>';
      return;
    }

    resultsContainer.innerHTML = movies.map(movie => this.createMovieCard(movie)).join('');
  },

  /**
   * Create movie card HTML
   */
  createMovieCard(movie) {
    const poster = movie.poster !== 'N/A' ? movie.poster : CONFIG.PLACEHOLDER_IMAGE;
    const inWatchlist = Watchlist.has(movie.imdbID);

    return `
      <div class="movie-card" data-imdb-id="${movie.imdbID}">
        <div class="movie-poster-container">
          <img src="${poster}" alt="${movie.title}" class="movie-poster" loading="lazy">
          <button class="watchlist-toggle ${inWatchlist ? 'active' : ''}"
                  onclick="toggleWatchlist('${movie.imdbID}')"
                  aria-label="${inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}">
            ${inWatchlist ? '★' : '☆'}
          </button>
        </div>
        <div class="movie-info">
          <h3 class="movie-title">${movie.title}</h3>
          <p class="movie-year">${movie.year}</p>
          <button class="btn btn--small" onclick="showMovieDetails('${movie.imdbID}')">
            View Details
          </button>
        </div>
      </div>
    `;
  },

  /**
   * Display movie details in modal
   */
  async displayMovieDetails(imdbID) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');

    // Show modal with loading
    modal.style.display = 'flex';
    modalBody.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading details...</p></div>';

    try {
      const movie = await API.getMovieDetails(imdbID);
      const poster = movie.poster !== 'N/A' ? movie.poster : CONFIG.PLACEHOLDER_IMAGE;
      const inWatchlist = Watchlist.has(movie.imdbID);

      modalBody.innerHTML = `
        <div class="movie-details">
          <div class="details-poster-section">
            <img src="${poster}" alt="${movie.title}" class="details-poster">
          </div>
          <div class="details-info-section">
            <h2 class="details-title">${movie.title} (${movie.year})</h2>

            <div class="details-meta">
              <span class="meta-item">${movie.rated}</span>
              <span class="meta-item">${movie.runtime}</span>
              <span class="meta-item">${movie.released}</span>
            </div>

            ${movie.imdbRating !== 'N/A' ? `
              <div class="details-rating">
                <span class="rating-stars">⭐</span>
                <span class="rating-value">${movie.imdbRating}/10</span>
                <span class="rating-votes">(${movie.imdbVotes} votes)</span>
              </div>
            ` : ''}

            <div class="details-genre">
              ${movie.genre.split(', ').map(g => `<span class="genre-tag">${g}</span>`).join('')}
            </div>

            <div class="details-plot">
              <h3>Plot</h3>
              <p>${movie.plot}</p>
            </div>

            <div class="details-credits">
              <div class="credit-item">
                <strong>Director:</strong> ${movie.director}
              </div>
              <div class="credit-item">
                <strong>Cast:</strong> ${movie.actors}
              </div>
              <div class="credit-item">
                <strong>Writer:</strong> ${movie.writer}
              </div>
            </div>

            ${movie.awards !== 'N/A' ? `
              <div class="details-awards">
                <strong>Awards:</strong> ${movie.awards}
              </div>
            ` : ''}

            <div class="details-actions">
              <button class="btn btn--primary" onclick="toggleWatchlist('${movie.imdbID}')">
                ${inWatchlist ? '★ Remove from Watchlist' : '☆ Add to Watchlist'}
              </button>
            </div>
          </div>
        </div>
      `;

    } catch (error) {
      modalBody.innerHTML = `
        <div class="error-message">
          <p>Failed to load movie details: ${error.message}</p>
          <button class="btn btn--secondary" onclick="closeModal()">Close</button>
        </div>
      `;
    }
  },

  /**
   * Show/hide loading state
   */
  showLoading() {
    document.getElementById('loading').style.display = 'flex';
  },

  hideLoading() {
    document.getElementById('loading').style.display = 'none';
  },

  /**
   * Show error message
   */
  showError(message) {
    const errorEl = document.getElementById('error-message');
    errorEl.textContent = message;
    errorEl.style.display = 'block';

    // Auto-hide after 5 seconds
    setTimeout(() => {
      errorEl.style.display = 'none';
    }, 5000);
  },

  /**
   * Show toast notification
   */
  showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast toast--${type}`;
    toast.style.display = 'block';

    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
  },

  /**
   * Update pagination
   */
  updatePagination(currentPage, totalPages, searchTerm) {
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
        onclick="searchMovies('${searchTerm}', ${currentPage - 1})"
        ${currentPage === 1 ? 'disabled' : ''}
      >
        ← Previous
      </button>
    `;

    // Page numbers (show max 5)
    const pageNumbers = this.generatePageNumbers(currentPage, totalPages);

    pageNumbers.forEach(pageNum => {
      if (pageNum === '...') {
        html += '<span class="page-ellipsis">...</span>';
      } else {
        html += `
          <button
            class="page-btn ${pageNum === currentPage ? 'active' : ''}"
            onclick="searchMovies('${searchTerm}', ${pageNum})"
          >
            ${pageNum}
          </button>
        `;
      }
    });

    // Next button
    html += `
      <button
        class="page-btn"
        onclick="searchMovies('${searchTerm}', ${currentPage + 1})"
        ${currentPage === totalPages ? 'disabled' : ''}
      >
        Next →
      </button>
    `;

    paginationContainer.innerHTML = html;
  },

  /**
   * Generate page numbers for pagination
   */
  generatePageNumbers(current, total) {
    const pages = [];
    const maxVisible = 5;

    if (total <= maxVisible) {
      // Show all pages
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      // Calculate range
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
      pages.push(total);
    }

    return pages;
  },

  /**
   * Update watchlist count badge
   */
  updateWatchlistCount() {
    const countEl = document.getElementById('watchlist-count');
    const count = Watchlist.count();
    countEl.textContent = count;
    countEl.style.display = count > 0 ? 'inline-block' : 'none';
  },

  /**
   * Show welcome state
   */
  showWelcomeState() {
    document.getElementById('welcome-state').style.display = 'block';
    document.getElementById('results-section').style.display = 'none';
  },

  /**
   * Show results section
   */
  showResultsSection() {
    document.getElementById('welcome-state').style.display = 'none';
    document.getElementById('results-section').style.display = 'block';
  }
};

