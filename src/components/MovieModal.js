import React from 'react';
import { X, Star, Calendar, Clock, Play } from 'lucide-react';
import { getBackdropUrl, getPosterUrl } from '../services/api';
import './MovieModal.css';

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  const {
    title,
    overview,
    poster_path,
    backdrop_path,
    release_date,
    runtime,
    vote_average,
    vote_count,
    genres,
    budget,
    revenue,
    status,
    original_language,
    production_companies,
  } = movie;

  const backdropUrl = getBackdropUrl(backdrop_path);
  const posterUrl = getPosterUrl(poster_path);
  const releaseYear = release_date ? new Date(release_date).getFullYear() : 'N/A';
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';
  const formattedBudget = budget ? `$${(budget / 1000000).toFixed(1)}M` : 'N/A';
  const formattedRevenue = revenue ? `$${(revenue / 1000000).toFixed(1)}M` : 'N/A';

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header" style={{ backgroundImage: `url(${backdropUrl})` }}>
          <div className="modal-header-overlay">
            <div className="modal-header-content">
              <div className="modal-poster">
                {posterUrl ? (
                  <img src={posterUrl} alt={title} />
                ) : (
                  <div className="no-poster-modal">
                    <Play size={48} />
                    <span>No Image</span>
                  </div>
                )}
              </div>
              <div className="modal-header-info">
                <h1>{title}</h1>
                <div className="modal-meta">
                  <span className="meta-item">
                    <Calendar size={16} />
                    {releaseYear}
                  </span>
                  {runtime && (
                    <span className="meta-item">
                      <Clock size={16} />
                      {runtime} min
                    </span>
                  )}
                  <span className="meta-item">
                    <Star size={16} />
                    {rating} ({vote_count} votes)
                  </span>
                </div>
                {genres && (
                  <div className="modal-genres">
                    {genres.map((genre) => (
                      <span key={genre.id} className="genre-tag">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3>Overview</h3>
            <p>{overview || 'No overview available.'}</p>
          </div>

          <div className="modal-details">
            <div className="detail-row">
              <div className="detail-item">
                <h4>Status</h4>
                <p>{status || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <h4>Language</h4>
                <p>{original_language ? original_language.toUpperCase() : 'N/A'}</p>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-item">
                <h4>Budget</h4>
                <p>{formattedBudget}</p>
              </div>
              <div className="detail-item">
                <h4>Revenue</h4>
                <p>{formattedRevenue}</p>
              </div>
            </div>

            {production_companies && production_companies.length > 0 && (
              <div className="detail-row">
                <div className="detail-item full-width">
                  <h4>Production Companies</h4>
                  <div className="companies-list">
                    {production_companies.map((company, index) => (
                      <span key={company.id || index} className="company-tag">
                        {company.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal; 