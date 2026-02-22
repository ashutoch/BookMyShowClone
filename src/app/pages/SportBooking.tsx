import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Calendar, MapPin, Clock, ChevronRight, Plus, Minus } from 'lucide-react';
import { sports } from '../data/moviesData';
import { storage } from '../utils/storage';

export default function SportBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [numberOfTickets, setNumberOfTickets] = useState(1);

  const sport = sports.find(s => s.id === id);

  useEffect(() => {
    if (!sport) {
      navigate('/sports');
    }
  }, [sport, navigate]);

  const dates = ['Sat, 22 Feb', 'Sun, 23 Feb', 'Mon, 24 Feb', 'Tue, 25 Feb'];
  const times = ['6:00 PM', '7:30 PM', '9:00 PM'];

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time');
      return;
    }

    const ticketPrice = sport!.price;
    const ticketsTotal = ticketPrice * numberOfTickets;
    const convenienceFee = numberOfTickets * 50;
    const grandTotal = ticketsTotal + convenienceFee;

    const bookingData = {
      movieId: sport!.id,
      movieTitle: sport!.title,
      movieImage: sport!.imageUrl,
      date: selectedDate,
      showTime: selectedTime,
      venue: sport!.venue,
      price: sport!.price,
      numberOfSeats: numberOfTickets,
      ticketPrice,
      ticketsTotal,
      convenienceFee,
      grandTotal,
      bookingId: `BMS${Date.now()}`,
      bookingDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    // Save booking
    storage.setConfirmedBooking(bookingData);
    storage.addBooking(bookingData);

    navigate('/booking-confirmation');
  };

  if (!sport) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Home</span>
            <ChevronRight size={16} />
            <span>Sports</span>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">{sport.title}</span>
          </div>
        </div>
      </div>

      {/* Sport Details */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex gap-6">
            <img
              src={sport.imageUrl}
              alt={sport.title}
              className="w-32 h-48 object-cover rounded-lg shadow-md"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">{sport.title}</h1>
              <div className="flex items-center gap-4 text-gray-600 mb-2">
                <span className="px-3 py-1 bg-gray-100 rounded">{sport.category}</span>
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

      {/* Booking Form */}
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

        {/* Time Selection */}
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

        {/* Ticket Selection */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-4">Number of Tickets</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Ticket Price</p>
              <p className="text-2xl font-bold text-rose-600">
                {sport.price > 0 ? `₹${sport.price}` : 'Free'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setNumberOfTickets(Math.max(1, numberOfTickets - 1))}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center"
              >
                <Minus size={20} />
              </button>
              <span className="text-2xl font-bold w-12 text-center">{numberOfTickets}</span>
              <button
                onClick={() => setNumberOfTickets(Math.min(6, numberOfTickets + 1))}
                className="w-10 h-10 rounded-full bg-rose-600 hover:bg-rose-700 text-white transition flex items-center justify-center"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Maximum 6 tickets per booking</p>
        </div>

        {/* Price Breakdown */}
        {selectedDate && selectedTime && (
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Tickets ({numberOfTickets} × ₹{sport.price})</span>
                <span>₹{sport.price * numberOfTickets}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Convenience Fee</span>
                <span>₹{numberOfTickets * 50}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Grand Total</span>
                  <span className="text-rose-600">₹{sport.price * numberOfTickets + numberOfTickets * 50}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleContinue}
              className="w-full py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition"
            >
              Proceed to Pay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
