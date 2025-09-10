import axios from 'axios';

// TMDB API configuration
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;
const IMAGE_BASE_URL = process.env.REACT_APP_TMDB_IMAGE_BASE_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

// API service functions
export const movieAPI = {
  // Get popular movies
  getPopularMovies: async (page = 1) => {
    try {
      const response = await api.get('/movie/popular', {
        params: { page },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch popular movies');
    }
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    try {
      const response = await api.get('/search/movie', {
        params: { query, page },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to search movies');
    }
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    try {
      const response = await api.get(`/movie/${movieId}`, {
        params: {
          append_to_response: 'credits,videos,similar',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch movie details');
    }
  },

  // Get genres
  getGenres: async () => {
    try {
      const response = await api.get('/genre/movie/list');
      return response.data.genres;
    } catch (error) {
      throw new Error('Failed to fetch genres');
    }
  },

  // Get movies by genre
  getMoviesByGenre: async (genreId, page = 1) => {
    try {
      const response = await api.get('/discover/movie', {
        params: {
          with_genres: genreId,
          page,
          sort_by: 'popularity.desc',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch movies by genre');
    }
  },

  // Get top rated movies
  getTopRatedMovies: async (page = 1) => {
    try {
      const response = await api.get('/movie/top_rated', {
        params: { page },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch top rated movies');
    }
  },

  // Get upcoming movies
  getUpcomingMovies: async (page = 1) => {
    try {
      const response = await api.get('/movie/upcoming', {
        params: { page },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch upcoming movies');
    }
  },
};

// Image URL helpers
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getPosterUrl = (path) => getImageUrl(path, 'w500');
export const getBackdropUrl = (path) => getImageUrl(path, 'w1280');
export const getThumbnailUrl = (path) => getImageUrl(path, 'w200');

export default movieAPI; 