import React, { useState } from 'react';
import { Search, Film } from 'lucide-react';
import './Header.css';

const Header = ({ onSearch, onCategoryChange, currentCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleCategoryClick = (category) => {
    onCategoryChange(category);
    setSearchQuery('');
  };

  const categories = [
    { id: 'popular', name: 'Popular' },
    { id: 'top_rated', name: 'Top Rated' },
    { id: 'upcoming', name: 'Upcoming' },
  ];

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Film size={32} />
          <h1>MovieDB</h1>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        <nav className="nav-categories">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`nav-btn ${currentCategory === category.id ? 'active' : ''}`}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header; 