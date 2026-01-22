/**
 * api.js - API Integration
 * All API calls to OMDb
 */

const API = {
  /**
   * Build API URL with parameters
   */
  buildUrl(params) {
    const url = new URL(CONFIG.BASE_URL);
    url.searchParams.append('apikey', CONFIG.API_KEY);

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    return url.toString();
  },

  /**
   * Search movies by title
   */
  async searchMovies(searchTerm, page = 1) {
    try {
      const url = this.buildUrl({
        s: searchTerm,
        page: page
      });

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
        movies: data.Search.map(movie => ({
          imdbID: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster,
          type: movie.Type
        })),
        totalResults: parseInt(data.totalResults),
        currentPage: page
      };

    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  /**
   * Get movie details by IMDb ID
   */
  async getMovieDetails(imdbID) {
    try {
      const url = this.buildUrl({
        i: imdbID,
        plot: 'full'
      });

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }

      const data = await response.json();

      if (data.Response === 'False') {
        throw new Error('Movie not found');
      }

      return {
        imdbID: data.imdbID,
        title: data.Title,
        year: data.Year,
        rated: data.Rated,
        released: data.Released,
        runtime: data.Runtime,
        genre: data.Genre,
        director: data.Director,
        writer: data.Writer,
        actors: data.Actors,
        plot: data.Plot,
        language: data.Language,
        country: data.Country,
        awards: data.Awards,
        poster: data.Poster,
        ratings: data.Ratings,
        imdbRating: data.imdbRating,
        imdbVotes: data.imdbVotes,
        type: data.Type,
        boxOffice: data.BoxOffice,
        production: data.Production,
        website: data.Website
      };

    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  }
};

