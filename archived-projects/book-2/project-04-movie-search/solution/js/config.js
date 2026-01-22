/**
 * config.js - Configuration
 * API keys and settings
 *
 * IMPORTANT: Get your own API key from http://www.omdbapi.com/apikey.aspx
 * Replace 'YOUR_API_KEY_HERE' with your actual key
 */

const CONFIG = {
  // OMDb API Key - Replace with your own!
  API_KEY: 'YOUR_API_KEY_HERE',

  // Base URL
  BASE_URL: 'https://www.omdbapi.com/',

  // Placeholder for missing posters
  PLACEHOLDER_IMAGE: 'https://via.placeholder.com/300x450/667eea/ffffff?text=No+Poster',

  // Results per page
  RESULTS_PER_PAGE: 10,

  // localStorage keys
  STORAGE_KEYS: {
    WATCHLIST: 'movieWatchlist',
    SEARCH_HISTORY: 'searchHistory'
  }
};

// Check if API key is set
if (CONFIG.API_KEY === 'YOUR_API_KEY_HERE') {
  console.warn('⚠️ Please set your OMDb API key in config.js');
  console.warn('Get a free API key at: http://www.omdbapi.com/apikey.aspx');
}

