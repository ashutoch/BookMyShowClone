import { useNavigate } from 'react-router';
import { Carousel } from '../components/Carousel';
import { MovieCard } from '../components/MovieCard';
import { EventCard } from '../components/EventCard';
import { SportCard } from '../components/SportCard';
import { movies, events, sports } from '../data/moviesData';

export default function Home() {
  const navigate = useNavigate();

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
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Carousel>

        {/* Upcoming Events */}
        <Carousel title="Upcoming Events" showAll={() => navigate('/events')}>
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </Carousel>

        {/* Sports Activities */}
        <Carousel title="Sports & Activities" showAll={() => navigate('/sports')}>
          {sports.map(sport => (
            <SportCard key={sport.id} sport={sport} />
          ))}
        </Carousel>

      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">MoviesVerse</h3>
              <p className="text-gray-400">
                Your one-stop destination for booking movies, events, plays, and sports across Odisha. 
                Kyunki ghar pe baithke bhi scene set hona chahiye. 🎬
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Explore</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/movies" className="hover:text-white transition">Movies</a></li>
                <li><a href="/events" className="hover:text-white transition">Events</a></li>
                <li><a href="/plays" className="hover:text-white transition">Plays</a></li>
                <li><a href="/sports" className="hover:text-white transition">Sports</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Help</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition cursor-pointer">About Us</li>
                <li className="hover:text-white transition cursor-pointer">Contact Us</li>
                <li className="hover:text-white transition cursor-pointer">Terms & Conditions</li>
                <li className="hover:text-white transition cursor-pointer">Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            Built by <span className="text-rose-400 font-semibold">Ashu</span> with thoda stress, bahut saari chai ☕, and just enough masti to survive. Hope you enjoy it {/*— maine toh enjoy nahi kiya 😅*/}
          </div>
        </div>
      </footer>
    </div>
  );
}