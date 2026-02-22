import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Calendar, MapPin, ChevronRight, LogIn, Users } from 'lucide-react';
import { sports } from '../data/moviesData';
import { storage } from '../utils/storage';

export default function SportBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const sport = sports.find(s => s.id === id);

  useEffect(() => {
    if (!sport) {
      navigate('/sports');
      return;
    }
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, [sport, navigate]);

  const dates = ['Sat, 22 Feb', 'Sun, 23 Feb', 'Mon, 24 Feb', 'Tue, 25 Feb'];

  const ticketsTotal = sport ? sport.price * quantity : 0;
  const convenienceFee = 30 * quantity;
  const grandTotal = ticketsTotal + convenienceFee;

  const handleConfirmBooking = () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }
    if (!isLoggedIn) {
      localStorage.setItem('redirectAfterLogin', `/sport/${id}`);
      navigate('/signin');
      return;
    }

    const confirmedBooking = {
      movieId: sport!.id,
      movieTitle: sport!.title,
      movieImage: sport!.imageUrl,
      date: selectedDate,
      showTime: '',
      theatre: sport!.venue,
      theatreLocation: sport!.category,
      venue: sport!.venue,
      seats: [],
      numberOfSeats: quantity,
      ticketPrice: sport!.price,
      ticketsTotal,
      convenienceFee,
      grandTotal,
      bookingId: `BMS${Date.now()}`,
      bookingDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };

    storage.setConfirmedBooking(confirmedBooking);
    storage.addBooking(confirmedBooking);
    navigate('/booking-confirmation');
  };

  if (!sport) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="cursor-pointer hover:text-rose-600" onClick={() => navigate('/')}>Home</span>
            <ChevronRight size={16} />
            <span className="cursor-pointer hover:text-rose-600" onClick={() => navigate('/sports')}>Sports</span>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">{sport.title}</span>
          </div>
        </div>
      </div>

      {/* Sport Details Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex gap-6">
            <img
              src={sport.imageUrl}
              alt={sport.title}
              className="w-32 h-32 object-cover rounded-lg shadow-md"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">{sport.title}</h1>
              <div className="flex items-center gap-4 text-gray-600 mb-2">
                <span className="px-3 py-1 bg-gray-100 rounded text-sm">{sport.category}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin size={18} />
                <span>{sport.venue}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={18} />
                <span>{sport.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign-in warning */}
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
                localStorage.setItem('redirectAfterLogin', `/sport/${id}`);
                navigate('/signin');
              }}
              className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition text-sm font-semibold whitespace-nowrap"
            >
              Sign In
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Date selection */}
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

        {/* Ticket quantity */}
        <h2 className="text-2xl font-bold mb-4">Number of Tickets</h2>
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8 flex items-center gap-6">
          <Users size={24} className="text-rose-600" />
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-10 h-10 rounded-full border-2 border-rose-600 text-rose-600 text-xl font-bold hover:bg-rose-50 transition"
            >
              −
            </button>
            <span className="text-2xl font-bold w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(q => Math.min(10, q + 1))}
              className="w-10 h-10 rounded-full border-2 border-rose-600 text-rose-600 text-xl font-bold hover:bg-rose-50 transition"
            >
              +
            </button>
          </div>
          <span className="text-gray-500 text-sm">Max 10 tickets</span>
        </div>

        {/* Order summary */}
        {selectedDate && (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Tickets ({quantity} × ₹{sport.price})</span>
                <span>₹{ticketsTotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Convenience Fee</span>
                <span>₹{convenienceFee}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span className="text-rose-600">₹{grandTotal}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleConfirmBooking}
            disabled={!selectedDate}
            className={`px-8 py-3 rounded-lg font-semibold text-white transition ${
              selectedDate
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {isLoggedIn
              ? `Confirm Booking${selectedDate ? ` — ₹${grandTotal}` : ''}`
              : 'Sign In to Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}