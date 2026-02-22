import { useNavigate } from 'react-router';
import { Carousel } from '../components/Carousel';
import { MovieCard } from '../components/MovieCard';
import { EventCard } from '../components/EventCard';
import { SportCard } from '../components/SportCard';
import { movies, events, sports } from '../data/moviesData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function Home() {
  const navigate = useNavigate();
  const featuredBanners = [
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200',
    'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=1200',
    'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1200'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white py-20 px-4">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to BookMyShow</h1>
          <p className="text-xl md:text-2xl mb-6">
            Book tickets for Movies, Events, Plays, Sports and Activities
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/movies')}
              className="px-6 py-3 bg-white text-rose-600 rounded-md hover:bg-gray-100 transition font-semibold"
            >
              Browse Movies
            </button>
            <button
              onClick={() => navigate('/events')}
              className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-md hover:bg-white hover:text-rose-600 transition font-semibold"
            >
              Explore Events
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Recommended Movies */}
        <Carousel title="Recommended Movies" showAll={() => navigate('/movies')}>
          {movies.slice(0, 6).map(movie => (
            <div key={movie.id} className="px-2">
              <MovieCard movie={movie} />
            </div>
          ))}
        </Carousel>

        {/* Upcoming Events */}
        <Carousel title="Upcoming Events" showAll={() => navigate('/events')}>
          {events.map(event => (
            <div key={event.id} className="px-2">
              <EventCard event={event} />
            </div>
          ))}
        </Carousel>

        {/* Sports Activities */}
        <Carousel title="Sports & Activities" showAll={() => navigate('/sports')}>
          {sports.map(sport => (
            <div key={sport.id} className="px-2">
              <SportCard sport={sport} />
            </div>
          ))}
        </Carousel>

        {/* Coming Soon */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.slice(6).map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Movies Now Showing</h3>
              <ul className="space-y-2 text-gray-400">
                {movies.slice(0, 4).map(movie => (
                  <li key={movie.id}>{movie.title}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Cities</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Bhubaneswar</li>
                <li>Rourkela</li>
                <li>Sambalpur</li>
                <li>Cuttack</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Help</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">BookMyShow</h3>
              <p className="text-gray-400">
                India's largest online ticket booking platform for movies, events, plays, and sports.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            © 2026 BookMyShow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
