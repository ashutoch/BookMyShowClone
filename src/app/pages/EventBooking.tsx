import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Calendar, MapPin, Clock, ChevronRight, LogIn } from 'lucide-react';
import { events } from '../data/moviesData';
import { storage } from '../utils/storage';

export default function EventBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const event = events.find(e => e.id === id);

  useEffect(() => {
    if (!event) {
      navigate('/events');
      return;
    }
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, [event, navigate]);

  const dates = ['Sat, 22 Feb', 'Sun, 23 Feb', 'Mon, 24 Feb', 'Tue, 25 Feb'];
  const times = ['6:00 PM', '7:30 PM', '9:00 PM'];

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time');
      return;
    }

    // ── Require sign-in before proceeding ──
    if (!isLoggedIn) {
      localStorage.setItem('redirectAfterLogin', `/event/${id}`);
      navigate('/signin');
      return;
    }

    const bookingData = {
      movieId: event!.id,
      movieTitle: event!.title,
      movieImage: event!.imageUrl,
      date: selectedDate,
      showTime: selectedTime,
      theatre: event!.venue,          // BookingConfirmation reads "theatre"
      theatreLocation: event!.category, // shows category as subtitle
      venue: event!.venue,
      price: event!.price
    };

    storage.setCurrentBooking(bookingData);
    navigate(`/event/${id}/seats`);
  };

  if (!event) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="cursor-pointer hover:text-rose-600" onClick={() => navigate('/')}>Home</span>
            <ChevronRight size={16} />
            <span className="cursor-pointer hover:text-rose-600" onClick={() => navigate('/events')}>Events</span>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">{event.title}</span>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex gap-6">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-32 h-32 object-cover rounded-lg shadow-md"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
              <div className="flex items-center gap-4 text-gray-600 mb-2">
                <span className="px-3 py-1 bg-gray-100 rounded">{event.category}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin size={18} />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={18} />
                <span>{event.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign-in warning banner */}
      {!isLoggedIn && (
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg px-5 py-4">
            <div className="flex items-center gap-3">
              <LogIn size={20} className="text-amber-600" />
              <p className="text-amber-800 font-medium">
                You'll need to sign in before completing your booking
              </p>
            </div>
            <button
              onClick={() => {
                localStorage.setItem('redirectAfterLogin', `/event/${id}`);
                navigate('/signin');
              }}
              className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition text-sm font-semibold whitespace-nowrap"
            >
              Sign In
            </button>
          </div>
        </div>
      )}

      {/* Date & Time Selection */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Select Date</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {dates.map(date => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`p-4 rounded-lg border-2 transition ${
                selectedDate === date
                  ? 'border-rose-600 bg-rose-50'
                  : 'border-gray-200 hover:border-rose-300'
              }`}
            >
              <div className="font-semibold">{date}</div>
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">Select Time</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {times.map(time => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`p-4 rounded-lg border-2 transition ${
                selectedTime === time
                  ? 'border-rose-600 bg-rose-50'
                  : 'border-gray-200 hover:border-rose-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Clock size={18} />
                <span className="font-semibold">{time}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleContinue}
            disabled={!selectedDate || !selectedTime}
            className={`px-8 py-3 rounded-lg font-semibold text-white transition ${
              selectedDate && selectedTime
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {isLoggedIn ? 'Select Seats' : 'Sign In to Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}