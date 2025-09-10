import React from 'react';
import { Star, Calendar, Play } from 'lucide-react';
import { getPosterUrl } from '../services/api';
import './MovieCard.css';

const MovieCard = ({ movie, onClick }) => {
  const {
    title,
    poster_path,
    release_date,
    vote_average,
    overview,
  } = movie;

  const posterUrl = getPosterUrl(poster_path);
  const releaseYear = release_date ? new Date(release_date).getFullYear() : 'N/A';
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';

  const handleClick = () => {
    if (onClick) {
      onClick(movie);
    }
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <div className="movie-poster">
        {posterUrl ? (
          <img src={posterUrl} alt={title} />
        ) : (
          <div className="no-poster">
            <Play size={48} />
            <span>No Image</span>
          </div>
        )}
        <div className="movie-overlay">
          <div className="overlay-content">
            <h3>{title}</h3>
            <p className="overview">
              {overview && overview.length > 100
                ? `${overview.substring(0, 100)}...`
                : overview || 'No overview available'}
            </p>
            <div className="movie-meta">
              <span className="rating">
                <Star size={16} />
                {rating}
              </span>
              <span className="year">
                <Calendar size={16} />
                {releaseYear}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <div className="movie-details">
          <span className="movie-year">{releaseYear}</span>
          <span className="movie-rating">
            <Star size={14} />
            {rating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard; 