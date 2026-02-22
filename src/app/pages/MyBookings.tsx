import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Calendar, MapPin, Clock, Ticket, Trash2, Film } from 'lucide-react';
import { storage, BookingData } from '../utils/storage';

export default function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName') || '';
    
    setIsLoggedIn(loggedIn);
    setUserName(name);

    if (!loggedIn) {
      navigate('/signin');
      return;
    }

    // Load bookings
    const allBookings = storage.getAllBookings();
    setBookings(allBookings);
  }, [navigate]);

  const handleDeleteBooking = (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    const updatedBookings = bookings.filter(b => b.bookingId !== bookingId);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
          <p className="text-gray-600">Welcome back, {userName}!</p>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Film size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Bookings Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't made any bookings. Start exploring movies and events!
            </p>
            <Link
              to="/movies"
              className="inline-block px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Movie Poster */}
                  <div className="md:w-48 h-64 md:h-auto flex-shrink-0">
                    <img
                      src={booking.movieImage}
                      alt={booking.movieTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {booking.movieTitle}
                        </h3>
                        <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          Booking ID: {booking.bookingId}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteBooking(booking.bookingId!)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Cancel Booking"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={18} className="text-rose-600" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock size={18} className="text-rose-600" />
                        <span>{booking.showTime}</span>
                      </div>
                      {booking.theatre && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin size={18} className="text-rose-600" />
                          <span>{booking.theatre}</span>
                        </div>
                      )}
                      {booking.seats && booking.seats.length > 0 && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <Ticket size={18} className="text-rose-600" />
                          <span>Seats: {booking.seats.join(', ')}</span>
                        </div>
                      )}
                    </div>

                    {booking.theatreLocation && (
                      <p className="text-gray-600 text-sm mb-4">
                        {booking.theatreLocation}
                      </p>
                    )}

                    {/* Pricing Details */}
                    {booking.grandTotal && (
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                          <span>Tickets ({booking.numberOfSeats} × ₹{booking.ticketPrice})</span>
                          <span>₹{booking.ticketsTotal}</span>
                        </div>
                        {booking.convenienceFee && (
                          <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                            <span>Convenience Fee</span>
                            <span>₹{booking.convenienceFee}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center text-lg font-bold text-gray-800 pt-2 border-t border-gray-200">
                          <span>Total Amount</span>
                          <span className="text-rose-600">₹{booking.grandTotal}</span>
                        </div>
                      </div>
                    )}

                    {booking.bookingDate && (
                      <p className="text-xs text-gray-500 mt-4">
                        Booked on: {booking.bookingDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
