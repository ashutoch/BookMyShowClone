import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { events } from '../data/moviesData';
import { storage } from '../utils/storage';

export default function EventSeatSelection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [currentBooking, setCurrentBooking] = useState<any>(null);

  const event = events.find(e => e.id === id);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedIn) {
      localStorage.setItem('redirectAfterLogin', `/event/${id}`);
      navigate('/signin');
      return;
    }

    // Read booking inside useEffect so it's never stale
    const booking = storage.getCurrentBooking();

    if (!event || !booking) {
      navigate('/events');
      return;
    }

    setCurrentBooking(booking);

    const seats = storage.getSeats(id!);
    setBookedSeats(seats);
  }, [event, id, navigate]);

  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 10;

  const handleSeatClick = (seat: string) => {
    if (bookedSeats.includes(seat)) return;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      if (selectedSeats.length >= 6) {
        alert('Maximum 6 seats can be selected');
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const getSeatColor = (seat: string) => {
    if (bookedSeats.includes(seat)) return 'bg-red-500 cursor-not-allowed';
    if (selectedSeats.includes(seat)) return 'bg-yellow-400 hover:bg-yellow-500';
    return 'bg-green-500 hover:bg-green-600';
  };

  const handleProceedToPay = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    const ticketPrice = event!.price;
    const numberOfSeats = selectedSeats.length;
    const ticketsTotal = ticketPrice * numberOfSeats;
    const convenienceFee = numberOfSeats * 30;
    const grandTotal = ticketsTotal + convenienceFee;

    const confirmedBooking = {
      ...currentBooking,
      theatre: currentBooking.theatre || event!.venue,
      theatreLocation: currentBooking.theatreLocation || event!.category,
      seats: selectedSeats,
      numberOfSeats,
      ticketPrice,
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

    const updatedBookedSeats = [...bookedSeats, ...selectedSeats];
    storage.setSeats(id!, updatedBookedSeats);
    storage.clearCurrentBooking();

    navigate('/booking-confirmation');
  };

  if (!event || !currentBooking) return null;

  const totalAmount = event.price * selectedSeats.length + selectedSeats.length * 30;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2 text-center">{event.title}</h1>
        <p className="text-center text-gray-600 mb-8">
          {currentBooking.date} &nbsp;|&nbsp; {currentBooking.showTime} &nbsp;|&nbsp; {event.venue}
        </p>

        {/* Stage indicator */}
        <div className="mb-10">
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-gray-300 h-2 mb-2 rounded-full shadow-inner"></div>
            <p className="text-center text-gray-500 text-sm tracking-widest">STAGE</p>
          </div>
        </div>

        {/* Seat Grid */}
        <div className="bg-white rounded-xl p-6 md:p-8 mb-6 shadow-sm overflow-x-auto">
          <div className="space-y-3 min-w-[480px]">
            {rows.map(row => (
              <div key={row} className="flex items-center gap-2">
                <span className="w-6 font-semibold text-gray-700 text-sm">{row}</span>
                <div className="flex-1 flex justify-center gap-1.5">
                  {Array.from({ length: seatsPerRow }, (_, i) => {
                    const seatNumber = `${row}${i + 1}`;
                    return (
                      <button
                        key={seatNumber}
                        onClick={() => handleSeatClick(seatNumber)}
                        disabled={bookedSeats.includes(seatNumber)}
                        className={`w-9 h-9 rounded-md transition-all ${getSeatColor(seatNumber)} text-white text-xs font-semibold`}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mb-8 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-md"></div>
            <span className="text-sm text-gray-700">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-400 rounded-md"></div>
            <span className="text-sm text-gray-700">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 rounded-md"></div>
            <span className="text-sm text-gray-700">Booked</span>
          </div>
        </div>

        {/* Payment summary + Pay button */}
        {selectedSeats.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Seats: {selectedSeats.join(', ')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tickets ({selectedSeats.length} × ₹{event.price})</span>
                <span>₹{event.price * selectedSeats.length}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Convenience Fee</span>
                <span>₹{selectedSeats.length * 30}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span className="text-rose-600">₹{totalAmount}</span>
              </div>
            </div>
            <button
              onClick={handleProceedToPay}
              className="w-full py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition text-lg"
            >
              Proceed to Pay — ₹{totalAmount}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}