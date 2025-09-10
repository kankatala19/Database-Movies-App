import React from 'react';
import MovieCard from './MovieCard';
import './MovieGrid.css';

const MovieGrid = ({ movies, loading, error, onMovieClick, onLoadMore, hasMore }) => {
  if (loading && movies.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()} className="btn">
          Try Again
        </button>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="no-results">
        <h3>No movies found</h3>
        <p>Try adjusting your search criteria or browse popular movies.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid-container">
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={onMovieClick}
          />
        ))}
      </div>
      
      {hasMore && (
        <div className="load-more-container">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="load-more-btn"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
      
      {loading && movies.length > 0 && (
        <div className="loading-more">
          <div className="loading-spinner"></div>
          <p>Loading more movies...</p>
        </div>
      )}
    </div>
  );
};

export default MovieGrid; 