/**
 * watchlist.js - Watchlist Management
 * localStorage operations for movie watchlist
 */

const Watchlist = {
  /**
   * Get all movies from watchlist
   */
  get() {
    try {
      const watchlist = localStorage.getItem(CONFIG.STORAGE_KEYS.WATCHLIST);
      return watchlist ? JSON.parse(watchlist) : [];
    } catch (error) {
      console.error('Error loading watchlist:', error);
      return [];
    }
  },

  /**
   * Save watchlist to localStorage
   */
  save(watchlist) {
    try {
      localStorage.setItem(CONFIG.STORAGE_KEYS.WATCHLIST, JSON.stringify(watchlist));
    } catch (error) {
      console.error('Error saving watchlist:', error);
      UI.showToast('Failed to save to watchlist. Storage may be full.', 'error');
    }
  },

  /**
   * Add movie to watchlist
   */
  async add(imdbID) {
    const watchlist = this.get();

    // Check if already in watchlist
    if (this.has(imdbID)) {
      UI.showToast('Movie is already in your watchlist', 'info');
      return false;
    }

    try {
      // Fetch full movie details
      const movie = await API.getMovieDetails(imdbID);

      // Add to watchlist with metadata
      watchlist.push({
        imdbID: movie.imdbID,
        title: movie.title,
        year: movie.year,
        poster: movie.poster,
        imdbRating: movie.imdbRating,
        genre: movie.genre,
        addedDate: new Date().toISOString()
      });

      this.save(watchlist);
      UI.showToast('Added to watchlist', 'success');
      UI.updateWatchlistCount();

      return true;
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      UI.showToast('Failed to add to watchlist', 'error');
      return false;
    }
  },

  /**
   * Remove movie from watchlist
   */
  remove(imdbID) {
    let watchlist = this.get();
    watchlist = watchlist.filter(m => m.imdbID !== imdbID);
    this.save(watchlist);
    UI.showToast('Removed from watchlist', 'success');
    UI.updateWatchlistCount();
  },

  /**
   * Check if movie is in watchlist
   */
  has(imdbID) {
    return this.get().some(m => m.imdbID === imdbID);
  },

  /**
   * Clear entire watchlist
   */
  clear() {
    if (confirm('Are you sure you want to clear your entire watchlist?')) {
      localStorage.removeItem(CONFIG.STORAGE_KEYS.WATCHLIST);
      UI.showToast('Watchlist cleared', 'success');
      UI.updateWatchlistCount();
      return true;
    }
    return false;
  },

  /**
   * Get watchlist count
   */
  count() {
    return this.get().length;
  }
};

