import React, { useState, useEffect, useCallback } from 'react';
import { Filter } from 'lucide-react';
import Header from './components/Header';
import MovieGrid from './components/MovieGrid';
import MovieModal from './components/MovieModal';
import FilterPanel from './components/FilterPanel';
import { movieAPI } from './services/api';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: '',
    sortBy: 'popularity'
  });
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Fetch movies based on current state
  const fetchMovies = useCallback(async (page = 1, reset = false) => {
    try {
      setLoading(true);
      setError(null);

      let response;
      if (searchQuery) {
        response = await movieAPI.searchMovies(searchQuery, page);
      } else {
        switch (currentCategory) {
          case 'popular':
            response = await movieAPI.getPopularMovies(page);
            break;
          case 'top_rated':
            response = await movieAPI.getTopRatedMovies(page);
            break;
          case 'upcoming':
            response = await movieAPI.getUpcomingMovies(page);
            break;
          default:
            response = await movieAPI.getPopularMovies(page);
        }
      }

      const newMovies = response.results || [];
      
      if (reset) {
        setMovies(newMovies);
      } else {
        setMovies(prev => [...prev, ...newMovies]);
      }

      setHasMore(page < response.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, currentCategory]);

  // Apply filters to movies
  const applyFilters = useCallback((movies, filters) => {
    let filteredMovies = [...movies];

    if (filters.genre) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.genre_ids && movie.genre_ids.includes(parseInt(filters.genre))
      );
    }

    if (filters.year) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.release_date && 
        new Date(movie.release_date).getFullYear() === parseInt(filters.year)
      );
    }

    if (filters.rating) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.vote_average >= parseFloat(filters.rating)
      );
    }

    // Sort movies
    switch (filters.sortBy) {
      case 'rating':
        filteredMovies.sort((a, b) => b.vote_average - a.vote_average);
        break;
      case 'release_date':
        filteredMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        break;
      case 'title':
        filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // popularity is already sorted by API
        break;
    }

    return filteredMovies;
  }, []);

  // Filtered movies
  const filteredMovies = applyFilters(movies, filters);

  // Load more movies
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchMovies(currentPage + 1, false);
    }
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentCategory('');
    setCurrentPage(1);
    setMovies([]);
    fetchMovies(1, true);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setSearchQuery('');
    setCurrentPage(1);
    setMovies([]);
    fetchMovies(1, true);
  };

  // Handle movie click
  const handleMovieClick = async (movie) => {
    try {
      const detailedMovie = await movieAPI.getMovieDetails(movie.id);
      setSelectedMovie(detailedMovie);
    } catch (err) {
      console.error('Failed to fetch movie details:', err);
      setSelectedMovie(movie);
    }
  };

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Toggle filter panel
  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  // Close modal
  const closeModal = () => {
    setSelectedMovie(null);
  };

  // Initial load
  useEffect(() => {
    fetchMovies(1, true);
  }, [fetchMovies]);

  return (
    <div className="App">
      <Header
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        currentCategory={currentCategory}
      />

      <div className="main-content">
        <div className="container">
          <div className="content-header">
            <div className="content-title">
              <h2>
                {searchQuery 
                  ? `Search Results for "${searchQuery}"`
                  : (currentCategory === 'popular' && 'Popular Movies')
                  || (currentCategory === 'top_rated' && 'Top Rated Movies')
                  || (currentCategory === 'upcoming' && 'Upcoming Movies')
                  || 'Movies'
                }
              </h2>
              {filteredMovies.length > 0 && (
                <span className="results-count">
                  {filteredMovies.length} movies found
                </span>
              )}
            </div>
            
            <button 
              className="filter-toggle-btn"
              onClick={toggleFilterPanel}
            >
              <Filter size={20} />
              Filters
            </button>
          </div>

          <MovieGrid
            movies={filteredMovies}
            loading={loading}
            error={error}
            onMovieClick={handleMovieClick}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
          />
        </div>
      </div>

      <FilterPanel
        onFilterChange={handleFilterChange}
        isOpen={isFilterPanelOpen}
        onToggle={toggleFilterPanel}
      />

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App; 