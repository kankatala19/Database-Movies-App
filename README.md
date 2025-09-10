# Movie Database App

A modern, responsive React application that allows users to search, browse, and discover movies using the TMDB (The Movie Database) API. The app features a beautiful UI with advanced filtering capabilities and detailed movie information.

## Features

### 🎬 Movie Discovery
- **Popular Movies**: Browse trending and popular movies
- **Top Rated**: View highest-rated movies
- **Upcoming**: Discover movies that are coming soon
- **Search**: Search for movies by title

### 🔍 Advanced Filtering
- **Genre Filter**: Filter movies by specific genres
- **Year Filter**: Filter by release year
- **Rating Filter**: Filter by minimum rating
- **Sort Options**: Sort by popularity, rating, release date, or title

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Glass Morphism**: Beautiful glass-like effects with backdrop blur
- **Smooth Animations**: Hover effects and transitions
- **Movie Cards**: Interactive cards with hover overlays
- **Modal Details**: Detailed movie information in elegant modals

### 📱 User Experience
- **Infinite Scroll**: Load more movies with pagination
- **Loading States**: Smooth loading indicators
- **Error Handling**: Graceful error messages
- **Search History**: Maintains search context
- **Quick Navigation**: Easy category switching

## Technologies Used

- **React 18**: Modern React with hooks
- **Axios**: HTTP client for API requests
- **Lucide React**: Beautiful icons
- **CSS3**: Modern styling with animations
- **TMDB API**: Movie database API

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd movie-database-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## API Configuration

The app uses the TMDB API with a free API key. The API key is included in the code for demonstration purposes. For production use, you should:

1. Get your own API key from [TMDB](https://www.themoviedb.org/settings/api)
2. Replace the API key in `src/services/api.js`
3. Consider using environment variables for security

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.js       # Navigation and search
│   ├── MovieCard.js    # Individual movie display
│   ├── MovieGrid.js    # Movie grid layout
│   ├── MovieModal.js   # Detailed movie view
│   ├── FilterPanel.js  # Filtering options
│   └── *.css          # Component styles
├── services/
│   └── api.js         # API service functions
├── App.js             # Main application component
├── App.css            # App-level styles
├── index.js           # Application entry point
└── index.css          # Global styles
```

## Usage

### Browsing Movies
1. **Popular Movies**: Click "Popular" to see trending movies
2. **Top Rated**: Click "Top Rated" for highest-rated movies
3. **Upcoming**: Click "Upcoming" for soon-to-be-released movies

### Searching
1. Use the search bar in the header
2. Type a movie title and press Enter
3. View search results with movie cards

### Filtering
1. Click the "Filters" button to open the filter panel
2. Select genre, year, rating, or sort options
3. Filters are applied in real-time
4. Click "Clear All Filters" to reset

### Viewing Details
1. Click on any movie card
2. View detailed information in the modal
3. See cast, crew, budget, revenue, and more
4. Click outside or the X button to close

## Features in Detail

### Movie Cards
- **Hover Effects**: Cards lift and show additional information
- **Poster Images**: High-quality movie posters
- **Rating Display**: Star ratings with vote counts
- **Release Year**: Year information with calendar icon
- **Overview**: Brief movie description on hover

### Filter Panel
- **Slide-in Animation**: Smooth panel transitions
- **Multiple Filters**: Genre, year, rating, and sorting
- **Real-time Updates**: Filters apply immediately
- **Clear Options**: Easy filter reset

### Modal Details
- **Backdrop Image**: Movie backdrop as background
- **Comprehensive Info**: Cast, crew, budget, revenue
- **Production Details**: Companies and status
- **Responsive Design**: Works on all screen sizes

## API Endpoints Used

- `GET /movie/popular` - Popular movies
- `GET /movie/top_rated` - Top rated movies
- `GET /movie/upcoming` - Upcoming movies
- `GET /search/movie` - Search movies
- `GET /movie/{id}` - Movie details
- `GET /genre/movie/list` - Movie genres

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie database API
- [Lucide](https://lucide.dev/) for the beautiful icons
- React community for the excellent documentation and tools 