import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search, Menu, MapPin, ChevronDown, User, X, Ticket, LogOut } from 'lucide-react';
import { movies, events, sports } from '../data/moviesData';

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('q');
    setSearchQuery(query || '');
  }, []);

  const searchResults = {
    movies: movies.filter(movie => 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
    events: events.filter(event => 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    sports: sports.filter(sport => 
      sport.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sport.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  };

  const totalResults = searchResults.movies.length + searchResults.events.length + searchResults.sports.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Search Results for "{searchQuery}"
        </h1>
        <p className="text-gray-600 mb-8">
          Found {totalResults} results
        </p>

        {totalResults === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Search size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Results Found</h2>
            <p className="text-gray-600">
              Try searching with different keywords
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Movies */}
            {searchResults.movies.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Movies</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {searchResults.movies.map((movie) => (
                    <Link
                      key={movie.id}
                      to={`/movie/${movie.id}`}
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                    >
                      <img
                        src={movie.imageUrl}
                        alt={movie.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-3">
                        <h3 className="font-semibold text-gray-800 mb-1 truncate">
                          {movie.title}
                        </h3>
                        <p className="text-sm text-gray-600">{movie.genres.join(', ')}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Events */}
            {searchResults.events.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Events</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {searchResults.events.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                    >
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-3">
                        <h3 className="font-semibold text-gray-800 mb-1 truncate">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-600">{event.category}</p>
                        <p className="text-sm text-rose-600 font-semibold mt-1">
                          ₹{event.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sports */}
            {searchResults.sports.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Sports</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {searchResults.sports.map((sport) => (
                    <div
                      key={sport.id}
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                    >
                      <img
                        src={sport.imageUrl}
                        alt={sport.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-3">
                        <h3 className="font-semibold text-gray-800 mb-1 truncate">
                          {sport.title}
                        </h3>
                        <p className="text-sm text-gray-600">{sport.category}</p>
                        <p className="text-sm text-rose-600 font-semibold mt-1">
                          ₹{sport.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
