import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { movies, theatres } from '../data/moviesData';
import { ChevronRight, Star, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function MovieBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === id);
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTheatre, setSelectedTheatre] = useState<string>('');
  const [selectedShow, setSelectedShow] = useState<string>('');

  // Generate next 7 days
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push({
      date: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' })
    });
  }

  useEffect(() => {
    if (dates.length > 0) {
      setSelectedDate(dates[0].date);
    }
  }, []);

  if (!movie) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Movie not found</h2>
          <button
            onClick={() => navigate('/movies')}
            className="mt-4 px-6 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition"
          >
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  const handleProceed = () => {
    if (!selectedTheatre || !selectedShow) {
      alert('Please select a theatre and show time');
      return;
    }

    const theatre = theatres.find(t => t.id === selectedTheatre);
    
    // Store booking details in localStorage
    const bookingDetails = {
      movieId: movie.id,
      movieTitle: movie.title,
      movieImage: movie.imageUrl,
      date: selectedDate,
      theatre: theatre?.name,
      theatreLocation: theatre?.location,
      showTime: selectedShow,
      price: movie.price
    };

    localStorage.setItem('currentBooking', JSON.stringify(bookingDetails));
    navigate(`/movie/${id}/seats`);
  };

  const selectedCity = localStorage.getItem('selectedCity') || 'Bhubaneswar';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Movie Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <span>Home</span>
            <ChevronRight size={16} />
            <span>Movies</span>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">{movie.title}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-32 h-48 flex-shrink-0 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={movie.imageUrl}
                alt={movie.title}
                fallbackSrc="https://via.placeholder.com/128x192"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1">
                  <Star size={18} fill="gold" stroke="gold" />
                  <span className="font-semibold">{movie.rating}/10</span>
                  <span className="text-gray-600 text-sm">({movie.votes} Votes)</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mb-3">
                {movie.languages.map(lang => (
                  <span key={lang} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {lang}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-2">
                <span>{movie.duration}</span>
                <span>•</span>
                <span>{movie.genres.join(', ')}</span>
              </div>
              <p className="text-gray-700">{movie.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Date Selection */}
      <div className="bg-white border-b">
        <div className="max-w-[1400px] mx-auto px-4 py-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            {dates.map(d => (
              <button
                key={d.date}
                onClick={() => setSelectedDate(d.date)}
                className={`flex flex-col items-center min-w-[80px] px-4 py-3 rounded-lg border-2 transition ${
                  selectedDate === d.date
                    ? 'border-rose-600 bg-rose-50'
                    : 'border-gray-200 hover:border-rose-300'
                }`}
              >
                <span className="text-sm text-gray-600">{d.day}</span>
                <span className="text-lg font-semibold">{d.dayNum}</span>
                <span className="text-xs text-gray-500">{d.month}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Theatre and Show Selection */}
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4">Select Theatre & Show Time</h2>

        <div className="space-y-4">
          {theatres.map(theatre => (
            <div key={theatre.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{theatre.name}</h3>
                  <p className="text-sm text-gray-600">{theatre.location}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {theatre.shows.map(show => (
                  <button
                    key={show}
                    onClick={() => {
                      setSelectedTheatre(theatre.id);
                      setSelectedShow(show);
                    }}
                    className={`px-6 py-3 rounded-lg border-2 font-medium transition ${
                      selectedTheatre === theatre.id && selectedShow === show
                        ? 'border-rose-600 bg-rose-50 text-rose-600'
                        : 'border-gray-300 hover:border-rose-300'
                    }`}
                  >
                    {show}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proceed Button */}
        {selectedShow && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-40">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Selected Show</p>
                <p className="font-semibold">{selectedShow} at {theatres.find(t => t.id === selectedTheatre)?.name}</p>
              </div>
              <button
                onClick={handleProceed}
                className="px-8 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition font-semibold text-lg"
              >
                Proceed to Seat Selection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
